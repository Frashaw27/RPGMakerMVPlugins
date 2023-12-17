//=============================================================================
// FRSH_AntiMessage
// FRSH_AntiMessage.js
// Version: 1.0.4
//=============================================================================

var Imported = Imported || {};
Imported.AMessage = true;

var Frashaw = Frashaw || {};
Frashaw.AMessage = Frashaw.AMessage || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Control if a battlelog message appears or not, with multiple methods!
*
* @param Fail Switch
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Fail message. 
* @default 0
*
* @param Action Results Switch
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Action Results message. Is linked to most things.
* @default 0
*
* @param 
* @default
*
* @param ---Action Results Switches---
* @default
*
* @param Action Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Action Use message. 
* @default 0
*
* @param Damage Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Number of switch you want to control the Damage message. Linked to Miss, Evasion, & Hp, Mp, and Tp Damage.
* @default 0
*
* @param Counter Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Number of switch you want to control the Counter message. This may be weird due to how Counter works.
* @default 0
*
* @param Reflection Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Number of switch you want to control the Reflection message. May be weird due to how Reflection works.
* @default 0
*
* @param Substitute Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Substistute message. 
* @default 0
*
* @param Miss Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Miss message. 
* @default 0
*
* @param Evasion Switch
* @parent ---Action Results Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Evasion message. 
* @default 0
*
* @param 
* @default
*
* @param ---Critical Switches---
* @default
*
* @param Critical Switch
* @parent ---Critical Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Critical message. Linked to Enemy and Actor Critical.
* @default 0
*
* @param Enemy Critical Switch
* @parent ---Critical Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Enemy Critical message. Used when an Enemy is Critted.
* @default 0
*
* @param Actor Critical Switch
* @parent ---Critical Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Actor Critical message. Used when an Actor is Critted.
* @default 0
*
* @param 
* @default
*
* @param Affected Status Switch
* @type number
* @min 0
* @desc Number of switch you want to control Affected Status. Linked to all State and Buff messages besides Current State.
* @default 0
*
* @param 
* @default
*
* @param ---State Switches---
* @default
*
* @param Changed State Switch
* @parent ---State Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Add/Remove State message. Linked to Added State & Removed State.
* @default 0
*
* @param Added State Switch
* @parent ---State Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Added State message. 
* @default 0
*
* @param Remove State Switch
* @parent ---State Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Remove State message.
* @default 0
*
* @param Current State Switch
* @parent ---State Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Current State message. This message shows if you still have a state.
* @default 0
*
* @param 
* @default
*
* @param ---Buff Switches---
* @default
*
* @param Changed Buffs Switch
* @parent ---Buff Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Changed Buff messages. Linked to Add Buff & Debuffs, & Remove Buffs.
* @default 0
*
* @param Add Buffs Switch
* @parent ---Buff Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Add Buffs message. 
* @default 0
*
* @param Add Debuffs Switch
* @parent ---Buff Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Add Debuffs message. 
* @default 0
*
* @param Remove Buffs Switch
* @parent ---Buff Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Remove Buffs and Debuffs messages.
* @default 0
*
* @param 
* @default
*
* @param ---Damage Switches---
* @default
*
* @param Hp Damage Switch
* @parent ---Damage Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Hp Damage. Controls both Text and Sound Effect.
* @default 0
*
* @param Hp Damage Text Switch
* @parent ---Damage Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Hp Damage Text. This only pertains to the Text.
* @default 0
*
* @param Mp Damage Switch
* @parent ---Damage Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Mp Damage. Controls both Text and Sound Effect.
* @default 0
*
* @param Mp Damage Text Switch
* @parent ---Damage Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Mp Damage Text. This only pertains to the Text.
* @default 0
*
* @param Tp Damage Switch
* @parent ---Damage Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Tp Damage. Controls both Text and Sound Effect.
* @default 0
*
* @param Tp Damage Text Switch
* @parent ---Damage Switches---
* @type number
* @min 0
* @desc Put the number of the switch you want to control the Tp Damage Text. This only pertains to the Text.
* @default 0
*
* @help
* ==Notetages=================================================================
* Skill, Items (All Case Sensitive):
* No Fail Message: <Antifail> | No Action Results Message: <AntiActionResults>
* No Action Message: <AntiAction> | No Damage Message: <AntiDamage>
* No Counter Message: <AntiCounter> | No Reflection Message: <AntiReflection>
* No Substitute Message: <AntiSubstitute> | No Miss Message: <AntiMiss>
* No Evasion Message: <AntiEvasion> | No Critical Message: <AntiCritical>
* No Actor Criticals Message: <AntiActorCritical>
* No Enemy Criticals Message: <AntiEnemyCritical>
* No Affected Status Message: <AntiAffectedStatus>
* No Added States Message: <AntiAddedStates> 
* No Removed States Message: <AntiRemovedStates>
* No Current State Message: <AntiCurrentState> 
* No Changed Buffs Message: <AntiChangedBuffs>
* No Add Buffs Message: <AntiAddedBuffs> 
* No Add Debuffs Message: <AntiAddedDebuffs>
* No Remove Buffs Message: <AntiRemovedBuffs> 
* No Display Hp Damage Message: <AntiHpDamage>
* No Display Hp Damage Text  Message: <AntiHpDamageText>
* No Display Mp Damage Message: <AntiMpDamage>
* No Display Mp Damage Text  Message: <AntiMpDamageText>
* No Display Tp Damage Message: <AntiTpDamage>
* No Display Tp Damage Text  Message: <AntiTpDamageText>
* 
* ===Introduction=============================================================
* For the longest time, I've wanted a plugin that worked like Yanfly's
* Antifail from Vx Ace, but didn't find one and couldn't replicate it. 
* While another one of my scripts, Dynamic Battlelog Messages can sort
* of do the same thing, it wasn't exactly what I wanted, so this plugin's 
* predeccessor was born from me getting smarter and learning how to mimic 
* the results I wanted.
*
* Roughly 4 monthes after it was completed, it was then evolved to merge the
* two plugins, allowing for more things.
* ===How to Use===============================================================
* By inserting the corresponding tag or deactivating/turning off the 
* corresponding switch to the message will cause it not display when it is 
* called. Adding the tag will make it not display, regardless is if the 
* switch is active or not. If the switch is put to 0, it will not run as 
* switches 0 and below are impossible to set and call.
* ===Change Log===============================================================
* Version 1.0.5 (12/14/23) :
* -Changed two state relate sections to be calls instead of overwrites
*
* Version 1.0.4 (07/09/23) :
* -Changed several method calls to make them more dynamic
*
* Version 1.0.3 (06/13/23) :
* -Fixed bug with summon death message
*
* Version 1.0.2 (06/06/23) :
* -Added compatability with FRSH_Summons and FRSH_AntiMessage
*
* Version 1.0.1 (06/06/23) :
* -Fixed a crash that'd happen if a no skill enemy went before you
* -Fixed a bug where item message would only check for antifail
*
* Version 1.0.1 (05/11/23) :
* -Fixed Bugs with Criticals
*
* Version 1.0 (05/11/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
Frashaw.Parameters = PluginManager.parameters('FRSH_AntiMessage');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.DSwitch1 = Number(Frashaw.Parameters['Fail Switch']);
Frashaw.Param.DSwitch2 = Number(Frashaw.Parameters['Action Results Switch']);
Frashaw.Param.DSwitch3 = Number(Frashaw.Parameters['Action Switch']);
Frashaw.Param.DSwitch4 = Number(Frashaw.Parameters['Damage Switch']);
Frashaw.Param.DSwitch5 = Number(Frashaw.Parameters['Counter Switch']);
Frashaw.Param.DSwitch6 = Number(Frashaw.Parameters['Reflection Switch']);
Frashaw.Param.DSwitch7 = Number(Frashaw.Parameters['Substitute Switch']);
Frashaw.Param.DSwitch8 = Number(Frashaw.Parameters['Miss Switch']);
Frashaw.Param.DSwitch9 = Number(Frashaw.Parameters['Evasion Switch']);
Frashaw.Param.DSwitch10 = Number(Frashaw.Parameters['Critical Switch']);
Frashaw.Param.DSwitch11 = Number(Frashaw.Parameters['Enemy Critical Switch']);
Frashaw.Param.DSwitch12 = Number(Frashaw.Parameters['Actor Critical Switch']);
Frashaw.Param.DSwitch13 = Number(Frashaw.Parameters['Affected Status Switch']);
Frashaw.Param.DSwitch14 = Number(Frashaw.Parameters['Changed State Switch']);
Frashaw.Param.DSwitch15 = Number(Frashaw.Parameters['Added State Switch']);
Frashaw.Param.DSwitch16 = Number(Frashaw.Parameters['Remove State Switch']);
Frashaw.Param.DSwitch17 = Number(Frashaw.Parameters['Current State Switch']);
Frashaw.Param.DSwitch18 = Number(Frashaw.Parameters['Changed Buffs Switch']);
Frashaw.Param.DSwitch19 = Number(Frashaw.Parameters['Add Buffs Switch']);
Frashaw.Param.DSwitch20 = Number(Frashaw.Parameters['Add Debuffs Switch']);
Frashaw.Param.DSwitch21 = Number(Frashaw.Parameters['Remove Buffs Switch']);
Frashaw.Param.DSwitch22 = Number(Frashaw.Parameters['Hp Damage Switch']);
Frashaw.Param.DSwitch23 = Number(Frashaw.Parameters['Hp Damage Text Switch']);
Frashaw.Param.DSwitch24 = Number(Frashaw.Parameters['Mp Damage Switch']);
Frashaw.Param.DSwitch25 = Number(Frashaw.Parameters['Mp Damage Text Switch']);
Frashaw.Param.DSwitch26 = Number(Frashaw.Parameters['Tp Damage Switch']);
Frashaw.Param.DSwitch27 = Number(Frashaw.Parameters['Tp Damage Text Switch']);

	//Sets variables, so no fuckery happens
	var lastUsed = 1;
	var thing = 0;
	var otherText = []; //Text for the battle log for summon and/or item concequences
	if (!Imported.Summons){ //Text option imported from FRSH_Summons
	Parameters.resetOther = true;
	} else {
		Parameters.resetOther = PluginManager.parameters('FRSH_Summons').resetOther;
		if (Parameters.resetOther === "false"){
			Parameters.resetOther = true;
		} else {
			Parameters.resetOther = false;
		}
	}
	
	//Adds an additional action upon using an item, namely seting last used to
	//the id of the last used thing. Shouldn't conflict with anything.
	var Frashaw_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        Frashaw_useItem.call(this, item);
        lastUsed = item.id;
		if (DataManager.isItem(item)){
			thing = 1;
		} else {
			thing = 0;
		}
    };
	
	//A function to quickly check if the message should be displayed or not
	function checkChecker(switchNumber,tag){
	//Gets the switch number of the associated plugin parameter
	var numb = eval("Frashaw.Param.DSwitch" + switchNumber);
	//Doesn't check if the number is 0
	if (numb != 0){
		if ($gameSwitches.value(numb)){
			return false;
		}
	}
	var bool = eval("lastUsed != 1 && (thing == 0 && $dataSkills[lastUsed].meta." + tag + " != null)");
	if (bool){
		return false;
	}
	var bool = eval("lastUsed != 0 && (thing == 1 && $dataItems[lastUsed].meta." + tag + " != null)");
	if (thing == 1 && $dataItems[lastUsed].meta.Antifail != null){
		return false;
	}
	//If none of the other checks ran, it returns true that the fail message
	//can show.
	return true;
	}

	//The fuction that shows the fail message (or not).
	frsh_displayFailure_antiMsg = Window_BattleLog.prototype.displayFailure;
	Window_BattleLog.prototype.displayFailure = function(target){
		if (target.result().isHit() && !target.result().success){
			var check = checkChecker(1, "Antifail");
		} else {
			var check = false;
		}
		if (check) {
			frsh_displayFailure_antiMsg.call(this, target);
		}
	};
	
	frsh_displayActionResults_antiMsg = Window_BattleLog.prototype.displayActionResults;
	Window_BattleLog.prototype.displayActionResults = function(subject, target) {
		var check = checkChecker(2, "AntiActionResults");
		if (check){
			frsh_displayActionResults_antiMsg.call(this, subject, target);
			//A line imported from battle engine it overwrites this function and better to be safe then sorry
			//if removing the only difference will break the plugin
			if (Imported.YEP_BattleEngineCore){ if (target.isDead()) target.performCollapse(); }
		}
	}
	
	//Doesn't run when Custom Item Messages is in
	if (!Imported.CIMessage){
		frsh_displayAction_antiMsg = Window_BattleLog.prototype.displayAction
		Window_BattleLog.prototype.displayAction = function(subject, item) {
			var numMethods = this._methods.length;
			var check = checkChecker(3, "AntiAction");
			if (check){
				frsh_displayAction_antiMsg.call(this,subject,item);
			}
		};
	}
	
	frsh_displayDamage_antiMsg = Window_BattleLog.prototype.displayDamage
	Window_BattleLog.prototype.displayDamage = function(target) {
		var check = checkChecker(4, "AntiDamage");
		if (check){
			frsh_displayDamage_antiMsg.call(this,target);
		}
	};
	
	frsh_displayCounter_antiMsg = Window_BattleLog.prototype.displayCounter;
	Window_BattleLog.prototype.displayCounter = function(target) {
		var check = checkChecker(5, "AntiCounter");
		if (check){
			frsh_displayCounter_antiMsg.call(this,target);
		}
	};

	frsh_displayReflection_antiMsg = Window_BattleLog.prototype.displayReflection;
	Window_BattleLog.prototype.displayReflection = function(target) {
		var check = checkChecker(6, "AntiReflection");
		if (check){
			frsh_displayReflection_antiMsg.call(this,target);
		}
	};
	
	frsh_displaySubstitute_antiMsg = Window_BattleLog.prototype.displaySubstitute;
	Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
		var check = checkChecker(7, "AntiSubstitute");
		if (check){
			frsh_displaySubstitute_antiMsg.call(this, substitute, target);
		}
	};

	frsh_displayMiss_antiMsg = Window_BattleLog.prototype.displayMiss;
	Window_BattleLog.prototype.displayMiss = function(target) {
		var check = checkChecker(8, "AntiMiss");
		if (check){
			frsh_displayMiss_antiMsg.call(this,target);
		}
	};

	frsh_displayEvasion_antiMsg = Window_BattleLog.prototype.displayEvasion;
	Window_BattleLog.prototype.displayEvasion = function(target) {
		var check = checkChecker(9, "AntiEvasion");
		if (check){
			frsh_displayEvasion_antiMsg.call(this,target);
		}
	};

	//Criticals
	Window_BattleLog.prototype.displayCritical = function(target) {
		var check = checkChecker(10, "AntiCritical");
		var checkA = checkChecker(11, "AntiActorCritical");
		var checkB = checkChecker(12, "AntiEnemyCritical");
		if (check){
			if (target.result().critical) {
				if (target.isActor()) {
					if (checkA){
						this.push('addText', TextManager.criticalToActor);
					}
				} else {
					if (checkB){
						this.push('addText', TextManager.criticalToEnemy);
					}
				}
			}
		}
	};


	//Other Free One
	frsh_displalyAffectedStatus_antiMsg = Window_BattleLog.prototype.displayAffectedStatus;
	Window_BattleLog.prototype.displayAffectedStatus = function(target) {
		var check = checkChecker(13, "AntiAffectedStatus");
		if (check){
			frsh_displalyAffectedStatus_antiMsg.call(this,target);
		}
	};

	//States
	frsh_displalyChangedStatus_antiMsg = Window_BattleLog.prototype.displayChangedStates;
	Window_BattleLog.prototype.displayChangedStates = function(target) {
		var check = checkChecker(14, "AntiChangedStatuses");
		if (check){
			frsh_displalyChangedStatus_antiMsg.call(this,target);
		}
	};

	frsh_displalyAddedStates_antiMsg = Window_BattleLog.prototype.displayAddedStates;
	Window_BattleLog.prototype.displayAddedStates = function(target) {
		var check = checkChecker(15, "AntiAddedStates");
		if (check){
			frsh_displalyAddedStates_antiMsg.call(this, target);
		}
	};

	frsh_displayRemovedStates_antiMsg = Window_BattleLog.prototype.displayRemovedStates;
	Window_BattleLog.prototype.displayRemovedStates = function(target) {
		var check = checkChecker(16, "AntiRemovedStates");
		if (check){
			frsh_displayRemovedStates_antiMsg.call(this, target);
		}
	};

	frsh_displalyCurrentStatus_antiMsg = Window_BattleLog.prototype.displayChangedStates;
	Window_BattleLog.prototype.displayCurrentState = function(subject) {
		var check = checkChecker(17, "AntiCurrentState");
		if (check){
			frsh_displalyCurrentStatus_antiMsg.call(this, subject);
		}
	};

	//Buffs
	Window_BattleLog.prototype.displayChangedBuffs = function(target) {
		var checkA = checkChecker(18, "AntiChangedBuffs");
		var checkB = checkChecker(19, "AntiAddedBuffs");
		var checkC = checkChecker(20, "AntiAddedDebuffs");
		var checkD = checkChecker(21, "AntiRemovedBuffs");
		if (checkA){
		var result = target.result();
		if (checkB){
			this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
		} 
		if (checkC){
			this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
		} 
		if (checkD){
			this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
		}
		}
	};

	frsh_displayHpDamage_antiMsg = Window_BattleLog.prototype.displayHpDamage;
	Window_BattleLog.prototype.displayHpDamage = function(target) {
		var check = checkChecker(22, "AntiHpDamage");
		if (check){
			frsh_displayHpDamage_antiMsg.call(this,target);
		}
	};
	
	Window_BattleLog.prototype.makeHpDamageText = function(target) {
		var check = checkChecker(23, "AntiHpDamageText");
		if (check){
			var result = target.result();
			var damage = result.hpDamage;
			var isActor = target.isActor();
			var fmt;
			if (damage > 0 && result.drain) {
				fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
				return fmt.format(target.name(), TextManager.hp, damage);
			} else if (damage > 0) {
				fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
				return fmt.format(target.name(), damage);
			} else if (damage < 0) {
				fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
				return fmt.format(target.name(), TextManager.hp, -damage);
			} else {
				fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
				return fmt.format(target.name());
			}
		}
	};


	frsh_displayMpDamage_antiMsg = Window_BattleLog.prototype.displayMpDamage;
	Window_BattleLog.prototype.displayMpDamage = function(target) {
		var check = checkChecker(24, "AntiMpDamage");
		if (check){
			frsh_displayMpDamage_antiMsg.call(this, target);
		}
	};

	frsh_makeMpDamageText_antiMsg = Window_BattleLog.prototype.makeMpDamageText;
	Window_BattleLog.prototype.makeMpDamageText = function(target) {
		var check = checkChecker(25, "AntiMpDamageText");
		if (check){
			var result = target.result();
			var damage = result.mpDamage;
			var isActor = target.isActor();
			var fmt;
			if (damage > 0 && result.drain) {
				fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
				return fmt.format(target.name(), TextManager.mp, damage);
			} else if (damage > 0) {
				fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
				return fmt.format(target.name(), TextManager.mp, damage);
			} else if (damage < 0) {
				fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
				return fmt.format(target.name(), TextManager.mp, -damage);
			} else {
				return '';
			}
		}
	};

	frsh_displayTpDamage_antiMsg = Window_BattleLog.prototype.displayTpDamage;
	Window_BattleLog.prototype.displayTpDamage = function(target) {
		var check = checkChecker(26, "AntiTpDamage");
		if (check){
			frsh_displayTpDamage_antiMsg.call(this, target);
		}
	};

	frsh_makeTpDamageText_antiMsg = Window_BattleLog.prototype.makeTpDamageText;
	Window_BattleLog.prototype.makeTpDamageText = function(target) {
		var check = checkChecker(27, "AntiTpDamageText");
		if (check){
			var result = target.result();
			var damage = result.tpDamage;
			var isActor = target.isActor();
			var fmt;
			if (damage > 0) {
				fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
				return fmt.format(target.name(), TextManager.tp, damage);
			} else if (damage < 0) {
				fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
				return fmt.format(target.name(), TextManager.tp, -damage);
			} else {
				return '';
			}
		}
	};

//=============================================================================
// End of File
//=============================================================================
