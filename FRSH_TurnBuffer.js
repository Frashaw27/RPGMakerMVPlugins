//=============================================================================
// FRSH_TurnBuffer
// FRSH_TurnBuffer.js
// Version: 1.1.1
//=============================================================================

var Imported = Imported || {};
Imported.TBuffer = true;

var Frashaw = Frashaw || {};
Frashaw.TBuffer = Frashaw.TBuffer || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows Buff, Debuffs, and States to have a buffer turn.
*
* @param stateOne
* @text Restrict 1 Turn States?
* @type boolean
* @desc Click True or False if you want to not add the buffer to 1 turn State Applications.
* @default true
*
* @param buffOne
* @text Restrict 1 Turn De/Buffs?
* @type boolean
* @desc Click True or False if you want to not add the buffer to 1 turn Buff/Debuff Applications.
* @default true
*
* @param
* @default
*
* @param statePosAdjust
* @text Buffer Positive State?
* @type boolean
* @desc Click True or False if you want to not add the buffer when adjusting a State duration positively.
* @default true
*
* @param stateNegAdjust
* @text Buffer Negative State?
* @type boolean
* @desc Click True or False if you want to not add the buffer when adjusting a State duration negatively.
* @default false
*
* @param buffPosAdjust
* @text Buffer Positive Buff?
* @type boolean
* @desc Click True or False if you want to not add the buffer when adjusting a Buff duration positively.
* @default true
*
* @param buffNegAdjust
* @text Buffer Negative Buff?
* @type boolean
* @desc Click True or False if you want to not add the buffer when adjusting a Buff duration negatively.
* @default false
*
* @param debuffPosAdjust
* @text Buffer Positive Debuff?
* @type boolean
* @desc Click True or False if you want to not add the buffer when adjusting a Debuff duration positively.
* @default true
*
* @param debuffNegAdjust
* @text Buffer Negative Debuff?
* @type boolean
* @desc Click True or False if you want to not add the buffer when adjusting a Debuff duration negatively.
* @default false
*
* @help
* ==Notetags====================================================================
* Spaces and Capitalization doesn't matter
*
* States:
* <Ignore Buffer> - Overrides Buffer rules to not be added to the buffer list
* <Always Buffer> - Overrides Buffer rules to always be added to the buffer 
* list
* ===Introduction===============================================================
* Base RPG Maker is kinda misleading with how it devies up turns, making the 
* current turns it's applied a turn that is used when counting down the 
* counter. While this is fine for some people, this is plugin is for people
* (like me) who don't want that and so this plugin gives a turn where they
* won't decrease after application.
* ===How to Use=================================================================
* !!! Action Removed Stats work normally with on !!!
* Setup the settigns and then Plug and Play, very simple. 
* !~~Note~~!
* If you are using Yanfly Buff and States Core, please post this below it for 
* full capatability.
* ===Change Log=================================================================
* Version 1.1.1 (06/19/25) :
* -Fixed an oversight with setting the propery of alwaysBuffer
*
* Version 1.1.0 (06/18/25) :
* -Updated the method of getting the note tages for ease of use and more stable
* implamentation
* -Added Compatablity with Yanfly Buff and States Core for Buffers on changing
* State and Buff timers with the respective notetags
* -Updated the checks and terminology of the plugin overall
* -Updated comments in plugin for better descriptions
* -Closed off the plugin in a function so variables and what not doesn't
* leakout
*
* Version 1.0.3 (02/10/25) :
* -Fixed a bug that had End of the turn Forced Actions to have the buffer 
* turn, resulting in them actually having two as the turn processing is over 
* post use
*
* Version 1.0.2 (07/07/23) :
* -Added notetags to allow the option for certain states to ignore/always
* the buffer addition, ignoring the rules put in place 
*
* Version 1.0.1 (05/28/23) :
* -Fix a typo that caused states to not go down
*
* Version 1.0 (05/11/23) :
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_TurnBuffer');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.StateOne = Parameters.stateOne == "true";
Frashaw.Param.BuffOne = Parameters.buffOne == "true";
Frashaw.Param.StatePosAdjust = Parameters.statePosAdjust == "true";
Frashaw.Param.StateNegAdjust = Parameters.stateNegAdjust == "true";
Frashaw.Param.BuffPosAdjust = Parameters.buffPosAdjust == "true";
Frashaw.Param.BuffNegAdjust = Parameters.buffNegAdjust == "true";
Frashaw.Param.DebuffPosAdjust = Parameters.debuffPosAdjust == "true";
Frashaw.Param.DebuffNegAdjust = Parameters.debuffNegAdjust == "true";

//Preloads the various things for the evals
var FrshTBufferLoaded = false;
FrshTBufferLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshTBufferLoaded_database.call(this)) return false; 
	if (FrshTBufferLoaded == false) {
		this.processBufferThings($dataStates);
		FrshTBufferLoaded = true;
	}
	return true;
};

//A function to process the unique ignores and always for states
DataManager.processBufferThings = function(group) {
	var string = "";
	var noteA = /<Ignores?[ ]?Buffer>/i;
	var noteB = /<Always?[ ]?Buffer>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for the checks later
		obj.ignoreBuffer = false;
		obj.alwaysBuffer = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(noteA)) {
				obj.ignoreBuffer = true;
			} else if (line.match(noteB)){
				obj.alwaysBuffer = true;
			}
		}
	}
};

//An extention to make sure the buff and state buffers are properly initalized beforebegin
//use
frsh_tBuffer_initIndexes = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    frsh_tBuffer_initIndexes.call(this);
    this.stateBufferIndex = [];
	this.buffBufferIndex = [];
};

//State add addon to add state to index
frsh_tBuffer_addState_index = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    frsh_tBuffer_addState_index.call(this,stateId);
	//Checks to see if the state index  is already includes in this so it isn't added twice
	if (!this.stateBufferIndex.contains(stateId) && !$dataStates[stateId].ignoreBuffer){
		//Checks to see if the proper turn condition is applied, if the current application
		//is a forced action, or if the phase was from the turn end. The latter two
		//making it so that the buffer turn actually last 2 turns
		if ($dataStates[stateId].alwaysBuffer || (this._stateTurns[stateId] > 1 || Frashaw.Param.StateOne == false) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")) this.stateBufferIndex.push(stateId);
	}
};

//An extention to add the proper buff to the buffer index
frsh_tBuffer_addBuff_index = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns, user) {
	frsh_tBuffer_addBuff_index.call(this, paramId, turns, user);
	//Checks to see if the buff index  is already includes in this so it isn't added twice
	if (!this.buffBufferIndex.contains(paramId)){
		//Same as the state one, but for buffs
		if ((turns > 1 || Frashaw.Param.BuffOne == false) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")) this.buffBufferIndex.push(paramId);
	}
};

//Same as above, but for debuff
frsh_tBuffer_addDebuff_index = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns, user) {
	frsh_tBuffer_addDebuff_index.call(this, paramId, turns, user);
	if (!this.buffBufferIndex.contains(paramId)){
		if ((turns > 1 || Frashaw.Param.BuffOne == false) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")) this.buffBufferIndex.push(paramId);
	}
};

//Overwrite for how the state turns decrease
Game_BattlerBase.prototype.updateStateTurns = function() {
    this._states.forEach(function(stateId) {
		//Checks to see if the removal is for specifically the turn end
		if ($dataStates[stateId].autoRemovalTiming == 2){
			//Checks if the state is in the index
			if (!this.stateBufferIndex.contains(stateId)){
				//Removes turn if no
				if (this._stateTurns[stateId] > 0) {
					this._stateTurns[stateId]--;
				}
			} else {
				//Removes the state from the index if yes
				var index = this.stateBufferIndex.indexOf(stateId);
				this.stateBufferIndex.splice(index,1);
			}
		} 
    }, this);
};

//An overwrite for how Buffs and Debuffs decrease to account for the buffer turn
Game_BattlerBase.prototype.updateBuffTurns = function() {
    for (var i = 0; i < this._buffTurns.length; i++) {
		//Checks if the buff is in the index
		if (!this.buffBufferIndex.contains(i)){
			//Removes turn if no
			if (this._buffTurns[i] > 1) {
				this._buffTurns[i]--;
			} else {
				this.removeBuff(i);
			}
		} else {
			//Removes the buff from the index if yes
			var index = this.buffBufferIndex.indexOf(i);
			this.buffBufferIndex.splice(index,1);
		}
    }
};

//Resets the 2 indexs on the end of battle
frsh_tBuffer_index_reset = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    frsh_tBuffer_index_reset.call(this);
	this.stateBufferIndex = [];
	this.buffBufferIndex = [];
};

//Makes sure the below section doesn't run without Yanfly Buff and States Core
if (Imported.YEP_BuffsStatesCore){
	
	frsh_tBuffer_yanfly_BuffStateCore_state_add = Game_Action.prototype.applyModifyStateTurns;
	//An extention that checks the BuffAndStatesCore calls when they're used to apply
	//the respective conditions are met
	Game_Action.prototype.applyModifyStateTurns = function(target) {
		turns = [];
		//Puts the variable keys into an array to be gone through
		turnKey = Object.keys(target._stateTurns);
		//Goes through and adds the state turns into the array for use 
		turnKey.forEach(function(i){ turns.push(target._stateTurns[Number(i)]) });
		turnFuse = {};
		//Goes through the array to make an object that is the same as the targets 
		//.stateTurns so it doesn't change with the actions in order to compare them
		turns.forEach(function(e, i){ turnFuse[turnKey[i]] = e });
		frsh_tBuffer_yanfly_BuffStateCore_state_add.call(this, target);
		states = Object.keys(this.item().modifyTurnState);
		//Sets it to the modifyTurnState both for simplicity but also because
		//forEach loops don't accept "this" when not refering to the loop
		modify = this.item().modifyTurnState;
		states.forEach(function(e, i){
			//Does the normal checks for buffer check, it calls Number as
			//the Object.keys makes things strings instead of intergers
			if (target.isStateAffected(Number(e)) && !target.stateBufferIndex.contains(Number(e)) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")){
				//Checks the modification if it lowers or increases the duration
				//and subsequently either adds the buffer or not depending on the
				//plugin settings
				if (turnFuse[Number(e)] > modify[Number(e)] && Frashaw.Param.StatePosAdjust){
					target.stateBufferIndex.push(Number(e));
				} else if (turnFuse[Number(e)] < modify[Number(e)] && Frashaw.Param.StateNegAdjust){
					target.stateBufferIndex.push(Number(e));
				}
			}
		});
		//All of the variables from the plugin for evals
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		states = Object.keys(this.item().modifyTurnStateEval);
		modify = this.item().modifyTurnStateEval;
		states.forEach(function(e, i){
			if (target.isStateAffected(Number(e)) && !target.stateBufferIndex.contains(Number(e)) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")){
				//The way the evals work is that it sets the duration depending on what the
				//turn variable is set to at the end, hence the turn eval gets it out
				//and allows it to be checked against the original turn amount to see
				//if it went up or down
				turn = 0;
				eval(modify[Number(e)]);
				if (turn >= turnFuse[Number(e)] && Frashaw.Param.StatePosAdjust){
					target.stateBufferIndex.push(Number(e));
				} else if (turn <= turnFuse[Number(e)] && Frashaw.Param.StateNegAdjust){
					target.stateBufferIndex.push(Number(e));
				}
			}
		});
	};

	//An extention to add a buffer when extending Buffs via Yanfly Buff and States Core
	//Vaugely the same as above but with some small tweaks for buffs
	frsh_tBuffer_yanfly_BuffStateCore_buff_add = Game_Action.prototype.applyModifyBuffTurns;
	Game_Action.prototype.applyModifyBuffTurns = function(target) {
		buffTurns = [];
		//Due the the method consistantly having the whole 8 sections set,
		//checking by index is the most simple way and thus we can just add
		//the values to an array
		target._buffTurns.forEach(function(i){ buffTurns.push(i) });
		frsh_tBuffer_yanfly_BuffStateCore_buff_add.call(this, target);
		this.item().modifyTurnBuff.forEach(function(e, i){
			if (e != 0 && target._buffs[i] > 0 && !target.buffBufferIndex.contains(i) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")){
				if (e < 0 && Frashaw.Param.BuffPosAdjust){
					target.buffBufferIndex.push(i);
				} else if (e > 0 && Frashaw.Param.BuffNegAdjust){
					target.buffBufferIndex.push(i);
				}
			}
		});
		var item = this.item();
		var a = this.subject();
		var b = target;
		var user = this.subject();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		this.item().modifyTurnBuffEval.forEach(function(e, i){
			if (e != "" && target._buffs[i] > 0 && !target.buffBufferIndex.contains(i) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")){
				turn = 0;
				eval(e);
				if (turn > buffTurns[i] && Frashaw.Param.BuffPosAdjust){
					target.buffBufferIndex.push(i);
				} else if (turn < buffTurns[i] && Frashaw.Param.BuffNegAdjust){
					target.buffBufferIndex.push(i);
				}
			}
		});
	};

	//An extention to add a buffer when extending Debuffs via Yanfly Buff and States Core
	//Vaugely the same as above but with some small tweaks for debuffs
	frsh_tBuffer_yanfly_BuffStateCore_debuff_add = Game_Action.prototype.applyModifyDebuffTurns;
	Game_Action.prototype.applyModifyDebuffTurns = function(target) {
		buffTurns = [];
		target._buffTurns.forEach(function(i){ buffTurns.push(i) });
		frsh_tBuffer_yanfly_BuffStateCore_debuff_add.call(this, target);
		this.item().modifyTurnDebuff.forEach(function(e, i){
			if (e != 0 && target._buffs[i] < 0 && !target.buffBufferIndex.contains(i) && !(BattleManager.isForcedTurn() && BattleManager._phase == "turnEnd")){
				if (buffTurns[i] > e && Frashaw.Param.DebuffPosAdjust){
					target.buffBufferIndex.push(i);
				} else if (buffTurns[i] < e && Frashaw.Param.DebuffNegAdjust){
					target.buffBufferIndex.push(i);
				}
			}
		});
		//Might be my incompatence, but from searching the code, there doesn't seem
		//to be a Debuff eval, atleast one that actually works
	};
}
})();
//=============================================================================
// End of File
//=============================================================================
