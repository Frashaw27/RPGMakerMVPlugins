//=============================================================================
// FRSH_CallMetaValues
// FRSH_CallMetaValues.js
// Version: 1.0.0
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
* @param 
* @desc divider.
*
* @param numbBool
* @text Number False
* @type boolean
* @desc Click True or False if you want to enable setting the ungotten values to 0.
* @default false
* @default
*
* @param percBool
* @text Percent False
* @type boolean
* @desc Click True or False if you want to enable setting the ungotten values to 0.
* @default false
* @default
*
* @param boolBool
* @text Boolean False
* @type boolean
* @desc Click True or False if you want to enable setting the ungotten values to false.
* @default false
* @default
*
* @param textBool
* @text Text False
* @type boolean
* @desc Click True or False if you want to enable setting the ungotten values to ''/blank.
* @default false
* @default
*
* @param 
* @desc divider.
*
* @param percBool2
* @text Percent False
* @type boolean
* @desc Click True if you want the percent given to be added to 1; False if not.
* @default true
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
* Version 1.0 (05/03/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_CallMetaValues');
Frashaw.Param = Frashaw.Param || {};
if (Parameters.numbLabels != ''){
	Frashaw.Param.numbLabels = labelMaker(Parameters.numbLabels);
} else {
	Frashaw.Param.numbLabels = [];
}
if (Parameters.percLabels != ''){
	Frashaw.Param.percLabels = labelMaker(Parameters.percLabels);
} else {
	Frashaw.Param.percLabels = [];
}
if (Parameters.boolLabels != ''){
	Frashaw.Param.boolLabels = labelMaker(Parameters.boolLabels);
} else {
	Frashaw.Param.boolLabels = [];
}
if (Parameters.textLabels != ''){
	Frashaw.Param.textLabels = labelMaker(Parameters.textLabels);
} else {
	Frashaw.Param.textLabels = [];
}
if (Parameters.numbBool === "true"){
	Frashaw.Param.numbBool = true;
} else {
	Frashaw.Param.numbBool = false;
}
if (Parameters.percBool === "true"){
	Frashaw.Param.percBool = true;
} else {
	Frashaw.Param.percBool = false;
}
if (Parameters.boolBool === "true"){
	Frashaw.Param.boolBool = true;
} else {
	Frashaw.Param.boolBool = false;
}
if (Parameters.textBool === "true"){
	Frashaw.Param.textBool = true;
} else {
	Frashaw.Param.textBool = false;
}
if (Parameters.percBool2 === "true"){
	Frashaw.Param.percBool2 = true;
} else {
	Frashaw.Param.percBool2 = false;
}


function labelMaker(string){
	array = string.split(",");
	return array;
}

var numbLabels = Frashaw.Param.numbLabels;
var percLabels = Frashaw.Param.percLabels;
var boolLabels = Frashaw.Param.boolLabels;
var textLabels = Frashaw.Param.textLabels;

//Gets the various number values
Game_Actor.prototype.getNumStuff = function() {
	if (!$gameParty.members().includes(this)) return;
	var id = this.actorId();
	var labels = numbLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataActors[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + " = Number($dataActors[id].meta." + labels[loop] + ")");
		}
	}
	var id = this._classId;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataClasses[id].meta." + labels[loop] + " != null");
		if (bool){
			var bool2 = eval("this." + labels[loop] + " != null");
			if (bool2){
				eval("this." + labels[loop] + " += Number($dataClasses[id].meta." + labels[loop] + ")");
			} else {
				eval("this." + labels[loop] + " = Number($dataClasses[id].meta." + labels[loop] + ")");
			}
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataWeapons[id].meta." + labels[loop] + " != null");
				if (bool){
					var bool2 = eval("this." + labels[loop] + " != null");
					if (bool2){
						eval("this." + labels[loop] + " += Number($dataWeapons[id].meta." + labels[loop] + ")");
					} else {
						eval("this." + labels[loop] + " = Number($dataWeapons[id].meta." + labels[loop] + ")");
					}
				}
			}
		} else {
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataArmors[id].meta." + labels[loop] + " != null");
				if (bool){
					var bool2 = eval("this." + labels[loop] + " != null");
					if (bool2){
						eval("this." + labels[loop] + " += Number($dataArmors[id].meta." + labels[loop] + ")");
					} else {
						eval("this." + labels[loop] + " = Number($dataArmors[id].meta." + labels[loop] + ")");
					}
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				var bool2 = eval("this." + labels[loop] + " != null");
				if (bool2){
					eval("this." + labels[loop] + " += Number($dataStates[id].meta." + labels[loop] + ")");
				} else {
					eval("this." + labels[loop] + " = Number($dataStates[id].meta." + labels[loop] + ")");
				}
			}
		}
	}
	if (Frashaw.Param.numbBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = 0");
			}
		}
	}
};

//Gets the various percent values
Game_Actor.prototype.getPercStuff = function() {
	if (!$gameParty.members().includes(this)) return;
	var id = this.actorId();
	var labels = percLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataActors[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + " = Number($dataActors[id].meta." + labels[loop] + ")");
		}
	}
	var id = this._classId;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataClasses[id].meta." + labels[loop] + " != null");
		if (bool){
			var bool2 = eval("this." + labels[loop] + " != null");
			if (bool2){
				eval("this." + labels[loop] + " += Number($dataClasses[id].meta." + labels[loop] + ")");
			} else {
				eval("this." + labels[loop] + " = Number($dataClasses[id].meta." + labels[loop] + ")");
			}
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataWeapons[id].meta." + labels[loop] + " != null");
				if (bool){
					var bool2 = eval("this." + labels[loop] + " != null");
					if (bool2){
						eval("this." + labels[loop] + " += Number($dataWeapons[id].meta." + labels[loop] + ")");
					} else {
						eval("this." + labels[loop] + " = Number($dataWeapons[id].meta." + labels[loop] + ")");
					}
				}
			}
		} else {
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataArmors[id].meta." + labels[loop] + " != null");
				if (bool){
					var bool2 = eval("this." + labels[loop] + " != null");
					if (bool2){
						eval("this." + labels[loop] + " += Number($dataArmors[id].meta." + labels[loop] + ")");
					} else {
						eval("this." + labels[loop] + " = Number($dataArmors[id].meta." + labels[loop] + ")");
					}
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				var bool2 = eval("this." + labels[loop] + " != null");
				if (bool2){
					eval("this." + labels[loop] + " += Number($dataStates[id].meta." + labels[loop] + ")");
				} else {
					eval("this." + labels[loop] + " = Number($dataStates[id].meta." + labels[loop] + ")");
				}
			}
		}
	}
	for (var loop = 0; loop != length; loop++){
		var bool = eval("this." + labels[loop] + " != null");
		if (bool){
			if (Frashaw.Param.percBool2){
				eval("this." + labels[loop] + " = 1 + (this." + labels[loop] + "/100)");
			} else {
				eval("this." + labels[loop] + " = this." + labels[loop] + "/100");	
			}
		}
	}
	if (Frashaw.Param.percBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = 0");
			}
		}
	}
};

//Gets the various bool values
Game_Actor.prototype.getBoolStuff = function() {
	if (!$gameParty.members().includes(this)) return;
	var id = this.actorId();
	var labels = boolLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataActors[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + "= true");
		}
	}
	var id = this._classId;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataClasses[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + "= true");
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataWeapons[id].meta." + labels[loop] + " != null");
				if (bool){
					eval("this." + labels[loop] + "= true");
				}
			}
		} else {
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataArmors[id].meta." + labels[loop] + " != null");
				if (bool){
					eval("this." + labels[loop] + "= true");
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				eval("this." + labels[loop] + "= true");
			}
		}
	}
	if (Frashaw.Param.boolBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = false");
			}
		}
	}
};

//Gets the various text values
Game_Actor.prototype.getTextStuff = function() {
	if (!$gameParty.members().includes(this)) return;
	var id = this.actorId();
	var labels = textLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataActors[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + " = $dataActors[id].meta." + labels[loop]);
		}
	}
	var id = this._classId;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataClasses[id].meta." + labels[loop] + " != null");
		if (bool){
			var bool2 = eval("this." + labels[loop] + " != null");
			if (bool2){
				eval("this." + labels[loop] + " += $dataClasses[id].meta." + labels[loop]);
			} else {
				eval("this." + labels[loop] + " = $dataClasses[id].meta." + labels[loop]);
			}
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		if (DataManager.isWeapon(equip)){
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataWeapons[id].meta." + labels[loop] + " != null");
				if (bool){
					var bool2 = eval("this." + labels[loop] + " != null");
					if (bool2){
						eval("this." + labels[loop] + " += $dataWeapons[id].meta." + labels[loop]);
					} else {
						eval("this." + labels[loop] + " = $dataWeapons[id].meta." + labels[loop]);
					}
				}
			}
		} else {
			for (var loop = 0; loop != length; loop++){
				var bool = eval("$dataArmors[id].meta." + labels[loop] + " != null");
				if (bool){
					var bool2 = eval("this." + labels[loop] + " != null");
					if (bool2){
						eval("this." + labels[loop] + " += $dataArmors[id].meta." + labels[loop]);
					} else {
						eval("this." + labels[loop] + " = $dataArmors[id].meta." + labels[loop]);
					}
				}
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				var bool2 = eval("this." + labels[loop] + " != null");
				if (bool2){
					eval("this." + labels[loop] + " += $dataStates[id].meta." + labels[loop]);
				} else {
					eval("this." + labels[loop] + " = $dataStates[id].meta." + labels[loop]);
				}
			}
		}
	}
	if (Frashaw.Param.textBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = ''");
			}
		}
	}
};

//===========================================================================================

//Gets the various number values
Game_Enemy.prototype.getNumStuff = function() {
	var id = this.enemyId();
	var labels = percLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataEnemies[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + " = Number($dataEnemies[id].meta." + labels[loop] + ")");
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				var bool2 = eval("this." + labels[loop] + " != null");
				if (bool2){
					eval("this." + labels[loop] + " += Number($dataStates[id].meta." + labels[loop] + ")");
				} else {
					eval("this." + labels[loop] + " = Number($dataStates[id].meta." + labels[loop] + ")");
				}
			}
		}
	}
	if (Frashaw.Param.numbBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = 0");
			}
		}
	}
};

//Gets the various percent values
Game_Enemy.prototype.getPercStuff = function() {
	var id = this.enemyId();
	var labels = percLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataEnemies[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + " = Number($dataEnemies[id].meta." + labels[loop] + ")");
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				var bool2 = eval("this." + labels[loop] + " != null");
				if (bool2){
					eval("this." + labels[loop] + " += Number($dataStates[id].meta." + labels[loop] + ")");
				} else {
					eval("this." + labels[loop] + " = Number($dataStates[id].meta." + labels[loop] + ")");
				}
			}
		}
	}
	for (var loop = 0; loop != length; loop++){
		var bool = eval("this." + labels[loop] + " != null");
		if (bool){
			if (Frashaw.Param.percBool2){
				eval("this." + labels[loop] + " = 1 + (this." + labels[loop] + "/100)");
			} else {
				eval("this." + labels[loop] + " = this." + labels[loop] + "/100");	
			}
		}
	}
	if (Frashaw.Param.percBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = 0");
			}
		}
	}
};

//Gets the various bool values
Game_Enemy.prototype.getBoolStuff = function() {
	var id = this.enemyId();
	var labels = boolLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataEnemies[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + "= true");
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				eval("this." + labels[loop] + "= true");
			}
		}
	}
	if (Frashaw.Param.boolBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = false");
			}
		}
	}
};

//Gets the various text values
Game_Enemy.prototype.getTextStuff = function() {
	console.log("bee");
	var id = this.enemyId();
	var labels = textLabels;
	var length = labels.length;
	for (var loop = 0; loop != length; loop++){
		var bool = eval("$dataEnemies[id].meta." + labels[loop] + " != null");
		if (bool){
			eval("this." + labels[loop] + " = $dataEnemies[id].meta." + labels[loop]);
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	}
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != length; loop++){
			var bool = eval("$dataStates[id].meta." + labels[loop] + " != null");
			if (bool){
				var bool2 = eval("this." + labels[loop] + " != null");
				if (bool2){
					eval("this." + labels[loop] + " += $dataStates[id].meta." + labels[loop]);
				} else {
					eval("this." + labels[loop] + " = $dataStates[id].meta." + labels[loop]);
				}
			}
		}
	}
	if (Frashaw.Param.textBool){
		for (var loop = 0; loop != length; loop++){
			var bool = eval("this." + labels[loop] + " == null");
			if (bool){
				eval("this." + labels[loop] + " = ''");
			}
		}
	}
};

//===========================================================================================

//Resets the values back to undefined so that a continuous build up doesn't happen and things
//don't linger after they're removed 
Game_BattlerBase.prototype.removeStuff = function(){
	var array = [];
	if (numbLabels.length != 0) array = array.concat(numbLabels);
	if (percLabels.length != 0) array = array.concat(percLabels);
	if (boolLabels.length != 0) array = array.concat(boolLabels);
	if (textLabels.length != 0) array = array.concat(textLabels);
	if (array.length != 0){
		for (var loop = 0; loop != array.length; loop++){
			eval("this." + array[loop] + " = undefined");
		}
	}
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

//=============================================================================
// End of File
//=============================================================================