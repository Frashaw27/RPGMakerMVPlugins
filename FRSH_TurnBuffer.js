//=============================================================================
// FRSH_TurnBuffer
// FRSH_TurnBuffer.js
// Version: 1.0.2
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
* @text Restrict 1 Turn Buffs/Debuffs?
* @type boolean
* @desc Click True or False if you want to not add the buffer to 1 turn Buff/Debuff Applications.
* @default true
*
* @help
* ==States====================================================================
* States:
* <ignoreBuffer> - Overrides Buffer rules to not be added to the buffer list
* <alwaysBuffer> - Overrides Buffer rules to always be added to the buffer 
* list
* ===Introduction=============================================================
* Base RPG Maker is kinda misleading with how it devies up turns, making the 
* current turns it's applied a turn that is used when counting down the 
* counter. While this is fine for some people, this is plugin is for people
* (like me) who don't want that and so this plugin gives a turn where they
* won't decrease after application.
* ===How to Use===============================================================
* !!! Action Removed Stats work normally with on !!!
* Plug and Play, very simple. 
* ===Change Log===============================================================
* Version 1.0.2 (07/07/23) :
* -Added notetags to allow the option for certain states to ignore/always
* the buffer addition, ignoring the rules put in place 
*
* Version 1.0.1 (05/28/23) :
* -Fix a typo that caused states to not go down
*
* Version 1.0 (05/11/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_TurnBuffer');
Frashaw.Param = Frashaw.Param || {};
if (Parameters.stateOne === "true"){
	Frashaw.Param.StateOne = true;
} else {
	Frashaw.Param.StateOne = false;
}
if (Parameters.buffOne === "true"){
	Frashaw.Param.BuffOne = true;
} else {
	Frashaw.Param.BuffOne = false;
}

//Addon to initalize the 2 indexs for the buffers
frsh_initMembers_tBuffer = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    frsh_initMembers_tBuffer.call(this);
    this.stateBufferIndex = [];
	this.buffBufferIndex = [];
};

//State add addon to add state to index
frsh_addState_tbuffer = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    frsh_addState_tbuffer.call(this,stateId);
	//Checks to see if the index already includes this
	if (!this.stateBufferIndex.contains(stateId) && $dataStates[stateId].meta.ignoreBuffer == null){
		//Checks to see if the turns are correct or the option is false, getting put into the buffer if yes
		if ($dataStates[stateId].meta.alwaysBuffer != null || (this._stateTurns[stateId] > 1 || Frashaw.Param.StateOne == false)) this.stateBufferIndex.push(stateId);
	}
};

//Buff add addon to add buff to index
frsh_addBuff_tBuffer = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns, user) {
	frsh_addBuff_tBuffer.call(this, paramId, turns, user);
	//Checks to see if the index already includes this
	if (!this.buffBufferIndex.contains(paramId)){
		//Checks to see if the turns are correct or the option is false, getting put into the buffer if yes
		if (turns > 1 || Frashaw.Param.BuffOne == false) this.buffBufferIndex.push(paramId);
	}
};

//Same as above, but for debuff
frsh_addDebuff_tBuffer = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns, user) {
	frsh_addDebuff_tBuffer.call(this, paramId, turns, user);
	if (!this.buffBufferIndex.contains(paramId)){
		if (turns > 1 || Frashaw.Param.BuffOne == false) this.buffBufferIndex.push(paramId);
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

//The Overwrite for how buff turns decrease
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
frsh_battleEnd_tBuffer = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    frsh_battleEnd_tBuffer.call(this);
	this.stateBufferIndex = [];
	this.buffBufferIndex = [];
};

//=============================================================================
// End of File
//=============================================================================
