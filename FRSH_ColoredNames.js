//=============================================================================
// FRSH_ColoredNames
// FRSH_ColoredNames.js
// Version: 1.2.2
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
* ==Notetags==================================================================
* | = either one works
* Non-case sensitive
* Actors, Classes, Weapons, Armors, Skills, Items, and Enemies:
* Name Color: <nameColor|Name Color: colorId>
* Name Color Eval: <nameColorEval|Name Color Eval></nameColorEval|Name Color 
* Eval> *put the code between these the /-less and the / versions, use 
* winColor for window colors and red, green, and blue if you want to make a
* special color. red, green, and blue override window color return.
*
* Name Outline Color: <outColor|Outline Color: colorId>
* Name Outline Color Eval: <outColorEval|Outline Color Eval></outColorEval|
* Outline Color Eval> *put the code between these the /-less and the / versions, 
* use winColor for window colors and red, green, and blue if you want to make a
* special color. red, green, and blue override window color return.
*
* Name Icon: <iconNum|Icon Number: iconId>
* Name Icon Eval: <iconNumEval|Icon Number Eval></iconNumEval|Icon Number 
* Eval> *put the code between these the /-less and the / versions, use icon
* for the icon you want to use.
*
* Actors:
* *All functions work the same as above, just called differently.
* Nickame Color: <nnameColor|Nickame Color: colorId>
* Nickame Color Eval: <nnameColorEval|Nickname Color Eval></nnameColorEval|
* Nickname Color Eval>
*
* Nickname Outline Color: <noutColor|Nick Outline Color: colorId>
* Nickname Outline Color Eval: <noutColorEval|Nick Outline Color Eval>
* </noutColorEval|Nick Outline Color Eval>
*
* Nickname Icon: <niconNum|Nick Icon Number: iconId>
* Name Icon Eval: <niconNumEval|Nick Icon Number Eval></niconNumEval|Nick Icon 
* Number Eval>
* ===Text Codes===============================================================
* \hx[]: Changes the next text's color to a color based on a hexadecimal code. 
* Ex: #ffffff
* \oc[]: Changes the next text's outline color a color based on a window 
* color number.
* \ohx[]: Changes the next text's outline color a color based on a hexadecimal
* code. Ex: #000000
* ===Introduction=============================================================
* While working on my games, I noticed that I liked having items colored
* names because it looks it neat. However, I ran into the problem that this
* also made by database very cluttered, which was a problem for both me and
* anyone looking through it. So I made this plugin so that I didn't have to
* use Text Codes by Modern Algebra. From that point, I also added the ability
* to add Icons because I realised I also needed those and thought they
* might be of some use.
* ===How to Use===============================================================
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
* ===Change Log===============================================================
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
* ============================================================================
*/
//============================================================================

(function() {
//Some normal variable settings
var normalOutlineColor = '';
var mesCore = Imported.YEP_MessageCore;

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
	var note1B = /<(?:NAME COLOR EVAL|nameColorEval)>/i;
	var note1C = /<\/(?:NAME COLOR EVAL|nameColorEval)>/i;
	var note2A = /<(?:ICON NUMBER|iconNum):[ ](.*)>/i;
	var note2B = /<(?:ICON NUMBER EVAL|iconNumEval)>/i;
	var note2C = /<(?:\/ICON NUMBER EVAL|iconNumEval)>/i;
	var note3A = /<(?:OUTLINE COLOR|outColor):[ ](.*)>/i;
	var note3B = /<(?:OUTLINE COLOR EVAL|outColorEval)>/i;
	var note3C = /<(?:\/OUTLINE COLOR EVAL|outColorEval)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.nameColor = 0;
		obj.nameColorEval = '';
		obj.iconNum = 0;
		obj.iconNumEval = '';
		obj.outColor = '';
		obj.outColorEval = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1A)) {
				line = line.split(":")[1];
				line = line.split(">")[0];
				obj.nameColor = Number(line);
			} else if (line.match(note1B)){
				mode = "nameEval";
			} else if (line.match(note1C)){
				mode = 'none';
			} else if (line.match(note2A)) {
				line = line.split(":")[1];
				line = line.split(">")[0];
				obj.iconNum = Number(line);
			} else if (line.match(note2B)){
				mode = "iconEval";
			} else if (line.match(note2C)){
				mode = 'none';
			} else if (line.match(note3A)) {
				line = line.split(":")[1];
				line = line.split(">")[0];
				obj.outColor = Number(line);
			} else if (line.match(note3B)){
				mode = "outEval";
			} else if (line.match(note3C)){
				mode = 'none';
			} else if (mode == "nameEval"){
				obj.nameColorEval += line;
			} else if (mode == "iconEval"){
				obj.iconNumEval += line;
			} else if (mode == "outEval"){
				obj.outColorEval += line;
			}
		}
	}
};

//Sets nickname evals
DataManager.processNicknameThings = function(group) {
	var string = "";
	var note1A = /<(?:NICKNAME COLOR|nnameColor):[ ](.*)>/i;
	var note1B = /<(?:NICKNAME COLOR EVAL|nnameColorEval)>/i;
	var note1C = /<\/(?:NICKNAME COLOR EVAL|nnameColorEval)>/i;
	var note2A = /<(?:NICK ICON NUMBER|nIconNum):[ ](.*)>/i;
	var note2B = /<(?:NICK ICON NUMBER EVAL|nIconNumEval)>/i;
	var note2C = /<(?:\/NICK ICON NUMBER EVAL|nIconNumEval)>/i;
	var note3A = /<(?:NICK OUTLINE COLOR|nOutColor):[ ](.*)>/i;
	var note3B = /<(?:NICK OUTLINE COLOR EVAL|nOutColorEval)>/i;
	var note3C = /<(?:\/NICK OUTLINE COLOR EVAL|nOutColorEval)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Initalizes the shit for these various conditions
		var mode = 'none';
		obj.nnameColor = 0;
		obj.nnameColorEval = '';
		obj.niconNum = 0;
		obj.niconNumEval = '';
		obj.noutColor = '';
		obj.noutColorEval = '';

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1A)) {
				line = line.split(":")[1];
				line = line.split(">")[0];
				obj.nnameColor = Number(line);
			} else if (line.match(note1B)){
				mode = "nameEval";
			} else if (line.match(note1C)){
				mode = 'none';
			} else if (line.match(note2A)) {
				line = line.split(":")[1];
				line = line.split(">")[0];
				obj.niconNum = Number(line);
			} else if (line.match(note2B)){
				mode = "iconEval";
			} else if (line.match(note2C)){
				mode = 'none';
			} else if (line.match(note3A)) {
				line = line.split(":")[1];
				line = line.split(">")[0];
				obj.noutColor = Number(line);
			} else if (line.match(note3B)){
				mode = "outEval";
			} else if (line.match(note3C)){
				mode = 'none';
			} else if (mode == "nameEval"){
				obj.nnameColorEval += line;
			} else if (mode == "iconEval"){
				obj.niconNumEval += line;
			} else if (mode == "outEval"){
				obj.noutColorEval += line;
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

//A special draw text to make the item name draw get the proper outline
Bitmap.prototype.drawTextSpecial = function(text, x, y, maxWidth, lineHeight, align, outlineColor) {
    if (text !== undefined) {
        var tx = x;
        var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        var context = this._context;
        var alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        if (align === 'center') {
            tx += maxWidth / 2;
        }
        if (align === 'right') {
            tx += maxWidth;
        }
        context.save();
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = 'alphabetic';
        context.globalAlpha = 1;
        this._drawTextOutlineSpecial(text, tx, ty, maxWidth, outlineColor);
        context.globalAlpha = alpha;
        this._drawTextBody(text, tx, ty, maxWidth);
        context.restore();
        this._setDirty();
    }
};

//Said special outline draw
Bitmap.prototype._drawTextOutlineSpecial = function(text, tx, ty, maxWidth, outlineColor) {
    var context = this._context;
	if (outlineColor != null){
		context.strokeStyle = outlineColor;
	} else {
		context.strokeStyle = this.outlineColor;
	}
    context.lineWidth = this.outlineWidth;
    context.lineJoin = 'round';
    context.strokeText(text, tx, ty, maxWidth);
};

//Initalizes the call for the special text draw
Window_Base.prototype.drawTextSpecial = function(text, x, y, maxWidth, align, outlineColor) {
    this.contents.drawTextSpecial(text, x, y, maxWidth, this.lineHeight(), align, outlineColor);
};

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

//Evaluates the code of any color eval that goes in
function colorEvaluate(code){
	var red = 0;
	var green = 0;
	var blue = 0;
	var winColor = 0;
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
	} else {
		return windowColorGetter(winColor);
	}
}

//Evaluates any icon number eval that goes in
iconEvaluate = function(code){
	var icon = 0;
	try {
		eval(code);
	} catch (e) {
		//Displays if an error happens
		//Displays where the error occured
		var text = this._name + " Outline Color Evaluate Error!!!!!"
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

//Changes the Name for Skills, Items, Weapons, and Armors in the selection (doesn't show icons normally because of the nature of these things (it's not really needed here)).
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + padding, y + padding);
		if (item.nameColorEval != ''){
			this.changeTextColor(colorEvaluate(item.nameColorEval));
		} else if (item.nameColor != 0) {
			this.changeTextColor(this.textColor(item.nameColor))
		}
		if (item.outColorEval != ''){
			outline = colorEvaluate(item.outColorEval);
		} else if (item.outColor != '') {
			outline = this.textColor(item.outColor);
		} else {
			outline = normalOutlineColor;
		}
        this.drawTextSpecial(item.name, x + iconBoxWidth, y, width - iconBoxWidth, 'left', outline);
		this.resetTextColor();
    }
};

//A function made to rewrite the name produced from a script call to be colored.
Game_Actor.prototype.name = function() {
	var name = "";
	var id = this.actorId();
	if ($dataActors[id].iconNumEval != ""){
		name += "\\i[" + iconEvaluate($dataActors[id].iconNumEval) + "]";
	} else if ($dataActors[id].iconNum != 0){
		name += "\\i[" + $dataActors[id].iconNum + "]";
	}
	if ($dataActors[id].nameColorEval != ""){
		name += "\\hx[" + colorEvaluate($dataActors[id].nameColorEval) + "]";
	} else if ($dataActors[id].nameColor != 0){
		name += "\\c[" + $dataActors[id].nameColor + "]";
	}
	if ($dataActors[id].outColorEval != ""){
		name += "\\ohx[" + colorEvaluate($dataActors[id].outColorEval) + "]";
	} else if ($dataActors[id].outColor != ""){
		name += "\\oc[" + $dataActors[id].outColor + "]";
	}
	name += this._name;
	if ($dataActors[id].nameColorEval != "" || $dataActors[id].nameColor != 0){
		name += "\\c[0]";
	}
	if ($dataActors[id].outColorEval != "" || $dataActors[id].outColor != ""){
		name += "\\ohx[" + normalOutlineColor + "]"
	}
	return name;
};

//Changes the Enemy Name in drawing their name for the selection
Window_BattleEnemy.prototype.drawItem = function(index) {
	this.resetTextColor();
	if (typeof this.RectForText != "function") return;
	var enemy = this._enemies[index];
	var rect = this.RectForText(index);
	var id = enemy.enemyId();
	var icon = 0;
	if ($dataEnemies[id].nameColorEval != ''){
		this.changeTextColor(colorEvaluate($dataEnemies[id].nameColorEval));
	} else if ($dataEnemies[id].nameColor != 0) {
		this.changeTextColor(this.textColor($dataEnemies[id].nameColor))
	}
	if ($dataEnemies[id].iconNumEval != ''){
		icon = iconEvaluate($dataEnemies[id].iconNumEval);
	} else if ($dataEnemies[id].iconNum != 0) {
		icon = $dataEnemies[id].iconNum;
	}
	if ($dataEnemies[id].outColorEval != ''){
		outline = colorEvaluate($dataEnemies[id].outColorEval);
	} else if ($dataEnemies[id].outColor != '') {
		outline = this.textColor($dataEnemies[id].outColor);
	} else {
		outline = normalOutlineColor;
	}
	if (icon != 0){
		this.drawTextSpecial(enemy.enemy().name, rect.x + 32, rect.y, rect.width, 'left', outline);
		this.drawIcon(icon, rect.x, rect.y);
	} else {
		this.drawTextSpecial(enemy.enemy().name, rect.x, rect.y, rect.width, 'left', outline);
	}
};
	
//Changes the Original Name (used for things like the encounter message)
Game_Enemy.prototype.originalName = function() {
	var name = "";
	var id = this.enemyId();
	if ($dataEnemies[id].iconNumEval != ""){
		name += "\\i[" + iconEvaluate($dataEnemies[id].iconNumEval) + "]";
	} else if ($dataEnemies[id].iconNum != 0){
		name += "\\i[" + $dataEnemies[id].iconNum + "]";
	}
	if ($dataEnemies[id].nameColorEval != ""){
		name += "\\hx[" + colorEvaluate($dataEnemies[id].nameColorEval) + "]";
	} else if ($dataEnemies[id].nameColor != 0){
		name += "\\c[" + $dataEnemies[id].nameColor + "]";
	}
	if ($dataEnemies[id].outColorEval != ""){
		name += "\\ohx[" + colorEvaluate($dataEnemies[id].outColorEval) + "]";
	} else if ($dataEnemies[id].outColor != ""){
		name += "\\oc[" + $dataEnemies[id].outColor + "]";
	}
	name += this.enemy().name;
	if ($dataEnemies[id].nameColorEval != "" || $dataEnemies[id].nameColor != 0){
		name += "\\c[0]";
	}
	if ($dataEnemies[id].outColorEval != "" || $dataEnemies[id].outColor != ""){
		name += "\\ohx[" + normalOutlineColor + "]"
	}
	return name;
};
	
//Changes the Enemy Name, used for a majority of things like Battle Log messages (doesn't supoort icons, because it doesn't need to). Tbh, this mostly is just here for the letter at the end.
Game_Enemy.prototype.name = function() {
	var name = "";
	var id = this.enemyId();
	if ($dataEnemies[id].nameColorEval != ""){
		name += "\\hx[" + colorEvaluate($dataEnemies[id].nameColorEval) + "]";
	} else if ($dataEnemies[id].nameColor != 0){
		name += "\\c[" + $dataEnemies[id].nameColor + "]";
	}
	if ($dataEnemies[id].outColorEval != ""){
		name += "\\ohx[" + colorEvaluate($dataEnemies[id].outColorEval) + "]";
	} else if ($dataEnemies[id].outColor != ""){
		name += "\\oc[" + $dataEnemies[id].outColor + "]";
	}
	name += this.originalName() + (this._plural ? this._letter : '');
	if ($dataEnemies[id].nameColorEval != "" || $dataEnemies[id].nameColor != 0){
		name += "\\c[0]";
	}
	if ($dataEnemies[id].outColorEval != "" || $dataEnemies[id].outColor != ""){
		name += "\\ohx[" + normalOutlineColor + "]"
	}
	return name;
};
	
//For drawing the the actors name in most menus
Window_Base.prototype.drawActorName = function(actor, x, y, width) {
	var id = actor.actorId();
	var icon = 0;
	if (Imported.Summons){
		summParameters = PluginManager.parameters('FRSH_Summons');
		if (actor.summonTurns != null && summParameters.showTurnsActor === "true"){
			var name = actor.summonTurns + summParameters.connector;
		} else {
			var name = "";
		}
	} else {
		var name = ""; 
	}
	name += actor._name;
	this.changeTextColor(this.nameHpColor(actor));
	if ($dataActors[id].iconNumEval != ''){
		icon = iconEvaluate($dataActors[id].iconNumEval);
	} else if ($dataActors[id].iconNum != 0) {
		icon = $dataActors[id].iconNum;
	}
	if ($dataActors[id].outColorEval != ''){
		outline = colorEvaluate($dataActors[id].outColorEval);
	} else if ($dataActors[id].outColor != '') {
		outline = this.textColor($dataActors[id].outColor);
	} else {
		outline = normalOutlineColor;
	}
	if (icon != 0){
		this.drawTextSpecial(name, x+32, y, width, 'left', outline);
		this.drawIcon(icon, x, y);
	} else {
		this.drawTextSpecial(name, x, y, width, 'left', outline);
	}
};

//For making the color change based on how dead the actor is
Window_Base.prototype.nameHpColor = function(actor) {
	var id = actor.actorId();
    if (actor.isDead()) {
        return this.deathColor();
    } else if (actor.isDying()) {
        return this.crisisColor();
    } else {
		if ($dataActors[id].nameColorEval != ''){
	        return colorEvaluate($dataActors[id].nameColorEval);
		} else if ($dataActors[id].nameColor != 0) {
			return this.textColor($dataActors[id].nameColor);
		} else {
			return this.textColor(0);
		}
	}
};
	
//For the class processing of the actors
Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
	var id = actor.currentClass().id;
	var icon = 0;
	if ($dataClasses[id].nameColorEval != ''){
		this.changeTextColor(colorEvaluate($dataClasses[id].nameColorEval));
	} else if ($dataClasses[id].nameColor != 0) {
		this.changeTextColor(this.textColor($dataClasses[id].nameColor))
	}
	if ($dataClasses[id].iconNumEval != ''){
		icon = iconEvaluate($dataClasses[id].iconNumEval);
	} else if ($dataClasses[id].iconNum != 0) {
		icon = $dataClasses[id].iconNum;
	}
	if ($dataClasses[id].outColorEval != ''){
		outline = colorEvaluate($dataClasses[id].outColorEval);
	} else if ($dataClasses[id].outColor != '') {
		outline = this.textColor($dataClasses[id].outColor);
	} else {
		outline = normalOutlineColor;
	}
	if (icon != 0){
		this.drawTextSpecial(actor.currentClass().name, x+32, y, width, 'left', outline);
		this.drawIcon(icon, x, y);
	} else {
		this.drawTextSpecial(actor.currentClass().name, x, y, width, 'left', outline);
	}
};
	
//For the nickname processing of actors
Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {
    var id = actor.actorId();
	var icon = 0;
	if ($dataActors[id].nnameColorEval != ''){
		this.changeTextColor(colorEvaluate($dataActors[id].nnameColorEval));
	} else if ($dataActors[id].nnameColor != 0) {
		this.changeTextColor(this.textColor($dataActors[id].nnameColor))
	}
	if ($dataActors[id].niconNumEval != ''){
		icon = iconEvaluate($dataActors[id].niconNumEval);
	} else if ($dataActors[id].niconNum != 0) {
		icon = $dataActors[id].niconNum;
	}
	if ($dataActors[id].noutColorEval != ''){
		outline = colorEvaluate($dataActors[id].noutColorEval);
	} else if ($dataActors[id].noutColor != '') {
		outline = this.textColor($dataActors[id].noutColor);
	} else {
		outline = normalOutlineColor;
	}
	if (icon != 0){
		this.drawTextSpecial(actor._nickname, x+32, y, width, 'left', outline);
		this.drawIcon(icon, x, y);
	} else {
		this.drawTextSpecial(actor._nickname, x, y, width, 'left', outline);
	}
};
	
//For the level up text boxes
Game_Actor.prototype.displayLevelUp = function(newSkills) {
	var text = TextManager.levelUp.format(this.name(), TextManager.level, this._level);
	$gameMessage.newPage();
	$gameMessage.add(text);
	newSkills.forEach(function(skill) {
		var name = "";
		if (skill.iconNumEval != ""){
			name += "\\i[" + iconEvaluate(skill.iconNumEval) + "]";
		} else if (skill.iconNum != 0){
			name += "\\i[" + skill.iconNum + "]";
		}
		if (skill.nameColorEval != ""){
			name += "\\hx[" + colorEvaluate(skill.nameColorEval) + "]";
		} else if (skill.nameColor != 0){
			name += "\\c[" + skill.nameColor + "]";
		}
		if (skill.outColorEval != ""){
			name += "\\ohx[" + colorEvaluate(skill.outColorEval) + "]";
		} else if (skill.outColor != ""){
			name += "\\oc[" + skill.outColor + "]";
		}
		name += skill.name;
		if (skill.nameColorEval != "" || skill.nameColor != 0){
			name += "\\c[0]";
		}
		if (skill.outColorEval != "" || skill.outColor != ""){
			name += "\\ohx[" + normalOutlineColor + "]"
		}
		$gameMessage.add(TextManager.obtainSkill.format(name));
	});
};
	
//Overwrites the name displayed for a dropped item to be colored
BattleManager.displayDropItems = function() {
	var items = this._rewards.items;
	if (items.length > 0) {
		$gameMessage.newPage();
		items.forEach(function(item) {
			var name = "";
			if (item.iconNumEval != ""){
				name += "\\i[" + IconNumberEvaluate(item.iconNumEval) + "]";
			} else if (item.iconNum != 0){
				name += "\\i[" + item.iconNum + "]";
			}
			if (item.nameColorEval != ""){
				name += "\\hx[" + NameColorEvaluate(item.nameColorEval) + "]";
			} else if (item.nameColor != 0){
				name += "\\c[" + item.nameColor + "]";
			}
			if (item.outColorEval != ""){
				name += "\\ohx[" + OutlineColorEvaluate(item.outColorEval) + "]";
			} else if (item.outColor != ""){
				name += "\\oc[" + item.outColor + "]";
			}
			name += item.name;
			if (item.nameColorEval != "" || item.nameColor != 0){
				name += "\\c[0]";
			}
			if (item.outColorEval != "" || item.outColor != ""){
				name += "\\ohx[" + normalOutlineColor + "]"
			}
			$gameMessage.add(TextManager.obtainItem.format(name));
		});
	}
};

//Draws the proper name for the actor in their equip info
Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
	var enabled = actor.canEquip(this._item);
	this.changePaintOpacity(enabled);
	this.resetTextColor();
	var id = actor.actorId(); 
	var icon = 0;
	if ($dataActors[id].nameColorEval != ''){
		this.changeTextColor(colorEvaluate($dataActors[id].nameColorEval));
	} else if ($dataActors[id].nameColor != 0) {
		this.changeTextColor(this.textColor($dataActors[id].nameColor))
	}
	if ($dataActors[id].iconNumEval != ''){
		icon = iconEvaluate($dataActors[id].iconNumEval);
	} else if ($dataActors[id].iconNum != 0) {
		icon = $dataActors[id].iconNum;
	}
	if ($dataActors[id].outColorEval != ''){
		outline = colorEvaluate($dataActors[id].outColorEval);
	} else if ($dataActors[id].outColor != '') {
		outline = this.textColor($dataActors[id].outColor);
	} else {
		outline = normalOutlineColor;
	}
	if (icon != 0){
		this.drawTextSpecial(actor._name, x+32, y, 168, 'left', outline);
		this.drawIcon(icon, x, y);
	} else {
		this.drawTextSpecial(actor._name, x, y, 168, 'left', outline);
	}
	var item1 = this.currentEquippedItem(actor, this._item.etypeId);
	if (enabled) {
		this.drawActorParamChange(x, y, actor, item1);
	}
	this.drawItemName(item1, x, y + this.lineHeight());
	this.changePaintOpacity(true);
};

})();

//=============================================================================
// End of File
//=============================================================================
