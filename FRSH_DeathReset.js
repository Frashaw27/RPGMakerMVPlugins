//=============================================================================
// FRSH_DeathReset
// FRSH_DeathReset.js
// Version: 1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.DResets = true;

var Frashaw = Frashaw || {};
Frashaw.DResets = Frashaw.DResets || {};

/*:
* @plugindesc Grants the ability to reset the battle upon death.
* @author Frashaw27
*
* @param deathResetText
* @text Battle Restart Message
* @type text
* @desc Put the message you want to show for restarting a battle post gameover.
* @default Restart the Battle
*
* @param deathLoadText
* @text Load Save Message
* @type text
* @desc Put the message you want to show for loading a save post gameover.
* @default Load a Previous Save
*
* @param deathTitleText
* @text Return to Title Message
* @type text
* @desc Put the message you want to show for going back to the title screen post gameover.
* @default Return to then Title Screen
*
* @param deathResetInit
* @text Start with Restart On?
* @type boolean
* @desc Put true if you want the game to start with death restart already enabled or false if not.
* @default false
*
* @param deathSkipInit
* @text Start with Skip On?
* @type boolean
* @desc Put true if you want the game to start with death skip already enabled or false if not.
* @default false
*
* @param
* @text
* @default
*
* @param deathWindowWidth
* @text Death Window Width
* @type number
* @desc Put what the value for how wide you want the window.
* @default 800
* @min 0
*
* @param deathWindowX
* @text Death Window X
* @type number
* @desc Put what the value of where you want the window to be on the X-Axis.
* @default 100
*
* @param deathWindowY
* @text Death Window Y
* @type number
* @desc Put what the value of where you want the window to be on the Y-Axis.
* @default 100
*
* @param deathWindowOpacity
* @text Death Window Opacity
* @type number
* @desc Put what the value of how transparent you want the window to be.
* @default 0
* @min 0
* @max 255
* 
* @help 
* ===Plugin Commands============================================================
* ! - Case Sensitive
* deathReset enable - Allows player to reset a fight during battle.
* deathReset false - Denies player to reset a fight during battle.
* deathAutoTitle enable - Player goes back to the title automatically upon 
* death.
* deathAutoTitle false - Player does the normal flow of events upon death.
* ===Introduction===============================================================
* SRD once made a plugin for this exact purpose, however I found his plugin 
* to be too obtrusive and screwed with a few things in my game. So I decided
* to make my own version all centered around resetting the battle after death.
* ===How to Use=================================================================
* Plug and play once set up. You can use the plugin commands for more 
* specific control if you want a specific boss to have or what have you. 
* ===Change Log=================================================================
* Version 1.0.1 (03/26/2025):
* -Fixed a bug where you could spam the commands on the death menu
*
* Version 1.0.0 (05/06/24):
* -Finished Base Plugin
* ==============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_DeathReset');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.DeathResetText = Parameters.deathResetText;
Frashaw.Param.DeathLoadText = Parameters.deathLoadText;
Frashaw.Param.DeathTitleText = Parameters.deathTitleText;
Frashaw.Param.DeathResetInit = Parameters.deathResetInit == "true";
Frashaw.Param.DeathSkipInit = Parameters.deathSkipInit == "true";
Frashaw.Param.DeathWindowWidth = Number(Parameters.deathWindowWidth);
Frashaw.Param.DeathWindowX = Number(Parameters.deathWindowX);
Frashaw.Param.DeathWindowY = Number(Parameters.deathWindowY);
Frashaw.Param.DeathWindowOpacity = Number(Parameters.deathWindowOpacity);

//Variable setting
var inBattle = false;
var deaded = false;
var spamStop = false;

//Sets the inital setting of death reseting and death skipping
frsh_deathreset_reset_set = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    frsh_deathreset_reset_set.call(this);
	this.allowReset = Frashaw.Param.DeathResetInit;
	this.allowSkip = Frashaw.Param.DeathSkipInit;
};

//An overwrite that adds a layer for the text to go on and adds an alternate route so that exiting out
//of Loading a Save doesn't have you do the gameover scene again
Scene_Gameover.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	if (!deaded) this.playGameoverMusic();
	this.createBackground();
	this.createWindowLayer();
	if (deaded){ 
		this.createChoices();
		this.removeChild(SceneManager._scene._backSprite);
	}
};

//An extention made to reset the deaded variable
frsh_deathreset_deaded_reset = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
    frsh_deathreset_deaded_reset.call(this);
	deaded = false;
};

//Function that goes through all the things that would occur on gameover, but slightly off put for effect
function deathCommandsOpen(){
	AudioManager.stopAll();
	SceneManager._scene.removeChild(SceneManager._scene._backSprite);
	SceneManager._scene.startFadeIn();
	SceneManager._scene.createChoices();
	deaded = true;
}

//Fades out the image and triggers a function to go off ~1 second later
Scene_Gameover.prototype.gotoTitle = function() {
	if (!deaded){
		this.fadeOutAll();
		setTimeout(deathCommandsOpen,1000);
	}
};

//Calls the choice window to be created
Scene_Gameover.prototype.createChoices = function(){
	this._choiceWindow = new Window_DeathChoices();
    this.addWindow(this._choiceWindow);
}

//Sets up the choice window part 1
function Window_DeathChoices() {
    this.initialize.apply(this, arguments);
}

//Sets up the choice window part 2
Window_DeathChoices.prototype = Object.create(Window_Command.prototype);
Window_DeathChoices.prototype.constructor = Window_DeathChoices;

//Sets the properties of the window for the choices
Window_DeathChoices.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
	this.opacity = Frashaw.Param.DeathWindowOpacity;
    this.updatePlacement();
};

//Decides the width of the choice window
Window_DeathChoices.prototype.windowWidth = function() {
    return Frashaw.Param.DeathWindowWidth;
};

//Decides the height of the choices
Window_DeathChoices.prototype.windowHeight = function() {
    return this.fittingHeight(3);
};

//Decides the placement of the window
Window_DeathChoices.prototype.updatePlacement = function() {
    this.x = Frashaw.Param.DeathWindowX;
    this.y = Frashaw.Param.DeathWindowY;
};

//Makes the list of all the options you can choose once you die
Window_DeathChoices.prototype.makeCommandList = function() {
	//If in battle and on, the option to resart battles is available 
    if (inBattle && $gameParty.allowReset) this.addCommand(Frashaw.Param.DeathResetText, 'deathReset');
	//If saves exist, the option to load is available
	if (DataManager.isAnySavefileExists()) this.addCommand(Frashaw.Param.DeathLoadText, 'deathLoad');
	//Always available
	this.addCommand(Frashaw.Param.DeathTitleText, 'deathTitle');
	//Defaults to reseting the game for efficency since the player can't restart the battle nor Load
	//a save
	if (this._list.length <= 1 || $gameParty.allowSkip){
		location.reload();
	}
};

//Standard text drawing
Window_DeathChoices.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = 100//this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'center');
};

//The Meat for the various action when choosing an action to do
Window_DeathChoices.prototype.processOk = function() {
	//Gets the symbol associated with the choice 
    var symbol = this._list[this.index()].symbol;
	//Stops the player from spamming the button
	if (spamStop) return;
	//Runs the the reset option for death
	if (symbol == "deathReset"){
		//Plays the bgm the battle started with
		BattleManager.playBattleBgm();
		//Sets the party to the one the battle started with
		$gameParty = JsonEx.makeDeepCopy($gameTemp.battleParty);
		//Sets the actors to the ones that were when the battle started
		$gameActors = JsonEx.makeDeepCopy($gameTemp.battleActors);
		//Sets the switches to the ones that were when the battle started
		$gameSwitches = JsonEx.makeDeepCopy($gameTemp.switches);
		//Resets the battle
		BattleManager.setup($gameTroop._troopId, BattleManager.canEscape(), BattleManager.canLose());
		//Resets the out of map bgm and bgs
		BattleManager.saveBgmAndBgs();
		//Goes to the battles scene
		SceneManager.goto(Scene_Battle);
		//Turns off the variable that stops the death screen from looping
		deaded = false;
		spamStop = true;
		setTimeout(function(){ spamStop = false; }, 1000);
	} else if (symbol == "deathLoad"){
		//Opens up the load menu
		SceneManager.push(Scene_Load);
		spamStop = true;
		setTimeout(function(){ spamStop = false; }, 1000);
	} else if (symbol == "deathTitle"){
		//Returns the player to the title screen when selected
		location.reload();
	}
};

//An extention that sets all the info of the current party to be recalled later
frsh_deathreset_actor_setting = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    frsh_deathreset_actor_setting.call(this, troopId, canEscape, canLose);
	$gameTemp.battleParty = JsonEx.makeDeepCopy($gameParty);
	$gameTemp.battleActors = JsonEx.makeDeepCopy($gameActors);
	$gameTemp.switches = JsonEx.makeDeepCopy($gameSwitches);
	inBattle = true;
};

//An extention that sets all the info of the current music from the map to be recalled later
frsh_deathreset_music_setting = BattleManager.saveBgmAndBgs;
BattleManager.saveBgmAndBgs = function() {
    frsh_deathreset_music_setting.call(this);
	//If the original safe keeping of the bgm is not set, set it, other wise set the mapBgm to the stored value
	if ($gameTemp.originMapBgm == null){
		$gameTemp.originMapBgm = JsonEx.makeDeepCopy(BattleManager._mapBgm);
	} else {
		BattleManager._mapBgm = JsonEx.makeDeepCopy($gameTemp.originMapBgm);
	}
	//If the original safe keeping of the bgs is not set, set it, other wise set the mapBgs to the stored value
	if ($gameTemp.originMapBgs == null){
		$gameTemp.originMapBgs = JsonEx.makeDeepCopy(BattleManager._mapBgs);
	} else {
		BattleManager._mapBgs = JsonEx.makeDeepCopy($gameTemp.originMapBgs);
	}
};

//An extenetion to make sure the safekept bgm and bgs and the in battle check are reset after Victories 
frsh_deathreset_victory_reset = BattleManager.processVictory;
BattleManager.processVictory = function() {
	frsh_deathreset_victory_reset.call(this);
	$gameTemp.originMapBgm = null;
	$gameTemp.originMapBgs = null;
	inBattle = false;
};

//An extenetion to make sure the safekept bgm and bgs and the in battle check are reset after Escapes
frsh_deathreset_abort_reset = BattleManager.processAbort;
BattleManager.processAbort = function() {
	frsh_deathreset_abort_reset.call(this);
	$gameTemp.originMapBgm = null;
	$gameTemp.originMapBgs = null;
	inBattle = false;
};


//An extenetion to make sure the safekept bgm and bgs and the in battle check are reset after Defeats, but only 
//ones that allow you to lose
frsh_deathreset_defeat_reset = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	frsh_deathreset_defeat_reset.call(this);
	if(this._canLose){ 
		$gameTemp.originMapBgm = null;
		$gameTemp.originMapBgs = null;
		inBattle = false;
	}
};

//An extention to add the plugin commands
frsh_deathreset_defeat_plugins = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	frsh_deathreset_defeat_plugins.call(this,command, args);
	if (command == "deathReset"){
		if (args == "enable"){
			$gameParty.allowReset = true;
		} else if (args == "disable"){
			$gameParty.allowReset = false;
		}
	}
	if (command == "deathAutoTitle"){
		if (args == "enable"){
			$gameParty.allowSkip = true;
		} else if (args == "disable"){
			$gameParty.allowSkip = false;
		}
	}
	return true;
};
})();
//=============================================================================
// End of File
//=============================================================================
