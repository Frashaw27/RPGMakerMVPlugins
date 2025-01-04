//=============================================================================
// FRSH_RandomTerms
// FRSH_RandomTerms.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.RTerms = true;

var Frashaw = Frashaw || {};
Frashaw.RTerms = Frashaw.RTerms || {};

/*:
* @plugindesc Adds random messages to be shown for end of battle messages.
* @author Frashaw27
*
* @param commaDrops
* @text Commaize Drops
* @type boolean
* @desc Click True or False if you want drops to show a commaized amount. Ex: 1,000 Gold.
* @default true
*
* @param
* @default
*
* @param partyTerms
* @text Party Names
* @type text[]
* @desc Enter various names for the friends of the leader of the party. Ex: "'s comrades". Use \\ for text codes. Ex: \\c[20]
*
* @param goldTerms
* @text Gold Terms
* @type text[]
* @desc Enter various verbs for taking Gold from enemies. Ex: "gotten". Use \\ for text codes. Ex: \\c[20]
*
* @param goldName
* @text Gold Name
* @type text
* @desc Enter the name you want to display after the number from token drops. Ex: " coins". Leave blank for the default. 
*
* @param expTerms
* @text Experience Terms
* @type text[]
* @desc Enter various verbs for gaining Experience from enemies. Ex: "learned". Use \\ for text codes. Ex: \\c[20]
*
* @param expName
* @text Experience Name
* @type text
* @desc Enter the name you want to display after the number from experience. Ex: " exp". Leave blank for the default. 
*
* @param itemTerms
* @text Item Got Terms
* @type text[]
* @desc Enter various verbs for gaining Item Drops from enemies. Ex: "got". Use \\ for text codes. Ex: \\c[20]
*
* @param victoryTerms
* @text Victory Terms
* @type text[]
* @desc Enter various lines for winning over enemies. Ex: "lost". Use \\ for text codes. Ex: \\c[20]
*
* @param defeatTerms
* @text Defeat Terms
* @type text[]
* @desc Enter various lines for gameovering/losing to enemies. Ex: "lost". Use \\ for text codes. Ex: \\c[20]
*
* @param escapeTerms
* @text Escape Terms
* @type text[]
* @desc Enter various lines for running from enemies. Ex: "ran far, far away!". Use \\ for text codes. Ex: \\c[20]
*
* @param escfailTerms
* @text Escape Fail Terms
* @type text[]
* @desc Enter various lines for failing running from enemies. Ex: "but tripped!". Use \\ for text codes. Ex: \\c[20]
*
* @help 
* ===Introduction===============================================================
* I just liked the idea of having multiple ways to show the same information in
* the end battle results, and I made this.
* ===How to Use=================================================================
* Setup the stuff on the right and then you don't need to do anything else.
* Note: regardless of what you do, the exp amount followed by the term will
* show for the gold, items, and experience and then add the terms. Ex: 
* "100 Experience" + term. For the defeat and escape messages, they'll do
* the same but for the party name. Ex: "Bonner and friends" + escape line.
* ===Change Log=================================================================
* Version 1.0.0 (01/03/2025):
* -Finished Base Plugin
* ==============================================================================
*/
//A function to add commas to numbers in putted
function commaize(number){
	//Checks to see if the type of the value inserted is a number or not,
	//returning if it's not
	if (typeof(number) != 'number') return number;
	//Turns it into a string so that it can be split into individual numbers
	var string = number.toString();
	string = string.split("");
	//Reverses the string so it can add the commas based on the placement
	string.reverse();
	var outside = 0;
	var loopStart = 0;
	//Checks to see if the number has a decimal or not
	if (number % 1 != 0){
		//Goes through each number until it reaches the decimal point
		for (var loop = 0; loop != string.length; loop++){
			loopStart++;
			if (string[loop] == ".") break;
		}
	}
	//Goes through each each number to add commas to the numbers
	for (var loop = loopStart; loop != string.length; loop++){
		if (string[loop] == ",") continue;
		//A special variable to account for the commas to skip counting them
		outside++;
		if (outside == 3 && loop+1 != string.length){
			string.splice(loop+1, 0, ",");
			outside = 0;
		}
	}
	string.reverse();
	string = string.join("");
	return string;
}

//A function that removes the a section of the string and gives back the result
function removeReplace(string, remove){
	var string = string.split(remove);
	//Checks to see if the split had any results by having 1 or more results
	if (string.length != 1){
		//Checks to make sure that the first result isn't blank or a space
		if (string[0] != "" && string[0] != " "){
			string = string[0];
		//Always returns the second result if the first one was blank/space
		} else {
			string = string[1];
		}
	} else {
		string = string[0];
	}
	return string;
}

(function() {
//Gets the parameters from the plugin-in settings
Parameters = PluginManager.parameters('FRSH_RandomTerms');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.CommaDrops = Parameters.commaDrops == "true";
Frashaw.Param.PartyNames = [];
if (Parameters.partyTerms != "") Frashaw.Param.PartyNames = Frashaw.Param.PartyNames.concat(JSON.parse(Parameters.partyTerms));
Frashaw.Param.GoldLines = [];
if (Parameters.goldTerms != "") Frashaw.Param.GoldLines = Frashaw.Param.GoldLines.concat(JSON.parse(Parameters.goldTerms));
Frashaw.Param.GoldName = (Parameters.goldName != "") ? Parameters.goldName : "\G";
Frashaw.Param.ExpLines = [];
if (Parameters.expTerms != "") Frashaw.Param.ExpLines = Frashaw.Param.ExpLines.concat(JSON.parse(Parameters.expTerms));
Frashaw.Param.ExpName = Parameters.expName;
Frashaw.Param.ItemLines = [];
if (Parameters.itemTerms != "") Frashaw.Param.ItemLines = Frashaw.Param.ItemLines.concat(JSON.parse(Parameters.itemTerms));
Frashaw.Param.VictoryLines = [];
if (Parameters.victoryTerms != "") Frashaw.Param.VictoryLines = Frashaw.Param.VictoryLines.concat(JSON.parse(Parameters.victoryTerms));
Frashaw.Param.DefeatLines = [];
if (Parameters.defeatTerms != "") Frashaw.Param.DefeatLines = Frashaw.Param.DefeatLines.concat(JSON.parse(Parameters.defeatTerms));
Frashaw.Param.EscapeLines = [];
if (Parameters.escapeTerms != "") Frashaw.Param.EscapeLines = Frashaw.Param.EscapeLines.concat(JSON.parse(Parameters.escapeTerms));
Frashaw.Param.EscFailLines = [];
if (Parameters.escfailTerms != "") Frashaw.Param.EscFailLines = Frashaw.Param.EscFailLines.concat(JSON.parse(Parameters.escfailTerms));

//An overwrite that calls and gets a random party name when applicable
Game_Party.prototype.name = function() {
    var numBattleMembers = this.battleMembers().length;
    if (numBattleMembers === 0) {
        return '';
    } else if (numBattleMembers === 1) {
        return this.leader().name();
    } else {
		//Gets the base name for the party, and removes the place for the party leader's name
		var name = removeReplace(TextManager.partyName, "%1");
		//Gets the list of alt names
		var list = Frashaw.Param.PartyNames;
		list.push(name);
		//Sends the name as a combo as the leader's name and a random saying
        return this.leader().name() + list[Math.randomInt(list.length)];
    }
};

//An overwrite that calls and gets a random gold reward message
BattleManager.displayGold = function() {
    var gold = this._rewards.gold;
    if (gold > 0) {
		var name = removeReplace(TextManager.obtainGold, "%1");
		//Makes sure to remove the base gold
		name = removeReplace(name, "\\G");
		var list = Frashaw.Param.GoldLines;
		list.push(name);
		var rand = Math.randomInt(list.length);
		//Has variety of checks to add logic about the message
        $gameMessage.add('\\.' + ((Frashaw.Param.CommaDrops) ? commaize(gold) : gold) + ((Frashaw.Param.GoldName[0] != " ") ? " " : "") + Frashaw.Param.GoldName + ((Frashaw.Param.GoldName[Frashaw.Param.GoldName.length-1] != " " && list[rand][0] != " ") ? " " : "") + list[rand] + ((!list[rand].contains("!")) ? "!" : ""));
    }
};

//An overwrite that calls and gets a random experience reward message
BattleManager.displayExp = function() {
    var exp = this._rewards.exp;
    if (exp > 0) {
		var name = removeReplace(TextManager.obtainExp, "%1");
		//Makes sure to remove the 2nd replacement value
		name = removeReplace(name, "%2");
		var list = Frashaw.Param.ExpLines;
		list.push(name);
		expName = (Frashaw.Param.ExpName != "") ? Frashaw.Param.ExpName : TextManager.exp;
		var rand = Math.randomInt(list.length);
        $gameMessage.add('\\.' + ((Frashaw.Param.CommaDrops) ? commaize(exp) : exp) + ((Frashaw.Param.ExpName[0] != " ") ? " " : "") + Frashaw.Param.ExpName + ((Frashaw.Param.ExpName[Frashaw.Param.ExpName.length-1] != " " && list[rand][0] != " ") ? " " : "") + list[rand] + ((!list[rand].contains("!")) ? "!" : ""));
    }
};

//An overwrite that calls and gets a random item drop reward message
BattleManager.displayDropItems = function() {
    var items = this._rewards.items;
    if (items.length > 0) {
        $gameMessage.newPage();
		var name = removeReplace(TextManager.obtainItem, "%1");
		var list = Frashaw.Param.ItemLines;
		list.push(name);
        items.forEach(function(item) {
			//A special check that makes the name of the item colored if colored names was
			//also implamented
			if (Imported.CName){
				var name = "";
				name += "\\i[" + getNameIcon(item) + "]";
				name += "\\hx[" + getNameColor(item) + "]";
				name += "\\ohx[" + getNameOutlineColor(item) + "]";
				name += item.name;
				name += "\\c[0]";
				name += "\\ohx[" + normalOutlineColor + "]";
			} else {
				var name = item.name;
			}
            $gameMessage.add(list[Math.randomInt(list.length)] + name + "!");
        });
    }
};

//An overwrite that calls and gets a random victory message
BattleManager.displayVictoryMessage = function() {
	var name = removeReplace(TextManager.victory, "%1");
	var list = Frashaw.Param.VictoryLines;
	list.push(name);
    $gameMessage.add($gameParty.name() + list[Math.randomInt(list.length)]);
};

//An overwrite that calls and gets a random defeat message
BattleManager.displayDefeatMessage = function() {
	var name = removeReplace(TextManager.defeat, "%1");
	var list = Frashaw.Param.DefeatLines;
	list.push(name);
	$gameMessage.add($gameParty.name() + list[Math.randomInt(list.length)]);
};

//An overwrite that calls and gets a random escape message
BattleManager.displayEscapeSuccessMessage = function() {
	var name = removeReplace(TextManager.escapeStart, "%1");
	var list = Frashaw.Param.EscapeLines;
	list.push(name);
	$gameMessage.add($gameParty.name() + list[Math.randomInt(list.length)]);
};

//An overwrite that calls and gets a random escape failure message
BattleManager.displayEscapeFailureMessage = function() {
	this.displayEscapeSuccessMessage();
	var name = removeReplace(TextManager.escapeFailure, "%1");
	var list = Frashaw.Param.EscFailLines;
	list.push(name);
	$gameMessage.add("\\." + list[Math.randomInt(list.length)]);
};
})();
//=============================================================================
// End of File
//=============================================================================
