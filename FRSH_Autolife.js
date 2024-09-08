//=============================================================================
// FRSH_Autolife
// FRSH_Autolife.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.Autolife = true;

var Frashaw = Frashaw || {};
Frashaw.Autolife = Frashaw.Autolife || {};

/*:
* @plugindesc A state modifier that allows things to auto-revive once they die.
* @author Frashaw27
*
* @param autolifeHpDefault
* @text Default Hp Gain
* @type text
* @desc Put the formula for how much Hp a user will regain upon revival at default. Use "user" for referencing the revivee.
* @default user.mhp*0.7
*
* @param autolifeMpDefault
* @text Default Mp Gain
* @type text
* @desc Put the formula for how much Mp a user will regain upon revival at default. Use "user" for referencing the revivee.
* @default user.mmp*0.5
*
* @param autolifeTpDefault
* @text Default Tp Gain
* @type text
* @desc Put the formula for how much Tp a user will regain upon revival at default. Use "user" for referencing the revivee.
* @default 0
*
* @param autolifeStateAll
* @text Revives Remove All States?
* @type boolean
* @desc Click True or False if you want to innately remove all states upon auto reviving someone.
* @default false
*
* @param autolifeStateList
* @text Revive Remove State List
* @type number[]
* @desc Input the ids of the states you want to be removed upon revival by default.
* @min 1
*
* @param autolifeBuffs
* @text Revives Remove Buffs?
* @type boolean
* @desc Click True or False if you want to innately remove all buffs upon auto reviving someone.
* @default false
*
* @param autolifeDebuffs
* @text Revives Remove Debuffs?
* @type boolean
* @desc Click True or False if you want to innately remove all debuffs upon auto reviving someone.
* @default false
*
* @param autolifeMessage
* @text Default Revive Message
* @type text
* @desc Put the default text you want to use when someone is revived. Format it like a state line. Ex: " didn't die!".
* @default 's will didn't let them die!
*
* @param autolifeAnimId
* @text Default Revive Animation
* @type animation
* @desc Put the id of the Animation you want to play when the revive triggers.
* @default 0
* 
* @help 
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* States:
* <Autolife|alife> - Allows a state to trigger Autolife.
* <Passive Autolife|alifePass> - Allows a special override for passive states
* specifically.
* <Autolife Hp|alifeHp: x> - Allows you to specify how much Hp you want the
* reviveee to have upon revival. Can use code to apply varying enough with
* "user" counting as the revivee. Ex: "user.mhp*0.7" revives the user with
* 70% of the their Max Hp. Note, all the numbers will be automatically 
* rounded.
* <Autolife Mp|alifeMp: x> - Same as above but with Mp. 
* <Autolife Tp|alifeTp: x> - Same as above but with Tp. 
* <Autolife State Remove All|alifeStateDelAll> - Removes ALL states upon 
* revive just like Death does normally.
* <Autolife State Remove LIST|alifeStateDelList: x> - Sets a list of the States
* that you want removed upon being revived. Seperate each state id by ", ".
* Ex: 4, 5, 6, 7
* <Autolife Buff Clear|alifeNoBuff> - Clears all Buffs upon revival. 
* <Autolife Debuff Clear|alifeNoDebuff> - Clears all Debuffs upon revival.
* <Autolife Eval|alifeEval></Autolife Eval|alifeEval> - Runs the code inside
* when revived. Just like the Hp, Mp, and Tp setters, you can use "user" For
* the revivee.
* <Autolife Message|alifeMsg: x> - Put a custom message to run when the user
* is revived. Ex: " did not die just yet!"
* <Autolife Animation Id|alifeAnimNum: x> - Put the id number of the 
* animation you want to use when you are revived. Put zero to not use.
* ===Introduction=============================================================
* In Yanfly's Buff and States Core, they had a special stat they outlined on
* how to use called Autolife. This wasn't original, Vx Ace did the concept
* first, however their implamentation. Yanfly's wasn't as broken, but came
* with the caveot that besides taking damage, it wouldn't really revive
* you correctly, so this plugin aims to automate that process along side
* having it trigger when ever the inflicted dies, regardless of the means.  
* ===How to Use===============================================================
* Note: Make sure to put this below plugins that affect things related state
* messages like my Summon plugin to ensure compatability.
*
* For any state to use the Autolife feature, you must put the <Autolife> tag
* in the state so the engine registers that the thing has the ability to be
* revived. All other noretags are unneeded but allow you to further customize
* that specific instance of instant revival. Please note to put if you want
* to make the autolife state a passive to please specify it with the 
* <Passive Autolife> tag so that it can be added to a blacklist so that it
* doesn't trigger twice, but instead once per battle/death. 
*
* Also note that which Autolife that is used is determined first by if 
* their a genuine state or passive, with states being used first. It then
* gets sorted for which autolife state would give the hp upon revive, in 
* which case it will use that. Also note that if autolife triggers, it
* will remove that instance from the revivee. Ex: a dedicated autolife state 
* eill remove itself once it's autolife is triggered. 
* ===Change Log===============================================================
* Version 1.0.0 (04/26/24) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_Autolife');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.autolifeHpBase = Parameters.autolifeHpDefault;
Frashaw.Param.autolifeMpBase = Parameters.autolifeMpDefault;
Frashaw.Param.autolifeTpBase = Parameters.autolifeTpDefault;
Frashaw.Param.autolifeStateAll = Parameters.autolifeStateAll === "true";
if (Parameters.autolifeStateList != ""){
	Frashaw.Param.autolifeStateList = JSON.parse(Parameters.autolifeStateList);
	Frashaw.Param.autolifeStateList.forEach(function(i, p, a) {
	   a[p] = Number(i);
	});
} else {
	Frashaw.Param.autolifeStateList = [];
}
Frashaw.Param.autolifeBuffs = Parameters.autolifeBuffs === "true";
Frashaw.Param.autolifeDebuffs = Parameters.autolifeDebuffs === "true";
Frashaw.Param.autolifeMsg = Parameters.autolifeMessage;
Frashaw.Param.autolifeAnimId = Number(Parameters.autolifeAnimId);

//Sets up various variables for use
var FrshAutolifeLoaded = false;
var alMessage = "";

//Starts the function to intialize all the summon notetags
FrshAutolife_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshAutolife_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshAutolifeLoaded == false) {
		this.processAutolife($dataStates);
		//Make sure it doesn't run twice
		FrshAutolifeLoaded = true;
	}
	return true;
};

//Does the processing
DataManager.processAutolife = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:AUTOLIFE|alife)>/i;
	var note1b = /<(?:PASSIVE AUTOLIFE|alifePass)>/i;
	var note2 = /<(?:AUTOLIFE HP|alifeHp):[ ](.*)>/i;
	var note3 = /<(?:AUTOLIFE MP|alifeMp):[ ](.*)>/i;
	var note4 = /<(?:AUTOLIFE TP|alifeTp):[ ](.*)>/i;
	var note5 = /<(?:AUTOLIFE STATE REMOVE ALL|alifeStateDelAll)>/i;
	var note6 = /<(?:AUTOLIFE STATE REMOVE LIST|alifeStateDelList):[ ](.*)>/i;
	var note7 = /<(?:AUTOLIFE BUFF CLEAR|alifeNoBuff)>/i;
	var note8 = /<(?:AUTOLIFE DEBUFF CLEAR|alifeNoDebuff)>/i;
	var note9a = /<(?:AUTOLIFE EVAL|alifeEval)>/i;
	var note9b = /<\/(?:AUTOLIFE EVAL|alifeEval)>/i;
	var note10 = /<(?:AUTOLIFE MESSAGE|alifeMsg):(.*)>/i;
	var note11 = /<(?:AUTOLIFE ANIMATION ID|alifeAnimNum):[ ](.*)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the actors for these various conditions
		var mode = 'none';
		obj.autolife = false;
		obj.autolifePass = false;
		obj.autolifeHp = Frashaw.Param.autolifeHpBase;
		obj.autolifeMp = Frashaw.Param.autolifeMpBase;
		obj.autolifeTp = Frashaw.Param.autolifeTpBase;
		obj.autolifeStateDelAll = Frashaw.Param.autolifeStateAll;
		obj.autolifeStateDelList = Frashaw.Param.autolifeStateList;
		obj.autolifeBuffClear = Frashaw.Param.autolifeBuffs;
		obj.autolifeDebuffClear = Frashaw.Param.autolifeDebuffs;
		obj.autolifeEval = "";
		obj.autolifeMsg = Frashaw.Param.autolifeMsg;
		obj.autolifeAnimNum = Frashaw.Param.autolifeAnimId;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			//For the start of the summon eval
			if (line.match(note1)) {
				obj.autolife = true;
			} else if (line.match(note1b)) {
				obj.autolifePass = true;
			} else if (line.match(note2)){
				obj.autolifeHp = String(RegExp.$1);
			} else if (line.match(note3)){
				obj.autolifeMp = String(RegExp.$1);
			} else if (line.match(note4)){
				obj.autolifeTp = String(RegExp.$1);
			} else if (line.match(note5)){
				obj.autolifeStateDelAll = true;
			} else if (line.match(note6)){
				obj.autolifeStateDelList = arrayizer(String(RegExp.$1));
			} else if (line.match(note7)){
				obj.autolifeBuffClear = true;
			} else if (line.match(note8)){
				obj.autolifeDebuffClear = true;
			} else if (line.match(note9a)){
				mode = "eval";
			} else if (line.match(note9b)){
				mode = "none";
			} else if (line.match(note10)){
				obj.autolifeMsg = String(RegExp.$1);
			} else if (line.match(note11)){
				obj.autolifeAnimNum = Number(RegExp.$1);
			} else if (mode == "eval"){
				obj.autolifeEval += String(line);
			}
		}
  }
}

//A function meant to seperate the values gotten from the plugin parameters
//into arrays along with removing any not used valeus
function arrayizer(yes){
	array = yes.split(",");
	array.forEach(eacher);
	array = array.filter(isPositive);
	return array;
}

//An extention to clear the user's passive restriction list so that they can use their passive revives 
//again upon the battle starting
frsh_autolife_passive_resetA = Game_Battler.prototype.onBattleStart
Game_Battler.prototype.onBattleStart = function() {
	this.passAutolifeBlacklist = [];
    frsh_autolife_passive_resetA.call(this);
};

//An extention to clear the user's passive restriction list so that they can use their passive revives 
//again upon the target dying
frsh_autolife_passive_refresh = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    frsh_autolife_passive_refresh.call(this);
	this.passAutolifeBlacklist = [];
};

//The Meat and Potatoes
frsh_autolive_not_die = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
	//Checks to see if the applied state is death. If not, just continue on as normal 
    if (stateId != this.deathStateId()){
		frsh_autolive_not_die.call(this, stateId);
	} else {
		//Sets up the variable for use later
		var user = this;
		//Gets the current recipients state list and removes all that don't have the autolife tag
		var autolifeList = this.states().filter(function (i){ return i.autolife });
		//Filters out all passive autolifes so that they don't get used before the temporary state ones
		var nonpassList = autolifeList.filter(function (i){ return !i.autolifePass });
		if (nonpassList.length > 0){ 
			//If there was a normal state autolife(s), it uses that list as the one to use 
			autolifeList = nonpassList;
		} else {
			//If there was no normal state autolife(s), it rechecks to see what passives can't be used 
			var passList = autolifeList.filter(function (i){ return !user.passAutolifeBlacklist.contains(i) });
			//If there were no passives that could be used/none at all, it recalls the normal proceedings, aka they die
			if (passList.length == 0){
				frsh_autolive_not_die.call(this, stateId);
				return;
			}
			//If there were passives, the list is set to that and thus continues
			autolifeList = passList;
		}
		//Sorts the list by how strong the hp revival is
		autolifeList.sort(function(a, b){ return eval(b.autolifeHp) - eval(a.autolifeHp) });
		//Uses teh autolife that has the most amount of hp to give
		var state = autolifeList[0];
		//Gets the animation id of the state and plays it if not 0
		if (state.autolifeAnimNum != 0){
			this.startAnimation(state.autolifeAnimNum);
		} 
		//Sets the restore amount of Hp the state specifies
		var hp = eval(state.autolifeHp);
		//Rounds the Hp restore amount
		hp = Math.round(hp);
		//Adds a min hp heal of 1 so not to cause any shinnanigans
		if (hp <= 0) hp = 1;
		//Sets the Hp to restored amount
		this.setHp(hp);
		//If the battlelog is active, show the damage the recipient took
		if (SceneManager._scene._logWindow.active) SceneManager._scene._logWindow.displayHpDamage(this);
		//Sets the result damage to the amount healed so that is can be properly shown after the damage taken
		this._result.hpDamage = -hp;
		var mp = eval(state.autolifeMp);
		mp = Math.round(mp);
		this.gainMp(mp);
		var tp = eval(state.autolifeTp);
		tp = Math.round(tp);
		this.gainTp(tp);
		//Checks to see if the option to remove all states is added
		if (state.autolifeStateDelAll){
			this.clearStates();
		} else if (state.autolifeStateDelList.length != 0){
			//If the all clear is not enabled, instead removed all the specified ones in the lsit
			for(var loop = 0; loop != state.autolifeStateDelList.length; loop++){
				this.removeState(state.autolifeStateDelList[loop]);
			}
		}
		//Checks to see if the option to remove all buffs is added, if true, remove them
		if (state.autolifeBuffClear){
			for(var loop = 0; loop != 8; loop++){
				if (this._buffs[loop] > 0) this.removeBuff(loop);
			}
		}
		//Checks to see if the option to remove all debuffs is added, if true, remove them
		if (state.autolifeDebuffClear){
			for(var loop = 0; loop != 8; loop++){
				if (this._buffs[loop] < 0) this.removeBuff(loop);
			}
		}
		//Checks to see if the eval isn't blank, if so run it
		if (state.autolifeEval != ""){
			try {
				eval(state.autolifeEval);
			} catch (e) {
				//Displays if an error happens
				//Displays where the error occured
				var text = "State" + state.id + " Autolife Eval Error!!!!!"
				console.log(text);
				//Displays code to the console log
				console.log(evaluate || 'No Code');
				//Produces the error itself to the console
				console.error(e);
				//Checks to see if the game is in testing
				if (Utils.isOptionValid('test')){
					//Force opens the console log if it is
					require('nw.gui').Window.get().showDevTools();
				}
			}
		}
		//Puts the state's revive message into a variable for out of function use
		alMessage = state.autolifeMsg;
		//Checks to see what type of removal should be done
		if (nonpassList.length != 0){
			//If state, remove it
			this.removeState(state.id);
		} else {
			//If passive, add it to the blacklist
			this.passAutolifeBlacklist.push(state);
		}
	}
};

//An extention that checks to see if one of the applied states is death, and as such applies the alMessage to show
//when applicable
frsh_autolife_add_revive_message = Game_ActionResult.prototype.addedStateObjects
Game_ActionResult.prototype.addedStateObjects = function() {
    var map = frsh_autolife_add_revive_message.call(this);
	//Loops through the various applied states
	for (var loop = 0; loop != map.length; loop++){
		//Checks each id to see if it's the death state's id. I picked the first actor to represent it as if your
		//using autolife, you'd need at least one actor.
		if (map[loop].id == $gameActors.actor(1).deathStateId()){
			//If the message is needed, it makes a clone of a message by adding an id and applying it to both friend
			//and foe
			map.splice(loop+1, 0, {
				id: 3,
				message1: alMessage, 
				message2: alMessage,
			});
			//Resets alMessage so it doesn't stack
			alMessage = "";
			//Stops the loop as it is no longer needed
			break;
		}
	}
	return map;
};
})();
//=============================================================================
// End of File
//=============================================================================
