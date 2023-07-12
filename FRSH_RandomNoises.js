//=============================================================================
// FRSH_RandomNoises
// FRSH_RandomNoises.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.RNoises = true;

var Frashaw = Frashaw || {};
Frashaw.RNoises = Frashaw.RNoises || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Gives sound effects a random chance to play a different sound effect.
*
* @param Cursor Sound Effects
* @default
*
* @param cursorChance
* @text Cursor SE Chance
* @parent Cursor Sound Effects
* @type number
* @desc Put the chance you want the Cursor sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param cursorList
* @text Cursor SE List
* @parent Cursor Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Cursor. Seperate options with a ", " or it will break.
* @default
*
* @param Ok Sound Effects
* @default
*
* @param okayChance
* @text Ok SE Chance
* @parent Ok Sound Effects
* @type number
* @desc Put the chance you want the Okay sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param okayList
* @text Ok SE List
* @parent Ok Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Okay. Seperate options with a ", " or it will break.
* @default
*
* @param Cancel Sound Effects
* @default
*
* @param cancelChance
* @text Cancel SE Chance
* @parent Cancel Sound Effects
* @type number
* @desc Put the chance you want the Cancel sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param cancelList
* @text Cancel SE List
* @parent Cancel Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Cancel. Seperate options with a ", " or it will break.
* @default
*
* @param Buzzer Sound Effects
* @default
*
* @param buzzerChance
* @text Buzzer SE Chance
* @parent Buzzer Sound Effects
* @type number
* @desc Put the chance you want the Buzzer sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param buzzerList
* @text Buzzer SE List
* @parent Buzzer Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Buzzer. Seperate options with a ", " or it will break.
* @default
*
* @param Equip Sound Effects
* @default
*
* @param equipChance
* @text Equip SE Chance
* @parent Equip Sound Effects
* @type number
* @desc Put the chance you want the Equip sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param equipList
* @text Equip SE List
* @parent Equip Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Equip. Seperate options with a ", " or it will break.
* @default
*
* @param Save Sound Effects
* @default
*
* @param saveChance
* @text Save SE Chance
* @parent Save Sound Effects
* @type number
* @desc Put the chance you want the Save sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param saveList
* @text Save SE List
* @parent Save Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Save. Seperate options with a ", " or it will break.
* @default
*
* @param Load Sound Effects
* @default
*
* @param loadrChance
* @text Load SE Chance
* @parent Load Sound Effects
* @type number
* @desc Put the chance you want the Load sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param loadList
* @text Load SE List
* @parent Load Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Load. Seperate options with a ", " or it will break.
* @default
*
* @param Battle Start Sound Effects
* @default
*
* @param bstartChance
* @text Battle Start SE Chance
* @parent Battle Start Sound Effects
* @type number
* @desc Put the chance you want the Battle Start sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param bstartList
* @text Battle Start SE List
* @parent Battle Start Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Battle Start. Seperate options with a ", " or it will break.
* @default
*
* @param Escape Sound Effects
* @default
*
* @param escapeChance
* @text Escape SE Chance
* @parent Escape Sound Effects
* @type number
* @desc Put the chance you want the Escape sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param escapeList
* @text Escape SE List
* @parent Escape Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Escape. Seperate options with a ", " or it will break.
* @default
*
* @param Enemy Attack Sound Effects
* @default
*
* @param enemyattackChance
* @text Enemy Attack SE Chance
* @parent Enemy Attack Sound Effects
* @type number
* @desc Put the chance you want the Enemy Attack sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param enemyattackList
* @text Enemy Attack SE List
* @parent Enemy Attack Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Enemy Attack. Seperate options with a ", " or it will break.
* @default
*
* @param Enemy Damage Sound Effects
* @default
*
* @param enemydamageChance
* @text Enemy Damage SE Chance
* @parent Enemy Damage Sound Effects
* @type number
* @desc Put the chance you want the Enemy Damage sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param enemydamageList
* @text Enemy Damage SE List
* @parent Enemy Damage Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Enemy Damage. Seperate options with a ", " or it will break.
* @default
*
* @param Enemy Fall Sound Effects
* @default
*
* @param enemyfallChance
* @text Enemy Fall SE Chance
* @parent Enemy Fall Sound Effects
* @type number
* @desc Put the chance you want the Enemy Fall sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param enemyfallList
* @text Enemy Fall SE List
* @parent Enemy Fall Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Enemy Fall. Seperate options with a ", " or it will break.
* @default
*
* @param Boss Fall 1 Sound Effects
* @default
*
* @param bossfall1Chance
* @text Boss Fall 1 SE Chance
* @parent Boss Fall 1 Sound Effects
* @type number
* @desc Put the chance you want the Boss Fall 1 sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param bossfall1List
* @text Boss Fall 1 SE List
* @parent Boss Fall 1 Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Boss Fall 1. Seperate options with a ", " or it will break.
* @default
*
* @param Boss Fall 2 Sound Effects
* @default
*
* @param bossfall2Chance
* @text Boss Fall 2 SE Chance
* @parent Boss Fall 2 Sound Effects
* @type number
* @desc Put the chance you want the Boss Fall 2 sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param bossfall2List
* @text Boss Fall 2 SE List
* @parent Boss Fall 2 Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Boss Fall 2. Seperate options with a ", " or it will break.
* @default
*
* @param Actor Damage Sound Effects
* @default
*
* @param actordamageChance
* @text Actor Damage SE Chance
* @parent Actor Damage Sound Effects
* @type number
* @desc Put the chance you want the Actor Damage sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param actordamageList
* @text Actor Damage SE List
* @parent Actor Damage Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Actor Damage. Seperate options with a ", " or it will break.
* @default
*
* @param Actor Fall Sound Effects
* @default
*
* @param actorfallChance
* @text Actor Fall SE Chance
* @parent Actor Fall Sound Effects
* @type number
* @desc Put the chance you want the Actor Fall sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param actorfallList
* @text Actor Fall SE List
* @parent Actor Fall Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Actor Fall. Seperate options with a ", " or it will break.
* @default
*
* @param Recovery Sound Effects
* @default
*
* @param recoveryChance
* @text Recovery SE Chance
* @parent Recovery Sound Effects
* @type number
* @desc Put the chance you want the Recovery sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param recoveryList
* @text Recovery SE List
* @parent Recovery Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Recovery. Seperate options with a ", " or it will break.
* @default
*
* @param Miss Sound Effects
* @default
*
* @param missChance
* @text Miss SE Chance
* @parent Miss Sound Effects
* @type number
* @desc Put the chance you want the Miss sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param missList
* @text Miss SE List
* @parent Miss Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Miss. Seperate options with a ", " or it will break.
* @default
*
* @param Evasion Sound Effects
* @default
*
* @param evasionChance
* @text Evasion SE Chance
* @parent Evasion Sound Effects
* @type number
* @desc Put the chance you want the Evasion sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param evasionList
* @text Evasion SE List
* @parent Evasion Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Evasion. Seperate options with a ", " or it will break.
* @default
*
* @param Mgk Evasion Sound Effects
* @default
*
* @param mgkevasionChance
* @text Mgk Evasion SE Chance
* @parent Mgk Evasion Sound Effects
* @type number
* @desc Put the chance you want the Mgk Evasion sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param mgkevasionList
* @text Mgk Evasion SE List
* @parent Mgk Evasion Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Mgk Evasion. Seperate options with a ", " or it will break.
* @default
*
* @param Reflection Sound Effects
* @default
*
* @param reflectionChance
* @text Reflection SE Chance
* @parent Reflection Sound Effects
* @type number
* @desc Put the chance you want the Reflection sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param reflectionList
* @text Reflection SE List
* @parent Reflection Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Reflection. Seperate options with a ", " or it will break.
* @default
*
* @param Shop Sound Effects
* @default
*
* @param shopChance
* @text Shop SE Chance
* @parent Shop Sound Effects
* @type number
* @desc Put the chance you want the Shop sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param shopList
* @text Shop SE List
* @parent Shop Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Shop. Seperate options with a ", " or it will break.
* @default
*
* @param Use Item Sound Effects
* @default
*
* @param useitemChance
* @text Use Item SE Chance
* @parent Use Item Sound Effects
* @type number
* @desc Put the chance you want the Use Item sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param useitemList
* @text Use Item SE List
* @parent Use Item Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Use Item. Seperate options with a ", " or it will break.
* @default
*
* @param Use Skill Sound Effects
* @default
*
* @param useskillChance
* @text Use Skill SE Chance
* @parent Use Skill Sound Effects
* @type number
* @desc Put the chance you want the Use Skill sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param useskillList
* @text Use Skill SE List
* @parent Use Skill Sound Effects
* @type text
* @desc Put the list of Sound Effects you want to swap out Use Skill. Seperate options with a ", " or it will break.
* @default
*
* @param Victory Music Effects
* @default
*
* @param victoryChance
* @text Victory ME Chance
* @parent Victory Music Effects
* @type number
* @desc Put the chance you want the Victory sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param victoryList
* @text Victory ME List
* @parent Victory Music Effects
* @type text
* @desc Put the list of Music Effects you want to swap out Victory. Seperate options with a ", " or it will break.
* @default
*
* @param Defeat Music Effects
* @default
*
* @param defeatChance
* @text Defeat ME Chance
* @parent Defeat Music Effects
* @type number
* @desc Put the chance you want the Defeat sound to be changed to a different one. Put 0 to not use it.
* @min 0
* @default 0
*
* @param defeatList
* @text Defeat ME List
* @parent Defeat Music Effects
* @type text
* @desc Put the list of Music Effects you want to swap out Defeat. Seperate options with a ", " or it will break.
* @default
*
* @help
* ===Introduction=============================================================
* Base RPG Maker sounds can get annoying after a while, so this plugins adds
* in a little randomness to spice it up everyone in a while.
* ===How to Use===============================================================
* You set up the probabilities of each sound and the make a list of what
* sounds are going to be played, and that's it. Note the the chance of the
* sound effect range from 1-100, so any number above that will always play.
* Also not that all sound effects, and music effect in the case for victory
* and defeat options, must be in the proper foulder in order for the game to
* be horribley confused.
* ===Change Log===============================================================
* Version 1.0 (07/12/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_RandomNoises');
Frashaw.Param = Frashaw.Param || {};
var arrayA = ['cursor', 'okay', 'cancel', 'buzzer', 'equip', 'save', 'load', 'bstart', 'escape', 'enemyattack', 'enemydamage', 'enemyfall', 'bossfall1', 'bossfall2', 'actordamage', 'actorfall', 'recovery', 'miss', 'evasion', 'mgkevasion', 'reflection', 'shop', 'useitem', 'useskill', 'victory', 'defeat'];
var arrayB = ['Cursor', 'Okay', 'Cancel', 'Buzzer', 'Equip', 'Save', 'Load', 'BattleStart', 'Escape', 'EnemyAttack', 'EnemyDamage', 'EnemyFall', 'BossFall1', 'BossFall2', 'ActorDamage', 'ActorFall', 'Recovery', 'Miss', 'Evasion', 'MagicEvasion', 'Reflection', 'Shop', 'UseItem', 'UseSkill', 'Victory', 'Defeat'];
for (var loop = 0; loop != arrayA.length; loop++){
	eval("Frashaw.Param." + arrayB[loop] + "Chance = Number(Parameters." + arrayA[loop] + "Chance)");
	eval("Frashaw.Param." + arrayB[loop] + "List = Parameters." + arrayA[loop] + "List.split(', ')");
}

//Function that plays the Cursor sound
SoundManager.playCursor = function() {
	//Gets a random number between 1-100, put at +1 because randomInt usually takes 0-(1 less then the number inputted) which didn't work here 
	var rand = Math.randomInt(100)+1;
	//Checks to see if the random variable is higher then the chosen chance of the alternate sound effect.
	if (rand >= Frashaw.Param.CursorChance){
		//Plays normal sounds if yes
		this.playSystemSound(0);
	} else {
		//If no, gets the array of sounds to play
		var array = Frashaw.Param.CursorList;
		//Gets random variable based on the length to select a random one, this time the 0-(one less) works
		var rand = Math.randomInt(array.length);
		//Plays the random sound effect
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

//Pretty much just replicates it self from here on
SoundManager.playOk = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.OkayChance){
		this.playSystemSound(1);
	} else {
		var array = Frashaw.Param.OkayList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playCancel = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.CancelChance){
		this.playSystemSound(2);
	} else {
		var array = Frashaw.Param.CancelList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playBuzzer = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.BuzzerChance){
		this.playSystemSound(3);
	} else {
		var array = Frashaw.Param.BuzzerList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playEquip = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.EquipChance){
		this.playSystemSound(4);
	} else {
		var array = Frashaw.Param.EquipList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playSave = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.SaveChance){
		this.playSystemSound(5);
	} else {
		var array = Frashaw.Param.SaveList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playLoad = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.LoadChance){
		this.playSystemSound(6);
	} else {
		var array = Frashaw.Param.LoadList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playBattleStart = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.BattleStartChance){
		this.playSystemSound(7);
	} else {
		var array = Frashaw.Param.BattleStartList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playEscape = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.EscapeChance){
		this.playSystemSound(8);
	} else {
		var array = Frashaw.Param.EscapeList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playEnemyAttack = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.EnemyAttackChance){
		this.playSystemSound(9);
	} else {
		var array = Frashaw.Param.EnemyAttackList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playEnemyDamage = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.EnemyDamageChance){
		this.playSystemSound(10);
	} else {
		var array = Frashaw.Param.EnemyDamageList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playEnemyCollapse = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.EnemyFallChance){
		this.playSystemSound(11);
	} else {
		var array = Frashaw.Param.EnemyFallList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playBossCollapse1 = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.BossFall1Chance){
		this.playSystemSound(12);
	} else {
		var array = Frashaw.Param.BossFall1List;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playBossCollapse2 = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.BossFall2Chance){
		this.playSystemSound(13);
	} else {
		var array = Frashaw.Param.BossFall2List;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playActorDamage = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.ActorDamageChance){
		this.playSystemSound(14);
	} else {
		var array = Frashaw.Param.ActorDamageList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playActorCollapse = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.ActorFallChance){
		this.playSystemSound(15);
	} else {
		var array = Frashaw.Param.ActorFallList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playRecovery = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.RecoveryChance){
		this.playSystemSound(16);
	} else {
		var array = Frashaw.Param.RecoveryList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playMiss = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.MissChance){
		this.playSystemSound(17);
	} else {
		var array = Frashaw.Param.MissList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playEvasion = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.EvasionChance){
		this.playSystemSound(18);
	} else {
		var array = Frashaw.Param.EvasionList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playMagicEvasion = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.MagicEvasionChance){
		this.playSystemSound(19);
	} else {
		var array = Frashaw.Param.MagicEvasionList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playReflection = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.ReflectionChance){
		this.playSystemSound(20);
	} else {
		var array = Frashaw.Param.ReflectionList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playShop = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.ShopChance){
		this.playSystemSound(21);
	} else {
		var array = Frashaw.Param.ShopList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playUseItem = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.UseItemChance){
		this.playSystemSound(22);
	} else {
		var array = Frashaw.Param.UseItemList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

SoundManager.playUseSkill = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.UseSkillChance){
		this.playSystemSound(23);
	} else {
		var array = Frashaw.Param.UseSkillList;
		var rand = Math.randomInt(array.length);
		AudioManager.playStaticSe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

BattleManager.playVictoryMe = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.VictoryChance){
		AudioManager.playMe($gameSystem.victoryMe());
	} else {
		var array = Frashaw.Param.VictoryList;
		var rand = Math.randomInt(array.length);
		AudioManager.playMe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};

BattleManager.playDefeatMe = function() {
	var rand = Math.randomInt(100)+1;
	if (rand >= Frashaw.Param.DefeatChance){
		AudioManager.playMe($gameSystem.defeatMe());
	} else {
		var array = Frashaw.Param.DefeatList;
		var rand = Math.randomInt(array.length);
		AudioManager.playMe({name: array[rand], volume: 90, pitch: 100, pan: 0});
	}
};
})();

//=============================================================================
// End of File
//=============================================================================