//=============================================================================
// FRSH_DynamicBattlelogMessages
// FRSH_DynamicBattlelogMessages.js
// Version: 1.2.2
//=============================================================================

var Imported = Imported || {};
Imported.DBLMessage = true;

var Frashaw = Frashaw || {};
Frashaw.DBLMessage = Frashaw.DBLMessage || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Control if certain Battelog message appears or not, semi-dynamically.
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
* ==Notetags==================================================================
* N/A
* ===Introduction=============================================================
* While other plugins may allow you to remove certain messages from being 
* displayed, all of them don't allow you to change if the message is displayed
* while the game is running. While this is generally fine for most cases/devs,
* this plugin aims to serve the cases where you'd need/want to make a certain
* message not appear. 
*
* An example of this is skills/items that use a common event exclusively for 
* their effect, thus leading to a fail message to appear in the battle log. 
* This looks weird and off to many, so being able to turn them off is a god 
* sent. 
*
* Another example is if a skill/item can apply several buffs several times, 
* it can take a decent bit to get fully through the messages of each 
* application, so it might be good turn off the switch for that skill so that
* the flow of combat isn't massively impeded. 
*
* While these cases may be fringe in nature, they are nice QoLs for your game.
* ===How to Use===============================================================
* If want to use them normally, just assign each of the messages a switch id 
* for them to correspond to. While having multiple messages to a single switch
* probably isn't the best idea, there shouldn't be any problems that arise from
* it. By having the switch be on/true, the message will appear. Naturally, 
* having them at zero makes them not appear. You can also leave the message's 
* switch at 0 if you just want them to always be on. A thing to note, when a
* message is "linked", that means that if it is off, it will also turn those
* messages off along with it.
*
* If you have Yanfly Skill Core, there's a few methods to turn on/ off a 
* message for a specific action using the "Pre-Damage Eval" function. By using 
* the following command in the eval:
*
* $gameSwitches.setValue((insert the switch you use here),(true/false));
*
* By doing this, the action will now exclude/include the message from the 
* Battlelog. Just remember to have something to reset it back to "normal"
* when you go back after the specific skill/item. It's important to note 
* that using an another Skill Core eval after to reset it never worked for
* me, so use that as a word of caution.
*
* Also make sure to put this below of any plugins that may affect if Battlelog
* messages get shown or not (for example: Yanfly Battle Engine Core). The 
* reason for going below them is so that the messages gets overwritten last
* by this Plugin instead of any others.
*
* Hope you get some use out of it.
* ===Change Log===============================================================
* Version 1.2.2 (01/12/23):
* -Removed some Compatibility between Colored Names due to a script rewrite
* that removed some manual code
* -Fixed a bug that prevented Item Icons from showing up when showing
* action messages
*
* Version 1.2.1 (01/11/23):
* -Added Compatibility for Antifail and Custom Item Messages
* -Fixed using item names not being colored when Colored Names is active
* -Added more Compatibility between Colored Names and this
*
* Version 1.2 (01/09/23):
* -Added Compatibility between this and Colored Names
*
* Version 1.1 (09/22/22):
* -Added Functionality beyond just the Fail Message
* -Change Plugin Name, due to the expaneded scope
* -Changed Description to better fit the plugin
*
* Version 1.0 (09/16/22) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
Frashaw.Parameters = PluginManager.parameters('FRSH_DynamicBattlelogMessages');
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

(function() {

//Inital Free Ones
if (Imported.Antifail == null){
Window_BattleLog.prototype.displayFailure = function(target){
	var numb = Frashaw.Param.DSwitch1;
	if ($gameSwitches.value(numb) == true){
		if (target.result().isHit() && !target.result().success) {
        this.push('addText', TextManager.actionFailure.format(target.name()));
    }
	}
}
};

Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	var numb = Frashaw.Param.DSwitch2;
	if ($gameSwitches.value(numb) == true || numb == 0){
    if (target.result().used) {
        this.push('pushBaseLine');
        this.displayCritical(target);
        this.push('popupDamage', target);
        this.push('popupDamage', subject);
        this.displayDamage(target);
        this.displayAffectedStatus(target);
        this.displayFailure(target);
        this.push('waitForNewLine');
        this.push('popBaseLine');
    }
	}
}


//Action Results
if (!Imported.CIMessage){
Window_BattleLog.prototype.displayAction = function(subject, item) {
	var numb = Frashaw.Param.DSwitch3;
	if ($gameSwitches.value(numb) == true || numb == 0){
    var numMethods = this._methods.length;
	if (Imported.CName){
		var color = 0;
		if (item.meta.nameColor != null){
			color = parseInt(item.meta.nameColor);
		}
		var icon = 0;
		if (item.meta.iconNum != null){
			icon = parseInt(item.meta.iconNum);
		}
		var name = "\\c[" + color + "]" + item.name + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
	} else {
		var name = item.name;
	}
    if (DataManager.isSkill(item)) {
        if (item.message1) {
            this.push('addText', subject.name() + item.message1.format(name));
        }
        if (item.message2) {
            this.push('addText', item.message2.format(name));
        }
    } else {
		this.push('addText', TextManager.useItem.format(subject.name(), name));
    }
    if (this._methods.length === numMethods) {
        this.push('wait');
    }
	}
}
};

Window_BattleLog.prototype.displayDamage = function(target) {
	var numb = Frashaw.Param.DSwitch4;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch5;
	if ($gameSwitches.value(numb) == true || numb == 0){
    this.push('performCounter', target);
    this.push('addText', TextManager.counterAttack.format(target.name()));
	}
};

Window_BattleLog.prototype.displayReflection = function(target) {
	var numb = Frashaw.Param.DSwitch6;
	if ($gameSwitches.value(numb) == true || numb == 0){
    this.push('performReflection', target);
    this.push('addText', TextManager.magicReflection.format(target.name()));
	}
};

Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
	var numb = Frashaw.Param.DSwitch7;
	if ($gameSwitches.value(numb) == true || numb == 0){
    var substName = substitute.name();
    this.push('performSubstitute', substitute, target);
    this.push('addText', TextManager.substitute.format(substName, target.name()));
	}
};

Window_BattleLog.prototype.displayMiss = function(target) {
	var numb = Frashaw.Param.DSwitch8;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch9;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch10;
	var numbA = Frashaw.Param.DSwitch11;
	var numbB = Frashaw.Param.DSwitch12;
	if ($gameSwitches.value(numb) == true || numb == 0){
    if (target.result().critical) {
        if (target.isActor()) {
			if ($gameSwitches.value(numbA) == true || numbA == 0){
				this.push('addText', TextManager.criticalToActor);
			}
        } else {
			if ($gameSwitches.value(numbB) == true || numbB == 0){
				this.push('addText', TextManager.criticalToEnemy);
			}
        }
    }
	}
};


//Other Free One
Window_BattleLog.prototype.displayAffectedStatus = function(target) {
	var numb = Frashaw.Param.DSwitch13;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch14;
	if ($gameSwitches.value(numb) == true || numb == 0){
    this.displayAddedStates(target);
    this.displayRemovedStates(target);
	}
};

Window_BattleLog.prototype.displayAddedStates = function(target) {
	var numb = Frashaw.Param.DSwitch15;
	if ($gameSwitches.value(numb) == true || numb == 0){
    target.result().addedStateObjects().forEach(function(state) {
        var stateMsg = target.isActor() ? state.message1 : state.message2;
        if (state.id === target.deathStateId()) {
            this.push('performCollapse', target);
        }
        if (stateMsg) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
            this.push('addText', target.name() + stateMsg);
            this.push('waitForEffect');
        }
    }, this);
	}
};

Window_BattleLog.prototype.displayRemovedStates = function(target) {
	var numb = Frashaw.Param.DSwitch16;
	if ($gameSwitches.value(numb) == true || numb == 0){
    target.result().removedStateObjects().forEach(function(state) {
        if (state.message4) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
            this.push('addText', target.name() + state.message4);
        }
    }, this);
	}
};

Window_BattleLog.prototype.displayCurrentState = function(subject) {
	var numb = Frashaw.Param.DSwitch17;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch18;
	var numbA = Frashaw.Param.DSwitch19;
	var numbB = Frashaw.Param.DSwitch20;
	var numbC = Frashaw.Param.DSwitch21;
	if ($gameSwitches.value(numb) == true || numb == 0){
    var result = target.result();
	if ($gameSwitches.value(numbA) == true || numbA == 0){
    this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
	} if ($gameSwitches.value(numbB) == true || numbB == 0){
    this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
	} if ($gameSwitches.value(numbC) == true || numbC == 0){
    this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
	}
	}
};

Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
	buffs.forEach(function(paramId) {
		this.push('popBaseLine');
		this.push('pushBaseLine');
		this.push('addText', fmt.format(target.name(), TextManager.param(paramId)));
	}, this);
};

Window_BattleLog.prototype.displayHpDamage = function(target) {
	var numb = Frashaw.Param.DSwitch22;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch23;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch24;
	if ($gameSwitches.value(numb) == true || numb == 0){
    if (target.isAlive() && target.result().mpDamage !== 0) {
        if (target.result().mpDamage < 0) {
            this.push('performRecovery', target);
        }
        this.push('addText', this.makeMpDamageText(target));
    }
	}
};

Window_BattleLog.prototype.makeMpDamageText = function(target) {
	var numb = Frashaw.Param.DSwitch25;
	if ($gameSwitches.value(numb) == true || numb == 0){
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
	var numb = Frashaw.Param.DSwitch26;
	if ($gameSwitches.value(numb) == true || numb == 0){
    if (target.isAlive() && target.result().tpDamage !== 0) {
        if (target.result().tpDamage < 0) {
            this.push('performRecovery', target);
        }
        this.push('addText', this.makeTpDamageText(target));
    }
	}
};

Window_BattleLog.prototype.makeTpDamageText = function(target) {
	var numb = Frashaw.Param.DSwitch27;
	if ($gameSwitches.value(numb) == true || numb == 0){
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

})();

//=============================================================================
// End of File
//=============================================================================
