//=============================================================================
// FRSH_CallMetaValues
// FRSH_CallMetaValues.js
// Version: 1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.CMValues = true;

var Frashaw = Frashaw || {};
Frashaw.CMValues = Frashaw.CMValues || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows Maker to get a collective of a meta value, easily! 
*
* @param numbLabels
* @text Number Labels
* @type text
* @desc Put the name(s) of the labels that you want to collect a number of, seperated by a ",". Ex: (yes,no,maybe).
* @default
*
* @param percLabels
* @text Percent Labels
* @type text
* @desc Put the name(s) of the labels that you want to collect a number of, and the converted into a percentage.
* @default
*
* @param boolLabels
* @text Boolean Labels
* @type text
* @desc Put the name(s) of the labels that you want to collect a true/false of, seperated by a ",". Ex: (yes,no,maybe).
* @default
*
* @param textLabels
* @text Text Labels
* @type text
* @desc Put the name(s) of the labels that you want to collect a string of, seperated by a ",". Ex: (yes,no,maybe).
* @default
*
* @help
* ==Notetags==================================================================
* Actor, Enemy, Class, Weapons, Armors, States:
* <(label): (desired value for label)>
* ===Introduction=============================================================
* There's a lot you can do with meta values in RPG Maker, however they're 
* often hard to match together naturally as there is no direct way to do 
* that. This plugin aims to do that for Actors and Enemies, giving them
* all the info of a meta data label that they have on their person.
* (Actors: Themselves, Class, Weapons, Armors, States)
* (Enemies: Themselves, States)
* This way you can get those values together without having to craft a 
* method for them with script calls.
* ===How to Use===============================================================
* Setup the desired labels in the desired sections and then just input the
* labels and data value into the notetags, at which point the plugin will
* auto compile them for your use.
* ===Change Log===============================================================
* Version 1.1.0 (02/26/34) :
* -Rewrote plugin to be more efficent and remove bugs
* -All base value calls now result in:
*  -0 for number values
*  -1 for percentile values
*  -false for bool values
*  -"" for text values
* -Removed the option to make thse bases be undefined as it would've been more
* trouble then it was worth
* -Removed a potential bug where the code may not work if there was a space 
* starting out a meta label
*
* Version 1.0.3 (02/16/34) :
* -Removed method that caused passive states to double up on calls
*
* Version 1.0.2 (07/14/23) :
* -Removed a method that crashed Yanfly_PartySystem
*
* Version 1.0.1 (07/13/23) :
* -Changed the percent "initalizer" to be 1 instead of 0 if the value is 
* empty
*
* Version 1.0 (05/03/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_CallMetaValues');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.numbLabels = (Parameters.numbLabels != '') ? labelMaker(Parameters.numbLabels) : [];
Frashaw.Param.percLabels = (Parameters.percLabels != '') ? labelMaker(Parameters.percLabels) : [];
Frashaw.Param.boolLabels = (Parameters.boolLabels != '') ? labelMaker(Parameters.boolLabels) : [];
Frashaw.Param.textLabels = (Parameters.textLabels != '') ? labelMaker(Parameters.textLabels) : [];

function labelMaker(string){
	array = string.split(",");
	array.forEach(function(x, i){ 
		if (x[0] == " "){ 
			array[i] = x.replace(" ","");
		}
	});
	return array;
}

var numbLabels = Frashaw.Param.numbLabels;
var percLabels = Frashaw.Param.percLabels;
var boolLabels = Frashaw.Param.boolLabels;
var textLabels = Frashaw.Param.textLabels;

//A section of code designed to go through each weapon, armor, actor, enemy, and state and get their respective
//values
var FrshCMValuesLoaded = false;
FrshCMValuesLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshCMValuesLoaded_database.call(this)) return false; 
	if (FrshCMValuesLoaded == false) {
		this.processMetaThings($dataActors);
		this.processMetaThings($dataClasses);
		this.processMetaThings($dataWeapons);
		this.processMetaThings($dataArmors);
		this.processMetaThings($dataStates);
		FrshCMValuesLoaded = true;
	}
	return true;
};

//A function to sets the vaious custom meta values for call
DataManager.processMetaThings = function(group) {
	var noteNumb = [];
	var notePerc = [];
	var noteBool = [];
	var noteText = [];
	if (numbLabels.length != 0) numbLabels.forEach(function(i){ eval("noteNumb.push(new RegExp(`<${i}:[ ](.*)>`, 'i'))") });
	if (percLabels.length != 0) percLabels.forEach(function(i){ eval("notePerc.push(new RegExp(`<${i}:[ ](.*)>`, 'i'))") });
	if (boolLabels.length != 0) boolLabels.forEach(function(i){ eval("noteBool.push(new RegExp(`<${i}>`, 'i'))") });
	if (textLabels.length != 0) textLabels.forEach(function(i){ eval("noteText.push(new RegExp(`<${i}:[ ](.*)>`, 'i'))") });
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		if (numbLabels.length != 0){
			numbLabels.forEach(function(i){ eval("obj." + i + " = 0") })
		}
		if (percLabels.length != 0){
			percLabels.forEach(function(i){ eval("obj." + i + " = 1") })
		}
		if (boolLabels.length != 0){
			boolLabels.forEach(function(i){ eval("obj." + i + " = false") })
		}
		if (textLabels.length != 0){
			textLabels.forEach(function(i){ eval("obj." + i + ' = ""') });
		}

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (noteNumb.length != 0){
				for(var loop = 0; loop != noteNumb.length; loop++){
					if (line.match(noteNumb[loop])) eval("obj." + numbLabels[loop] + ' += Number(RegExp.$1)');
				}
			}
			if (notePerc.length != 0){
				for(var loop = 0; loop != notePerc.length; loop++){
					if (line.match(notePerc[loop])) eval("obj." + percLabels[loop] + ' *= Number(RegExp.$1)');
				}
			}
			if (noteBool.length != 0){
				for(var loop = 0; loop != noteBool.length; loop++){
					if (line.match(noteBool[loop])) eval("obj." + boolLabels[loop] + ' = true');
				}
			}
			if (noteText.length != 0){
				for(var loop = 0; loop != noteText.length; loop++){
					if (line.match(noteText[loop])) eval("obj." + textLabels[loop] + ' += RegExp.$1');
				}
			}
		}
	}
};

//Gets the number values for Actors
Game_Actor.prototype.getNumStuff = function() {
	var user = this;
	var id = user.actorId();
	numbLabels.forEach(function(i){ eval("user." + i + " += $dataActors[id]." + i) });
	var id = user._classId;
	numbLabels.forEach(function(i){ eval("user." + i + " += $dataClasses[id]." + i) });
	for (var i = 0; i != user.equips().length; i++){
		var equip = user.equips()[i];
		if (equip == null) continue;
		numbLabels.forEach(function(x){ eval("user." + x + " += equip." + x) });
	}
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		numbLabels.forEach(function(x){ eval("user." + x + " += $dataStates[id]." + x) });
	}
};

//Gets the percentive values for Actors
Game_Actor.prototype.getPercStuff = function() {
	var user = this;
	var id = user.actorId();
	percLabels.forEach(function(i){ eval("user." + i + " *= $dataActors[id]." + i) });
	var id = user._classId;
	percLabels.forEach(function(i){ eval("user." + i + " *= $dataClasses[id]." + i) });
	for (var i = 0; i != user.equips().length; i++){
		var equip = user.equips()[i];
		if (equip == null) continue;
		percLabels.forEach(function(x){ eval("user." + x + " *= equip." + x) });
	}
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		percLabels.forEach(function(x){ eval("user." + x + " *= $dataStates[id]." + x) });
	}
};

//Gets the bool values for Actors
Game_Actor.prototype.getBoolStuff = function() {
	var user = this;
	var id = user.actorId();
	boolLabels.forEach(function(i){ eval("user." + i + " = $dataActors[id]." + i) });
	var id = user._classId;
	boolLabels.forEach(function(i){ eval("if (!user." + i + ") user." + i + " = $dataClasses[id]." + i) });
	for (var i = 0; i != user.equips().length; i++){
		var equip = user.equips()[i];
		if (equip == null) continue;
		boolLabels.forEach(function(x){ eval("if (!user." + x + ") user." + x + " = equip." + x) });
	}
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		boolLabels.forEach(function(x){ eval("if (!user." + x + ") user." + x + " = $dataStates[id]." + x) });
	}
};

//Gets the text values for Actors
Game_Actor.prototype.getTextStuff = function() {
	var user = this;
	var id = user.actorId();
	percLabels.forEach(function(i){ eval("user." + i + " += $dataActors[id]." + i) });
	var id = user._classId;
	percLabels.forEach(function(i){ eval("user." + i + " += $dataClasses[id]." + i) });
	for (var i = 0; i != user.equips().length; i++){
		var equip = user.equips()[i];
		if (equip == null) continue;
		percLabels.forEach(function(x){ eval("user." + x + " += equip." + x) });
	}
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		percLabels.forEach(function(x){ eval("user." + x + " += $dataStates[id]." + x) });
	}
};

//===========================================================================================

//Gets the number values for Enemies
Game_Enemy.prototype.getNumStuff = function() {
	var user = this;
	var id = user.enemyId();
	numbLabels.forEach(function(i){ eval("user." + i + " += $dataEnemies[id]." + i) });
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		numbLabels.forEach(function(x){ eval("user." + x + " += $dataStates[id]." + x) });
	}
};

//Gets the percentive values for Enemies
Game_Enemy.prototype.getPercStuff = function() {
	var user = this;
	var id = user.enemyId();
	percLabels.forEach(function(i){ eval("user." + i + " *= $dataEnemies[id]." + i) });
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		percLabels.forEach(function(x){ eval("user." + x + " *= $dataStates[id]." + x) });
	}
};

//Gets the bool values for Enemies
Game_Enemy.prototype.getBoolStuff = function() {
	var user = this;
	var id = user.enemyId();
	boolLabels.forEach(function(i){ eval("user." + i + " = $dataEnemies[id]." + i) });
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		boolLabels.forEach(function(x){ eval("if (!user." + x + ") user." + x + " = $dataStates[id]." + x) });
	}
};

//Gets the text values for Enemies
Game_Enemy.prototype.getTextStuff = function() {
	var user = this;
	var id = user.enemyId();
	percLabels.forEach(function(i){ eval("user." + i + " += $dataEnemies[id]." + i) });
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		percLabels.forEach(function(x){ eval("user." + x + " += $dataStates[id]." + x) });
	}
};

//===========================================================================================

//Resets the values back to undefined so that a continuous build up doesn't happen and things
//don't linger after they're removed 
Game_BattlerBase.prototype.removeStuff = function(){
	var user = this;
	numbLabels.forEach(function(i){ eval("user." + i + " = 0") });
	percLabels.forEach(function(i){ eval("user." + i + " = 1") });
	boolLabels.forEach(function(i){ eval("user." + i + " = false") });
	textLabels.forEach(function(i){ eval("user." + i + " = ''") });
}

//Calls all the the gets stuffs and the remove stuffs
frsh_bbase_refresh_cmvalues = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_bbase_refresh_cmvalues.call(this);
	this.removeStuff();
	//Checks to see if the label length is 0, skipping it if it is
	if (numbLabels.length != 0) this.getNumStuff();
	if (percLabels.length != 0) this.getPercStuff();
	if (boolLabels.length != 0) this.getBoolStuff();
	if (textLabels.length != 0) this.getTextStuff();
}
})();
//=============================================================================
// End of File
//=============================================================================
