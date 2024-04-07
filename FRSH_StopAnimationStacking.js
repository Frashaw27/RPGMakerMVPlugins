//=============================================================================
// FRSH_StopAnimationStacking
// FRSH_StopAnimationStacking.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.SAStack = true;

var Frashaw = Frashaw || {};
Frashaw.SAStack = Frashaw.SAStack || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Stops animations from repeating, creating visual chaos.
*
* @help
* ===Introduction=============================================================
* RPG Maker sometimes causes animations to stack up and look off and bad,
* this plugin attempts to fix that.
* ===How to Use===============================================================
* Just add it and it will work. Will only work in Battles as to not interupt
* the flow of events in game that specifically call them.
* ===Change Log===============================================================
* Version 1.0.0 (04/07/24):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
frsh_sastack_play = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
	var check = true;
	if (this.isAnimationPlaying() && $gameParty.inBattle()){
		var list = [];
		this._animationSprites.forEach(function(i){ list.push(i._animation.id) });
		if (list.contains(animation.id)) check = false;
	}
    if (check) frsh_sastack_play.call(this, animation, mirror, delay);
};
})();
//=============================================================================
// End of File
//=============================================================================