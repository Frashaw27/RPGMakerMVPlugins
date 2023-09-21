//=============================================================================
// FRSH_SkillScriptEval
// FRSH_SkillScriptEval.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.SSEval = true;

var Frashaw = Frashaw || {};
Frashaw.SSEval = Frashaw.SSEval || {};

/*:
* @plugindesc Allows the ability to run an eval when the skill name is drawn.
* @author Frashaw27
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Skills:
* Skill Eval: <skillEval|Skill Eval></skillEval|Skill Eval> *put the code 
* between these the /-less and the / versions, Use a, A, user, or actor for
* the current actor the skill is used for.
* ===Introduction=============================================================
* One day, I had the thought of making skills that change based on your 
* equipment. I got it working, but the way I did was up to my standard/it 
* had the potential to not work, so I made this as a way to streamline that
* process while not intruding on others. 
* ===How to Use===============================================================
* Insert the above notetags into the skill, and they will run when the skill
* name is drawn. This can be used for various effects, the intended one being
* changing the skills's properties when under certain conditions.
* ===Change Log===============================================================
* Version 1.0 (09/21/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function() {
//A function to run the skill eval setting at launch
var FrshSSEvalLoaded = false;
FrshSSEvalLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshSSEvalLoaded_database.call(this)) return false; 
	if (FrshSSEvalLoaded == false) {
		this.processGetEvals($dataSkills);
		FrshSSEvalLoaded = true;
	}
	return true;
};

//A function to set the evals of the skills with skill evals
DataManager.processGetEvals = function(group) {
	var string = "";
	var note1 = /<(?:Skill Eval|skillEval)>/i;
	var note2 = /<\/(?:Skill Eval|skillEval)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.skillEval = "";

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				mode = "eval";
			} else if (line.match(note2)){
				mode = "none";
			} else if (mode == "eval"){
				obj.skillEval += line;
			}
		}
	}
};

//Evaluates the skill eval
Window_SkillList.prototype.evalSkill = function (skill){
	var user = this._actor;
	var a = user;
	var A = user;
	var actor = user;
	try {
		eval(skill.skillEval);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = skill.name + " Skill Eval Evaluate Error!!!!!"
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
}

//Checks to see if the skill has an eval to run, does so if it does
frsh_sseval_do_things = Window_SkillList.prototype.drawItem;
Window_SkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill.skillEval != ""){
	   this.evalSkill(skill);
	}
	frsh_sseval_do_things.call(this, index);
};

})();

//=============================================================================
// End of File
//=============================================================================
