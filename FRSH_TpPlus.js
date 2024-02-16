//=============================================================================
// FRSH_TpPlus
// FRSH_TpPlus.js
// Version: 1.4.1
//=============================================================================

var Imported = Imported || {};
Imported.TpPlus = true;

var Frashaw = Frashaw || {};
Frashaw.TpPlus = Frashaw.TpPlus || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows the user to have more control over Tp.
*
* @param ---Actors-----------------
* @default
*
* @param aStart
* @text Actor Starting Tp
* @parent ---Actors-----------------
* @type number
* @min -1
* @desc Put the Tp you want Actors to start with. Put -1 for random. Also used when Actor has Static Tp Start.
* @default 15
*
* @param aRandMax
* @text Actor Max Random Start Tp
* @parent ---Actors-----------------
* @type number
* @min 0
* @desc Put the Max Tp you want Actors to start with. Activates when Actor Start Tp is -1 or Actor has Random Tp Start.
* @default 20
*
* @param aRandMin
* @text Actor Min Random Start Tp
* @parent ---Actors-----------------
* @type number
* @desc Put the Min Tp you want Actors to start with. Activates when Actor Start Tp is -1 or Actor has Random Tp Start.
* @default 0
*
* @param aStaticTp
* @text Actor Static Start Tp
* @parent ---Actors-----------------
* @type number
* @min 0
* @desc The Tp an Actor will start with if starting Actor Tp is random and they have Static Tp Start.
* @default 15
*
* @param aMaxTp
* @text Actor Max Tp Capacity
* @parent ---Actors-----------------
* @type number
* @min 0
* @desc Put the max amount of Tp an Actor can have at one time initally.
* @default 100
*
* @param ---Enemies----------------
* @default
*
* @param eStart
* @text Enemy Starting Tp
* @parent ---Enemies----------------
* @type number
* @min -1
* @desc Put the Tp you want Enemies to start with. Put -1 for random. Also used when Enemy has Static Tp Start.
* @default 15
*
* @param eRandMax
* @text Enemy Max Random Start Tp
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the Max Tp you want Enemies to start with. Activates when Enemy Start Tp is -1 or Enemy has Random Tp Start.
* @default 20
*
* @param eRandMin
* @text Enemy Min Random Start Tp
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the Min Tp you want Enemies to start with. Activates when Enemy Start Tp is -1 or Enemy has Random Tp Start.
* @default 0
*
* @param eStaticTp
* @text Enemy Static Start Tp
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc The Tp an Enemy will start with if starting Enemy Tp is random and they have Static Tp Start.
* @default 15
*
* @param eMaxTp
* @text Enemy Max Tp Capacity
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the max amount of Tp an Enemy can have at one time initally.
* @default 100
*
* @param ---Options----------------
* @default
*
* @param bMax
* @text Enable Below Inital?
* @parent ---Options----------------
* @type boolean
* @desc Click True or False if you want to enable any decreased Max Tp to go below the inital max the subject had.
* @default true
*
* @param atkTp
* @text Enable Global Tp on Hit?
* @parent ---Options----------------
* @type boolean
* @desc Click True or False if you want to enable Skills that don't have Tp Gains still use attack Tp boosts.
* @default false
*
* @param addTcr
* @text Enable give Tp using TCR?
* @parent ---Options----------------
* @type boolean
* @desc Click True or False if you want to skill/item additional effect to use TCR in it's calculation.
* @default true
*
* @help
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Actor, Classes, Weapons, Armors, States, Enemies:
* <Tp Bonus|tpBonus: x>: Replace x with the number of additonal Tp you want 
* the haver to start battle with.
* <Max Tp Bonus|maxTpBonus: x>: Replace x with the number of additonal Tp you
* want the haver to be able to hold at one time.
* <Damage Tp Bonus|dmgTpBonus: x>: Replace x with the number of flat Tp the 
* haver will gain upon being hit.
* <Damage Tp Multiplier|dmgTpMult: x>: Replace x with the multiplier to the 
* Tp the haver will gain upon being hit.
* <Attack Tp Bonus|atkTpBonus: x>: Replace x with the number of flat Tp the 
* haver will gain upon hitting a target. Will naturally not work on Skills 
* that don't have Tp Gains naturally, unless the plugin setting is changed.
* <Attack Tp Multiplier|atkTpMult: x>: Replace x with the multiplier to the 
* Tp the haver will gain upon hitting a target.
* <Random Tp Start|randTpStart>: The user starts with a random amount of Tp
* regardless of the default setting.
* <Fixed Tp Start|fixedTpStart>: The user starts with a fixed amount of Tp
* regardless of the default setting.
* ===Introduction=============================================================
* With the base kit of RPG Maker, you can only really alter how much Tp is
* gained from increasing the users Tp Charge Rate, and while that's cool and
* all, it doesn't provide the precsion I or other people may need. So this
* plugin aims to rectify that by providing various ways to alter the way
* the respective user gains Tp.
* ===How to Use===============================================================
* For the desired effect, use the above note tags in the Actors, Weapons,
* Armors, States, and/or Enemies notetags as desired. Note that for the 
* forcing the user to start with Random or Static Tp, the line of succession 
* goes:
* Override Static -> Override Random -> Standard
* Also note that the Tp Gain from attacks only works if the attack itself
* already gave Tp on use to begin with. You can override that with the
* "Enable Global Tp on Hit?" option.  
* If the actor has the "Preserve Tp" attribute, the plugin will see if the
* preserved Tp or the Tp they would've normally gotten at the start of battle
* is higher, and subsequently choose the higher one.
* ===Change Log===============================================================
* Version 1.4.1 (02/16/34) :
* -Removed method that caused passive states to double up on calls
*
* Version 1.4.0 (12/17/23) :
* -Changed a lot of code to be more efficent and/or coherent
* -Fixed a bug where the various elements would not stack correctly with each 
* other
* -Changed how inital tp is, both making is non-rewrite method and making it
* much more easier to understand
* -Holding Tp between battles will now have the actor compare their Tp 
* between the saved Tp and Tp they would've normally gotten, picking the 
* higher of the two
*
* Version 1.2.4 (07/14/23) :
* -Removed a method that crashed Yanfly_PartySystem
*
* Version 1.2.3 (06/30/23) :
* -Rewrote how gaining tp from attacks works, now it shouldn't overrwrite
* anything
*
* Version 1.2.2 (06/20/23) :
* -Added compatibility to Yanfly Buff and State Core (place this below it)
*
* Version 1.2.1 (06/14/23) :
* -Added a fallback in case the tp bonuses don't become numbers for some 
* reason
*
* Version 1.2.0 (03/30/23) :
* -Heavily optimized code
*
* Version 1.1.1 (03/30/23) :
* -Various syntax fixes
*
* Version 1.1.0 (03/24/23) :
* -Added checks for states of the user and passive states if Yanfly Auto
* Passive States is on
*
* Version 1.0.1 (03/22/23) :
* -Fixed some syntax
* -Added Option to gain more Tp from the gain Tp command with a higher Tp
* charge rate
*
* Version 1.0 (03/17/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_TpPlus');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.ActorStart = Number(Parameters.aStart);
Frashaw.Param.ActorMaxRand = Number(Parameters.aRandMax);
Frashaw.Param.ActorMinRand = Number(Parameters.aRandMin);
Frashaw.Param.ActorStatic = Number(Parameters.aStaticTp);
Frashaw.Param.ActorMaxTp = Number(Parameters.aMaxTp);
Frashaw.Param.EnemyStart = Number(Parameters.eStart);
Frashaw.Param.EnemyMaxRand = Number(Parameters.eRandMax);
Frashaw.Param.EnemyMinRand = Number(Parameters.eRandMin);
Frashaw.Param.EnemyStatic = Number(Parameters.eStaticTp);
Frashaw.Param.EnemyMaxTp = Number(Parameters.eMaxTp);
if (Parameters.bMax === "true"){
	Frashaw.Param.BelowMax = true;
} else {
	Frashaw.Param.BelowMax = false;
}
if (Parameters.atkTp === "true"){
	Frashaw.Param.GlobalAttackTp = true;
} else {
	Frashaw.Param.GlobalAttackTp = false;
}
if (Parameters.addTcr === "true"){
	Frashaw.Param.addTCR = true;
} else {
	Frashaw.Param.addTCR = false;
}

var FrshTpPlusLoaded = false;
//Starts the function to intialize all the tp notetags
FrshTpPlus_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshTpPlus_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshTpPlusLoaded == false) {
		//Processes the notetags of actors, classes, weapons, armors, and enemies
		this.processTpThingies($dataActors);
		this.processTpThingies($dataStates);
		this.processTpThingies($dataWeapons);
		this.processTpThingies($dataArmors);
		this.processTpThingies($dataEnemies);
		//Make sure it doesn't run twice
		FrshSummonLoaded = true;
	}
	return true;
};

//Does the processing to get aspects of actors
DataManager.processTpThingies = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:TP BONUS|tpBonus):[ ](.*)>/i;
	var note2 = /<(?:MAX TP BONUS|maxTpBonus):[ ](.*)>/i;
	var note3 = /<(?:DAMAGE TP BONUS|dmgTpBonus):[ ](.*)>/i;
	var note4 = /<(?:DAMAGE TP MULTIPLIER|dmgTpMult):[ ](.*)>/i;
	var note5 = /<(?:ATTACK TP BONUS|atkTpBonus):[ ](.*)>/i;
	var note6 = /<(?:ATTACK TP MULTIPLIER|atkTpMult):[ ](.*)>/i;
	var note7 = /<(?:RANDOM TP START|randTpStart)>/i;
	var note8 = /<(?:FIXED TP START|fixedTpStart)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the actors for these various conditions
		var customMode = 'none';
		obj.tpBonus = 0;
		obj.maxTpBonus = 0;
		obj.dmgTpBonus = 0;
		obj.dmgTpMult = 1;
		obj.atkTpBonus = 0;
		obj.atkTpMult = 1;
		obj.randTpStart = false;
		obj.fixedTpStart = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.tpBonus += Number(RegExp.$1);
			} else if (line.match(note2)){
				obj.maxTpBonus += Number(RegExp.$1);
			} else if (line.match(note3)){
				obj.dmgTpBonus += Number(RegExp.$1);
			} else if (line.match(note4)){
				obj.dmgTpMult *= Number(RegExp.$1);
			} else if (line.match(note5)){
				obj.atkTpBonus += Number(RegExp.$1);
			} else if (line.match(note6)){
				obj.atkTpMult *= Number(RegExp.$1);
			} else if (line.match(note7)){
				obj.randTpStart = true;
			} else if (line.match(note8)){
				obj.fixedTpStart = true;
			}
		}
  }
}

//Sets the users intial tp
Game_Battler.prototype.initTp = function(tp) {
    this.setTp(0);
};

//Gets all the Tp attributes for an actor
Game_Actor.prototype.getTpStuff = function() {
	var id = this.actorId();
	this.tpBonus += $dataActors[id].tpBonus;
	this.maxTpBonus += $dataActors[id].maxTpBonus;
	this.dmgTpBonus += $dataActors[id].dmgTpBonus;
	this.dmgTpMult *= $dataActors[id].dmgTpMult;
	this.atkTpBonus += $dataActors[id].atkTpBonus;
	this.atkTpMult *= $dataActors[id].atkTpMult;
	if ($dataActors[id].randTpStart) this.randTpStart = true;
	if ($dataActors[id].fixedTpStart) this.fixedTpStart = true;
	var id = this._classId;
	this.tpBonus += $dataStates[id].tpBonus;
	this.maxTpBonus += $dataStates[id].maxTpBonus;
	this.dmgTpBonus += $dataStates[id].dmgTpBonus;
	this.dmgTpMult *= $dataStates[id].dmgTpMult;
	this.atkTpBonus += $dataStates[id].atkTpBonus;
	this.atkTpMult *= $dataStates[id].atkTpMult;
	if ($dataStates[id].randTpStart) this.randTpStart = true;
	if ($dataStates[id].fixedTpStart) this.fixedTpStart = true;
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		this.tpBonus += equip.tpBonus;
		this.maxTpBonus += equip.maxTpBonus;
		this.dmgTpBonus += equip.dmgTpBonus;
		this.dmgTpMult *= equip.dmgTpMult;
		this.atkTpBonus += equip.atkTpBonus;
		this.atkTpMult *= equip.atkTpMult;
		if (equip.randTpStart) this.randTpStart = true;
		if (equip.fixedTpStart) this.fixedTpStart = true;
	}
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.tpBonus += $dataStates[id].tpBonus;
		this.maxTpBonus += $dataStates[id].maxTpBonus;
		this.dmgTpBonus += $dataStates[id].dmgTpBonus;
		this.dmgTpMult *= $dataStates[id].dmgTpMult;
		this.atkTpBonus += $dataStates[id].atkTpBonus;
		this.atkTpMult *= $dataStates[id].atkTpMult;
		if ($dataStates[id].randTpStart) this.randTpStart = true;
		if ($dataStates[id].fixedTpStart) this.fixedTpStart = true;
	}
};

//Gets all the Tp attributes for an enemy
Game_Enemy.prototype.getTpStuff = function() {
	var id = this.enemyId();
	this.tpBonus += $dataEnemies[id].tpBonus;
	this.maxTpBonus += $dataEnemies[id].maxTpBonus;
	this.dmgTpBonus += $dataEnemies[id].dmgTpBonus;
	this.dmgTpMult *= $dataEnemies[id].dmgTpMult;
	this.atkTpBonus += $dataEnemies[id].atkTpBonus;
	this.atkTpMult *= $dataEnemies[id].atkTpMult;
	if ($dataEnemies[id].randTpStart) this.randTpStart = true;
	if ($dataEnemies[id].fixedTpStart) this.fixedTpStart = true;
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.tpBonus += $dataStates[id].tpBonus;
		this.maxTpBonus += $dataStates[id].maxTpBonus;
		this.dmgTpBonus += $dataStates[id].dmgTpBonus;
		this.dmgTpMult *= $dataStates[id].dmgTpMult;
		this.atkTpBonus += $dataStates[id].atkTpBonus;
		this.atkTpMult *= $dataStates[id].atkTpMult;
		if ($dataStates[id].randTpStart) this.randTpStart = true;
		if ($dataStates[id].fixedTpStart) this.fixedTpStart = true;
	}
}

//Removes the Tp attributes from both actors and enemies so they don't stack upon each other
Game_BattlerBase.prototype.removeTpStuff = function() {
	this.tpBonus = 0;
	this.maxTpBonus = 0;
	this.dmgTpBonus = 0;
	this.dmgTpMult = 1;
	this.atkTpBonus = 0;
	this.atkTpMult = 1;
	this.randTpStart = false;
	this.fixedTpStart = false;
};

//Gets and removes the Tp attributes
frsh_tpplus_tp_get = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_tpplus_tp_get.call(this);
	this.removeTpStuff();
	this.getTpStuff();
}

//Determines how much max Tp the user is going to have
Game_BattlerBase.prototype.maxTp = function() {
	//starts off with 0 to initalize
	var max = 1;
	//Checks to see if user is actor or enemy
	if (this.isActor()){
		if (!$gameParty.battleMembers().includes(this)){ 
			return Frashaw.Param.ActorMaxTp;
		} 
		//Runs if Actor
		//Gets the value for the Actors base Max Tp
		max = Frashaw.Param.ActorMaxTp + this.maxTpBonus;
		if (Frashaw.Param.BelowMax == false && max < Frashaw.Param.ActorMaxTp){
			//Reverts back the Tp to inital Tp Max if the condition above is true and it falls below that value
			max = Frashaw.Param.ActorMaxTp;
		}
	} else if (this.isEnemy()){
		//Does the same actions as above, but for enemy (sans the equipment checks)
		max = Frashaw.Param.EnemyMaxTp + this.maxTpBonus;
		if (Frashaw.Param.BelowMax == false && max < Frashaw.Param.EnemyMaxTp){
			max = Frashaw.Param.EnemyMaxTp;
		}
	}
	//Makes max 0 if it goes below 0
	if (max < 0){
		max = 0;
	}
	//Returns the Max Tp value
    return max;
};

//Here to set the inital tp and have checks with preserved tp
frsh_tpplus_starting_tp = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    frsh_tpplus_starting_tp.call(this);
	//Gets the current Tp for comparison
	var tp = this.tp;
	var startTp = 0;
	//Sets Tp to 0 for ease of use
	this.setTp(0);
	//Checks if the recipient is Actor or Enemy for different calls
	if (this.isActor()){
		//Defaults if they have the Fixed Tp Start
		if (this.fixedTpStart){
			if (Frashaw.Param.ActorStart != -1){
				startTp = Frashaw.Param.ActorStart + this.tpBonus;
			} else {
				startTp = Frashaw.Param.ActorStatic + this.tpBonus;
			}
		//Defaults if they have the Random Tp Start
		} else if (this.randTpStart){
			var rand = Math.randomInt(Frashaw.Param.ActorMaxRand+1);
			if (rand < Frashaw.Param.ActorMinRand) rand = Frashaw.Param.ActorMinRand;
			startTp = rand + this.tpBonus;
		//Defaults if they have neither
		} else {
			//Checks to see if the Default start is random or not
			if (Frashaw.Param.ActorStart != -1){
				//Non-random start
				startTp = Frashaw.Param.ActorStart + this.tpBonus;
			} else {
				//Random start
				var rand = Math.randomInt(Frashaw.Param.ActorMaxRand+1);
				if (rand < Frashaw.Param.ActorMinRand) rand = Frashaw.Param.ActorMinRand;
				startTp = rand + this.tpBonus;
			}
		}
	} else {
		//Same as above for enemies
		if (this.fixedTpStart){
			if (Frashaw.Param.EnemyStart != -1){
				startTp = Frashaw.Param.EnemyStart + this.tpBonus;
			} else {
				startTp = Frashaw.Param.EnemyStatic + this.tpBonus;
			}
		} else if (this.randTpStart){
			var rand = Math.randomInt(Frashaw.Param.EnemyMaxRand+1);
			if (rand < Frashaw.Param.EnemyMinRand) rand = Frashaw.Param.EnemyMinRand;
			startTp = rand + this.tpBonus;
		} else {
			if (Frashaw.Param.EnemyStart != -1){
				startTp = Frashaw.Param.EnemyStart + this.tpBonus;
			} else {
				var rand = Math.randomInt(Frashaw.Param.EnemyMaxRand+1);
				if (rand < Frashaw.Param.EnemyMinRand) rand = Frashaw.Param.EnemyMinRand;
				startTp = rand + this.tpBonus;
			}
		}
	}
	//Checks to see if the naturally gotten start Tp is higher then the stored one, and chooses
	//the higher one to use
	if (tp > startTp){
		this.setTp(tp);
	} else {
		this.setTp(startTp);
	}
};

//Function that regulates how much tp is given when taking damage
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
    var value = Math.floor(50 * damageRate * this.tcr);
	value += this.dmgTpBonus;
	value *= this.dmgTpMult;
	value = Math.round(value);
	//Gives the tp for the hit
    this.gainSilentTp(value);
};

//The function that plays when an item has tp to give on use
frsh_tpplus_give_more_tp = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	var value = this.item().tpGain;
	var revert = this.item().tpGain;
	if (this.item().tpGain > 0 || Frashaw.Param.GlobalAttackTp){
		value += this.subject().atkTpBonus;
		value *= this.subject().atkTpMult;
		value = Math.round(value);
	}
	this.item().tpGain = value;
	frsh_tpplus_give_more_tp.call(this,target);
	this.item().tpGain = revert;
};

//The function that plays when a skill/item give tp via an additional effect
Game_Action.prototype.itemEffectGainTp = function(target, effect) {
    var value = Math.floor(effect.value1);
	if (Frashaw.Param.addTCR) {
		value *= target.tcr;
	}
	value = Math.round(value);
    if (value !== 0) {
        target.gainTp(value);
        this.makeSuccess(target);
    }
};
//=============================================================================
// End of File
//=============================================================================
