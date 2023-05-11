//=============================================================================
// FRSH_CustomItemMessages
// FRSH_CustomItemMessages.js
// Version: 1.1.6
//=============================================================================

var Imported = Imported || {};
Imported.CIMessage = true;

var Frashaw = Frashaw || {};
Frashaw.CIMessage = Frashaw.CIMessage || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows Items to have custom use messages.
*
* @param ---Common Messages #1-----
* @default
*
* @param mId1
* @text Message Ids
* @parent ---Common Messages #1-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m1
* @text Message
* @parent ---Common Messages #1-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #2-----
* @default
*
* @param mId2
* @text Message Ids
* @parent ---Common Messages #2-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m2
* @text Message
* @parent ---Common Messages #2-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #3-----
* @default
*
* @param mId3
* @text Message Ids
* @parent ---Common Messages #3-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m3
* @text Message
* @parent ---Common Messages #3-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #4-----
* @default
*
* @param mId4
* @text Message Ids
* @parent ---Common Messages #4-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m4
* @text Message
* @parent ---Common Messages #4-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #5-----
* @default
*
* @param mId5
* @text Message Ids
* @parent ---Common Messages #5-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m5
* @text Message
* @parent ---Common Messages #5-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #6-----
* @default
*
* @param mId6
* @text Message Ids
* @parent ---Common Messages #6-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m6
* @text Message
* @parent ---Common Messages #6-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #7-----
* @default
*
* @param mId7
* @text Message Ids
* @parent ---Common Messages #7-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m7
* @text Message
* @parent ---Common Messages #7-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #8-----
* @default
*
* @param mId8
* @text Message Ids
* @parent ---Common Messages #8-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m8
* @text Message
* @parent ---Common Messages #8-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #9-----
* @default
*
* @param mId9
* @text Message Ids
* @parent ---Common Messages #9-----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m9
* @text Message
* @parent ---Common Messages #9-----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Common Messages #10----
* @default
*
* @param mId10
* @text Message Ids
* @parent ---Common Messages #10----
* @type text
* @desc Put the Id's of the Items you want to have this message, seperated by commas (,).
* @default
* @param m10
* @text Message
* @parent ---Common Messages #10----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param ---Give Message----
* @default
*
* @param dbB
* @text Enable?
* @parent ---Give Message----
* @type boolean
* @desc Click True or False if you want to enable Custom Messages if the target isn't the user nor an enemy.
* @default true
* @param dbM
* @text Message to 1
* @parent ---Give Message----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name and the recipient's name. EX: gave the % to %!
* @default
* @param dbA
* @text Message to All
* @parent ---Give Message----
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name and the recipient's name. EX: gave % to the party!
* @default
* @param dbP
* @text Party Name
* @parent ---Give Message----
* @type text
* @desc Put the name you want to use when using an item that targets the party. 
* @default
*
* @help
* ==Notetags==================================================================
* Individual Item Message: <customMessage: >
* ===Introduction=============================================================
* For a long time, I disliked how RPG Maker at base doesn't allow for
* several item use messages like it does for skills. This is fine for most
* cases, but I feel like adding the detail that someone "eats" the
* sandwich or "drinks" the potion is much better and immersive then just
* them "using" it. So I made this plugin for that exact purpose. It allows
* having groups of items share the same customized message or for an item
* to have their own customized one. What ever suits your fancy! I also
* decided to tack on giving items recipients if they're not their
* user because why not?
* ===How to Use===============================================================
* For all messages, the preferred syntax is message + % + punctuation. Ex:
* (user) ate the Sandwich! Remember to use the % or else the message might
* not look right.
* For having a group from a custom message, give a list of numbers seperated
* by commas. Ex: 52, 67, 522, 432, etc. Remember to seperate them with commas.
* Their message can then be chosen by the message box below it.
* For personalized messages use the Notetag listed above.
* You can turn on/off if the recipient is mentioned in the item use by using
* the true false parameter. You can also customize the message for giving
* to a specific ally and the entire party, aswell as the name for the party.
* ===Change Log===============================================================
* Version 1.1.6 (05/11/23) :
* -Swapped compatiblity with Dynamic Battlelog Message for AntiMessage
*
* Version 1.1.5 (03/06/23) :
* -Fixed a crash that happened when using an all allies item when all allies
* were dead
*
* Version 1.1.4 (02/23/23) :
* -Fixed a crash that happened when using an item that targeted user
*
* Version 1.1.3 (02/19/23) :
* -Changed some syntax
*
* Version 1.1.2 (02/02/23) :
* -Fixed a bug where Generic messages wouldn't work past array 1 & 2
*
* Version 1.1.1 (01/17/23) :
* -Changed a conditional that was altered post Colored Names rewrite
* -Uncommented a conditional and slightly tweaked is so that it
* properly try to use the "give" message on enemy targets
* -Added a line that sets the party name to the recipient's name
*
* Version 1.1 (01/12/23) :
* -Removed some Compatibility between Colored Names due to a script rewrite
* that removed some manual code
* -Changed a method that called Class Id to just Actor Id
* -Changed the way some names are called
* -Added a conditional that makes the recipient message not appear if the 
* item in question has an enemy scope
*
* Version 1.0 (01/11/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_CustomItemMessages');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.Id1 = arrayizer(Parameters.mId1);
Frashaw.Param.Id2 = arrayizer(Parameters.mId2);
Frashaw.Param.Id3 = arrayizer(Parameters.mId3);
Frashaw.Param.Id4 = arrayizer(Parameters.mId4);
Frashaw.Param.Id5 = arrayizer(Parameters.mId5);
Frashaw.Param.Id6 = arrayizer(Parameters.mId6);
Frashaw.Param.Id7 = arrayizer(Parameters.mId7);
Frashaw.Param.Id8 = arrayizer(Parameters.mId8);
Frashaw.Param.Id9 = arrayizer(Parameters.mId9);
Frashaw.Param.Id10 = arrayizer(Parameters.mId10);
Frashaw.Param.dbB = Parameters.dbB;
Frashaw.Param.m1 = Parameters.m1;
Frashaw.Param.m2 = Parameters.m2;
Frashaw.Param.m3 = Parameters.m3;
Frashaw.Param.m4 = Parameters.m4;
Frashaw.Param.m5 = Parameters.m5;
Frashaw.Param.m6 = Parameters.m6;
Frashaw.Param.m7 = Parameters.m7;
Frashaw.Param.m8 = Parameters.m8;
Frashaw.Param.m9 = Parameters.m9;
Frashaw.Param.m10 = Parameters.m10;
Frashaw.Param.dbM = Parameters.dbM;
Frashaw.Param.dbA = Parameters.dbA;
Frashaw.Param.dbP = Parameters.dbP;

//A function that checks if the value in the array is both a value and positive,
//and removes them if they're not
function isPositive(yes){
	return yes > 0;
}

//Turns all the array elements into intergers
function eacher(item, index, arr){
	arr[index] = parseInt(item);
}

//A function meant to seperate the values gotten from the plugin parameters
//into arrays along with removing any not used valeus
function arrayizer(yes){
	array = yes.split(",");
	array.forEach(eacher);
	array = array.filter(isPositive);
	return array;
}


//Where the shit goes down
Window_BattleLog.prototype.displayAction = function(subject, item) {
	//Used to add compatiblity with another of my plugins, AntiMessage
	if (Imported.AMessage){
		var check = checkChecker(2, "AntiActionResults"); 
	} else {
	//If Dynamic Battlelog Messages isn't on
		var check = true;
	}
	if (check == true) {
    var numMethods = this._methods.length;
	//Used to add compatiblity with another of my plugins, Colored Names
	if (Imported.CName){
		var color = 0;
		if (item.meta.nameColor != null){
			color = parseInt(item.meta.nameColor);
		}
		var icon = 0;
		if (item.meta.iconNum != null){
			icon = parseInt(item.meta.iconNum);
		}
		var name = "\\c[" + color + "]" + item.name + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		var name2 = subject.name();
	} else {
	//If Colored Names isn't being used
		var name = item.name;
		var name2 = subject.name();
	}
    if (DataManager.isSkill(item)) {
        if (item.message1) {
            this.push('addText', name2 + item.message1.format(name));
        }
        if (item.message2) {
            this.push('addText', item.message2.format(name));
        }
    } else {
		//Makes the additional battlelog message if wanted
		var booll = Frashaw.Param.dbB;
		//Will not run code if scope is targeted at an enemy/ies
		if ($dataItems[item.id].scope != 1 && $dataItems[item.id].scope != 2 && $dataItems[item.id].scope != 3 && $dataItems[item.id].scope != 4 && $dataItems[item.id].scope != 5 && $dataItems[item.id].scope != 6 && $dataItems[item.id].scope != 11){
			if (booll){
			//Checks to see if the scope if all allies, dead or alive. Doesn't play the
			//the message if the scope is alive members and only one is alive.
			if (($dataItems[item.id].scope == 8 && $gameParty.aliveMembers().length > 1) || $dataItems[item.id].scope == 10){
				var name3 = Frashaw.Param.dbP; //Gets the party name parameter
				if (name3 == null || name3 == ""){ //Sets the name if the parameter is null or empty
					name3 = "The Party";
				}
				var Message = Frashaw.Param.dbA; //Gets the party give message parameter
				if (Message != null && Message != ""){ 
				//Uses the below code if the message is not null and not empty
					messArray = Message.split('%'); //Splits the message so that it flows good
					if (messArray[1] == undefined) messArray[1] = "";//If there are no %, sets the array value to blank
					if (messArray[2] == undefined) messArray[2] = "";
					this.push('addText', subject.name() + " " + messArray[0] + name3 + messArray[1]);
				} else {
					//message if the paramter one is blank or null
					this.push('addText', subject.name() + " gave the item to " + name3 + "!");
				}
				name2 = name3;
			} else {
				if ($gameParty.aliveMembers().length > 1){
					var yes = $gameParty.members()[BattleManager._action._targetIndex];//Get's the current target's name
					if (yes._name != subject._name){ //Checks to see if the target is different from the user by comparing names
					var id = yes._actorId;//Checks actor Id, because it works
					var Message = Frashaw.Param.dbM;
					if (Message != null && Message != ""){
						messArray = Message.split('%');
						if (messArray[1] == undefined) messArray[1] = "";
						if (messArray[2] == undefined) messArray[2] = "";
						this.push('addText', subject.name() + " " + messArray[0] + yes.name() + messArray[1]);
					} else {
						this.push('addText', subject.name() + " gave the item to " + yes.name() + "!");
					}
					name2 = $gameActors.actor(id).name(); //Sets the name to the recipient so it looks better
					}
				}
			}
			}
		}
		
		//Sets arrays for use.
		var array1 = Frashaw.Param.Id1;
		var array2 = Frashaw.Param.Id2;
		var array3 = Frashaw.Param.Id3;
		var array4 = Frashaw.Param.Id4;
		var array5 = Frashaw.Param.Id5;
		var array6 = Frashaw.Param.Id6;
		var array7 = Frashaw.Param.Id7;
		var array8 = Frashaw.Param.Id8;
		var array9 = Frashaw.Param.Id9;
		var array10 = Frashaw.Param.Id10;
		var id = item.id;
		if (item.meta.customMessage != null){
		//Will override all other messages if a custom one in the tags.
			var Message = item.meta.customMessage;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array1.contains(id)){
		//Message if item is in array 1.
			var Message = Frashaw.Param.m1;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array2.contains(id)){
		//Message if item is in array 2.
			var Message = Frashaw.Param.m2;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array3.contains(id)){
		//Message if item is in array 3.
			var Message = Frashaw.Param.m3;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array4.contains(id)){
		//Message if item is in array 4.
			var Message = Frashaw.Param.m4;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array5.contains(id)){
		//Message if item is in array 5.
			var Message = Frashaw.Param.m5;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array6.contains(id)){
		//Message if item is in array 6.
			var Message = Frashaw.Param.m6;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array7.contains(id)){
		//Message if item is in array 7.
			var Message = Frashaw.Param.m7;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array8.contains(id)){
		//Message if item is in array 8.
			var Message = Frashaw.Param.m8;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array9.contains(id)){
		//Message if item is in array 9.
			var Message = Frashaw.Param.m9;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else if (array10.contains(id)){
		//Message if item is in array 10.
			var Message = Frashaw.Param.m10;
			if (Message != null && Message != ""){
				messArray = Message.split('%');
				if (messArray[1] == undefined) messArray[1] = "";
				this.push('addText', name2 + " " + messArray[0] + name + messArray[1]);
			} else {
				this.push('addText', TextManager.useItem.format(name2, name));
			}
		} else {
		//Message if item isn't in any array.
		this.push('addText', TextManager.useItem.format(name2, name));
		}
    }
    if (this._methods.length === numMethods) {
        this.push('wait');
    }
}
};

//=============================================================================
// End of File
//=============================================================================
