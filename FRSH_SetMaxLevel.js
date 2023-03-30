//=============================================================================
// FRSH_SetMaxLevel
// FRSH_SetMaxLevel.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.SMLevel = true;

var Frashaw = Frashaw || {};
Frashaw.SMLevel = Frashaw.SMLevel || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows the maker to change the max level of characters mid game.
*
* @param maxChange
* @text Enable lowering levels?
* @type boolean
* @desc Click True or False if you want the actor to level down if their max level is reduced.
* @default true
*
* @help
* ==Script Calls==============================================================
* (actor).changeMaxLevel("max level you want here");
* ===Introduction=============================================================
* Throughout a mjaority of my games, I've found one common aspect of them 
* that I like working in, that being increasing the party's max level as
* they progress through the game. However I was rudely awakened by the
* reality that the solution in RPG Maker already is temporary, so this
* is a more permenant solution to that problem using a script call.
* ===How to Use===============================================================
* Use the above script call to use. Click if you want the option of the
* engine lowering the max level is the target's max level get's lowered.
* ===Change Log===============================================================
* Version 1.0.0 (03/30/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_SetMaxLevel');
Frashaw.Param = Frashaw.Param || {};
if (Parameters.maxChange === "true"){
	Frashaw.Param.maxChange = true;
} else {
	Frashaw.Param.maxChange = false;
}


(function() {

//An overwrite that that allows the changed max level to persisit through game resets
Game_Actor.prototype.maxLevel = function() {
	if (this.changedMax != null){
		return this.changedMax;
	} else {
		return this.actor().maxLevel;
	}
};

//Allows the user to change the target's max level
Game_Actor.prototype.changeMaxLevel = function(change) {
	this.changedMax = change;
	//If so desired, the actor will automatically level down upon lowering their max level
	if (this._level > this.changedMax && Frashaw.Param.maxChange){
		this._level = this.changedMax
	}
};

})();

//=============================================================================
// End of File
//=============================================================================