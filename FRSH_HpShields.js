//=============================================================================
// FRSH_HpShields
// FRSH_HpShields.js
// Version: 1.0.4
//=============================================================================

var Imported = Imported || {};
Imported.hpShields = true;

var Frashaw = Frashaw || {};
Frashaw.hpShields = Frashaw.hpShields || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Gives shields that block one instance of damage.
*
* @param baseShieldCap
* @text Base Shield Cap
* @type number
* @desc Put in how many shields you want an individual to have before capping off.
* @default 9
* @min 0
*
* @param shieldTankMsg
* @text Shield Hit Message
* @type text
* @desc Put the message you want to show when an attack was blocked by a shield. Use 1% to represent the target.
* @default 1%'s shields tanked the blow!
*
* @param shieldDegenActivate
* @text Shields Stop DoTs?
* @type boolean
* @desc Select if you want to have shields also stop degens from the Hp Regeneration Ex-Parameter.
* @default true
*
* @param 
* @default
*
* @param shieldGainMsg
* @text Shield Gain Message
* @type text
* @desc Put the message you want to show when gaining shields. Use 1% to represent the target and 2% the amount recieved.
* @default 1% gained 2% shields!
*
* @param shieldGainMsgSingle
* @parent shieldGainMsg
* @text 1 Shield Gain Message
* @type text
* @desc Put the message you want to show when gaining 1 shield. Leave blank to not use.
* @default 1% gained a shield!
*
* @param shieldGainSE
* @text Shield Generate Sound
* @type file
* @dir audio/se/
* @desc Select the sound you want to use when a shield is added to an entity. Have none to not use.
*
* @param shieldGainSEVolume
* @parent shieldGainSE
* @text Shield Generate Volume
* @type number
* @min 0
* @max 100
* @default 90
* @desc Input the volume you want for the Shield Generate Sound.
*
* @param shieldGainSEPitch
* @parent shieldGainSE
* @text Shield Generate Pitch
* @type number
* @min 50
* @max 150
* @default 100
* @desc Input the pitch you want for the Shield Generate Sound.
*
* @param shieldGainSEPan
* @parent shieldGainSE
* @text Shield Generate Pan
* @type number
* @min -100
* @max 100
* @default 0
* @desc Input the pan you want for the Shield Generate Sound.
*
* @param 
* @default
*
* @param shieldLoseMsg
* @text Shield Lost Message
* @type text
* @desc Put the message you want to show when losing shields. Use 1% to represent the target and 2% the amount removed.
* @default 1% lost 2% shields!
*
* @param shieldLoseMsgSingle
* @parent shieldLoseMsg
* @text 1 Shield Lost Message
* @type text
* @desc Put the message you want to show when losing 1 shield. Leave blank to not use.
* @default 1% lost a shield!
*
* @param shieldBreakAnimActor
* @text Actor Break Animation
* @type animation
* @desc Select the animation that will play when an actor loses a shield. Leave blank to not use.
* @default 0
*
* @param shieldBreakAnimEnemy
* @text Enemy Break Animation
* @type animation
* @desc Select the animation that will play when an enemy loses a shield. Leave blank to not use.
* @default 0
*
* @param shieldBreakSE
* @text Shield Break Sound
* @type file
* @dir audio/se/
* @desc Select the sound you want to use when a shield is removed from an entity. Have none to not use.
*
* @param shieldBreakSEVolume
* @parent shieldBreakSE
* @text Shield Break Volume
* @type number
* @min 0
* @max 100
* @default 90
* @desc Input the volume you want for the Shield Break Sound.
*
* @param shieldBreakSEPitch
* @parent shieldBreakSE
* @text Shield Break Pitch
* @type number
* @min 50
* @max 150
* @default 100
* @desc Input the pitch you want for the Shield Break Sound.
*
* @param shieldBreakSEPan
* @parent shieldBreakSE
* @text Shield Break Pan
* @type number
* @min -100
* @max 100
* @default 0
* @desc Input the pan you want for the Shield Break Sound.
*
* @param 
* @default
*
* @param shieldBarColor1
* @text Shield Bar Color 1
* @type text
* @desc Put the hexadecimal code for a color you want for the first color of the Hp bar while Shielded. Put none to not use.
*
* @param shieldBarColor2
* @text Shield Bar Color 2
* @type text
* @desc Put the hexadecimal code for a color you want for the second color of the Hp bar while Shielded. Put none to not use.
*
* @param shieldImgName
* @text Shield Image Name
* @type text
* @desc Put the name of the Shield image in the system images folder here. It is case sensitive.
* @default Shield
*
* @param shieldImageXAdjust
* @parent shieldImgName
* @text Shield Image X Adjust
* @type number
* @default 0
* @min -9999999
* @desc Adjust this to properly align the x-axis of the shield image.
*
* @param shieldImageYAdjust
* @parent shieldImgName
* @text Shield Image Y Adjust
* @type number
* @default 0
* @min -9999999
* @desc Adjust this to properly align the y-axis of the shield image.
*
* @param shieldNumberXAdjust
* @parent shieldImgName
* @text Shield Number X Adjust
* @type number
* @default 0
* @min -9999999
* @desc Adjust this to properly align the x-axis of the shield count text.
*
* @param shieldNumberXAdjust2
* @parent shieldImgName
* @text Shield Number X Adjust 2
* @type number
* @default 0
* @min -9999999
* @desc Adjust this to properly align the x-axis of the shield count text when adding more places. Ex: 9 -> 10
*
* @param shieldNumberYAdjust
* @parent shieldImgName
* @text Shield Number Y Adjust
* @type number
* @default 0
* @min -9999999
* @desc Adjust this to properly align the y-axis of the shield count text.
*
* @param 
* @default
*
* @param antiMessageSwitchShield
* @text Shield Result Text Switch
* @type number
* @min 0
* @desc Put the number of the switch you want to control showing the Shield gain/lose text. Requires FRSH_AntiMessage.
* @default 0
*
* @help
* ==Script Calls================================================================
* Actors/Enemies:
* recipient.isShielded() - Returns if the recipient is shielded or not.
* recipient.gainShields(x) - the dedicated individual will gain the amount of
* shields you specify.
* recipient.removeShields(x) - the dedicated individual will lose the amount of
* shields you specify.
* recipient.removeAllShields() - the dedicated individual will lose all of their
* shields.
* ==Notetags====================================================================
* Spaces and Capitalization doesn't matter
* Can use either Shields or Shield
* Skills/Items:
* <Shields: x> - Replace x with the number of shields you want to add to the
* target. Can't be lower then 0.
* <Shield Break: x> - Replace x with the number of shields you want to break 
* off the target. Can't be lower then 0. Can also be done <Break Shields: x>
* <Break All Shields> - Removes all shields off the target instead of a specifc
* amount.
* <Ignore All Shields> - Action ignores the existance of Shields entirely and
* pierces through. All can be removed and still work <Ignore Shields>
* <Anti Shields> - Stops the Shield Gain/Lose text from appearing. Requires
* FRSH_AntiMessage to work. Can be connected with a space; the Anti can be
* replaced with a "No". <No-Shields>
*
* Actors/Classes/Weapons/Armors/Enemies:
* <Shield Boost: x> - Things that add Shields will gain even more when using 
* them.
* <Shield Break Boost: x> - Things that break Shields will break even more when 
* using them.
* <Shield Cap Modifier: x> - The shield cap of the individual will be altered
* by this both positively and negatively. Cannot go below 0.
* <Break All Shields> - Whenever breaking a shield, remove all of them instead 
* of a specifc amount.
* ===Introduction===============================================================
* While I was playing a game called Clair Obscur: Expedition 33, I took a liking
* to the shield mechanic they had. I thought it add some more depth to combat
* and decided to make a plugin to replicate it.
* ===How to Use=================================================================
* !-Make sure to put this beneath Frash Overheal and any other damage altering~!
*                                 !~Plugins~!
* You add in the notetags, make a shield image,
* properly align the shield image that appears and you should be gucchi. This 
* plugin is a lot more involved so I'd suggest taking a decent amount of time 
* deciding what value this would take to retrofit this into your game and 
* whatnot. At the end of the day, if your gonna do something with this might as 
* well go the full mile.
* ===Change Log=================================================================
* Version 1.0.4 (08/22/2025) :
* -Fixed an incorrect call for the end of battle
* -Using shields with shield boost finally increases the amount of shields the
* recipient gets 
*
* Version 1.0.3 (08/20/2025) :
* -Added the ability to turn the numerical modifiers negative, expect for the
* actual call for gaining shields
* -Added functionality to where the item break bonuses would properly apply
*
* Version 1.0.2 (08/17/2025) :
* -Fixed and updated the names for the Shield Sound Effects, allowing them to
* be properly called
*
* Version 1.0.1 (08/17/2025) :
* -Fixed a bug where the Y-Adjust for the shield image was instead using the X
* -Added a min cap to the adjust so they can roll down to the negatives
* -Added a section about the shield image in how to use
*
* Version 1.0 (08/17/2025) :
* -Finished Base Plugin
* ==============================================================================
*/
(function() {
//==============================================================================
//Initalization
//==============================================================================
FrshHpShieldsLoaded = false;

//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_HpShields');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.BaseShieldCap = Number(Parameters.baseShieldCap);
Frashaw.Param.ShieldTankMsg = Parameters.shieldTankMsg;
Frashaw.Param.ShieldDegenActivate = Parameters.shieldDegenActivate == true;
Frashaw.Param.ShieldGainMsg = Parameters.shieldGainMsg;
Frashaw.Param.SingleShieldGainMsg = Parameters.shieldGainMsgSingle;
Frashaw.Param.ShieldGainSE = Parameters.shieldGainSE;
Frashaw.Param.ShieldGainSEVolume = Number(Parameters.shieldGainSEVolume);
Frashaw.Param.ShieldGainSEPitch = Number(Parameters.shieldGainSEPitch);
Frashaw.Param.ShieldGainSEPan = Number(Parameters.shieldGainSEPan);
Frashaw.Param.ActorShieldBreakAnimation = Number(Parameters.shieldBreakAnimActor);
Frashaw.Param.EnemyShieldBreakAnimation = Number(Parameters.shieldBreakAnimEnemy);
Frashaw.Param.ShieldLoseMsg = Parameters.shieldLoseMsgSingle;
Frashaw.Param.SingleShieldLoseMsg = Parameters.shieldLoseMsgSingle;
Frashaw.Param.ActorShieldLoseAnimation = Number(Parameters.shieldLoseAnimActor);
Frashaw.Param.EnemyShieldLoseAnimation = Number(Parameters.shieldLoseAnimEnemy);
Frashaw.Param.ShieldBreakSE = Parameters.shieldBreakSE;
Frashaw.Param.ShieldBreakSEVolume = Number(Parameters.shieldBreakSEVolume);
Frashaw.Param.ShieldBreakSEPitch = Number(Parameters.shieldBreakSEPitch);
Frashaw.Param.ShieldBreakSEPan = Number(Parameters.shieldBreakSEPan);
Frashaw.Param.ShieldBarColor1 = Parameters.shieldBarColor1;
Frashaw.Param.ShieldBarColor2 = Parameters.shieldBarColor2;
Frashaw.Param.ShieldImageName = Parameters.shieldImgName;
Frashaw.Param.ShieldImageX = Number(Parameters.shieldImageXAdjust);
Frashaw.Param.ShieldImageY = Number(Parameters.shieldImageYAdjust);
Frashaw.Param.ShieldTextX = Number(Parameters.shieldNumberXAdjust);
Frashaw.Param.ShieldTextX2 = Number(Parameters.shieldNumberXAdjust2);
Frashaw.Param.ShieldTextY = Number(Parameters.shieldNumberYAdjust);
Frashaw.Param.AntiShieldSwitch = Number(Parameters.antiMessageSwitchShield);

//Starts the function to intialize all the shield notetags
FrshHpShields_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshHpShields_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshHpShieldsLoaded == false) {
		//Processes the notetags of actors
		this.processShieldNotetagsA($dataItems);
		this.processShieldNotetagsA($dataSkills);
		this.processShieldNotetagsB($dataActors);
		this.processShieldNotetagsB($dataClasses);
		this.processShieldNotetagsB($dataEnemies);
		this.processShieldNotetagsB($dataWeapons);
		this.processShieldNotetagsB($dataArmors);
		this.processShieldNotetagsB($dataStates);
		//Make sure it doesn't run twice
		FrshHpShieldsLoaded = true;
	}
	return true;
};

//Does the processing for skills and items
DataManager.processShieldNotetagsA = function(group) {
	//Loads up various strings to check for
	var note1 = /<Shields?:[ ]?(\d+)>/i;
	var note2 = /<Shields?[ ]?Break:[ ]?(-?\d+)>/i;
	var note2a = /<Break[ ]?Shields?:[ ]?(-?\d+)>/i;
	var note3 = /<Break[ ]?All[ ]?Shields?>/i;
	var note4 = /<Ignore[ ]?(?:All)?[ ]?Shields?>/i;
	var note5 = /<(?:Anti|No)[ -]?Shields?>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.shields = 0;
		obj.shieldBreak = 0;
		obj.shieldBreakAll = false;
		obj.ignoreShields = false;
		obj.antiShieldText = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				num = Number(RegExp.$1);
				if (num < 0) num = 0;
				obj.shields = num;
			} else if (line.match(note2) || line.match(note2a)){
				obj.shieldBreak = Number(RegExp.$1);
			} else if (line.match(note3)){
				obj.shieldBreakAll = true;
			} else if (line.match(note4)){
				obj.ignoreShields = true;
			} else if (line.match(note5)){
				obj.antiShieldText = true;
			}
		}
	}
}

//Does the processing for everything else
DataManager.processShieldNotetagsB = function(group) {
	//Loads up various strings to check for
	var note1 = /<Shield[ ]?Boost:[ ]?(-?\d+)>/i;
	var note2 = /<Shields?[ ]?Break[ ]?Boost:[ ]?(-?\d+)>/i;
	var note3 = /<Shield[ ]?Cap[ ]?Mod(?:ifier)?:[ ]?(-?\d+)>/i;
	var note4 = /<Break[ ]?All[ ]?Shields?>/i;
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.shieldBoost = 0;
		obj.shieldBreakBoost = 0;
		obj.shieldCapMod = 0;
		obj.shieldBreakAll = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.shieldBoost = Number(RegExp.$1);
			} else if (line.match(note2)){
				obj.shieldBreakBoost = Number(RegExp.$1);
			} else if (line.match(note3)){
				obj.shieldCapMod = Number(RegExp.$1);
			} else if (line.match(note4)){
				obj.shieldBreakAll = true;
			}
		}
	}
}

//Initalizes everyone with the shield property
frsh_shields_battler_init = Game_BattlerBase.prototype.initialize;
Game_BattlerBase.prototype.initialize = function() {
    frsh_shields_battler_init.call(this);
	this._shields = 0;
};

//Gets all the modifiers for Shields with actors
Game_Actor.prototype.getShieldStuff = function() {
	//Gets the modifiers from the base actor
	this.shieldBoost = $dataActors[this.actorId()].shieldBoost;
	this.shieldBreakBoost = $dataActors[this.actorId()].shieldBreakBoost;
	this.shieldCapMod = $dataActors[this.actorId()].shieldCapMod;
	this.shieldBreakAll = $dataActors[this.actorId()].shieldBreakAll;
	//Gets the modifiers from the classe of the actor
	var id = this._classId;
	this.shieldBoost += $dataClasses[id].shieldBoost;
	this.shieldBreakBoost += $dataClasses[id].shieldBreakBoost;
	this.shieldCapMod += $dataClasses[id].shieldCapMod;
	if (!this.shieldBreakAll) this.shieldBreakAll = $dataClasses[id].shieldBreakAll;
	//Checks each equip the actor has
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		//Gets the modifiers from the actor's equipment
		this.shieldBoost += equip.shieldBoost;
		this.shieldBreakBoost += equip.shieldBreakBoost;
		this.shieldCapMod += equip.shieldCapMod;
		if (!this.shieldBreakAll) this.shieldBreakAll = equip.shieldBreakAll;
	}
	//Gets actor's states
	var stateList = this.states();
	//Gets the modifiers from the base actor's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.shieldBoost += $dataStates[id].shieldBoost;
		this.shieldBreakBoost += $dataStates[id].shieldBreakBoost;
		this.shieldCapMod += $dataStates[id].shieldCapMod;
		if (!this.shieldBreakAll) this.shieldBreakAll = $dataStates[id].shieldBreakAll;
	}
};

//Same as above, but for enemies
Game_Enemy.prototype.getShieldStuff = function() {
	//Gets the modifiers from the base enemy
	this.shieldBoost = $dataEnemies[this.enemyId()].shieldBoost;
	this.shieldBreakBoost = $dataEnemies[this.enemyId()].shieldBreakBoost;
	this.shieldCapMod = $dataEnemies[this.enemyId()].shieldCapMod;
	this.shieldBreakAll = $dataEnemies[this.enemyId()].shieldBreakAll;
	//Gets enemy's states
	var stateList = this.states();
	//Gets the modifiers from the base enemy's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.shieldBoost += $dataStates[id].shieldBoost;
		this.shieldBreakBoost += $dataStates[id].shieldBreakBoost;
		this.shieldCapMod += $dataStates[id].shieldCapMod;
		if (!this.shieldBreakAll) this.shieldBreakAll = $dataStates[id].shieldBreakAll;
	}
}

//Removes all the overheal modifiers so that it doesn't get repeated and/or bleed out
Game_BattlerBase.prototype.removeShieldStuff = function() {
	this.shieldBoost = 0;
	this.shieldBreakBoost = 0;
	this.shieldCapMod = 0;
	this.shieldBreakAll = false;
};

//Gets and resets the modifiers for the shields
frsh_shield_get_modifiers = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_shield_get_modifiers.call(this);
	//Resets the values
	this.removeShieldStuff();
	//Sets the values
	this.getShieldStuff();
}

//An extention to reset the value in results() that keeps track of the changes
//of shields
frsh_shields_result_init = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    frsh_shields_result_init.call(this);
	this.shieldsChange = 0;
};

//An extention used to prepare the shield image 
frsh_shields_icon_init = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height){
    frsh_shields_icon_init.call(this, x, y, width, height);
	ImageManager.reserveSystem(Frashaw.Param.ShieldImageName);
};

//==============================================================================
//Shield Processing
//==============================================================================
//A check to see if an entity is shielded or not
Game_BattlerBase.prototype.isShielded = function() {
    return this._shields > 0;
};

//A method to process adding shields to an individual, with added Processing
//for caps
Game_BattlerBase.prototype.gainShields = function(amount){
	cap = Frashaw.Param.BaseShieldCap + this.shieldCapMod;
	if (cap < 0) cap = 0;
	this._shields += amount;
	if (this._shields > cap) this._shields = cap;
	this.result().shieldsChange += amount;
}

//A method to process removing shields from an individual, making sure it doesn't
//go below 0
Game_BattlerBase.prototype.removeShields = function(amount){
	this._shields -= amount;
	if (this._shields < 0) this._shields = 0;
	this.result().shieldsChange -= amount;
}

//A method to flat out remove all shields, most for end of battle and specific
//actions
Game_BattlerBase.prototype.removeAllShields = function(){
	this.result().shieldsChange -= this._shields;
	this._shields = 0;
}

//An extention to process adding shields with actions in-game
frsh_shields_shield_act = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target){
	frsh_shields_shield_act.call(this, target);
	if (this.item().shields > 0){ 
		target.gainShields(this.item().shields + this.subject().shieldBoost);
	}
}

//A method to process the display of how shields were impacted during the action
Window_BattleLog.prototype.displayShields = function(target) {
	if (target.result().shieldsChange > 0){
		if (target.result().shieldsChange > 1){
			var text = Frashaw.Param.ShieldGainMsg;
		} else {
			var text = Frashaw.Param.SingleShieldGainMsg;
		}
		target.shieldMakeSound();
	} else if (target.result().shieldsChange < 0){
		if (target.result().shieldsChange < -1){
			var text = Frashaw.Param.ShieldLoseMsg;
		} else {
			var text = Frashaw.Param.SingleShieldLoseMsg;
		}
		target.shieldBreakSound();
	} else {
		return;
	}
	text = text.replace("1%", target.name());
	text = text.replace("2%", Math.abs(target.result().shieldsChange));
	this.push('addText', text);
};

//An extention that looks to see if the action is shieldable, and if the target
//has shields to burn to see if it should be used or not
frsh_shield_damage_negation = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
	var value = frsh_shield_damage_negation.call(this, target, critical);
	if (value > 0 && target.isShielded() && !this._shieldIgnore){
		if (this.shieldBreakAll || this.subject().shieldBreakAll){
			target.removeAllShields();
		} else {
			amount = 1 + this.item().shieldBreak + this.subject().shieldBreakBoost;
			if (amount < 0) amount = 0;
			target.removeShields(amount);
		}
		return 0;
	} else {
		return value;
	}
};

//An extention to remove shields from DoT damage
frsh_shields_regen_break = Game_Battler.prototype.regenerateHp;
Game_Battler.prototype.regenerateHp = function() {
    var value = Math.floor(this.mhp * this.hrg);
	if (Frashaw.Param.ShieldDegenActivate && this.isShielded() && value < 0){
		this.removeShields(1);
		this.shieldBreakSound();
	} else {
		frsh_shields_regen_break.call(this);
	}
};

//Removes all shields upon death
frsh_shields_remove_death = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    frsh_shields_remove_death.call(this);
	this.removeAllShields();
};

//Resets all shields at the end of battle
frsh_shields_battle_clear = Game_Battler.prototype.onBattleEnd
Game_Battler.prototype.onBattleEnd = function() {
    frsh_shields_battle_clear.call(this);
	this.removeAllShields();
};

//==============================================================================
//Shield Visuals
//==============================================================================
//An extention used to show that the hit burned a shield, and not wasn't straight up
//negated normally
frsh_shields_damage_message = Window_BattleLog.prototype.makeHpDamageText;
Window_BattleLog.prototype.makeHpDamageText = function(target) {
    if (target.result().shieldsChange < 0){
		var text = Frashaw.Param.ShieldTankMsg;
		text = text.replace("1%", target.name());
		target.performShieldBreak();
		return text;
	} else {
		return frsh_shields_damage_message.call(this, target);
	}
};

//An extention that tacks on the method to show how shields were affected to the
//end of the damage
frsh_shields_effect_popup = Window_BattleLog.prototype.displayDamage;
Window_BattleLog.prototype.displayDamage = function(target) {
	frsh_shields_effect_popup.call(this, target);
	//A function to mimic another one of my plugins, AntiMessage, where text
	//from the battlelog can be excluded
	if (Imported.AMessage){
		check = true;
		num = Frashaw.Param.AntiShieldSwitch;
		if (num != 0){
			if ($gameSwitches.value(num)) check = false;
		}
		if (BattleManager._action.item().antiShieldText) check = false;
	} else {
		check = true;
	}
	if (check) this.displayShields(target);
};

//A method designed to replicate how an actor take damage, but with different sounds and what not
Game_Actor.prototype.performShieldBreak = function() {
	if (Frashaw.Param.ActorShieldBreakAnimation != 0){
		this.startAnimation(Frashaw.Param.ActorShieldBreakAnimation, false, 0);
	}
	this.shieldBreakSound();
	//Normal stuff for the actor damage code
	if (this.isSpriteVisible()) {
        this.requestMotion('damage');
    } else {
        $gameScreen.startShake(5, 5, 10);
    }
};

//A method designed to replicate how an enemy take damage, but with different sounds and what not
Game_Enemy.prototype.performShieldBreak = function() {
    if (Frashaw.Param.EnemyShieldBreakAnimation != 0){
		this.startAnimation(Frashaw.Param.EnemyShieldBreakAnimation, false, 0);
	}
	this.shieldBreakSound();
	//Normal stuff for the enemy damage code
    this.requestEffect('blink');
};

//A method to play the sound effect for making a shield
Game_BattlerBase.prototype.shieldMakeSound = function() {
	AudioManager.playSe({
		name: Frashaw.Param.ShieldGainSE,
		volume: Frashaw.Param.ShieldGainSEVolume,
		pitch: Frashaw.Param.ShieldGainSEPitch,
		pan: Frashaw.Param.ShieldGainSEPan
	});
};

//A method to play the sound effect for breaking a shield
Game_BattlerBase.prototype.shieldBreakSound = function() {
	if (Frashaw.Param.ShieldBreakSE == "") return;
	AudioManager.playSe({
		name: Frashaw.Param.ShieldBreakSE,
		volume: Frashaw.Param.ShieldBreakSEVolume,
		pitch: Frashaw.Param.ShieldBreakSEPitch,
		pan: Frashaw.Param.ShieldBreakSEPan
	});
};

//A method to make sure that the image for the shield icon is loaded before use
Window_Base.prototype.loadShield = function(){
	this._shieldImage = ImageManager.reserveSystem(Frashaw.Param.ShieldImageName, 0, 3);
}

//An extention that recreates the hp bar to show that the ally is shielded
frsh_shields_grayout_hp_bar = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
	if (actor.isShielded()){
		if (Frashaw.Param.ShieldBarColor1 != "" && Frashaw.Param.ShieldBarColor2 != ""){
			width = width || 186;
			var color1 = Frashaw.Param.ShieldBarColor1;
			var color2 = Frashaw.Param.ShieldBarColor2;
			//If my overheal plugin is imported, adds the overheal to the considered rate
			//for the visuals
			if (Imported.Overheal){
				rate = (actor.hp + actor.overheal) / actor.mhp;
				if (rate > 1) rate = 1;
				hp = actor.hp + actor.overheal;
			} else {
				rate = actor.hpRate();
				hp = actor.hp;
			}
			this.drawGauge(x, y, width, rate, color1, color2);
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.hpA, x, y, 44);
			this.drawCurrentAndMax(hp, actor.mhp, x, y, width, this.hpColor(actor), this.normalColor());
		} else {
			frsh_shields_grayout_hp_bar.call(this, actor, x, y, width);
		}
		this.loadShield();
		this.changeTextColor(this.textColor(0));
		this.drawActorShield(actor, x + Frashaw.Param.ShieldImageX, y + Frashaw.Param.ShieldImageY);
		this.drawText(actor._shields, x + Frashaw.Param.ShieldTextX + ((String(actor._shields).length - 1) * Frashaw.Param.ShieldTextX2), y + Frashaw.Param.ShieldTextY);
	} else {
		frsh_shields_grayout_hp_bar.call(this, actor, x, y, width);
	}
};

//A method to draw the image of the shield
Window_Base.prototype.drawActorShield = function(actor, x, y){
    var bitmap = ImageManager.loadSystem(Frashaw.Param.ShieldImageName);
	var pw = bitmap.width;
    var ph = bitmap.height;
	var zx = pw * 0;
    this.contents.blt(bitmap, zx, 0, pw, ph, x, y);
}
})();
//=============================================================================
// End of File
//=============================================================================
