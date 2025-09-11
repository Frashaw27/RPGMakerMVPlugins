//=============================================================================
// FRSH_TimeCountUp
// FRSH_TimeCountUp.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.TCup = true;

var Frashaw = Frashaw || {};
Frashaw.TCup = Frashaw.TCup || {};

/*:
* @plugindesc Allows the game to freeze the timer and make it count up.
* @author Frashaw27
* 
* @help 
* ===Script Calls===============================================================
* $gameTimer.startUp(): Makes the timer start at 0 and start counting up
* $gameTimer.stopUp(): Makes the timer stop counting up *-Needed to return
* the timer back to normal
* $gameTimer.freeze(): Makes the timer stop counting up or down
* $gameTimer.unfreeze(): Makes the timer resume counting up or down
* ===Introduction===============================================================
* This plugin isn't particularly advanced, but I feel like a lot of makers can 
* use if for their projects as an incrementing timer is a pretty basic way to
* add things to the game.
* ===How to Use=================================================================
* You call the the requisite functions via script. Keep in mind to only use
* $gameTimer.stopUp() when stopping an incrementing timer as otherwise when
* you start up timer again, the timer will continue counting up since it wasn't
* disabled.
* ===Change Log=================================================================
* Version 1.0 (09/11/23):
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
(function() {
//Initalizes the plugin so that both the freezing and going up function can be called
frsh_timerup_initalize = Game_Timer.prototype.initialize;
Game_Timer.prototype.initialize = function() {
    frsh_timerup_initalize.call(this);
	this.goUp = false;
	this.freezeTime = false;
};

//Checks to see if the timer is going up or frozen and acts accordingly
frsh_timerup_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    if (this.freezeTime) return;
	if (sceneActive && this._working && this.goUp){
		this._frames++;
	} else {
		frsh_timerup_update.call(this, sceneActive);
	}
};

//Makes the timer start counting up
Game_Timer.prototype.startUp = function() {
    this._frames = 0;
    this._working = true;
	this.goUp = true;
};

//Makes the timer stop counting up
Game_Timer.prototype.stopUp = function() {
    this._working = false;
	this.goUp = false;
};

//Makes the timer stop working
Game_Timer.prototype.freeze = function() {
    this.freezeTime = true;
};

//Makes the timer restart working
Game_Timer.prototype.unfreeze = function() {
    this.freezeTime = false;
};
})();
//=============================================================================
// End of File
//=============================================================================