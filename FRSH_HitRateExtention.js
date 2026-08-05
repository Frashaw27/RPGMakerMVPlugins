//=============================================================================
// FRSH_HitRateExtention
// FRSH_HitRateExtention.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.HitRateExten = true;

var Frashaw = Frashaw || {};
Frashaw.HitRateExten = Frashaw.HitRateExten || {};

//=============================================================================
/*:
* @author Frashaw27
* @plugindesc Gives various overrides for Hit Rate, Evasion, and Critical.
*
* @param hitRateExtenToggle
* @text Always Hits > Evade?
* @type bool
* @type boolean
* @desc Click True/False if you want a user that always hits to override an always evading target.
* @default true
*
* @help 
* ==Notetags====================================================================
* Non-case sensitive, Spaces optional
*
* Item, Skills, Actors, Classes, Weapons, Armors, Enemies, States:
* <Always Hit><alwayshit>: Attacks will always land on the target, unless 
* otherwise stopped by Never Hit.
* <Never Hit><neverhit>: Attacks will never land.
* <Always Critical><alwayscrit>: When possible, Attacks will always land a
* Critical Hit unless they have Never Critical.
* <Never Critical><nevercrit>: Attacks will never land a Critical Hit.
*
* Actors, Classes, Weapons, Armors, Enemies, States:
* <Always Evade><neverevade>: Attacks will always be evaded unless they have
* Never Evade or the attacker Always Hits. Attacker portion can be changed with 
* a plugin setting.
* <Never Evade><neverevade>: Attacks are never evaded.
* <Always Be Critical><alwaysbecrit>: Unless the user has Never Be Critical,
* all attacks landed will be Critical ones.
* <Always Be Critical><alwaysbecrit>: Attacks can never land Critical Hits
* on them.
*
* Item, Skills:
* thing.exceptionHit: Gets a true/false if they will ignore overrides to Hit
* Rate.
* thing.exceptionEvade: Gets a true/false if they will ignore overrides to
* Rvade Rate. 
* thing.exceptionCrit: Gets a true/false if they will ignore overrides to
* Critical Rate. 
* ===Traits=====================================================================
* Item, Skills, Actors, Classes, Weapons, Armors, Enemies, States:
* thing.alwaysHit: Gets a true/false if they will always hit a target.
* thing.neverHit: Gets a true/false if they will never hit a target.
* thing.alwaysCrit: Gets a true/false if they will always land a Critical Hit.
* thing.neverCrit: Gets a true/false if they will never land a Critical Hit.
*
* Actors, Classes, Weapons, Armors, Enemies, States:
* thing.alwaysEvade: Gets a true/false if they will always evade an Attack.
* thing.neverEvade: Gets a true/false if they will never evade an Attack.
* thing.alwaysBeCrit: Gets a true/false if they will always suffer a Critical 
* Hit.
* thing.neverBeCrit: Gets a true/false if they will never suffer a Critical 
* Hit.
*
* Item, Skills:
* <Exception Hit><excepthit>: Ignores overrides to Hit Rate rules.
* <Exception Evade><exceptevade>: Ignores overrides to Evade Rate rules.
* <Exception Critical><exceptcrit>: Ignores overrides to Critical Hit rules. 
* ===Introduction===============================================================
* Whatever that be Gameplay or Cutscene purposes, misses can go a lot with
* messing with an intended experience. This plugin intends on aiding with that
* by giving overrides to the functions to allow for 100% consistent misses
* or the like.
* ===How to Use=================================================================
* For the most part, add the respective notetags and then go about your day.
* Note that something that stops hits/evades/crits will also stop ones that
* always hits/evades/crits.
* 
* !!!~~~Warning~~~!!!
* Put this beneath anything that messes with Critical, Evasion, or Accuracy
* Rates like FRSH_DamageCore.
* ===Change Log=================================================================
* Version 1.0.0 (08/05/2026):
* -Finished Base Plugin
* ==============================================================================
*/

(function() {
//============================================================================
//Setup
//============================================================================
FrshHitRateExtenLoaded = false;

//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_HitRateExtention');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.HREToggle = Parameters.hitRateExtenToggle == "true";

//Starts the function to intialize all the damage notetags
FrshHitRateExten_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshHitRateExten_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshHitRateExtenLoaded == false) {
		//Processes the notetags of Actors, Classes, Weapons, Armors, Enemies, and States
		this.processHitRateExtentionNotetagsA($dataActors);
		this.processHitRateExtentionNotetagsA($dataClasses);
		this.processHitRateExtentionNotetagsA($dataWeapons);
		this.processHitRateExtentionNotetagsA($dataArmors);
		this.processHitRateExtentionNotetagsA($dataEnemies);
		this.processHitRateExtentionNotetagsA($dataStates);
		//Processes the notetags of Items and Skills
		this.processHitRateExtentionNotetagsB($dataItems);
		this.processHitRateExtentionNotetagsB($dataSkills);
		//Make sure it doesn't run twice
		FrshHitRateExtenLoaded = true;
	}
	return true;
};

//Does the processing for Actors, Weapons, Armors, Enemies, and States
DataManager.processHitRateExtentionNotetagsA = function(group) {
	noteA1 = /<Always[ ]?Hit>/i;
	noteA2 = /<N(?:o|ever)[ ]?Hit>/i;
	noteB1 = /<Always[ ]?Evade>/i;
	noteB2 = /<N(?:o|ever)[ ]?Evade>/i;
	noteC1 = /<Always[ ]?Crit(?:ical)?>/i;
	noteC2 = /<N(?:o|ever)[ ]?Crit(?:ical)?>/i;
	noteD1 = /<Always[ ]?Be[ ]?Crit(?:ical)?>/i;
	noteD2 = /<N(?:o|ever)[ ]?Be[ ]?Crit(?:ical)?>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		this.alwaysHit = false;
		this.neverHit = false;
		this.alwaysEvade = false;
		this.neverEvade = false;
		this.alwaysCrit = false;
		this.neverCrit = false;
		this.alwaysBeCrit = false;
		this.neverBeCrit = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(noteA1)) {
				obj.alwaysHit = true;
			} else if (line.match(noteA2)){
				obj.neverHit = true;
			} else if (line.match(noteB1)) {
				obj.alwaysEvade = true;
			} else if (line.match(noteB2)){
				obj.neverEvade = true;
			} else if (line.match(noteC1)) {
				obj.alwaysCrit = true;
			} else if (line.match(noteC2)){
				obj.neverCrit = true;
			} else if (line.match(noteD1)) {
				obj.alwaysBeCrit = true;
			} else if (line.match(noteD2)){
				obj.neverBeCrit = true;
			}
		}
	}
}

//Does the processing for Items and Skills
DataManager.processHitRateExtentionNotetagsB = function(group) {
	noteA1 = /<Always[ ]?Hit>/i;
	noteA2 = /<N(?:o|ever)[ ]?Hit>/i;
	noteB1 = /<Always[ ]?Evade>/i;
	noteB2 = /<N(?:o|ever)[ ]?Evade>/i;
	noteC1 = /<Always[ ]?Crit(?:ical)?>/i;
	noteC2 = /<N(?:o|ever)[ ]?Crit(?:ical)?>/i;
	noteD1 = /<Except(?:ion)?[ ]?Hit>/i;
	noteD2 = /<Except(?:ion)?[ ]?Evade>/i;
	noteD3 = /<Except(?:ion)?[ ]?Crit(?:ical)?>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		this.alwaysHit = false;
		this.neverHit = false;
		this.alwaysEvade = false;
		this.neverCrit = false;
		this.exceptionHit = false;
		this.exceptionEvade = false;
		this.exceptionCrit = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(noteA1)) {
				obj.alwaysHit = true;
			} else if (line.match(noteA2)){
				obj.neverHit = true;
			} else if (line.match(noteB1)) {
				obj.alwaysEvade = true;
			} else if (line.match(noteB2)){
				obj.neverEvade = true;
			} else if (line.match(noteC1)) {
				obj.alwaysCrit = true;
			} else if (line.match(noteC2)){
				obj.neverCrit = true;
			} else if (line.match(noteD1)) {
				obj.exceptionHit = true;
			} else if (line.match(noteD2)){
				obj.exceptionEvade = true;
			} else if (line.match(noteD3)){
				obj.exceptionCrit = true;
			}
		}
	}
}

//============================================================================
//Initalization
//============================================================================
//Gets all the mods for the various aspects of this plugin and attaches it to the Actor
Game_Actor.prototype.getHitRateOverrides = function() {
	var data = $dataActors[this.actorId()];
	//The Data of the Actor
	this.alwaysHit = data.alwaysHit;
	this.neverHit = data.neverHit;
	this.alwaysEvade = data.alwaysEvade;
	this.neverEvade = data.neverEvade;
	this.alwaysCrit = data.alwaysCrit;
	this.neverCrit = data.neverCrit;
	this.alwaysBeCrit = data.alwaysBeCrit;
	this.neverBeCrit = data.neverBeCrit;
	//The Class of the Actor
	var classed = $dataClasses[this._classId];
	if (!this.alwaysHit) this.alwaysHit = classed.alwaysHit;
	if (!this.neverHit) this.neverHit = classed.neverHit;
	if (!this.alwaysEvade) this.alwaysEvade = classed.alwaysEvade;
	if (!this.neverEvade) this.neverEvade = classed.neverEvade;
	if (!this.alwaysCrit) this.alwaysCrit = classed.alwaysCrit;
	if (!this.neverCrit) this.neverCrit = classed.neverCrit;
	if (!this.alwaysBeCrit) this.alwaysBeCrit = classed.alwaysBeCrit;
	if (!this.neverBeCrit) this.neverBeCrit = classed.neverBeCrit;
	//The Equipment of the Actor
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		if (!this.alwaysHit) this.alwaysHit = equip.alwaysHit;
		if (!this.neverHit) this.neverHit = equip.neverHit;
		if (!this.alwaysEvade) this.alwaysEvade = equip.alwaysEvade;
		if (!this.neverEvade) this.neverEvade = equip.neverEvade;
		if (!this.alwaysCrit) this.alwaysCrit = equip.alwaysCrit;
		if (!this.neverCrit) this.neverCrit = equip.neverCrit;
		if (!this.alwaysBeCrit) this.alwaysBeCrit = equip.alwaysBeCrit;
		if (!this.neverBeCrit) this.neverBeCrit = equip.neverBeCrit;
	}
	//States of the Actor
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var state = $dataStates[stateList[i].id];
		if (!this.alwaysHit) this.alwaysHit = state.alwaysHit;
		if (!this.neverHit) this.neverHit = state.neverHit;
		if (!this.alwaysEvade) this.alwaysEvade = state.alwaysEvade;
		if (!this.neverEvade) this.neverEvade = state.neverEvade;
		if (!this.alwaysCrit) this.alwaysCrit = state.alwaysCrit;
		if (!this.neverCrit) this.neverCrit = state.neverCrit;
		if (!this.alwaysBeCrit) this.alwaysBeCrit = state.alwaysBeCrit;
		if (!this.neverBeCrit) this.neverBeCrit = state.neverBeCrit;
	}
};

//Gets all the mods for the various aspects of this plugin and attaches it to the Enemy
Game_Enemy.prototype.getHitRateOverrides = function() {
	//The Data of the Enemy
	var data = $dataEnemies[this.enemyId()];
	this.alwaysHit = data.alwaysHit;
	this.neverHit = data.neverHit;
	this.alwaysEvade = data.alwaysEvade;
	this.neverEvade = data.neverEvade;
	this.alwaysCrit = data.alwaysCrit;
	this.neverCrit = data.neverCrit;
	this.alwaysBeCrit = data.alwaysBeCrit;
	this.neverBeCrit = data.neverBeCrit;
	//The States of the Enemy
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var state = $dataStates[stateList[i].id];
		if (!this.alwaysHit) this.alwaysHit = state.alwaysHit;
		if (!this.neverHit) this.neverHit = state.neverHit;
		if (!this.alwaysEvade) this.alwaysEvade = state.alwaysEvade;
		if (!this.neverEvade) this.neverEvade = state.neverEvade;
		if (!this.alwaysCrit) this.alwaysCrit = state.alwaysCrit;
		if (!this.neverCrit) this.neverCrit = state.neverCrit;
		if (!this.alwaysBeCrit) this.alwaysBeCrit = state.alwaysBeCrit;
		if (!this.neverBeCrit) this.neverBeCrit = state.neverBeCrit;
	}
};

//Resets the various modifiers so they don't accidently carry over true values
Game_BattlerBase.prototype.removeHitRateOverrides = function(){
	this.alwaysHit = false;
	this.neverHit = false;
	this.alwaysEvade = false;
	this.neverEvade = false;
	this.alwaysCrit = false;
	this.neverCrit = false;
	this.alwaysBeCrit = false;
	this.neverBeCrit = false;
}

//Calls all to remove and then re-set the Hit Rate, Evade, and Critical overrides
frsh_hitrate_exten_trait = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_hitrate_exten_trait.call(this);
	this.removeHitRateOverrides();
	this.getHitRateOverrides();
}

//The extention that makes it so that Hit Rates are properly overriden if need be
frsh_hitrate_exten_hit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
	//If the skill is an exception to the rules, they don't run the overrides
	if (!this.item().exceptionHit){
		if (this.subject().neverHit || this.item().neverHit) return 0;
		if (this.subject().alwaysHit || this.item().alwaysHit) return 1;
	}
    return frsh_hitrate_exten_hit.call(this, target);
};

//The extention that makes it so that Evade Rates are properly overriden if need be
frsh_hitrate_exten_eva = Game_Action.prototype.itemEva;
Game_Action.prototype.itemEva = function(target) {
	if (!this.item().exceptionEvade){
		//If the toggle is on, it will override the evasion overrides to always land
		if ((this.subject().alwaysHit || this.item().alwaysHit) && Frashaw.Param.HREToggle) return 0;
		if (target.neverEvade) return 0;
		if (target.alwaysEvade) return 1;
    }
	return frsh_hitrate_exten_eva.call(this, target);
};

//The extention that makes it so that Hit Rates are properly overriden if need be
frsh_hitrate_exten_cri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
    if (!this.item().exceptionCrit){
		if (this.subject().neverCrit) return 0;
		if (target.neverBeCrit) return 0;
		if (this.subject().alwaysCrit || this.item().alwaysCrit) return 1;
		if (target.alwaysBeCrit) return 1;
    }
	return frsh_hitrate_exten_cri.call(this, target);
};
})();
//=============================================================================
// End of File
//=============================================================================