//=============================================================================
// FRSH_AddableXSParams
// FRSH_AddableXSParams.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.AXSParam = true;

var Frashaw = Frashaw || {};
Frashaw.AXSParam = Frashaw.AXSParam || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows the user to be able to change XParams or SParams.
*
* @param pAdd
* @text Percent Add?
* @type boolean
* @desc Click True or False if you want to enable auto reducing X/SParam adds by 100.
* @default true
*
* @help
* ==Script Calls==============================================================
* (target).addXParam((xparamId), (value wanting to be added/subtracted));
* (target).addSParam((sparamId), (value wanting to be added/subtracted));
* ===Introduction=============================================================
* The base of all RPG Makers seemingly doesn't give the option to add values
* directly to XParams (Crit Rate, Crit Evasion, Hit Rate, etc.) and
* SParams (Hp Regeneration, Physical Damage Rate, Experience Rate, etc.),
* instead forcing users to make states/armor if they want to change these
* values. This plugin aims to rectify that by adding a script call to
* add values to these simular to how base RPG Maker has the ability to
* directly add to normal Stat Params.
* ===How to Use===============================================================
* Use the script calls listed above to add values to the respective params.
* By default all numbers will be divided by 100 to make them %, this can
* be changed by changing the "Percent Add?" to false.
*
* X-Parameter Reference:
* 0 - Hit Rate; 1 - Evasion Rate; 2 - Critical Rate; 3 - Critical Evasion;
* 4 - Magic Evasion; 5 - Magic Reflection, 6 - Counter Attack,
* 7 - Hp Regeneration, 8 - Mp Regeneration, 9 - Tp Regeneration
*
* S-Parameter Reference:
* 0 - Target Rate; 1 - Guard Effect; 2 - Recovery Effect; 3 - Pharmacology;
* 4 - Mp Cost Rate; 5 - Tp Charge Rate; 6 - Physical Damage (Rate); 
* 7 - Magical Damage (Rate); 8 - Floor Damage (Rate); 9 - Experience (Rate)
* ===Change Log===============================================================
* Version 1.0 (03/22/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_AddableXSParams');
Frashaw.Param = Frashaw.Param || {};
if (Parameters.pAdd === "true"){
	Frashaw.Param.PercentAdd = true;
} else {
	Frashaw.Param.PercentAdd = false;
}

(function() {
	//Sets up the param pluses to be 0, to intialize them
	_frsh_paramclear = Game_BattlerBase.prototype.initMembers;
	Game_BattlerBase.prototype.initMembers = function() {
		_frsh_paramclear.call(this);
		this.clearXParamPlus();
		this.clearSParamPlus();
	};
	
	//Determines the value of xparams
	Game_BattlerBase.prototype.xparam = function(xparamId) {
		//Gets base value of the xparam
		var value = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);
		//Adds value to xparam, reducing the value by 100 if the option if left true
		if (Frashaw.Param.PercentAdd){
			value += (this._xparamPlus[xparamId]/100);
		} else { 
			value += this._xparamPlus[xparamId];
		}
		//Returns the base value + added value
		return value
	};
	
	//Command to set the add part of the x params
	Game_BattlerBase.prototype.addXParam = function(xparamId, value) {
		//sets the value to be added
		this._xparamPlus[xparamId] += value;
		this.refresh();
	};
	
	//Initalizes the xparam adds
	Game_BattlerBase.prototype.clearXParamPlus = function() {
		this._xparamPlus = [0,0,0,0,0,0,0,0,0,0];
	};
	
	Game_BattlerBase.prototype.sparam = function(sparamId) {
		//Gets base value of the sparam
		var value = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);
		//Adds value to sparam, reducing the value by 100 if the option if left true
		if (Frashaw.Param.PercentAdd){
			value += (this._sparamPlus[sparamId]/100);
		} else { 
			value += this._sparamPlus[sparamId];
		}
		//Returns the base value + added value
		return value;
	};
	
	//Command to set the add part of the s params
	Game_BattlerBase.prototype.addSParam = function(sparamId, value) {
		//sets the value to be added
		this._sparamPlus[sparamId] += value;
		this.refresh();
	};
	
	//Initalizes the sparam adds
	Game_BattlerBase.prototype.clearSParamPlus = function() {
		this._sparamPlus = [0,0,0,0,0,0,0,0,0,0];
	};
})();

//=============================================================================
// End of File
//=============================================================================