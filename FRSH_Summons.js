//=============================================================================
// FRSH_Summons
// FRSH_Summons.js
// Version: 1.2.2
//=============================================================================

var Imported = Imported || {};
Imported.Summons = true;

var Frashaw = Frashaw || {};
Frashaw.Summons = Frashaw.Summons || {};

/*:
* @plugindesc Allows the ability to summon actors for the battle/a # of turns.
* @author Frashaw27
*
* @param summMax
* @text Max # of Summons
* @type number
* @desc Put the max amount of summons you want the player to be able to summon at one time. Put at 0 to have no max.
* @default 0
* @min 0
*
* @param defSummLvl
* @text Default Summon Level
* @type number
* @desc Put the default summon level you want if no level is inputted with the summon tag.
* @default 1
* @min 1
*
* @param graceTurn
* @text Allow Grace Turn?
* @type boolean
* @desc Click True or False if you want to have a grace turn between when the actor is summoned and starts loosing turns.
* @default true
*
* @param displayTurns
* @text Display Turns?
* @type boolean
* @desc Click True or False if you want to show the # of turns the summon will last in the summon message.
* @default true
*
* @param displayExclaim
* @text Display !?
* @type boolean
* @desc Click True or False if you want to show the ! at the end of the summon message.
* @default true
*
* @param defSumDeathText
* @text Default Summon Death Text
* @type text
* @desc Put the default text you want to use when a summoned ally dies. Use "%" to represent the summoned ally. Ex: "% died!".
* @default % died!
*
* @param defSumLeaveText
* @text Default Summon Leave Text
* @type text
* @desc Put the default text you want to use when a summon leaves. Use "%" to represent the summoned ally. Ex: "% left!".
* @default % left!
*
* @param defSumText
* @text Default Summon Enter Text
* @type text
* @desc Put the default text you want to use when summoning an ally. Use "%" to represent the summoned ally. Ex: "summoned %".
* @default summoned %
*
* @param showTurnsActor
* @text Display Remaining Turns?
* @type boolean
* @desc Click True or False if you want to show the actors remaining turns to the left of their name on the battle screen.
* @default true
*
* @param connector
* @text Connector of Name & Turn
* @type text
* @desc Input the symbol(s) that you want to use to connect the name and remaining turns (if shown).
* @default :
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Actor:
* <Summon Enter Message|summonEnter: ...>- Shows a different enter message 
* from other summons. Use % to indicate the summon's name. Summoner's name 
* will always appear at the front. Ex: "summoned % to the field!"
* <Summon Death Message|summonDeath: ...>- Shows a different death message 
* from other summons. Use % to indicate the summon's name. Ex: "% perished!"
* <Summon Leave Message|summonLeave: ...>- Shows a different leave message 
* from other summons. Use % to indicate the summon's name. Ex: "% left!"
* <Summon Eval|summonEval></Summon Eval|summonEval> - Put code between these 
* to run when actor is summoned.
* <Summon Leave Eval|summonLeaveEval></Summon Leave Eval|summonLeaveEval> - 
* Put code between these to run when the actor leaves/dies by any means.
* Skill/Item:
* <Summon: (id), (level), (turns)> - First number is the id of the actor 
* summoned, Second is the level (use 0 if you want the level to be
* the same as the summoner, use -1 for default level), Third is the 
* number of Turns (set to 0 or leave blank to stay until death). Can be put 
* multiple time in a single skill/item to summon multiple things.
* <Big Summon|bigSummon> - Makes the summon (singular) overtake the entire
* party for their duration.
* ===Script Calls=============================================================
* $gameParty.numSummons() - Calls the number of summons current in the party.
* ===Introduction=============================================================
* In RPG Maker, there is no innate way to summon actor fluidly for a certin
* amount of turns without some extensive eventing/scripting. This plugin
* aims to solve that by automating a lot of the process. Now, another 
* developer that goes by SumRndmDude also made a Summon plugin themselves.
* While it is good to use, my version aims to solve a few of the issues I had
* with their version, mainly the lack of a way to see the # of turns 
* remaining on a summon and the lack of the ability for a "BIG" summon that
* temporarily replaces your party ala Final Fantasy X.
* ===How to Use===============================================================
* Note: That all summons will be removed upon battle end and upon death.
* Also if the summoner dies, all their summons go with them.
*
* For the skill/item portion, simply put <Summon: x, x, x> into the 
* desired notes and start replacing the x with the corresponding numbers.
*
* x1 - The Summoned Actors's Id. Pretty self explanetory. Make sure to make
* this number a vaild actor as otherwise things will break. The only number
* required for the plugin to work, all others can be left blank and it will
* still run.
*
* x2 - The Summoned Actor's Level. Put the number here to set their level.
* If you put 0 in this slot, the summoned actor will instead use the 
* summoner's level. Putting this to -1 will result in them using the default
* level determined via the plugin parameters. Will follow the summoner's level
* if left blank.
*
* x3 - The Summoned Actor's # of turns they shall remain in battle. Put the
* number here for the amount of turns you want the actor to remain in the 
* battle before they leave. Leave blank/at 0 if you want them to remain
* for the length of the battle or until they die.
*
* x4 - If the Summon Actor will replace the party or not. Use 1 to indicate
* that the summon will temporarily replace the party, leave blank or at 0
* to indicate otherwise.
*
* If you need several summons, simply put the note tag in several times for
* each summon.
*
* When using <Summon Eval> you can use the following terms to short hand
* some code:
* The Summoner - user, summoner, a
* The Summonee - target, summonee, b
* You can use <Summon Leave Eval> for a simular effect but for when the 
* summon leaves via turn duration or dies.
* ===Change Log===============================================================
* Version 1.2.2 (12/27/23):
* -Made summons actually able to call their summon evals
* -Made big summons now ignore summon party size filter
*
* Version 1.2.1 (12/18/23):
* -Added a function to call the number of summons in the party
*
* Version 1.2.0 (12/17/23):
* -Rewritten the code significantly
* -Removed "option" for multiple of the same actor due to no longer working
* -Removed option for text caching as it no longer is needed
* -Added alt calls for all the summon tags
* -Made the plugin a function so that variables can't be messed with outside
* of this plugin
* -Change the default level setting to following the summoner's level
* -Multiple summons are now just done with using the same summon tag
* multiple times
*
* Version 1.1.3 (11/03/23):
* -Added a hot fix that makes it so that all summoned actors are removed at 
* the end of action, instead of just one dying 
*
* Version 1.1.2 (07/09/23) :
* -Change the way text is shown so that it shows after the use message in a
* less "hacky" way
*
* Version 1.1.1 (06/13/23) :
* -Added a Leave Eval for summons when they die or leave via turns
* -Fixed a bug where death message called the wrong name
*
* Version 1.1.0 (06/12/23) :
* -Added an option to allow multiple of the same summon
* -Added a way to Mass Summon several actors
*
* Version 1.0.2 (06/11/23) :
* -Added Compatibility with AntiMessage
*
* Version 1.0.1 (04/13/23) :
* -Added in code to deny item use that summon if they don't follow the 
* conditions
*
* Version 1.0 (04/13/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_Summons');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.maxSumms = Number(Parameters.summMax);
Frashaw.Param.defaultSummLevel = Number(Parameters.defSummLvl);
if (Parameters.graceTurn === "true"){
	Frashaw.Param.GraceTurn = true;
} else {
	Frashaw.Param.GraceTurn = false;
}
if (Parameters.displayTurns === "true"){
	Frashaw.Param.displayTurns = true;
} else {
	Frashaw.Param.displayTurns = false;
}
if (Parameters.displayExclaim === "true"){
	Frashaw.Param.displayExclaim = true;
} else {
	Frashaw.Param.displayExclaim = false;
}
Frashaw.Param.defaultSummDeathText = Parameters.defSumDeathText;
Frashaw.Param.defaultSummLeaveText = Parameters.defSumLeaveText;
Frashaw.Param.defaultSummEnterText = Parameters.defSumText;
if (Parameters.displayExclaim === "true"){
	Frashaw.Param.displayExclaim = true;
} else {
	Frashaw.Param.displayExclaim = false;
}
if (Parameters.showTurnsActor === "true"){
	Frashaw.Param.showTurnsActor = true;
} else {
	Frashaw.Param.showTurnsActor = false;
}
Frashaw.Param.ConnectSymbol = Parameters.connector;

//Sets up various variables for use
var FrshSummonLoaded = false;
var summonOverride = undefined;
var summonTextBool = false;
var summonList = [];
var summonEntered = [];
var summonText = '';
var summonsText = '';

function clear(){
	//Here because it didn't want to not crash when left by itself
	SceneManager._scene._logWindow.clear();
}

//Starts the function to intialize all the summon notetags
FrshSummon_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshSummon_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshSummonLoaded == false) {
		//Processes the notetags of actors, skills, and items
		this.processSummonee($dataActors);
		this.processSummoner($dataSkills);
		this.processSummoner($dataItems);
		//Make sure it doesn't run twice
		FrshSummonLoaded = true;
	}
	return true;
};

//Does the processing to get aspects of actors
DataManager.processSummonee = function(group) {
	//Loads up various strings to check for
	var note1a = /<(?:SUMMON EVAL|summonEval)>/i;
	var note1b = /<\/(?:SUMMON EVAL|summonEval)>/i;
	var note1c = /<(?:SUMMON LEAVE EVAL|summonLeaveEval)>/i;
	var note1d = /<\/(?:SUMMON LEAVE EVAL|summonLeaveEval)>/i;
	var note2 = /<(?:SUMMON DEATH MESSAGE|summonDeath):[ ](.*)>/i;
	var note3 = /<(?:SUMMON LEAVE MESSAGE|summonLeave):[ ](.*)>/i;
	var note4 = /<(?:SUMMON ENTER MESSAGE|summonEnter):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the actors for these various conditions
		var customMode = 'none';
		obj.summonEval = '';
		obj.leaveEval = '';
		obj.summonDeath = '';
		obj.summonLeave = '';
		obj.summonEnter = '';
		obj.uniqueSummon = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			//For the start of the summon eval
			if (line.match(note1a)) {
				customMode = 'summon';
			//For the end of the summon eval
			} else if (line.match(note1b)){
				customMode = 'none';
			//For starting the summon leave eval
			} else if (line.match(note1c)){
				customMode = 'death';
			//For ending the summon leave eval
			} else if (line.match(note1d)){
				customMode = 'none';
			//For the summon death message
			} else if (line.match(note2)){
				obj.summonDeath = String(RegExp.$1);
			//For the summon leave message
			} else if (line.match(note3)){
				obj.summonLeave = String(RegExp.$1);
			//For the summon leave message
			} else if (line.match(note4)){
				obj.summonEnter = String(RegExp.$1);
			//For the summon enter message
			} else if (customMode === 'summon') {
				obj.summonEval = obj.summonEval + line + '\n';
			} else if (customMode === 'death') {
				obj.leaveEval = obj.leaveEval + line + '\n';
			}
		}
  }
}

//Does the processing
DataManager.processSummoner = function(group) {
	//Loads up various strings to check for
	var note1 = /<SUMMON:[ ](.*)>/i;
	var note2 = /<(?:BIG SUMMON|bigSummon)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the actors for these various conditions
		var customMode = 'none';
		obj.summon = [];
		obj.bigSummon = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			//For the start of the summon eval
			if (line.match(note1)) {
				var array = RegExp.$1.split(",");
				for (var loop = 0; loop != array.length; loop++){
					array[loop] = Number(array[loop])
				}
				while (array.length < 3){
					array.push(0);
				}
				obj.summon.push(array);
			} else if (line.match(note2)){
				obj.bigSummon = true;
			}
		}
  }
}
//==========================================================================================
//A function to give the summon values to the actual actors
Game_Actor.prototype.summonAttributesGet = function() {
	var id = this.actorId();
	if ($dataActors[id].summonEval != ''){
		this.summonEval = $dataActors[id].summonEval;
	} else {
		this.summonEval = undefined;
	}
	if ($dataActors[id].leaveEval != ''){
		this.leaveEval = $dataActors[id].leaveEval;
	} else {
		this.leaveEval = undefined;
	}
	if ($dataActors[id].summonDeath != ''){
		var text = $dataActors[id].summonDeath.replace("%", this.name());
	} else {
		var text = Frashaw.Param.defaultSummDeathText.replace("%", this.name());
	}
	this.summonDeath = text;
	if ($dataActors[id].summonLeave != ''){
		var text = $dataActors[id].summonLeave.replace("%", this.name());
	} else {
		var text = Frashaw.Param.defaultSummLeaveText.replace("%", this.name());
	}
	this.summonLeave = text;
	if ($dataActors[id].summonEnter != ''){
		var text = $dataActors[id].summonEnter.replace("%", this.name());
	} else {
		var text = Frashaw.Param.defaultSummEnterText.replace("%", this.name());
	}
	this.summonEnter = text;
	this.summons = [];
};

//An extention to call said summon value get function
frsh_summons_values_get = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    frsh_summons_values_get.call(this, actorId);
	this.summonAttributesGet();
};

//an overwrite to get either the big summon or the normal party + summons
frsh_summons_member_list = Game_Party.prototype.battleMembers;
Game_Party.prototype.battleMembers = function() {
	if (summonOverride != null){
		var list = [$gameActors.actor(summonOverride)]; 
    } else {
		var list = frsh_summons_member_list.call(this);
		list = list.concat(summonList);
	}
	return list;
};

//A function made to evaluate the summoning eval of actors
Game_Battler.prototype.evaluateSummon = function(target){
	//Sets summoner shorthands
	var a = this;
	var user = this;
	var summoner = this;
	//Sets summonee shorthands
	var b = target;
	var summonee = target;
	var code = target.summonEval;
	//Sees if code will produce an error
	try {
		//Runs code, goes through if no errors
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = target._name + " Summon Eval Error!!!!!"
		console.log(text);
		//Displays code to the console log
		console.log(code || 'No Code');
		//Produces the error itself to the console
		console.error(e);
		//Checks to see if the game is in testing
		if (Utils.isOptionValid('test')){
			//Force opens the console log if it is
			require('nw.gui').Window.get().showDevTools();
		}
	}
}

//A function made to evaluate the summoning eval of actors
Game_Battler.prototype.evaluateLeave = function(){
	var a = this;
	var user = this;
	var summoner = this;
	var b = this;
	var code = this.leaveEval;
	//Sees if code will produce an error
	try {
		eval(code);
	} catch (e) {
		var text = target._name + " Leave Eval Error!!!!!"
		console.log(text);
		console.log(code || 'No Code');
		console.error(e);
		if (Utils.isOptionValid('test')){
			//Force opens the console log if it is
			require('nw.gui').Window.get().showDevTools();
		}
	}
}

//Where the actual summoning happens
frsh_summons_summoning = Game_Action.prototype.applyItemUserEffect ;
Game_Action.prototype.applyItemUserEffect = function(target) {
	//All other preformActionEnd things
	frsh_summons_summoning.call(this,target);
	//Checks to see if the used skill/item has summon potential
	if (this.item().summon.length != 0){
		//Loops through all the summons until either all the summons are summoned or the cap is reached
		for (var loop = 0; loop != this.item().summon.length && (summonList.length < $gameParty.maxSummons() || this.item().bigSummon); loop++){
			//Adds all the summon to the party
			$gameParty.addSummon(this.item().summon[loop][0]);
			//Sets the actor for ease of use
			var actor = $gameActors.actor(this.item().summon[loop][0]);
			//Initalizes out said actor
			actor.setup(this.item().summon[loop][0]);
			//Checks to see if the summon has a specified set level, is going to copy the 
			//summoner's level, or is going to be the default summon level 
			if (this.item().summon[loop][1] > 0){
				actor._level = this.item().summon[loop][1];
			} else if (this.item().summon[loop][1] == -1){
				actor._level = Frashaw.Param.defaultSummLevel;
			} else {
				actor._level = this.subject()._level;
			}
			//A simple thing to make sure that the leveled up actor doesn't have missing Hp/Mp
			actor.setHp(actor.mhp);
			actor.setMp(actor.mmp);
			//Sets the turns if applicable
			if (this.item().summon[loop][2] != 0){
				actor.summonTurns = this.item().summon[loop][2];
				//If the setting is on, adds a grace turn to the turn counter for the summoned turn
				if (Frashaw.Param.GraceTurn) actor.summonBool = true;
			}
			//A setting that allows for an ease of use for the various summon functions
			actor.summoned = true;
			//Checks if the summon is gonna be a big summon
			if (this.item().bigSummon){
				summonOverride = actor.actorId();
			}
			//Adds to the summoner's array of summons to remove when they die
			this.subject().summons.push(actor);
			//Sets who summoned the summon on the summon themselves
			actor.summoner = this.subject();
			//Adds the name to the array of those to be brought up when the messages of who was summoned is shown
			summonEntered.push($gameActors.actor(this.item().summon[loop][0]));
			//Runs the Summon's Eval
			this.subject().evaluateSummon(actor);
		}
	}
}

//Checks to see if the summons can be summoned
frsh_summons_skill_allow = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
	if (skill.summon.length > 0){
		//Checks to see if the summon is already summoned, if a big summon is present, or the summon max has 
		//been reached
		for (var loop = 0; loop != skill.summon.length; loop++){
			if (summonOverride != null || (summonList.length == $gameParty.maxSummons() && !skill.bigSummon) || summonList.contains($gameActors.actor(skill.summon[loop][0]))) return false;
		}
	}
	return frsh_summons_skill_allow.call(this,skill);
};

//Literally the same as above but for items
frsh_summons_item_allow = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
	if (item.summon.length > 0){
		for (var loop = 0; loop != item.summon.length; loop++){
			if (summonOverride != null || (summonList.length == $gameParty.maxSummons() && !item.bigSummon) || summonList.contains($gameActors.actor(item.summon[loop][0]))) return false;
		}
	}
    return frsh_summons_item_allow.call(this,item);
};


//A function to run at the end of turns
frsh_summons_summon_removes = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
	//Checks to see if target is a summon
	if (this.summoned){
		//Runs if the summon is dead
		if (this.isDead()){
			//Runs their leave eval
			if (this.leaveEval != null) this.evaluateLeave();
			//Removes the summon from the memebr list
			if (this.actorId() == summonOverride) summonOverride = undefined;
			$gameParty.removeSummon(this.actorId());
		} else if (this.summonTurns != null){
			//Checks to see if they have their grace turn
			if (this.summonBool != null){
				//Sets grace turn to null and does nothing else if they do 
				this.summonBool = undefined;
			} else {
				//Decreases their summon turns by 1 if they don't
				this.summonTurns--;
			}
			//Checks to see if their summon turns has reached 0
			if (this.summonTurns == 0){
				//Makes their summon turns undefined
				this.summonTurns = undefined;
				//Removes the override if applicable
				if (summonOverride != null && this.actorId() == summonOverride) summonOverride = undefined;
				//Runs their leave eval
				if (this.leaveEval != null) this.evaluateLeave();
				//Removes the summon
				$gameParty.removeSummon(this.actorId());
				//Shows text in battle log
				SceneManager._scene._logWindow.addText(this.summonLeave);
				//Adds a wait to read
				SceneManager._scene._logWindow.waitt();
				//Adds a timeout for the clear command
				setTimeout(clear, 1000);
			}
		}
	}
	//Normal turn end things
	frsh_summons_summon_removes.call(this);
};

//Function to run at the end of battle
frsh_summons_battleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
	//Normal Battle End things
	frsh_summons_battleEnd.call(this);
	//Removes big summons
	summonOverride = undefined;
	//Clears all summons
	summonList = [];
	//Clears the summoner of all their previously associated summons
	if (this.isActor()) this.summoned = [];
};

//An extendion that checks if the desceased is summoned/has summoned and acts accordingly
frsh_summons_summon_death = Game_BattlerBase.prototype.die
Game_BattlerBase.prototype.die = function() {
    frsh_summons_summon_death.call(this);
	//Runs if the user has summoned
	if (this.summons.length != 0){
		//Goes through each summon and sets their Hp to 0, killing them
		for (var loop = this.summons.length; loop != 0; loop--){
			var summon = this.summons[loop-1];
			summon.setHp(0);
		}
	}
	//Runs if the desceased was a big summon
	if (this.summoned && summonOverride != null){
		//Gets rid of the big summon
		summonOverride = undefined;
		if (this.leaveEval != null) this.evaluateLeave();
		$gameParty.removeSummon(this.actorId());
	}
};

//A function to add summons to the summon list
Game_Party.prototype.addSummon = function(actorId) {
    if (!this._actors.contains(actorId)) {
        summonList.push($gameActors.actor(actorId));
    }
};

//A function that removes summons from the summon list and the summoner's summon list
Game_Party.prototype.removeSummon = function(actorId) {
    if (!this._actors.contains(actorId)) {
        summonList.splice(summonList.indexOf($gameActors.actor(actorId)), 1);
		$gameActors.actor(actorId).summoner.summons.splice($gameActors.actor(actorId).summoner.summons.indexOf($gameActors.actor(actorId)), 1);
    }
};

//A function that returns the number of summons
Game_Party.prototype.numSummons = function() {
    return summonList.length;
};

//Calculates the total number of summons allowed
Game_Party.prototype.maxSummons = function() {
	//Checks if the "infinite" summon option is selected or not
	if (Frashaw.Param.maxSumms != 0) {
		return Frashaw.Param.maxSumms;
    } else {
		return 20000000000000;
	}
};


//==========================================================================================
//Doesn't overwrite if ColoredNames is in the game
if (!Imported.CName){
	//Overwrites the actor's name in the battle screen to show truns
	Window_Base.prototype.drawActorName = function(actor, x, y, width) {
		//Checks to see if there are summon turns at all and they can be used
		if (actor.summonTurns != null && Frashaw.Param.showTurnsActor){
			//adds the divider
			var name = actor.summonTurns + Frashaw.Param.ConnectSymbol;
		} else {
			//Intializes name as blank
			var name = "";
		}
		//Adds in their base name
		name += actor._name;
		//Draws Name
		this.drawText(name, x, y, width);
	};
}

//A function overwritten to include the summons death message
Window_BattleLog.prototype.displayAddedStates = function(target) {
	target.result().addedStateObjects().forEach(function(state) {
		var stateMsg = target.isActor() ? state.message1 : state.message2;
		if (state.id === target.deathStateId()) {
			this.push('performCollapse', target);
		}
		if (stateMsg) {
			this.push('popBaseLine');
			this.push('pushBaseLine');
			//Checks to see if the current applying state is death
			if (state.id === target.deathStateId()){
				//Checks to see if target has the summon tag
				if (target.summoned){
					//Checks to see if the actor has a custom death message
					if (target.summonDeath != null || target.summonDeath == ''){
						//Uses it if they do
						this.push('addText', target.summonDeath);
					} else {
						//Uses default if they don't
						var text = Frashaw.Param.defaultSummDeathText;
						text = text.replace("%", target.name());
						this.push('addText', text);
					}
				} else {
					//Does normal message if target is not a summon
					this.push('addText', target.name() + stateMsg);
				}
			} else {
				//Does normal message if not death
				this.push('addText', target.name() + stateMsg);	
			}
			this.push('waitForEffect');
		}
	}, this);
};

//A function dedicated specifically to calling the summon messages after actions
frsh_summons_display_summon = Window_BattleLog.prototype.displayActionResults
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	frsh_summons_display_summon.call(this, subject, target);
    if (target.result().used) {
        this.displaySummon(target);
    }
};

//A function that goes through summonEntered to give each summon entered message
Window_BattleLog.prototype.displaySummon = function(target) {
	var thing = BattleManager._action.item();
	if (summonEntered.length != 0){
		for (var loop = 0; loop != summonEntered.length; loop++){
			this.push('addText', BattleManager._action.subject().name() + " " + summonEntered[loop].summonEnter);
		}
		summonEntered = [];
	}
};

//A message to cause a slight amount of wait in the battle log, specifically a second
Window_BattleLog.prototype.waitt = function() {
	this._waitCount = 60;
};

})();

//=============================================================================
// End of File
//=============================================================================
