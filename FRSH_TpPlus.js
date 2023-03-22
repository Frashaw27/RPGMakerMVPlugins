//=============================================================================
// FRSH_TpPlus
// FRSH_TpPlus.js
// Version: 1.1.0
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
* @desc Put the Tp you want Actors to start with. Put -1 for random. Is also used when Actor has <StaticTpStart>.
* @default 15
*
* @param aRandMax
* @text Actor Max Random Start Tp
* @parent ---Actors-----------------
* @type number
* @min 0
* @desc Put the Max Tp you want Actors to start with. Only active when Starting Tp is -1 or Actor has <RandTpStart>.
* @default 20
*
* @param aRandMin
* @text Actor Min Random Start Tp
* @parent ---Actors-----------------
* @type number
* @desc Put the Min Tp you want Actors to start with. Only active when Starting Tp is -1 or Actor has <RandTpStart>.
* @default 0
*
* @param aStaticTp
* @text Actor Static Start Tp
* @parent ---Actors-----------------
* @type number
* @min 0
* @desc Put the Tp an Actor will start with if they have the <StaticTpStart> meta tag.
* @default 15
*
* @param aMaxTp
* @text Actor Max Tp Capacity
* @parent ---Actors-----------------
* @type number
* @min 0
* @desc Put the max amount of Tp an Actor can have at one time.
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
* @desc Put the Tp you want Enemies to start with. Put -1 for random. Is also used when Enemy has <StaticTpStart>.
* @default 15
*
* @param eRandMax
* @text Enemy Max Random Start Tp
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the Max Tp you want Enemies to start with. Only active when Starting Tp is -1 or Enemy has <RandTpStart>.
* @default 20
*
* @param eRandMin
* @text Enemy Min Random Start Tp
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the Min Tp you want Enemies to start with. Only active when Starting Tp is -1 or Enemy has <RandTpStart>.
* @default 0
*
* @param eStaticTp
* @text Enemy Static Start Tp
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the Tp an Enemy will start with if they have the <StaticTpStart> meta tag.
* @default 15
*
* @param eMaxTp
* @text Enemy Max Tp Capacity
* @parent ---Enemies----------------
* @type number
* @min 0
* @desc Put the max amount of Tp an Enemy can have at one time.
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
* @desc Click True or False if you want to enable any attack getting the attack Tp boosts.
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
* Inital Tp Boost/Decrease: <tpBonus: (interger you want to use)>
* Max Tp Boost/Decrease: <maxTpBonus: (interger you want to use)>
* Force User to Start with Random Tp: <RandTpStart>
* Force User to Start with Static Tp: <StaticTp Start>
* Tp Gained from Damage Flat Increase/Decrease: <dmgTpBonus: (intrger)>
* Tp Gained from Damage Multiplier Increase/Decrease: <dmgTpMult: (intrger)>
* Tp Gained from Use Flat Increase/Decrease: <atkTpBonus: (intrger)>
* Tp Gained from Use Multiplicative Increase/Decrease: <atkTpMult: (intrger)>
* ===Introduction=============================================================
* With the base kit of RPG Maker, you can only really alter how much tp is
* gained from increasing the users Tp Charge Rate, and while that's cool and
* all, it doesn't provide the precsion I or other people may need. So this
* plugin aims to rectify that by providing various ways to alter the way
* the respective user gains Tp.
* ===How to Use===============================================================
* For the desired effect, use the above note tags in the Actors, Weapons,
* Armors, and/or Enemies notetags as desired. Note that for the forcing
* the user to start with Random or Static Tp, the line of succession goes
* Override Random -> Override Static -> Static -> Random
* and the succession line for those checks are:
* Actor/Enemy -> Weapon -> Armor
* Also note that the Tp Gain from attacks only works if the attack itself
* already gave Tp on use to begin with. You can override that with the
* "Enable Global Tp on Hit?" option.  
* ===Change Log===============================================================
* Version 1.0 (03/22/23) :
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

//Sets the users intial tp
Game_Battler.prototype.initTp = function(tp) {
    this.setTp(tp);
};

//Determines how much max Tp the user is going to have
Game_BattlerBase.prototype.maxTp = function() {
	//starts off with 0 to initalize
	var max = 0;
	//Checks to see if user is actor or enemy
	if (this.isActor()){
		//Runs if Actor
		//Gets the value for the Actors base Max Tp
		max = Frashaw.Param.ActorMaxTp;
		//Checks to see if the Max Tp has been reduced or increased
		if ($dataActors[this.actorId()].meta.maxTpBonus != null){
			max += Number($dataActors[this.actorId()].meta.maxTpBonus)
		}
		//A loop to check equipment
		var loop = 0;
		var array = this.equips()
		while (loop != array.length){
			//it there's nothing in the slot, it goes to the next iteration
			if (array[loop] == null){
				loop++;
				continue;
			//Gets the Max Tp alter number if the weapon has one
			} else if (DataManager.isWeapon(array[loop])){
				if ($dataWeapons[(array[loop].id)].meta.maxTpBonus != null){
					max += Number($dataWeapons[(array[loop].id)].meta.maxTpBonus)
				}
			//Gets the Max Tp alter number if the armor has one
			} else if (DataManager.isArmor(array[loop])){
				if ($dataArmors[(array[loop].id)].meta.maxTpBonus != null){
					max += Number($dataArmors[(array[loop].id)].meta.maxTpBonus)
				}
			}
			loop++;
		}
		//Checks to see if the user's current max tp is below the Tp that is originally maxed at
		if (Frashaw.Param.BelowMax == false && max < Frashaw.Param.ActorMaxTp){
			//Reverts back the Tp to inital Tp Max if the condition above is true and it falls below that value
			max = Frashaw.Param.ActorMaxTp;
		}
	} else if (this.isEnemy()){
		//Does the same actions as above, but for enemy (sans the equipment checks)
		max = Frashaw.Param.EnemyMaxTp;
		if ($dataEnemies[this.enemyId()].meta.maxTpBonus != null){
			max += Number($dataActors[this.actorId()].meta.maxTpBonus)
		}
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
Game_Battler.prototype.onBattleStart = function() {
    this.setActionState('undecided');
    this.clearMotion();
	//Sets the tp you start with for later
	var startTp = 0;
	if (this.isActor()){
		//Sets up a loop to check equips to see if they alter how tp starts
		var loop = 0;
		var array = this.equips()
		//Starts undefined so that it doesn't trigger any future checks accidentaly
		var random = undefined;
		//Checks to see if the user has an override to use a random Tp value at start
		if ($dataActors[this.actorId()].meta.RandTpStart != null){
			random = 1;
			//Sets loop variable so that it doesn't run the equipment check
			loop = array.length;
		}
		//Checks to see if the user has an override to use a static Tp value at start and random hasn't already been chosen
		if ($dataActors[this.actorId()].meta.StaticTpStart != null && random == undefined){
			random = 0;
			loop = array.length;
		}
		while (loop != array.length){
			if (array[loop] == null){
				loop++;
				continue;
				//Same checks as above, but with weapons
			} else if (DataManager.isWeapon(array[loop])){
				if ($dataWeapons[(array[loop].id)].meta.RandTpStart != null){
					random = 1;
					break;
				}
				if ($dataWeapons[(array[loop].id)].meta.StaticTpStart != null && random == undefined){
					random = 0;
					break;
				}
				//Same checks as above but for armors
			} else if (DataManager.isArmor(array[loop])){
				if ($dataArmors[(array[loop].id)].meta.RandTpStart != null){
					random = 1;
					break;
				}
				if ($dataArmors[(array[loop].id)].meta.StaticTpStart != null && random == undefined){
					random = 0;
					break;
				}
			}
			loop++;
		}
		//Will use a static Tp start if the override was set
		if (random == 0){
			//Uses a special variable for this occasion
			startTp = Frashaw.Param.ActorStatic;
		//Will use random Tp start if the override was set
		} else  if (random == 1){
			startTp = Math.round(Math.random()*Frashaw.Param.ActorMaxRand);
			if (startTp < Frashaw.Param.ActorMinRand){
				startTp = Frashaw.Param.ActorMinRand
			}
		//Will use the static tp start if the start value isn't -1
		} else if (Frashaw.Param.ActorStart != -1){
			startTp = Frashaw.Param.ActorStart;
		} else {
		//Will use random if the start value is -1
			startTp = Math.round(Math.random()*Frashaw.Param.ActorMaxRand);
			if (startTp < Frashaw.Param.ActorMinRand){
				startTp = Frashaw.Param.ActorMinRand
			}
		}
		//Gives any inital bonuses
		if ($dataActors[this.actorId()].meta.tpBonus != null){
			startTp += Number($dataActors[this.actorId()].meta.tpBonus)
		}
		loop = 0;
		//Gives any bonuses from equipment
		while (loop != array.length){
			if (array[loop] == null){
				loop++;
				continue;
			} else if (DataManager.isWeapon(array[loop])){
				if ($dataWeapons[(array[loop].id)].meta.tpBonus != null){
					startTp += Number($dataWeapons[(array[loop].id)].meta.tpBonus)
				}
			} else if (DataManager.isArmor(array[loop])){
				if ($dataArmors[(array[loop].id)].meta.tpBonus != null){
					startTp += Number($dataArmors[(array[loop].id)].meta.tpBonus)
				}
			}
			loop++;
		}
	} else if (this.isEnemy()){
		//Does the same thing as above, but for enemies
		var random = undefined;
		if ($dataEnemies[this.enemyId()].meta.RandTpStart != null){
			random = 1;
		}
		if ($dataEnemies[this.enemyId()].meta.StaticTpStart != null && random == undefined){
			random = 0;
		}
		if (random == 0){
			startTp = Frashaw.Param.EnemyStatic;
		} else  if (random == 1){
			startTp = Math.round(Math.random()*Frashaw.Param.EnemyMaxRand);
			if (startTp < Frashaw.Param.EnemyMinRand){
				startTp = Frashaw.Param.EnemyMinRand
			}
		} else if (Frashaw.Param.EnemyStart != -1){
			startTp = Frashaw.Param.EnemyStart;
		} else {
			startTp = Math.round(Math.random()*Frashaw.Param.EnemyMaxRand);
			if (startTp < Frashaw.Param.EnemyMinRand){
				startTp = Frashaw.Param.EnemyMinRand
			}
		}
		if ($dataEnemies[this.enemyId()].meta.tpBonus != null){
			startTp += Number($dataActors[this.actorId()].meta.tpBonus)
		}
	}
	//Sets inital tp to 0 if it's below that
	if (startTp < 0){
		startTp = 0;
	}
	//Sets the inital Tp
    if (this.tp < startTp) {
        this.initTp(startTp);
    }
	//Here for BattleEngineCore compatibility
	if (Imported.YEP_BattleEngineCore){
		this._freeStateTurn = [];
		this._immortalState = false;
		this._selfTurnCount = 0;
	}
};

//Function that regulates how much tp is given when taking damage
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
    var value = Math.floor(50 * damageRate * this.tcr);
	if (this.isActor()){
		//Checks to see if the actor has a flat bonus to add on to it
		if ($dataActors[this.actorId()].meta.dmgTpBonus != null){
			value += Number($dataActors[this.actorId()].meta.dmgTpBonus)
		}
		//Checks to see if the actor has a multiplier to add on to it
		if ($dataActors[this.actorId()].meta.dmgTpMult != null){
			value *= Number($dataActors[this.actorId()].meta.dmgTpMult)
		}
		var loop = 0;
		var array = this.equips()
		//Checks all equipment for simular information
		while (loop != array.length){
			if (array[loop] == null){
				loop++;
				continue;
			} else if (DataManager.isWeapon(array[loop])){
				if ($dataWeapons[(array[loop].id)].meta.dmgTpBonus != null){
					value += Number($dataWeapons[(array[loop].id)].meta.dmgTpBonus)
				}
				if ($dataWeapons[(array[loop].id)].meta.dmgTpMult != null){
					value *= Number($dataWeapons[(array[loop].id)].meta.dmgTpMult)
				}
			} else if (DataManager.isArmor(array[loop])){
				if ($dataArmors[(array[loop].id)].meta.dmgTpBonus != null){
					value += Number($dataArmors[(array[loop].id)].meta.dmgTpBonus)
				}
				if ($dataArmors[(array[loop].id)].meta.dmgTpMult != null){
					value *= Number($dataArmors[(array[loop].id)].meta.dmgTpMult)
				}
			}
			loop++;
		}
	} else if (this.isEnemy()){
		//Does the same thing as above but for enemies
		if ($dataEnemies[this.enemyId()].meta.dmgTpBonus != null){
			value += Number($dataActors[this.actorId()].meta.dmgTpBonus)
		}
		if ($dataEnemies[this.enemyId()].meta.dmgTpMult != null){
			value *= Number($dataEnemies[this.enemyId()].meta.dmgTpMult)
		}
	}
	value = Math.round(value);
	//Gives the tp for the hit
    this.gainSilentTp(value);
};

//The function that plays when an item has tp to give on use
Game_Action.prototype.applyItemUserEffect = function(target) {
    var value = Math.floor(this.item().tpGain * this.subject().tcr);
	//Sets variable to call the current skill/item user
	var user = this.subject();
	//checks to see if the tpGain from the action is above 0, or the check tto override that is true
	if (this.item().tpGain > 0 || Frashaw.Param.GlobalAttackTp){
		if (user.isActor()){
			//Checks to see if the user has any points to add onto the item use
			if ($dataActors[user.actorId()].meta.atkTpBonus != null){
				value += Number($dataActors[user.actorId()].meta.atkTpBonus)
			}
			//Checks to see if the points to be added needs to be multiplied
			if ($dataActors[user.actorId()].meta.atkTpMult != null){
				value *= Number($dataActors[user.actorId()].meta.atkTpMult)
			}
			var loop = 0;
			var array = user.equips()
			//Checks the same things, but on equipment 
			while (loop != array.length){
				if (array[loop] == null){
					loop++;
					continue;
				} else if (DataManager.isWeapon(array[loop])){
					if ($dataWeapons[(array[loop].id)].meta.atkTpBonus != null){
						value += Number($dataWeapons[(array[loop].id)].meta.atkTpBonus)
					}
					if ($dataWeapons[(array[loop].id)].meta.atkTpMult != null){
						value *= Number($dataWeapons[(array[loop].id)].meta.atkTpMult)
					}
				} else if (DataManager.isArmor(array[loop])){
					if ($dataArmors[(array[loop].id)].meta.atkTpBonus != null){
						value += Number($dataArmors[(array[loop].id)].meta.atkTpBonus)
					}
					if ($dataArmors[(array[loop].id)].meta.atkTpMult != null){
						value *= Number($dataArmors[(array[loop].id)].meta.atkTpMult)
					}
				}
				loop++;
			}
		} else if (user.isEnemy()){
			//Does the same thing as above but for enemies
			if ($dataEnemies[user.enemyId()].meta.atkTpBonus != null){
				value += Number($dataActors[user.actorId()].meta.atkTpBonus)
			}
			if ($dataEnemies[user.enemyId()].meta.atkTpMult != null){
				value *= Number($dataEnemies[user.enemyId()].meta.atkTpMult)
			}
		}
	}
	value = Math.round(value);
	//Gives the tp on attack
    this.subject().gainSilentTp(value);
};

//The function that plays when a skill/item give tp via an additional effect
Game_Action.prototype.itemEffectGainTp = function(target, effect) {
    var value = Math.floor(effect.value1);
	if (Frashaw.Param.addTCR) {
	value *= target.tcr;
	}
    if (value !== 0) {
        target.gainTp(value);
        this.makeSuccess(target);
    }
};

//=============================================================================
// End of File
//=============================================================================
