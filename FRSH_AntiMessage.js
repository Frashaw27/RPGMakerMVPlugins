//=============================================================================
// FRSH_AntiMessage
// FRSH_AntiMessage.js
// Version: 1.1.2
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
* Spaces and Capitalization doesn't matter
*
* Skill, Items:
* Spaces can be replaced with dashes like: <Anti-Fail>
* Anti can be replaced with No like: <No Fail>
* No Fail Message: <Anti Fail>
* No Action Results Message: <Anti Action Results>, Action be removed 
* (alongside the extra space) and still work
* No Action Message: <Anti Action>
* No Damage Message: <Anti Damage>
* No Counter Message: <Anti Counter>
* No Reflection Message: <Anti Reflect>, can add "ion" to the end of reflect
* No Substitute Message: <Anti Substitute>
* No Miss Message: <AntiMiss>
* No Evasion Message: <Anti Evasion>
* No Critical Message: <Anti Critical>
* No Enemy Criticals Message: <Anti Enemy Critical>, Enemy and the subsequent 
* space can be remove in place of just E
* No Actor Criticals Message: <Anti Actor Critical>, same as Enemy but with A
* No Affected Status Message: <Anti Affected Status>, Affect also works
* No Added States Message: <Anti Added States>, Add also works
* No Removed States Message: <Anti Removed States>, Remove also works
* No Current State Message: <Anti Current State> 
* No Changed Buffs Message: <Anti Changed Buffs>, Change also works
* No Add Buffs Message: <Anti Added Buffs>, Add also works
* No Add Debuffs Message: <Anti Added Debuffs>, Add also works
* No Remove Buffs Message: <Anti Removed Buffs>, Remove also works
* No Display Hp Damage Message: <Anti Hp Damage>
* No Display Hp Damage Text  Message: <Anti Hp Text>
* No Display Mp Damage Message: <Anti Mp Damage>
* No Display Mp Damage Text  Message: <Anti Mp Text>
* No Display Tp Damage Message: <Anti Tp Damage>
* No Display Tp Damage Text  Message: <Anti Tp Text>
* 
* ===Introduction===============================================================
* For the longest time, I've wanted a plugin that worked like Yanfly's
* Antifail from Vx Ace, but didn't find one and couldn't replicate it. 
* While another one of my scripts, Dynamic Battlelog Messages can sort
* of do the same thing, it wasn't exactly what I wanted, so this plugin's 
* predeccessor was born from me getting smarter and learning how to mimic 
* the results I wanted.
*
* Roughly 4 monthes after it was completed, it was then evolved to merge the
* two plugins, allowing for more things.
* ===How to Use=================================================================
* By inserting the corresponding tag or deactivating/turning off the 
* corresponding switch to the message will cause it not display when it is 
* called. Adding the tag will make it not display, regardless is if the 
* switch is active or not. If the switch is put to 0, it will not run as 
* switches 0 and below are impossible to set and call.
* ===Change Log=================================================================
* Version 1.1.1 (08/03/25) :
* -Add a check in case the the current battle action doesn't exit, leading to a
* crash
*
* Version 1.1.1 (06/19/25) :
* -Fixed an oversight with the code that made it not check the correct variable
* for the switch
*
* Version 1.1.0 (06/19/25) :
* -Heavily update the code to be more optimized and less dense with filler 
* lines
* -Made Notetags both non-capital and space dependent
* -Add variations to the Notetags
* -Removed meaningless code that holds no more relavance
* -Made the system to determine the current item based from BattleManager
* -Inclosed the plugin in a function
* -Fixed the damage texts needing to reset to the base function
*
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
* ==============================================================================
*/
//==============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_AntiMessage');
Frashaw.Param = Frashaw.Param || {};
terms = ['Fail Switch', 'Action Results Switch', 'Action Switch', 'Damage Switch', 'Counter Switch', 'Reflection Switch', 'Substitute Switch', 'Miss Switch', 'Evasion Switch', 'Critical Switch', 'Enemy Critical Switch', 'Actor Critical Switch', 'Affected Status Switch', 'Changed State Switch', 'Added State Switch', 'Remove State Switch', 'Current State Switch', 'Changed Buffs Switch', 'Add Buffs Switch', 'Add Debuffs Switch', 'Remove Buffs Switch', 'Hp Damage Switch', 'Hp Damage Text Switch', 'Mp Damage Switch', 'Mp Damage Text Switch', 'Tp Damage Switch', 'Tp Damage Text Switch'];
Frashaw.Param.DSwitches = [0];
terms.forEach(function(i){
	Frashaw.Param.DSwitches.push(eval(Number(Parameters[i])));
});

//Preloads the various things for the anti messages
var FrshAMessageLoaded = false;
FrshAMessageLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshAMessageLoaded_database.call(this)) return false; 
	if (FrshAMessageLoaded == false) {
		this.processAntiThings($dataSkills);
		this.processAntiThings($dataItems);
		FrshAMessageLoaded = true;
	}
	return true;
};

//A function to process the unique anti messages for specific skills and items
DataManager.processAntiThings = function(group) {
	var string = "";
	var note1 = /<(?:Anti|No)[ -]?Fail>/i;
	var note2 = /<(?:Anti|No)[ -]?(?:Action[ -]?)?Results?>/i;
	var note3 = /<(?:Anti|No)[ -]?Action>/i;
	var note4 = /<(?:Anti|No)[ -]?Damage>/i;
	var note5 = /<(?:Anti|No)[ -]?Counter>/i;
	var note6 = /<(?:Anti|No)[ -]?Reflect(?:ion)?>/i;
	var note7 = /<(?:Anti|No)[ -]?Substitute>/i;
	var note8 = /<(?:Anti|No)[ -]?Miss>/i;
	var note9 = /<(?:Anti|No)[ -]?Evasion>/i;
	var note10 = /<(?:Anti|No)[ -]?Critical>/i;
	var note11 = /<(?:Anti|No)[ -]?E(?:nemy[ -]?)?Critical>/i;
	var note12 = /<(?:Anti|No)[ -]?A(?:ctor[ -]?)?Critical>/i;
	var note13 = /<(?:Anti|No)[ -]?Affect(?:ed)?[ -]?States?>/i;
	var note14 = /<(?:Anti|No)[ -]?Change(?:d)?[ -]?States?>/i;
	var note15 = /<(?:Anti|No)[ -]?Add(?:ed)?[ -]?States?>/i;
	var note16 = /<(?:Anti|No)[ -]?Removed(?:ed)?[ -]?States?>/i;
	var note17 = /<(?:Anti|No)[ -]?Current?[ -]?States?>/i;
	var note18 = /<(?:Anti|No)[ -]?Change(?:d)?[ -]?Buffs?>/i;
	var note19 = /<(?:Anti|No)[ -]?Add(?:ed)?[ -]?Buffs?>/i;
	var note20 = /<(?:Anti|No)[ -]?Add(?:ed)?[ -]?Debuffs?>/i;
	var note21 = /<(?:Anti|No)[ -]?Remove(?:d)?[ -]?Buffs?>/i;
	var note22 = /<(?:Anti|No)[ -]?Hp?[ -]?Damage>/i;
	var note23 = /<(?:Anti|No)[ -]?Hp?[ -]?Text>/i;
	var note24 = /<(?:Anti|No)[ -]?Mp?[ -]?Damage>/i;
	var note25 = /<(?:Anti|No)[ -]?Mp?[ -]?Text>/i;
	var note26 = /<(?:Anti|No)[ -]?Tp?[ -]?Damage>/i;
	var note27 = /<(?:Anti|No)[ -]?Tp?[ -]?Text>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for the checks later
		obj.antiFail = false;
		obj.antiResults = false;
		obj.antiAction = false;
		obj.antiDamage = false;
		obj.antiCounter = false;
		obj.antiReflect = false;
		obj.antiSubstitute = false;
		obj.antiMiss = false;
		obj.antiEvasion = false;
		obj.antiCritical = false;
		obj.antiECritical = false;
		obj.antiACritical = false;
		obj.antiAffectStates = false;
		obj.antiChangeStates = false;
		obj.antiAddStates = false;
		obj.antiRemoveStates = false;
		obj.antiCurrentStates = false;
		obj.antiChangeBuffs = false;
		obj.antiAddBuffs = false;
		obj.antiAddDebuffs = false;
		obj.antiRemoveBuffs = false;
		obj.antiHpDamage = false;
		obj.antiHpText = false;
		obj.antiMpDamage = false;
		obj.antiMpText = false;
		obj.antiTpDamage = false;
		obj.antiTpText = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.antiFail = true;
			} else if (line.match(note2)){
				obj.antiResults = true;
			} else if (line.match(note3)){
				obj.antiAction = true;
			} else if (line.match(note4)){
				obj.antiDamage = true;
			} else if (line.match(note5)){
				obj.antiCounter = true;
			} else if (line.match(note6)){
				obj.antiReflect = true;
			} else if (line.match(note7)){
				obj.antiSubstitute = true;
			} else if (line.match(note8)){
				obj.antiMiss = true;
			} else if (line.match(note9)){
				obj.antiEvasion = true;
			} else if (line.match(note10)){
				obj.antiCritical = true;
			} else if (line.match(note11)){
				obj.antiECritical = true;
			} else if (line.match(note12)){
				obj.antiACritical = true;
			} else if (line.match(note13)){
				obj.antiAffectStates = true;
			} else if (line.match(note14)){
				obj.antiChangeStates = true;
			} else if (line.match(note15)){
				obj.antiAddStates = true;
			} else if (line.match(note16)){
				obj.antiRemoveStates = true;
			} else if (line.match(note17)){
				obj.antiCurrentStates = true;
			} else if (line.match(note18)){
				obj.antiChangeBuffs = true;
			} else if (line.match(note19)){
				obj.antiAddBuffs = true;
			} else if (line.match(note20)){
				obj.antiAddDebuffs = true;
			} else if (line.match(note21)){
				obj.antiRemoveBuffs = true;
			} else if (line.match(note22)){
				obj.antiHpDamage = true;
			} else if (line.match(note23)){
				obj.antiHpDamage = true;
			} else if (line.match(note24)){
				obj.antiMpDamage = true;
			} else if (line.match(note25)){
				obj.antiMpText = true;
			} else if (line.match(note26)){
				obj.antiTpDamage = true;
			} else if (line.match(note27)){
				obj.antiTpText = true;
			}
		}
	}
};
	
//A function to quickly check if the message should be displayed or not
function antiCheck(switchNumber, tag){
	//Gets the switch number from the ones listed by the maker
	num = Frashaw.Param.DSwitches[switchNumber];
	//Doesn't check if the number is 0
	if (num != 0){
		if ($gameSwitches.value(num)) return false;
	}
	//Checks the last used item to see if they have the respective tag for the no
	//messages
	if (eval("BattleManager._action != null && BattleManager._action.item()." + tag)) return false;
	//If none of the other checks ran, it returns true that the message
	//can show.
	return true;
}

//The fuction that shows the fail message (or not).
frsh_antiMsg_displayFailure = Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target){
	if ((target.result().isHit() && !target.result().success) && antiCheck(1, "antiFail")) frsh_antiMsg_displayFailure.call(this, target);
};
	
frsh_antiMsg_displayActionResults = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	if (antiCheck(2, "antiResults")){
		frsh_antiMsg_displayActionResults.call(this, subject, target);
		//A line imported from battle engine it overwrites this function and better to be safe then sorry
		//if removing the only difference will break the plugin
		if (Imported.YEP_BattleEngineCore){ if (target.isDead()) target.performCollapse(); }
	}
}
	
//Doesn't run when Custom Item Messages is in
if (!Imported.CIMessage){
	frsh_antiMsg_displayAction = Window_BattleLog.prototype.displayAction
	Window_BattleLog.prototype.displayAction = function(subject, item) {
		if (antiCheck(3, "antiAction")) frsh_antiMsg_displayAction.call(this,subject,item);
	};
}

//Beyond minor variations in critical and buffs, there is nothing to note as it is
//a repetition of a slightly different check followed by the init call
frsh_antiMsg_displayDamage = Window_BattleLog.prototype.displayDamage
Window_BattleLog.prototype.displayDamage = function(target) {
	if (antiCheck(4, "antiDamage")) frsh_antiMsg_displayDamage.call(this,target);
};
	
frsh_antiMsg_displayCounter = Window_BattleLog.prototype.displayCounter;
Window_BattleLog.prototype.displayCounter = function(target) {
	if (antiCheck(5, "antiCounter")) frsh_antiMsg_displayCounter.call(this,target);
};

frsh_antiMsg_displayReflection = Window_BattleLog.prototype.displayReflection;
Window_BattleLog.prototype.displayReflection = function(target) {
	if (antiCheck(6, "antiReflection")) frsh_antiMsg_displayReflection.call(this,target);
};
	
frsh_antiMsg_displaySubstitute = Window_BattleLog.prototype.displaySubstitute;
Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
	if (antiCheck(7, "antiSubstitute")) frsh_antiMsg_displaySubstitute.call(this, substitute, target);
};

frsh_antiMsg_displayMiss = Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
	if (antiCheck(8, "antiMiss")) frsh_antiMsg_displayMiss.call(this, target);
};

frsh_antiMsg_displayEvasion = Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
	if (antiCheck(9, "antiEvasion")) frsh_antiMsg_displayEvasion.call(this,target);
};

//Criticals
Window_BattleLog.prototype.displayCritical = function(target) {
	if (target.result().critical && antiCheck(10, "antiCritical")) {
		if (target.isActor()) {
			if (antiCheck(12, "antiACritical")) this.push('addText', TextManager.criticalToActor);
		} else {
			if (antiCheck(11, "antiECritical")) this.push('addText', TextManager.criticalToEnemy);
		}
	}
};


//Other Free One
frsh_antiMsg_displayAffectedStatus = Window_BattleLog.prototype.displayAffectedStatus;
Window_BattleLog.prototype.displayAffectedStatus = function(target) {
	if (antiCheck(13, "antiAffectStates")) frsh_antiMsg_displayAffectedStatus.call(this,target);
};

//States
frsh_antiMsg_displayChangedStatus = Window_BattleLog.prototype.displayChangedStates;
Window_BattleLog.prototype.displayChangedStates = function(target) {
	if (antiCheck(14, "antiChangeStates")) frsh_antiMsg_displayChangedStatus.call(this,target);
};

frsh_antiMsg_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
Window_BattleLog.prototype.displayAddedStates = function(target) {
	if (antiCheck(15, "antiAddStates")) frsh_antiMsg_displayAddedStates.call(this, target);
};

frsh_antiMsg_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates;
Window_BattleLog.prototype.displayRemovedStates = function(target) {
	if (antiCheck(16, "antiRemoveStates")) frsh_antiMsg_displayRemovedStates.call(this, target);
};

frsh_antiMsg_displayCurrentStatus = Window_BattleLog.prototype.displayChangedStates;
Window_BattleLog.prototype.displayCurrentState = function(subject) {
	if (antiCheck(17, "antiCurrentStates")) frsh_antiMsg_displayCurrentStatus.call(this, subject);
};

//Buffs
Window_BattleLog.prototype.displayChangedBuffs = function(target) {
	if (antiCheck(18, "antiChangeBuffs")){
		var result = target.result();
		if (antiCheck(19, "antiAddBuffs")) this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
		if (antiCheck(20, "antiAddDebuffs")) this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
		if (antiCheck(21, "antiRemoveBuffs")) this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
	}
};

frsh_antiMsg_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
	if (antiCheck(22, "antiHpDamage")) frsh_antiMsg_displayHpDamage.call(this,target);
};
	
frsh_antiMsg_displayHpText = Window_BattleLog.prototype.makeHpDamageText;
Window_BattleLog.prototype.makeHpDamageText = function(target) {
	if (antiCheck(23, "antiHpText")) return frsh_antiMsg_displayHpText.call(this, target);
};

frsh_antiMsg_displayMpDamage = Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
	if (antiCheck(24, "antiMpDamage")) frsh_antiMsg_displayMpDamage.call(this, target);
};

frsh_antiMsg_makeMpDamageText = Window_BattleLog.prototype.makeMpDamageText;
Window_BattleLog.prototype.makeMpDamageText = function(target) {
	if (antiCheck(25, "antiMpText")) return frsh_antiMsg_makeMpDamageText.call(this, target);
};

frsh_antiMsg_displayTpDamage = Window_BattleLog.prototype.displayTpDamage;
Window_BattleLog.prototype.displayTpDamage = function(target) {
	if (antiCheck(26, "antiTpDamage")) frsh_antiMsg_displayTpDamage.call(this, target);
};

frsh_antiMsg_makeTpDamageText = Window_BattleLog.prototype.makeTpDamageText;
Window_BattleLog.prototype.makeTpDamageText = function(target) {
	if (antiCheck(27, "antiTpText")) return frsh_antiMsg_makeTpDamageText.call(this, target);
};
})();
//=============================================================================
// End of File
//=============================================================================
