//=============================================================================
// FRSH_ActionCosts
// FRSH_ActionCosts.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.ACosts = true;

var Frashaw = Frashaw || {};
Frashaw.ACosts = Frashaw.ACosts || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows the maker to make skills cost extra actions
* @help
* ==Notetags==================================================================
* Use all actions: <actionCost: all>
* Use a select # of actions: <actions: (number of actions here)>
* ===Introduction=============================================================
* RPG Maker has the ability to add actions to your enemies and actors for
* each turn in combat. However, the amount of work that gets used by these
* pretty much stops at adding them to the desired target. This plugin aims
* to allieviate that by adding a function where certain skills will take
* more actions to use then others.
* ===How to Use===============================================================
* Use the above notetags in the skills you want to use them in. It's that
* easy. Note that in order to use these skills you will need to have all
* the actions needed, can't overflow it to use multi action skills after
* all other actions.
* ===Change Log===============================================================
* Version 1.0.0 (02/08/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function() {
	//Overwrite of the make actions function
	Game_Battler.prototype.makeActions = function() {
			this.clearActions();
			if (this.canMove()) {
				var actionTimes = this.makeActionTimes();
				this._actions = [];
				//Sets up the action list for later
				this.actionList = [];
				for (var i = 0; i < actionTimes; i++) {
					this._actions.push(new Game_Action(this));
				}
			}
	};
	
	//The meat
	Game_Actor.prototype.selectNextCommand = function() {
		//If the actor in question  an't select actions, it skips them
        if (this.isDead() || !this.canMove() || this.isAutoBattle() || this.isConfused()) return false;
		//Gets the id of the currently used skill
		var id = this.action(this._actionInputIndex)._item.itemId();
		//Puts the id into an array so that it can be called later
		this.actionList.push(id);
		if (this._actionInputIndex < this.numActions() - 1) {
			//Runs if the action cost exists
			if ($dataSkills[id].meta.actionCost != null){
				//Checks to see if the skill in question demands all actions
				if ($dataSkills[id].meta.actionCost.toLowerCase().includes('all')){
					//Immediatly breaks the loop
					this._actionInputIndex = this.numActions() - 1;
					return false;
				} else {
					//Gets the number to reduce that # of actions the actor has
					var reduce = Number($dataSkills[id].meta.actionCost);
					//Failsafe
					if (reduce == NaN) reduce = 0;
					//Reduces the number of actions, proper
					this._actionInputIndex += reduce;
					//Checks to see if the max # of actions has been elasped to proceed to the next character
					//It's a different check from the one up top because, idk it didn't want to work with it being 1 lower
					if (this._actionInputIndex < this.numActions()){
						return true;
					} else {
						return false;
					}
				}
			} else {
				//standard next command code
				this._actionInputIndex++;
				return true;
			}
		} else {
			this._actionInputIndex++;
			return false;
		}
	};
	
	//The Potatoes
	Game_Actor.prototype.selectPreviousCommand = function() {
		//If actor can't select options, skips them
		if (this.isDead() || !this.canMove() || this.isAutoBattle() || this.isConfused()) return false;
		//Failsafe
		if (this._actionInputIndex < 0) return false;
		//Checks to see if there is a) actions for the system to recall and b) to see if there is any other party members behind them
		if (this.actionList.length > 0 || BattleManager._actorIndex == 0){
			var user = this;
		} else {
			//Alternate if either of the above checks failed
			//Gets the actorId that needs to be checked next
			var actorId = BattleManager._actorIndex-1;
			//Just something to keep it looping
            var stop = 0;
			while (stop != 1){
				//Gets the data of the selected actor
				var user = $gameParty.members()[actorId];
				//Checks if actor is suitable or is the last one in line
				if (actorId-1 > 0 && (user.isDead() || !user.canMove() || user.isAutoBattle() || user.isConfused())){
					//Reduces the actor id to check anotehr person behind them
					actorId--;
				} else {
					//Breaks the loop if either of the above conditions are met
					break;
				}
			}
		}
		//A variable to decrease the list length to the current action variable
		var down = user._actionInputIndex;
		//Checks to see if it needs adjusting to something bigger
		if (user.actionList.length != user._actionInputIndex+1){
			//Assigns the difference between the two plus 1
			down =  user._actionInputIndex - user.actionList.length + 1;
		} else {
			//Default of 1
			down = 1;
		}
		//Gets the current action that needs to be recovered
		var id = user.actionList[user._actionInputIndex-down];
		//Removes id from the list
		user.actionList.pop();
		//Chcks to see if the actor has any actions left
		if (user._actionInputIndex > 0) {
			if ($dataSkills[id].meta.actionCost != null){
				if ($dataSkills[id].meta.actionCost.toLowerCase().includes('all')){
					//Auto drops the actions they used to 0 due to the previous action taking all of them
					user._actionInputIndex = 0;
					return false;
				} else {
					//Gives back the actions that were stolen
					var reduce = Number($dataSkills[id].meta.actionCost);
					user._actionInputIndex -= reduce;
					if (user._actionInputIndex > 0){
						return true;
					} else {
						user._actionInputIndex = 0;
						return false;
					}
				}
			} else {
				//Standard action return stuff
				user._actionInputIndex--;
				if (user._actionInputIndex > 0){
					return true;
				} else {
					user._actionInputIndex = 0;
					return false;
				}
			}
		} else {
			user._actionInputIndex = 0;
			return false;
		}
	};
	
	//The command for going back through commands
	BattleManager.selectPreviousCommand = function() {
		do {
			//Added an additional check to see if the used had any actions in their list, making them go to the 
			//next if they don't
			if (!this.actor() || !this.actor().selectPreviousCommand() || this.actor().actionList.length <= 0) {
				this.changeActor(this._actorIndex - 1, 'undecided');
				if (this._actorIndex < 0) {
					return;
				}
			}
		} while (!this.actor().canInput());
	};
	
	//Determines the requirements for using the actions
	Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
		var bool3 = true;
		//Some Skill Core compatibility
		if (Imported.YEP_SkillCore) {
			var cost = this.skillHpCost(skill);
			if (cost > 0) {
			bool3 =  eval("this._hp > cost;");
			}
		}
		//Actually checks the # of actions v the # you have
		var bool2 = true;
		if ($dataSkills[skill.id].meta.actionCost != null){
			//Allows the skills to be used after selecting them
			if (this._actionState == 'inputting'){
				//Checks to see if the actor is on their first action for skills hat use all actions
				if ($dataSkills[skill.id].meta.actionCost.toLowerCase().includes('all')){
					bool2 = eval("this._actionInputIndex == 0");
				} else {
				//Checks the number of actions needed to use skills
					var actionNeed = Number($dataSkills[skill.id].meta.actionCost);
					bool2 = eval("this._actionInputIndex+actionNeed <= this.numActions()");
				}
			} else {
				bool2 = true;
			}
		} 
		var bool = this._tp >= this.skillTpCost(skill) && this._mp >= this.skillMpCost(skill);
		return bool && bool2 && bool3;
	};

})();
	
//=============================================================================
// End of File
//=============================================================================