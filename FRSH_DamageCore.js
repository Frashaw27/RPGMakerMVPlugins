//=============================================================================
// FRSH_DamageCore
// FRSH_DamageCore.js
// Version: 1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.dmgCore = true;

var Frashaw = Frashaw || {};
Frashaw.DMGCore = Frashaw.DMGCore || {};

//=============================================================================
/*:
* @author Frashaw27
* @plugindesc Expands the options for Damage for Basic and Elemental Combat.
*
* @param dmgCoreResist
* @text Resist Text
* @type text
* @desc Put the line you want to appear when target Resists an attack. 1% for user, 2% for target. Leave blank to not use.
* @default 2% resisted 1%'s Attack!
*
* @param dmgCoreResistSE
* @parent dmgCoreResist
* @text Resist Sound
* @type file
* @dir audio/se/
* @desc Put the Sound Effect you want to sound when target Resists an attack. Put "None" to not use.
*
* @param dmgCoreResistSEVol
* @parent dmgCoreResist
* @text Resist Sound Volume
* @type number
* @min 0
* @max 100
* @default 90
* @desc Input the volume you want for the Resist Sound.
*
* @param dmgCoreResistSEPitch
* @parent dmgCoreResist
* @text Resist Sound Pitch
* @type number
* @min 50
* @max 150
* @default 100
* @desc Input the pitch you want for the Resist Sound.
*
* @param dmgCoreWeak
* @text Weakness Text
* @type text
* @desc Put the line you want to appear when target is Weak to an attack. 1% for user, 2% for target. Leave blank to not use.
* @default 2% was weak to 1%'s Attack!
*
* @param dmgCoreWeakSE
* @parent dmgCoreWeak
* @text Weakness Sound
* @type file
* @dir audio/se/
* @desc Put the Sound Effect you want to sound when target is Weak to an attack. Put "None" to not use.
*
* @param dmgCoreWeakSEVol
* @parent dmgCoreWeak
* @text Weakness Sound Volume
* @type number
* @min 0
* @max 100
* @default 90
* @desc Input the volume you want for the Weakness Sound.
*
* @param dmgCoreWeakSEPitch
* @parent dmgCoreWeak
* @text Weakness Sound Pitch
* @type number
* @min 50
* @max 150
* @default 100
* @desc Input the pitch you want for the Weakness Sound.
*
* @param dmgCorePierce
* @text Pierce Text
* @type text
* @desc Put the line you want to appear when Piercing a target. 1% for user, 2% for target. Leave blank to not use.
* @default 2% got pierced by 1%'s Attack!
*
* @param dmgCorePierceSE
* @parent dmgCorePierce
* @text Pierce Sound
* @type file
* @dir audio/se/
* @desc Put the Sound Effect you want to sound when target is Pierced by an attack. Put "None" to not use.
*
* @param dmgCorePierceSEVol
* @parent dmgCorePierce
* @text Pierce Sound Volume
* @type number
* @min 0
* @max 100
* @default 90
* @desc Input the volume you want for the Pierce Sound.
*
* @param dmgCorePierceSEPitch
* @parent dmgCorePierce
* @text Pierce Sound Pitch
* @type number
* @min 50
* @max 150
* @default 100
* @desc Input the pitch you want for the Pierce Sound.
*
* @param dmgCoreAbsorb
* @text Absorb Text
* @type text
* @desc Put the line you want to appear when a target Absorbs an Attack. 1% for user, 2% for target. Leave blank to not use.
* @default 2% absorbs 1%'s Attack!
*
* @param dmgCoreAbsorbSE
* @parent dmgCoreAbsorb
* @text Absorb Sound
* @type file
* @dir audio/se/
* @desc Put the Sound Effect you want to sound when target Absorbs an attack. Put "None" to not use.
*
* @param dmgCoreAbsorbSEVol
* @parent dmgCoreAbsorb
* @text Absorb Sound Volume
* @type number
* @min 0
* @max 100
* @default 90
* @desc Input the volume you want for the Absorb Sound.
*
* @param dmgCoreAbsorbSEPitch
* @parent dmgCoreAbsorb
* @text Absorb Sound Pitch
* @type number
* @min 50
* @max 150
* @default 100
* @desc Input the pitch you want for the Absorb Sound.
*
* @param
* @default
*
* @param dmgCoreToggle
* @text PDR/MDR Text Trigger?
* @type bool
* @type boolean
* @desc Click True/False if you want the calculation with PDR/MDR to also trigger Resist, Weakness, and Absorb texts to show.
* @default true
*
* @help 
* ==Notetags====================================================================
* Non-case sensitive, Spaces optional
*
* Element 0 is a place holder for "Element " and then the id of the element. It
* can also be replaced by the name of the element's name
*
* Actors, Classes, Weapons, Armors, Enemies, States:
* <Flat Damage Boost: x><dmgboost:x> - Increases all Damage from all Attacks by
* this amount.
* <Flat Reduction Boost: -x><dmgreduct:-x> - Decreases Damage taken from all
* Attacks by this amount.
* <Flat Heal Boost: x><healboost:x> - Increases all Healing from all Heals by
* this amount.
* <Damage Multiplier: x><dmgmult:x> - Multiplies all Damage from Attacks by 
* this amount. Accepts decimals numbers.
* <Heal Multiplier: x><healmult:x> - Multiplies all Healing from Heals by this
* amount. Accepts decimal numbers.
* <Element 0 Boost: x><element0boost:x> - Bonus damage when dealing Damage
* with the specified element.
* <Element 0 Multiplier: x><element0mult: x> - Multipliers Damage when using the
* specified element. Accepts decimal numbers.
*
* <Element 0 Evasion: x><element0eva:x> - Gives a bonus to Evading Attacks of 
* the specified element.
* <Element 0 Reflection: x><element0reflect:x> - Gives a bonus to reflecting an
* Attack by the specified element.
* <Element 0 Absorb><element0absorb> - Makes Damage by Attacks of this Element
* be converted into Hp.
* <Element 0 Override: x><element0over:x> - Sets the Resistance of the specified
* element to this.
*
* <Physical Broken><physBroken>: The user cannot have a PDR lower then 1.
* <Magical Broken><magBroken>: The user cannot have a MDR lower then 1.
*
* Actors, Classes, Weapons, Armors, Enemies, States, Items, Skills:
* <Critical Damage Bonus: x><critdmg:x> - Increases/Decrease the modifier of how
* much a Critical Hit will deal. Accepts decimal numbers.
*
* <Element 0 Pierce><element0pierce> - Allows you to ignore an enemy's 
* Resistance to the specified element. Doesn't work against Refelect or Evasion
* but does against Absorb.
*
* <Physical Pierce><physpierce> - Ignore the PDR of a target if it's below 0.
* <Magical Pierce><magpierce> - Ignore the MDR of a target if it's below 0.
*
* Items, Skills:
* <Critical Bonus: x><critbonus:x> - Increases the chance of landing a Critical
* hit with this particular Item/Skill.
* ===Traits=====================================================================
* Actors, Classes, Weapons, Armors, Enemies, States:
* thing.flatDmgBoost: Gets you the flat damage added to all damage.
* thing.flatDmgReduct: Gets you the flat damage reduced from all damage.
* thing.flatHealBoost: Gets you the flat healing reduced to all healing.
* thing.multDmgBoost: Gets you the multiplier applied to all damage.
* thing.multHealBoost: Gets you the multiplier applied to all healing.
* thing.elementalBoost[id of element]: Gets you the flat boost to elemental
* damage.
* thing.elementalMult[id of element]: Gets you the multiplier to elemental
* damage.
*
* thing.elementalEvade[id of element]: Gets you the evasion boost to incoming 
* elemental damage.
* thing.elementalReflect[id of element]: Gets you the reflect boost to incoming 
* elemental damage.
* thing.elementalAbsorb[id of element]: Gets you a true/false if the thing
* absorbs the elemental damage as Hp.
* thing.elementalOverride[id of element]: Sets your Elemental Rate to this,
* regardless of what it was originally. Also disables Absortion.
*
* thing.physBroken: Gets if the user can have a PDR lower then 1.
* thing.magBroken: Gets if the user can have a MDR lower then 1.
*
* Actors, Classes, Weapons, Armors, Enemies, States, Items, Skills:
* thing.critDamageBonus: Gets the boost in damage that a Critical Hit will 
* deal.
*
* thing.elementalPierce[id of element]: Gets you a true/false if the thing will
* ignore resistances besides reflect when dealing the elemental damage.
*
* thing.physPierce: Gets you a true/false if the PDR on the thing's target will
* be considered if below 0.
* thing.magPierce: Gets you a true/false if the MDR on the thing's target will
* be considered if below 0.
*
* Items, Skills:
* thing.critBonus: Bonus chance for landing a Critical Hit using this specific
* Skill/Item.
* ===Introduction===============================================================
* For a while now, I've been seeing a lot of games doing elemental systems,
* however, I found that Base MV and other Plugins didn't have the features I
* wanted. And so I made this, loosely based on the aspects of the SMT franchise,
* which should cover most of the cases for an elemenetal system. 
* ===How to Use=================================================================
* For the most case, it is as simple as slapping in the Notetags. However, here
* is some things to keep note of.
*
* -Flat Damage Boosts all trigger before any multipliers
* -All multipliers besides Critical Damage Bonus get added multiplicatively
*   >1 * 1.2 * 1.2 = 1.44
* -Elemental Override changes whatever the original multiplier is to it. This
* is a first come, first serve basis. This means that a Weapon that sets the
* Elemental Rate to 150% can not be changed from a State that sets it to 50%
* -Healing modifiers are only applied by using the damage formula version
* -Don't name elements "Physical" or "Magical" as they are reserved for the 
* damage types of will have unintended circumstances if you care
* 
* !!!~~~Warning~~~!!!
* This will probably not work with any other plugin that alters Damage like
* this.
* If there is a plugin like FRSH_HpShields that extends off of the Damage
* function, put them below this plugin or they will not work.
* ===Change Log=================================================================
* Version 1.0.2 (08/01/2026):
* -Fixed where the Toggle for PDR and MDR wasn't label correctly and thus never
* triggerd within the damage running itself
* -Fixed the Toggle not checking for the correct things
* -Fixed the the results not properly updating after the action finished
* -Added note about Physical and Magical
*
* Version 1.0.1 (08/01/2026):
* -Fixed bug from something I changed last minute and didn't test
* -Added disclaimer
*
* Version 1.0.0 (08/01/2026):
* -Finished Base Plugin
* ==============================================================================
*/

(function() {
//============================================================================
//Setup
//============================================================================
FrshDmgCoreLoaded = false;

//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_DamageCore');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.DMGResistText = Parameters.dmgCoreResist;
Frashaw.Param.DMGResistSE = [Parameters.dmgCoreResistSE, Number(Parameters.dmgCoreResistSEVol), Number(Parameters.dmgCoreResistSEPitch)];
Frashaw.Param.DMGWeaknessText = Parameters.dmgCoreWeak;
Frashaw.Param.DMGWeaknessSE = [Parameters.dmgCoreWeakSE, Number(Parameters.dmgCoreWeakSEVol), Number(Parameters.dmgCoreWeakSEPitch)];
Frashaw.Param.DMGPierceText = Parameters.dmgCorePierce;
Frashaw.Param.DMGPierceSE = [Parameters.dmgCorePierceSE, Number(Parameters.dmgCorePierceSEVol), Number(Parameters.dmgCorePierceSEPitch)];
Frashaw.Param.DMGAbsorbText = Parameters.dmgCoreAbsorb;
Frashaw.Param.DMGAbsorbSE = [Parameters.dmgCoreAbsorbSE, Number(Parameters.dmgCoreAbsorbSEVol), Number(Parameters.dmgCoreAbsorbSEPitch)];
Frashaw.Param.DMGDRToggle = Parameters.dmgCoreToggle == "true";

//Starts the function to intialize all the damage notetags
FrshDmgCore_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshDmgCore_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshDmgCoreLoaded == false) {
		//Processes the notetags of Actors, Classes, Weapons, Armors, Enemies, and States
		this.processDamageCoreNotetagsA($dataActors);
		this.processDamageCoreNotetagsA($dataClasses);
		this.processDamageCoreNotetagsA($dataWeapons);
		this.processDamageCoreNotetagsA($dataArmors);
		this.processDamageCoreNotetagsA($dataEnemies);
		this.processDamageCoreNotetagsA($dataStates);
		//Processes the notetags of Items and Skills
		this.processDamageCoreNotetagsB($dataItems);
		this.processDamageCoreNotetagsB($dataSkills);
		//Make sure it doesn't run twice
		FrshDmgCoreLoaded = true;
	}
	return true;
};

//Processes the notetags of Actors, Classes, Weapons, Armors, Enemies, and States
DataManager.processDamageCoreNotetagsA = function(group) {
	//Loads up various strings to check for the various elemenetal modifiers
	notes1 = [];
	notes2 = [];
	notes3 = [];
	notes4 = [];
	notes5 = [];
	notes6 = [];
	notes7 = [];
	notes8 = [];
	notes9 = [];
	notes10 = [];
	notes11 = [];
	notes12 = [];
	notes13 = [];
	notes14 = [];
	//Goes through each of the elements and adds a check for the element id and element name
	$dataSystem.elements.forEach(function(e, i){
		//Makes a Regex while allowing for variables in the making of it
		notes1.push(new RegExp("<Element[ ]?" + i + "[ ]?Boost:[ ]?(-?\d+)>", "i"));
		notes2.push(new RegExp("<" + e + "[ ]?Boost:[ ]?(-?\d+)>", "i"));
		notes3.push(new RegExp("<Element[ ]?" + i + "[ ]?Mult(?:iplier)?:[ ]?(\d+(?:[.]\d+)?)>", "i"));
		notes4.push(new RegExp("<" + e + "[ ]?Mult(?:iplier)?:[ ]?(\d+(?:[.]\d+)?)>", "i"));
		notes5.push(new RegExp("<Element[ ]?" + i + "[ ]?Pierce>", "i"));
		notes6.push(new RegExp("<" + e + "[ ]?Pierce>", "i"));
		notes7.push(new RegExp("<Element[ ]?" + i + "[ ]?Eva(?:de|sion):[ ]?(-?\d+(?:[.]\d+)?)>", "i"));
		notes8.push(new RegExp("<" + e + "[ ]?Eva(?:de|sion):[ ]?(-?\d+(?:[.]\d+)?)>", "i"));
		notes9.push(new RegExp("<Element[ ]?" + i + "[ ]?Reflect(:?ion)?:[ ]?(-?\d+(?:[.]\d+)?)>", "i"));
		notes10.push(new RegExp("<" + e + "[ ]?Reflect(:?ion)?:[ ]?(-?\d+(?:[.]\d+)?)>", "i"));
		notes11.push(new RegExp("<Element[ ]?" + i + "[ ]?Absorb>", "i"));
		notes12.push(new RegExp("<" + e + "[ ]?Absorb>", "i"));
		notes13.push(new RegExp("<Element[ ]?" + i + "[ ]?Over(?:ride)?:[ ]?(\d+(?:[.]\d+)?)>", "i"));
		notes14.push(new RegExp("<" + e + "[ ]?Over(?:ride)?:[ ]?(\d+(?:[.]\d+)?)>", "i"));
	});
	//All non-elemenetal related modifiers
	noteA = /<(?:Flat)?[ ]?Da?ma?ge?[ ]?Boost:[ ]?(-?\d+)>/i;
	noteB = /<(?:Flat)?[ ]?Da?ma?ge?[ ]?Reduct(ion)?:[ ]?(-?\d+)>/i;
	noteC = /<(?:Flat)?[ ]?Heal[ ]?Boost:[ ]?(-?\d+)>/i;
	noteD = /<Da?ma?ge?[ ]?Mult(?:iplier)?:[ ]?(\d+(?:[.]\d+)?)>/i;
	noteE = /<Heal[ ]?Mult(?:iplier)?:[ ]?(\d+(?:[.]\d+)?)>/i;
	noteF = /<Crit(?:ical)?[ ]?D(?:a)?m(?:a)?g(?:e)?[ ]?(?:Bonus)?:[ ]?(-?\d+(?:[.]\d+)?)>/i;
	noteG = /<Phys(?:ical)?[ ]?Pierce>/i;
	noteH = /<Mag(?:ical)?[ ]?Pierce>/i;
	noteI = /<Phys(?:ical)?[ ]?Broken>/i;
	noteJ = /<Mag(?:ical)?[ ]?Broken>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Sets the base values for all modifiers
		obj.flatDmgBoost = 0;
		obj.flatDmgReduct = 0;
		obj.flatHealBoost = 0;
		obj.multDmgBoost = 1;
		obj.multHealBoost = 1;
		obj.critDamageBonus = 0;
		obj.physPierce = false;
		obj.magPierce = false;
		obj.physBroken = false;
		obj.magBroken = false;
		
		obj.elementalBoost = Array($dataSystem.elements.length).fill(0);
		obj.elementalMult = Array($dataSystem.elements.length).fill(1);
		obj.elementalPierce = Array($dataSystem.elements.length).fill(false);
		obj.elementalEvade = Array($dataSystem.elements.length).fill(0);
		obj.elementalReflect = Array($dataSystem.elements.length).fill(0);
		obj.elementalAbsorb = Array($dataSystem.elements.length).fill(false);
		obj.elementalOverride = Array($dataSystem.elements.length).fill(-1);
		
		//Goes through the notetags to try and find matches to the above strings so it
		//can load the information
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(noteA)) {
				obj.flatDmgBoost += Number(RegExp.$1);
			} else if (line.match(noteB)){
				obj.flatDmgReduct += Number(RegExp.$1);
			} else if (line.match(noteC)){
				obj.flatHealBoost += Number(RegExp.$1);
			} else if (line.match(noteD)){
				obj.multDmgBoost *= Number(RegExp.$1);
			} else if (line.match(noteE)){
				obj.multHealBoost *= Number(RegExp.$1);
			} else if (line.match(noteF)){
				obj.critDamageBonus += Number(RegExp.$1);
			} else if (line.match(noteG)){
				obj.physPierce = true;
			} else if (line.match(noteH)){
				obj.magPierce = true;
			} else if (line.match(noteI)){
				obj.physBroken = true;
			} else if (line.match(noteJ)){
				obj.magBroken = true;
			} else {
				for(loop = 0; loop != $dataSystem.elements.length; loop++){
					if (line.match(notes1[loop]) || line.match(notes2[loop])){
						obj.elementalBoost[loop] += Number(RegExp.$1);
						break;
					} else if (line.match(notes3[loop]) || line.match(notes4[loop])){
						obj.elementalMult[loop] *= Number(RegExp.$1);
						break;
					} else if (line.match(notes5[loop]) || line.match(notes6[loop])){
						obj.elementalPierce[loop] = true;
						break;
					} else if (line.match(notes7[loop]) || line.match(notes8[loop])){
						obj.elementalEvade[loop] += Number(RegExp.$1);
						break;
					} else if (line.match(notes9[loop]) || line.match(notes10[loop])){
						obj.elementalReflect[loop] += Number(RegExp.$1);
						break;
					} else if (line.match(notes11[loop]) || line.match(notes12[loop])){
						obj.elementalAbsorb[loop] = true;
						break;
					} else if (line.match(notes13[loop]) || line.match(notes14[loop])){
						obj.elementalOverride[loop] = Number(RegExp.$1);
						break;
					};
				}
			}
		}
	}
}

//Does the processing for Items and Skills
DataManager.processDamageCoreNotetagsB = function(group) {
	notes1 = [];
	notes2 = [];
	$dataSystem.elements.forEach(function(e, i){
		notes1.push(new RegExp("<Element[ ]?" + i + "+[ ]Pierce>", "i"));
		notes2.push(new RegExp("<" + e + "+[ ]Pierce>", "i"));
	});
	
	noteA = /<Crit(?:ical)?[ ]?Bonus:[ ]?(-?\d+(?:[.]\d+)?)>/i;
	noteB = /<Crit(?:ical)?[ ]?D(?:a)?m(?:a)?g(?:e)?[ ]?(?:Bonus)?:[ ]?(-?\d+(?:[.]\d+)?)>/i;
	noteC = /<Phys(?:ical)?[ ]?Pierce>/i;
	noteD = /<Mag(?:ical)?[ ]?Pierce>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.critBonus = 0;
		obj.critDamageBonus = 0;
		obj.physPierce = false;
		obj.magPierce = false;
		obj.elementalPierce = Array($dataSystem.elements.length).fill(false);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(noteA)) {
				obj.critBonus += Number(RegExp.$1);
			} else if (line.match(noteB)){
				obj.critDamageBonus += Number(RegExp.$1);
			} else if (line.match(noteC)){
				obj.physPierce = true;
			} else if (line.match(noteD)){
				obj.magPierce = true;
			} else {
				for(loop = 0; loop != $dataSystem.elements.length; loop++){
					if (line.match(notes1[loop])){
						obj.elementalPierce[loop] = true;
						break;
					} else if (line.match(notes2[loop])){ 
						obj.elementalPierce[loop] = true;
						break;
					};
				}
			}
		}
	}
}

//============================================================================
//Initalization
//============================================================================
//Gets all the mods for the various aspects of this plugin and attaches it to the Actor
Game_Actor.prototype.getDamageMods = function() {
	var data = $dataActors[this.actorId()];
	//The Data of the Actor
	this.flatDmgBoost = data.flatDmgBoost;
	this.flatDmgReduct = data.flatDmgReduct;
	this.flatHealBoost = data.flatHealBoost;
	this.multDmgBoost = data.multDmgBoost;
	this.multHealBoost = data.multHealBoost;
	this.critDamageBonus = data.critDamageBonus;
	this.physPierce = data.physPierce;
	this.physBroken = data.physBroken;
	this.magPierce = data.magPierce;
	this.magBroken = data.magBroken;
	this.elementalBoost = data.elementalBoost;
	this.elementalMult = data.elementalMult;
	this.elementalPierce = data.elementalPierce;
	this.elementalEvade = data.elementalEvade;
	this.elementalReflect = data.elementalReflect;
	this.elementalAbsorb = data.elementalAbsorb;
	this.elementalOverride = data.elementalOverride;
	//The Class of the Actor
	var classed = $dataClasses[this._classId];
	this.flatDmgBoost += classed.flatDmgBoost;
	this.flatDmgReduct += classed.flatDmgReduct;
	this.flatHealBoost += classed.flatHealBoost;
	this.multDmgBoost *= classed.multDmgBoost;
	this.multHealBoost *= classed.multHealBoost;
	this.critDamageBonus += classed.critDamageBonus;
	if (!this.physPierce) this.physPierce = classed.physPierce;
	if (!this.physBroken) this.physBroken = classed.physBroken;
	if (!this.magPierce) this.magPierce = classed.magPierce;
	if (!this.magBroken) this.magBroken = classed.magBroken;
	for (loop = 0; loop != $dataSystem.elements.length; loop++){
		this.elementalBoost[loop] += classed.elementalBoost[loop];
		this.elementalMult[loop] *= classed.elementalMult[loop];
		if (!this.elementalOverride[loop]) this.elementalPierce[loop] = classed.elementalPierce[loop];
		this.elementalEvade[loop] += classed.elementalEvade[loop];
		this.elementalReflect[loop] += classed.elementalReflect[loop];
		if (!this.elementalOverride[loop]) this.elementalAbsorb[loop] = classed.elementalAbsorb[loop];
		if (this.elementalOverride[loop] == -1) this.elementalOverride[loop] = classed.elementalOverride[loop];
	}
	//The Equipment of the Actor
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		this.flatDmgBoost += equip.flatDmgBoost;
		this.flatDmgReduct += equip.flatDmgReduct;
		this.flatHealBoost += equip.flatHealBoost;
		this.multDmgBoost *= equip.multDmgBoost;
		this.multHealBoost *= equip.multHealBoost;
		this.critDamageBonus += equip.critDamageBonus;
		if (!this.physPierce) this.physPierce = equip.physPierce;
		if (!this.physBroken) this.physBroken = equip.physBroken;
		if (!this.magPierce) this.magPierce = equip.magPierce;
		if (!this.magBroken) this.magBroken = equip.magBroken;
		for (loop = 0; loop != $dataSystem.elements.length; loop++){
			this.elementalBoost[loop] += equip.elementalBoost[loop];
			this.elementalMult[loop] *= equip.elementalMult[loop];
			if (!this.elementalOverride[loop]) this.elementalPierce[loop] = equip.elementalPierce[loop];
			this.elementalEvade[loop] += equip.elementalEvade[loop];
			this.elementalReflect[loop] += equip.elementalReflect[loop];
			if (!this.elementalOverride[loop]) this.elementalAbsorb[loop] = equip.elementalAbsorb[loop];
			if (this.elementalOverride[loop] == -1) this.elementalOverride[loop] = equip.elementalOverride[loop];
		}
	}
	//States of the Actor
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var state = $dataStates[stateList[i].id];
		this.flatDmgBoost += state.flatDmgBoost;
		this.flatDmgReduct += state.flatDmgReduct;
		this.flatHealBoost += state.flatHealBoost;
		this.multDmgBoost *= state.multDmgBoost;
		this.multHealBoost *= state.multHealBoost;
		this.critDamageBonus += state.critDamageBonus;
		if (!this.physPierce) this.physPierce = state.physPierce;
		if (!this.physBroken) this.physBroken = state.physBroken;
		if (!this.magPierce) this.magPierce = state.magPierce;
		if (!this.magBroken) this.magBroken = state.magBroken;
		for (loop = 0; loop != $dataSystem.elements.length; loop++){
			this.elementalBoost[loop] += state.elementalBoost[loop];
			this.elementalMult[loop] *= state.elementalMult[loop];
			if (!this.elementalOverride[loop]) this.elementalPierce[loop] = state.elementalPierce[loop];
			this.elementalEvade[loop] += state.elementalEvade[loop];
			this.elementalReflect[loop] += state.elementalReflect[loop];
			if (!this.elementalOverride[loop]) this.elementalAbsorb[loop] = state.elementalAbsorb[loop];
			if (this.elementalOverride[loop] == -1) this.elementalOverride[loop] = state.elementalOverride[loop];
		}
	}
};

//Gets all the mods for the various aspects of this plugin and attaches it to the Enemy
Game_Enemy.prototype.getDamageMods = function() {
	//The Data of the Enemy
	var data = $dataEnemies[this.enemyId()];
	this.flatDmgBoost = data.flatDmgBoost;
	this.flatDmgReduct = data.flatDmgReduct;
	this.flatHealBoost = data.flatHealBoost;
	this.multDmgBoost = data.multDmgBoost;
	this.multHealBoost = data.multHealBoost;
	this.critDamageBonus = data.critDamageBonus;
	this.physPierce = data.physPierce;
	this.physBroken = data.physBroken;
	this.magPierce = data.magPierce;
	this.magBroken = data.magBroken;
	this.elementalBoost = data.elementalBoost;
	this.elementalMult = data.elementalMult;
	this.elementalPierce = data.elementalPierce;
	this.elementalEvade = data.elementalEvade;
	this.elementalReflect = data.elementalReflect;
	this.elementalAbsorb = data.elementalAbsorb;
	this.elementalOverride = data.elementalOverride;
	//The States of the Enemy
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var state = $dataStates[stateList[i].id];
		this.flatDmgBoost += state.flatDmgBoost;
		this.flatDmgReduct += state.flatDmgReduct;
		this.flatHealBoost += state.flatHealBoost;
		this.multDmgBoost *= state.multDmgBoost;
		this.multHealBoost *= state.multHealBoost;
		this.critDamageBonus += state.critDamageBonus;
		if (!this.physPierce) this.physPierce = state.physPierce;
		if (!this.physBroken) this.physBroken = state.physBroken;
		if (!this.magPierce) this.magPierce = state.magPierce;
		if (!this.magBroken) this.magBroken = state.magBroken;
		for (loop = 0; loop != $dataSystem.elements.length; loop++){
			this.elementalBoost[loop] += state.elementalBoost[loop];
			this.elementalMult[loop] *= state.elementalMult[loop];
			if (!this.elementalOverride[loop]) this.elementalPierce[loop] = state.elementalPierce[loop];
			this.elementalEvade[loop] += state.elementalEvade[loop];
			this.elementalReflect[loop] += state.elementalReflect[loop];
			if (!this.elementalOverride[loop]) this.elementalAbsorb[loop] = state.elementalAbsorb[loop];
			if (this.elementalOverride[loop] == -1) this.elementalOverride[loop] = state.elementalOverride[loop];
		}
	}
};

//Resets the various modifiers so they don't bleed over and mass apply themselves
Game_BattlerBase.prototype.removeDamageMods = function(){
	this.flatDmgBoost = 0;
	this.flatDmgReduct = 0;
	this.flatHealBoost = 0;
	this.multDmgBoost = 1;
	this.multHealBoost = 1;
	this.critDamageBonus = 0;
	this.physPierce = false;
	this.physBroken = false;
	this.magPierce = false;
	this.magBroken = false;
	this.elementalBoost = Array($dataSystem.elements.length).fill(0);
	this.elementalMult = Array($dataSystem.elements.length).fill(1);
	this.elementalPierce = Array($dataSystem.elements.length).fill(false);
	this.elementalEvade = Array($dataSystem.elements.length).fill(0);
	this.elementalReflect = Array($dataSystem.elements.length).fill(0);
	this.elementalAbsorb = Array($dataSystem.elements.length).fill(false);
	this.elementalOverride = Array($dataSystem.elements.length).fill(-1);
}

//Calls all to remove and then re-set the Damage modifiers
frsh_dmgcore_trait_init = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_dmgcore_trait_init.call(this);
	this.removeDamageMods();
	this.getDamageMods();
}

//============================================================================
//Results
//============================================================================
//Sets all the factors for additional Damage popups to be changed later
frsh_dmgcore_additional_results = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    frsh_dmgcore_additional_results.call(this);
	this.resisted = false;
	this.weakness = false;
	this.absorbed = false;
	this.pierced = false;
};

//Piggybacks off of displayingHpDamage to show how the Resistance/Weakness/Piercing/Aborbing
//in the battle log
frsh_dmgcore_results_show = Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (target.result().hpAffected) {
		this.displayResisted(target);
		this.displayWeakness(target);
		this.displayAbsorbed(target);
		this.displayPierced(target);
        frsh_dmgcore_results_show.call(this, target);
    }
};

//Shows if the enemy Resisted the Damage of the attack
Window_BattleLog.prototype.displayResisted = function(target) {
    if (target.result().resisted) {
		//Plays the associated Sound Effect to the effect
		AudioManager.playSe({
			name: Frashaw.Param.DMGResistSE[0],
			volume: Frashaw.Param.DMGResistSE[1],
			pitch: Frashaw.Param.DMGResistSE[2],
			pan: 0
		});
		text = Frashaw.Param.DMGResistText;
		//Fail safe to make sure the text doesn't appear unless wanted
		if (text == "") return;
		//Replaces the certain values with names for more dynamic messages
		text = text.replace("1%", BattleManager._action.subject().name());
		text = text.replace("2%", target.name());
        this.push('addText', text);
    }
};

//Shows if the enemy was Weak to the Damage of the attack
Window_BattleLog.prototype.displayWeakness = function(target) {
    if (target.result().weakness) {
		AudioManager.playSe({
			name: Frashaw.Param.DMGWeaknessSE[0],
			volume: Frashaw.Param.DMGWeaknessSE[1],
			pitch: Frashaw.Param.DMGWeaknessSE[2],
			pan: 0
		});
		text = Frashaw.Param.DMGWeaknessText;
		if (text == "") return;
		text = text.replace("1%", BattleManager._action.subject().name());
		text = text.replace("2%", target.name());
        this.push('addText', text);
    }
};

//Shows if the enemy Absorbed the Damage of the attack
Window_BattleLog.prototype.displayAbsorbed = function(target) {
    if (target.result().absorbed) {
		AudioManager.playSe({
			name: Frashaw.Param.DMGAbsorbSE[0],
			volume: Frashaw.Param.DMGAbsorbSE[1],
			pitch: Frashaw.Param.DMGAbsorbSE[2],
			pan: 0
		});
		text = Frashaw.Param.DMGAbsorbText;
		if (text == "") return;
		text = text.replace("1%", BattleManager._action.subject().name());
		text = text.replace("2%", target.name());
        this.push('addText', text);
    }
};

//Shows if the enemy was Pierced by the Damage of the attack
Window_BattleLog.prototype.displayPierced = function(target) {
    if (target.result().pierced) {
		AudioManager.playSe({
			name: Frashaw.Param.DMGPierceSE[0],
			volume: Frashaw.Param.DMGPierceSE[1],
			pitch: Frashaw.Param.DMGPierceSE[2],
			pan: 0
		});
		text = Frashaw.Param.DMGPierceText;
		if (text == "") return;
		text = text.replace("1%", BattleManager._action.subject().name());
		text = text.replace("2%", target.name());
        this.push('addText', text);
    }
};

//============================================================================
//Meat and Potatoes
//============================================================================
//A way to ignore the pdr when you have a pierce attack element
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
	var user = this.subject();
    var baseValue = this.evalDamageFormula(target);
	//Gets the most efficent element so that things that require it use the same element
	var elementId = this.getElement(target);
	//Adds the elemental damage modifier
    var value = baseValue * this.calcElementDamage(target, elementId);
	if (baseValue > 0) {
		//If the damage is above 0, add this flat damage
		if (value > 0) value = this.addFlatDamage(target, user, elementId, value);
		//If the damage is above 0, multiply this damage
		if (value > 0) value = this.addMultDamage(target, user, elementId, value);
		//Checks to see if the elemental resistance of the target is between 1 and 0 and
		//if the user has the respective pierce, so it can apply the Resisted result
		if (target.elementRate(elementId) < 1 && !user.elementalPierce[elementId] && target.elementRate(elementId) > 0) target.result().resisted = true; 
		//Checks to see if the elemental resistance of the target is below 1 and
		//if the user has the respective pierce, so it can apply the Pierced result
		if (target.elementRate(elementId) < 1 && user.elementalPierce[elementId]) target.result().pierced = true;
		//Checks to see if the elemental resistance of the target is above 1 to apply
		//the Weakness effect
		if (target.elementRate(elementId) > 1) target.result().weakness = true;
		//Checks is the attack is physical and if the attack will use PDR
		if (this.isPhysical() && this.getPhysPierce(target, user)) {
			value *= target.pdr;
			//Checks the used PDR to see if the Weakness or Resisted result is
			//respectively applied. Only triggers if the maker wants it to
			if (target.pdr > 1 && Frashaw.Param.DMGDRToggle) target.result().weakness = true;
			if (target.pdr < 1 && Frashaw.Param.DMGDRToggle) target.result().resisted = true;
		//If the PDR is not used, see if it is below 0 and if it was from Pierce, so it
		//can show the Pierced result
		} else if (target.pdr < 1 && !this.getPhysPierce(target, user) && Frashaw.Param.DMGDRToggle){
			target.result().pierced = true;
		}
		//Like Above but MDR instead of PDR
		if (this.isMagical()&& this.getMagPierce(target, user)) {
			value *= target.mdr;
			if (target.mdr > 1 && Frashaw.Param.DMGDRToggle) target.result().weakness = true;
			if (target.mdr < 1 && Frashaw.Param.DMGDRToggle) target.result().resisted = true;
		} else if (target.mdr < 1 && !this.getMagPierce(target, user) && Frashaw.Param.DMGDRToggle){
			target.result().pierced = true;
		}
		//Checks to see if the Target aborbs the element and if the elementalOverride or
		//Pierce stops it from working
		if (target.elementalAbsorb[elementId] && target.elementalOverride[elementId] == -1 && !user.elementalPierce[elementId]){ 
			value *= -1;
			//Switches Results so that only the Absorbed message shows
			target.result().resisted = false;
			target.result().weakness = false;
			target.result().absorbed = true;
		//If the absorbed is stopped by Pierce, show that through the Pierced result
		} else if (target.elementalAbsorb[elementId] && target.elementalOverride[elementId] == -1 && user.elementalPierce[elementId]){
			target.result().pierced = true;
		}
	} else if (baseValue < 0) {
		//Additional Healing
		value += user.flatHealBoost;
		value *= target.rec;
		value *= user.multHealBoost;
	}
    if (critical || target.result().critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};

//Used to get the Element that the rest of the attack will use
Game_Action.prototype.getElement = function(target) {
	//Normal Attack determination
    if (this.item().damage.elementId < 0) {
		value = undefined;
		user = this.subject();
		//Goes through each of the elements that the attack could have and
		//uses the one with the most Damage
		for(i = 0; i != user.attackElements(); i++){
			if (value == null || target.elementRate(i) > value){
				value = user.attackElements()[i];
			}
		}
        return value;
    } else {
        return this.item().damage.elementId;
    }
};

//If the target has an elemental override, replaces the elementrate with the one from
//the override
frsh_dmgcore_elementrate_override = Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
    value = frsh_dmgcore_elementrate_override.call(this, elementId);
	if (this.elementalOverride[elementId] != -1) value = this.elementalOverride[elementId];
	return value;
};

//Runs through the various parts to see if the action will take PDR into consideration or not
Game_Action.prototype.getPhysPierce = function(target, user){
	var item = this.item();
	var bool = true;
	if (this.item().physPierce) bool = false;
	if (user.physPierce) bool = false;
	if (target.physBroken) bool = false;
	if (target.pdr > 1) bool = true;
	return bool;
}

//Runs through the various parts to see if the action will take MDR into consideration or not
Game_Action.prototype.getMagPierce = function(target, user){
	var item = this.item();
	var bool = true;
	if (this.item().magPierce) bool = false;
	if (user.magPierce) bool = false;
	if (target.magBroken) bool = false;
	if (target.mdr > 1) bool = true;
	return bool;
}

//Basically a remake of calculating elemental damage so it works with a pre-established
//element and can be pierced when needed
Game_Action.prototype.calcElementDamage = function(target, elementId) {
    var rate = target.elementRate(elementId);
	if (rate < 1 && (this.subject().elementalPierce[elementId] || this.item().elementalPierce[elementId])) rate = 1;
	return rate;
};

//Adds the flat damages of the elements and general. Also applies the flat damage Reduct
//when the attack doesn't pierce
Game_Action.prototype.addFlatDamage = function(target, user, elementId, value){
	value += user.flatDmgBoost;
	value += user.elementalBoost[elementId];
	if (target.flatDmgReduct > 0 || !user.elementalPierce[elementId]) value += target.flatDmgReduct;
	if (value < 0) value = 0;
	return value;
}

//Multiplies the Damage by these modifiers
Game_Action.prototype.addMultDamage = function(target, user, elementId, value){
	value *= user.multDmgBoost;
	value *= user.elementalMult[elementId];
	if (value < 0) value = 0;
	return value;
}

//Adds the respective amount of evasion to the evasion check when using
//a specific element
frsh_dmgcore_element_evade = Game_Action.prototype.itemEva;
Game_Action.prototype.itemEva = function(target) {
    var value = frsh_dmgcore_element_evade.call(this, target);
	value += target.elementalEvade[this.getElement(target)];
	return value;
};

//Adds the respective amount of reflection to the reflection check when using
//a specific element
frsh_dmgcore_element_reflect = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
    var value = frsh_dmgcore_element_reflect.call(this, target);
	if (!target.elementalOverride[this.getElement(target)]) value += target.elementalReflect[this.getElement(target)];
	return value;
};

//Adds the Item's Crit Bonus into consideration for the Critical Rate
Game_Action.prototype.itemCri = function(target) {
	return this.item().damage.critical ? (this.subject().cri + this.item().critBonus) * (1 - target.cev) : 0;
};

//A function to get the dynamic Critical Damage
Game_Action.prototype.applyCritical = function(damage) {
	return damage * this.getCritDamage(this.subject());
};

//Gets the Critical Damage that the attack will be amped by when hitting
//a Critical Hit
Game_Action.prototype.getCritDamage = function(user){ 
	var mod = 3 + this.item().critDamageBonus + user.critDamageBonus;
	if (mod < 1) mod = 1;
	return mod;
}
})();
//=============================================================================
// End of File
//=============================================================================
