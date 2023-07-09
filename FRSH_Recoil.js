//=============================================================================
// FRSH_Recoil
// FRSH_Recoil.js
// Version: 1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.Recoil = true;

var Frashaw = Frashaw || {};
Frashaw.Recoil = Frashaw.Recoil || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows skills to have Recoil Damage upon use.
*
* @param recMsg
* @text Recoil Message
* @type text
* @desc Put the message you want to show when taking recoil damage. Use 1% to represent user & 2% to represent damage.
* @default 1% took 2% damage too!
*
* @param
* @default
*
* @param perRecoilMod
* @text Enable Global Recoil Mods?
* @type boolean
* @desc Click True or False if you want to enable a user's Personal Recoil being affected by the modifiers.
* @default true
*
* @param recPhys
* @text Enable Physical Recoil?
* @type boolean
* @desc Click True or False if you want to enable Personal Recoil on Physical Typed Skill.
* @default true
*
* @param recMag
* @text Enable Magical Recoil?
* @type boolean
* @desc Click True or False if you want to enable Personal Recoil on Magical Typed Skill.
* @default true
*
* @param recCert
* @text Enable Certain Recoil?
* @type boolean
* @desc Click True or False if you want to enable Personal Recoil on Certain Hit Typed Skill.
* @default true
*
* @param recAlly
* @text Enable Ally Recoil?
* @type boolean
* @desc Click True or False if you want to enable Personal Recoil on Ally Targeting Skills.
* @default false
*
* @param recDAlly
* @text Enable Dead Ally Recoil?
* @type boolean
* @desc Click True or False if you want to enable Personal Recoil on Dead Ally Targeting Skills.
* @default false
*
* @param recSelf
* @text Enable User Recoil?
* @type boolean
* @desc Click True or False if you want to enable Personal Recoil on User Targeting Skills.
* @default false
*
* @param recoilessMsg
* @text Enable Recoiless Message?
* @type boolean
* @desc Click True or False if you want to enable Custom Recoil Messages to play even when there is no Recoil.
* @default false
*
* @help
* ==Notetags==================================================================
* Skills:
* <recoil: insert formula here>: Enables Recoil on skill, assessing based on 
* formula (you can still add stuff like 500 and it'd work).
* <recoilMsg: insert formula here>: Replaces the standard recoil message
* with a different one
* Actors, Enemies, Classes, Weapons, Armors, and States:
* <recoil: insert formula here>: Enables Recoil that activates on all 
* skills* regardless if they have Recoil or not, adding on to Recoil
* if it does happen on the skill.
* <recoilAdd: insert number here>: Adds/Subtracts from the Recoil
* Damage.
* <recoilMult: insert number here>: Multiplies Recoil Damage
* <recoilNull>: Causes Recoil to not run
* * - when Personal Recoils activate can be changed with the settings 
* ===Introduction=============================================================
* RPG Maker has no innate system to handle damage recoil. There's a few 
* ways, but they left me unsatisfied. So I made this plugin so that you
* can add recoil to skills somewhat easier and with a battlelog message. 
* ===How to Use===============================================================
* You slap <recoil: x> in on a piece of skill and when you use it, you'll
* take whatever's calculated as Hp Damage. You can do the same for 
* equipment, states, and persons to have them activate Personal Recoil,
* which activates the recoils on every skill use. This can be tweened with
* the options to the right, for when they activate instead of always.
* ===Change Log===============================================================
* Version 1.1.0 (07/09/23) :
* -Updated method of text adding for recoil
* -Removed some bunk code after updated method
* -Added an option for skill custom recoil messages
* -Added option to have these recoil messages to run if there is no recoil
*
* Version 1.0 (06/23/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_Recoil');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.RecoilMessage = Parameters.recMsg;
if (Parameters.perRecoilMod === "true"){
	Frashaw.Param.PersonalRecoilMods = true;
} else {
	Frashaw.Param.PersonalRecoilMods = false;
}
if (Parameters.recPhys === "true"){
	Frashaw.Param.PersonalRecoilPhysical = true;
} else {
	Frashaw.Param.PersonalRecoilPhysical = false;
}
if (Parameters.recMag === "true"){
	Frashaw.Param.PersonalRecoilMagical = true;
} else {
	Frashaw.Param.PersonalRecoilMagical = false;
}
if (Parameters.recCert === "true"){
	Frashaw.Param.PersonalRecoilCertain = true;
} else {
	Frashaw.Param.PersonalRecoilCertain = false;
}
if (Parameters.recAlly === "true"){
	Frashaw.Param.PersonalRecoilAlly = true;
} else {
	Frashaw.Param.PersonalRecoilAlly = false;
}
if (Parameters.recDAlly === "true"){
	Frashaw.Param.PersonalRecoilDeadAlly = true;
} else {
	Frashaw.Param.PersonalRecoilDeadAlly = false;
}
if (Parameters.recSelf === "true"){
	Frashaw.Param.PersonalRecoilUser = true;
} else {
	Frashaw.Param.PersonalRecoilUser = false;
}
if (Parameters.recoilessMsg === "true"){
	Frashaw.Param.RecoillessMessage = true;
} else {
	Frashaw.Param.RecoillessMessage = false;
}

//Some variable setting
var recoilMsg = Frashaw.Param.RecoilMessage;
var message = "";
var dmgValue = 0;
var recoilValue = 0;
var recoilBool = false;

//Gets all the modifiers for Recoil with actors
Game_Actor.prototype.getRecoilStuff = function() {
	if (!$gameParty.members().includes(this)) return;
	var id = this.actorId();
	//Gets the flat recoil that might get applied to every attack
	if ($dataActors[id].meta.recoil != null){
		this.recoil = $dataActors[id].meta.recoil;
	}
	//Gets the modifiers that adds a number to recoil
	if ($dataActors[id].meta.recoilAdd != null && (Number($dataActors[id].meta.recoilAdd) > 0 || Number($dataActors[id].meta.recoilAdd) < 0)){
		this.recoilAdd = Number($dataActors[id].meta.recoilAdd);
	}
	//Gets the modifiers that multiplie a number to recoil
	if ($dataActors[id].meta.recoilMult != null && Number($dataActors[id].meta.recoilMult) >= 0){
		this.recoilMult = Number($dataActors[id].meta.recoilMult);
	}
	//Get if recoil should be negated or not
	if ($dataActors[id].meta.recoilNull != null){
		this.recoilNull = true;
	}
	var id = this._classId;
	//Same as above, but for Classes
	if ($dataClasses[id].meta.recoil != null){
		if (this.recoil != null) {
			this.recoil += " + " + $dataClasses[id].meta.recoil;
		} else {
			this.recoil = $dataClasses[id].meta.recoil;
		}
	}
	if ($dataClasses[id].meta.recoilAdd != null && (Number($dataClasses[id].meta.recoilAdd) > 0 || Number($dataClasses[id].meta.recoilAdd) < 0)){
		if (this.recoilAdd != null){
			this.recoilAdd += Number($dataClasses[id].meta.recoilAdd);
		} else {
			this.recoilAdd = Number($dataClasses[id].meta.recoilAdd);
		}
	}
	if ($dataClasses[id].meta.recoilMult != null && Number($dataClasses[id].meta.recoilMult) >= 0){
		if (this.recoilMult != null) {
			this.recoilMult *= Number($dataClasses[id].meta.recoilMult);
		} else {
			this.recoilMult = Number($dataClasses[id].meta.recoilMult);
		}
	}
	if ($dataClasses[id].meta.recoilNull != null){
		this.recoilNull = true;
	}
	//Checks each equip the actor has
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			//Runs the modifier get if the equip is a weapon
			if ($dataWeapons[id].meta.recoil != null){
				if (this.recoil != null) {
					this.recoil += " + " + $dataWeapons[id].meta.recoil;
				} else {
					this.recoil = $dataWeapons[id].meta.recoil;
				}
			}
			if ($dataWeapons[id].meta.recoilAdd != null && (Number($dataWeapons[id].meta.recoilAdd) > 0 || Number($dataWeapons[id].meta.recoilAdd) < 0)){
				if (this.recoilAdd != null){
					this.recoilAdd += Number($dataWeapons[id].meta.recoilAdd);
				} else {
					this.recoilAdd = Number($dataWeapons[id].meta.recoilAdd);
				}
			}
			if ($dataWeapons[id].meta.recoilMult != null && Number($dataWeapons[id].meta.recoilMult) >= 0){
				if (this.recoilMult != null) {
					this.recoilMult *= Number($dataWeapons[id].meta.recoilMult);
				} else {
					this.recoilMult = Number($dataWeapons[id].meta.recoilMult);
				}
			}
			if ($dataWeapons[id].meta.recoilNull != null){
				this.recoilNull = true;
			}
		} else {
			//Runs the modifier get if the equip is an armor
			if ($dataArmors[id].meta.recoil != null){
				if (this.recoil != null) {
					this.recoil += " + " + $dataArmors[id].meta.recoil;
				} else {
					this.recoil = $dataArmors[id].meta.recoil;
				}
			}
			if ($dataArmors[id].meta.recoilAdd != null && (Number($dataArmors[id].meta.recoilAdd) > 0 || Number($dataArmors[id].meta.recoilAdd) < 0)){
				if (this.recoilAdd != null){
					this.recoilAdd += Number($dataArmors[id].meta.recoilAdd);
				} else {
					this.recoilAdd = Number($dataArmors[id].meta.recoilAdd);
				}
			}
			if ($dataArmors[id].meta.recoilMult != null && Number($dataArmors[id].meta.recoilMult) >= 0){
				if (this.recoilMult != null) {
					this.recoilMult *= Number($dataArmors[id].meta.recoilMult);
				} else {
					this.recoilMult = Number($dataArmors[id].meta.recoilMult);
				}
			}
			if ($dataArmors[id].meta.recoilNull != null){
				this.recoilNull = true;
			}
		}
	}
	//Gets actor's states
	var stateList = this.states();
	//Tacks on passive stats as well, if applicable
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	//Checks each states they have applied to see if there's any modifiers to get
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.recoil != null){
			if (this.recoil != null) {
				this.recoil += " + " + $dataStates[id].meta.recoil;
			} else {
				this.recoil = $dataStates[id].meta.recoil;
			}
		}
		if ($dataStates[id].meta.recoilAdd != null && (Number($dataStates[id].meta.recoilAdd) > 0 || Number($dataStates[id].meta.recoilAdd) < 0)){
			if (this.recoilAdd != null){
				this.recoilAdd += Number($dataStates[id].meta.recoilAdd);
			} else {
				this.recoilAdd = Number($dataStates[id].meta.recoilAdd);
			}
		}
		if ($dataStates[id].meta.recoilMult != null && Number($dataStates[id].meta.recoilMult) >= 0){
			if (this.recoilMult != null) {
				this.recoilMult *= Number($dataStates[id].meta.recoilMult);
			} else {
				this.recoilMult = Number($dataStates[id].meta.recoilMult);
			}
		}
		if ($dataStates[id].meta.recoilNull != null){
			this.recoilNull = true;
		}
	}
};

//Same as above, but for enemies
Game_Enemy.prototype.getRecoilStuff = function() {
	var id = this.enemyId();
	if ($dataEnemies[id].meta.recoil != null){
		this.recoil = $dataEnemies[id].meta.recoil;
	}
	if ($dataEnemies[id].meta.recoilAdd != null && (Number($dataEnemies[id].meta.recoilAdd) > 0 || Number($dataEnemies[id].meta.recoilAdd) < 0)){
		this.recoilAdd = Number($dataEnemies[id].meta.recoilAdd);
	}
	if ($dataEnemies[id].meta.recoilMult != null && Number($dataEnemies[id].meta.recoilMult) >= 0){
		this.recoilMult = Number($dataEnemies[id].meta.recoilMult);
	}
	if ($dataEnemies[id].meta.recoilNull != null){
		this.recoilNull = true;
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].meta.recoil != null){
			if (this.recoil != null) {
				this.recoil += " + " + $dataStates[id].meta.recoil;
			} else {
				this.recoil = $dataStates[id].meta.recoil;
			}
		}
		if ($dataStates[id].meta.recoilAdd != null && (Number($dataStates[id].meta.recoilAdd) > 0 || Number($dataStates[id].meta.recoilAdd) < 0)){
			if (this.recoilAdd != null){
				this.recoilAdd += Number($dataStates[id].meta.recoilAdd);
			} else {
				this.recoilAdd = Number($dataStates[id].meta.recoilAdd);
			}
		}
		if ($dataStates[id].meta.recoilMult != null && Number($dataStates[id].meta.recoilMult) >= 0){
			if (this.recoilMult != null) {
				this.recoilMult *= Number($dataStates[id].meta.recoilMult);
			} else {
				this.recoilMult = Number($dataStates[id].meta.recoilMult);
			}
		}
		if ($dataStates[id].meta.recoilNull != null){
			this.recoilNull = true;
		}
	}
}

Game_BattlerBase.prototype.removeRecoilStuff = function() {
	//Determines what 4 modifiers that will be reset 
	var labels = ['recoil', 'recoilAdd','recoilMult','recoilNull'];
	for(var loop = 0; loop != 4; loop++){
		//Sets the modifier to undefined
		var text = "this." + labels[loop] + " = undefined";
		var bool = eval(text);
	}
};

//Gets and resets the modifiers for the recoil
frsh_bbase_refresh_recoil = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_bbase_refresh_recoil.call(this);
	//Resets the values
	this.removeRecoilStuff();
	//Sets the values
	this.getRecoilStuff();
}

//Simply here so that you can call the damage value of the attack in the formula
frsh_applyItemUserEffect_executeDamage = Game_Action.prototype.executeDamage ;
Game_Action.prototype.executeDamage = function(target, value) {
    frsh_applyItemUserEffect_executeDamage.call(this,target,value);
	dmgValue = value;
};

//Function to determine logic of when personal recoil is useable
function personalRecoilEval(action){
	if ((action.isForFriend() && !action.isForUser()) && !Frashaw.Param.PersonalRecoilAlly) return false;
	if (action.isForDeadFriend() && !Frashaw.Param.PersonalRecoilDAlly) return false;
	if (action.isForUser() && !Frashaw.Param.PersonalRecoilUser) return false;
	if (action.isPhysical() && !Frashaw.Param.PersonalRecoilPhysical) return false;
	if (action.isMagical() && !Frashaw.Param.PersonalRecoilMagical) return false;
	if (action.isCertainHit() && !Frashaw.Param.PersonalRecoilCertain) return false;
	return true;
}

frsh_apply_recoil = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
	recoilBool = false;
	frsh_apply_recoil.call(this,target);
};

frsh_displayDamage_recoil = Window_BattleLog.prototype.displayDamage
Window_BattleLog.prototype.displayDamage = function(target) {
	frsh_displayDamage_recoil.call(this,target);
    if (target.result().missed == false && target.result().evaded == false){
		this.displayRecoil(target);
    }
};

function customMessage(text, user){
	var tex = text;
	if (tex.contains("1%")) tex = tex.replace("1%",user.name());
	if (tex.contains("2%")) tex = tex.replace("2%",recoilValue);
	return tex;
}

Window_BattleLog.prototype.displayRecoil = function(target) {
	if (($dataSkills[BattleManager._action.item().id].meta.recoilMsg != null && Frashaw.Param.RecoillessMessage) || recoilBool){
		if ($dataSkills[BattleManager._action.item().id].meta.recoilMsg != null){
			this.push('addText', customMessage($dataSkills[BattleManager._action.item().id].meta.recoilMsg, BattleManager._action.subject()));
		} else {
			this.push('addText', message);
		}
	}
};

//The Meat and Potatoes
frsh_applyItemUserEffect_recoil = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	frsh_applyItemUserEffect_recoil.call(this, target);
	//Runs if the action is a skill and the user doesn't negate recoil and if the attack connected
	if (this.isSkill() && !this.subject().recoilNull && target.result().isHit()){
		//Checks for recoil on the skill
		if ($dataSkills[this.item().id].meta.recoil != null){
			//Setsup some terms
			var user = this.subject();
			var a = this.subject();
			var b = target;
			var value = dmgValue;
			//Gets recoil of the skill
			var recoil = eval($dataSkills[this.item().id].meta.recoil);
			//Adds the recoil of the user's personal recoil
			if (this.subject().recoil != null && personalRecoilEval(this)) var bonus = eval(this.subject().recoil);
			//Adds the recoil add modifier
			if (this.subject().recoilAdd != null) recoil += this.subject().recoilAdd;
			//Multiplies the recoil multiplier modifier
			if (this.subject().recoilMult != null) recoil *= this.subject().recoilMult;
			//Does the same applicaptions to the bonus, personal recoil damage, but only if turned on
			if (Frashaw.Param.PersonalRecoilMods && bonus != null){
				if (this.subject().recoilAdd != null) bonus += this.subject().recoilAdd;
				if (this.subject().recoilMult != null) bonus *= this.subject().recoilMult;
			}
			//Adds bonus damage
			if (bonus != null) recoil += bonus;
			//Rounds the damage
			recoil = Math.round(recoil);
			//Checks to see if it's both not null and above 0
			if (recoil > 0 && recoil != null){
				//Reduces user's hp by the amount
				this.subject().gainHp(-recoil);
				//Sets up recoil message
				if ($dataSkills[this.item().id].meta.recoilMsg == null){
					message = recoilMsg;
				} else {
					message = $dataSkills[this.item().id].meta.recoilMsg
				}
				recoilBool = true;
				if (message.contains("1%")) message = message.replace("1%", this.subject().name());
				if (message.contains("2%")) message = message.replace("2%", recoil);
			}
		//Checks to see if the user has some recoil that goes on all attacks, along with the associated checks
		//Otherwise the same
		} else if (this.subject().recoil != null && personalRecoilEval(this)){
			var user = this.subject();
			var a = this.subject();
			var b = target;
			var value = dmgValue;
			var recoil = eval(this.subject().recoil);
			if (Frashaw.Param.PersonalRecoilMods){
			if (this.subject().recoilAdd != null) recoil += this.subject().recoilAdd;
			if (this.subject().recoilMult != null) recoil *= this.subject().recoilMult;
			}
			recoil = Math.round(recoil);
			if (recoil > 0 && recoil != null){
				this.subject().gainHp(-recoil);
				recoilValue = recoil;
				recoilBool = true;
				if ($dataSkills[this.item().id].meta.recoilMsg == null){
					message = recoilMsg;
				} else {
					message = $dataSkills[this.item().id].meta.recoilMsg
				}
				if (message.contains("1%")) message = message.replace("1%", this.subject().name());
				if (message.contains("2%")) message = message.replace("2%", recoil);
			}
		}
	}
};
