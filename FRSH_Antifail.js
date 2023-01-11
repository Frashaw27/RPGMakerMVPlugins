//=============================================================================
// FRSH_Antifail
// FRSH_Antifail.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.Antifail = true;

var Frashaw = Frashaw || {};
Frashaw.Antifail = Frashaw.Antifail || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Control if the Fail message appears or not, with use of a note tag.
*
* @help
* ==Notetages=================================================================
* Antifail: <Antifail> (case sensitive)
* ===Introduction=============================================================
* For the longest time, I've wanted a plugin that worked like Yanfly's
* Antifail from Vx Ace, but didn't find one and couldn't replicate it. 
* While another one of my scripts, Dynamic Battlelog Messages can sort
* of do the same thing, it wasn't exactly what I wanted, so this was
* born from me getting smarter and learning how to mimic the results I
* wanted.
* ===How to Use===============================================================
* By inserting the <Antifail> tag into a skill or item, it won't show the 
* fail message in the battle log. That's it. This can be used to combat the 
* message appearing if you used a skill  or item that only uses a Common 
* Event or other notetags. If this doesn't work at first, try shifting it 
* in the plugin manager to see if that fixes it.
* ===Change Log===============================================================
* Version 1.0 (01/11/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
	//Sets variables, so no fuckery happens
	var lastUsed = 0;
	var thing = 0;
	
	//Adds an additional action upon using an item, namely seting last used to
	//the id of the last used thing. Shouldn't conflict with anything.
	var Frashaw_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        Frashaw_useItem.call(this, item);
        lastUsed = item.id;
		if (DataManager.isItem(item)){
			thing = 1;
		} else {
			thing = 0;
		}
    };
	
	//A function I made to reduce the amount of code in the main function (the
	//one that shows the fail message or not.
	function checkChecker(target){
	//The normal check to see if to use fail or not
	if (!(target.result().isHit() && !target.result().success)){
		return false;
	}
	//A special check that only occurs when another one of my plugins, Dynamic
	//Battle Log Messages is being used. Mainly here so that it maintains 
	//functionality with while being placed anywhere within the plugin hierarchy. 
	if (Imported.DBLMessage){
		var parameter = PluginManager.parameters('FRSH_DynamicBattlelogMessages')
		var numb = parseInt(parameter['Fail Switch']);
		if (!$gameSwitches.value(numb)){
			return false;
		}
	}
	//Checks to see if the last used thing has the Antifail tag or not and if
	//they're a skill.
	if (thing == 0 && $dataSkills[lastUsed].meta.Antifail != null){
			return false;
	}
	//Checks to see if the last used thing has the Antifail tag or not and if
	//they're an item.
	if (thing == 1 && $dataItems[lastUsed].meta.Antifail != null){
			return false;
	}
	//If none of the other checks ran, it returns true that the fail message
	//can show.
	return true;
	}
	
	//Function to add compatibility with another plugin, Colored Names
	function nameCaller(fool){
		if (Imported.CName){
		var color = 0;
		var icon = 0;
		if (fool.isActor()){
		name2 = fool.name();
		var id = fool.actorId()
		if ($dataActors[id].meta.nameColor != null){
			color = parseInt($dataActors[id].meta.nameColor);
		}
		if ($dataActors[id].meta.iconNum != null){
			icon = parseInt($dataActors[id].meta.iconNum);
		}
		} else {
		name2 = fool.name;
		var id = fool.enemyId()
		if ($dataEnemies[id].meta.nameColor != null){
			color = parseInt($dataEnemies[id].meta.nameColor);
		}
		if ($dataEnemies[id].meta.iconNum != null){
			icon = parseInt($dataEnemies[id].meta.iconNum);
		}
		}
		var name = "\\c[" + color + "]" + name2 + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		return name;
		} else {
		return fool;
		}
	}

	//The fuction that shows the fail message (or not).
	Window_BattleLog.prototype.displayFailure = function(target){
		var check = checkChecker(target);
		if (check) {
			this.push('addText', TextManager.actionFailure.format(nameCaller(target)));
		}
	};

})();

//=============================================================================
// End of File
//=============================================================================