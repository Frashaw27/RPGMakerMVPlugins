//=============================================================================
// FRSH_Overheal
// FRSH_Overheal.js
// Version: 1.4.0
//=============================================================================

var Imported = Imported || {};
Imported.Overheal = true;

var Frashaw = Frashaw || {};
Frashaw.Overheal = Frashaw.Overheal || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows healing to overheal the target if specified.
*
* @param baseOHMult
* @text Base Overheal Multiplier
* @type number
* @decimals 2
* @desc Put the number you want to be the default multiplier for all overheals.
* @default 0.5
* @min 0
*
* @param baseOHCap
* @text Base Overheal Cap
* @type number
* @decimals 2
* @desc Select the option that you want to cap out Overheals by default. 
* @type select
* @option Current Stat Max
* @option Half Stat Max
* @option No Cap
* @default Current Stat Max
*
* @param
* @default
*
* @param ohMsg
* @text Hp Overheal Message
* @type text
* @desc Put the message you want to show when recieving Hp Overheal. Use 1% to represent user & 2% to represent healing.
* @default 1% got 2% Hp Overheal!
*
* @param hpColor1
* @text Hp Overheal Color A
* @type number
* @desc Put in the Window Color you want to represent Hp Overheal. Put -1 for a lightened tone of the base color.
* @default 20
* @min -1
*
* @param hpColor1Over
* @parent hpColor1
* @text Hp Overheal Custom A 
* @type text
* @desc Put in the hexadecimal code you want for the color to use. Include the '#'. Leave blank to not use. Ex: #f0f0f0
* @default
*
* @param hpColor2
* @text Hp Overheal Color B
* @type number
* @desc Put in the Window Color you want to represent Hp Overheal. Put -1 for a lightened base, -2 for same color as A.
* @default 21
* @min -2
*
* @param hpColor2Over
* @parent hpColor2
* @text Hp Overheal Custom B 
* @type text
* @desc Put in the hexadecimal code you want for the color to use. Include the '#'. Leave blank to not use. Ex: #f0f0f0
* @default
*
* @param hpTextColor
* @text Hp Number Color
* @type number
* @desc Put in the Window Color you want to show when on the Hp number an actor has overheal. Put -1 for a lightened base.
* @default 26
* @min -1
*
* @param
* @default
*
* @param ohMpMsg
* @text Mp Overheal Message
* @type text
* @desc Put the message you want to show when recieving Mp Overheal. Use 1% to represent user & 2% to represent healing.
* @default 1% got 2% Mp Overheal!
*
* @param mpColor1
* @text Mp Overheal Color A
* @type number
* @desc Put in the Window Color you want to represent Mp Overheal. Put -1 for a lightened tone of the base color.
* @default 22
* @min -1
*
* @param mpColor1Over
* @parent mpColor1
* @text Mp Overheal Custom A 
* @type text
* @desc Put in the hexadecimal code you want for the color to use. Include the '#'. Leave blank to not use. Ex: #f0f0f0
* @default
*
* @param mpColor2
* @text Mp Overheal Color B
* @type number
* @desc Put in the Window Color you want to represent Mp Overheal. Put -1 for a lightened base, -2 for same color as A.
* @default 23
* @min -2
*
* @param mpColor2Over
* @parent mpColor2
* @text Mp Overheal Custom B 
* @type text
* @desc Put in the hexadecimal code you want for the color to use. Include the '#'. Leave blank to not use. Ex: #f0f0f0
* @default
*
* @param mpTextColor
* @text Mp Number Color
* @type number
* @desc Put in the Window Color you want to show when on the Mp number an actor has overheal. Put -1 for a lightened base.
* @default 26
* @min -1
*
* @param
* @default
*
* @param ohTpMsg
* @text Tp Overheal Message
* @type text
* @desc Put the message you want to show when recieving Tp Overheal. Use 1% to represent user & 2% to represent healing.
* @default 1% got 2% Mp Overheal!
*
* @param tpColor1
* @text Tp Overheal Color A
* @type number
* @desc Put in the Window Color you want to represent Tp Overheal. Put -1 for a lightened tone of the base color.
* @default 28
* @min -1
*
* @param tpColor1Over
* @parent tpColor1
* @text Tp Overheal Custom A 
* @type text
* @desc Put in the hexadecimal code you want for the color to use. Include the '#'. Leave blank to not use. Ex: #f0f0f0
* @default
*
* @param tpColor2
* @text Tp Overheal Color B
* @type number
* @desc Put in the Window Color you want to represent Tp Overheal. Put -1 for a lightened base, -2 for same color as A.
* @default 23
* @min -2
*
* @param tpColor2Over
* @parent tpColor2
* @text Tp Overheal Custom B 
* @type text
* @desc Put in the hexadecimal code you want for the color to use. Include the '#'. Leave blank to not use. Ex: #f0f0f0
* @default
*
* @param tpTextColor
* @text Tp Number Color
* @type number
* @desc Put in the Window Color you want to show when on the Tp number an actor has overheal. Put -1 for a lightened base.
* @default 26
* @min -1
*
* @help
* ==Notetags====================================================================
* Spaces and Capitalization doesn't matter
* | mean either can be used
* Skills/Items:
* <Overheal> - Causes the desisred skill/item to always overheal the Target 
* regardless of what stat it is and the user's personal overheal permissions.
* <Overheal Mult|Multiplier: x> - Give a multiplier to whatever overheal the 
* skill/item produces.
*
* Actors, Enemies, Classes, Weapons, Armors, and States:
* <Overheal Use> - Causes all skills and items to give the target Hp overheal. 
* <MP Overheal Use> - Causes all skills and items to give the target Mp 
* overheal. 
* <TP Overheal Use> - Causes all skills and items to give the target Tp 
* overheal (doesn't include Tp gained from damage and/or using skill Tp Gain).
* <Overheal Self> - Triggers all Hp heals to proc overheals.
* <Mp Overheal Self> - Triggers all Mp heals to proc overheals.
* <Tp Overheal Self> - Triggers all Tp heals to proc overheals.
* <Overheal Skills> - All Skills from the "holder" gives overheal.
* <Overheal Items> - All Items from the "holder" gives overheal. Doesn't work 
* on the enemies, for obvious reasons.
* <Overheal Mult|Multiplier: x> - Same as the skill version, but for the 
* actual entities.
* ===Introduction===============================================================
* When I was a wee child, I was obsessed with  the game Persona Q. In that 
* game, you have the ability to have additional max hp and sp based on your
* equipped persona. Because of this, I began to invision how that would work.
* And I got it working with Yanfly Buff and States core. While that worked 
* fine, it didn't feel particularlly intergrated with the game, so this 
* plugin was made to smooth that process out significantly.
* ===How to Use=================================================================
* !-Make sure to put this beneath any Battlelog Plugins & Yanfly Skill Core~!
* !~Also has incompatability with Mog Battle Hud, what you can do is 
* comment it out in the plugin itself, the method gainHp~!
* How this plugin works:
* This plugin makes it so that anytime an item with the overheal tag or a user
* has the tag from various sources, it will overheal the target's stat that 
* they're healing. For example: if the user had the associated tags, they
* would give any leftover healing from an Hp Potion as overheal. Once battle 
* ends, all overheal will go away. Unless directly called through over means
* (like calling hp in a damage formula), the overheals will act in place of
* the stats. If a method reduces them, the overheal is targeted first. If
* there is a skill cost (including Hp Cost with Yanfly Skill Core) the 
* overheal will be used before the actual mp, etc. This overheal is not
* (out of the box) a 1:1 conversion and instead operates that all overhealed
* stats are 50% of what would've been given normally (unless you change it).
*
* What you need to do:
* You assign the various conditions with the plugin options and then you 
* assign the tags to the applicable things. That's about it.
* ===Change Log=================================================================
* Version 1.4.0 (06/01/2025):
* -Changed up notetags calls to not require spaces along side other 
* optimizations
* -Added an adjustable cap to allow people to not have players overstep
*
* Version 1.3.1 (01/06/24):
* -Added a fix to make sure the regen effects don't give overheal unless the
* the recipient specifically has all healing of that type be overheal
* -Updated the way that the overheal message is displayed
*
* Version 1.3.0 (12/18/24) :
* -Changed the way overheal is checked as too not be intrusive to other 
* plugins 
* -The calls to check an actors Mp and Tp costs via scripts should now work
* properly
*
* Version 1.2.0 (02/16/24) :
* -Removed method that caused passive states to double up on calls
* -Added calls to make specifically skills or items give overheal
* -Fixed bug that made overheals not interact properly
*
* Version 1.1.0 (01/31/24):
* -Fixed bug where mixed overheal and not would not pay the proper costs
* -Added feature to allow individual targets to get overhealed
*
* Version 1.0.1 (11/20/23) :
* -Added an condition to have overheals not look funky with non full bars
* -Fixed a bug with Tp Number Colors
* -Added a componet for specific items to alter the amount of overheal they 
* give
* -Added a division to the overheal rates for the shown overheal, for better
* representation of the current rate
*
* Version 1.0 (10/31/23) :
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
(function() {
//==============================================================================
//Setup
//==============================================================================
//General Variables
var FrshOverhealLoaded = false;

//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_Overheal');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.BaseOverhealMultiplier = Number(Parameters.baseOHMult);
Frashaw.Param.BaseOverhealCap = Parameters.baseOHCap;
Frashaw.Param.OverhealMessage = Parameters.ohMsg;
Frashaw.Param.HpColor1 = Number(Parameters.hpColor1);
Frashaw.Param.HpCustom1 = Parameters.hpColor1Over;
if (Number(Parameters.hpColor2) != -2){
	Frashaw.Param.HpColor2 = Number(Parameters.hpColor2);
	Frashaw.Param.HpCustom2 = Parameters.hpColor2Over;
} else {
	Frashaw.Param.HpColor2 = Number(Parameters.hpColor1);
	Frashaw.Param.HpCustom2 = Parameters.hpColor1Over;
}
Frashaw.Param.HpTextColor = Number(Parameters.hpTextColor);
Frashaw.Param.MpOverhealMessage = Parameters.ohMpMsg;
Frashaw.Param.MpColor1 = Number(Parameters.mpColor1);
Frashaw.Param.MpCustom1 = Parameters.mpColor1Over;
if (Number(Parameters.mpColor2) != -2){
	Frashaw.Param.MpColor2 = Number(Parameters.mpColor2);
	Frashaw.Param.MpCustom2 = Parameters.mpColor2Over;
} else {
	Frashaw.Param.MpColor2 = Number(Parameters.mpColor1);
	Frashaw.Param.MpCustom2 = Parameters.mpColor1Over;
}
Frashaw.Param.MpTextColor = Number(Parameters.mpTextColor);
Frashaw.Param.TpOverhealMessage = Parameters.ohTpMsg;
Frashaw.Param.TpColor1 = Number(Parameters.tpColor1);
Frashaw.Param.TpCustom1 = Parameters.tpColor1Over;
if (Number(Parameters.tpColor2) != -2){
	Frashaw.Param.TpColor2 = Number(Parameters.tpColor2);
	Frashaw.Param.TpCustom2 = Parameters.tpColor2Over;
} else {
	Frashaw.Param.TpColor2 = Number(Parameters.tpColor1);
	Frashaw.Param.TpCustom2 = Parameters.tpColor1Over;
}
Frashaw.Param.TpTextColor = Number(Parameters.tpTextColor);

//Starts the function to intialize all the overheal notetags
FrshOverheal_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshOverheal_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshOverhealLoaded == false) {
		//Processes the notetags of actors
		this.processOverhealNotetagsA($dataItems);
		this.processOverhealNotetagsA($dataSkills);
		this.processOverhealNotetagsB($dataActors);
		this.processOverhealNotetagsB($dataClasses);
		this.processOverhealNotetagsB($dataEnemies);
		this.processOverhealNotetagsB($dataWeapons);
		this.processOverhealNotetagsB($dataArmors);
		this.processOverhealNotetagsB($dataStates);
		//Make sure it doesn't run twice
		FrshOverhealLoaded = true;
	}
	return true;
};

//Does the processing for the skills and items
DataManager.processOverhealNotetagsA = function(group) {
	//Loads up various strings to check for
	var note = /<(OVERHEAL)>/i;
	var note2 = /<Overheal[ ]?(?:Mult|Multiplier):[ ]?\d+.?\d*>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.overheal = false;
		obj.overhealMult = 1;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
				obj.overheal = true;
			} else if (line.match(note2)){
				obj.overhealMult *= Number(RegExp.$1);
			}
		}
	}
}

//Does the processing for everything else
DataManager.processOverhealNotetagsB = function(group) {
	//Loads up various strings to check for
	var note1 = /<(Overheal[ ]?(?:Use)?)>/i;
	var note2 = /<(?:MP[ ]?Overheal[ ]?(?:Use)?)>/i;
	var note3 = /<(?:TP[ ]?Overheal[ ]?(?:Use)?)>/i;
	var note1a = /<(Overheal[ ]?Self)>/i;
	var note2a = /<(?:MP[ ]?Overheal[ ]?Self)>/i;
	var note3a = /<(?:TP[ ]?Overheal[ ]?Self)>/i;
	var note4a = /<(?:Overheal[ ]?Items)>/i;
	var note4b = /<(?:Overheal[ ]?Skills)>/i;
	var noteA = /<Overheal[ ]?(?:Mult|Multiplier):[ ]?\d+.?\d*>/i;
	var noteB = /<Overheal[ ]?Cap[ ]?Add:[ ]?\d+>/i;
	var noteC = /<Overheal[ ]?Cap[ ]?(?:Mult|Multiplier):[ ]?\d+.?\d*>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.overhealUse = false;
		obj.mpOverhealUse = false;
		obj.tpOverhealUse = false;
		obj.overhealSelf = false;
		obj.mpOverhealSelf = false;
		obj.tpOverhealSelf = false;
		obj.overhealItems = false;
		obj.overhealSkills = false;
		obj.overhealMult = 1;
		obj.overhealCapAdd = 0;
		obj.overhealCapMult = 1;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.overhealUse = true;
			} else if (line.match(note2)){
				obj.mpOverhealUse = true;
			} else if (line.match(note3)){
				obj.tpOverhealUse = true;
			} else if (line.match(note1a)) {
				obj.overhealSelf = true;
			} else if (line.match(note2a)){
				obj.mpOverhealSelf = true;
			} else if (line.match(note3a)){
				obj.tpOverhealSelf = true;
			} else if (line.match(note4a)){
				obj.overhealItems = true;
			} else if (line.match(note4b)){
				obj.overhealSkills = true;
			} else if (line.match(noteA)){
				obj.overhealMult = Number(RegExp.$1);
			} else if (line.match(noteB)){
				obj.overhealCapAdd = Number(RegExp.$1);
			} else if (line.match(noteC)){
				obj.overhealCapMult = Number(RegExp.$1);
			}
		}
	}
}

//A function that shifts all the hexadecimal code up 3 levels for the glow up
function colorShift(color){
	var string = color.split("");
	for (var loop = 0; loop != string.length; loop++){
		if (string[loop] == "0"){
			string[loop] = "3";
		} else if (string[loop] == "1"){
			string[loop] = "4";
		} else if (string[loop] == "2"){
			string[loop] = "5";
		} else if (string[loop] == "3"){
			string[loop] = "6";
		} else if (string[loop] == "4"){
			string[loop] = "7";
		} else if (string[loop] == "6"){
			string[loop] = "8";
		} else if (string[loop] == "6"){
			string[loop] = "9";
		} else if (string[loop] == "7"){
			string[loop] = "a";
		} else if (string[loop] == "8"){
			string[loop] = "b";
		} else if (string[loop] == "9"){
			string[loop] = "c";
		} else if (string[loop] == "a"){
			string[loop] = "d";
		} else if (string[loop] == "b"){
			string[loop] = "e";
		} else if (string[loop] == "c"){
			string[loop] = "f";
		} else if (string[loop] == "d"){
			string[loop] = "f";
		} else if (string[loop] == "e"){
			string[loop] = "f";
		}
	}
	string = string.join('');
	return string;
}

//==============================================================================
//Making the Overheal for Actors and Enemies work properly
//==============================================================================
//Gets all the modifiers for Overheal with actors
Game_Actor.prototype.getOverhealStuff = function() {
	//Gets the modifiers from the base actor
	this.overhealUse = $dataActors[this.actorId()].overhealUse;
	this.mpOverhealUse = $dataActors[this.actorId()].mpOverhealUse;
	this.tpOverhealUse = $dataActors[this.actorId()].tpOverhealUse;
	this.overhealSelf = $dataActors[this.actorId()].overhealSelf;
	this.mpOverhealSelf = $dataActors[this.actorId()].mpOverhealSelf;
	this.tpOverhealSelf = $dataActors[this.actorId()].tpOverhealSelf;
	this.overhealMult *= $dataActors[this.actorId()].overhealMult;
	this.overhealSkills = $dataActors[this.actorId()].overhealSkills;
	this.overhealItems = $dataActors[this.actorId()].overhealItems;
	this.overhealCapMult = $dataActors[this.actorId()].overhealCapMult;
	this.overhealCapAdd += $dataActors[this.actorId()].overhealCapAdd;
	//Gets the modifiers from the classe of the actor
	var id = this._classId;
	if (!this.overhealUse) this.overhealUse = $dataClasses[id].overhealUse;
	if (!this.mpOverhealUse) this.mpOverhealUse = $dataClasses[id].mpOverhealUse;
	if (!this.tpOverhealUse) this.tpOverhealUse = $dataClasses[id].tpOverhealUse;
	if (!this.overhealSelf) this.overhealSelf = $dataClasses[id].overhealSelf;
	if (!this.mpOverhealSelf) this.mpOverhealSelf = $dataClasses[id].mpOverhealSelf;
	if (!this.tpOverhealSelf) this.tpOverhealSelf = $dataClasses[id].tpOverhealSelf;
	this.overhealMult *= $dataClasses[id].overhealMult;
	if (!this.overhealSkills) this.overhealSkills = $dataClasses[id].overhealSkills;
	if (!this.overhealItems) this.overhealItems = $dataClasses[id].overhealItems;
	this.overhealCapMult *= $dataClasses[id].overhealCapMult;
	this.overhealCapAdd += $dataClasses[id].overhealCapAdd;
	//Checks each equip the actor has
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		//Gets the modifiers from the actor's equipment
		if (!this.overhealUse) this.overhealUse = equip.overhealUse;
		if (!this.mpOverhealUse) this.mpOverhealUse = equip.mpOverhealUse;
		if (!this.tpOverhealUse) this.tpOverhealUse = equip.tpOverhealUse;
		if (!this.overhealSelf) this.overhealSelf = equip.overhealSelf;
		if (!this.mpOverhealSelf) this.mpOverhealSelf = equip.mpOverhealSelf;
		if (!this.tpOverhealSelf) this.tpOverhealSelf = equip.tpOverhealSelf;
		this.overhealMult *= equip.overhealMult;
		if (!this.overhealSkills) this.overhealSkills = equip.overhealSkills;
		if (!this.overhealItems) this.overhealItems = equip.overhealItems;
		this.overhealCapMult *= equip.overhealCapMult;
		this.overhealCapAdd += equip.overhealCapAdd;
	}
	//Gets actor's states
	var stateList = this.states();
	//Gets the modifiers from the base actor's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if (!this.overhealUse) this.overhealUse = $dataStates[id].overhealUse;
		if (!this.mpOverhealUse) this.mpOverhealUse = $dataStates[id].mpOverhealUse;
		if (!this.tpOverhealUse) this.tpOverhealUse = $dataStates[id].tpOverhealUse;
		if (!this.overhealSelf) this.overhealSelf = $dataStates[id].overhealSelf;
		if (!this.mpOverhealSelf) this.mpOverhealSelf = $dataStates[id].mpOverhealSelf;
		if (!this.tpOverhealSelf) this.tpOverhealSelf = $dataStates[id].tpOverhealSelf;
		this.overhealMult *= $dataStates[id].overhealMult;
		if (!this.overhealSkills) this.overhealSkills = $dataStates[id].overhealSkills;
		if (!this.overhealItems) this.overhealItems = $dataStates[id].overhealItems;
		this.overhealCapMult = $dataStates[id].overhealCapMult;
		this.overhealCapAdd += $dataStates[id].overhealCapAdd;
	}
};

//Same as above, but for enemies
Game_Enemy.prototype.getOverhealStuff = function() {
	//Gets the modifiers from the base enemy
	this.overhealUse = $dataEnemies[this.enemyId()].overhealUse;
	this.mpOverhealUse = $dataEnemies[this.enemyId()].mpOverhealUse;
	this.tpOverhealUse = $dataEnemies[this.enemyId()].tpOverhealUse;
	this.overhealMult *= $dataEnemies[this.enemyId()].overhealMult;
	this.overhealSelf = $dataEnemies[this.enemyId()].overhealSelf;
	this.mpOverhealSelf = $dataEnemies[this.enemyId()].mpOverhealSelf;
	this.tpOverhealSelf = $dataEnemies[this.enemyId()].tpOverhealSelf;
	this.overhealSkills = $dataEnemies[this.enemyId()].overhealSkills;
	//Gets enemy's states
	var stateList = this.states();
	//Gets the modifiers from the base enemy's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if (!this.overhealUse) this.overhealUse = $dataStates[id].overhealUse;
		if (!this.mpOverhealUse) this.mpOverhealUse = $dataStates[id].mpOverhealUse;
		if (!this.tpOverhealUse) this.tpOverhealUse = $dataStates[id].tpOverhealUse;
		if (!this.overhealSelf) this.overhealSelf = $dataStates[id].overhealSelf;
		if (!this.mpOverhealSelf) this.mpOverhealSelf = $dataStates[id].mpOverhealSelf;
		if (!this.tpOverhealSelf) this.tpOverhealSelf = $dataStates[id].tpOverhealSelf;
		this.overhealMult *= $dataStates[id].overhealMult;
		if (!this.overhealSkills) this.overhealSkills = $dataStates[id].overhealSkills;
	}
}

//Removes all the overheal modifiers so that it doesn't get repeated and/or bleed out
Game_BattlerBase.prototype.removeOverhealStuff = function() {
	//Determines what 4 modifiers that will be reset 
	var labels = ['overhealUse', 'mpOverhealUse', 'tpOverhealUse', 'overhealSelf', 'mpOverhealSelf', 'tpOverhealSelf'];
	for(var loop = 0; loop != 5; loop++){
		//Sets the modifier to undefined
		var text = "this." + labels[loop] + " = undefined";
		eval(text);
	}
	this.overhealMult = Frashaw.Param.BaseOverhealMultiplier;
	if (Frashaw.Param.BaseOverhealCap == "Current Stat Max"){
		this.overhealCapMult = 1;
	} else if (Frashaw.Param.BaseOverhealCap == "Half Stat Max"){
		this.overhealCapMult = 0.5;
	}
	this.overhealCapAdd = 0;
};

//Gets and resets the modifiers for the overheal
frsh_overheal_get_overheals = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_overheal_get_overheals.call(this);
	//Resets the values
	this.removeOverhealStuff();
	//Sets the values
	this.getOverhealStuff();
}

//Sets the 3 types of overheal on initalization
frsh_overheal_initzalize = Game_BattlerBase.prototype.initialize;
Game_BattlerBase.prototype.initialize = function() {
    frsh_overheal_initzalize.call(this);
	this.overheal = 0;
	this.mpOverheal = 0;
	this.tpOverheal = 0;
};

//==============================================================================
//Showing Overheal
//==============================================================================
//An override function that runs when the actor has any hp overheal active
frsh_overheal_base = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	if (actor.overheal > 0){
		width = width || 186;
		var color1 = this.hpGaugeColor1();
		var color2 = this.hpGaugeColor2();
		//Gets the the color for the first part of the bar
		if (Frashaw.Param.HpCustom1 == ''){
			var overhealColor1 = this.textColor(Frashaw.Param.HpColor1);
			if (Frashaw.Param.HpColor1 >= 0){
				var overhealColor1 = this.textColor(Frashaw.Param.HpColor1);
			} else {
				var overhealColor1 = colorShift(color1);
			}
		} else {
			var overhealColor1 = Frashaw.Param.HpCustom1;
		}
		//Gets the color for the 2nd part of the bar
		if (Frashaw.Param.HpCustom2 == ''){
			if (Frashaw.Param.HpColor2 >= 0){
				var overhealColor2 = this.textColor(Frashaw.Param.HpColor2);
			} else if (Number(Parameters.hpColor2) == -2){
				var overhealColor2 = colorShift(color1);
			} else {
				var overhealColor2 = colorShift(color2);
			}
		} else {
			var overhealColor2 = Frashaw.Param.HpCustom2;
		}
		//Gets the rate of the overheal to max hp for bar appearences.
		var overhealRate = actor.overheal/actor.mhp;
		overhealRate /= 2;
		//Adds a max and min to the rate so it neither fully eclipses the bar nor is a sliver on it.
		if (overhealRate < 0.01) overhealRate = 0.01;
		if (overhealRate > 0.9) overhealRate = 0.9;
		//Checks to see if the actor's hp is full or not
		if (actor.hpRate() == 1){
			this.drawGauge(x, y, width*(1-overhealRate), actor.hpRate(), color1, color2);
			//Draws the overheal gauge
			this.drawGauge(x+width*(1-overhealRate), y, width*(overhealRate), 1, overhealColor1, overhealColor2);
		} else {
			//Draws an empty gauge
			this.drawGauge(x, y, width, 0, color1, color2);
			this.drawGauge(x, y, width*actor.hpRate(), 1, color1, color2);
			//Draws the overheal gauge
			this.drawGauge(x+width*actor.hpRate(), y, width*(overhealRate), 1, overhealColor1, overhealColor2);
		}
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.hpA, x, y, 44);
		//Draws both the current hp and overheal
		this.drawCurrentAndMax(actor.hp+actor.overheal, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
	} else {
		frsh_overheal_base.call(this, actor, x, y, width);
	}
};

//An override function that runs when the actor has any mp overheal active
frsh_overheal_mp_base = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
	if (actor.mpOverheal > 0){
		width = width || 186;
		var color1 = this.mpGaugeColor1();
		var color2 = this.mpGaugeColor2();
		if (Frashaw.Param.MpCustom1 == ''){
			var overhealColor1 = this.textColor(Frashaw.Param.MpColor1);
			if (Frashaw.Param.MpColor1 >= 0){
				var overhealColor1 = this.textColor(Frashaw.Param.MpColor1);
			} else {
				var overhealColor1 = colorShift(color1);
			}
		} else {
			var overhealColor1 = Frashaw.ParamMpCustom1;
		}
		if (Frashaw.Param.MpCustom2 == ''){
			if (Frashaw.Param.MpColor2 >= 0){
				var overhealColor2 = this.textColor(Frashaw.Param.MpColor2);
			} else if (Number(Parameters.mpColor2) == -2){
				var overhealColor2 = colorShift(color1);
			} else {
				var overhealColor2 = colorShift(color2);
			}
		} else {
			var overhealColor2 = Frashaw.Param.MpCustom2;
		}
		var overhealRate = actor.mpOverheal/actor.mmp;
		overhealRate /= 2;
		if (overhealRate < 0.01) overhealRate = 0.01;
		if (overhealRate > 0.9) overhealRate = 0.9;
		if (actor.mpRate() == 1){
			this.drawGauge(x, y, width*(1-overhealRate), actor.mpRate(), color1, color2);
			this.drawGauge(x+width*(1-overhealRate), y, width*(overhealRate), actor.mpRate(), overhealColor1, overhealColor2);
		} else {
			this.drawGauge(x, y, width, 0, color1, color2);
			this.drawGauge(x, y, width*actor.mpRate(), 1, color1, color2);
			this.drawGauge(x+width*actor.mpRate(), y, width*(overhealRate), 1, overhealColor1, overhealColor2);
		}
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.mpA, x, y, 44);
		this.drawCurrentAndMax(actor.mp+actor.mpOverheal, actor.mmp, x, y, width, this.mpColor(actor), this.normalColor());
	} else {
		frsh_overheal_mp_base.call(this, actor, x, y, width);
	}
};

//An override function that runs when the actor has any tp overheal active
frsh_overheal_tp_base = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
	if (actor.tpOverheal > 0){
		width = width || 96;
		var color1 = this.tpGaugeColor1();
		var color2 = this.tpGaugeColor2();
		if (Frashaw.Param.TpCustom1 == ''){
			var overhealColor1 = this.textColor(Frashaw.Param.TpColor1);
			if (Frashaw.Param.TpColor1 >= 0){
				var overhealColor1 = this.textColor(Frashaw.Param.TpColor1);
			} else {
				var overhealColor1 = colorShift(color1);
			}
		} else {
			var overhealColor1 = Frashaw.ParamTpCustom1;
		}
		if (Frashaw.Param.TpCustom2 == ''){
			if (Frashaw.Param.TpColor2 >= 0){
				var overhealColor2 = this.textColor(Frashaw.Param.TpColor2);
			} else if (Number(Parameters.tpColor2) == -2){
				var overhealColor2 = colorShift(color1);
			} else {
				var overhealColor2 = colorShift(color2);
			}
		} else {
			var overhealColor2 = Frashaw.Param.TpCustom2;
		}
		var overhealRate = actor.tpOverheal/actor.maxTp();
		overhealRate /= 2;
		if (overhealRate < 0.01) overhealRate = 0.01;
		if (overhealRate > 0.9) overhealRate = 0.9;
		if (actor.tpRate() == 1){
			this.drawGauge(x, y, width*(1-overhealRate), actor.tpRate(), color1, color2);
			this.drawGauge(x+width*(1-overhealRate), y, width*(overhealRate), actor.hpRate(), colorShift(color1), colorShift(color2));
		} else {
			this.drawGauge(x, y, width, 0, color1, color2);
			this.drawGauge(x, y, width*actor.tpRate(), 1, color1, color2);
			this.drawGauge(x+width*actor.tpRate(), y, width*(overhealRate), 1, overhealColor1, overhealColor2);
		}
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.tpA, x, y, 44);
		this.changeTextColor(this.tpColor(actor));
		this.drawText(actor.tp+actor.tpOverheal, x + width - 64, y, 64, 'right');
	} else {
		frsh_overheal_tp_base.call(this, actor, x, y, width);
	}
};

//Provides a color for the hp number when the user has overheal
frsh_overheal_color = Window_Base.prototype.hpColor;
Window_Base.prototype.hpColor = function(actor) {
    if (actor.overheal > 0){
		if (Frashaw.Param.HpTextColor != -1){
			return this.textColor(Frashaw.Param.HpTextColor);
		} else {
			return colorShift(frsh_overheal_color.call(this, actor));
		}
	} else {
		return frsh_overheal_color.call(this, actor);
	}
};

//Provides a color for the mp number when the user has overheal
frsh_overheal_mp_color = Window_Base.prototype.mpColor;
Window_Base.prototype.mpColor = function(actor) {
	if (actor.mpOverheal){
		if (Frashaw.Param.MpTextColor != -1){
			return this.textColor(Frashaw.Param.MpTextColor);
		} else {
			return colorShift(frsh_overheal_mp_color.call(this, actor));
		}
	} else {
		return frsh_overheal_mp_color.call(this, actor);
	}
};

//Provides a color for the tp number when the user has overheal
frsh_overheal_tp_color = Window_Base.prototype.tpColor;
Window_Base.prototype.tpColor = function(actor) {
	if (actor.tpOverheal){
		if (Frashaw.Param.TpTextColor != -1){
			return this.textColor(Frashaw.Param.TpTextColor);
		} else {
			return colorShift(frsh_overheal_tp_color.call(this, actor));
		}
	} else {
		return frsh_overheal_tp_color.call(this, actor);
	}
};

//==============================================================================
//Actually Making Overheal Work
//==============================================================================
//Add a psuedo overwrite that makes the skill mp and tp costs take into account of overheal
frsh_overheal_base_cost_restrict = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
	this._mp += this.mpOverheal;
	this._tp += this.tpOverheal;
    bool = frsh_overheal_base_cost_restrict.call(this, skill);
	this._mp -= this.mpOverheal;
	this._tp -= this.tpOverheal;
	return bool;
};

//Add a psuedo overwrite that makes the skill mp and tp costs take from overheal before using the actual stats
frsh_overheal_base_cost_alter = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
	var mp = this._mp;
	var omp = this.mpOverheal;
	var tp = this._tp;
	var otp = this.tpOverheal;
	frsh_overheal_base_cost_alter.call(this, skill);
	if (this._mp < mp && omp > 0){
		var diff = mp - this._mp;
		if (omp >= diff){
			this._mp += diff;
			this.mpOverheal -= diff;
		} else {
			this._mp += omp;
			this.mpOverheal -= omp;
		}
	}
	if (this._tp < tp && otp > 0){
		var diff = tp - this._tp;
		if (otp >= diff){
			this._tp += diff;
			this.tpOverheal -= diff;
		} else {
			this._tp += omp;
			this.tpOverheal -= omp;
		}
	}
};

//An extentision to make this work with Yanfly Skill Core
if (Imported.YEP_SkillCore){
	//An overwrite that makes it account for applicable
	Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
		var cost = this.skillHpCost(skill);
		if (cost <= 0) return true;
		return (this._hp + this.overheal) > cost;
	};

	//An overwrite that makes it pay with overheal when appicable
	Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
		if (this.overheal > 0){
			var value = this.skillHpCost(skill); 
			if (this.overheal > value){
				this.overheal -= this.skillHpCost(skill);
			} else {
				value -= this.overheal;
				this.overheal = 0;
				this.setHp(this.hp - value);
			}
		} else {
			this._hp -= this.skillHpCost(skill);
		}
	};
}

//A function to overwrite how gaining/losing hp works, making it take into account overheals
Game_Battler.prototype.gainHp = function(value) {
    this._result.hpDamage = -value;
    this._result.hpAffected = true;
	if (value < 0 && this.overheal > 0){
		if (this.overheal > Math.abs(value)){
			this.overheal += value;
		} else {
			value += this.overheal;
			this.overheal = 0;
			this.setHp(this.hp + value);
		}
	
	} else if (value > 0 && (this.hp + value) > this.mhp && ($gameParty.inBattle() && BattleManager._action != null && (BattleManager._phase != "turnEnd" || this.overhealSelf) && (BattleManager._action.item().overheal || BattleManager._action.subject().overhealUse || this.overhealSelf || (BattleManager._action.subject().overhealSkills && BattleManager._action.isSkill()) || (BattleManager._action.subject().overhealItems && BattleManager._action.isItem())))){
		value -= this.mhp - this.hp;
		this.setHp(this.mhp);
		value *= this.overhealMult;
		value *= BattleManager._action.item().overhealMult;
		value = Math.round(value);
		this.overheal += value;
		cap = Math.round((this.overhealCapMult * this.mhp) + this.overhealCapAdd);
		if (Frashaw.Param.BaseOverhealCap != "No Cap" && this.overheal > cap){
			this.overheal = cap;
		}
		this._result.hpOverhealShow += value;
	} else {
		this.setHp(this.hp + value);
	}
	this.refresh();
};

//A function to overwrite how gaining/losing mp works, making it take into account overheals
Game_Battler.prototype.gainMp = function(value) {
    this._result.mpDamage = -value;
	if (value < 0 && this.mpOverheal > 0){
		if (this.mpOverheal > Math.abs(value)){
			this.mpOverheal += value;
		} else {
			value += this.mpOverheal;
			this.mpOverheal = 0;
			this.setMp(this.mp + value);
		}
	} else if (value > 0 && (this.mp + value) > this.mmp && ($gameParty.inBattle() && BattleManager._action != null && (BattleManager._phase != "turnEnd" || this.mpOverhealSelf) && (BattleManager._action.item().overheal || BattleManager._action.subject().mpOverhealUse || this.mpOverhealSelf  || (BattleManager._action.subject().overhealSkills && BattleManager._action.isSkill()) || (BattleManager._action.subject().overhealItems && BattleManager._action.isItem())))){
		value -= this.mmp - this.mp;
		this.setMp(this.mmp);
		value *= this.overhealMult;
		value *= BattleManager._action.item().overhealMult;
		value = Math.round(value);
		this.mpOverheal += value;
		cap = Math.round((this.overhealCapMult * this.mhp) + this.overhealCapAdd);
		if (Frashaw.Param.BaseOverhealCap != "No Cap" && this.mpOverheal > cap){
			this.mpOverheal = cap;
		}
		this._result.mpOverhealShow += value;
	} else {
		this.setMp(this.mp + value);
	}
	this.refresh();
};

//A function to overwrite how gaining/losing tp works, making it take into account overheals
Game_Battler.prototype.gainTp = function(value) {
    this._result.tpDamage = -value;
	if (value < 0 && this.tpOverheal > 0){
		if (this.tpOverheal > Math.abs(value)){
			this.tpOverheal += value;
		} else {
			value += this.tpOverheal;
			this.tpOverheal = 0;
			this.setTp(this.mp + value);
		}
	} else if (value > 0 && (this.tp + value) > this.maxTp() && ($gameParty.inBattle() && BattleManager._action != null && (BattleManager._phase != "turnEnd" || this.tpOverhealSelf) && (BattleManager._action.item().overheal || BattleManager._action.subject().tpOverhealUse || this.tpOverhealSelf || (BattleManager._action.subject().overhealSkills && BattleManager._action.isSkill()) || (BattleManager._action.subject().overhealItems && BattleManager._action.isItem())))){
		value -= this.maxTp() - this.tp;
		this.setTp(this.maxTp());
		value *= this.overhealMult;
		value *= BattleManager._action.item().overhealMult;
		value = Math.round(value);
		this.tpOverheal += value;
		cap = Math.round((this.overhealCapMult * this.mhp) + this.overhealCapAdd);
		if (Frashaw.Param.BaseOverhealCap != "No Cap" && this.tpOverheal > cap){
			this.tpOverheal = cap;
		}
		this._result.tpOverhealShow = value;
	} else {
		this.setTp(this.tp + value);
	}
	this.refresh();
};

//Resets all overheals at the end of battle
frsh_overheal_clear = Game_Battler.prototype.onBattleEnd
Game_Battler.prototype.onBattleEnd = function() {
    frsh_overheal_clear.call(this);
	this.overheal = 0;
	this.mpOverheal = 0;
	this.tpOverheal = 0;
};

//==============================================================================
//Showing Overheal In Battle Log
//==============================================================================
//Shows the message for getting hp overheals when appicable
frsh_overheal_hp_text = Window_BattleLog.prototype.makeHpDamageText;
Window_BattleLog.prototype.makeHpDamageText = function(target) {
	//Gets the normal text
	var text = frsh_overheal_hp_text.call(this, target);
	var damage = target.result().hpDamage * -1;
	//Checks to see if overheal is applicable and if the party is in battle
	if (target.result().hpOverhealShow > 0) {
		//adds the normal text
		this.push('addText', text);
		//Removes the actual heal to get the amount of overheal
		damage = target.result().hpOverhealShow;
		//Gets the appropriate text
		var text2 = Frashaw.Param.OverhealMessage;
		//Replaces the respective symbols for name and overheal respectively
		text2 = text2.replace('1%', target.name()).replace('2%', damage);
		//Returns the modifed string
		return text2;
	} else {
		//Just returns the normal text if the IF fails
		return text;
	}
};

//Shows the message for getting mp overheals when appicable
frsh_overheal_mp_text = Window_BattleLog.prototype.makeMpDamageText;
Window_BattleLog.prototype.makeMpDamageText = function(target) {
	var text = frsh_overheal_mp_text.call(this, target);
	var damage = target.result().mpDamage * -1;
	if (this._result.mpOverhealShow > 0) {
		this.push('addText', text);
		damage = this._result.mpOverhealShow
		var text2 = Frashaw.Param.MpOverhealMessage;
		text2 = text2.replace('1%', target.name()).replace('2%', damage);
		return text2;
	} else {
		return text;
	}
};

//Shows the message for getting tp overheals when appicable
frsh_overheal_tp_text = Window_BattleLog.prototype.makeTpDamageText;
Window_BattleLog.prototype.makeTpDamageText = function(target) {
	var text = frsh_overheal_tp_text.call(this, target);
	var damage = target.result().tpDamage * -1;
	if (this._result.tpOverhealShow > 0) {
		this.push('addText', text);
		damage = this._result.tpOverhealShow;
		var text2 = Frashaw.Param.TpOverhealMessage;
		text2 = text2.replace('1%', target.name()).replace('2%', damage);
		return text2;
	} else {
		return text;
	}
};

//A function to reset the overheal values that get show on the hud
frsh_overheal_value_sets = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
	frsh_overheal_value_sets.call(this);
	this.hpOverhealShow = 0;
    this.mpOverhealShow = 0;
    this.tpOverhealShow = 0;
};
})();
//=============================================================================
// End of File
//=============================================================================
