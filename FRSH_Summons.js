//=============================================================================
// FRSH_Summons
// FRSH_Summons.js
// Version: 1.1.1
//=============================================================================

var Imported = Imported || {};
Imported.Summons = true;

var Frashaw = Frashaw || {};
Frashaw.Summons = Frashaw.Summons || {};

/*:
* @plugindesc Allows the ability to summon actors for the battle/a # of turns.
* @author Frashaw27
*
* @param summSame
* @text Allow Same Summons(?)
* @type boolean
* @desc Click True or False if you want to allow multiples of the same summon.
* @default false
*
* @param summMax
* @text Max # of Summons
* @type number
* @desc Put the max amount of summons you want the player to be able to summon at one time. Put at 0 to have no max.
* @default 0
* @min 0
*
* @param defSummLvl
* @text Default Summon Level
* @type number
* @desc Put the default summon level you want if no level is inputted with the summon tag.
* @default 1
* @min 1
*
* @param graceTurn
* @text Allow Grace Turn?
* @type boolean
* @desc Click True or False if you want to have a grace turn between when the actor is summoned and starts loosing turns.
* @default true
*
* @param displayTurns
* @text Display Turns?
* @type boolean
* @desc Click True or False if you want to show the # of turns the summon will last in the summon message.
* @default true
*
* @param displayExclaim
* @text Display !?
* @type boolean
* @desc Click True or False if you want to show the ! at the end of the summon message.
* @default true
*
* @param defSumDeathText
* @text Default Summon Death Text
* @type text
* @desc Put the default text you want to use when a summoned ally dies. Use "%" to represent the summoned ally. Ex: "% died!".
* @default % died!
*
* @param defSumLeaveText
* @text Default Summon Leave Text
* @type text
* @desc Put the default text you want to use when a summon leaves. Use "%" to represent the summoned ally. Ex: "% left!".
* @default % left!
*
* @param defSumText
* @text Default Summon Enter Text
* @type text
* @desc Put the default text you want to use when summoning an ally. Use "%" to represent the summoned ally. Ex: "summoned %".
* @default summoned %
*
* @param showTurnsActor
* @text Display Remaining Turns?
* @type boolean
* @desc Click True or False if you want to show the actors remaining turns to the left of their name on the battle screen.
* @default true
*
* @param connector
* @text Connector of Name & Turn
* @type text
* @desc Input the symbol(s) that you want to use to connect the name and remaining turns (if shown).
* @default :
*
* @param resetOther
* @text Stack State/Buff Message?
* @type boolean
* @desc Click True or False if you want to stack the State/Buff messages or just have 1 during the Summon Battle Message.
* @default false
* 
* @help 
* ==Notetags==================================================================
* Actor:
* <Summon> - Indicates actors is a summon !Must include or Summon will Break!
* <summonEnter: ...> or <Summon Enter Message: ...> - Shows a different enter 
* message from other summons. Use % to indicate the summon's name. Summoner's 
* name will always appear at the front.
* <summonDeath: ...> or <Summon Death Message: ...> - Shows a different death 
* message from other summons. Use % to indicate the summon's name.
* <summonLeave: ...> or <Summon Leave Message: ...> - Shows a different 
* leave/summon turn up message from other summons. Use % to indicate the 
* summon's name.
* <Summon Eval></SummonEval> - Put code between these to run when actor is
* summoned.
* <Summon Leave Eval></Summon Leave Eval> - Put code between these to run
* when the actor leaves by any means.
* Skill/Item:
* <Summon: (id), (level), (turns), (big)> - First number is the id of the 
* actor summoned, Second is the level (use 0 if you want the level to be
* the same as the summoner, leave blank for default level), Third is the 
* number of Turns (set to 0 or leave blank to stay until death), Fourth
* indicates if it's a "BIG" summon or not (set to 1 to activate, put
* anything else or leave blank to not).
* <MassSummon: (level), (turns), (id)> - Same rules apply as above. You do
* need the first 2 values in, even if left at 0, in order for multiple 
* summons. Each number after second number will act as another summon.
* ===Introduction=============================================================
* In RPG Maker, there is no innate way to summon actor fluidly for a certin
* amount of turns without some extensive eventing/scripting. This plugin
* aims to solve that by automating a lot of the process. Now, another 
* developer that goes by SumRndmDude also made a Summon plugin themselves.
* While it is good to use, my version aims to solve a few of the issues I had
* with their version, mainly the lack of a way to see the # of turns 
* remaining on a summon and the lack of the ability for a "BIG" summon that
* temporarily replaces your party ala Final Fantasy X.
* ===How to Use===============================================================
* Note: That all summons will be removed upon battle end and upon death.
* 
* For any actor that is going to be used as a summon, they need to be setup
* before hand with the <Summon> notetag in their notes. This needs to be done
* to properly check if they need to be checked for removal via turns/battle 
* end. You can also use the other notetages to prepare any other essentials
* before hand.
*
* For the skill/item portion, simply put <Summon: x, x, x, x> into the 
* desired notes and start replacing the x with the corresponding numbers.
*
* x1 - The Summoned Actors's Id. Pretty self explanetory. Make sure to make
* this number a vaild actor as otherwise things will break. The only number
* required for the plugin to work, all others can be left blank and it will
* still run.
*
* x2 - The Summoned Actor's Level. Put the number here to set their level.
* If you put 0 in this slot, the summoned actor will instead use the 
* summoner's level. Leaving this blank will result in them using the default
* level determined via the plugin parameters.
*
* x3 - The Summoned Actor's # of turns they shall remain in battle. Put the
* number here for the amount of turns you want the actor to remain in the 
* battle before they leave. Leave blank/at 0 if you want them to remain
* for the length of the battle or until they die.
*
* x4 - If the Summon Actor will replace the party or not. Use 1 to indicate
* that the summon will temporarily replace the party, leave blank or at 0
* to indicate otherwise.
*
* IF you need multiple summons in one you can use <MassSummon: x, x, for that
* result for simular results. Although the format is different to 
* accomedate the potential infinite number of actors you can summon at one 
* time. 
*
* x1 - Level the summons will be at.
*
* x2 - Turns the summons will last.
*
* x3 and beyond - each one after the 2nd will add another actor to summon
* following the same rules as before. Unlike the previous one, you do need
* the first two values in place, even if they're just 0, in order for it to 
* work.
*
* When using <Summon Eval> you can use the following terms to short hand
* some code:
* The Summoner - user, summoner, a
* The Summonee - target, summonee, b
* ===Change Log===============================================================
* Version 1.1.1 (06/13/23) :
* -Added a Leave Eval for summons when they die or leave via turns
* -Fixed a bug where death message called the wrong name
*
* Version 1.1.0 (06/12/23) :
* -Added an option to allow multiple of the same summon
* -Added a way to Mass Summon several actors
*
* Version 1.0.2 (06/11/23) :
* -Added Compatibility with AntiMessage
*
* Version 1.0.1 (04/13/23) :
* -Added in code to deny item use that summon if they don't follow the 
* conditions
*
* Version 1.0 (04/13/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_Summons');
Frashaw.Param = Frashaw.Param || {};
if (Parameters.summSame === "true"){
	Frashaw.Param.SameSummon = true;
} else {
	Frashaw.Param.SameSummon = false;
}
Frashaw.Param.maxSumms = Number(Parameters.summMax);
Frashaw.Param.defaultSummLevel = Number(Parameters.defSummLvl);
if (Parameters.graceTurn === "true"){
	Frashaw.Param.GraceTurn = true;
} else {
	Frashaw.Param.GraceTurn = false;
}
if (Parameters.displayTurns === "true"){
	Frashaw.Param.displayTurns = true;
} else {
	Frashaw.Param.displayTurns = false;
}
if (Parameters.displayExclaim === "true"){
	Frashaw.Param.displayExclaim = true;
} else {
	Frashaw.Param.displayExclaim = false;
}
Frashaw.Param.defaultSummDeathText = Parameters.defSumDeathText;
Frashaw.Param.defaultSummLeaveText = Parameters.defSumLeaveText;
Frashaw.Param.defaultSummText = Parameters.defSumText;
if (Parameters.displayExclaim === "true"){
	Frashaw.Param.displayExclaim = true;
} else {
	Frashaw.Param.displayExclaim = false;
}
if (Parameters.showTurnsActor === "true"){
	Frashaw.Param.showTurnsActor = true;
} else {
	Frashaw.Param.showTurnsActor = false;
}
Frashaw.Param.ConnectSymbol = Parameters.connector;
if (Parameters.resetOther === "false"){
	Frashaw.Param.resetOther = true;
} else {
	Frashaw.Param.resetOther = false;
}

//Sets up various variables for use
var FrshSummonLoaded = false; //A bool to check if the Notetags are loaded

var id = 0; //Id of the skill.item to check if they can summon
var skill = false; //Bool to check if it's a skill or item
var otherText = []; //Text for the battle log for summon

var summonOverride = false; //An override for big summons
var summonArray = []; //The array used to house summons
var bigSummonArray = []; //The array used to house big summons
var deathGlobal = 0; //A variable to hold a summon that needs to be removed from the party

//A function that checks if the value in the array is both a value and above negative 1,
//and removes them if they're not
function isNumber(yes){
	return yes > -1;
}

//Turns all the array elements into intergers
function eacher(item, index, arr){
	arr[index] = parseInt(item);
}

//A function meant to seperate the values gotten from the summon calls
//into arrays along with removing any not used valeus
function arrayinator(yes){
	array = yes.split(",");
	array.forEach(eacher);
	array = array.filter(isNumber);
	return array;
}

//Used to better flow the big summons
function bigSummon(){
	//Add a big summon based on the global actor
	$gameParty.addBigSummon(deathGlobal);
}

//Used to better flow the removal of summons
function removeSummon(){
	//Checks if the summon override is in effect or not
	if (summonOverride){
		//If true, removes a big summon 
		$gameParty.removeBigSummon(deathGlobal);
	} else {
		//If false removes a normal summon
		$gameParty.removeSummon(deathGlobal);
	}
}

function clear(){
	//hear because it didn't want to not crash when left by itself
	SceneManager._scene._logWindow.clear();
}

//Starts the function to intialize all the summon notetags
FrshSummon_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshSummon_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshSummonLoaded == false) {
		//Processes the notetags of actors
		this.processActorNotetags($dataActors);
		//Make sure it doesn't run twice
		FrshSummonLoaded = true;
	}
	return true;
};

//Does the processing
DataManager.processActorNotetags = function(group) {
	//Loads up various strings to check for
  var note1a = /<(?:Summon Eval)>/i;
  var note1b = /<\/(?:Summon Eval)>/i;
  var note1c = /<(?:Summon Leave Eval)>/i;
  var note1d = /<\/(?:Summon Leave Eval)>/i;
  var note2 = /<(?:Summon Death Message):[ ](.*)>/i;
  var note3 = /<(?:Summon Leave Message):[ ](.*)>/i;
  var note4 = /<(?:Summon Enter Message):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the actors for these various conditions
		var customMode = 'none';
		obj.summonEval = '';
		obj.leaveEval = '';
		obj.summonDeath = '';
		obj.summonLeave = '';
		obj.summonEnter = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			//For the start of the summon eval
			if (line.match(note1a)) {
				customMode = 'summon';
			//For the end of the summon eval
			} else if (line.match(note1b)){
				customMode = 'none';
			//For starting the summon leave eval
			} else if (line.match(note1c)){
				customMode = 'death';
			//For ending the summon leave eval
			} else if (line.match(note1d)){
				customMode = 'none';
			//For the summon death message
			} else if (line.match(note2)){
				obj.summonDeath = String(RegExp.$1);
			//For the summon leave message
			} else if (line.match(note3)){
				obj.summonLeave = String(RegExp.$1);
			//For the summon leave message
			} else if (line.match(note4)){
				obj.summonEnter = String(RegExp.$1);
			//For the summon enter message
			} else if (customMode === 'summon') {
				obj.summonEval = obj.summonEval + line + '\n';
			} else if (customMode === 'death') {
				obj.leaveEval = obj.leaveEval + line + '\n';
			}
		}
  }
}

//==========================================================================================
//A function made to link the values of the $dataActors and the in-game actors
Game_Actor.prototype.summonEvalMake = function() {
	//A simple check if the summon eval was already assigned or not
    if (this.summonEval !== undefined) return this.summonEval;
	//Gets the id of the actor for more convient use
    var id = this.actorId();
	//Checks to see if the actor's note tag has the Summon tag
	var tex = eval($dataActors[id].meta.Summon != undefined);
	if (tex){
		//Assigns it true if it is
		this.summon = true;
	} else {
		//Doesn't assign it if it isn't
		this.summon = undefined;
	}
	//Checks to see if eval is not undefined and not blank
	tex = eval($dataActors[id].summonEval != undefined && $dataActors[id].summonEval != '')
	if (tex){
		//Assigns the summon eval if yes
		this.summonEval = $dataActors[id].summonEval;
	} else {
		//Doesn't assign if no
		this.summonEval = undefined;
	}
	//Checks to see if eval is not undefined and not blank
	tex = eval($dataActors[id].leaveEval != undefined && $dataActors[id].leaveEval != '')
	if (tex){
		//Assigns the leave eval if yes
		this.leaveEval = $dataActors[id].leaveEval;
	} else {
		//Doesn't assign if no
		this.leaveEval = undefined;
	}
	//Checks to see if either form of death message is available or not
	if (($dataActors[id].summonDeath != undefined && $dataActors[id].summonDeath != '') || ($dataActors[id].meta.summonDeath != undefined && $dataActors[id].meta.summonDeath != '')){
		if ($dataActors[id].summonDeath != null && $dataActors[id].summonDeath != ''){
			//Assigns the "Summon Death Message" varient
			var text = $dataActors[id].summonDeath;
		} else {
			//Assigns the "summonDeath" variant
			var text = String($dataActors[id].meta.summonDeath);
		}
		//Splits array to check to where to put the name
		var textArray = text.split("%");
		//A check to see if the name goes at the start or the middle
		if (textArray.length > 1){
			//Puts it into the middle if yes
			text = textArray[0] + this.name() + textArray[1];
		} else {
			//Puts it at the start if not
			text = this.name() + textArray[0];
		}
		//Assigns the summonDeath text
		this.summonDeath = text;
	} else {
		//Leaves unassigned if it's not available
		this.summonDeath = undefined;
	}
	//Checks to see if either form of leave message is available or not
	if (($dataActors[id].summonLeave != undefined && $dataActors[id].summonLeave != '') || ($dataActors[id].meta.summonLeave != undefined && $dataActors[id].meta.summonLeave != '')){
		if ($dataActors[id].summonLeave != null && $dataActors[id].summonLeave != ''){
			//Assigns the "Summon Leave Message" varient
			var text = $dataActors[id].summonLeave;
		} else {
			//Assigns the "summonLeave" variant
			var text = String($dataActors[id].meta.summonLeave);
		}
		//Splits array to check to where to put the name
		var textArray = text.split("%");
		//A check to see if the name goes at the start or the middle
		if (textArray.length > 1){
			//Puts it into the middle if yes
			text = textArray[0] + this.name() + textArray[1];
		} else {
			//Puts it at the start if not
			text = this.name() + textArray[0];
		}
		//Assigns the summonLeave text
		this.summonLeave = text;
	} else {
		//Leaves unassigned if it's not available
		this.summonLeave = undefined;
	}
	//Checks to see if either form of enter message is available or not
	if (($dataActors[id].summonEnter != undefined && $dataActors[id].summonEnter != '') || ($dataActors[id].meta.summonEnter != undefined && $dataActors[id].meta.summonEnter != '')){
		if ($dataActors[id].summonEnter != null && $dataActors[id].summonEnter != ''){
			//Assigns the "Summon Enter Message" varient
			var text = $dataActors[id].summonEnter;
			//Assigns a Bool for later
			var bool = true;
		} else {
			//Assigns the "summonEnter" variant
			var text = String($dataActors[id].meta.summonEnter);
			var bool = false;
		}
		//Splits array to check to where to put the name
		var textArray = text.split("%");
		//A check to see if the name goes at the end or the middle
		if (textArray.length > 1){
			//Puts it into the middle if yes
			text = textArray[0] + this.name() + textArray[1];
		} else {
			//Puts it at the end if not
			text =  textArray[0] + this.name();
		}
		//Checks to see if the bool is set to true
		if (bool){
			//If yes, it adds space at the start of the text
			var text = " " + text;
		}
		//Assigns the summonEnter text
		this.summonEnter = text;
	} else {
		//Leaves unassigned if it's not available
		this.summonEnter = undefined;
	}
};

//Makes the above function be used
frsh_summonEvalInit = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function(actorId) {
    frsh_summonEvalInit.call(this,actorId);
    this.summonEvalMake();
};

//Function to add a big summon
Game_Party.prototype.addBigSummon = function(actor) {
	//Adds actor to the big summon array
	bigSummonArray.push(actor);
	//Sets the override to true
	summonOverride = true;
};

//Function to remove a big summon
Game_Party.prototype.removeBigSummon = function(actor) {
	//Makes their turns null
	this.summonTurns = undefined;
	//Makes their turn bool undefined
	this.summonBool = undefined;
	//Removes them from the array
	bigSummonArray = bigSummonArray.filter(function (item){return item != actor});
	//Checks to see if the big summon array is empty or not
	if (bigSummonArray.length == 0){
		//Override returns to false if true
		summonOverride = false;
	}
};

//Function to summon actor
Game_Party.prototype.addSummon = function(actor) {
	//Add actor to the summon aeeay
	summonArray.push(actor);
};

//Function to remove summon
Game_Party.prototype.removeSummon = function(actor) {
	//Makes their turns null
	this.summonTurns = undefined;
	//Makes their turn bool undefined
	this.summonBool = undefined;
	//Adds a check for the leave eval
	if (actor.leaveEval != null){
		//Goes through if it exists
		actor.evaluateLeave();
	}
	//Removes them from the array
	summonArray = summonArray.filter(function (item){return item != actor});
};

//A function overwrite to make the summons appear properly
Game_Party.prototype.battleMembers = function() {
	//Checks if summon override is in effect
	if (summonOverride){
		//If true, the member list is just the big summons
		var list = bigSummonArray; 
    } else {
		//Yanfly Party System Compatibility
		if (!Imported.YEP_PartySystem){
			//Normal battle members code, except it assigns it's value to a variable instead of a
			//stright return
			var list = this.allMembers().slice(0, this.maxBattleMembers()).filter(function(actor) {
				return actor.isAppeared();
			});
		} else {
			//The code Yanfly made, but replaced a variable name with "list"
			if (this.toInitializeBattleMembers()) this.initializeBattleMembers();
			var list = [];
			for (var i = 0; i < this._battleMembers.length; ++i) {
				var actorId = this._battleMembers[i];
				if (list.length > this.maxBattleMembers()) break;
				if (actorId === null) continue;
				if (!$gameActors.actor(actorId)) continue;
				if (!$gameActors.actor(actorId).isAppeared()) continue;
				list.push($gameActors.actor(actorId));
			}
		}
		//Adds the summons to the active party
		if (summonArray.length > 0){
			//Adds the summons to the active party
			for(loop = 0; loop != summonArray.length; loop++){
				//Adds the summons to the returned list
				list.push(summonArray[loop]);
				//Checks to see if current number of summons doesn't exceed the maximum, if there is one
				if (loop == Frashaw.Param.maxSumms-1 && Frashaw.Param.maxSumms != 0){
					//ends loop prematurely if true
					break;
				}
			}
		}
	}
	return list;
};

//A function that allows us to see what the things of the skill that was just used are
frsh_isitem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	//Calls normal useItem things
	frsh_isitem.call(this,item);
	//Sets the global id
	id = item.id;
	//Checks to see if the used item is an item or a skill
	if (DataManager.isItem(item)){
		//Sets the skill bool to false if it's an item
		skill = false;
	} else {
		//Sets the skill bool to true if it's a skill
		skill = true;
	}
}

//A function made to evaluate the summoning eval of actors
Game_Battler.prototype.evaluateSummon = function(target){
	//Sets summoner shorthands
	var a = this;
	var user = this;
	var summoner = this;
	//Sets summonee shorthands
	var b = target;
	var summonee = target;
	var code = target.summonEval;
	//Sees if code will produce an error
	try {
		//Runs code, goes through if no errors
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = target._name + " Summon Eval Error!!!!!"
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

//A function made to evaluate the summoning eval of actors
Game_Battler.prototype.evaluateLeave = function(){
	//Sets summoner shorthands
	var a = this;
	var user = this;
	var summoner = this;
	var b = this;
	var code = this.leaveEval;
	console.log(code);
	//Sees if code will produce an error
	try {
		//Runs code, goes through if no errors
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = target._name + " Leave Eval Error!!!!!"
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

//Where the actual summoning happens
frsh_skillSummon = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
	//All other preformActionEnd things
	frsh_skillSummon.call(this);
	//Checks to see if the used item was a skill or item
	if (skill){
		//If skill, it checks to see if the skill had the summon tag
		if ($dataSkills[id].meta.Summon != null){
			//Gets an array for the summon tag
			var array = arrayinator($dataSkills[id].meta.Summon);
			//Checks to see if the first value is a valid id or not
			if (array[0] != null && array[0] > 0){
				//Assigns a variable to an actor based on it if it is
				var actor = $gameActors.actor(array[0]);
				//Checks to see if summon is big or normal summon
				if (array[3] != null && array[3] == 1){
					//If big summon, it sets deathGlobal to the actor for use in the function
					deathGlobal = actor;
					//Calls the bigSummon function for ease of use
					setTimeout(bigSummon,1000);
				} else {
					//Summons normal actor
					$gameParty.addSummon(actor);
				}
				//If the actor has special summon enter text, uses it
				if (actor.summonEnter != null){
					var text = actor.summonEnter;
					text = this.name() + text;
				} else {
				//Uses default otherwise
					var text = Frashaw.Param.defaultSummText;
					//Splits array to check to where to put the name
					var textArray = text.split("%");
					//A check to see if the name goes at the end or the middle
					if (textArray.length > 1){
						//Puts it into the middle if yes
						text = textArray[0] + actor.name() + textArray[1];
					} else {
						//Puts it at the end if not
						text =  textArray[0] + actor.name();
					}
					//Puts name of the summoner to the front of the message
					text = this.name() + " " + text;
				}
				//Intializes the actor
				actor.setup(array[0]);
				//Checks to see if the level portion of the array is valid
				if (array[1] != null){
					//Checks to see if the level portion is equal to 0
					if (array[1] != 0){
						//Uses the specified number as the level if not
						actor.level = array[1];
					} else {
						//Uses the summoners level as the level if it is
						actor.level = this.level;
					}
				} else {
					//Uses the summon default level if not present
					actor.level = Frashaw.Param.defaultSummLevel;
				}
				//Checks to see if the array has valid turns or not
				if (array[2] != null && array[2] > 0){
					//Sets the summons terms equal to the array value
					actor.summonTurns = array[2];
					//Sets the "mulligan" turn on if allowed
					if (Frashaw.Param.GraceTurn){
						actor.summonBool = true;
					}
					//Adds turns text if allowed
					if (Frashaw.Param.displayTurns){
					text += " for " + array[2] + " turns";
					}
				}
				//Runs the evaluation of the code if the actor has summon eval
				if (actor.summonEval != null){
					this.evaluateSummon(actor);
				}
				//If allowed, displays the exclaimnation mark at the of the battle log message
				if (Frashaw.Param.displayExclaim){
					text += "!";
				}
				//Sets the line of the previous battle logs lines, for consistancy
				SceneManager._scene._logWindow._lines = otherText;
				//Add the summon message to the battle log
				SceneManager._scene._logWindow.addText(text);
				//Adds a wait to read
				SceneManager._scene._logWindow.waitt();
				//Adds a timeout for the clear command
				setTimeout(clear, 1000);
			} else {
				//Shows an error if array[0] conditions are not met
				console.error("Summons Id's must be higher then 0");
			}
		} 
		if ($dataSkills[id].meta.massSummon != null){
			//Gets an array for the summon tag
			var array = arrayinator($dataSkills[id].meta.massSummon);
			//Checks if there's 3 or more then 3 values
			if (array.length >= 3){
				//Sets up the level
				if (array[0] != null && array[0] > 0){
					var level = array[0];
				} else {
					var level = 0;
				}
				//Sets up the turns
				if (array[1] != null && array[1] > 0){
					var turns = array[1];
				} else {
					var turns = 0;
				}
				//
				for (var loop = 2; loop != array.length; loop++){
					//Ease of access of the actor id
					var actorid = array[loop];
					//Checks to see if the actor is already in the party and if it's allowed to add another
					if ((!$gameParty.members().includes($gameActors.actor(actorid)) || Frashaw.Param.SameSummon) && (summonArray.length != Frashaw.Param.maxSumms || Frashaw.Param.maxSumms == 0)){ 
					//Checks to see if the actor is valid
					if (actorid != null && actorid > 0){
						var actor = $gameActors.actor(actorid);
						//adds actor to the party
						$gameParty.addSummon(actor);
						//Checks to see if actor has a unique summon message
						if (actor.summonEnter != null){
							var text = actor.summonEnter;
							text = this.name() + text;
						} else {
						//Uses default otherwise
							var text = Frashaw.Param.defaultSummText;
							//Splits array to check to where to put the name
							var textArray = text.split("%");
							//A check to see if the name goes at the end or the middle
							if (textArray.length > 1){
								//Puts it into the middle if yes
								text = textArray[0] + actor.name() + textArray[1];
							} else {
								//Puts it at the end if not
								text =  textArray[0] + actor.name();
							}
							//Puts name of the summoner to the front of the message
							text = this.name() + " " + text;
						}
						//Standardizes the actor
						actor.setup(actorid);
						//Checks to see if the level portion is equal to 0
						if (level != 0){
							//Uses the specified number as the level if not
							actor.level = level;
						} else {
							//Uses the summoners level as the level if it is
							actor.level = this.level;
						}
						//Gives the summons turns it can remain for
						if (turns != 0){
							//Sets the summons terms equal to the array value
							actor.summonTurns = turns;
							//Sets the "mulligan" turn on if allowed
							if (Frashaw.Param.GraceTurn){
								actor.summonBool = true;
							}
							//Adds turns text if allowed
							if (Frashaw.Param.displayTurns){
							text += " for " + turns + " turns";
							}
						}
						//Runs the evaluation of the code if the actor has summon eval
						if (actor.summonEval != null){
							this.evaluateSummon(actor);
						}
						//If allowed, displays the exclaimnation mark at the of the battle log message
						if (Frashaw.Param.displayExclaim){
							text += "!";
						}
						//Sets the line of the previous battle logs lines, for consistancy
						SceneManager._scene._logWindow._lines = otherText;
						//Add the summon message to the battle log
						SceneManager._scene._logWindow.addText(text);
					} else {
						//Error message if Id is wrong
						console.error(actorid + " isn't a valid actor summon id.");
					}
				}
				}
				//Adds a wait to read
				SceneManager._scene._logWindow.waitt();
				//Adds a timeout for the clear command
				setTimeout(clear, 1000);
			} else {
				//Error message if you don't have the needed values
				console.error("Mass Summon Requires atleast 3 values. If you only want 1 summons with less set up, choose the other method.");
			}
		}
	} else {
		if ($dataItems[id].meta.Summon != null){
			var array = arrayinator($dataItems[id].meta.Summon);
			if (array[0] != null && array[0] > 0){
				var actor = $gameActors.actor(array[0]);
				if (array[3] != null && array[3] == 1){
					deathGlobal = actor;
					setTimeout(bigSummon,1000);
				} else {
					$gameParty.addSummon(actor);
				}
				if (actor.summonEnter != null){
					var text = actor.summonEnter;
					text = this.name() + text;
					console.log(text);
				} else {
					var text = Frashaw.Param.defaultSummText;
					var textArray = text.split("%");
					if (textArray.length > 1){
						text = textArray[0] + actor.name() + textArray[1];
					} else {
						text =  textArray[0] + actor.name();
					}
					text = this.name() + " " + text;
				}
				actor.setup(array[0]);
				if (array[1] != null){
					if (array[1] != 0){
						actor.level = array[1];
					} else {
						actor.level = this.level;
					}
				} else {
					actor.level = Frashaw.Param.defaultSummLevel;
				}
				if (array[2] != null && array[2] > 0){
					actor.summonTurns = array[2];
					if (Frashaw.Param.GraceTurn){
						actor.summonBool = true;
					}
					if (Frashaw.Param.displayTurns){
					text += " for " + array[2] + " turns";
					}
				}
				if (actor.summonEval != null){
					this.evaluateSummon(actor);
				}
				if (Frashaw.Param.displayExclaim){
					text += "!";
				}
				SceneManager._scene._logWindow._lines = otherText;
				SceneManager._scene._logWindow.addText(text);
				SceneManager._scene._logWindow.waitt();
				setTimeout(clear, 1000);
			} else {
				console.error("Summons Id's must be higher then 0");
			}
		}
		if ($dataItems[id].meta.massSummon != null){
			//Gets an array for the summon tag
			var array = arrayinator($dataItems[id].meta.massSummon);
			//Checks if there's 3 or more then 3 values
			if (array.length >= 3){
				//Sets up the level
				if (array[0] != null && array[0] > 0){
					var level = array[0];
				} else {
					var level = 0;
				}
				//Sets up the turns
				if (array[1] != null && array[1] > 0){
					var turns = array[1];
				} else {
					var turns = 0;
				}
				//
				for (var loop = 2; loop != array.length; loop++){
					//Ease of access of the actor id
					var actorid = array[loop];
					//Checks to see if the actor is already in the party and if it's allowed to add another
					if ((!$gameParty.members().includes($gameActors.actor(actorid)) || Frashaw.Param.SameSummon) && (summonArray.length != Frashaw.Param.maxSumms || Frashaw.Param.maxSumms == 0)){ 
					//Checks to see if the actor is valid
					if (actorid != null && actorid > 0){
						var actor = $gameActors.actor(actorid);
						//adds actor to the party
						$gameParty.addSummon(actor);
						//Checks to see if actor has a unique summon message
						if (actor.summonEnter != null){
							var text = actor.summonEnter;
							text = this.name() + text;
						} else {
						//Uses default otherwise
							var text = Frashaw.Param.defaultSummText;
							//Splits array to check to where to put the name
							var textArray = text.split("%");
							//A check to see if the name goes at the end or the middle
							if (textArray.length > 1){
								//Puts it into the middle if yes
								text = textArray[0] + actor.name() + textArray[1];
							} else {
								//Puts it at the end if not
								text =  textArray[0] + actor.name();
							}
							//Puts name of the summoner to the front of the message
							text = this.name() + " " + text;
						}
						//Standardizes the actor
						actor.setup(actorid);
						//Checks to see if the level portion is equal to 0
						if (level != 0){
							//Uses the specified number as the level if not
							actor.level = level;
						} else {
							//Uses the summoners level as the level if it is
							actor.level = this.level;
						}
						//Gives the summons turns it can remain for
						if (turns != 0){
							//Sets the summons terms equal to the array value
							actor.summonTurns = turns;
							//Sets the "mulligan" turn on if allowed
							if (Frashaw.Param.GraceTurn){
								actor.summonBool = true;
							}
							//Adds turns text if allowed
							if (Frashaw.Param.displayTurns){
							text += " for " + turns + " turns";
							}
						}
						//Runs the evaluation of the code if the actor has summon eval
						if (actor.summonEval != null){
							this.evaluateSummon(actor);
						}
						//If allowed, displays the exclaimnation mark at the of the battle log message
						if (Frashaw.Param.displayExclaim){
							text += "!";
						}
						//Sets the line of the previous battle logs lines, for consistancy
						SceneManager._scene._logWindow._lines = otherText;
						//Add the summon message to the battle log
						SceneManager._scene._logWindow.addText(text);
					} else {
						//Error message if Id is wrong
						console.error(actorid + " isn't a valid actor summon id.");
					}
				}
				}
				//Adds a wait to read
				SceneManager._scene._logWindow.waitt();
				//Adds a timeout for the clear command
				setTimeout(clear, 1000);
			} else {
				//Error message if you don't have the needed values
				console.error("Mass Summon Requires atleast 3 values. If you only want 1 summons with less set up, choose the other method.");
			}
		}
	}
	//Resets the other text
	otherText = [];
}

//Checks to see if the summons can be summoned
frsh_summonCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
	//Gets skill id
	var id = skill.id;
	//Checks to see if if has the summon tag
	if ($dataSkills[id].meta.Summon != null){
		//Checks to see if summon capacity is at max
		if (summonArray.length == Frashaw.Param.maxSumms && Frashaw.Param.maxSumms != 0){
			//Denies use if it is
			return false;
		}
		//If it does it pulls it and puts it into an array
		var array = arrayinator($dataSkills[id].meta.Summon);
		//Checks to see if id is both above 0 and not undefined
		if (array[0] != null && array[0] > 0){
			//Checks to see if the party includes the summoned actor
			if ($gameParty.members().includes($gameActors.actor(array[0])) && !Frashaw.Param.SameSummon){
				//Denies skill use if they are
				return false;
			}
		}
	}
	if ($dataSkills[id].meta.massSummon != null){
		//Checks to see if summon capacity is at max
		if (summonArray.length == Frashaw.Param.maxSumms && Frashaw.Param.maxSumms != 0){
			//Denies use if it is
			return false;
		}
		//If it does it pulls it and puts it into an array
		var array = arrayinator($dataSkills[id].meta.massSummon);
		for (var loop = 2; loop != array.length; loop++){
			var actid = array[loop];
			//Checks to see if id is both above 0 and not undefined
			if (actid != null && actid > 0){
				//Checks to see if the party includes the summoned actor
				if ($gameParty.members().includes($gameActors.actor(actid)) && !Frashaw.Param.SameSummon){
					//Denies skill use if they are
					return false;
				}
			}
		}
	}
	//Return the normal/other cost evals if this one is true
	return frsh_summonCost.call(this,skill);
};

//Literally the same as above but for items
frsh_itemConditions = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
	var id = item.id;
	if ($dataItems[id].meta.Summon != null){
		if (summonArray.length == Frashaw.Param.maxSumms && Frashaw.Param.maxSumms != 0){
			return false;
		}
		var array = arrayinator($dataItems[id].meta.Summon);
		if (array[0] != null && array[0] > 0){
			if ($gameParty.members().includes($gameActors.actor(array[0]))){
				return false;
			}
		}
	}
    return frsh_itemConditions.call(this,item);
};

//A function to remove a summoned actor upon their death
frsh_summonDeath = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
	//Normal Die stuff
	frsh_summonDeath.call(this);
	//Checks if target is both an actor and has the summon tag
    if (this.isActor() && this.summon != null){
		//Sets the globalDeath to them
		deathGlobal = this;
		//Calls the removeSumm function
		setTimeout(removeSummon, 1000);
	}
};

//A function to run at the end of turns
frsh_summonTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
	//Checks to see if target is actor and they have summon turns
	if (this.isActor() && this.summonTurns != null){
		//Checks to see if they have their grace turn
		if (this.summonBool != null){
			//Sets grace turn to null and does nothing else if they do 
			this.summonBool = undefined;
		} else {
			//Decreases their summon turns by 1 if they don't
			this.summonTurns--;
		}
		//Checks to see if their summon turns has reached 0
		if (this.summonTurns == 0){
			//Makes their summon turns undefined
			this.summonTurns = undefined;
			if (summonOverride){
				//If summon override is active, remove a big summon
				$gameParty.removeBigSummon(this);
			} else {
				//Otherwise remove a normal summon
				$gameParty.removeSummon(this);
			}
			//Checks to see if the actor has a custom leave message
			if (this.summonLeave != null){
				//Uses it if they do
				var text = this.summonLeave;
			} else {
				//Uses default if they don't
				var text = Frashaw.Param.defaultSummLeaveText;
				//Splits array to check to where to put the name
				var textArray = text.split("%");
				//A check to see if the name goes at start end or the middle
				if (textArray.length > 1){
					//Puts it into the middle if yes
					text = textArray[0] + this.name() + textArray[1];
				} else {
					//Puts it at the start if not
					text =  this.name() + textArray[0];
				}
			}
			//Shows text in battle log
			SceneManager._scene._logWindow.addText(text);
			//Adds a wait to read
			SceneManager._scene._logWindow.waitt();
			//Adds a timeout for the clear command
			setTimeout(clear, 1000);
		}
	}
	//Normal turn end things
	frsh_summonTurnEnd.call(this);
};


//Function to run at the end of battle
frsh_battleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
	//Normal Battle End things
	frsh_battleEnd.call(this);
	//If the bigSummonArray has any values in it, this runs
	if (bigSummonArray.length > 0){
		//Goes through each summon in that array, removing them in reverse order
		for(var pool = bigSummonArray.length; pool != 0; pool--){
			//Removes them proper
			$gameParty.removeBigSummon(bigSummonArray[pool-1]);
		}
		summonOverride = false;
	}
	//If the summonArray has any values in it, this runs 
	if (summonArray.length > 0){
		//Goes through each summon in that array, removing them in reverse order
		for(var loop = summonArray.length; loop != 0; loop--){
			$gameParty.removeSummon(summonArray[loop-1]);
		} 
	}
};

//==========================================================================================
//Doesn't overwrite if ColoredNames is in the game
if (!Imported.CName){
	//Overwrites the actor's name in the battle screen to show truns
	Window_Base.prototype.drawActorName = function(actor, x, y, width) {
		//Checks to see if there are summon turns at all and they can be used
		if (actor.summonTurns != null && Frashaw.Param.showTurnsActor){
			//adds the divider
			var name = actor.summonTurns + Frashaw.Param.ConnectSymbol;
		} else {
			//Intializes name as blank
			var name = "";
		}
		//Adds in their base name
		name += actor._name;
		//Draws Name
		this.drawText(name, x, y, width);
	};
}

Window_BattleLog.prototype.waitt = function() {
	//adds a purposeful delay in the battlelog when called to sync up with the clear
	this._waitCount = 60;
};

//Acts like waitForNewLine, but adds a setter for battle log lines
Window_BattleLog.prototype.waitForNewLineOther = function() {
    var baseLine = 0;
    if (this._baseLineStack.length > 0) {
        baseLine = this._baseLineStack[this._baseLineStack.length - 1];
    }
    if (this._lines.length > baseLine) {
        this.wait();
    }
	//Gets the length of the # of lines in the battle log
	var length = SceneManager._scene._logWindow._lines.length;
	//If the battle log already has messages it stores them for later
	if (otherText.length != 0){
		var sub = otherText[0];
		otherText = [];
	}
	//Adds in all the lines from the battle log into otherText via push because a stright setting made
	//them linked which made things messy
	for (var loop = 0; loop != length; loop++){
		otherText.push(SceneManager._scene._logWindow._lines[loop]);
	}
	//Adds in the previously stored lines if there were any
	if (sub != null) otherText.push(sub);
};

//A function overwritten to include the summons death message; doesn't run if FRSH_AntiMessage is in
if (!Imported.AMessage){
Window_BattleLog.prototype.displayAddedStates = function(target) {
    target.result().addedStateObjects().forEach(function(state) {
        var stateMsg = target.isActor() ? state.message1 : state.message2;
        if (state.id === target.deathStateId()) {
            this.push('performCollapse', target);
        }
        if (stateMsg) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
			//resets the for each different state/buff message, if wanted
			if (Parameters.resetOther){
				otherText = [];
			}
			//Adds text to saved battlelog lines
			otherText.push(target.name() + stateMsg);
			//Checks to see if the current applying state is death
			if (state.id === target.deathStateId()){
				//Checks to see if target has the summon tag
				if (target.summon){
					//Checks to see if the actor has a custom death message
					if (target.summonDeath != null || target.summonDeath == ''){
						//Uses it if they do
						this.push('addText', target.summonDeath);
					} else {
						//Uses default if they don't
						var text = Frashaw.Param.defaultSummDeathText;
						//Splits array to check to where to put the name
						var textArray = text.split("%");
						//A check to see if the name goes at start end or the middle
						if (textArray.length > 1){
							//Puts it into the middle if yes
							text = textArray[0] + target.name() + textArray[1];
						} else {
							//Puts it at the start if not
							text =  target.name() + textArray[0];
						}
						this.push('addText', text);
					}
				} else {
					//Does normal message if target is not a summon
					this.push('addText', target.name() + stateMsg);
				}
			} else {
				//Does normal message if not death
				this.push('addText', target.name() + stateMsg);	
			}
            this.push('waitForEffect');
        }
    }, this);
};
}

//Purely here for getting the remove state message; doesn't run if FRSH_AntiMessage is in
if (!Imported.AMessage){
Window_BattleLog.prototype.displayRemovedStates = function(target) {
    target.result().removedStateObjects().forEach(function(state) {
        if (state.message4) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
			//Said remove state message
			if (Parameters.resetOther){
				otherText = [];
			}
			otherText.push(target.name() + state.message4);
            this.push('addText', target.name() + state.message4);
        }
    }, this);
};
}

//Purely here for getting the buff message
Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
    buffs.forEach(function(paramId) {
        this.push('popBaseLine');
        this.push('pushBaseLine');
		//Said buff message
		if (Parameters.resetOther){
			otherText = [];
		}
		otherText.push(fmt.format(target.name(), TextManager.param(paramId)));
        this.push('addText', fmt.format(target.name(), TextManager.param(paramId)));
    }, this);
};

//Determines how endAction works
Window_BattleLog.prototype.endAction = function(subject) {
	//If Battle Engine Core is imported, this doesn't run as it is run by that aswell
	if (!Imported.YEP_BattleEngineCore){
		this.push('performActionEnd', subject);
	}
	//Other end action stuff, just rearranged
	this.push('waitForNewLine');
    this.push('clear');
};

//Makes sure that it calls the alternative "waitForNewLine"; doesn't run if FRSH_AntiMessage is in
if (!Imported.AMessage){
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	//Compatibility with AntiMessage
	if (Imported.AMessage) {
		var check = checkChecker(2, "AntiActionResults");
	} else {
		check = true;
	}
	//Checks to see if the message needs to be displayed or not
	if (check){
		if (target.result().used) {
			this.push('pushBaseLine');
			this.displayCritical(target);
			this.push('popupDamage', target);
			this.push('popupDamage', subject);
			this.displayDamage(target);
			this.displayAffectedStatus(target);
			this.displayFailure(target);
			//Said alternative waitForNewLine
			this.push('waitForNewLineOther');
			this.push('popBaseLine');
		}
	}
	//A line imported from battle engine it overwrites this function and better to be safe then sorry
	//if removing the only difference will break the plugin
	if (Imported.YEP_BattleEngineCore){ if (target.isDead()) target.performCollapse(); }
};
}
//=============================================================================
// End of File
//=============================================================================
