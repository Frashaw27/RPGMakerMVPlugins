//=============================================================================
// FRSH_SpeedChanges
// FRSH_SpeedChanges.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.SChanges = true;

var Frashaw = Frashaw || {};
Frashaw.SChanges = Frashaw.SChanges || {};

/*:
* @plugindesc Changes the way that speed is calculated for various things
* @author Frashaw27
*
* @param speedEval
* @text Way Speed is Determined
* @type text
* @desc Put the the way you want the speeds to be sorted based on the actions selected.
* @type select
* @option Sum
* @option Fastest
* @option Slowest
* @default Sum
*
* @param actionSpeedGlobal
* @text Use Action Speed Globally
* @type boolean
* @desc Choose if you want Action Speed to affect both Skills and Items or just Skills.
* @default false
*
* @param baseItemSpeedBoost
* @text Base Item Boost
* @type number
* @desc Put the number of how much bonus speed you want to give all items.
* @default 0
*
* @param speedFormula
* @text Difference Speed Formula
* @type text
* @desc Put the formula you want to use to settle speed ties. Using "agi" will use the users agility.
* @default Math.randomInt(Math.floor(5 + agi / 4))
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case and non-space sensitive
* Actors, Classes, Weapons, Armors, and States:
* <Item Speed Boost: x> - Adds x speed to all item uses
* <Skill Speed Boost: x> - Adds x speed to all skill uses
* ===Introduction=============================================================
* I thought of this idea to make action speed be a bit more involved, and so
* this plugin was made.
* ===How to Use===============================================================
* !~~~ Put Below Yanfly Battle Core/Speed Altering Plugins                ~~~!
* Mostly Plug and Play. There isn't much to do unless you add the respective
* notetags once the settings are set up.
* ===Change Log===============================================================
* Version 1.0.1 (03/22/2025):
* -Fixed a bug where the program wouldn't see the base item speed
*
* Version 1.0.0 (03/22/2025):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters("FRSH_SpeedChanges");
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.SpeedEval = Parameters.speedEval;
Frashaw.Param.ActionSpeedGlobal = Parameters.actionSpeedGlobal == true;
Frashaw.Param.BaseItemSpeedBoost = Number(Parameters.baseItemSpeedBoost);
Frashaw.Param.SpeedFormula = Parameters.speedFormula;

var FrshSChangesLoaded = false;
FrshSChangesLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshSChangesLoaded_database.call(this)) return false; 
	if (FrshSChangesLoaded == false) {
		this.processSpeedChangeThings($dataActors);
		this.processSpeedChangeThings($dataEnemies);
		this.processSpeedChangeThings($dataClasses);
		this.processSpeedChangeThings($dataWeapons);
		this.processSpeedChangeThings($dataArmors);
		this.processSpeedChangeThings($dataStates);
		FrshSChangesLoaded = true;
	}
	return true;
};

//A function to set the bonus action speed of various things
DataManager.processSpeedChangeThings = function(group) {
	var note1 = /<Item[ ]?Speed[ ]?Boost:[ ]?(\d*)>/gi;
	var note2 = /<Skill[ ]?Speed[ ]?Boost:[ ]?(\d*)>/gi;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.itemSpeedBoost = 0;
		obj.skillSpeedBoost = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.itemSpeedBoost = Number(RegExp.$1);
			} else if (line.match(note2)){
				obj.skillSpeedBoost = Number(RegExp.$1);
			}
		}
	}
};

//The actor version where it runs through the actor, its class, it's equipment, 
//and its states to get all the values of the speed boosts and apply them to the actor
Game_Actor.prototype.getSpeedBonuses = function() {
	this.itemSpeedBoost += $dataActors[this.actorId()].itemSpeedBoost;
	this.skillSpeedBoost += $dataActors[this.actorId()].skillSpeedBoost;
	this.itemSpeedBoost += $dataClasses[this._classId].itemSpeedBoost;
	this.skillSpeedBoost += $dataClasses[this._classId].skillSpeedBoost;
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		this.itemSpeedBoost += equip.itemSpeedBoost;
		this.skillSpeedBoost += equip.skillSpeedBoost;
	}
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		this.itemSpeedBoost += $dataStates[stateList[i].id].itemSpeedBoost;
		this.skillSpeedBoost += $dataStates[stateList[i].id].skillSpeedBoost;
	}
};

//The enemy version where it runs through the enemy and its States to get all the 
//values of the speed boosts and apply them to the actor
Game_Enemy.prototype.getSpeedBonuses = function() {
	this.itemSpeedBoost += $dataEnemies[this.enemyId()].itemSpeedBoost;
	this.skillSpeedBoost += $dataEnemies[this.enemyId()].skillSpeedBoost;
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		this.itemSpeedBoost += $dataStates[stateList[i].id].itemSpeedBoost;
		this.skillSpeedBoost += $dataStates[stateList[i].id].skillSpeedBoost;
	}
};

//Resets the various modifiers so they don't bleed over and mass apply themselves
Game_BattlerBase.prototype.removeSpeedBonuses = function(){
	this.itemSpeedBoost = 0;
	this.skillSpeedBoost = 0;
}

//Calls all the the gets stuffs and the remove stuffs
frsh_schanges_refresh_bonuses = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_schanges_refresh_bonuses.call(this);
	this.removeSpeedBonuses();
	this.getSpeedBonuses();
}

//An overwrite so that speed is calculated with all the various bonuses
Game_Action.prototype.speed = function() {
	var agi = this.subject().agi;
    var speed = agi + eval(Frashaw.Param.SpeedFormula);
    if (this.item()) {
        speed += this.item().speed;
    }
	if (this.isSkill()){
		speed += this.subject().attackSpeed();
		speed += this.subject().skillSpeedBoost;
	}
	if (this.isItem()){
		speed += Frashaw.Param.BaseItemSpeedBoost;
		if (Frashaw.Param.ActionSpeedGlobal) speed += this.subject().attackSpeed();
		speed += this.subject().itemSpeedBoost;
	}
    return speed;
};

//An overwrite to account for the various types of calculations
Game_Battler.prototype.makeSpeed = function() {
	var choice = Frashaw.Param.SpeedEval;
	//Returns the sum speed of all actions so the order doesn't matter
	if (choice == "Sum"){
		var map = this._actions.map(function(action) { return action.speed(); });
		var sum = 0;
		map.forEach(function(i){ sum += i });
		this._speed = sum;
	//Returns the fastest actions selected
	} else if (choice == "Fastest"){
		this._speed = Math.max.apply(null, this._actions.map(function(action) {
			return action.speed();
		})) || 0;
	//Returns the slowest actions selected
	} else if (choice == "Slowest"){
		this._speed = Math.min.apply(null, this._actions.map(function(action) {
			return action.speed();
		})) || 0;
	} else {
		this._speed = 0;
	}
};
})();
//=============================================================================
// End of File
//=============================================================================
