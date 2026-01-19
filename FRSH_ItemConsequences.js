//=============================================================================
// FRSH_ItemConsequences
// FRSH_ItemConsequences.js
// Version: 1.3.0
//=============================================================================

var Imported = Imported || {};
Imported.IConsequence = true;

var Frashaw = Frashaw || {};
Frashaw.IConsequence = Frashaw.IConsequence || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows Items to have Consequences after so many uses.
*
* @param consequenceName
* @text Name
* @type text[]
* @desc Put the name of the tag you want to have to track the consequence (No Spaces). Ex: "itemConsequence"
* @default ["itemConsequence"]
*
* @param consequenceAbbreviation
* @text Abbreviation
* @type text[]
* @desc Put the abbreviation of your consequence. Preferably 2 letters. Ex: "Ic"
* @default ["Ic"]
*
* @param consequenceMax
* @text Base Max
* @type number[]
* @desc Put the base max that the number has to reach to trigger the consequence.
* @default ["100"]
* @min 1
*
* @param consequenceDecrease
* @text Base Decrease
* @type number[]
* @desc Put the base number the Consequences decrease each turn.
* @default ["20"]
* @min 0
*
* @param consequenceEval
* @text Evaluation
* @type text[]
* @desc Put code that happens when the consequence happens target being the victim. Ex: target.gainHp(-100); 
* @default ["target.gainHp(-100)"]
*
* @param consequenceColorA
* @text Color 1
* @type text[]
* @desc Put the first color you want the Consequence bar to be. Can be either a Window Color or a Hex Code. Ex: 0 or #ffffff
* @default ["0"]
*
* @param consequenceColorB
* @text Color 2
* @type text[]
* @desc Put the second color you want the Consequence bar to be. Can be either a Window Color or a Hex Code. Ex: 0 or #ffffff
* @default ["0"]
*
* @param consequenceBarA
* @text First Bar
* @type select[]
* @option Hp
* @option Mp
* @option Tp
* @option Consequence
* @option Don't Use
* @desc Put what you want the other visible bar to be. Won't show any bars if using "Don't Use"
* @default ["Consequence"]
*
* @param consequenceBarB
* @text Second Bar
* @type select[]
* @option Hp
* @option Mp
* @option Tp
* @option Consequence
* @option Don't Use
* @desc Put what you want the other other visible bar to be.
* @default ["Don't Use"]
*
* @param consequenceBarC
* @text Third Bar
* @type select[]
* @option Hp
* @option Mp
* @option Tp
* @option Consequence
* @option Don't Use
* @desc Put what you want the other other visible bar to be. Set to blank to not use.
* @default ["Don't Use"]
*
* @param consequenceGainTexts
* @text Consequence Gain Text
* @type text[]
* @desc What text shows when gaining the Consequence. Starts with the targets name. Use 1% for the amount. Ex: gained 1% Ic!
* @default [" gained 1% Ic!"]
*
* @param consequenceLoseTexts
* @text Consequence Loss Text
* @type text[]
* @desc What text shows when losing the Consequence. Starts with the targets name. Use 1% for the amount. Ex: lost 1% Ic!
* @default [" lost 1% Ic!"]
*
* @param consequencePunishTexts
* @text Consequence Punish Text
* @type text[]
* @desc What text shows when invoking the actual Consequence. Starts with the targets name. Ex: suffered the consequences!
* @default [" felt the weight of their actions!"]
*
* @param
* @default
*
* @param consequenceMaxPoint
* @text Consequence Max Point
* @type boolean
* @desc Choose if you want the limit for Consequences to be when hitting the limit or above it.
* @on More or Equal To (>=)
* @off More Then (>)
* @default true
*
* @param consequenceDrainBuffer
* @text Consequence Drain Buffer
* @type boolean
* @desc Choose if you want to wait a turn before draining from the added to Consequence or not.
* @on Wait A Turn
* @off Immediately
* @default true
*
* @param
* @default
*
* @param consequenceBarSingleX
* @text Single Bar X
* @type number
* @desc input a number for the X position of the single bar shown while deciding on who to use the item on.
* @default 0
*
* @param consequenceBarSingleW
* @text Single Bar Width
* @type number
* @desc input a number for the Width of the single bar shown while deciding on who to use the item on.
* @default 315
*
* @param
* @default
*
* @param consequenceBarDoubleAX
* @text Duo Bar X 1
* @type number
* @desc input a number for the X position of a first bar shown of two while deciding on who to use the item on.
* @default 0
*
* @param consequenceBarDoubleBX
* @text Duo Bar X 2
* @type number
* @desc input a number for the X position of a second bar shown of two while deciding on who to use the item on.
* @default 216
*
* @param consequenceBarDoubleAW
* @text Duo Bar Width 1
* @type number
* @desc input a number for the Width of the first bar shown of two while deciding on who to use the item on.
* @default 201
*
* @param consequenceBarDoubleBW
* @text Duo Bar Width 2
* @type number
* @desc input a number for the Width of the second bar shown of two while deciding on who to use the item on.
* @default 114
*
* @param
* @default
*
* @param consequenceBarTripleAX
* @text Trio Bar X 1
* @type number
* @desc input a number for the X position of a first bar shown of three while deciding on who to use the item on.
* @default 0
*
* @param consequenceBarTripleBX
* @text Trio Bar X 2
* @type number
* @desc input a number for the X position of a second bar shown of three while deciding on who to use the item on.
* @default 123
*
* @param consequenceBarTripleCX
* @text Trio Bar X 3
* @type number
* @desc input a number for the X position of a third bar shown of three while deciding on who to use the item on.
* @default 234
*
* @param consequenceBarTripleAW
* @text Trio Bar Width 1
* @type number
* @desc input a number for the Width of the first bar shown of three while deciding on who to use the item on.
* @default 108
*
* @param consequenceBarTripleBW
* @text Trio Bar Width 2
* @type number
* @desc input a number for the Width of the second bar shown of three while deciding on who to use the item on.
* @default 96
*
* @param consequenceBarTripleCW
* @text Trio Bar Width 3
* @type number
* @desc input a number for the Width of the third bar shown of three while deciding on who to use the item on.
* @default 96
*
* @help
* ==Notetags====================================================================
* Items:
* Consequence Adding: <(whatever name you put for the consequence): x>
*
* Actor, Weapons, Armors, States:
* <(consequence name)GiveBonus: (bonus to add to the calculation, giver)>
* <(consequence name)GiveMult: (bonus to multiply to the calculation, giver)>
* <(consequence name)TakeBonus: (bonus to add to the calculation, taker)>
* <(consequence name)GiveMult: (bonus to multiply to the calculation, taker)>
* <(consequence name)DrainBonus: (bonus to add to the drain calculation)>
* <(consequence name)DrainMult: (bonus to multiply to the drain calculation)>
* ===Introduction===============================================================
* In Five Nights at F%^&boys: Complete Collection, Zain (the creator) did 
* something unique to help add difficulty for harder modes without just adding 
* more stats and the like to enemies. What he did was that items would give a 
* certain value to a meter that would give a consequence if it ever got too high. 
* While I liked this mechanic and wanted to replicate it for my games, the 
* implamentation could be made a lot more modular and simpler to use past the 
* inital setting of the plugin parameters. So I made this plugin for that 
* express purpose.
* ===How to Use=================================================================
* On the right, set up each consequence with each each element being set up.
* Don't miss any element or otherwise it will mess everything up. Once that is 
* done, add the notetags to the respective things and go about your devving.
* ===Change Log=================================================================
* Version 1.3.0 (01/19/2026) :
* -Rewrote the entire plugin
* -Changed the way all systems work to be based on objects, not arrays
* -Added a way to have hex colors for the bar colors
* -Added a way to personalize the bars Xs and Widths depending on how many are
* being shown
* -Add several bug fixes to small or minor things I forgot
*
* Version 1.2.7 (02/16/24) :
* -Removed method that caused passive states to double up on calls
*
* Version 1.2.6 (07/14/23) :
* -Removed a method that crashed Yanfly_PartySystem
*
* Version 1.2.5 (07/10/23) :
* -Changed the way text is shown to be WAY less jank
*
* Version 1.2.4 (06/11/23) :
* -Added a variable initalization
* -Added "compatability" with FRSH_AntiMessage
*
* Version 1.2.3 (06/08/23) :
* -Added new array flattening method that should hopefully not crap the bed 
* if you use an out of date version of Javascript
*
* Version 1.2.2 (05/11/23) :
* -Added Compatibility with AntiMessage
*
* Version 1.2.1 (04/27/23) :
* -Added Evals to make the consequences reset on Battler Refresh
* -Added Loops so all modifier types can be set with states, weapons, and armors
*
* Version 1.2.0 (04/19/23) :
* -Redid a lot of code
* -Added the Ability to add a Bonus and Mult to the user's and reciever's
* to the calculation of the consequence adding
* -Added the ability to add modifiers to the Drain per turn.
* -Consequences are 0 out on death
*
* Version 1.1.1 (02/23/23) :
* -Swap around a line in the turn end effects so the decreases happen before
* those run
*
* Version 1.1 (02/21/23) :
* -Add a method for the consequence to apply to all allies if item targets
* all allies
*
* Version 1.0 (02/19/23) :
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
(function() {
//==============================================================================
//Setup
//==============================================================================
//Sets up variables commonly used in the plugin
var consequenceModLabels = ["GiveBonus", "GiveMult", "TakeBonus", "TakeMult", "DrainBonus", "DrainMult", "MaxBonus", "MaxMult"];

//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_ItemConsequences');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.Consequence = {};
//Parses the plugin arrays into a useable data format
Frashaw.Param.ConsequenceLabels = JSON.parse(Parameters.consequenceName);
//Goes through each of the consequences so that they are loaded into an object
Frashaw.Param.ConsequenceLabels.forEach(function(e, i, a){
	//Dummy object to hold info for the actual object
	holding = {};
	holding.abbreviation = JSON.parse(Parameters.consequenceAbbreviation)[i];
	holding.baseMax = Number(JSON.parse(Parameters.consequenceMax)[i]);
	holding.baseDecrease = Number(JSON.parse(Parameters.consequenceDecrease)[i]);
	holding.punishEval = JSON.parse(Parameters.consequenceEval)[i];
	holding.colorA = JSON.parse(Parameters.consequenceColorA)[i];
	holding.colorB = JSON.parse(Parameters.consequenceColorB)[i];
	holding.barA = JSON.parse(Parameters.consequenceBarA)[i];
	holding.barB = JSON.parse(Parameters.consequenceBarB)[i];
	holding.barC = JSON.parse(Parameters.consequenceBarC)[i];
	holding.gainText = JSON.parse(Parameters.consequenceGainTexts)[i];
	holding.loseText = JSON.parse(Parameters.consequenceLoseTexts)[i];
	holding.punishText = JSON.parse(Parameters.consequencePunishTexts)[i];
	Frashaw.Param.Consequence[e] = holding;
});
Frashaw.Param.MaxPoint = Parameters.consequenceMaxPoint == "true";
Frashaw.Param.ConsequenceBuffer = Parameters.consequenceDrainBuffer == "true";
Frashaw.Param.ConsequenceSingleBarX = Number(Parameters.consequenceBarSingleX);
Frashaw.Param.ConsequenceSingleBarW = Number(Parameters.consequenceBarSingleW);
Frashaw.Param.ConsequenceDuoBarX = [Number(Parameters.consequenceBarDoubleAX), Number(Parameters.consequenceBarDoubleBX)];
Frashaw.Param.ConsequenceDuoBarW = [Number(Parameters.consequenceBarDoubleAW), Number(Parameters.consequenceBarDoubleBW)];
Frashaw.Param.ConsequenceTrioBarX = [Number(Parameters.consequenceBarTripleAX), Number(Parameters.consequenceBarTripleBX), Number(Parameters.consequenceBarTripleCX)];
Frashaw.Param.ConsequenceTrioBarW = [Number(Parameters.consequenceBarTripleAW), Number(Parameters.consequenceBarTripleBW), Number(Parameters.consequenceBarTripleCW)];

FrshIConsequenceLoaded = false;
//Starts the function to intialize all the consequence notetags
FrshIConsequence_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshIConsequence_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshIConsequenceLoaded == false) {
		//Processes the notetags of Items, Actors, Classes, Weapons, Armors, and States
		this.processConsequenceNotetagsA($dataItems);
		this.processConsequenceNotetagsB($dataActors);
		this.processConsequenceNotetagsB($dataClasses);
		this.processConsequenceNotetagsB($dataWeapons);
		this.processConsequenceNotetagsB($dataArmors);
		this.processConsequenceNotetagsB($dataStates);
		//Make sure it doesn't run twice
		FrshIConsequenceLoaded = true;
	}
	return true;
};

//Does the processing for items
DataManager.processConsequenceNotetagsA = function(group) {
	//Loads up various strings to check for
	notes = [];
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		notes.push(new RegExp("<" + i + ":[ ]?(-?\\d+)>", "i"));
	});
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		Frashaw.Param.ConsequenceLabels.forEach(function(i){
			eval("obj." + i + " = 0");
		});

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			notes.forEach(function(i, a){
				if (line.match(i)) {
					eval("obj." + Frashaw.Param.ConsequenceLabels[a] + " = Number(RegExp.$1)");
				}
			});
		}
	}
}

//Does the processing for all other things for the modifiers
DataManager.processConsequenceNotetagsB = function(group) {
	var notes = [];
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		var note = [];
		note.push(new RegExp("<" + i + "[ ]?Give[ ]?Bonus:[ ]?(-?\\d+)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Give[ ]?Mult(?:iplier)?:[ ]?(\\d+.?(?:\\d+)?)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Take[ ]?Bonus:[ ]?(-?\\d+)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Take[ ]?Mult(?:iplier)?:[ ]?(\\d+.?(?:\\d+)?)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Drain[ ]?Bonus:[ ]?(-?\\d+)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Drain[ ]?Mult(?:iplier)?:[ ]?(\\d+.?(?:\\d+)?)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Max[ ]?Bonus:[ ]?(-?\\d+)>", "i"));
		note.push(new RegExp("<" + i + "[ ]?Max[ ]?Mult(?:iplier)?:[ ]?(\\d+.?(?:\\d+)?)>", "i"));
		notes.push(note);
	});
	
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		Frashaw.Param.ConsequenceLabels.forEach(function(i){
			consequenceModLabels.forEach(function(g, a){
				if (a % 2 == 1){
					eval("obj." + i + g + " = 1");
				} else {
					eval("obj." + i + g + " = 0");
				}
			});
		});

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			notes.forEach(function(i, a){
				i.forEach(function(g, b){
					if (line.match(g)) {
						eval("obj." + Frashaw.Param.ConsequenceLabels[a] + consequenceModLabels[b] + " = Number(RegExp.$1)");
					}
				});
			});
		}
	}
}

//==============================================================================
//Value Refreshing/Setting
//==============================================================================

//Goes through each of the consequences to make sure their values and buffers are set to their default states before use
frsh_iconsequences_con_init = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function(actorId) {
    frsh_iconsequences_con_init.call(this, actorId);
	//All over this plugin are these lines that set "this" to something, that is 
	//because the eval() command makes it so that "this" isn't recognized within 
	//it, meaning you have to set it within a variable to properly call it
	user = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		eval("user." + i + " = 0");
		eval("user." + i + "Buffer = false");
	});
};

//Resets the Consequence Values and Buffers to their base state at the start of battle
frsh_iconsequences_con_battle_start_init = Game_Actor.prototype.onBattleStart;
Game_Actor.prototype.onBattleStart = function() {
    frsh_iconsequences_con_battle_start_init.call(this);
	user = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		eval("user." + i + " = 0");
		eval("user." + i + "Buffer = false");
	});
};

//Resets the Consequence Values and Buffers to their base state at the end of battle
frsh_iconsequences_con_battle_end_init = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function() {
    frsh_iconsequences_con_battle_end_init.call(this);
	user = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		eval("user." + i + " = 0");
		eval("user." + i + "Buffer = false");
	});
};

//Resets the values when the user dies
frsh_iconsequences_death_clense = Game_Actor.prototype.die;
Game_Actor.prototype.die = function() {
	frsh_iconsequences_death_clense.call(this);
	user = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		eval("user." + i + " = 0");
		eval("user." + i + "Buffer = false");
	});
};

//Gets all the modifiers for Consequences for Actors so that it's actually useable
Game_Actor.prototype.getConsequenceStuff = function() {
	user = this;
	//Gets the modifiers from the base actor
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		//Odds are flats, Evens are mults. That's why the two are distincted
		consequenceModLabels.forEach(function(g, a){
			if (a % 2 == 1){
				eval("user." + i + g + " *= $dataActors[user.actorId()]." + i + g);
			} else {
				eval("user." + i + g + " += $dataActors[user.actorId()]." + i + g);
			}
		});
	});
	//Gets the modifiers from the classe of the actor
	var id = this._classId;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		consequenceModLabels.forEach(function(g, a){
			if (a % 2 == 1){
				eval("user." + i + g + " *= $dataClasses[id]." + i + g);
			} else {
				eval("user." + i + g + " += $dataClasses[id]." + i + g);
			}
		});
	});
	//Checks each equip the actor has
	for (var i = 0; i != this.equips().length; i++){
		var equip = this.equips()[i];
		if (equip == null) continue;
		//Gets the modifiers from the actor's equipment
		Frashaw.Param.ConsequenceLabels.forEach(function(i){
			consequenceModLabels.forEach(function(g, a){
				if (a % 2 == 1){
					eval("user." + i + g + " *= equip." + i + g);
				} else {
					eval("user." + i + g + " += equip." + i + g);
				}
			});
		});
	}
	//Gets actor's states
	var stateList = this.states();
	//Gets the modifiers from the base actor's states
	for (var i = 0; i != stateList.length; i++){
		var id = stateList[i].id;
		Frashaw.Param.ConsequenceLabels.forEach(function(i){
			consequenceModLabels.forEach(function(g, a){
				if (a % 2 == 1){
					eval("user." + i + g + " *= $dataStates[id]." + i + g);
				} else {
					eval("user." + i + g + " += $dataStates[id]." + i + g);
				}
			});
		});
	}
	//Sets the base for the Max and Decrease of the consequences so the logic 
	//doesn't have to be calculated later
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		eval("user." + i + "Max = Math.round((Frashaw.Param.Consequence[i].baseMax + user." + i + "MaxBonus) * user." + i + "MaxMult)");
		eval("user." + i + "Drain = Math.round((Frashaw.Param.Consequence[i].baseDecrease + user." + i + "DrainBonus) * user." + i + "DrainMult)");
	});
};

//Removes all the consequence modifiers so that it doesn't get repeated and/or bleed out
Game_BattlerBase.prototype.removeConsequenceStuff = function() {
	user = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		consequenceModLabels.forEach(function(g, a){
			if (a % 2 == 1){
				eval("user." + i + g + " = 1");
			} else {
				eval("user." + i + g + " = 0");
			}
		});
		eval("user." + i + "Max = 0"); 
		eval("user." + i + "Drain = 0"); 
	});
};

//Gets and resets the modifiers for the consequences
frsh_iconsequence_get_modifiers = Game_BattlerBase.prototype.refresh
Game_Actor.prototype.refresh = function(){
	frsh_iconsequence_get_modifiers.call(this);
	//Resets the values
	this.removeConsequenceStuff();
	//Sets the values
	this.getConsequenceStuff();
}

//==============================================================================
//Consequence Functioning
//==============================================================================

//Applies the item consequences after using said item
frsh_iconsequences_con_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target){
	frsh_iconsequences_con_apply.call(this, target);
	//Checks to see if the party is in battle and the used action is a item
	if ($gameParty.inBattle() && this._item._dataClass == "item"){
		item = $dataItems[this._item._itemId];
		user = this.subject();
		Frashaw.Param.ConsequenceLabels.forEach(function(i){
			if (eval("item." + i + " != 0")){
				eval("amount = item." + i);
				eval("amount += user." + i + "GiveBonus + target." + i + "TakeBonus");
				eval("amount *= user." + i + "GiveMult * target." + i + "TakeMult");
				amount = Math.round(amount);
				//Does the actual manipulation of the consequence
				target.gainConsequence(i, amount);
				//Sets up the result for the battle log
				eval("user._result." + i + "Change = amount");
				//Checks to see if the value was add to and if the setting is on
				//to see if the drain should be delayed or not
				if (Frashaw.Param.ConsequenceBuffer && amount > 0) eval("target." + i + "Buffer = true");
			}
		});
	}
}

//Runs at the end of every turn to reduce the consequence values
frsh_iconsequences_con_turn_drain = Game_Actor.prototype.onTurnEnd
Game_Actor.prototype.onTurnEnd = function() {
    frsh_iconsequences_con_turn_drain.call(this);
	actor = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		//Checks to see if the consequence value is above 0 for draining
		if (eval("actor." + i + " > 0")){
			if (eval("actor." + i + "Buffer == false")){
				eval("amount = actor." + i + "Drain");
				actor.gainConsequence(i, -amount);
			} else {
				eval("actor." + i + "Buffer = false");
			}
		}
	});
};

//A function made to manage all of the manipulation of the consequences
Game_Actor.prototype.gainConsequence = function(consequence, amount){
	user = this;
	eval("user." + consequence + " += amount");
	if (amount > 0){
		if (eval("user." + consequence + " > 0")){
			compare = (Frashaw.Param.MaxPoint) ? ">=" : ">";
			if (eval("user." + consequence + compare + " user." + consequence + "Max")){
				target = this;
				eval(Frashaw.Param.Consequence[consequence].punishEval);
				eval("action." + consequence + "Punish = true"); 
			}
		}
	} else {
		if ("user." + consequence + " < 0") eval("user." + consequence + " = 0");
	}
}

//==============================================================================
//Visuals and Text
//==============================================================================

//An extention that makes it so that the bars can be drawn differently when trying
//to use an item with consequences
frsh_iconsequences_bars_draw = Window_BattleStatus.prototype.drawGaugeArea;
Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
	//Checks to see if the user is inputting an action, if the actor window exists,
	//if the used action isn't null, if the used action is an item, and if the user
	//isn't currently doing an action
	if (BattleManager.inputtingAction() != null && SceneManager._scene._actorWindow != null && BattleManager.inputtingAction()._item != null && BattleManager.inputtingAction()._item._dataClass == "item" && BattleManager._phase != "phaseChange"){
		item = $dataItems[BattleManager.inputtingAction()._item._itemId];
		consequence = false;
		battleStatus = this;
		Frashaw.Param.ConsequenceLabels.forEach(function(i){
			if(eval("item." + i + " != 0")){
				battleStatus.drawConsequenceGaugeArea(i, rect, actor);
				consequence = true;
				return;
			}
		});
		//Fallback if no consequences are found
		if (!consequence) frsh_iconsequences_bars_draw.call(this, rect, actor);
	} else {
		frsh_iconsequences_bars_draw.call(this, rect, actor);
	}
};

//Goes through the required gauges that need to be shown and draws them
//when using an item with a consequence
Window_BattleStatus.prototype.drawConsequenceGaugeArea = function(i, rect, actor) {
	consequence = Frashaw.Param.Consequence[i];
	//Goes back to the normal bar drawing if the first element is set to not use
	if (consequence.barA != "Don't Use"){
		//Counts the number of bars needed, for the X Position and Length purposes
		numBars = 1 + ((consequence.barB != "Don't Use") ? 1 : 0) + ((consequence.barC != "Don't Use") ? 1 : 0);
		battleStatus = this;
		if (numBars == 1){
			//Draws the bar required. If the bar is the Consequence, 
			//adds 2 variables for the bar specific
			eval("battleStatus.drawActor" + consequence.barA + "(actor, rect.x + Frashaw.Param.ConsequenceSingleBarX, rect.y, Frashaw.Param.ConsequenceSingleBarW" + ((consequence.barA == "Consequence") ? ", consequence, i" : "") + ");");
		} else if (numBars == 2){
			eval("battleStatus.drawActor" + consequence.barA + "(actor, rect.x + Frashaw.Param.ConsequenceDuoBarX[0], rect.y, Frashaw.Param.ConsequenceDuoBarW[0]" + ((consequence.barA == "Consequence") ? ", consequence, i" : "") + ");");
			eval("battleStatus.drawActor" + consequence.barB + "(actor, rect.x + Frashaw.Param.ConsequenceDuoBarX[1], rect.y, Frashaw.Param.ConsequenceDuoBarW[1]" + ((consequence.barB == "Consequence") ? ", consequence, i" : "") + ");");
		} else if (numBars == 3){
			eval("battleStatus.drawActor" + consequence.barA + "(actor, rect.x + Frashaw.Param.ConsequenceTrioBarX[0], rect.y, Frashaw.Param.ConsequenceTrioBarW[0]" + ((consequence.barA == "Consequence") ? ", consequence, i" : "") + ");");
			eval("battleStatus.drawActor" + consequence.barB + "(actor, rect.x + Frashaw.Param.ConsequenceTrioBarX[1], rect.y, Frashaw.Param.ConsequenceTrioBarW[1]" + ((consequence.barB == "Consequence") ? ", consequence, i" : "") + ");");
			eval("battleStatus.drawActor" + consequence.barC + "(actor, rect.x + Frashaw.Param.ConsequenceTrioBarX[2], rect.y, Frashaw.Param.ConsequenceTrioBarW[2]" + ((consequence.barC == "Consequence") ? ", consequence, i" : "") + ");");
		}
	} else {
		frsh_iconsequences_bars_draw.call(this, rect, actor);
		return;
	}
}

//A special function made to draw the bar for the consequences specifically
Window_Base.prototype.drawActorConsequence = function(actor, x, y, width, consequence, i) {
    width = width || 186;
	//Checks to see if the color is a number or not
	if (isNaN(Number(consequence.colorA))){
		//Adds a # if the user forgot to add one to the start of the hexadecimal color
		if (consequence.colorA[0] == "#"){
			var color1 = consequence.colorA;
		} else {
			var color1 = "#" + consequence.colorA;
		}
	} else {
		var color1 = this.textColor(Number(consequence.colorA));
	}
	if (isNaN(Number(consequence.colorB))){
		if (consequence.colorB[0] == "#"){
			var color2 = consequence.colorB;
		} else {
			var color2 = "#" + consequence.colorB;
		}
	} else {
		var color2 = this.textColor(Number(consequence.colorB));
	}
	var current = eval("actor." + i);
	var max = eval("actor." + i + "Max");
    this.drawGauge(x, y, width, current/max, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(consequence.abbreviation, x, y, 44);
    this.drawCurrentAndMax(current, max, x, y, width, this.normalColor(), this.normalColor());
};

//An extention to reset the value in results() that keeps track of the changes
//of the Consequence changes and if the message needs to be displayed
frsh_iconsequences_result_init = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    frsh_iconsequences_result_init.call(this);
	action = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		eval("action." + i + "Change = 0"); 
		eval("action." + i + "Punish = false"); 
	});
};

//An extention to show the consequences in the battlelog during an action
frsh_iconsequences_con_piggyback = Window_BattleLog.prototype.displayAffectedStatus;
Window_BattleLog.prototype.displayAffectedStatus = function(target) {
	frsh_iconsequences_con_piggyback.call(this, target);
	this.displayConsequences(target);
};

//A function to show the effects in the battle log
Window_BattleLog.prototype.displayConsequences = function(target){
	battleLog = this;
	Frashaw.Param.ConsequenceLabels.forEach(function(i){
		//Sees if the consequence is any different
		if (eval("target.result()." + i + "Change != 0")){
			battleLog.push('pushBaseLine');
			//Different messages if the amount is positive or negative
			if (eval("target.result()." + i + "Change > 0")){
				text = Frashaw.Param.Consequence[i].gainText;
			} else {
				text = Frashaw.Param.Consequence[i].loseText;
			}
			//Replaces the placeholder with the actual amount changed
			text = text.replace("1%", Math.abs(eval("target.result()." + i + "Change")));
			battleLog.push('addText', target.name() + text);
			//Shows the text when the consequence goes off
			if (eval("target.result()." + i + "Punish")){
				battleLog.push('addText', target.name() + Frashaw.Param.Consequence[i].punishText);
			}
			battleLog.push('waitForNewLine');
			battleLog.push('popBaseLine');
		}
	});
}
})();
//=============================================================================
// End of File
//=============================================================================