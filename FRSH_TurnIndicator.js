//=============================================================================
// FRSH_TurnIndicator
// FRSH_TurnIndicator.js
// Version: 1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.TurnInd = true;

var Frashaw = Frashaw || {};
Frashaw.TurnInd = Frashaw.TurnInd || {};

/*:
* @plugindesc Shows the current Battle Turn while in battle.
* @author Frashaw27
*
* @param ---General Settings-----
* @default
*
* @param turnShowOption
* @text How to display Turns?
* @parent ---General Settings-----
* @type select
* @desc Select if you want to use Text or a Custom Image for showing Turns.
* @option Text
* @option Image
* @default Text
*
* @param turnBackOption
* @text How to back Turns?
* @parent ---General Settings-----
* @type select
* @desc Select what you want to display the turn counter.
* @option Transparent Box
* @option Window Box
* @option Nothing
* @default Window Box
*
* @param turnStartZero
* @text Start on Turn 0?
* @parent ---General Settings-----
* @type boolean
* @desc Click True if you want the counter to start on 0 at the start of battle or false for starting on 1.
* @default true
*
* @param turnWindowX
* @text X Axis Adjust
* @parent ---General Settings-----
* @type number
* @desc Input what you want the position of the window to be on the X-Axis.
* @default 0
*
* @param turnWindowY
* @text Y Axis Adjust
* @parent ---General Settings-----
* @type number
* @desc Input what you want the position of the window to be on the Y-Axis.
* @default 0
*
* @param turnWindowWidth
* @text Width Adjust
* @parent ---General Settings-----
* @type number
* @desc Input how long you want the window to be. *Note: Must be long enough to have the message + counter.
* @default 230
*
* @param turnWindowHeight
* @text Height Adjust
* @parent ---General Settings-----
* @type number
* @desc Input how high you want the window to be. *Note: This is done by the amount of lines of text.
* @default 1
*
* @param ---Text Settings--------
* @default
*
* @param turnWindowTextMessage
* @text Counter Message
* @parent ---Text Settings--------
* @type text
* @desc Put what message you want to be shown before the proper turn counter.
* @default Turn: 
*
* @param turnWindowTextColor
* @text Counter Text Color
* @parent ---Text Settings--------
* @type text
* @desc Put a hexadecimal code for the color you want to display the text as. Ex: "#ffffff"
* @default #ffffff
*
* @param turnWindowTextOutline
* @text Counter Outline Color
* @parent ---Text Settings--------
* @type text
* @desc Put a hexadecimal code for the color you want to display the text outline as. Ex: "#ffffff"
* @default #000000
*
* @param turnWindowTextSize
* @text Counter Text Size
* @parent ---Text Settings--------
* @type number
* @desc Put the how large you want the text to be, as denoted by Font Size.
* @default 32
* @min 1
*
* @param ---Image Settings-------
* @default
*
* @param turnWindowImageName
* @text Image Name
* @parent ---Image Settings-------
* @type text
* @desc Put the name of the file you're gonna use for the Turns. Make sure to use exact same capitaization.
* @default Turn
*
* @param turnWindowImageWidth
* @text Image Width
* @parent ---Image Settings-------
* @type number
* @desc Put the the value for how tall the image for the base message is.
* @default 106
* @min 0
*
* @param turnWindowImageHeight
* @text Image Height
* @parent ---Image Settings-------
* @type number
* @desc Put the the value for how tall the image for the base message is.
* @default 36
* @min 0
*
* @param turnWindowNumberName
* @text Counter Name
* @parent ---Image Settings-------
* @type text
* @desc Put the name of the file you're gonna use for the Counter. Make sure to use exact same capitaization.
* @default TurnNumbers
*
* @param turnWindowImageX
* @text Counter X Adjust
* @parent ---Image Settings-------
* @type number
* @desc Put the X value of how far the the image for the counter will appear off the base, used so the images don't overlap.
* @default 106
* @min 0
*
* @param turnWindowImageCounterLength
* @text Counter Width
* @parent ---Image Settings-------
* @type number
* @desc Put the width value of how much each of your numbers in your counter image. *Make sure none of them overlap before hand.
* @default 28
* @min 0
*
* @param turnWindowImageCounterHeight
* @text Counter Height
* @parent ---Image Settings-------
* @type number
* @desc Put the the value for how tall the image for the numbers is.
* @default 36
* @min 0
*
* @param ---Backing Settings-----
* @default
*
* @param normalWindowBackingOpacity
* @text Window Opacity
* @parent ---Backing Settings-----
* @type number
* @desc Put the number for the opacity of the base window you want. (Only used if you pick Window Box)
* @default 255
* @max 255
* @min 0
*
* @param transWindowBackingOpacity
* @text Transparent Opacity
* @parent ---Backing Settings-----
* @type number
* @desc Put the number for the opacity of the base window you want. (Only used if you pick Transparent Box)
* @default 215
* @max 255
* @min 0
*
* @param transWindowBackingColor
* @text Transparent Color
* @parent ---Backing Settings-----
* @type number
* @desc Put a hexadecimal code for the color you want to the backing box to be. Ex: "#ffffff"
* @default #000000
*
* @param transWindowBackingX
* @text Transparent X Buffer
* @parent ---Backing Settings-----
* @type number
* @desc Put the X buffer on the backing you want to the right of the counter. (Only used if you pick Transparent Box)
* @default 15
*
* @param transWindowBackingY
* @text Transparent Y Adjust
* @parent ---Backing Settings-----
* @type number
* @desc Put the Y adjustment on the backing you want. (Only used if you pick Transparent Box)
* @default -13
* 
* @help
* ===Introduction=============================================================
* I just thought a turn counter would be neat and wanted to practice and
* learn the ways of using windows more.
* ===How to Use===============================================================
* Set up the parameters and use it. Make sure to include the proper width and
* heights so that the respective things aren't cut off prematurely.
* For Images:
* Open up your favorite image editor/maker and make the images for the 
* numbers and the turn message, make note of the details in specifics as
* they're need to properly call the images, so make sure to get the numbers
* exact or you might see the image jsut not showing up.
* ===Change Log===============================================================
* Version 1.0.1 (05/01/24):
* -Added an extention so that YEP_InstantCast works properly
*
* Version 1.0 (04/14/24):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_TurnIndicator');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.TurnStyle = Parameters.turnShowOption;
Frashaw.Param.TurnBacking = Parameters.turnBackOption;
Frashaw.Param.TurnZeroStart = Parameters.turnStartZero == "true";
Frashaw.Param.TurnWindowX = Number(Parameters.turnWindowX);
Frashaw.Param.TurnWindowY = Number(Parameters.turnWindowY);
Frashaw.Param.TurnWindowW = Number(Parameters.turnWindowWidth);
Frashaw.Param.TurnWindowH = Number(Parameters.turnWindowHeight);
Frashaw.Param.TurnTextBaseMsg = Parameters.turnWindowTextMessage;
Frashaw.Param.TurnTextColor = Parameters.turnWindowTextColor;
Frashaw.Param.TurnTextOutline = Parameters.turnWindowTextOutline;
Frashaw.Param.TurnTextSize = Number(Parameters.turnWindowTextSize);
Frashaw.Param.TurnImageName = Parameters.turnWindowImageName;
Frashaw.Param.TurnImageW = Number(Parameters.turnWindowImageWidth);
Frashaw.Param.TurnImageH = Number(Parameters.turnWindowImageHeight);
Frashaw.Param.TurnImageNumName = Parameters.turnWindowNumberName;
Frashaw.Param.TurnImageNumAdjust = Number(Parameters.turnWindowImageX);
Frashaw.Param.TurnImageNumW = Number(Parameters.turnWindowImageCounterLength);
Frashaw.Param.TurnImageNumH = Number(Parameters.turnWindowImageCounterHeight);
Frashaw.Param.TurnWindowBackOpac = Number(Parameters.normalWindowBackingOpacity);
Frashaw.Param.TurnTransBackOpac = Number(Parameters.transWindowBackingOpacity);
Frashaw.Param.TurnTransBackColor = Parameters.transWindowBackingColor;
Frashaw.Param.TurnTransBackX = Number(Parameters.transWindowBackingX);
Frashaw.Param.TurnTransBackY = Number(Parameters.transWindowBackingY);

//==========================================================================
//* Things that are not the Window itself
//==========================================================================

//Calls the Window to be created after the Battle Status
frsh_turnind_show = Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function() {
    frsh_turnind_show.call(this);
	this.createTurnWindow();
};

//Creates the Window
Scene_Battle.prototype.createTurnWindow = function() {
    this._turnWindow = new Window_BattleTurns();
    this.addWindow(this._turnWindow);
};

//Reserves new system images for the turns, if applicable
frsh_turnind_reserve_turn_image = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
    frsh_turnind_reserve_turn_image.call(this);
	if (Frashaw.Param.TurnStyle == "Image"){ //Doesn't reserve the images if not needed
		ImageManager.reserveSystem(Frashaw.Param.TurnImageName);
		ImageManager.reserveSystem(Frashaw.Param.TurnImageNumName);
	}
};

//Upon starting the turn proper, the Window is closed and the the transpartent back sprite is removed (if applicable) 
frsh_turnind_turn_remove = Window_BattleLog.prototype.startTurn;
Window_BattleLog.prototype.startTurn = function() {
	frsh_turnind_turn_remove.call(this);
	SceneManager._scene._turnWindow.close();
};

//Upon getting allowing any inputs to start, the Window reopens for seeing
frsh_turnind_turn_readd = BattleManager.startInput;
BattleManager.startInput = function() {
    frsh_turnind_turn_readd.call(this);
	SceneManager._scene._turnWindow.updateTurn();
	SceneManager._scene._turnWindow.open();
};

//An extention made for YEP_InstantCast to make it so that when using an instant skill, the battle log properly
//goes away
frsh_turnind_instant_stop = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    frsh_turnind_instant_stop.call(this, subject, action, targets);
	if (Imported.YEP_InstantCast){
		if (BattleManager._instantCasting != null){
			SceneManager._scene._turnWindow.close();
		}
	}
};

//An extention made for YEP_InstantCast to make it so that when using an instant skill, the battle log properly
//comes back
frsh_turnind_instant_start = Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction = function(subject) {
    frsh_turnind_instant_start.call(this, subject);
	if (Imported.YEP_InstantCast){
		if (BattleManager._instantCasting != null){
			SceneManager._scene._turnWindow.open();
		}
	}
};

//==========================================================================
//* The Window itself
//==========================================================================

//Calls the Window to make itself
function Window_BattleTurns() {
    this.initialize.apply(this, arguments);
}

//Calls the Window to make itself 2
Window_BattleTurns.prototype = Object.create(Window_Base.prototype);
Window_BattleTurns.prototype.constructor = Window_BattleTurns;

//Sets up the Window for use
Window_BattleTurns.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, Frashaw.Param.TurnWindowX, Frashaw.Param.TurnWindowY, width, height);
	this.opacity = 0;
};

//Returns the width that the Window will be
Window_BattleTurns.prototype.windowWidth = function() {
	return Frashaw.Param.TurnWindowW;
};

//Returns how many lines the Window will be
Window_BattleTurns.prototype.windowHeight = function() {
    return this.fittingHeight(Frashaw.Param.TurnWindowH);
};

//A function that runs each time the Window Opens
Window_BattleTurns.prototype.updateTurn = function() {
	//Clears the contents so it can be reset
    this.contents.clear();
	//Special variable set to account for if the user wants to start on 0 or 1
	var turns = $gameTroop._turnCount + ((!Frashaw.Param.TurnZeroStart) ? 1 : 0);
	//Checks which type of backing for the Window is wanted
	if (Frashaw.Param.TurnBacking == "Window Box"){
		//Sets the tranparency of the Window's box to the specified opactity
		this.opacity = Frashaw.Param.TurnWindowBackOpac;
	} else if (Frashaw.Param.TurnBacking == "Transparent Box"){
		//Calls a series of functions to create a backing to the Window like the Battle Log at specified Turns
		if (turns == 0 || turns == 1 || turns == 10 || turns == 100){
			//Removes the backing so that it doesn't stack with previous iterations
			this.removeChild(this._backSprite)
			this.createBackBitmap();
			this.createBackSprite();
			this.drawBackground(turns);
		}
	}
	//Checks to see which type will be used
	if (Frashaw.Param.TurnStyle == "Text"){
		this.contents.textColor = Frashaw.Param.TurnTextColor;
		this.contents.outlineColor = Frashaw.Param.TurnTextOutline;
		this.contents.fontSize = Frashaw.Param.TurnTextSize;
		this.drawText(Frashaw.Param.TurnTextBaseMsg + turns, 0, 0, this.windowWidth(), this.windowHeight()); 
	} else if (Frashaw.Param.TurnStyle == "Image"){
		//Calls a function to draw the base message of the counter
		this.drawTurn(0, 0);
		//Turns the turn variable into a string so it can be split into even parts
		turns = turns.toString().split("");
		//Remakes each part of the new turn array into numbers
		turns.forEach(function(i){ turns[turns.indexOf(i)] = Number(i) });
		//Goes through each element of the turn array to draw it 
		for (var loop = 0; loop != turns.length; loop++){
			var x = Frashaw.Param.TurnImageNumAdjust + loop * Frashaw.Param.TurnImageNumW;
			this.drawTurn2(turns[loop], x, 0);
		}
	}
};

//Draws the image for the turn image
Window_BattleTurns.prototype.drawTurn = function(x, y) {
    var bitmap = ImageManager.loadSystem(Frashaw.Param.TurnImageName);
	var pw = Frashaw.Param.TurnImageW;
    var ph = Frashaw.Param.TurnImageH;
    this.contents.blt(bitmap, 0, 0, pw, ph, x, y);
};

//Draws the image for the counter messages
Window_BattleTurns.prototype.drawTurn2 = function(turn, x, y) {
    var bitmap = ImageManager.loadSystem(Frashaw.Param.TurnImageNumName);
	var pw = Frashaw.Param.TurnImageNumW;
    var ph = Frashaw.Param.TurnImageNumH;
	var zx = pw * turn;
    this.contents.blt(bitmap, zx, 0, pw, ph, x, y);
};

//Creates the base for the transparent back
Window_BattleTurns.prototype.createBackBitmap = function() {
    this._backBitmap = new Bitmap(this.windowWidth(), this.windowHeight());
};

//Creates the parameters for the transparent back
Window_BattleTurns.prototype.createBackSprite = function() {
    this._backSprite = new Sprite();
    this._backSprite.bitmap = this._backBitmap;
    this._backSprite.y = this.y;
    this.addChildToBack(this._backSprite);
};

//Creates the back proper
Window_BattleTurns.prototype.drawBackground = function(turn) {
    var rect = this.backRect(turn);
    var color = Frashaw.Param.TurnTransBackColor;
    this._backBitmap.clear();
    this._backBitmap.paintOpacity = Frashaw.Param.TurnTransBackOpac;
    this._backBitmap.fillRect(rect.x, rect.y, rect.width, rect.height, color);
};

//Creates the rectangle the transpartent back will use
Window_BattleTurns.prototype.backRect = function(turn) {
	var w = this.padding;
	//Checks to see which turn style is in use so that it can get the proper width of the one
	if (Frashaw.Param.TurnStyle == "Text"){ 
		this.contents.fontSize = Frashaw.Param.TurnTextSize;
		w += this.textWidth(Frashaw.Param.TurnTextBaseMsg + turn);
	} else if (Frashaw.Param.TurnStyle == "Image"){
		w += Frashaw.Param.TurnImageW + Frashaw.Param.TurnImageNumW;
		//Adds the turn division for each of the place the counter increases
		if (turn > 9) w += Frashaw.Param.TurnImageNumW;
		if (turn > 99) w += Frashaw.Param.TurnImageNumW;
	}
	//The width increases added to the end
	w += Frashaw.Param.TurnTransBackX;
    return {
        x: 0,
        y: this.padding+Frashaw.Param.TurnTransBackY,
        width: w,
        height: this.windowHeight()
    };
};
})();
//=============================================================================
// End of File
//=============================================================================
