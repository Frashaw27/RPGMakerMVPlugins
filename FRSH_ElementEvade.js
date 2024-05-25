//=============================================================================
// FRSH_ElementEvade
// FRSH_ElementEvade.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.elemEvade = true;

var Frashaw = Frashaw || {};
Frashaw.elemEvade = Frashaw.elemEvade || {};

/*:
* @plugindesc Allows you to control specicific elemental evasion rates on things.
* @author Frashaw27
*
* @param elementNumber
* @text Number of Elements
* @type number
* @desc Input the number of elements that are in your game.
* @min 1
*
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* States:
* <(element id) Element Evade|elemEvade: number> - Adds the inputed number of
* evasion to the element when the attack is of that element. Make sure to
* use decimal or else everything will be 100% dodge rate.
* ===Introduction=============================================================
* A friend wanted this. so i made it in like an hour 
* ===How to Use===============================================================
* Plugin and Play, just input the number of elements and your ready to
* start implamenting it into your game via the notetags.
* ===Change Log===============================================================
* Version 1.0.0 (05/25/24) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_ElementEvade');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.elementNumber = Number(Parameters.elementNumber);

//Sets up various variables for use
var FrshElmEvadeLoaded = false;
var times = Frashaw.Param.elementNumber;

//Starts the function to intialize all the evasion notetags
FrshElmEvade_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshElmEvade_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshElmEvadeLoaded == false) {
		this.processElmentalEvades($dataActors);
		this.processElmentalEvades($dataClasses);
		this.processElmentalEvades($dataWeapons);
		this.processElmentalEvades($dataArmors);
		this.processElmentalEvades($dataStates);
		this.processElmentalEvades($dataEnemies);
		//Make sure it doesn't run twice
		FrshElmEvadeLoaded = true;
	}
	return true;
};

//Does the processing
DataManager.processElmentalEvades = function(group) {
	//Loads up the string to check for
	var note = /<(.*)(?: Element Evade|elemEvade):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		obj.elemEvade = [0];
		for (var i = 0; i != times; i++){ obj.elemEvade.push(0); }

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
				obj.elemEvade[Number(RegExp.$1)] += Number(RegExp.$2);
			}
		}
  }
}

//Resets and then gets the elemental evade rates
frsh_elmevade_getvalues = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_elmevade_getvalues.call(this);
	//Resets the values
	this.elemEvade = [0];
	for (var i = 0; i != times; i++){ this.elemEvade.push(0); }
	//Sets the values
	this.getElementEvasions();
}

//Gets the various values from the equipment, class, states, and actor themselves for evade rates
Game_Actor.prototype.getElementEvasions = function() {
	var id = this.actorId();
	for (var loop = 0; loop != times; loop++){
		this.elemEvade[loop] += $dataActors[id].elemEvade[loop];
	}
	var id = this._classId;
	for (var loop = 0; loop != times; loop++){
		this.elemEvade[loop] += $dataClasses[id].elemEvade[loop];
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		for (var loop = 0; loop != times; loop++){
			this.elemEvade[loop] += equip.elemEvade[loop];
		}
	}
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != times; loop++){
			this.elemEvade[loop] += $dataStates[id].elemEvade[loop];
		}
	}
};

//Gets teh states and enemy themselves for the evade rates
Game_Enemy.prototype.getElementEvasions = function() {
	var id = this.enemyId();
	for (var loop = 0; loop != times; loop++){
		this.elemEvade[loop] += $dataEnemies[id].elemEvade[loop];
	}
	var stateList = this.states();
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var loop = 0; loop != times; loop++){
			this.elemEvade[loop] += $dataStates[id].elemEvade[loop];
		}
	}
};

//Uses a varitayion of elementsMaxRate to determine which element a -1 element would take
Game_Action.prototype.elementsBestRate = function(target, elements) {
    var array = [];
	//Goes through each element and makes a mini array that puts the id and corresponding rate
	//into a bigger array
	for (var loop = 0; loop != elements.length; loop++){
		array.push([elements[loop], target.elementRate(elements[loop])])
	}
	//Sorts the smaller array by the highest to lowest
	array.sort(function(a, b){
		return b[1] - a[1];
	})
	//Returns with the new first element type
	return array[0][0];
};

//An overwrite of the basic evasion script to make this work
Game_Action.prototype.itemEva = function(target) {
	//Checks to see if the attack is certain or not, not allowign evasion fluxations if it is
    if (!this.isCertainHit()) {
		//Determiens if skill is physical or magical, and sets for their respective dodges
        var rate = (this.isPhysical()) ? target.eva : target.mev;
		//Checks to see if the element is above 0
		if (this.item().damage.elementId > 0){
			//Adds the evasion rate if yes
			rate += target.elemEvade[this.item().damage.elementId];
		} else {
			//Adds the best normal attack element evasion rate if yes
			var id = this.elementsBestRate(target, this.subject().attackElements());
			rate += target.elemEvade[id];
		}
		//Returns the rate
		return rate;
    } else {
		//If skill is certain hit
        return 0;
    }
};
})();
//=============================================================================
// End of File
//=============================================================================