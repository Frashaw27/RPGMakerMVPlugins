//=============================================================================
// FRSH_HpTpCostRate
// FRSH_HpTpCostRate.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.HpTpCostRate = true;

var Frashaw = Frashaw || {};
Frashaw.HpTpCostRate = Frashaw.HpTpCostRate || {};

/*:
* @plugindesc Allows the ability to change Hp and Tp Costs with a rate.
* @author Frashaw27
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Actors, Enemies, Classes, Weapons, Armors, and States:
* Hp Cost Rate: <Hp Cost Rate|hpCostRate|hcr: x> - Gives a multiplier to all
* hp costs the user may face. Only useable with Yanfly Skill Core active.
* Tp Cost Rate: <Tp Cost Rate|tpCostRate|tcr: x> - Gives a multiplier to all
* tp costs the user may face.
* ===Introduction=============================================================
* While mp skills costs have the ability to be reduced/increased by a rate,
* hp and tp costs don't have such a luxray, so I decided to this up in like
* an hour to do so.
* ===How to Use===============================================================
* Insert the above notetags into the respective places and it should work. 
* You need Yanfly skill core to do the hp costs though.
* ===Change Log===============================================================
* Version 1.0 (11/29/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
var FrshHpTpCostRateLoaded = false;
FrshHpTpCostRateLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshHpTpCostRateLoaded_database.call(this)) return false; 
	if (FrshHpTpCostRateLoaded == false) {
		this.processCostRate($dataActors);
		this.processCostRate($dataEnemies);
		this.processCostRate($dataClasses);
		this.processCostRate($dataWeapons);
		this.processCostRate($dataArmors);
		this.processCostRate($dataStates);
		FrshHpTpCostRateLoaded = true;
	}
	return true;
};

//A function to set the hp and tp rate of Actors, Enemies Classes, Weapons, Armors, and States
DataManager.processCostRate = function(group) {
	var note1 = /<(?:HP COST RATE|hpCostRate|hcr):[ ](.*)>/i;
	var note2 = /<(?:TP COST RATE|tpCostRate|tcr):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		obj.hpCostRate = 1;
		obj.tpCostRate = 1;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.hpCostRate = Number(RegExp.$1);
			} else if (line.match(note2)) {
				obj.tpCostRate = Number(RegExp.$1);
			}
		}
	}
};

//Runs if Yanfly Skill Core is in the game
if (Imported.YEP_SkillCore){
	//Times the hp cost by the hp cost rate
	frsh_hptpCostRate_hp_skill_cost = Game_BattlerBase.prototype.skillHpCost;
	Game_BattlerBase.prototype.skillHpCost = function(skill) {
		var cost = frsh_hptpCostRate_hp_skill_cost.call(this, skill);
		return Math.round(cost * this.hpCostRate);
	}
}

//Times the tp cost by the tp cost rate
frsh_hptpCostRate_tp_skill_cost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
	var cost = frsh_hptpCostRate_tp_skill_cost.call(this, skill);
	return Math.round(cost * this.tpCostRate);
}

//Gets the hp and tp cost rate from the actor's self, class, weapons(s), armor(s), and states respectively
Game_Actor.prototype.getHpTpCostRate = function() {
	var id = this.actorId();
	this.hpCostRate *= $dataActors[id].hpCostRate;
	this.tpCostRate *= $dataActors[id].tpCostRate;
	var id = this._classId;
	this.hpCostRate *= $dataClasses[id].hpCostRate;
	this.tpCostRate *= $dataClasses[id].tpCostRate;
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		this.hpCostRate *= equip.hpCostRate;
		this.tpCostRate *= equip.tpCostRate;
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.hpCostRate *= $dataStates[id].hpCostRate;
		this.tpCostRate *= $dataStates[id].tpCostRate;
	}
};

//Gets the hp and tp cost rate from the enemy's self and states respectively
Game_Enemy.prototype.getHpTpCostRate = function() {
	var id = this.enemyId();
	this.hpCostRate *= $dataEnemies[id].hpCostRate;
	this.tpCostRate *= $dataEnemies[id].tpCostRate;
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.hpCostRate *= $dataStates[id].hpCostRate;
		this.tpCostRate *= $dataStates[id].tpCostRate;
	}
};

//Sets the hp and tp cost rate to 1 so it doesn't infinitely stack upon itself
Game_BattlerBase.prototype.hptpCostRateReset = function() {
	this.hpCostRate = 1;
	this.tpCostRate = 1;
};

//Gets and resets the modifiers for the hp and tp cost rate
frsh_hptpCostRate_rate_get = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function(){
	frsh_hptpCostRate_rate_get.call(this);
	//Resets the values
	this.hptpCostRateReset();
	//Sets the values
	this.getHpTpCostRate();
}
})();
//=============================================================================
// End of File
//=============================================================================