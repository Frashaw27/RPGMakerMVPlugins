//=============================================================================
// FRSH_Recoil
// FRSH_Recoil.js
// Version: 1.4.0
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
* @param recHealMsg
* @text Heal Recoil Message
* @type text
* @desc Put the message you want to show when taking "recoil" healing. Use 1% to represent user & 2% to represent healing.
* @default 1% gained 2% Hp back!
*
* @param
* @default
*
* @param recMpMsg
* @text Mp Recoil Message
* @type text
* @desc Put the message you want to show when taking Mp recoil damage. Use 1% to represent user & 2% to represent damage.
* @default 1% lost 2% Mp!
*
* @param recMpHealMsg
* @text Mp Heal Recoil Message
* @type text
* @desc Put the message you want to show when taking Mp "recoil" healing. Use 1% to represent user & 2% to represent healing.
* @default 1% gained 2% Mp back!
*
* @param
* @default
*
* @param recTpMsg
* @text Tp Recoil Message
* @type text
* @desc Put the message you want to show when taking Tp recoil damage. Use 1% to represent user & 2% to represent damage.
* @default 1% lost 2% Tp!
*
* @param recTpHealMsg
* @text Tp Heal Recoil Message
* @type text
* @desc Put the message you want to show when taking Tp "recoil" healing. Use 1% to represent user & 2% to represent healing.
* @default 1% gained 2% Mp back!
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
* @param recoilMsgWait
* @text Enable Recoil Wait?
* @type boolean
* @desc Click True or False if you want to enable recoil messages lagging the time to the Battlelog's next hit.
* @default false
*
* @help
* ==Notetags==================================================================
* <either of these|syntaxesWorks>
* Actors/Classes/Weapons/Armors/Skills/Items/States:
* <recoil: insert formula here>: Enables Recoil on skill, assessing based on 
* formula (you can still add stuff like 500 and it'd work). Make it negative 
* if you want to make it heal instead of hurt. 
* Useable Terms: User - user, a, Target: target, b, value
* <Recoil Eval|recoilEval></Recoil Eval|recoilEval>: Same as above but the 
* is code longer and inbetween the 2 tags
* <Recoil Message|recoilMsg: insert message here>: Replaces the standard 
* recoil message with a different one.
* <Mp Recoil|mpRecoil>: Does the recoil, but for the user's mp.
* <Mp Recoil Eval|recoilMpEval></Mp Recoil Eval|recoilMpEval>: same as above, 
* but elongated.
* <Tp Recoil|tpRecoil>: Does the recoil, but for the user's tp.
* <Mp Recoil Eval|recoilMpEval></Mp Recoil Eval|recoilMpEval>: same as above, 
* but elongated.
* <Recoil Message|recoilMsg: insert message here>: Replaces the message for
* Hp Damaging recoils. Use 1% for the user's name, and 2% for the value.
* <Recoil Heal Message|recoilHealMsg: insert message here>: Replaces the message for
* Hp Healing recoils. Use 1% for the user's name, and 2% for the value.
* <Recoil Mp Message|recoilMpMsg: insert message here>: Replaces the message for
* Mp Damaging recoils. Use 1% for the user's name, and 2% for the value.
* <Recoil Mp Heal Message|recoilMpHealMsg: insert message here>: Replaces the message for
* Mp Healing recoils. Use 1% for the user's name, and 2% for the value.
* <Recoil Tp Message|recoilTpMsg: insert message here>: Replaces the message for
* Tp Damaging recoils. Use 1% for the user's name, and 2% for the value.
* <Recoil Tp Heal Message|recoilTpHealMsg: insert message here>: Replaces the message for
* Tp Healing recoils. Use 1% for the user's name, and 2% for the value.
* Actors, Enemies, Classes, Weapons, Armors, and States:
* <recoilAdd: insert number here>: Adds/Subtracts from the Recoil
* if it Damages. Doesn't effect healing recoils.
* <recoilMult: insert number here>: Multiplies Recoil Damage. Doesn't effect 
* healing recoils.
* <recoilNull>: Causes Damaging Recoils to not run.
* <healRecoilNull>: Cuases Healing Recoils to not run.
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
* Version 1.4.0 (03/11/34) :
* -Rewrote the plugin signifcantly
* -Changed the calls for Recoil Eval short hands to include the l's 
* -Removed the healing recoil tag as all negative recoils will now heal
* -Removed the mp and tp recoil tags as you can now just assign them
* recoils
* -Recoil evals no longer need "recoil" to be set to return something
* -Added custom messages to classes
*
* Version 1.3.5 (02/28/34) :
* -Fixed bug where positive recoil nulls wouldn't be called
*
* Version 1.3.4 (02/21/34) :
* -Added value to recoil eval and message recoil eval
*
* Version 1.3.3 (02/20/34) :
* -Added an option to allow Recoil Texts to not have the Battlelog wait/do make
* it wait.
* -Removed some redundent lines
*
* Version 1.3.2 (02/16/34) :
* -Removed method that caused passive states to double up on calls
*
* Version 1.3.1 (11/03/23):
* -Fixed a buf with recoil hp healing
*
* Version 1.3.0 (10/15/23):
* -Added a way to make Mp and Tp specific recoils with their own unique Messages
* -Actor/Enemy specific recoil messages no longer overwrite all other messages, 
* only the type they were assigned. Skill ones still overwrite though.
* -Aded a way to make the recoils heal you, and a way to negate that
* -Personal recoils are now calculated seperately from the ones from the Skills
* -Updated description to include useable terms for evals
* -Fixed a bug on the recoil eval
*
* Version 1.2.0 (07/30/23) :
* -Add a Recoil Eval for more complex recoils
* -Added Message Evals for simular purpose but with messages
* -Added Actor/Enemy exclusive recoil messages
* -Redid the method of getting the and setting the various aspects of these
* -Added another way to call these methods easier 
*
* Version 1.1.1 (07/14/23) :
* -Removed a method that crashed Yanfly_PartySystem
*
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
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_Recoil');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.RecoilMessage = Parameters.recMsg;
Frashaw.Param.HealRecoilMessage = Parameters.recHealMsg;
Frashaw.Param.MpRecoilMessage = Parameters.recMpMsg;
Frashaw.Param.MpHealRecoilMessage = Parameters.recMpHealMsg;
Frashaw.Param.TpRecoilMessage = Parameters.recTpMsg;
Frashaw.Param.TpHealRecoilMessage = Parameters.recTpHealMsg;
Frashaw.Param.PersonalRecoilMods = Parameters.perRecoilMod === "true";
Frashaw.Param.PersonalRecoilPhysical = Parameters.recPhys === "true";
Frashaw.Param.PersonalRecoilMagical = Parameters.recMag === "true";
Frashaw.Param.PersonalRecoilCertain = Parameters.recCert === "true";
Frashaw.Param.PersonalRecoilAlly = Parameters.recAlly === "true";
Frashaw.Param.PersonalRecoilDeadAlly = Parameters.recDAlly === "true";
Frashaw.Param.PersonalRecoilUser = Parameters.recSelf === "true";
Frashaw.Param.RecoillessMessage = Parameters.recoilessMsg === "true";
Frashaw.Param.RecoilWait = Parameters.recoilMsgWait === "true";

//Some variable setting
var recoilMsg = Frashaw.Param.RecoilMessage;
var recoilMessage = "";
var dmgValue = 0;
var recoilValue = 0;
var recoilBool = false;
var personalRecoilBool = false;
var FrshRecoilLoaded = false;

//Starts the function to intialize all the summon notetags
FrshRecoil_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshRecoil_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshRecoilLoaded == false) {
		//Processes the notetags of actors
		this.processRecoilNotetagsA($dataItems);
		this.processRecoilNotetagsA($dataSkills);
		this.processRecoilNotetagsC($dataItems);
		this.processRecoilNotetagsC($dataSkills);
		this.processRecoilNotetagsB($dataActors);
		this.processRecoilNotetagsC($dataActors);
		this.processRecoilNotetagsB($dataClasses);
		this.processRecoilNotetagsC($dataClasses);
		this.processRecoilNotetagsB($dataEnemies);
		this.processRecoilNotetagsC($dataEnemies);
		this.processRecoilNotetagsB($dataWeapons);
		this.processRecoilNotetagsB($dataArmors);
		this.processRecoilNotetagsB($dataStates);
		//Make sure it doesn't run twice
		FrshRecoilLoaded = true;
	}
	return true;
};

//Does the processing for the skills and items
DataManager.processRecoilNotetagsA = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:RECOIL):[ ]+(.*?)>/i;
	var noteA = /<(?:RECOIL EVAL|recoilEval)>/i;
	var noteB = /<\/(?:RECOIL EVAL|recoilEval)>/i;
	var noteA1 = /<(?:MP RECOIL|mpRecoil):[ ]+(.*?)>/i;
	var noteA2 = /<(?:MP RECOIL EVAL|recoilMpEval)>/i;
	var noteA3 = /<\/(?:MP RECOIL EVAL|recoilMpEval)>/i;
	var noteB1 = /<(?:TP RECOIL|tpRecoil):[ ]+(.*?)>/i;
	var noteB2 = /<(?:TP RECOIL EVAL|recoilTpEval)>/i;
	var noteB3 = /<\/(?:TP RECOIL EVAL|recoilTpEval)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
			
		//Initalizes the shit for these various conditions
		var customMode = 'none';
		obj.recoil = '';
		obj.recoilEval = '';
		obj.mpRecoil = '';
		obj.mpRecoilEval = '';
		obj.tpRecoil = '';
		obj.tpRecoilEval = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.recoil = RegExp.$1;
			} else if  (line.match(noteA1)) {
				obj.mpRecoil = RegExp.$1;
			} else if  (line.match(noteB1)) {
				obj.tpRecoil = RegExp.$1;
			} else if (line.match(noteA)) {
				customMode = 'recoil';
			} else if (line.match(noteA2)) {
				customMode = 'mpRecoil';
			} else if (line.match(noteB2)) {
				customMode = 'tpRecoil';
			} else if (line.match(noteB) || line.match(noteA3) || line.match(noteB3)){
				customMode = 'none';
			} else if (customMode === 'recoil') {
				obj.recoilEval += line + '\n';
			} else if (customMode === 'mpRecoil') {
				obj.mpRecoilEval += line + '\n';
			} else if (customMode === 'tpRecoil') {
				obj.tpRecoilEval += line + '\n';
			}
			
		}
	}
}

//Does the processing for Actors, Classes, Enemies, Weapons, and Armors
DataManager.processRecoilNotetagsB = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:RECOIL):[ ]+(.*?)>/i;
	var noteA = /<(?:RECOIL EVAL|recoilEval)>/i;
	var noteB = /<\/(?:RECOIL EVAL|recoilEval)>/i;
	var noteA1 = /<(?:MP RECOIL|mpRecoil):[ ]+(.*?)>/i;
	var noteA2 = /<(?:MP RECOIL EVAL|recoilMpEval)>/i;
	var noteA3 = /<\/(?:MP RECOIL EVAL|recoilMpEval)>/i;
	var noteB1 = /<(?:TP RECOIL|tpRecoil):[ ]+(.*?)>/i;
	var noteB2 = /<(?:TP RECOIL EVAL|recoilTpEval)>/i;
	var noteB3 = /<\/(?:TP RECOIL EVAL|recoilTpEval)>/i;
	var note2 = /<(?:RECOIL ADD|recoilAdd):[ ](\d+)>/i;
	var note3 = /<(?:RECOIL MULT|recoilMult):[ ](\d+)>/i;
	var note4 = /<(?:RECOIL Null|recoilNull)>/i;
	var note5 = /<(?:HEAL RECOIL NULL|healRecoilNull)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
			
		//Initalizes the shit for these various conditions
		var customMode = 'none';
		obj.recoil = '';
		obj.recoilEval = '';
		obj.mpRecoil = '';
		obj.mpRecoilEval = '';
		obj.tpRecoil = '';
		obj.tpRecoilEval = '';
		obj.recoilAdd = 0;
		obj.recoilMult = 1;
		obj.recoilNull = false;
		obj.healRecoilNull = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.recoil = RegExp.$1;
			} else if (line.match(note2)) {
				obj.recoilAdd = Number(RegExp.$1);
			} else if (line.match(note3)) {
				obj.recoilMult = Number(RegExp.$1)*0.01;
			} else if  (line.match(note4)) {
				obj.recoilNull = true;
			} else if  (line.match(note5)) {
				obj.healRecoilNull = true;	
			} else if  (line.match(noteA1)) {
				obj.mpRecoil = RegExp.$1;
			} else if  (line.match(noteB1)) {
				obj.tpRecoil = RegExp.$1;
			} else if (line.match(noteA)) {
				customMode = 'recoil';
			} else if (line.match(noteA2)) {
				customMode = 'mpRecoil';
			} else if (line.match(noteB2)) {
				customMode = 'tpRecoil';
			} else if (line.match(noteB) || line.match(noteA3) || line.match(noteB3)){
				customMode = 'none';
			} else if (customMode === 'recoil') {
				obj.recoilEval += line + '\n';
			} else if (customMode === 'mpRecoil') {
				obj.mpRecoilEval += line + '\n';
			} else if (customMode === 'tpRecoil') {
				obj.tpRecoilEval += line + '\n';
			}
			
		}
	}
}

//Does the processing for the Actors and Enemies
DataManager.processRecoilNotetagsC = function(group) {
	//Loads up various strings to check for
	var note = /<(?:RECOIL MESSAGE|recoilMsg):[ ]+(.*?)>/i;
	var note1 = /<(?:RECOIL MP MESSAGE|recoilMpMsg):[ ]+(.*?)>/i;
	var note2 = /<(?:RECOIL TP MESSAGE|recoilTpMsg):[ ]+(.*?)>/i;
	var noteA = /<(?:RECOIL HEAL MESSAGE|recoilHealMsg):[ ]+(.*?)>/i;
	var note1A = /<(?:RECOIL MP HEAL MESSAGE|recoilMpHealMsg):[ ]+(.*?)>/i;
	var note2A = /<(?:RECOIL TP HEAL MESSAGE|recoilTpHealMsg):[ ]+(.*?)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
			
		//Initalizes the shit for these various conditions
		obj.recoilMsg = '';
		obj.recoilMpMsg = '';
		obj.recoilTpMsg = '';
		obj.recoilHealMsg = '';
		obj.recoilMpHealMsg = '';
		obj.recoilTpHealMsg = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
				obj.recoilMsg = RegExp.$1;
			} else if (line.match(note1)) {
				obj.recoilMpMsg = RegExp.$1;
			} else if (line.match(note2)) {
				obj.recoilTpMsg = RegExp.$1;
			} else if (line.match(noteA)) {
				obj.recoilHealMsg = RegExp.$1;
			} else if (line.match(note1A)) {
				obj.recoilMpHealMsg = RegExp.$1;
			} else if (line.match(note2A)) {
				obj.recoilTpHealMsg = RegExp.$1;
			}
		}
	}
}

//Assigns the recoil messages to the usable actors
frsh_recoil_actor_message_init = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function(actorId) {
    frsh_recoil_actor_message_init.call(this, actorId);
	this.recoilMsg = $dataActors[actorId].recoilMsg;
	this.recoilMpMsg = $dataActors[actorId].recoilMpMsg;
	this.recoilTpMsg = $dataActors[actorId].recoilTpMsg;
	this.recoilHealMsg = $dataActors[actorId].recoilHealMsg;
	this.recoilMpHealMsg = $dataActors[actorId].recoilMpHealMsg;
	this.recoilTpHealMsg = $dataActors[actorId].recoilTpHealMsg;
};

//Assigns the recoil messages to the usable enemies
frsh_recoil_enemy_message_init = Game_Enemy.prototype.initialize;
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
    frsh_recoil_enemy_message_init.call(this, enemyId, x, y);
	this.recoilMsg = $dataEnemies[enemyId].recoilMsg;
	this.recoilMpMsg = $dataEnemies[enemyId].recoilMpMsg;
	this.recoilTpMsg = $dataEnemies[enemyId].recoilTpMsg;
	this.recoilHealMsg = $dataEnemies[enemyId].recoilHealMsg;
	this.recoilMpHealMsg = $dataEnemies[enemyId].recoilMpHealMsg;
	this.recoilTpHealMsg = $dataEnemies[enemyId].recoilTpHealMsg;
};

//Gets all the modifiers for Recoil with actors
Game_Actor.prototype.getRecoilStuff = function() {
	//Gets the modifiers from the base actor
	var id = this.actorId();
	if ($dataActors[id].recoil != "") this.recoil.push($dataActors[id].recoil);
	if ($dataActors[id].recoilEval != "") this.recoil.push($dataActors[id].recoilEval);
	if ($dataActors[id].mpRecoil != "") this.mpRecoil.push($dataActors[id].mpRecoil);
	if ($dataActors[id].mpRecoilEval != "") this.mpRecoil.push($dataActors[id].mpRecoilEval);
	if ($dataActors[id].tpRecoil != "") this.tpRecoil.push($dataActors[id].tpRecoil);
	if ($dataActors[id].tpRecoilEval != "") this.tpRecoil.push($dataActors[id].tpRecoilEval);
	this.recoilAdd += $dataActors[id].recoilAdd;
	this.recoilMult *= $dataActors[id].recoilMult;
	this.recoilNull = $dataActors[id].recoilNull;
	this.healRecoilNull = $dataActors[id].healRecoilNull;
	this.recoilMsg = $dataActors[id].recoilMsg;
	this.recoilMpMsg = $dataActors[id].recoilMpMsg;
	this.recoilTpMsg = $dataActors[id].recoilTpMsg;
	this.recoilHealMsg = $dataActors[id].recoilHealMsg;
	this.recoilMpHealMsg = $dataActors[id].recoilMpHealMsg;
	this.recoilTpHealMsg = $dataActors[id].recoilTpHealMsg;
	//Gets the modifiers from the classe of the actor
	var id = this._classId;
	if ($dataClasses[id].recoil != "") this.recoil.push($dataClasses[id].recoil);
	if ($dataClasses[id].recoilEval != "") this.recoil.push($dataClasses[id].recoilEval);
	if ($dataClasses[id].mpRecoil != "") this.mpRecoil.push($dataClasses[id].mpRecoil);
	if ($dataClasses[id].mpRecoilEval != "") this.mpRecoil.push($dataClasses[id].mpRecoilEval);
	if ($dataClasses[id].tpRecoil != "") this.tpRecoil.push($dataClasses[id].tpRecoil);
	if ($dataClasses[id].tpRecoilEval != "") this.tpRecoil.push($dataClasses[id].tpRecoilEval);
	this.recoilAdd += $dataClasses[id].recoilAdd;
	this.recoilMult *= $dataClasses[id].recoilMult;
	if (this.recoilMsg == "") this.recoilMsg = $dataClasses[id].recoilMsg;
	if (this.recoilMpMsg == "") this.recoilMpMsg = $dataClasses[id].recoilMpMsg;
	if (this.recoilTpMsg == "") this.recoilTpMsg = $dataClasses[id].recoilTpMsg;
	if (this.recoilHealMsg == "") this.recoilHealMsg = $dataClasses[id].recoilHealMsg;
	if (this.recoilMpHealMsg == "") this.recoilMpHealMsg = $dataClasses[id].recoilMpHealMsg;
	if (this.recoilTpHealMsg == "") this.recoilTpHealMsg = $dataClasses[id].recoilTpHealMsg;
	//Checks each equip the actor has
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		//Gets the modifiers from the actor's equipment
		if (equip.recoil != "") this.recoil.push(equip.recoil);
		if (equip.recoilEval != "") this.recoil.push(equip.recoilEval);
		if (equip.mpRecoil != "") this.mpRecoil.push(equip.mpRecoil);
		if (equip.mpRecoilEval != "") this.mpRecoil.push(equip.mpRecoilEval);
		if (equip.tpRecoil != "") this.tpRecoil.push(equip.tpRecoil);
		if (equip.tpRecoilEval != "") this.tpRecoil.push(equip.tpRecoilEval);
		this.recoilAdd += equip.recoilAdd;
		this.recoilMult *= equip.recoilMult;
		if (!this.recoilNull) this.recoilNull = equip.recoilNull;
		if (!this.healRecoilNull) this.healRecoilNull = equip.healRecoilNull;
	}
	//Gets actor's states
	var stateList = this.states();
	//Gets the modifiers from the base actor's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].recoil != "") this.recoil.push($dataStates[id].recoil);
		if ($dataStates[id].recoilEval != "") this.recoil.push($dataStates[id].recoilEval);
		if ($dataStates[id].mpRecoil != "") this.mpRecoil.push($dataStates[id].mpRecoil);
		if ($dataStates[id].mpRecoilEval != "") this.mpRecoil.push($dataStates[id].mpRecoilEval);
		if ($dataStates[id].tpRecoil != "") this.tpRecoil.push($dataStates[id].tpRecoil);
		if ($dataStates[id].tpRecoilEval != "") this.tpRecoil.push($dataStates[id].tpRecoilEval);
		this.recoilAdd += $dataStates[id].recoilAdd;
		this.recoilMult *= $dataStates[id].recoilMult;
		if (!this.recoilNull) this.recoilNull = $dataStates[id].recoilNull;
		if (!this.healRecoilNull) this.healRecoilNull = $dataStates[id].healRecoilNull;
	}
};

//Same as above, but for enemies
Game_Enemy.prototype.getRecoilStuff = function() {
	//Gets the modifiers from the base actor
	var id = this.enemyId();
	if ($dataEnemies[id].recoil != "") this.recoil.push($dataEnemies[id].recoil);
	if ($dataEnemies[id].recoilEval != "") this.recoil.push($dataEnemies[id].recoilEval);
	if ($dataEnemies[id].mpRecoil != "") this.mpRecoil.push($dataEnemies[id].mpRecoil);
	if ($dataEnemies[id].mpRecoilEval != "") this.mpRecoil.push($dataEnemies[id].mpRecoilEval);
	if ($dataEnemies[id].tpRecoil != "") this.tpRecoil.push($dataEnemies[id].tpRecoil);
	if ($dataEnemies[id].tpRecoilEval != "") this.tpRecoil.push($dataEnemies[id].tpRecoilEval);
	this.recoilAdd += $dataEnemies[id].recoilAdd;
	this.recoilMult *= $dataEnemies[id].recoilMult;
	this.recoilNull = $dataEnemies[id].recoilNull;
	this.healRecoilNull = $dataEnemies[id].healRecoilNull;
	this.recoilMsg = $dataEnemies[id].recoilMsg;
	this.recoilMpMsg = $dataEnemies[id].recoilMpMsg;
	this.recoilTpMsg = $dataEnemies[id].recoilTpMsg;
	this.recoilHealMsg = $dataEnemies[id].recoilHealMsg;
	this.recoilHealMpMsg = $dataEnemies[id].recoilHealMpMsg;
	this.recoilHealTpMsg = $dataEnemies[id].recoilHealTpMsg;
	//Gets enemy's states
	var stateList = this.states();
	//Gets the modifiers from the base actor's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		if ($dataStates[id].recoil != "") this.recoil.push($dataStates[id].recoil);
		if ($dataStates[id].recoilEval != "") this.recoil.push($dataStates[id].recoilEval);
		if ($dataStates[id].mpRecoil != "") this.mpRecoil.push($dataStates[id].mpRecoil);
		if ($dataStates[id].mpRecoilEval != "") this.mpRecoil.push($dataStates[id].mpRecoilEval);
		if ($dataStates[id].tpRecoil != "") this.tpRecoil.push($dataStates[id].tpRecoil);
		if ($dataStates[id].tpRecoilEval != "") this.tpRecoil.push($dataStates[id].tpRecoilEval);
		this.recoilAdd += $dataStates[id].recoilAdd;
		this.recoilMult *= $dataStates[id].recoilMult;
		if (!this.recoilNull) this.recoilNull = $dataStates[id].recoilNull;
		if (!this.healRecoilNull) this.healRecoilNull = $dataStates[id].healRecoilNull;
	}
}

//Removes all the recoil modifiers so that it doesn't get repeated
Game_BattlerBase.prototype.removeRecoilStuff = function() {
	this.recoil = [];
	this.mpRecoil = [];
	this.tpRecoil = [];
	this.recoilAdd = 0;
	this.recoilMult = 1;
	this.recoilNull = false;
	this.healRecoilNull = false;
	this.recoilMsg = '';
	this.recoilMpMsg = '';
	this.recoilTpMsg = '';
	this.recoilHealMsg = '';
	this.recoilMpHealMsg = '';
	this.recoilTpHealMsg = '';
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

//Here to set for non aggressive actions
frsh_recoil_another_personal_value_set = Game_Battler.prototype.performAction;
Game_Battler.prototype.performAction = function(action) {
	frsh_recoil_another_personal_value_set.call(this);
	this.personalRecoilValues = [0, 0, 0];
};

//Simply here so that you can call the damage value of the attack in the formula
frsh_applyItemUserEffect_executeDamage = Game_Action.prototype.executeDamage ;
Game_Action.prototype.executeDamage = function(target, value) {
    frsh_applyItemUserEffect_executeDamage.call(this,target,value);
	dmgValue = value;
	this.subject().personalRecoilValues = [0, 0, 0];
};

//Function to determine logic of when personal recoil is useable
function personalRecoilEval(){
	var action = BattleManager._action
	if ((action.isForFriend() && !action.isForUser()) && !Frashaw.Param.PersonalRecoilAlly) return false;
	if (action.isForDeadFriend() && !Frashaw.Param.PersonalRecoilDAlly) return false;
	if (action.isForUser() && !Frashaw.Param.PersonalRecoilUser) return false;
	if (action.isPhysical() && !Frashaw.Param.PersonalRecoilPhysical) return false;
	if (action.isMagical() && !Frashaw.Param.PersonalRecoilMagical) return false;
	if (action.isCertainHit() && !Frashaw.Param.PersonalRecoilCertain) return false;
	return true;
}

//Extention made to show the recoil results
frsh_displayDamage_recoil = Window_BattleLog.prototype.displayDamage
Window_BattleLog.prototype.displayDamage = function(target) {
	frsh_displayDamage_recoil.call(this,target);
    if (target.result().missed == false && target.result().evaded == false){
		this.displayRecoil(target);
    }
};

//Gets the result of the eval of the recoil
function getMessageEval(evaluate, target){
	var user = BattleManager._action.subject();
	var a = BattleManager._action.subject();
	var b = target;
	var message = '';
	var value = dmgValue;
	try {
		eval(evaluate)
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = this._name + " Recoil Message Eval Error!!!!!"
		console.log(text);
		//Displays code to the console log
		console.log(evaluate || 'No Code');
		//Produces the error itself to the console
		console.error(e);
		//Checks to see if the game is in testing
		if (Utils.isOptionValid('test')){
			//Force opens the console log if it is
			require('nw.gui').Window.get().showDevTools();
		}
    }
	return message;
}

//Function to summon the specific hp message for personal recoil
function customHpMessage(target){
	var value = Math.abs(BattleManager._action.subject().personalRecoilValues[0]);
	if (BattleManager._action.subject().personalRecoilValues[0] > 0){
		if (BattleManager._action.item().recoilMsg != ""){
			var tex = BattleManager._action.item().recoilMsg;
		} else if (BattleManager._action.subject().recoilMsg != ""){
			var tex = BattleManager._action.subject().recoilMsg;
		} else {
			var tex = Frashaw.Param.RecoilMessage;
		}
	} else {
		if (BattleManager._action.item().recoilHealMsg != ""){
			var tex = BattleManager._action.item().recoilHealMsg;
		} else if (BattleManager._action.subject().recoilHealMsg != ""){
			var tex = BattleManager._action.subject().recoilHealMsg;
		} else {
			var tex = Frashaw.Param.HealRecoilMessage;
		}
	}
	if (tex.contains("1%")) tex = tex.replace("1%", BattleManager._action.subject().name());
	if (tex.contains("2%")) tex = tex.replace("2%", value);
	return tex;
}

//Function to summon the specific mp message for personal recoil
function customMpMessage(target){
	var value = Math.abs(BattleManager._action.subject().personalRecoilValues[1]);
	if (BattleManager._action.subject().personalRecoilValues[1] > 0){
		if (BattleManager._action.item().recoilMpMsg != ""){
			var tex = BattleManager._action.item().recoilMpMsg;
		} else if (BattleManager._action.subject().recoilMpMsg != ""){
			var tex = BattleManager._action.subject().recoilMpMsg;
		} else {
			var tex = Frashaw.Param.MpRecoilMessage;
		}
	} else {
		if (BattleManager._action.item().recoilMpHealMsg != ""){
			var tex = BattleManager._action.item().recoilMpHealMsg;
		} else if (BattleManager._action.subject().recoilMpHealMsg != ""){
			var tex = BattleManager._action.subject().recoilMpHealMsg;
		} else {
			var tex = Frashaw.Param.MpHealRecoilMessage;
		}
	}
	if (tex.contains("1%")) tex = tex.replace("1%", BattleManager._action.subject().name());
	if (tex.contains("2%")) tex = tex.replace("2%", value);
	return tex;
}

//Function to summon the specific tp message for personal recoil
function customTpMessage(target){
	var value = Math.abs(BattleManager._action.subject().personalRecoilValues[2]);
	if (BattleManager._action.subject().personalRecoilValues[2] > 0){
		if (BattleManager._action.item().recoilTpMsg != ""){
			var tex = BattleManager._action.item().recoilTpMsg;
		} else if (BattleManager._action.subject().recoilTpMsg != ""){
			var tex = BattleManager._action.subject().recoilTpMsg;
		} else {
			var tex = Frashaw.Param.TpRecoilMessage;
		}
	} else {
		if (BattleManager._action.item().recoilTpHealMsg != ""){
			var tex = BattleManager._action.item().recoilTpHealMsg;
		} else if (BattleManager._action.subject().recoilTpHealMsg != ""){
			var tex = BattleManager._action.subject().recoilTpHealMsg;
		} else {
			var tex = Frashaw.Param.TpHealRecoilMessage;
		}
	}
	if (tex.contains("1%")) tex = tex.replace("1%", BattleManager._action.subject().name());
	if (tex.contains("2%")) tex = tex.replace("2%", value);
	return tex;
}

//Shows the recoil post damage
Window_BattleLog.prototype.displayRecoil = function(target) {
	if (BattleManager._action.subject().personalRecoilValues[0] != 0){
		this.push('addTextRecoil', customHpMessage(target));
	}
	if (BattleManager._action.subject().personalRecoilValues[1] != 0){
		this.push('addTextRecoil', customMpMessage(target));
	}
	if (BattleManager._action.subject().personalRecoilValues[2] != 0){
		this.push('addTextRecoil', customTpMessage(target));
	}
};

//A special variation of addText so that the user can decide if they want recoils to "lag" the battle log
Window_BattleLog.prototype.addTextRecoil = function(text) {
    this._lines.push(text);
    this.refresh();
	if (Frashaw.Param.RecoilWait) this.wait();
};

//Gets the recoil result of recoil eval
Game_Action.prototype.processRecoilEval = function(code, name, target){
	if (code == '') return 0;
	var user = BattleManager._action.subject();
	var a = BattleManager._action.subject();
	var b = target;
	var value = dmgValue;
	try {
		var recoil = eval(code);
	} catch (e) {
		//Displays if an error happens
		console.log(name + " Excution Eval Error!!!!!");
		//Displays code to the console log
		console.log(code || 'No Code');
		//Produces the error itself to the console
		console.error(e);
		//Checks to see if the game is in testing
		if (Utils.isOptionValid('test')){
			//Force opens the console log if it is
			require('nw.gui').Window.get().showDevTools();
		}
    }
	return recoil;
}

//The Meat and Potatoes
frsh_applyItemUserEffect_recoil = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	frsh_applyItemUserEffect_recoil.call(this, target);
	recoilBool = false;
	personalRecoilBool = false;
	//Runs if the action is a skill and the user doesn't negate recoil and if the attack connected
	if (target.result().isHit() && $gameParty.inBattle()){
		var user = this.subject();
		var thing = this.item();
		var recoil = 0;
		recoil += this.processRecoilEval(thing.recoil, thing.name + " Recoil", target);
		recoil += this.processRecoilEval(thing.recoilEval, thing.name + " Recoil", target);
		if (personalRecoilEval()){
			for (var loop = 0; loop != user.recoil.length; loop++){
				recoil += this.processRecoilEval(user.recoil[loop], user._name + " Recoil", target);
			}
		}
		if (recoil > 0) recoil += user.recoilAdd;
		if (recoil > 0) recoil *= user.recoilMult;
		recoil = Math.round(recoil);
		if (recoil > 0) {
			if (!user.recoilNull){ 
				user.gainHp(-recoil);
				user.personalRecoilValues[0] = recoil;
			}
		} else if (recoil < 0){
			if (!user.healRecoilNull){ 
				user.gainHp(-recoil);
				user.personalRecoilValues[0] = recoil;
			}
		} else {
			user.personalRecoilValues[0] = 0;
		}
		var recoil = 0;
		recoil += this.processRecoilEval(thing.mpRecoil, thing.name + " Mp Recoil", target);
		recoil += this.processRecoilEval(thing.mpRecoilEval, thing.name + " Mp Recoil", target);
		if (personalRecoilEval()){
			for (var loop = 0; loop != user.mpRecoil.length; loop++){
				recoil += this.processRecoilEval(user.mpRecoil[loop], user._name + " Mp Recoil", target);
			}
		}
		if (recoil > 0) recoil += user.recoilAdd;
		if (recoil > 0) recoil *= user.recoilMult;
		recoil = Math.round(recoil);
		if (recoil > 0) {
			if (!user.recoilNull){ 
				user.gainMp(-recoil);
				user.personalRecoilValues[1] = recoil;
			}
		} else if (recoil < 0){
			if (!user.healRecoilNull){ 
				user.gainMp(-recoil);
				user.personalRecoilValues[1] = recoil;
			}
		} else {
			user.personalRecoilValues[1] = 0;
		}
		var recoil = 0;
		recoil += this.processRecoilEval(thing.tpRecoil, thing.name + " Tp Recoil", target);
		recoil += this.processRecoilEval(thing.tpRecoilEval, thing.name + " Tp Recoil", target);
		if (personalRecoilEval()){
			for (var loop = 0; loop != user.tpRecoil.length; loop++){
				recoil += this.processRecoilEval(user.tpRecoil[loop], user._name + " Tp Recoil", target);
			}
		}
		if (recoil > 0) recoil += user.recoilAdd;
		if (recoil > 0) recoil *= user.recoilMult;
		recoil = Math.round(recoil);
		if (recoil > 0) {
			if (!user.recoilNull){ 
				user.gainTp(-recoil);
				user.personalRecoilValues[2] = recoil;
			}
		} else if (recoil < 0) {
			if (!user.healRecoilNull){ 
				user.gainTp(-recoil);
				user.personalRecoilValues[2] = recoil;
			}
		} else {
			user.personalRecoilValues[2] = 0;
		}
	}
};
})();
//=============================================================================
// End of File
//=============================================================================
