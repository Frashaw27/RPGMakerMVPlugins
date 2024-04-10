//=============================================================================
// FRSH_WeaknessThings
// FRSH_WeaknessThings.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.WThings = true;

var Frashaw = Frashaw || {};
Frashaw.WThings = Frashaw.WThings || {};

/*:
* @plugindesc Saves seen enemy weaknesses across encounters and shows them.
* @author Frashaw27
*
* @param numElements
* @text Number of Elements
* @type number
* @desc Put the total number of elements your game has.
* @default 10
* @min 1
*
* @param elmIconArray
* @text Element Icon Array
* @type text
* @desc Put an array (1, 2, 3) of the icon numbers relating to the respective element. Seperate by commas; put 0 if unused.
*
* @param unknownElmIcon
* @text Unknown Element Icon
* @type number
* @desc Put the icon id of the icon you want to represent an unknown weakness.
* @default 1
* @min 1
*
* @param elmIconYAjdust
* @text Icon Y Adustment
* @type number
* @desc Put number you want to alter the y axis of where the weakness icons appear when selecting an enemy.
* @default -30
* 
* @help 
* ===Introduction=============================================================
* I was requested for this one by friend. Basically their weakness showing 
* plugin wasn't workign as they wanted and when I looked into the code to 
* correct the y-axis, it was fucked. So I went onto this quest to recreate it
* alongside also developing my long standing curosity of having elemental
* weakness knowledge shared between encounter.
* ===How to Use===============================================================
* !~~This Plugin requires Battle Engine Core from Yanfly to use~~!
*       !~~~the Display. Make sure you have it before hand~~!
* Plugin and Play after setup. Remember to specify the number of elements
* in your game so that nothing screws up.
* ===Change Log===============================================================
* Version 1.0.0 (04/10/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_WeaknessThings');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.ElementNumber = Parameters.numElements;
Frashaw.Param.ElementArray = arrayizer(Parameters.elmIconArray); 
Frashaw.Param.ElementArray.splice(0, 0, 0); 
Frashaw.Param.UknownElementIcon = Number(Parameters.unknownElmIcon);
Frashaw.Param.ElementYAdust = Number(Parameters.elmIconYAjdust);

//A function meant to seperate the values gotten from the plugin parameters into arrays along with removing any not used values
function arrayizer(yes){
	array = yes.split(",");
	for (var loop = 0; loop != array.length; loop++){
		array[loop] = Number(array[loop]);
		if (array[loop] < 0) array[loop] = "Remove";
	}
	while (array.contains("Remove")){
		array.splice(array.indexOf("Remove"), 1);
	}
	return array;
}

//Calls on the Damage Calcs to to show what elements were being used
frsh_weakthings_damage_shown = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var damage = frsh_weakthings_damage_shown.call(this, target, critical);
	this.getShownElements(target);
	return damage;
}

//Sets the elements used on the enemy to be able to be recognized by the system
Game_Action.prototype.getShownElements = function(target){
	if (target.isActor()) return;
	if (this.item().damage.elementId < 0) {
        var elementz = this.elementsMaxRateElement(target, this.subject().attackElements());
    } else {
        var elementz = this.item().damage.elementId;
    }
	$gameParty.enemyWeaknessIndex[target.enemyId()][elementz] = true;
}

//Gets the Elment Rate of a "Normal Attack" Element... hopefully
Game_Action.prototype.elementsMaxRateElement = function(target, elements) {
    if (elements.length > 0) {
        return Math.max.apply(null, elements.map(function(elementId) {
            return elementId;
        }, this));
    } else {
        return 1;
    }
};

//Initalizes the elementIndexArray that will track the enemy weakness seen thorughout the game
frsh_weakthing_share_weakness_init = Game_Party.prototype.initialize
Game_Party.prototype.initialize = function() {
    frsh_weakthing_share_weakness_init.call(this);
	this.enemyWeaknessIndex = {};
	for (var loop = 1; loop != $dataEnemies.length; loop++){
		var tempArray = [];
		for (var pool = 0; pool <= Frashaw.Param.ElementNumber; pool++){
			tempArray.push(false);
		}
		this.enemyWeaknessIndex[loop] = tempArray;
	}
};

//Checks the save on load to see if any enemies need to be added to the list
frsh_weakthing_matchies = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
    frsh_weakthing_matchies.call(this);
	if ($gameParty.enemyWeaknessIndex.length != $dataEnemies.length-1){
		for (var loop = $gameParty.enemyWeaknessIndex.length+1; loop != $dataEnemies.length; loop++){
			var tempArray = [];
			for (var pool = 0; pool <= Frashaw.Param.ElementNumber; pool++){
				tempArray.push(false);
			}
			this.enemyWeaknessIndex[loop] = tempArray;
		}
	}
};

//Checks to see is Battle Core is being used so as to not crash
if (Imported.YEP_BattleEngineCore){
//Draws the icons for the display
frsh_weakthings_icons = Window_EnemyVisualSelect.prototype.refresh;
Window_EnemyVisualSelect.prototype.refresh = function() {
	frsh_weakthings_icons.call(this);
	var y = this.contents.height - this.lineHeight() - 32 + Frashaw.Param.ElementYAdust ;
	var x = this.contents.width/2;
	var array = [];
	var enemy = this._battler;
	for (var i = 1; i <= Frashaw.Param.ElementNumber; i++){
		if (enemy.elementRate(i) > 1){
			array.push(i);
		}
	}
	array.filter(function(i){ return Frashaw.Param.ElementArray[i] != 0 });
	var numWeak = array.length;
	x -= 16*numWeak;
	for (var loop = 0; loop != array.length; loop++){
		if ($gameParty.enemyWeaknessIndex[enemy.enemyId()][array[loop]]){
			this.drawIcon(Frashaw.Param.ElementArray[array[loop]], x, y, this.contents.width, 'center');
		} else {
			this.drawIcon(Frashaw.Param.UknownElementIcon, x, y, this.contents.width, 'center');
		}
		x += 32;
	}
};
}
})();
//=============================================================================
// End of File
//=============================================================================
