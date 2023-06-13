//=============================================================================
// FRSH_AntiMessage
// FRSH_AntiMessage.js
// Version: 1.0.3
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
* Version 1.0.2 (06/13/23) :
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
	
	//Acts like waitForNewLine, but adds a setter for battle log lines, only used when FRSH_Summons or FRSH_ItemConcequences is active
	Window_BattleLog.prototype.waitForNewLineOther = function() {
		var baseLine = 0;
		if (this._baseLineStack.length > 0) {
			baseLine = this._baseLineStack[this._baseLineStack.length - 1];
		}
		if (this._lines.length > baseLine) {
			this.wait();
		}
		//Gets the length of the # of lines in the battle log
		var length = SceneManager._scene._logWindow._lines.length;
		//If the battle log already has messages it stores them for later
		if (otherText.length != 0){
			var sub = otherText[0];
			otherText = [];
		}
		//Adds in all the lines from the battle log into otherText via push because a stright setting made
		//them linked which made things messy
		for (var loop = 0; loop != length; loop++){
			otherText.push(SceneManager._scene._logWindow._lines[loop]);
		}
		//Adds in the previously stored lines if there were any
		if (sub != null) otherText.push(sub);
	};

	//The fuction that shows the fail message (or not).
	Window_BattleLog.prototype.displayFailure = function(target){
		if (target.result().isHit() && !target.result().success){
			var check = checkChecker(1, "Antifail");
		} else {
			var check = false;
		}
		if (check) {
			this.push('addText', TextManager.actionFailure.format(target.name()));
		}
	};
	
	Window_BattleLog.prototype.displayActionResults = function(subject, target) {
		var check = checkChecker(2, "AntiActionResults");
		if (check){
			if (target.result().used) {
				this.push('pushBaseLine');
				this.displayCritical(target);
				this.push('popupDamage', target);
				this.push('popupDamage', subject);
				this.displayDamage(target);
				this.displayAffectedStatus(target);
				this.displayFailure(target);
				//Compatibility with Summons and Item Concequences
				if (Imported.Summons || Imported.IConcequence){
					this.push('waitForNewLineOther');
				} else {
					this.push('waitForNewLine');
				}
				this.push('popBaseLine');
			}
			//A line imported from battle engine it overwrites this function and better to be safe then sorry
			//if removing the only difference will break the plugin
			if (Imported.YEP_BattleEngineCore){ if (target.isDead()) target.performCollapse(); }
		}
	}
	
	//Doesn't run when Custom Item Messages is in
	if (!Imported.CIMessage){
		Window_BattleLog.prototype.displayAction = function(subject, item) {
			var numMethods = this._methods.length;
			var check = checkChecker(3, "AntiAction");
			if (check){
				if (DataManager.isSkill(item)) {
					if (item.message1) {
						this.push('addText', subject.name() + item.message1.format(item.name));
					}
					if (item.message2) {
						this.push('addText', item.message2.format(item.name));
					}
				} else {
					this.push('addText', TextManager.useItem.format(subject.name(), item.name));
				}
				if (this._methods.length === numMethods) {
					this.push('wait');
				}
			}
		};
	}
	
	Window_BattleLog.prototype.displayDamage = function(target) {
		var check = checkChecker(4, "AntiDamage");
		if (check){
			if (target.result().missed) {
				this.displayMiss(target);
			} else if (target.result().evaded) {
				this.displayEvasion(target);
			} else {
				this.displayHpDamage(target);
				this.displayMpDamage(target);
				this.displayTpDamage(target);
			}
		}
	};
	
	Window_BattleLog.prototype.displayCounter = function(target) {
		var check = checkChecker(5, "AntiCounter");
		if (check){
			this.push('performCounter', target);
			this.push('addText', TextManager.counterAttack.format(target.name()));
		}
	};

	Window_BattleLog.prototype.displayReflection = function(target) {
		var check = checkChecker(6, "AntiReflection");
		if (check){
			this.push('performReflection', target);
			this.push('addText', TextManager.magicReflection.format(target.name()));
		}
	};

	Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
		var check = checkChecker(7, "AntiSubstitute");
		if (check){
			var substName = substitute.name();
			this.push('performSubstitute', substitute, target);
			this.push('addText', TextManager.substitute.format(substName, target.name()));
		}
	};

	Window_BattleLog.prototype.displayMiss = function(target) {
		var check = checkChecker(8, "AntiMiss");
		if (check){
			var fmt;
			if (target.result().physical) {
				fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
				this.push('performMiss', target);
			} else {
				fmt = TextManager.actionFailure;
			}
			this.push('addText', fmt.format(target.name()));
		}
	};

	Window_BattleLog.prototype.displayEvasion = function(target) {
		var check = checkChecker(9, "AntiEvasion");
		if (check){
			var fmt;
			if (target.result().physical) {
				fmt = TextManager.evasion;
				this.push('performEvasion', target);
			} else {
				fmt = TextManager.magicEvasion;
				this.push('performMagicEvasion', target);
			}
			this.push('addText', fmt.format(target.name()));
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
	Window_BattleLog.prototype.displayAffectedStatus = function(target) {
		var check = checkChecker(13, "AntiAffectedStatus");
		if (check){
			if (target.result().isStatusAffected()) {
				this.push('pushBaseLine');
				this.displayChangedStates(target);
				this.displayChangedBuffs(target);
				this.push('waitForNewLine');
				this.push('popBaseLine');
			}
		}
	};

	//States
	Window_BattleLog.prototype.displayChangedStates = function(target) {
		var check = checkChecker(14, "AntiChangedStatuses");
		if (check){
			this.displayAddedStates(target);
			this.displayRemovedStates(target);
		}
	};

	Window_BattleLog.prototype.displayAddedStates = function(target) {
		var check = checkChecker(15, "AntiAddedStates");
		if (check){
			target.result().addedStateObjects().forEach(function(state) {
				var stateMsg = target.isActor() ? state.message1 : state.message2;
				if (state.id === target.deathStateId()) {
					this.push('performCollapse', target);
				}
				if (stateMsg) {
					this.push('popBaseLine');
					this.push('pushBaseLine');
					//resets the for each different state/buff message, if wanted
					if (Parameters.resetOther){
						otherText = [];
					}
					//Adds text to saved battlelog lines
					otherText.push(target.name() + stateMsg);
					//Checks to see if the current applying state is death
					if (state.id === target.deathStateId()){
						//Checks to see if target has the summon tag, and if the Summon plugin is added
						if (Imported.Summons && target.summon){
							//Checks to see if the actor has a custom death message
							if (target.summonDeath != null || target.summonDeath == ''){
								//Uses it if they do
								this.push('addText', target.summonDeath);
							} else {
								//Uses default if they don't
								var text = Frashaw.Param.defaultSummDeathText;
								//Splits array to check to where to put the name
								var textArray = text.split("%");
								//A check to see if the name goes at start end or the middle
								if (textArray.length > 1){
									//Puts it into the middle if yes
									text = textArray[0] + target.name() + textArray[1];
								} else {
									//Puts it at the start if not
									text =  target.name() + textArray[0];
								}
								this.push('addText', text);
							}
						} else {
							//Does normal message if target is not a summon
							this.push('addText', target.name() + stateMsg);
						}
					} else {
						//Does normal message if not death
						this.push('addText', target.name() + stateMsg);	
					}
					this.push('waitForEffect');
				}
			}, this);
		}
	};

	Window_BattleLog.prototype.displayRemovedStates = function(target) {
		var check = checkChecker(16, "AntiRemovedStates");
		if (check){
			target.result().removedStateObjects().forEach(function(state) {
				if (state.message4) {
					this.push('popBaseLine');
					this.push('pushBaseLine');
					//Gets remove state message
					if (Parameters.resetOther){
						otherText = [];
					}
					otherText.push(target.name() + state.message4);
					this.push('addText', target.name() + state.message4);
				}
			}, this);
		}
	};

	Window_BattleLog.prototype.displayCurrentState = function(subject) {
		var check = checkChecker(17, "AntiCurrentState");
		if (check){
			var stateText = subject.mostImportantStateText();
			if (stateText) {
				this.push('addText', subject.name() + stateText);
				this.push('wait');
				this.push('clear');
			}
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

	Window_BattleLog.prototype.displayHpDamage = function(target) {
		var check = checkChecker(22, "AntiHpDamage");
		if (check){
			if (target.result().hpAffected) {
				if (target.result().hpDamage > 0 && !target.result().drain) {
					this.push('performDamage', target);
				}
				if (target.result().hpDamage < 0) {
					this.push('performRecovery', target);
				}
				this.push('addText', this.makeHpDamageText(target));
			}
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

	Window_BattleLog.prototype.displayMpDamage = function(target) {
		var check = checkChecker(24, "AntiMpDamage");
		if (check){
			if (target.isAlive() && target.result().mpDamage !== 0) {
				if (target.result().mpDamage < 0) {
					this.push('performRecovery', target);
				}
				this.push('addText', this.makeMpDamageText(target));
			}
		}
	};

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

	Window_BattleLog.prototype.displayTpDamage = function(target) {
		var check = checkChecker(26, "AntiTpDamage");
		if (check){
			if (target.isAlive() && target.result().tpDamage !== 0) {
				if (target.result().tpDamage < 0) {
					this.push('performRecovery', target);
				}
				this.push('addText', this.makeTpDamageText(target));
			}
		}
	};

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
