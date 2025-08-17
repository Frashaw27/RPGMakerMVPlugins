//=============================================================================
// FRSH_CustomItemMessages
// FRSH_CustomItemMessages.js
// Version: 1.2.1
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
* @param Common Messages #1
* @default
*
* @param messageIds1
* @text Message Ids
* @parent Common Messages #1
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message1
* @text Message
* @parent Common Messages #1
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #2
* @default
*
* @param messageIds2
* @text Message Ids
* @parent Common Messages #2
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message2
* @text Message
* @parent Common Messages #2
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #3
* @default
*
* @param messageIds3
* @text Message Ids
* @parent Common Messages #3
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message3
* @text Message
* @parent Common Messages #3
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #4
* @default
*
* @param messageIds4
* @text Message Ids
* @parent Common Messages #4
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message4
* @text Message
* @parent Common Messages #4
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #5
* @default
*
* @param messageIds5
* @text Message Ids
* @parent Common Messages #5
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message5
* @text Message
* @parent Common Messages #5
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #6
* @default
*
* @param messageIds6
* @text Message Ids
* @parent Common Messages #6
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message6
* @text Message
* @parent Common Messages #6
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #7
* @default
*
* @param messageIds7
* @text Message Ids
* @parent Common Messages #7
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message7
* @text Message
* @parent Common Messages #7
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #8
* @default
*
* @param messageIds8
* @text Message Ids
* @parent Common Messages #8
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message8
* @text Message
* @parent Common Messages #8
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #9
* @default
*
* @param messageIds9
* @text Message Ids
* @parent Common Messages #9
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message9
* @text Message
* @parent Common Messages #9
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Common Messages #10
* @default
*
* @param messageIds10
* @text Message Ids
* @parent Common Messages #10
* @type number[]
* @desc Insert the Id of the Item you want to use this message, each one individually added
* @default
*
* @param message10
* @text Message
* @parent Common Messages #10
* @type text
* @desc Put the message you want to use, with % being used to act as the item's name. EX: ate the %!
* @default
*
* @param Give Messages
* @default
*
* @param enableGiveMessages
* @text Enable?
* @parent Give Message
* @type boolean
* @desc Click True or False if you want to enable Custom Messages if the target isn't the user nor an enemy.
* @default true
*
* @param singleGiveMessage
* @text Message to 1
* @parent Give Message
* @type text
* @desc Put the message you'll use when using an item to an ally, with 1% being the ally's name and 2% the item's.
* @default gave the 2% to 1%!
*
* @param singleDeadGiveMessage
* @text Message to Dead 1
* @parent Give Message
* @type text
* @desc Put the message you'll use when using an item to a dead ally, with 1% being the ally's name and 2% the item's.
* @default gave the 2% to 1%!
*
* @param partyGiveMessage
* @text Message to All
* @parent Give Message
* @type text
* @desc Put the message you'll use when using an item on the party, with 1% being the party's name and 2% the item's.
* @default gave the 2% to 1%!
*
* @param partyDeadGiveMessage
* @text Message to Dead All
* @parent Give Message
* @type text
* @desc Put the message you'll use when using an item on a dead party, with 1% being the party's name and 2% the item's.
* @default gave the 2% to 1%!
*
* @param partyNameMessage
* @text Party Name
* @parent Give Message
* @type text
* @desc Put the name you want to use when using an item that targets the party. 
* @default The Party
*
* @help
* ==Notetags====================================================================
* Spaces and Capitalization doesn't matter
*
* Items:
* <Custom Item Message: text> - follows the same rules as the one from plugin
* set up. Can swap Item and Custom or remove one (and their space) entirely,
* Ex: <Item Message:
* ===Introduction===============================================================
* For a long time, I disliked how RPG Maker at base doesn't allow for
* several item use messages like it does for skills. This is fine for most
* cases, but I feel like adding the detail that someone "eats" the
* sandwich or "drinks" the potion is much better and immersive then just
* them "using" it. So I made this plugin for that exact purpose. It allows
* having groups of items share the same customized message or for an item
* to have their own customized one. What ever suits your fancy! I also
* decided to tack on giving items recipients if they're not their
* user because why not?
* ===How to Use=================================================================
* For Messages, your string should be like "used the %!". The % is what is used
* to indicate the item, so make sure to include it if you want to show what 
* item it is. Beyond that it is mostly just inserting the appropriate numbers
* and messages into the given catagories and using the custom message when
* needed.
* Remember to use 1% and 2% for the give messages as they both are needed for 
* the recipient name and item name respectively in those messages.
* ===Change Log=================================================================
* Version 1.2.0 (06/20/25) :
* -Rewrote almost entire plugin to be mroe efficent, more clean, and to have
* better practices in regards to setting item Message
* -Updated the compatability with ColoredNames to have the new methods of color
* gettings for names and such so that it isn't reliant on specific old calls
* -Updated compatability with AntiMessage
* -Updated Notetag to have space and capitalization ignoring alongside allowing
* for variations
* -Added specific messages to giving to Dead Allies and Dead Parties
*
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
* ==============================================================================
*/
//==============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_CustomItemMessages');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.ItemMessages = [];
//Goes through the array in order to get the 10 different messages and id lists
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(i){
	//A variable for the item to set at the called id list
	thing = eval("Parameters.messageIds" + i);
	//Makes sure the id list actually exists
	if (thing != "") {
		//Turns the list into a normal array
		array = JSON.parse(thing);
		//Goes through the array to make all the elements into numbers
		array.forEach(function(e, id, a){
			//Just incase one of the data is not a number, it catches it and sets
			//it to 0 instead
			try{
				a[id] = Number(e);
			} catch {
				a[id] = 0;
			}
		});
	} else {
	//Makes an empty array if it is empty
		array = [];
	}
	Frashaw.Param.ItemMessages.push([array, eval("Parameters.message" + i)]);
});

//Sets a bool and strings
Frashaw.Param.enableGiveMessages = Parameters.enableGiveMessages == "true";
Frashaw.Param.singleGiveMessage = Parameters.singleGiveMessage;
Frashaw.Param.singleDeadGiveMessage = Parameters.singleDeadGiveMessage;
Frashaw.Param.partyGiveMessage = Parameters.partyGiveMessage;
Frashaw.Param.partyDeadGiveMessage = Parameters.partyDeadGiveMessage;
Frashaw.Param.partyNameMessage = Parameters.partyNameMessage;

//Preloads the various things for the messages
var FrshCIMessageLoaded = false;
FrshCIMessageLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshCIMessageLoaded_database.call(this)) return false; 
	if (FrshCIMessageLoaded == false) {
		this.processItemMessageThings($dataItems);
		FrshCIMessageLoaded = true;
	}
	return true;
};

//A function to process the unique messages for items
DataManager.processItemMessageThings = function(group) {
	var string = "";
	var note = /<(?:Custom|Item)[ ]?(?:Custom|Item)?[ ]?Message:(.*)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for the message
		obj.itemMessage = "";

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
				obj.itemMessage = RegExp.$1;
			}
		}
		
		//Checks to see if the message has been set yet
		if (obj.itemMessage == ""){
			//Goes through the id lists and seeing if the item is in any of them
			for(i = 0; i != 10; i++){
				if (Frashaw.Param.ItemMessages[i][0].contains(n)){
					obj.itemMessage = Frashaw.Param.ItemMessages[i][1];
					//Stops the checking if it is found in a list
					break;
				}
			}
			//If the string still doesn't have a message, default to the TextManager
			//option
			if (obj.itemMessage == ""){
				//Alters the Textmanage string to line up with the rest of the plugin
				string = TextManager.useItem.replace("%1", "").replace("%2", "%");
				obj.itemMessage = string;
			}
		}
		//Checks to see if the first element is a space, if not then it adds one
		if (obj.itemMessage[0] != " ") obj.itemMessage = " " + obj.itemMessage;
	}
};

//Where the shit goes down
Window_BattleLog.prototype.displayAction = function(subject, item) {
	//Preforms a check to see if AntiMessages is active to see if it should be shown 
	if (Imported.AMessage){
		num = Frashaw.Param.DSwitches[2];
		check = true;
		if (num != 0){
			if ($gameSwitches.value(num)) check = false;
		}
		if (BattleManager._action.item().antiResults) check = false;
	} else {
	//If AntiMessages isn't on
		var check = true;
	}
	if (check) {
		var numMethods = this._methods.length;
		//When ColoredNames is active, makes the name of the item be colored and
		//have an icon
		if (Imported.CName){
			var name = "\\ohx[" + getNameOutlineColor(item) + "]\\hx[" + getNameColor(item) + "]" + item.name + "\\c[0]\\ohx[" + normalOutlineColor + "]";
			if (getNameIcon(item) != 0) name = "\\i[" + getNameIcon(item) + "]" + name;
			var name2 = subject.name();
		} else {
		//If Colored Names isn't being used
			var name = item.name;
			var name2 = subject.name();
		}
		//Runs the function normally if the thing being used isn't an item
		if (DataManager.isSkill(item)) {
			if (item.message1) {
				this.push('addText', name2 + item.message1.format(name));
			}
			if (item.message2) {
				this.push('addText', item.message2.format(name));
			}
		} else {
			//Checks to see if the give messages are on
			if (Frashaw.Param.enableGiveMessages){
				var scope = item.scope;
				//Checks for a "One Ally" scope and that the target isn't the user
				if (scope == 7 && !BattleManager._targets.contains(subject)){
					//Gets the requisite line
					mes = Frashaw.Param.singleGiveMessage;
					//Doesn't run if there isn't a give message
					if (mes != ""){
						//Adds a space to the start of the line if it doesn't exist
						if (mes[0] != " ") mes = " " + mes;
						//Replaces the %s for the Item and Target names respectively
						mes = name2 + mes.replace("2%", name).replace("1%", BattleManager._targets[0].name());
						//Adds the text to the battle log
						this.push('addText', mes);
						//Changes the name for who is using what
						name2 = BattleManager._targets[0].name();
					}
				//Checks for a "One Dead Ally" with an alternate of an "All Dead Allies"
				//with only one dead party member
				} else if (scope == 9 || (scope == 10 && $gameParty.deadMembers().length == 1)){
					mes = Frashaw.Param.singleDeadGiveMessage;
					if (mes != ""){
						if (mes[0] != " ") mes = " " + mes;
						mes = name2 + mes.replace("2%", name).replace("1%", BattleManager._targets[0].name());
						this.push('addText', mes);
						name2 = BattleManager._targets[0].name();
					}
				//Checks for "All Allies" and that there is more then 1 ally alive
				} else if (scope == 8 && $gameParty.aliveMembers().length > 1){
					mes = Frashaw.Param.partyGiveMessage;
					if (mes != ""){
						if (mes[0] != " ") mes = " " + mes;
						//Gets the specified party name, defaulting to the Party
						//when the specified name doesn't exist
						partyName = (Frashaw.Param.partyNameMessage != "") ? Frashaw.Param.partyNameMessage : "the Party";
						mes = name2 + mes.replace("2%", name).replace("1%", partyName);
						this.push('addText', mes);
						name2 = partyName;
					}
				//Checks for "All Dead Allies" and there is more then 1 dead ally
				} else if (scope == 10 && $gameParty.deadMembers().length > 1){
					mes = Frashaw.Param.partyDeadGiveMessage;
					if (mes != ""){
						if (mes[0] != " ") mes = " " + mes;
						partyName = (Frashaw.Param.partyNameMessage != "") ? Frashaw.Param.partyNameMessage : "the Party";
						mes = name2 + mes.replace("2%", name).replace("1%", partyName);
						this.push('addText', mes);
						name2 = BattleManager._targets[0].name();
					}
				}
			}
			//Gets the line for the actual item message
			mes = name2 + item.itemMessage.replace("%", name)
			this.push('addText', mes);
	}}
};
})();
//=============================================================================
// End of File
//=============================================================================
