//=============================================================================
// FRSH_GoldCosts
// FRSH_GoldCosts.js
// Version: 1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.GCosts = true;

var Frashaw = Frashaw || {};
Frashaw.GCosts = Frashaw.GCosts || {};

/*:
* @plugindesc Grants the ability to determine gold costs quickly.
* @author Frashaw27
*
* @param goldShow
* @text Gold Cost Show Message
* @type text
* @desc Put the message you want to show for gold costs. Ex: xGD. Leave blank for the game's normal gold text.
* @default
*
* @param goldSize
* @text Gold Cost Size
* @type number
* @desc Put the number of the font size you want to use for the gold costs.
* @min 0
* @default 20
*
* @param goldColor
* @text Gold Cost Color
* @type number
* @desc Put the text color to change the color of the gold costs to that. For a custom hexadecimal color, use the one below.
* @max 31
* @min 0
* @default 16
*
* @param goldColorHex
* @text Gold Cost Color Hex
* @type text
* @desc Put the hexadecimal code (#000000) to change the color of the gold costs to that. For a text color, Leave this blank.
* @default
*
* @param goldIcon
* @text Gold Cost Icon
* @type number
* @desc Put the icon that will go to the right of the cost name. Put -1 to not use.
* @min -1
* @default -1
*
* @param goldAlignment
* @text Gold Cost Alignment
* @type select
* @desc Put at which end the gold cost will go on the cost arrangment. 
* @option Left
* @option Right
* @default Left
*
* @param goldPadding
* @text Gold Cost Padding
* @type number
* @desc Put the number of padding you want inbetween this cost and another.
* @min 0
* @default 4
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Skills:
* Flat Gold Cost: <Gold Cost|goldCost: x> - Replace x with the number of gold
* pieces/currency units the skill will burn on use.
* Percent Gold Cost: <Gold Percent Cost|goldPercCost: > - Same as above but 
* for a multiplier on the party's total gold instead.
* Gold Cost Eval: <Gold Cost Eval|goldCostEval></Gold Cost Eval|goldCostEval>
* - Put lines of javascript beween the two above notetags to have it evaluate
* a cost with some more customization. Use "cost" to return the cost of the
* skill. user/a/subject = user of the skill, s = switches, v = variables.
*
* Actors, Classes, Weapons, Armors, and States:
* Gold Rate: <Gold Rate|goldRate|goldCostRate: x> - Gives a multiplier to all
* gold costs the user may face.
* ===Introduction=============================================================
* While working on my game(s) I found that I liked the idea of using 
* currency as a skill cost, but fel that using Yanfly Skill Core for it was
* a bit tedious, so I made this plugin to speed that process up.
* ===How to Use===============================================================
* Insert the skill notetags into the relevent skills for the costs and set
* up the way it looks with the plugin parameters and it should be done. You
* can also add in things that mess with the gold cost with gold cost rate,
* but that is unnesscary. 
* ===Change Log===============================================================
* Version 1.0.1 (12/19/23):
* -Added a fix to not show if the cost is not defined
*
* Version 1.0 (11/29/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_GoldCosts');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.GoldCostShow = Parameters.goldShow;
Frashaw.Param.GoldCostSize = Number(Parameters.goldSize);
Frashaw.Param.GoldCostColor = Number(Parameters.goldColor);
Frashaw.Param.GoldCostColorHex = Parameters.goldColorHex;
Frashaw.Param.GoldCostIcon = Number(Parameters.goldIcon);
Frashaw.Param.GoldCostAlignment = Parameters.goldAlignment
Frashaw.Param.GoldCostPad = Number(Parameters.goldPadding);

var FrshGCostsLoaded = false;
FrshGCostsLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshGCostsLoaded_database.call(this)) return false; 
	if (FrshGCostsLoaded == false) {
		this.processGoldThings($dataSkills);
		this.processGoldRate($dataActors);
		this.processGoldRate($dataClasses);
		this.processGoldRate($dataWeapons);
		this.processGoldRate($dataArmors);
		this.processGoldRate($dataStates);
		FrshGCostsLoaded = true;
	}
	return true;
};

//A function to set the gold skill costs of Skills
DataManager.processGoldThings = function(group) {
	var note1 = /<(?:GOLD COST|goldCost):[ ](.*)>/i;
	var note2 = /<(?:GOLD PERCENT COST|goldPercCost):[ ](.*)>/i;
	var note3A = /<(?:GOLD COST EVAL|goldCostEval)>/i;
	var note3B = /<\/(?:GOLD COST EVAL|goldCostEval)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.goldCost = 0;
		obj.goldPercCost = 0;
		obj.goldCostEval = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.goldCost = Number(RegExp.$1);
			} else if (line.match(note2)){
				obj.goldPercCost = Number(RegExp.$1);
			} else if (line.match(note3A)){
				mode = 'eval';
			} else if (line.match(note3B)){
				mode = 'none';
			} else if (mode == "eval"){
				obj.goldCostEval += line;
			}
		}
	}
};

//A function to set the gold rate of Actors, Classes, Weapons, Armors, and States
DataManager.processGoldRate = function(group) {
	var note1 = /<(?:GOLD COST Rate|goldRate|goldCostRate):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		obj.goldRate = 1;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.goldRate = Number(RegExp.$1);
			}
		}
	}
};

//The function where the gold cost of the skill is calculated
Game_BattlerBase.prototype.goldCost = function(skill) {
	var cost = skill.goldCost;
	var item = skill;
	var a = this;
	var user = this;
	var subject = this;
	var s = $gameSwitches._data;
	var v = $gameVariables._data;
	cost += $gameParty._gold * skill.goldPercCost;
	var code = skill.goldCostEval;
	try {
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = skill.name + " Gold Cost Evaluate Error!!!!!"
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
	cost *= this.goldRate;
	return Math.round(cost);
};

//Gets the gold rate from the actor's self, class, weapons(s), armor(s), and states respectively
Game_Actor.prototype.getGoldRate = function() {
	var id = this.actorId();
	this.goldRate *= $dataActors[id].goldRate;
	var id = this._classId;
	this.goldRate *= $dataClasses[id].goldRate;
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		var id = equip.id;
		this.goldRate *= equip.goldRate;
	}
	var stateList = this.states();
	if (this._passiveStatesRaw != null){
		stateList =  stateList.concat(this.passiveStates());
	} 
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		this.goldRate *= $dataStates[id].goldRate;
	}
};

//Sets the gold rate to 1 so it doesn't infinitely stack upon itself
Game_Actor.prototype.goldCostReset = function() {
	this.goldRate = 1;
};

//Gets and resets the modifiers for the gold rate
frsh_gold_costs_rate_get = Game_Actor.prototype.refresh
Game_Actor.prototype.refresh = function(){
	frsh_gold_costs_rate_get.call(this);
	//Resets the values
	this.goldCostReset();
	//Sets the values
	this.getGoldRate();
}

//An extention to check if the number of gold the party has is enough to pay for the skill
frsh_gold_costs_cost_check = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
	if (this.goldCost(skill) > $gameParty._gold) return false;
	return frsh_gold_costs_cost_check.call(this,skill);
};

//An extention to remove the skill's gold cost if need be
frsh_gold_costs_pay = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
	if (this.goldCost(skill) != 0) $gameParty.gainGold(-this.goldCost(skill));
    frsh_gold_costs_pay.call(this, skill);
};

//Draws the gold cost if needed
frsh_gold_costs_draw_cost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, dw) {
	if (Frashaw.Param.GoldCostAlignment == 'Right'){
		if (this._actor.goldCost(skill) != 0){
			dw = this.drawGoldCost(skill, wx, wy, dw);
		}
	}
	dw = frsh_gold_costs_draw_cost.call(this, skill, wx, wy, dw);
	if (Frashaw.Param.GoldCostAlignment == 'Left'){
		if (this._actor.goldCost(skill) > 0){
			dw = this.drawGoldCost(skill, wx, wy, dw);
		}
	}
	return dw;
};

//Draws the gold skill cost
Window_SkillList.prototype.drawGoldCost = function(skill, wx, wy, dw) {
	if (this._actor.goldCost(skill) < 0) return dw; 
	this.contents.fontSize = Frashaw.Param.GoldCostSize;
	if (Frashaw.Param.GoldCostColorHex == ''){
		this.changeTextColor(this.textColor(Frashaw.Param.GoldCostColor));
	} else {
		this.changeTextColor(Frashaw.Param.GoldCostColorHex);
	}
	if (Frashaw.Param.GoldCostShow != ''){
		var text = Frashaw.Param.GoldCostShow;
	} else {
		var text = TextManager.currencyUnit;
	}
	var cost = this._actor.goldCost(skill).toString();
	//A special method to add , to each number placement (like: 1,234)
	if (cost.length > 3){
		var costInc = 0;
		cost = cost.split("").reverse()
		for (var i = 0; i != cost.length; i++){
		  if (cost[i] != ",") costInc++;
		  if (costInc == 3){
			costInc = 0;
			cost.splice(i+1, 0, ",");
		  }
		}
		cost = cost.reverse().join("");
	}
	if (Frashaw.Param.GoldCostIcon > -1) {
		var iw = wx + dw - Window_Base._iconWidth;
		this.drawIcon(Frashaw.Param.GoldCostIcon, iw, wy + 2);
		dw -= Window_Base._iconWidth + 2;
	}
	this.drawText(cost + text, wx, wy, dw, 'right');
	var returnWidth = dw - this.textWidth(cost+text) - Frashaw.Param.GoldCostPad;
	this.resetTextColor();
	this.resetFontSettings();
	return returnWidth;
};
})();
//=============================================================================
// End of File
//=============================================================================
