//=============================================================================
// FRSH_SkillScriptEval
// FRSH_SkillScriptEval.js
// Version: 1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.SSEval = true;

var Frashaw = Frashaw || {};
Frashaw.SSEval = Frashaw.SSEval || {};

/*:
* @author Frashaw27
* @plugindesc Run a piece of script when a skill/item's name is drawn.
* 
* @help 
* ==Notetags====================================================================
* | = either one works
* Non-case sensitive
* Skills:
* Skill Eval: <skillEval|Skill Eval></skillEval|Skill Eval> *put the code 
* between these the /-less and the / versions, Use a, A, user, or actor for
* the current actor the skill is used for.
* ===Introduction===============================================================
* One day, I had the thought of making skills that change based on your 
* equipment. I got it working, but the way I did was up to my standard/it 
* had the potential to not work, so I made this as a way to streamline that
* process while not intruding on others. 
* ===How to Use=================================================================
* Insert the above notetags into the skill, and they will run when the skill
* name is drawn. This can be used for various effects, the intended one being
* changing the skills's properties when under certain conditions.
* ===Change Log===================================================================
* Version 1.1.0 (08/06/2026):
* -Updated the visuals for this portion of the plugin to better fit the current
* standard
* -Added Evals to Items, Weapons, and Armors
* -Changed the way the evals work
*
* Version 1.0.1 (09/25/2023):
* -Added a fix makes the error log show the correct code when an eval error 
* happens
*
* Version 1.0 (09/21/2023):
* -Finished Base Plugin
* ================================================================================
*/
//================================================================================

(function() {
//A function to run the skill eval setting at launch
var FrshSSEvalLoaded = false;
FrshSSEvalLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshSSEvalLoaded_database.call(this)) return false; 
	if (FrshSSEvalLoaded == false) {
		this.processGetEvals($dataSkills);
		this.processGetEvals2($dataItems);
		this.processGetEvals2($dataWeapons);
		this.processGetEvals2($dataArmors);
		FrshSSEvalLoaded = true;
	}
	return true;
};

//A function to set the evals of Skills
DataManager.processGetEvals = function(group) {
	var string = "";
	var note1 = /<Skill[ ]?Eval>/i;
	var note2 = /<\/Skill[ ]?Eval>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.itemEval = "";

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				mode = "eval";
			} else if (line.match(note2)){
				mode = "none";
			} else if (mode == "eval"){
				obj.itemEval += line + "\n";
			}
		}
	}
};

//A function to set the evals of Items
DataManager.processGetEvals2 = function(group) {
	var string = "";
	var note1 = /<Item[ ]?Eval>/i;
	var note2 = /<\/Item[ ]?Eval>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.itemEval = "";

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				mode = "eval";
			} else if (line.match(note2)){
				mode = "none";
			} else if (mode == "eval"){
				obj.itemEval += line + "\n";
			}
		}
	}
};

//Evaluates the item eval
itemScriptEval = function (item, actor){
	var user = actor;
	var a = user;
	var A = user;
	var skill = item;
	try {
		eval(item.itemEval);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = item.name + " Eval Evaluate Error!!!!!"
		console.log(text);
		//Displays code to the console log
		console.log(item.itemEval || 'No Code');
		//Produces the error itself to the console
		console.error(e);
		//Checks to see if the game is in testing
		if (Utils.isOptionValid('test')){
			//Force opens the console log if it is
			require('nw.gui').Window.get().showDevTools();
		}
    }
}

//Checks to see if the Skill has an eval to run, does so if it does
frsh_sseval_skill_list_draw = Window_SkillList.prototype.drawItem;
Window_SkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill.itemEval != ""){
	   itemScriptEval(skill, this._actor);
	}
	frsh_sseval_skill_list_draw.call(this, index);
};

//Checks to see if the Item in Items needs to be evaluated
frsh_sseval_item_list_draw = Window_ItemList.prototype.drawItem;
Window_ItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item != null && item.itemEval != ""){
	   itemScriptEval(item, this._actor);
	}
	frsh_sseval_item_list_draw.call(this, index);
};

//Checks to see if the Weapons and Armors from Equipment needs to be Evaluated
frsh_sseval_equip_list_draw = Window_EquipSlot.prototype.drawItem;
Window_EquipSlot.prototype.drawItem = function(index) {
    var item = this.item();
    if (item != null && item.itemEval != ""){
	   itemScriptEval(item, this._actor);
	}
	frsh_sseval_equip_list_draw.call(this, index);
};

//Checks to see if the Equipment in the Slots needs to be evaluated
frsh_sseval_equip_list_draw2 = Window_EquipSlot.prototype.drawItemName;
Window_EquipSlot.prototype.drawItemName = function(item, x, y, width) {
    if (item != null && item.itemEval != ""){
	   itemScriptEval(item, this._actor);
	}
	frsh_sseval_equip_list_draw2.call(this, item, x, y, width);
};
})();
//=============================================================================
// End of File
//=============================================================================
