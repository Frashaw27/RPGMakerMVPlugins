//=============================================================================
// FRSH_BuffTurnsPlus
// FRSH_BuffTurnsPlus.js
// Version: 1.0.1
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
* Actors, Enemies, Classes, Weapons, Armors, State:
* Giving Buff Turns: <giveBuffBonus: (interger you want to use)>
* Recieving Buff Turns: <takeBuffBonus: (interger you want to use)>
* Giving Debuff Turns: <giveDebuffBonus: (interger you want to use)>
* Recieving Debuff Turns: <takeDebuffBonus: (interger you want to use)>
* ===Introduction=============================================================
* Base RPG Maker has Buffs and Debuffs, however there's no way to influence 
* how many turns an actor/enemy can get beyond the set amount. This plugin
* aims to fix that by adding the ability to have actors/classes/equipment/
* etc. to influence how long either of these last, both when applying as well
* as getting said BUffs and Debuffs. 
* ===How to Use===============================================================
* !!! Put this on top/ahead of any other script that affects Buff/Debuff
* application as this plugin rewrites those, meaning all addons won't work!!!
*
* For the desired effect, use the above note tags in the Actors, Weapons,
* Armors, and/or Enemies notetags as desired. Giving Turns influences how
* many turns the Buff/Debuff lasts when the user gives them to a target.
* Recieving alters how many Turns the Buff/Debuff lasts when the target 
* recieves said Buff/Debuff.
*
* NOTICE:
* If you use a script call of addBuff or addDebuff, neither will intially 
* use a "giver" bonus so you need to specify the giver if you desire to use
* that. Ex: addBuff/Debuff(5, 3, $gameActors.actor(1)(or whatever you want
* /need))
* ===Change Log===============================================================
* Version 1.0.1 (07/14/23) :
* -Removed a method that crashed Yanfly_PartySystem
*
* Version 1.0 (05/02/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

//Grabs the Buff Bonus for Givers
Game_Actor.prototype.getGiveBuffBonus = function() {
	var id = this.actorId();
	if ($dataActors[id].meta.giveBuffBonus != null){
		this.giveBuffBonus = Number($dataActors[id].meta.giveBuffBonus);
	}
	var id = this._classId;
	if ($dataClasses[id].meta.giveBuffBonus != null){
		if (this.giveBuffBonus != null){
			this.giveBuffBonus += Number($dataClasses[id].meta.giveBuffBonus);
		} else {
			this.giveBuffBonus = Number($dataClasses[id].meta.giveBuffBonus);
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			if ($dataWeapons[id].meta.giveBuffBonus != null){
				if (this.giveBuffBonus != null){
					this.giveBuffBonus += Number($dataWeapons[id].meta.giveBuffBonus);
				} else {
					this.giveBuffBonus = Number($dataWeapons[id].meta.giveBuffBonus);
				}
			}
		} else {
			if ($dataArmors[id].meta.giveBuffBonus != null){
				if (this.giveBuffBonus != null){
					this.giveBuffBonus += Number($dataArmors[id].meta.giveBuffBonus);
				} else {
					this.giveBuffBonus = Number($dataArmors[id].meta.giveBuffBonus);
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.giveBuffBonus != null){
			if (this.giveBuffBonus != null){
				this.giveBuffBonus += Number($dataStates[id].meta.giveBuffBonus);
			} else {
				this.giveBuffBonus = Number($dataStates[id].meta.giveBuffBonus);
			}
		}
	}
};

//Grabs the Buff Bonus for Receivers
Game_Actor.prototype.getTakeBuffBonus = function() {
	var id = this.actorId();
	if ($dataActors[id].meta.takeBuffBonus != null){
		this.takeBuffBonus = Number($dataActors[id].meta.takeBuffBonus);
	}
	var id = this._classId;
	if ($dataClasses[id].meta.takeBuffBonus != null){
		if (this.takeBuffBonus != null){
			this.takeBuffBonus += Number($dataClasses[id].meta.takeBuffBonus);
		} else {
			this.takeBuffBonus = Number($dataClasses[id].meta.takeBuffBonus);
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			if ($dataWeapons[id].meta.takeBuffBonus != null){
				if (this.takeBuffBonus != null){
					this.takeBuffBonus += Number($dataWeapons[id].meta.takeBuffBonus);
				} else {
					this.takeBuffBonus = Number($dataWeapons[id].meta.takeBuffBonus);
				}
			}
		} else {
			if ($dataArmors[id].meta.takeBuffBonus != null){
				if (this.takeBuffBonus != null){
					this.takeBuffBonus += Number($dataArmors[id].meta.takeBuffBonus);
				} else {
					this.takeBuffBonus = Number($dataArmors[id].meta.takeBuffBonus);
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.takeBuffBonus != null){
			if (this.takeBuffBonus != null){
				this.takeBuffBonus += Number($dataStates[id].meta.takeBuffBonus);
			} else {
				this.takeBuffBonus = Number($dataStates[id].meta.takeBuffBonus);
			}
		}
	}
};

//Grabs the Debuff Bonus for Givers
Game_Actor.prototype.getGiveDebuffBonus = function() {
	var id = this.actorId();
	if ($dataActors[id].meta.giveDebuffBonus != null){
		this.giveDebuffBonus = Number($dataActors[id].meta.giveDebuffBonus);
	}
	var id = this._classId;
	if ($dataClasses[id].meta.giveDebuffBonus != null){
		if (this.giveDebuffBonus != null){
			this.giveDebuffBonus += Number($dataClasses[id].meta.giveDebuffBonus);
		} else {
			this.giveDebuffBonus = Number($dataClasses[id].meta.giveDebuffBonus);
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			if ($dataWeapons[id].meta.giveDebuffBonus != null){
				if (this.giveDebuffBonus != null){
					this.giveDebuffBonus += Number($dataWeapons[id].meta.giveDebuffBonus);
				} else {
					this.giveDebuffBonus = Number($dataWeapons[id].meta.giveDebuffBonus);
				}
			}
		} else {
			if ($dataArmors[id].meta.giveDebuffBonus != null){
				if (this.giveDebuffBonus != null){
					this.giveDebuffBonus += Number($dataArmors[id].meta.giveDebuffBonus);
				} else {
					this.giveDebuffBonus = Number($dataArmors[id].meta.giveDebuffBonus);
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.giveDebuffBonus != null){
			if (this.giveDebuffBonus != null){
				this.giveDebuffBonus += Number($dataStates[id].meta.giveDebuffBonus);
			} else {
				this.giveDebuffBonus = Number($dataStates[id].meta.giveDebuffBonus);
			}
		}
	}
};

//Grabs the Debuff Bonus for Receivers
Game_Actor.prototype.getTakeDebuffBonus = function() {
	var id = this.actorId();
	if ($dataActors[id].meta.takeDebuffBonus != null){
		this.takeDebuffBonus = Number($dataActors[id].meta.takeDebuffBonus);
	}
	var id = this._classId;
	if ($dataClasses[id].meta.takeDebuffBonus != null){
		if (this.takeDebuffBonus != null){
			this.takeDebuffBonus += Number($dataClasses[id].meta.takeDebuffBonus);
		} else {
			this.takeDebuffBonus = Number($dataClasses[id].meta.takeDebuffBonus);
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			if ($dataWeapons[id].meta.takeDebuffBonus != null){
				if (this.takeDebuffBonus != null){
					this.takeDebuffBonus += Number($dataWeapons[id].meta.takeDebuffBonus);
				} else {
					this.takeDebuffBonus = Number($dataWeapons[id].meta.takeDebuffBonus);
				}
			}
		} else {
			if ($dataArmors[id].meta.takeDebuffBonus != null){
				if (this.takeDebuffBonus != null){
					this.takeDebuffBonus += Number($dataArmors[id].meta.takeDebuffBonus);
				} else {
					this.takeDebuffBonus = Number($dataArmors[id].meta.takeDebuffBonus);
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.takeDebuffBonus != null){
			if (this.takeDebuffBonus != null){
				this.takeDebuffBonus += Number($dataStates[id].meta.takeDebuffBonus);
			} else {
				this.takeDebuffBonus = Number($dataStates[id].meta.takeDebuffBonus);
			}
		}
	}
};


//Grabs the Buff Bonus for Givers
Game_Enemy.prototype.getGiveBuffBonus = function() {
	var id = this.enemyId();
	if ($dataEnemies[id].meta.giveBuffBonus != null){
		this.giveBuffBonus = Number($dataEnemies[id].meta.giveBuffBonus);
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.giveBuffBonus != null){
			if (this.giveBuffBonus != null){
				this.giveBuffBonus += Number($dataStates[id].meta.giveBuffBonus);
			} else {
				this.giveBuffBonus = Number($dataStates[id].meta.giveBuffBonus);
			}
		}
	}
};

//Grabs the Buff Bonus for Receivers
Game_Enemy.prototype.getTakeBuffBonus = function() {
	var id = this.enemyId();
	if ($dataEnemies[id].meta.takeBuffBonus != null){
		this.takeBuffBonus = Number($dataEnemies[id].meta.takeBuffBonus);
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.takeBuffBonus != null){
			if (this.takeBuffBonus != null){
				this.takeBuffBonus += Number($dataStates[id].meta.takeBuffBonus);
			} else {
				this.takeBuffBonus = Number($dataStates[id].meta.takeBuffBonus);
			}
		}
	}
};

//Grabs the Debuff Bonus for Givers
Game_Enemy.prototype.getGiveDebuffBonus = function() {
	var id = this.enemyId();
	if ($dataEnemies[id].meta.giveDebuffBonus != null){
		this.giveDebuffBonus = Number($dataEnemies[id].meta.giveDebuffBonus);
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.giveDebuffBonus != null){
			if (this.giveDebuffBonus != null){
				this.giveDebuffBonus += Number($dataStates[id].meta.giveDebuffBonus);
			} else {
				this.giveDebuffBonus = Number($dataStates[id].meta.giveDebuffBonus);
			}
		}
	}
};

//Grabs the Debuff Bonus for Receivers
Game_Enemy.prototype.getTakeDebuffBonus = function() {
	var id = this.enemyId();
	if ($dataEnemies[id].meta.takeDebuffBonus != null){
		this.takeDebuffBonus = Number($dataEnemies[id].meta.takeDebuffBonus);
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.takeDebuffBonus != null){
			if (this.takeDebuffBonus != null){
				this.takeDebuffBonus += Number($dataStates[id].meta.takeDebuffBonus);
			} else {
				this.takeDebuffBonus = Number($dataStates[id].meta.takeDebuffBonus);
			}
		}
	}
};

//Initaizes and resets the Buff and Debuff Bonuses
frsh_bbase_refresh_bturns = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_bbase_refresh_bturns.call(this);
	this.giveBuffBonus = undefined;
	this.takeBuffBonus = undefined;
	this.giveDebuffBonus = undefined;
	this.takeDebuffBonus = undefined;
	this.getGiveBuffBonus();
	this.getTakeBuffBonus();
	this.getGiveDebuffBonus();
	this.getTakeDebuffBonus();
}

//An addendum to the normal overwrite buff turns function that sets the proper amount of turns
frsh_bbase_overwritebuffturns_bturns = Game_BattlerBase.prototype.overwriteBuffTurns
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns, actor) {
	if (actor != null && actor.giveBuffBonus != null) turns += actor.giveBuffBonus;
	if (this.takeBuffBonus != null) turns += this.takeBuffBonus;
	if (turns < 0) turns = 0;
    frsh_bbase_overwritebuffturns_bturns.call(this,paramId,turns);
};

//A new function specifcally for overwriting debuffs turns, mostly to use a seperate set of buff modifiers 
Game_BattlerBase.prototype.overwriteDebuffTurns = function(paramId, turns, actor) {
	if (actor != null && actor.giveDebuffBonus != null) turns += actor.giveDebuffBonus;
	if (this.takeDebuffBonus != null) turns += this.takeDebuffBonus;
    if (this._buffTurns[paramId] < turns && turns >= 0) {
        this._buffTurns[paramId] = turns;
    }
};

//A rewrite of the item effect to include the user 
Game_Action.prototype.itemEffectAddBuff = function(target, effect) {
	target.addBuff(effect.dataId, effect.value1, this.subject());
    this.makeSuccess(target);
};

//Ditto as above but with Debuffs
Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
    target.addDebuff(effect.dataId, effect.value1, this.subject());
    this.makeSuccess(target);
};

//A rewrite to make the overwriteBuffTurns function also use the "giver" modifiers
Game_Battler.prototype.addBuff = function(paramId, turns, actor) {
    if (this.isAlive()){
        this.increaseBuff(paramId);
        if (this.isBuffAffected(paramId)) {
            this.overwriteBuffTurns(paramId, turns, actor);
        }
        this._result.pushAddedBuff(paramId);
        this.refresh();
    }
};

//A rewrite to use the overwriteDebuffTurns function
Game_Battler.prototype.addDebuff = function(paramId, turns, actor) {
    if (this.isAlive()) {
        this.decreaseBuff(paramId);
        if (this.isDebuffAffected(paramId)) {
            this.overwriteDebuffTurns(paramId, turns, actor);
        }
        this._result.pushAddedDebuff(paramId);
        this.refresh();
    }
};


//=============================================================================
// End of File
//=============================================================================
