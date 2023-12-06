//=============================================================================
// FRSH_StatSwap
// FRSH_StatSwap.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.SSwap = true;

var Frashaw = Frashaw || {};
Frashaw.SSwap = Frashaw.SSwap || {};

/*:
* @plugindesc Allows the ability to swap an actor/enemy's swaps with another.
* @author Frashaw27
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Classes, Weapons, Armors, and States:
* Term List: Max Hp, Max Mp, Attack, Defense, Magic Attack, Magic Defense, 
* Agility, Luck 
* Short Terms: Mhp, Mmp, Atk, Def, Mat, Mdf, Agi, Luk
* Use the above in place of *term* and *shortTerm* repectively to decide 
* which stats to swap.
*  
* <Swap *term1* And *term2*|swap*shortTerm1**shortTerm2*>: Put this is in
* the respective place, with the *term* and *shortTerm* replace with the
* respective terms above to swap the respective stats.
* ===Introduction=============================================================
* In Persona Q: Shadow of the Labyrinth (and probably other games in the 
* Etrian Oddessy series), there was equipment that allowed you to swap two
* different stats when equipped. So I did that here.
* ===How to Use===============================================================
* Plug and play: just insert the above notetags where needed and it should 
* work.
* ===Change Log===============================================================
* Version 1.0 (12/06/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function() {

//Sets the things to get from the Classes, Weapons, Armors, and States
var FrshSSwapLoaded = false;
FrshSSwapLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshSSwapLoaded_database.call(this)) return false; 
	if (FrshSSwapLoaded == false) {
		this.processSwaps($dataClasses);
		this.processSwaps($dataWeapons);
		this.processSwaps($dataArmors);
		this.processSwaps($dataStates);
		FrshSSwapLoaded = true;
	}
	return true;
};

//A global variable to automate the process of getting swaps a bit
var labels = ["MHP", "MMP", "ATK", "DEF", "MAT", "MDF", "AGI", "LUK"];

//Sets said swap checks
DataManager.processSwaps = function(group) {
	var string = "";
	var note1A = /<(?:SWAP MAX HP AND MAX MP|swapMHPMMP)>/i;
	var note1B = /<(?:SWAP MAX HP AND ATTACK|swapMHPATK)>/i;
	var note1C = /<(?:SWAP MAX HP AND DEFENSE|swapMHPDEF)>/i;
	var note1D = /<(?:SWAP MAX HP AND MAGIC ATTACK|swapMHPMAT)>/i;
	var note1E = /<(?:SWAP MAX HP AND MAGIC DEFENSE|swapMHPMDF)>/i;
	var note1F = /<(?:SWAP MAX HP AND AGILITY|swapMHPAGI)>/i;
	var note1G = /<(?:SWAP MAX HP AND LUCK|swapMHPLUK)>/i;
	var note2A = /<(?:SWAP MAX MP AND MAX HP|swapMMPMHP)>/i;
	var note2B = /<(?:SWAP MAX MP AND ATTACK|swapMMPATK)>/i;
	var note2C = /<(?:SWAP MAX MP AND DEFENSE|swapMMPDEF)>/i;
	var note2D = /<(?:SWAP MAX MP AND MAGIC ATTACK|swapMMPMAT)>/i;
	var note2E = /<(?:SWAP MAX MP AND MAGIC DEFENSE|swapMMPMDF)>/i;
	var note2F = /<(?:SWAP MAX MP AND AGILITY|swapMMPAGI)>/i;
	var note2G = /<(?:SWAP MAX MP AND LUCK|swapMMPLUK)>/i;
	var note3A = /<(?:SWAP ATTACK AND MAX HP|swapATKMHP)>/i;
	var note3B = /<(?:SWAP ATTACK AND MAX MP|swapATKMMP)>/i;
	var note3C = /<(?:SWAP ATTACK AND DEFENSE|swapATKDEF)>/i;
	var note3D = /<(?:SWAP ATTACK AND MAGIC ATTACK|swapATKMAT)>/i;
	var note3E = /<(?:SWAP ATTACK AND MAGIC DEFENSE|swapATKMDF)>/i;
	var note3F = /<(?:SWAP ATTACK AND AGILITY|swapATKAGI)>/i;
	var note3G = /<(?:SWAP ATTACK AND LUCK|swapATKLUK)>/i;
	var note4A = /<(?:SWAP DEFENSE AND MAX HP|swapDEFMHP)>/i;
	var note4B = /<(?:SWAP DEFENSE AND MAX MP|swapDEFMMP)>/i;
	var note4C = /<(?:SWAP DEFENSE AND ATTACK|swapDEFATK)>/i;
	var note4D = /<(?:SWAP DEFENSE AND MAGIC ATTACK|swapDEFMAT)>/i;
	var note4E = /<(?:SWAP DEFENSE AND MAGIC DEFENSE|swapDEFMDF)>/i;
	var note4F = /<(?:SWAP DEFENSE AND AGILITY|swapDEFAGI)>/i;
	var note4G = /<(?:SWAP DEFENSE AND LUCK|swapDEFLUK)>/i;
	var note5A = /<(?:SWAP MAGIC ATTACK AND MAX HP|swapMATMHP)>/i;
	var note5B = /<(?:SWAP MAGIC ATTACK AND MAX MP|swapMATMMP)>/i;
	var note5C = /<(?:SWAP MAGIC ATTACK AND ATTACK|swapMATATK)>/i;
	var note5D = /<(?:SWAP MAGIC ATTACK AND DEFENSE|swapMATDEF)>/i;
	var note5E = /<(?:SWAP MAGIC ATTACK AND MAGIC DEFENSE|swapMATMDF)>/i;
	var note5F = /<(?:SWAP MAGIC ATTACK AND AGILITY|swapMATAGI)>/i;
	var note5G = /<(?:SWAP MAGIC ATTACK AND LUCK|swapMATLUK)>/i;
	var note6A = /<(?:SWAP MAGIC DEFENSE AND MAX HP|swapMDFMHP)>/i;
	var note6B = /<(?:SWAP MAGIC DEFENSE AND MAX MP|swapMDFMMP)>/i;
	var note6C = /<(?:SWAP MAGIC DEFENSE AND ATTACK|swapMDFATK)>/i;
	var note6D = /<(?:SWAP MAGIC DEFENSE AND DEFENSE|swapMDFDEF)>/i;
	var note6E = /<(?:SWAP MAGIC DEFENSE AND MAGIC ATTACK|swapMDFMAT)>/i;
	var note6F = /<(?:SWAP MAGIC DEFENSE AND AGILITY|swapMDFAGI)>/i;
	var note6G = /<(?:SWAP MAGIC DEFENSE AND LUCK|swapMDFLUK)>/i;
	var note7A = /<(?:SWAP AGILITY AND MAX HP|swapAGIMHP)>/i;
	var note7B = /<(?:SWAP AGILITY AND MAX MP|swapAGIMMP)>/i;
	var note7C = /<(?:SWAP AGILITY AND ATTACK|swapAGIATK)>/i;
	var note7D = /<(?:SWAP AGILITY AND DEFENSE|swapAGIDEF)>/i;
	var note7E = /<(?:SWAP AGILITY AND MAGIC ATTACK|swapAGIMAT)>/i;
	var note7F = /<(?:SWAP AGILITY AND MAGIC DEFENSE|swapAGIMDF)>/i;
	var note7G = /<(?:SWAP AGILITY AND LUCK|swapAGILUK)>/i;
	var note8A = /<(?:SWAP LUCK AND MAX HP|swapLUKMHP)>/i;
	var note8B = /<(?:SWAP LUCK AND MAX MP|swapLUKMMP)>/i;
	var note8C = /<(?:SWAP LUCK AND ATTACK|swapLUKATK)>/i;
	var note8D = /<(?:SWAP LUCK AND DEFENSE|swapLUKDEF)>/i;
	var note8E = /<(?:SWAP LUCK AND MAGIC ATTACK|swapLUKMAT)>/i;
	var note8F = /<(?:SWAP LUCK AND MAGIC DEFENSE|swapLUKMDF)>/i;
	var note8G = /<(?:SWAP LUCK AND AGILITY|swapLUKAGI)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		for (var loop = 0; loop != 8; loop++){
			for (var pool = 0; pool != 8; pool++){
				if (loop == pool) continue;
				eval("obj.swap" + labels[loop] + labels[pool] + " = undefined");
			}
		}

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			//Max Hp
			if (line.match(note1A)) {
				obj.swapMHPMMP = true;
			} else if (line.match(note1B)) {
				obj.swapMHPATK = true;
			} else if (line.match(note1C)) {
				obj.swapMHPDEF = true;
			} else if (line.match(note1D)) {
				obj.swapMHPMAT = true;
			} else if (line.match(note1E)) {
				obj.swapMHPMDF = true;
			} else if (line.match(note1F)) {
				obj.swapMHPAGI = true;
			} else if (line.match(note1G)) {
				obj.swapMHPLUCK = true;
			//Max Mp
			} else if (line.match(note2A)) {
				obj.swapMMPMHP = true;
			} else if (line.match(note2B)) {
				obj.swapMMPATK = true;
			} else if (line.match(note2C)) {
				obj.swapMMPDEF = true;
			} else if (line.match(note2D)) {
				obj.swapMMPMAT = true;
			} else if (line.match(note2E)) {
				obj.swapMMPMDF = true;
			} else if (line.match(note2F)) {
				obj.swapMMPAGI = true;
			} else if (line.match(note2G)) {
				obj.swapMMPLUK = true;
			//Attack
			} else if (line.match(note3A)) {
				obj.swapATKMHP = true;
			} else if (line.match(note3B)) {
				obj.swapATKMMP = true;
			} else if (line.match(note3C)) {
				obj.swapATKDEF = true;
			} else if (line.match(note3D)) {
				obj.swapATKMAT = true;
			} else if (line.match(note3E)) {
				obj.swapATKMDF = true;
			} else if (line.match(note3F)) {
				obj.swapATKAGI = true;
			} else if (line.match(note3G)) {
				obj.swapATKLUK = true;
			//Defense
			} else if (line.match(note4A)) {
				obj.swapDEFMHP = true;
			} else if (line.match(note4B)) {
				obj.swapDEFMMP = true;
			} else if (line.match(note4C)) {
				obj.swapDEFATK = true;
			} else if (line.match(note4D)) {
				obj.swapDEFMAT = true;
			} else if (line.match(note4E)) {
				obj.swapDEFMDF = true;
			} else if (line.match(note4F)) {
				obj.swapDEFAGI = true;
			} else if (line.match(note4G)) {
				obj.swapDEFLUK = true;
			//Magic Attack
			} else if (line.match(note5A)) {
				obj.swapMATMHP = true;
			} else if (line.match(note5B)) {
				obj.swapMATMMP = true;
			} else if (line.match(note5C)) {
				obj.swapMATATK = true;
			} else if (line.match(note5D)) {
				obj.swapMATDEF = true;
			} else if (line.match(note5E)) {
				obj.swapMATMDF = true;
			} else if (line.match(note5F)) {
				obj.swapMATAGI = true;
			} else if (line.match(note5G)) {
				obj.swapMATLUK = true;
			//Magic Defense
			} else if (line.match(note6A)) {
				obj.swapMDFMHP = true;
			} else if (line.match(note6B)) {
				obj.swapMDFMMP = true;
			} else if (line.match(note6C)) {
				obj.swapMDFATK = true;
			} else if (line.match(note6D)) {
				obj.swapMDFDEF = true;
			} else if (line.match(note6E)) {
				obj.swapMDFMAT = true;
			} else if (line.match(note6F)) {
				obj.swapMDFAGI = true;
			} else if (line.match(note6G)) {
				obj.swapMDFLUK = true;
			//Agility
			} else if (line.match(note7A)) {
				obj.swapAGIMHP = true;
			} else if (line.match(note7B)) {
				obj.swapAGIMMP = true;
			} else if (line.match(note7C)) {
				obj.swapAGIATK = true;
			} else if (line.match(note7D)) {
				obj.swapAGIDEF = true;
			} else if (line.match(note7E)) {
				obj.swapAGIMAT = true;
			} else if (line.match(note7F)) {
				obj.swapAGIMDF = true;
			} else if (line.match(note7G)) {
				obj.swapAGILUK = true;
			//Luck
			} else if (line.match(note8A)) {
				obj.swapLUKMHP = true;
			} else if (line.match(note8B)) {
				obj.swapLUKMMP = true;
			} else if (line.match(note8C)) {
				obj.swapLUKATK = true;
			} else if (line.match(note8D)) {
				obj.swapLUKDEF = true;
			} else if (line.match(note8E)) {
				obj.swapLUKMAT = true;
			} else if (line.match(note8F)) {
				obj.swapLUKMDF = true;
			} else if (line.match(note8G)) {
				obj.swapLUKAGI = true;
			}
		}
	}
};

//Gets the swaps of an actor
Game_Actor.prototype.getSwaps = function() {
	var id = this._classId;
	for (var loop = 0; loop != 8; loop++){
		for (var pool = 0; pool != 8; pool++){
			if (loop == pool) continue;
			eval("if ($dataClasses[id].swap" + labels[loop] + labels[pool] + " != null) this.swap" + labels[loop] + labels[pool] + " = true");
		}
	}
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		for (var loop = 0; loop != 8; loop++){
			for (var pool = 0; pool != 8; pool++){
				if (loop == pool) continue;
				eval("if (equip.swap" + labels[loop] + labels[pool] + " != null) this.swap" + labels[loop] + labels[pool] + " = true");
			}
		}
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var pool = 0; pool != 8; pool++){
			if (loop == pool) continue;
			eval("if ($dataStates[id].swap" + labels[loop] + labels[pool] + " != null) this.swap" + labels[loop] + labels[pool] + " = true");
		}
	}
};

//Same as above, but for enemies
Game_Enemy.prototype.getSwaps = function() {
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		for (var pool = 0; pool != 8; pool++){
			if (loop == pool) continue;
			eval("if ($dataStates[id].swap" + labels[loop] + labels[pool] + " != null) this.swap" + labels[loop] + labels[pool] + " = true");
		}
	}
}

//Removes all swaps so that it doesn't get repeated
Game_BattlerBase.prototype.removeSwaps = function() {
	for (var loop = 0; loop != 8; loop++){
		for (var pool = 0; pool != 8; pool++){
			if (loop == pool) continue;
			eval("this.swap" + labels[loop] + labels[pool] + " = undefined");
		}
	}
};

//Gets and resets the swap checks
frsh_statswap_get = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_statswap_get.call(this);
	//Resets the values
	this.removeSwaps();
	//Sets the values
	this.getSwaps();
}

//An extention to have the correct swapped parameters be called
frsh_statswap_param_things = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
	if (paramId == 0){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 0) continue;
			if (eval("this.swapMHP" + labels[loop] + " != null || this.swap" + labels[loop] + "MHP != null")){
				return this.paramSpecify(loop);
			}
		}
	} else if (paramId == 1){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 1) continue;
			if (eval("this.swapMMP" + labels[loop] + " != null || this.swap" + labels[loop] + "MMP != null")){
				return this.paramSpecify(loop);
			}
		}
	} else if (paramId == 2){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 2) continue;
			if (eval("this.swapATK" + labels[loop] + " != null || this.swap" + labels[loop] + "ATK != null")){
				return this.paramSpecify(loop);
			}
		}
	} else if (paramId == 3){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 3) continue;
			if (eval("this.swapDEF" + labels[loop] + " != null || this.swap" + labels[loop] + "DEF != null")){
				return this.paramSpecify(loop);
			}
		}
	} else if (paramId == 4){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 4) continue;
			if (eval("this.swapMAT" + labels[loop] + " != null || this.swap" + labels[loop] + "MAT != null")){
				return this.paramSpecify(loop);
			}
		}
	} else if (paramId == 5){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 5) continue;
			if (eval("this.swapMDF" + labels[loop] + " != null || this.swap" + labels[loop] + "MDF != null")){
				return this.paramSpecify(loop);
			}
		}
	}
	if (paramId == 6){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 6) continue;
			if (eval("this.swapAGI" + labels[loop] + " != null || this.swap" + labels[loop] + "AGI != null")){
				return this.paramSpecify(loop);
			}
		}
	}
	if (paramId == 7){
		for (var loop = 0; loop != 8; loop++){
			if (loop == 7) continue;
			if (eval("this.swapLUK" + labels[loop] + " != null || this.swap" + labels[loop] + "LUK != null")){
				return this.paramSpecify(loop);
			}
		}
	}
    return frsh_statswap_param_things.call(this, paramId);
};

//A function to call a specific parameter's value
Game_BattlerBase.prototype.paramSpecify = function(paramId) {
    var value = this.paramBase(paramId) + this.paramPlus(paramId);
    value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
    var maxValue = this.paramMax(paramId);
    var minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};

})();

//=============================================================================
// End of File
//=============================================================================