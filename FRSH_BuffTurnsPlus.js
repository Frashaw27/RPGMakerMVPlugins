//=============================================================================
// FRSH_BuffTurnsPlus
// FRSH_BuffTurnsPlus.js
// Version: 1.1.1
//=============================================================================

var Imported = Imported || {};
Imported.Bturns = true;

var Frashaw = Frashaw || {};
Frashaw.Bturns = Frashaw.Bturns || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows the maker to give stuff modifiers to affect Buff Turns.
*
* @help
* ==Notetags==================================================================
* <either of these|syntaxesWorks>, Non-case Sensitive
* Actors, Enemies, Classes, Weapons, Armors, State:
* Giving Buff Turns: <Applying Buff Bonus|Giving Buff Bonus|applyBuffBonus|
* giveBuffBonus: (interger you want to use)>
* Recieving Buff Turns: <Recieving Buff Bonus|Taking Buff Bonus|
* recieveBuffBonus|takeBuffBonus: (interger you want to use)>
* Giving Debuff Turns: <Applying Debuff Bonus|Giving Debuff Bonus|
* applyDebuffBonus|giveDebuffBonus: (interger you want to use)>
* Recieving Debuff Turns: <Recieving Debuff Bonus|Taking Debuff Bonus|
* recieveDebuffBonus|takeDebuffBonus: (interger you want to use)>
* ===Introduction=============================================================
* Base RPG Maker has Buffs and Debuffs, however there's no way to influence 
* how many turns an actor/enemy can get beyond the set amount. This plugin
* aims to fix that by adding the ability to have actors/classes/equipment/
* etc. to influence how long either of these last, both when applying as well
* as getting said BUffs and Debuffs. 
* ===How to Use===============================================================
* For the desired effect, use the above note tags in the Actors, Weapons,
* Armors, and/or Enemies notetags as desired. Giving Turns influences how
* many turns the Buff/Debuff lasts when the user gives them to a target.
* Recieving alters how many Turns the Buff/Debuff lasts when the target 
* recieves said Buff/Debuff.
* ===Change Log===============================================================
* Version 1.1.1 (02/16/34) :
* -Removed method that caused buff/debuff bonuses to double up on calls
*
* Version 1.1.0 (01/28/24):
* -Rewrite basically all of the code
* -Added alt ways to call the various modifiers
* -Made said modifier calls be non-case Sensitive
* -Changed the method of how the modifiers are set, allowing them to be
* placed into the object without calling meta values
* -The original sets of the modifiers is now 0 instead undefined
* -Changed the way the turn modifiers are added to the buff/debuff, using
* an extension to add the turns instead of an overwrite, allowing this to
* wherever and work just as good
* -Made into a function so things don't leak into/out of the code during 
* gameplay
*
* Version 1.0.1 (07/14/23) :
* -Removed a method that crashed Yanfly_PartySystem
*
* Version 1.0 (05/02/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//==============================================================================
//Setup
//==============================================================================
//Variable to make sure shit loads correctly
FrshTurnBuffLoaded = false;

//Starts the function to intialize all the timer increase notetags
FrshTurnsPlus_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshTurnsPlus_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshTurnBuffLoaded == false) {
		//Processes the notetags
		this.processTurnBuffNotetags($dataActors);
		this.processTurnBuffNotetags($dataClasses);
		this.processTurnBuffNotetags($dataWeapons);
		this.processTurnBuffNotetags($dataArmors);
		this.processTurnBuffNotetags($dataEnemies);
		this.processTurnBuffNotetags($dataStates);
		//Make sure it doesn't run twice
		FrshTurnBuffLoaded = true;
	}
	return true;
};

//Does the processing for the respective objects
DataManager.processTurnBuffNotetags = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:APPLYING BUFF BONUS|GIVING BUFF BONUS|applyBuffBonus|giveBuffBonus):[ ](.*)>/i;
	var note2 = /<(?:RECIEVING BUFF BONUS|TAKING BUFF BONUS|recieveBuffBonus|takeBuffBonus):[ ](.*)>/i;
	var note3 = /<(?:APPLYING DEBUFF BONUS|GIVING DEBUFF BONUS|applyDebuffBonus|giveDebuffBonus):[ ](.*)>/i;
	var note4 = /<(?:RECIEVING DEBUFF BONUS|TAKING DEBUFF BONUS|recieveDebuffBonus|takeDebuffBonus):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.giveBuffBonus = 0;
		obj.takeBuffBonus = 0;
		obj.giveDebuffBonus = 0;
		obj.takeDebuffBonus = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.giveBuffBonus += Number(RegExp.$1);
			} else if (line.match(note2)) {
				obj.takeBuffBonus += Number(RegExp.$1);
			} else if (line.match(note3)) {
				obj.giveDebuffBonus += Number(RegExp.$1);
			} else if (line.match(note4)) {
				obj.takeDebuffBonus += Number(RegExp.$1);
			}
		}
	}
}

//Grabs the Buff Bonuses for Actors
Game_Actor.prototype.getBuffBonuses = function() {
	var id = this.actorId();
	this.giveBuffBonus += $dataActors[id].giveBuffBonus;
	this.takeBuffBonus += $dataActors[id].takeBuffBonus;
	this.giveDebuffBonus += $dataActors[id].giveDebuffBonus;
	this.takeDebuffBonus += $dataActors[id].takeDebuffBonus;
	var id = this._classId;
	this.giveBuffBonus += $dataClasses[id].giveBuffBonus;
	this.takeBuffBonus += $dataClasses[id].takeBuffBonus;
	this.giveDebuffBonus += $dataClasses[id].giveDebuffBonus;
	this.takeDebuffBonus += $dataClasses[id].takeDebuffBonus;
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		this.giveBuffBonus += equip.giveBuffBonus;
		this.takeBuffBonus += equip.takeBuffBonus;
		this.giveDebuffBonus += equip.giveDebuffBonus;
		this.takeDebuffBonus += equip.takeDebuffBonus;
	}
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.giveBuffBonus += $dataStates[id].giveBuffBonus;
		this.takeBuffBonus += $dataStates[id].takeBuffBonus;
		this.giveDebuffBonus += $dataStates[id].giveDebuffBonus;
		this.takeDebuffBonus += $dataStates[id].takeDebuffBonus;
	}
};

//Grabs the Buff Bonuses for Enemies
Game_Enemy.prototype.getBuffBonuses = function() {
	var id = this.enemyId();
	this.giveBuffBonus += $dataEnemies[id].giveBuffBonus;
	this.takeBuffBonus += $dataEnemies[id].takeBuffBonus;
	this.giveDebuffBonus += $dataEnemies[id].giveDebuffBonus;
	this.takeDebuffBonus += $dataEnemies[id].takeDebuffBonus;
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.giveBuffBonus += $dataStates[id].giveBuffBonus;
		this.takeBuffBonus += $dataStates[id].takeBuffBonus;
		this.giveDebuffBonus += $dataStates[id].giveDebuffBonus;
		this.takeDebuffBonus += $dataStates[id].takeDebuffBonus;
	}
};

//Initaizes and resets the Buff and Debuff Bonuses
frsh_turnsplus_bonus_turns = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_turnsplus_bonus_turns.call(this);
	this.giveBuffBonus = 0;
	this.takeBuffBonus = 0;
	this.giveDebuffBonus = 0;
	this.takeDebuffBonus = 0;
	this.getBuffBonuses();
}

//A rewrite to make the overwriteBuffTurns function also use the "giver" modifiers
frsh_turnsplus_buff_bonus = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns) {
	if (BattleManager._action != null && BattleManager._action.subject().isActing()) turns += BattleManager._action.subject().giveBuffBonus;
	turns += this.takeBuffBonus;
	frsh_turnsplus_buff_bonus.call(this, paramId, turns);
};

//A rewrite to use the overwriteDebuffTurns function
frsh_turnsplus_debuff_bonus = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns) {
	if (BattleManager._action != null && BattleManager._action.subject().isActing()) turns += BattleManager._action.subject().giveDebuffBonus;
	turns += this.takeDebuffBonus;
    frsh_turnsplus_debuff_bonus.call(this, paramId, turns);
};
})();
//=============================================================================
// End of File
//=============================================================================
