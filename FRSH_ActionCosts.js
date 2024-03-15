//=============================================================================
// FRSH_ActionCosts
// FRSH_ActionCosts.js
// Version: 1.2.2
//=============================================================================

var Imported = Imported || {};
Imported.ACosts = true;

var Frashaw = Frashaw || {};
Frashaw.ACosts = Frashaw.ACosts || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows the maker to make skills cost extra actions
*
* @param displayAct
* @text Display Needed Actions?
* @type boolean
* @desc Click True or False if you want to show the # of needed actions to use the skill in the skill cost.
* @default true
*
* @param fontText
* @text Action Cost Text
* @type text
* @desc The text used to display the number of needed actions. Use % to represent action number/All. EX: %Acts
* @default % Acts
*
* @param allText
* @text All Action Cost Text
* @type text
* @desc The text used to display needing all actions.
* @default All
*
* @param fontSize
* @text Action Cost Size
* @type number
* @min 0
* @desc Font size used for action requirements. Use 0 to use the default font size.
* @default 24
*
* @param fontColor
* @text Action Cost Color
* @type number
* @min 0
* @max 31
* @desc The text color used for action requirements.
* @default 0
*
* @help
* ==Notetags==================================================================
* Case Insensitive
* <either of these|syntaxesWorks>
* Use a select # of actions: <actionCost: insert number here>
* Use all actions: <Action Cost All|Action All|All Action|allAction|actionAll>
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
* Version 1.2.2 (03/15/24):
* -Added an exception so that actors that can't take actions don't crash the
* game
*
* Version 1.2.1 (02/08/24):
* -Fixed bug where the acton cost would show on the equipment
*
* Version 1.2.0 (01/29/24):
* -Rewrote the plugin
* -Added multple ways to call the action cost modifier
* -Added a new way to have all actions to be called
* -You can't use action that sot multiple actions if you don't have said 
* actions
* -Action Costs are now displayed on items 
*
* Version 1.1.1 (04/13/23):
* -Updated how the action cost is required
*
* Version 1.1.0 (03/31/23):
* -Added Actions Required Display
*
* Version 1.0.0 (03/30/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_ActionCosts');
Frashaw.Param = Frashaw.Param || {};
if (Parameters.displayAct === "true"){
	Frashaw.Param.displayAct = true;
} else {
	Frashaw.Param.displayAct = false;
}
Frashaw.Param.fontText = Parameters.fontText;
Frashaw.Param.allText = Parameters.allText;
Frashaw.Param.fontSize = Number(Parameters.fontSize);
Frashaw.Param.fontColor = Number(Parameters.fontColor);

//Variables set up to make things run smoothly
var FrshActionCostsLoaded = false;
var returnal = false;
var itemCheck = true;

//Starts the function to intialize all the notetags
FrshActionCosts_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshActionCosts_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshActionCostsLoaded == false) {
		//Processes the notetags of items and skills
		this.processActionNotetags($dataItems);
		this.processActionNotetags($dataSkills);
		//Make sure it doesn't run twice
		FrshActionCostsLoaded = true;
	}
	return true;
};

//Does the processing for the skills and items
DataManager.processActionNotetags = function(group) {
	//Loads up various strings to check for
	var note = /<(?:ACTION COST|actionCost):[ ](.*)>/i;
	var note2 = /<(?:ACTION COST ALL|ACTION ALL|ALL ACTION|allAction|actionAll)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.actionCost = 1;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
				obj.actionCost += (Number(RegExp.$1)-1);
			} else if (line.match(note2)){
				obj.actionCost = -1;
			}
		}
	}
}

//Extention that sets a list of actions the user will use on their turn for reference
frsh_actioncost_action_set = Game_Battler.prototype.makeActions;
Game_Battler.prototype.makeActions = function() {
	frsh_actioncost_action_set.call(this);
	this.actionList = [];
};

//The Meat
Game_Actor.prototype.selectNextCommand = function() {
	//Checks to see if the action beign inputted is an item or skill, and then adds them to the action list
	if (this.canMove()){
		if (this.action(this._actionInputIndex)._item._dataClass == "skill"){
			this.actionList.push($dataSkills[this.action(this._actionInputIndex)._item._itemId]);
		} else {
			this.actionList.push($dataItems[this.action(this._actionInputIndex)._item._itemId]);
		}
		//Counter to get how many "actions" the user has taken
		var counter = 0;
		//Goes through each action to accumalate the number of actions they have taken
		for (var loop = 0; loop != this.actionList.length; loop++){
			if (this.actionList[loop].actionCost != -1){
				counter += this.actionList[loop].actionCost;
			} else {
				//Special out for when the action is one that takes all actions, setting it to 
				//the max and immedatly breaking the loop
				counter = this.numActions();
				break;
			}
		}
	} else {
		counter = this.numActions() + 1;
	}
	//Sets the input index to what the counter got, for plugins/things that call it
	this._actionInputIndex = counter;
	//Checks to see if the number of actions counted surpasses the number actions can take,
	//Going to the next member/actual turn if it has
	if (counter < this.numActions()) {
        return true;
    } else {
        return false;
    }
};

//The Potatoes
Game_Actor.prototype.selectPreviousCommand = function() {
	//Removes the last action on the user's action list
	this.actionList.pop()
	var counter = 0;
	//A bool to see if it's their 1st action, so it doesn't immedatly go to the previous
	//thing if you went back to your first
	var maybe = false;
	//Same thing as the fucntion above, but for counting the remaining actions instead
	for (var loop = 0; loop != this.actionList.length; loop++){
		if (this.actionList[loop].actionCost != -1){
			counter += this.actionList[loop].actionCost;
		} else {
			counter = 0;
			break;
		}
	}
	//The check for the first action
	if (this._actionInputIndex != 0) maybe = true;
	this._actionInputIndex = counter;
	//Checks to see if there is no more action and the bool are false so that it can back to the
	//previous member
	if (counter > 0 || maybe) {
        return true;
    } else {
		//Special variable to call to reduce the things of the person behind the current user
		returnal = true;
        return false;
    }
};

//An extention to remove the things the previous member had on them so that it can work properly 
frsh_actioncost_remove_previous_shit = Scene_Battle.prototype.changeInputWindow;
Scene_Battle.prototype.changeInputWindow = function() {
    if (BattleManager.isInputting()) {
        if (BattleManager.actor()) {
			//Checks to see if the switch to remove the last actors shit is active
			if (returnal){
				//Checks to see if the last action was an all actions action or a numerical one, setting the
				//actions to 0 if the former is true
				if (BattleManager.actor().actionList[BattleManager.actor().actionList.length-1].actionCost != -1){
					BattleManager.actor()._actionInputIndex--;
				} else {
					BattleManager.actor()._actionInputIndex = 0;
				}
				BattleManager.actor().actionList.pop();
				returnal = false;
			}
            this.startActorCommandSelection();
        } else {
			returnal = false;
            this.startPartyCommandSelection();
        }
    }
	frsh_actioncost_remove_previous_shit.call(this);
};

//An extention to make the action costed items to actually restrict when selecting them
frsh_actioncost_item_stop_a = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    frsh_actioncost_item_stop_a.call(this);
	itemCheck = true;
};

//An extention to make the action costed items to actually work when not selecting them
frsh_actioncost_item_stop_b = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
    frsh_actioncost_item_stop_b.call(this);
	itemCheck = false;
};

//An extention that allows/disallows the use to use skills if the actor has the required amount of actions
frsh_actioncost_no_use_skill = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
	if (this.isInputting() && $gameParty.inBattle()){
		//Checks to see if the item is an all action cost or not
		if (skill.actionCost != -1){
			//Checks to see if the actions required is below/surpasses the actions the user
			//has available
			if (this._actionInputIndex + skill.actionCost > this.numActions()) return false;
		} else {
			//Checks if the user has inputted any action
			if (this._actionInputIndex != 0) return false;
		}
	}
	return frsh_actioncost_no_use_skill.call(this, skill);
};

//Saem as above but for items
frsh_actioncost_no_use_item = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
	if ($gameParty.inBattle() && itemCheck){
		if (item.actionCost != -1){
			if (this._actionInputIndex + item.actionCost > this.numActions()) return false;
		} else {
			if (this._actionInputIndex != 0) return false;
		}
	}
    return frsh_actioncost_no_use_item.call(this, item);
};

//Tacks on the action cost display
frsh_actioncost_draw_skill = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
	//Checks to see if the actions cost is in there
	if (skill.actionCost != 1){
		//Draws the display
		width = this.drawActions(skill, x, y, width);
	}
	//Does the rest of the cost displays
	return frsh_actioncost_draw_skill.call(this,skill, x, y, width);
};

//Same as above but for items and their quanities
frsh_actioncost_draw_item = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
	if (DataManager.isItem(item) && item.actionCost != 1){
		width = this.drawActions(item, x, y, width);
	}
	frsh_actioncost_draw_item.call(this, item, x, y, width);
};

//Draws the actions proper
Window_Base.prototype.drawActions = function(skill, wx, wy, dw) {
	//returns if action cost doesn't exist
	if (skill.actionCost == 1) return dw;
	//checks if the font size is going to be use the system default or not
	if (Frashaw.Param.fontSize != 0){
		//sets the text size to the parameter
		this.contents.fontSize = Frashaw.Param.fontSize;	
	} else { 
		//sets the text size to the system normal
		this.contents.fontSize = this.standardFontSize();
	}
	//changes the text color to the parameter
	this.changeTextColor(this.textColor(Frashaw.Param.fontColor));
	var text = Frashaw.Param.fontText;
	//checks if the proper text should use an all or a number attach
	if (skill.actionCost > -1){
		//attaches the number text
		text = text.replace("%", skill.actionCost);
	} else {
		//attaches the all text
		text = text.replace("%", Frashaw.Param.allText);
	}
	//draws the text proper
	this.drawText(text, wx, wy, dw, 'right');
	//checks if skill core is imported
	if (Imported.YEP_SkillCore) {
		//uses yanfly skill core's cost padding
		var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
	} else {
		//uses normal cost padding
		var returnWidth = dw - this.textWidth(text) - this.textPadding();
	}
	this.resetTextColor();
	this.resetFontSettings();
	//returns the width for proper texr shifting
	return returnWidth;
};
})();
//=============================================================================
// End of File
//=============================================================================
