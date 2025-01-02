//=============================================================================
// FRSH_ColoredNames
// FRSH_ColoredNames.js
// Version: 1.4.1
//=============================================================================

var Imported = Imported || {};
Imported.CName = true;

var Frashaw = Frashaw || {};
Frashaw.CName = Frashaw.CName || {};

/*:
* @plugindesc Allows the ability to color Thing's Names w/o Text Codes.
* @author Frashaw27
* 
* @help 
* ==Notetags====================================================================
* | = either one works
* Non-case sensitive
* Actors, Classes, Weapons, Armors, Skills, Items, and Enemies:
* Name Color: <Name Color|nameColor: colorId> - Gets the color of the name based 
* on text codes.
* Name Hex Color: <Name Hex Color|nameHexColor: colorId> - Gets the color of the 
* name based on a hexadecial code.
* Name Color Eval: <Name Color Eval|nameColorEval></Name Color Eval|
* nameColorEval> - Put the code between these the /-less and the / versions, use 
* winColor for window colors and red, green, and blue if you want to make a
* special color. You can also use hex to specify a dedicated hexadecial code. 
* red, green, and blue aswell as the hex code both override winColor return.
*
* Same as above but for the outline color
* Name Outline Color: <Outline Color|Name Outline Color|outColor: colorId>
* Name Outline Color: <Outline Hex Color|Name Outline Hex Color|outColor: 
* colorId>
* Name Outline Color Eval: <Outline Color Eval|Name Outline Color Eval|
* outColorEval></Outline Color Eval|Name Outline Color Eval|outColorEval>
*
* Name Icon: <Icon Number|iconNum: iconId> - Gets the numerical value of the 
* Icon you want to use.
* Name Icon Eval: <iconNumEval|Icon Number Eval></iconNumEval|Icon Number 
* Eval> - Use icon for the icon you want to use.
* * - Items, Skills, Weapons, and Armors' Icons will change to match the ones 
* selected by the notetag calls.
*
* Actors:
* *All functions work the same as above, just called differently.
* Nickame Color: <Nickame Color|nnameColor: colorId>
* Nickame Hex Color: <Nickame Hex Color|nnameHexColor: hexCode>
* Nickame Color Eval: <Nickname Color Eval|nnameColorEval></Nickname Color Eval|
nnameColorEval>
*
* Nickname Outline Color: <Nickname Outline Color|noutNameColor: colorId>
* Nickname Outline Hex Color: <Nickname Outline Hex Color|noutNameHexColor: 
* hexCode>
* Nickname Outline Color Eval: <Nickname Outline Color Eval|noutNameColorEval>
* </Nickname Outline Color Eval|noutNameColorEval>
*
* Nickname Icon: <Nickname Icon Number|Nick Icon Number|niconNum: iconId>
* Name Icon Eval: <Nick Icon Number Eval|Nickname Icon Number Eval|niconNumEval>
* </Nick Icon Number Eval|Nickname Icon Number Eval|niconNumEval>
* ===Text Codes=================================================================
* \hx[]: Changes the next text's color to a color based on a hexadecimal code. 
* Ex: #ffffff
* \oc[]: Changes the next text's outline color a color based on a window 
* color number.
* \ohx[]: Changes the next text's outline color a color based on a hexadecimal
* code. Ex: #000000
* ===Script Calls===============================================================
* getTextColor(valid text code number here): Returns the hexadecial code for the
* text code number that was entered.
* getNameColor(put the thing to get name color of): Returns the hexadecial code
* for what the name color of the thing would be.
* getNameOutlineColor(put the thing to get name outline color of): Returns the 
* hexadecial code for what the name outline color of the thing would be.
* getNameIcon(put the thing to get name icon of): Returns the numerical value
* the icon for what the icon of the thing would be.
* [actor, enemy].colorName() - Calls the specifically colored name instead of
* the normal name() which has been given conditions to avoid rash errors.
* Please report places where they should but aren't, but other plugin
* functionality is on a case by case basis.
* ===Introduction===============================================================
* While working on my games, I noticed that I liked having items colored names 
* because it looks it neat. However, I ran into the problem that this also made 
* by database very cluttered, which was a problem for both me and anyone looking 
* through it. So I made this plugin so that I didn't have to use Text Codes by 
* Modern Algebra. From that point, I also added the ability to add Icons because 
* I realised I also needed those and thought they might be of some use.
* ===How to Use=================================================================
* Insert one of the calls in the Notetags section into the notetags. It's 
* as simple as that. If not added, it will be the default 0 text color/the 
* base text color. Works for Items, Weapons, Armors, Skills, Enemies, Classes,
* Actors, and Actor's nicknames (which have seperate calls as they're put into
* the same notetag). Note that icons will not in the selection menu for Items,
* Weapons, Armors, and Skills as they have their own dedicated icon slots. 
* These will however be used to insert the desired icon if called elsewhere
* like the skill learning through Level Up. 
*
* Due to the nature of this, it might not work properly with
* certain plugins that also overwrite the original name drawing method. If
* this is your case, I'd recommend setting it lower as that seems to have the
* last one to overwrite it to be the one that overwrites it.
* 
* You can also now use the \hx[] to insert a hexadecimal color code for a
* special color (ex: #ffffff, yes the # is necessary). You can use Yanfly's
* Message Core \oc[] to determine the the text's color outline via the window
* color selection (stolen for ease of use). And finally, you can use \ohx[] to
* determine the outline color with hexadecimal code like with \hx.
* ===Change Log=================================================================
* Version 1.4.1 (01/02/25):
* -Fixed an oversight where colorName would still apply the logic added to the
* normal one
*
* Version 1.4.0 (12/25/24):
* -Fixed a bug where certain windows would show messed up versions of the 
* Actor and Enemy names
* -Added the colorName() function to actors and enemies 
*
* Version 1.3.1 (8/30/24):
* -Fixed a bug with writing nick names
*
* Version 1.3.0 (06/22/24):
* -Rewrote a majority of the code
* -Fixed several bugs concerning evals
* -Added the ability to call hex colors directly without having to go through
* the Eval
* -Added an alterate naming scheme for Nickname calling
* -Made the generic functions callable outside the plugin
* -Added the ability to have icon evals change the icons of Items, Skills,
* Weapons, and Armors
*
* Version 1.2.2 (12/28/23):
* -Fixed name color eval
* -Added a option to give a hex code directly
*
* Version 1.2.2 (09/25/23):
* -Fixed bug where shop would display nickname
* -Added a check to stop crashing when plugins removed the enemy select box
*
* Version 1.2.1 (09/19/23):
* -Added a fix for crash with shop names
*
* Version 1.2.0 (09/17/23):
* -Rewrote a majority of the code to be more efficent and not call the 
* notetags directly
* -Added evals to color and Icons
* -Added the ability to color outlines
* -Added the \hx, \oc, and \ohx outlines
*
* Version 1.1.3 (04/13/23):
* -Added compatibility with my Summons script
*
* Version 1.1.2 (01/09/23):
* -Changed syntax
*
* Version 1.1.1 (01/09/23):
* -Added a method to properly draw character's name in shop menu
*
* Version 1.1.0 (01/11/23):
* -Rewrote method to get the Actor's Name, which removes many manual 
* applications and allows more compatibility for more plugins
* -Removed overwrites of Battlelog messages as it simply wasn't needed
* now
* -Added a function to get an Item's proper name
* -Added a method to overwrite the Item Drop text 
*
* Version 1.0.1 (01/11/23):
* -Add Compatiblity with Custom Item Messages
* -Added Battlelog messages being colored
* 
* Version 1.0 (01/09/23):
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
//============================================================================
//Commonly Used Outside Functions
//============================================================================
//Gets a color hexadeciaml code from a selected 
function getTextColor(n) {
	//Calculates the x pixel placement of the color via some math I don't understand
    var px = 96 + (n % 8) * 12 + 6;
	//Calculates the y pixel placement of the color via some math I don't understand
    var py = 144 + Math.floor(n / 8) * 12 + 6;
	//Returns the selected color of the windowskin
    return ImageManager.loadSystem('Window').getPixel(px, py);
};

//Spits out what Name Color the thing will use
//A generic function so it can be for several different things like Skills and Items
function getNameColor(item) {
	//The way the if-else chain is setup like this as the game will crash if inversed/
	//made to check if the item is an Actor or Enemy
	//Checks to make sure the thing being checked is an Item
	if (DataManager.isItem(item)){
		//Sets the "user" as their respective data entry for calling
		var user = $dataItems[item.id];
	//Checks to make sure the thing being checked is a Skill
	} else if (DataManager.isSkill(item)){
		var user = $dataSkills[item.id];
	//Checks to make sure the thing being checked is a Weapon
	} else if (DataManager.isWeapon(item)){
		var user = $dataWeapons[item.id];
	//Checks to make sure the thing being checked is an Armor
	} else if (DataManager.isArmor(item)){
		var user = $dataArmors[item.id];
	//Checks to make sure the thing being checked is an Actor
	} else if (item.isActor()){
		var user = $dataActors[item.actorId()];
	//Checks to make sure the thing being checked is an Enemy
	} else if (item.isEnemy()){
		var user = $dataEnemies[item.enemyId()];
	}
	//Checks to see if the eval is needed to be ran
	if (user.nameColorEval != ""){
		//Runs said eval
		return colorEvaluate(user.nameColorEval);
	//Checks to see if a hex color has been specified
	} else if (user.nameHexColor != ""){
		//Returns said specified hex color
		return user.nameHexColor;
	//Checks to see if the numerical text code has been entered
	} else if (user.nameColor != 0){
		//Returns the color of said numerical code
		return getTextColor(user.nameColor);
	} else {
		//Returns the default text color if none of the above options are available
		return getTextColor(0);
	}
};

//Spits out what Outline Color the thing will use
function getNameOutlineColor(item) {
	if (DataManager.isItem(item)){
		var user = $dataItems[item.id];
	} else if (DataManager.isSkill(item)){
		var user = $dataSkills[item.id];
	} else if (DataManager.isWeapon(item)){
		var user = $dataWeapons[item.id];
	} else if (DataManager.isArmor(item)){
		var user = $dataArmors[item.id];
	} else if (item.isActor()){
		var user = $dataActors[item.actorId()];
	} else if (item.isEnemy()){
		var user = $dataEnemies[item.enemyId()];
	}
	if (user.outNameColorEval != ""){
		return colorEvaluate(user.outNameColorEval);
	} else if (user.outNameHexColor != ""){
		return user.outNameHexColor;
	//Checks for -1 as 0 is a useable outline color in my eyes
	} else if (user.outNameColor != -1){
		return getTextColor(user.outNameColor);
	} else {
		return normalOutlineColor;
	}
};

//Spits out what Icon the thing will use
function getNameIcon(item) {
	//A special check to see if the item in question is not an Actor nor enemy
	//and then makes it so that it returns something different if nothing else
	//pans out
	var thing = false;
	if (DataManager.isItem(item)){
		var user = $dataItems[item.id];
		thing = true;
	} else if (DataManager.isSkill(item)){
		var user = $dataSkills[item.id];
		thing = true;
	} else if (DataManager.isWeapon(item)){
		var user = $dataWeapons[item.id];
		thing = true;
	} else if (DataManager.isArmor(item)){
		var user = $dataArmors[item.id];
		thing = true;
	} else if (item.isActor()){
		var user = $dataActors[item.actorId()];
	} else if (item.isEnemy()){
		var user = $dataEnemies[item.enemyId()];
	}
	if (user.iconNumEval != ""){
		return iconEvaluate(user.iconNumEval);
	} else if (user.iconNum != 0){
		return user.iconNum;
	} else {
		//Checks for if the icon needed is for an Item, Skill, Weapon, or Armor
		if (thing){
			//Returns the items base Icon
			return item.iconIndex;
		} else {
			//Returns undefined so it doesn't get accidentally called
			return undefined;
		}
	}
};

//Evaluates the code of any color eval that goes in. Not exactly wanted for normal
//person usage, but it needs to be out of the main function to run properly
function colorEvaluate(code){
	var red = 0;
	var green = 0;
	var blue = 0;
	var winColor = 0;
	var hex = "";
	try {
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = "Color Evaluate Error!!!!!"
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
	if (red != 0 || green != 0 || blue != 0){
		var color = "rgba(" + red + ", " + green + ", " + blue + ")";
		var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
		return `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
	} else if (hex != ""){
		return hex;
	} else {
		return getTextColor(winColor);
	}
}

//Evaluates any icon number eval that goes in. Not exactly wanted for normal
//person usage, but it needs to be out of the main function to run properly
function iconEvaluate(code){
	var icon = 0;
	try {
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = this._name + " Icon Evaluate Error!!!!!"
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
	return icon;
}

//This variable is outside the main function as the ones above will crash with out it
//and it is needed to recall whatever outline the user wants for their base
var normalOutlineColor = '';

(function() {
//============================================================================
//Setup
//============================================================================
//Preloads the various things for the evals
var FrshCNamesLoaded = false;
FrshCNamesLoaded_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshCNamesLoaded_database.call(this)) return false; 
	if (FrshCNamesLoaded == false) {
		this.processNameThings($dataActors);
		this.processNicknameThings($dataActors);
		this.processNameThings($dataClasses);
		this.processNameThings($dataEnemies);
		this.processNameThings($dataItems);
		this.processNameThings($dataSkills);
		this.processNameThings($dataWeapons);
		this.processNameThings($dataArmors);
		FrshCNamesLoaded = true;
	}
	return true;
};

//Sets said evals
DataManager.processNameThings = function(group) {
	var string = "";
	var note1A = /<(?:NAME COLOR|nameColor):[ ](.*)>/i;
	var note1B = /<(?:NAME HEX COLOR|nameHexColor):[ ](.*)>/i;
	var note1C = /<(?:NAME COLOR EVAL|nameColorEval)>/i;
	var note1D = /<\/(?:NAME COLOR EVAL|nameColorEval)>/i;
	var note2A = /<(?:OUTLINE COLOR|NAME OUTLINE COLOR|outColor):[ ](.*)>/i;
	var note2B = /<(?:OUTLINE HEX COLOR|NAME OUTLINE HEX COLOR|outHexColor):[ ](.*)>/i;
	var note2C = /<(?:OUTLINE COLOR EVAL|NAME OUTLINE COLOR EVAL|outColorEval)>/i;
	var note2D = /<\/(?:OUTLINE COLOR EVAL|NAME OUTLINE COLOR EVAL|outColorEval)>/i;
	var note3A = /<(?:ICON NUMBER|iconNum):[ ](.*)>/i;
	var note3B = /<(?:ICON NUMBER EVAL|iconNumEval)>/i;
	var note3C = /<\/(?:ICON NUMBER EVAL|iconNumEval)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.nameColor = 0;
		obj.nameHexColor = '';
		obj.nameColorEval = '';
		obj.outNameColor = -1;
		obj.outNameHexColor = '';
		obj.outNameColorEval = '';
		obj.iconNum = 0;
		obj.iconNumEval = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1A)) {
				obj.nameColor = Number(RegExp.$1);
			} else if (line.match(note1B)){
				obj.nameHexColor = RegExp.$1;
			} else if (line.match(note1C)){
				mode = "nameEval";
			} else if (line.match(note1D)){
				mode = 'none';
			} else if (line.match(note2A)) {
				obj.outNameColor = Number(RegExp.$1);
			} else if (line.match(note2B)){
				obj.outNameHexColor = RegExp.$1;
			} else if (line.match(note2C)){
				mode = "outEval";
			} else if (line.match(note2D)){
				mode = 'none';
			} else if (line.match(note3A)) {
				obj.iconNum = Number(RegExp.$1);
			} else if (line.match(note3B)){
				mode = "iconEval";
			} else if (line.match(note3C)){
				mode = 'none';
			} else if (mode == "nameEval"){
				obj.nameColorEval += line;
			} else if (mode == "outEval"){
				obj.outColorEval += line;
			} else if (mode == "iconEval"){
				obj.iconNumEval += line;
			}
		}
	}
};

//Sets nickname evals
DataManager.processNicknameThings = function(group) {
	var string = "";
	var note1A = /<(?:NICKNAME COLOR|nnameColor):[ ](.*)>/i;
	var note1B = /<(?:NICKNAME HEX COLOR|nnameHexColor):[ ](.*)>/i;
	var note1C = /<(?:NICKNAME COLOR EVAL|nnameColorEval)>/i;
	var note1D = /<\/(?:NICKNAME COLOR EVAL|nnameColorEval)>/i;
	var note2A = /<(?:NICKNAME OUTLINE COLOR|noutNameColor):[ ](.*)>/i;
	var note2B = /<(?:NICKNAME OUTLINE HEX COLOR|noutNameHexColor):[ ](.*)>/i;
	var note2C = /<(?:NICKNAME OUTLINE COLOR EVAL|noutNameColorEval)>/i;
	var note2D = /<\/(?:NICKNAME OUTLINE COLOR EVAL|noutNameColorEval)>/i;
	var note3A = /<(?:NICKNAME ICON NUMBER|NICK ICON NUMBER|niconNum):[ ](.*)>/i;
	var note3B = /<(?:NICK ICON NUMBER EVAL|NICKNAME ICON NUMBER EVAL|niconNumEval)>/i;
	var note3C = /<\/(?:NICK ICON NUMBER EVAL|NICKNAME ICON NUMBER EVAL|niconNumEval)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.nnameColor = 0;
		obj.nnameHexColor = "";
		obj.nnameColorEval = '';
		obj.noutNameColor = -1;
		obj.noutNameHexColor = '';
		obj.noutNameColorEval = '';
		obj.niconNum = 0;
		obj.niconNumEval = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1A)) {
				obj.nnameColor = Number(RegExp.$1);
			} else if (line.match(note1A)) {
				obj.nnameColor = RegExp.$1;
			} else if (line.match(note1C)){
				mode = "nameEval";
			} else if (line.match(note1D)){
				mode = 'none';
			} else if (line.match(note2A)) {
				obj.noutNameColor = Number(RegExp.$1);
			} else if (line.match(note2A)) {
				obj.noutNameHexColor = RegExp.$1;
			} else if (line.match(note2C)){
				mode = "outEval";
			} else if (line.match(note2D)){
				mode = 'none';
			} else if (line.match(note3A)) {
				obj.niconNum = Number(RegExp.$1);
			} else if (line.match(note3B)){
				mode = "iconEval";
			} else if (line.match(note3C)){
				mode = 'none';
			} else if (mode == "nameEval"){
				obj.nnameColorEval += line;
			} else if (mode == "iconEval"){
				obj.niconNumEval += line;
			} else if (mode == "outEval"){
				obj.noutNameColorEval += line;
			}
		}
	}
};

//Gets the original outline color for easy of use in later parts of the plugin
frsh_cnames_bitmap_outline_get = Bitmap.prototype.initialize
Bitmap.prototype.initialize = function(width, height) {
	frsh_cnames_bitmap_outline_get.call(this, width, height);
    normalOutlineColor = this.outlineColor;
};

//============================================================================
//Window_Base
//============================================================================
//Adds the hx, oc, and ohx text codes for use in the names, but can also work in normal text
frsh_cnames_newescape_characters = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
	case 'HX': //Converts the given color to hexadecimal
	    var id = this.obtainEscapeParamHex(textState);
        this.changeTextColor(id);
        break;
	case 'OC': //Converts outline color to a window color, Taken from Message Core for ease of use
		var id = this.obtainEscapeParam(textState);
		this.contents.outlineColor = this.textColor(id);
		break;
	case 'OHX': //Converts outline color to a hexadecimal color
		var id = this.obtainEscapeParamHex(textState);
        this.contents.outlineColor = id;
		break;
	default:
		frsh_cnames_newescape_characters.call(this,code, textState);
		break;
    }
};

//A function to get the hexadecial letters and numbers
Window_Base.prototype.obtainEscapeParamHex = function(textState) {
    var arr = /^\[+(.*?)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[1];
    } else {
        return '';
    }
};

//Changes the Name for Items in the selection
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(getNameIcon(item), x + padding, y + padding);
		this.changeTextColor(getNameColor(item));
		this.contents.outlineColor = getNameOutlineColor(item);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth, 'left');
		this.resetTextColor();
		this.contents.outlineColor = normalOutlineColor;
    }
};

//============================================================================
//Actors
//============================================================================
//An overwrite to add all the icon and color bells and whistles to the actor's name
Game_Actor.prototype.name = function() {
	var name = "";
	if (SceneManager._scene._logWindow == null) return this._name;
	//Checks to see if the actor has an icon, if so draw it
	if (getNameIcon(this) != undefined) name += "\\i[" + getNameIcon(this) + "]";
	//Sets the outline color of the actor's name
	name += "\\ohx[" + getNameOutlineColor(this) + "]";
	//Sets the name's text color
	name += "\\hx[" + getNameColor(this) + "]";
	//Adds the actor's name
	name += this._name;
	//Resets the outline and text color
	name += "\\c[0]";
	name += "\\ohx[" + normalOutlineColor + "]";
	return name;
};

//An explicit copy when someone wants to call the colored name outside of the battlelog
Game_Actor.prototype.colorName = function() {
	var name = "";
	//Checks to see if the actor has an icon, if so draw it
	if (getNameIcon(this) != undefined) name += "\\i[" + getNameIcon(this) + "]";
	//Sets the outline color of the actor's name
	name += "\\ohx[" + getNameOutlineColor(this) + "]";
	//Sets the name's text color
	name += "\\hx[" + getNameColor(this) + "]";
	//Adds the actor's name
	name += this._name;
	//Resets the outline and text color
	name += "\\c[0]";
	name += "\\ohx[" + normalOutlineColor + "]";
	return name;
};

//For drawing the the actors name in most menus
Window_Base.prototype.drawActorName = function(actor, x, y, width) {
	//Checks to see if my Summon plugin is imported or not
	if (Imported.Summons){
		//Grabs the parameters of said plugin
		summParameters = PluginManager.parameters('FRSH_Summons');
		//Checks to see if the actor has a turn limit attached to them and if they're displayed
		if (actor.summonTurns != null && summParameters.showTurnsActor === "true"){
			//Sets the name with the connector and turns to their name
			var name = actor.summonTurns + summParameters.connector;
		} else {
			var name = "";
		}
	} else {
		var name = ""; 
	}
	//Gets the actor's base name
	name += actor._name;
	//Changes the Actor's Name color based on what they're current Hp is looking like
	this.changeTextColor(this.nameHpColor(actor));
	//Changes the actor's outline based on their current outline
	this.contents.outlineColor = getNameOutlineColor(actor);
	//Checks to see if the the actor has an icon associated with them
	if (getNameIcon(actor) != undefined){
		//Draws both the text and icon
		this.drawText(name, x+32, y, width, 'left');
		this.drawIcon(getNameIcon(actor), x, y);
	} else {
		//Draws the text only if not
		this.drawText(name, x, y, width, 'left');
	}
	//Resets both so nothing bleeds out into other texts
	this.resetTextColor();
	this.contents.outlineColor = normalOutlineColor;
};

//For making the color change based on how dead the actor is
Window_Base.prototype.nameHpColor = function(actor) {
	var id = actor.actorId();
	//Checks to see if actor is dead
    if (actor.isDead()) {
        return this.deathColor();
	//Checks to see if the actor is below 25%
    } else if (actor.isDying()) {
        return this.crisisColor();
	//Gets the normal text color
    } else {
		return getNameColor(actor);
	}
};

//Draws the proper name for the actor in their equip info
Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
	var enabled = actor.canEquip(this._item);
	this.changePaintOpacity(enabled);
	this.resetTextColor();
	this.changeTextColor(getNameColor(actor));
	if (getNameIcon(actor) != undefined){
		this.drawText(actor._name, x+32, y, 168, 'left');
		this.drawIcon(getNameIcon(actor), x, y);
	} else {
		this.drawText(actor._name, x, y, 168, 'left');
	}
	this.contents.outlineColor = normalOutlineColor;
	this.resetTextColor();
	var item1 = this.currentEquippedItem(actor, this._item.etypeId);
	if (enabled) {
		this.drawActorParamChange(x, y, actor, item1);
	}
	this.drawItemName(item1, x, y + this.lineHeight());
	this.changePaintOpacity(true);
};

//For the class processing of the actors
//It is hard coded as there was no efficent way in my mind to optimize it
Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
	var clasz = $dataClasses[actor.currentClass().id];
	var icon = 0;
	if (clasz.nameColorEval != ''){
		this.changeTextColor(colorEvaluate(clasz.nameColorEval));
	} else if (clasz.nameHexColor != "") {
		this.changeTextColor(clasz.nameHexColor);
	} else if (clasz.nameColor != 0){
		this.changeTextColor(this.textColor(clasz.nameColor));
	}
	if (clasz.iconNumEval != ''){
		icon = iconEvaluate(clasz.iconNumEval);
	} else if (clasz.iconNum != 0) {
		icon = clasz.iconNum;
	}
	if (clasz.outNameColorEval != ''){
		this.contents.outlineColor = colorEvaluate(clasz.outNameColorEval);
	} else if (clasz.outNameHexColor != "") {
		this.contents.outlineColor = clasz.outNameHexColor;
	} else if (clasz.outNameColor != -1) {
		this.contents.outlineColor = this.textColor(clasz.outNameColor);
	} else {
		this.contents.outlineColor = normalOutlineColor;
	}
	if (icon != 0){
		this.drawText(actor.currentClass().name, x+this._iconWidth, y, width, 'left');
		this.drawIcon(icon, x, y);
	} else {
		this.drawText(actor.currentClass().name, x, y, width, 'left');
	}
	this.contents.outlineColor = normalOutlineColor;
	this.resetTextColor();
};
	
//For the nickname processing of actors
//It is hard coded as there was no efficent way in my mind to optimize it
Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {
    var user = $dataActors[actor.actorId()];
	var icon = 0;
	if (user.nnameColorEval != ''){
		this.changeTextColor(colorEvaluate(user.nnameColorEval));
	} else if (user.nnameHexColor != "") {
		this.changeTextColor(user.nnameHexColor);
	} else if (user.nnameColor != 0){
		this.changeTextColor(this.textColor(user.nnameColor));
	}
	if (user.niconNumEval != ''){
		icon = iconEvaluate(user.niconNumEval);
	} else if (user.niconNum != 0) {
		icon = user.niconNum;
	}
	if (user.noutNameColorEval != ''){
		this.contents.outlineColor = colorEvaluate(user.noutNameColorEval);
	} else if (user.noutNameHexColor != "") {
		this.contents.outlineColor = user.noutNameHexColor;
	} else if (user.noutNameColor != -1) {
		this.contents.outlineColor = this.textColor(user.noutNameColor);
	} else {
		this.contents.outlineColor = normalOutlineColor;
	}
	if (icon != 0){
		this.drawText(actor._nickname, x+32, y, width, 'left');
		this.drawIcon(icon, x, y);
	} else {
		this.drawText(actor._nickname, x, y, width, 'left');
	}
	this.contents.outlineColor = normalOutlineColor;
	this.resetTextColor();
};

//For the level up text boxes
Game_Actor.prototype.displayLevelUp = function(newSkills) {
	//Gets text that shows that "x leveled up!" or what ever you put
	var text = TextManager.levelUp.format(this.colorName(), TextManager.level, this._level);
	//Sets up a new next box specifically for the user
	$gameMessage.newPage();
	//Adds the text
	$gameMessage.add(text);
	newSkills.forEach(function(skill) {
		//Adds the name with the proper icon and color
		var name = "";
		name += "\\i[" + getNameIcon(skill) + "]";
		name += "\\hx[" + getNameColor(skill) + "]";
		name += "\\ohx[" + getNameOutlineColor(skill) + "]";
		name += skill.name;
		name += "\\c[0]";
		name += "\\ohx[" + normalOutlineColor + "]";
		$gameMessage.add(TextManager.obtainSkill.format(name));
	});
};

//============================================================================
//Enemies
//============================================================================
//An overwrite that adds the various icon and colors to the enemy name
Game_Enemy.prototype.name = function() {
	var name = "";
	if (getNameIcon(this) != undefined) name += "\\i[" + getNameIcon(this) + "]";
	name += "\\ohx[" + getNameOutlineColor(this) + "]";
	name += "\\hx[" + getNameColor(this) + "]";
	name += this.originalName();	
	//Checks if the enemy is a multiple of itself
	if (this._plural){
		//All the color bells and whistles
		name += "\\ohx[" + getNameOutlineColor(this) + "]";
		name += "\\hx[" + getNameColor(this) + "]";
		//Adds the letter that denotes which specific enemy dupe it is
		name += this._letter;
		name += "\\c[0]";
		name += "\\ohx[" + normalOutlineColor + "]";
	}
	name += "\\c[0]";
	name += "\\ohx[" + normalOutlineColor + "]";
	return name;
};

//An explicit copy for when you want to call the colored name specifically
Game_Enemy.prototype.colorName = function() {
	var name = "";
	if (getNameIcon(this) != undefined) name += "\\i[" + getNameIcon(this) + "]";
	name += "\\ohx[" + getNameOutlineColor(this) + "]";
	name += "\\hx[" + getNameColor(this) + "]";
	name += this.originalName();	
	//Checks if the enemy is a multiple of itself
	if (this._plural){
		//All the color bells and whistles
		name += "\\ohx[" + getNameOutlineColor(this) + "]";
		name += "\\hx[" + getNameColor(this) + "]";
		//Adds the letter that denotes which specific enemy dupe it is
		name += this._letter;
		name += "\\c[0]";
		name += "\\ohx[" + normalOutlineColor + "]";
	}
	name += "\\c[0]";
	name += "\\ohx[" + normalOutlineColor + "]";
	return name;
};

//Changes the Enemy Name in drawing their name for the selection
Window_BattleEnemy.prototype.drawItem = function(index) {
	this.resetTextColor();
	var enemy = this._enemies[index];
	var rect = this.itemRectForText(index);
	var name = enemy.enemy().name + (enemy._plural ? enemy._letter : '');
	this.changeTextColor(getNameColor(enemy));
	this.contents.outlineColor = getNameOutlineColor(enemy);
	if (getNameIcon(enemy) != undefined){
		this.drawText(name, rect.x + 32, rect.y, rect.width, 'left');
		this.drawIcon(getNameIcon(enemy), rect.x, rect.y);
	} else {
		this.drawText(name, rect.x, rect.y, rect.width, 'left');
	}
	this.contents.outlineColor = normalOutlineColor;
	this.resetTextColor();
};
	
//Overwrites the name displayed for a dropped item to be colored
BattleManager.displayDropItems = function() {
	//Gets the items that were collected
	var items = this._rewards.items;
	if (items.length > 0) {
		//Sets the items gathered for a new page
		$gameMessage.newPage();
		items.forEach(function(item) {
			//Shows the items with the proper color and icon
			var name = "";
			name += "\\i[" + getNameIcon(item) + "]";
			name += "\\hx[" + getNameColor(item) + "]";
			name += "\\ohx[" + getNameOutlineColor(item) + "]";
			name += item.name;
			name += "\\c[0]";
			name += "\\ohx[" + normalOutlineColor + "]";
			$gameMessage.add(TextManager.obtainItem.format(name));
		});
	}
};
})();
//=============================================================================
// End of File
//=============================================================================
