//=============================================================================
// FRSH_Recoil
// FRSH_Recoil.js
// Version: 1.2.0
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
* @help
* ==Notetags==================================================================
* <either of these|syntaxesWorks>
* Skills/Items:
* <recoil: insert formula here>: Enables Recoil on skill, assessing based on 
* formula (you can still add stuff like 500 and it'd work).
* <Recoil Eval|recoilEval></Recoil Eval|recoilEval>: Put code inbetween
* these to run when using recoil. Use "recoil" as the variable to return
* the amount of recoil that'll end up with.
* <Recoil Message|recoilMsg: insert message here>: Replaces the standard 
* recoil message with a different one.
* <Recoil Message Eval|recoilMsgEval></Recoil Message Eval|recoilMsgEval>:
* Put code in-between these two to evaluate the message you want. Use 'message'
* as the variable to return the message you want to use. Follows the same 
* rules as normal messages.
* Actors and Enemies: 
* <Recoil Message|recoilMsg: insert message here>: Replaces the all other
* recoil messages for this one.
* Actors, Enemies, Classes, Weapons, Armors, and States:
* <recoil: insert formula here>: Enables Recoil that activates on all 
* skills* regardless if they have Recoil or not, adding on to Recoil
* if it does happen on the skill.
* <Recoil Eval|recoilEval></Recoil Eval|recoilEval>: Same thing as above, but
* you can use more complext logic for it. Can't use Target/B in their evals
* like Skills can. Also can't use Value. use "recoil" for the value returned.
* <recoilAdd: insert number here>: Adds/Subtracts from the Recoil
* Damage.
* <recoilMult: insert number here>: Multiplies Recoil Damage
* <recoilNull>: Causes Recoil to not run
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
*
* Message Hierarchy/Prority of Use: User Message -> Skill Message Eval ->
* Skill Message (normal) -> Default Recoil Message
* ===Change Log===============================================================
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
if (Parameters.perRecoilMod === "true"){
	Frashaw.Param.PersonalRecoilMods = true;
} else {
	Frashaw.Param.PersonalRecoilMods = false;
}
if (Parameters.recPhys === "true"){
	Frashaw.Param.PersonalRecoilPhysical = true;
} else {
	Frashaw.Param.PersonalRecoilPhysical = false;
}
if (Parameters.recMag === "true"){
	Frashaw.Param.PersonalRecoilMagical = true;
} else {
	Frashaw.Param.PersonalRecoilMagical = false;
}
if (Parameters.recCert === "true"){
	Frashaw.Param.PersonalRecoilCertain = true;
} else {
	Frashaw.Param.PersonalRecoilCertain = false;
}
if (Parameters.recAlly === "true"){
	Frashaw.Param.PersonalRecoilAlly = true;
} else {
	Frashaw.Param.PersonalRecoilAlly = false;
}
if (Parameters.recDAlly === "true"){
	Frashaw.Param.PersonalRecoilDeadAlly = true;
} else {
	Frashaw.Param.PersonalRecoilDeadAlly = false;
}
if (Parameters.recSelf === "true"){
	Frashaw.Param.PersonalRecoilUser = true;
} else {
	Frashaw.Param.PersonalRecoilUser = false;
}
if (Parameters.recoilessMsg === "true"){
	Frashaw.Param.RecoillessMessage = true;
} else {
	Frashaw.Param.RecoillessMessage = false;
}

//Some variable setting
var recoilMsg = Frashaw.Param.RecoilMessage;
var recoilMessage = "";
var dmgValue = 0;
var recoilValue = 0;
var recoilBool = false;
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
		this.processRecoilNotetagsB($dataActors);
		this.processRecoilNotetagsC($dataActors);
		this.processRecoilNotetagsB($dataClasses);
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
	var note2 = /<(?:RECOIL MESSAGE|recoilMsg):[ ]+(.*?)>/i;
	var noteA = /<(?:RECOIL EVAL|recoilEval)>/i;
	var noteB = /<\/(?:RECOIL EVAL|recoilEval)>/i;
	var noteC = /<(?:RECOIL MESSAGE EVAL|recoilMsgEval)>/i;
	var noteD = /<\/(?:RECOIL MESSAGE EVAL|recoilMsgEval)>/i;
	var noteE = /<(?:ALWAYS SHOW RECOIL MESSAGE|alwaysRecoilMsg)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
			
		//Initalizes the shit for these various conditions
		var customMode = 'none';
		obj.recoil = '';
		obj.recoilMsg = '';
		obj.recoilEva = '';
		obj.recoilMsgEval = '';
		obj.alwaysRecoilMsg = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.recoil = RegExp.$1;
			} else if (line.match(note2)) {
				obj.recoilMsg = RegExp.$1;
			//For the start of the recoil eval
			} else if (line.match(noteA)) {
				customMode = 'recoil';
			//For the end of the message eval
			} else if (line.match(noteB)){
				customMode = 'none';
			//For the start of the message eval
			} else if (line.match(noteC)) {
				customMode = 'message';
			//For the end of the message eval
			} else if (line.match(noteD)){
				customMode = 'none';
			} else if (line.match(noteE)){
				obj.alwaysRecoilMsg = true;
			//For the summon enter message
			} else if (customMode === 'recoil') {
				obj.recoilEva = obj.recoilEva + line + '\n';
			} else if (customMode === 'message') {
				obj.recoilMsgEval = obj.recoilMsgEval + line + '\n';
			}
		}
	}
}

//Does the processing for Actors, Classes, Enemies, Weapons, and Armors
DataManager.processRecoilNotetagsB = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:RECOIL):[ ]+(.*?)>/i;
	var noteA = /<(?:RECOIL EVAL|recoilEva)>/i;
	var noteB = /<\/(?:RECOIL EVAL|recoilEva)>/i;
	var note2 = /<(?:RECOIL ADD|recoilAdd):[ ](\d+)>/i;
	var note3 = /<(?:RECOIL MULT|recoilMult):[ ](\d+)>/i;
	var note4 = /<(?:RECOIL Null|recoilNull)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
			
		//Initalizes the shit for these various conditions
		var customMode = 'none';
		obj.recoil = '';
		obj.recoilEva = '';
		obj.recoilAdd = 0;
		obj.recoilMult = 1;
		obj.recoilNull = false;

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
			} else if (line.match(noteA)) {
				customMode = 'recoil';
			//For the end of the message eval
			} else if (line.match(noteB)){
				customMode = 'none';
			//For the summon enter message
			} else if (customMode === 'recoil') {
				obj.recoilEva = obj.recoilEva + line + '\n';
			}
			
		}
	}
}

//Does the processing for the Actors and Enemies
DataManager.processRecoilNotetagsC = function(group) {
	//Loads up various strings to check for
	var note = /<(?:RECOIL MESSAGE|recoilMsg):[ ]+(.*?)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
			
		//Initalizes the shit for these various conditions
		obj.recoilMsg = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
				obj.recoilMsg = RegExp.$1;
			}
		}
	}
}

//Gets the results of the passive recoil eval 
Game_BattlerBase.prototype.getRecoilEval = function(evaluate){
	if (evaluate == '') return '';
	var recoil = '';
	var user = this;
	var a = this;
	try {
		eval(evaluate)
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = this._name + " Passive Recoil Eval Error!!!!!"
		console.log(text);
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
	return " + " + recoil;
}

//Gets all the modifiers for Recoil with actors
Game_Actor.prototype.getRecoilStuff = function() {
	//Gets the modifiers from the base actor
	this.recoil = $dataActors[this.actorId()].recoil;
	this.recoil += this.getRecoilEval($dataActors[this.actorId()].recoilEva);
	this.recoilAdd = $dataActors[this.actorId()].recoilAdd;
	this.recoilMult = $dataActors[this.actorId()].recoilMult;
	this.recoilNull = $dataActors[this.actorId()].recoilNull;
	this.recoilMsg = $dataActors[this.actorId()].recoilMsg; 
	//Gets the modifiers from the classe of the actor
	var id = this._classId;
	this.recoil += $dataClasses[id].recoil;
	this.recoil += this.getRecoilEval($dataClasses[id].recoilEva);
	this.recoilAdd += $dataClasses[id].recoilAdd;
	this.recoilMult *= $dataClasses[id].recoilMult;
	if (this.recoilNull != true){
		this.recoilNull = $dataClasses[id].recoilNull;
	}
	//Checks each equip the actor has
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		//Gets the modifiers from the actor's equipment
		this.recoil += equip.recoil;
		this.recoil += this.getRecoilEval(equip.recoilEva);
		this.recoilAdd += equip.recoilAdd;
		this.recoilMult *= equip.recoilMult;
		if (this.recoilNull != true){
			this.recoilNull = equip.recoilNull;
		}
	}
	//Gets actor's states
	var stateList = this.states();
	//Tacks on passive stats as well, if applicable
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	//Gets the modifiers from the base actor's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.recoil += $dataStates[id].recoil;
		this.recoil += this.getRecoilEval($dataStates[id].recoilEva);
		this.recoilAdd += $dataStates[id].recoilAdd;
		this.recoilMult *= $dataStates[id].recoilMult;
		if (this.recoilNull != true){
			this.recoilNull = $dataStates[id].recoilNull;
		}
	}
};

//Same as above, but for enemies
Game_Enemy.prototype.getRecoilStuff = function() {
	//Gets the modifiers from the base enemy
	this.recoil = $dataEnemies[this.enemyId()].recoil;
	this.recoil += this.getRecoilEval($dataEnemies[this.enemyId()].recoilEva);
	this.recoilAdd = $dataEnemies[this.enemyId()].recoilAdd;
	this.recoilMult = $dataEnemies[this.enemyId()].recoilMult;
	this.recoilNull = $dataEnemies[this.enemyId()].recoilNull;
	this.recoilMsg = $dataEnemies[this.enemyId()].recoilMsg; 
	//Gets enemy's states
	var stateList = this.states();
	//Tacks on passive stats as well, if applicable
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	//Gets the modifiers from the base enemy's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.recoil += $dataStates[id].recoil;
		this.recoil += this.getRecoilEval($dataStates[id].recoilEva);
		this.recoilAdd += $dataStates[id].recoilAdd;
		this.recoilMult *= $dataStates[id].recoilMult;
		if (this.recoilNull != true){
			this.recoilNull = $dataStates[id].recoilNull;
		}
	}
}

//Removes all the recoil modifiers so that it doesn't get repeated
Game_BattlerBase.prototype.removeRecoilStuff = function() {
	//Determines what 4 modifiers that will be reset 
	var labels = ['recoil', 'recoilAdd', 'recoilMult', 'recoilNull', 'recoilMsg'];
	for(var loop = 0; loop != 5; loop++){
		//Sets the modifier to undefined
		var text = "this." + labels[loop] + " = undefined";
		var bool = eval(text);
	}
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

//Simply here so that you can call the damage value of the attack in the formula
frsh_applyItemUserEffect_executeDamage = Game_Action.prototype.executeDamage ;
Game_Action.prototype.executeDamage = function(target, value) {
    frsh_applyItemUserEffect_executeDamage.call(this,target,value);
	dmgValue = value;
};

//Function to determine logic of when personal recoil is useable
function personalRecoilEval(action){
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
	try {
		eval(evaluate)
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = this._name + " Recoil Message Eval Error!!!!!"
		console.log(text);
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
	return message;
}

//Function to go through the messages to get the desired one
//Hierarchy: User -> Item Eval -> Item Base -> Normal Recoil Message
function customMessage(target){
	if (BattleManager._action.subject().recoilMsg != ''){
		var tex = BattleManager._action.subject().recoilMsg;
	} else if (BattleManager._action.item().recoilMsg != '' || BattleManager._action.item().recoilMsgEval != ''){
		if (BattleManager._action.item().recoilMsgEval != ''){
			var tex = getMessageEval(BattleManager._action.item().recoilMsgEval, target);
		} 
		if (BattleManager._action.item().recoilMsgEval == '' || (tex == null || tex == '')) var tex = BattleManager._action.item().recoilMsg;
	} else if (Frashaw.Param.RecoilMessage != null){
		var tex = Frashaw.Param.RecoilMessage;
	}
	if (tex.contains("1%")) tex = tex.replace("1%", BattleManager._action.subject().name());
	if (tex.contains("2%")) tex = tex.replace("2%", recoilValue);
	return tex;
}


//Shows the recoil post damage
Window_BattleLog.prototype.displayRecoil = function(target) {
	if (recoilBool || BattleManager._action.item().alwaysRecoilMsg){
		this.push('addText', customMessage(target));
	}
};

//Gets the recoil result of recoil eval
Game_Action.prototype.processRecoilEval = function(evaluate, target){
	if (evaluate == '') return '';
	var user = BattleManager._action.subject();
	var a = BattleManager._action.subject();
	var b = target;
	var recoil = '';
	try {
		eval(evaluate)
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = this._name + " Recoil Excution Eval Error!!!!!"
		console.log(text);
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
	if (recoil != ''){
		return " + " + recoil;
	} else {
		return '';
	}
}

//The Meat and Potatoes
frsh_applyItemUserEffect_recoil = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	frsh_applyItemUserEffect_recoil.call(this, target);
	recoilBool = false;
	//Runs if the action is a skill and the user doesn't negate recoil and if the attack connected
	if (!this.subject().recoilNull && target.result().isHit()){
		//Checks for recoil on the skill
		if (this.item().recoil != '' || this.item().recoilEva != ''){
			//Setsup some terms
			var user = this.subject();
			var a = this.subject();
			var b = target;
			var value = dmgValue;
			//Gets recoil of the skill
			var recoil = this.item().recoil;
			recoil += this.processRecoilEval(this.item().recoilEva);
			recoil = eval(recoil);
			//Adds the recoil of the user's personal recoil
			if (this.subject().recoil != '' && personalRecoilEval(this)) var bonus = eval(this.subject().recoil);
			//Adds the recoil add modifier
			recoil += this.subject().recoilAdd;
			//Multiplies the recoil multiplier modifier
			recoil *= this.subject().recoilMult;
			//Does the same applicaptions to the bonus, personal recoil damage, but only if turned on
			if (Frashaw.Param.PersonalRecoilMods && bonus != null){
				bonus += this.subject().recoilAdd;
				bonus *= this.subject().recoilMult;
			}
			//Adds bonus damage
			if (bonus != null) recoil += bonus;
			//Rounds the damage
			recoil = Math.round(recoil);
			//Checks to see if it's both not null and above 0
			if (recoil > 0 && recoil != null){
				//Reduces user's hp by the amount
				this.subject().gainHp(-recoil);
				recoilValue = recoil;
				recoilBool = true;
			}
		//Checks to see if the user has some recoil that goes on all attacks, along with the associated checks
		//Otherwise the same
		} else if (this.subject().recoil != null && personalRecoilEval(this)){
			var user = this.subject();
			var a = this.subject();
			var b = target;
			var value = dmgValue;
			var recoil = eval(this.subject().recoil);
			if (Frashaw.Param.PersonalRecoilMods){
				recoil += this.subject().recoilAdd;
				recoil *= this.subject().recoilMult;
			}
			recoil = Math.round(recoil);
			if (recoil > 0 && recoil != null){
				this.subject().gainHp(-recoil);
				recoilValue = recoil;
				recoilBool = true;
			}
		}
	}
};
})();
//=============================================================================
// End of File
//=============================================================================
