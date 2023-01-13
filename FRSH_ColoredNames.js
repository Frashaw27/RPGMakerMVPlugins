//=============================================================================
// FRSH_ColoredNames
// FRSH_ColoredNames.js
// Version: 1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.CName = true;

var Frashaw = Frashaw || {};
Frashaw.DBLMessage = Frashaw.CName || {};

/*:
* @plugindesc Allows the ability to color Thing's Names w/o Text Codes.
* @author Frashaw27
* 
* @help 
* ==Notetags==================================================================
* General Color: <nameColor: (id)>
* General Icon: <iconNum: (id)>
* Nickname-Specifc Color: <nicknameColor: (id)>
* Nickname-Specifc Icon: <nickIconNum: (id)> 
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
* ===Change Log===============================================================
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
* Version 1.0 (01/09/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function() {
	//Changes the Name for Skills, Items, Weapons, and Armors in the selection (doesn't show icons normally because of the nature of these things (it's not really needed here).
	Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
		var color = 0;
		var icon = 0;
		if (item.meta.nameColor != null){
			color = parseInt(item.meta.nameColor);
		}
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + padding, y + padding);
		this.changeTextColor(this.textColor(color));
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
		this.resetTextColor();
    }
	};
	
	//A function that makes the item's called name fit within the colored
	//name aethetic. Can't be set like the others because Item Names aren't
	//set like that.
	function makeItemName(item){
		var color = 0;
		if (item.meta.nameColor != null){
			color = parseInt(item.meta.nameColor);
		}
		var icon = 0;
		if (item.meta.iconNum != null){
			icon = parseInt(item.meta.iconNum);
		}
		var name = "\\c[" + color + "]" + item.name + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		return name;
	}
	
	//A function made to rewrite the name produced from a script
	//call to be colored.
	Game_Actor.prototype.name = function() {
		var fool = this;
		var color = 0;
		var icon = 0;
		var name2 = fool._name;
		var id = fool.actorId()
		if ($dataActors[id].meta.nameColor != null){
			color = parseInt($dataActors[id].meta.nameColor);
		}
		if ($dataActors[id].meta.iconNum != null){
			icon = parseInt($dataActors[id].meta.iconNum);
		}
		var name = "\\c[" + color + "]" + name2 + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		return name;
	};

	//Changes the Enemy Name in drawing their name for the selection
	Window_BattleEnemy.prototype.drawItem = function(index) {
		this.resetTextColor();
		var enemy = this._enemies[index];
		var name = enemy.enemy().name;
		var rect = this.itemRectForText(index);
		var id = enemy.enemyId();
		var color = 0;
		var icon = 0;
		if ($dataEnemies[id].meta.nameColor != null){
			color = parseInt($dataEnemies[id].meta.nameColor);
		}
		if ($dataEnemies[id].meta.iconNum != null){
			icon = parseInt($dataEnemies[id].meta.iconNum);
		}
		this.changeTextColor(this.textColor(color));
		if (icon != 0){
			this.drawText(name, rect.x+32, rect.y, rect.width);
			this.drawIcon(icon, rect.x, rect.y);
		} else {
			this.drawText(name, rect.x, rect.y, rect.width);
		}
	};
	
	//Changes the Original Name (used for things like the encounter message)
	Game_Enemy.prototype.originalName = function() {
    var id = this.enemyId();
	var color = 0;
	var icon = 0;
	if ($dataEnemies[id].meta.nameColor != null){
		color = parseInt($dataEnemies[id].meta.nameColor);
	}
	if ($dataEnemies[id].meta.iconNum != null){
		icon = parseInt($dataEnemies[id].meta.iconNum);
	}
	var text = "\\c[" + color + "]" + this.enemy().name + "\\c[0]";
	if (icon != 0){
		text = "\\i[" + icon + "]" + text;
	}
    return text;
	};
	
	//Changes the Enemy Name, used for a majority of things like Battle Log messages (doesn't supoort icons, because it doesn't need to). Tbh, this mostly is just here for the letter at the end.
	Game_Enemy.prototype.name = function() {
	var id = this.enemyId();
	var color = 0;
	if ($dataEnemies[id].meta.nameColor != null){
		color = parseInt($dataEnemies[id].meta.nameColor);
	}
	var text = this.originalName() + "\\c[" + color + "]" + (this._plural ? this._letter : '') + "\\c[0]";
    return text;
	};
	
	//For drawing the the actors name in most menus
	Window_Base.prototype.drawActorName = function(actor, x, y, width) {
	var id = actor.actorId();
	var icon = 0;
	var name = actor._name;
	if ($dataActors[id].meta.nameColor != null){
		color = parseInt($dataActors[id].meta.nameColor);
	}
	if ($dataActors[id].meta.iconNum != null){
		icon = parseInt($dataActors[id].meta.iconNum);
	}
    this.changeTextColor(this.nameHpColor(actor));
    if (icon != 0){
		this.drawText(name, x+32, y, width);
		this.drawIcon(icon, x, y);
	} else {
		this.drawText(name, x, y, width);
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
		if ($dataActors[id].meta.nameColor != null){
		return this.textColor(parseInt($dataActors[id].meta.nameColor));
		} else {
        return this.textColor(0);
		}
    }
	};
	
	//For the class processing of the actors
	Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
	var id = actor.currentClass().id;
	var color = 0;
	var icon = 0;
	var name = actor.currentClass().name;
	if ($dataClasses[id].meta.nameColor != null){
		color = parseInt($dataClasses[id].meta.nameColor);
	}
	if ($dataClasses[id].meta.iconNum != null){
		icon = parseInt($dataClasses[id].meta.iconNum);
	}
	this.changeTextColor(this.textColor(color));
	if (icon != 0){
		this.drawText(name, x+32, y, width);
		this.drawIcon(icon, x, y);
	} else {
		this.drawText(name, x, y, width);
	}
	};
	
	//For the nick name processing of actors
	Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {
    var id = actor.actorId();
	var color = 0;
	var icon = 0;
	var name = actor.nickname();
	if ($dataActors[id].meta.nicknameColor != null){
		color = parseInt($dataActors[id].meta.nicknameColor);
	}
	if ($dataActors[id].meta.nickIconNum != null){
		icon = parseInt($dataActors[id].meta.nickIconNum);
	}
    this.changeTextColor(this.textColor(color));
    if (icon != 0){
		this.drawText(name, x+32, y, width);
		this.drawIcon(icon, x, y);
	} else {
		this.drawText(name, x, y, width);
	}
	};
	
	//For the level up text boxes
	Game_Actor.prototype.displayLevelUp = function(newSkills) {
		var text = TextManager.levelUp.format(this.name(), TextManager.level, this._level);
		$gameMessage.newPage();
		$gameMessage.add(text);
		newSkills.forEach(function(skill) {
			var name2 = makeItemName(skill); 
			$gameMessage.add(TextManager.obtainSkill.format(name2));
		});
	};
	
	//Overwrites the name displayed for a dropped item to be colored
	BattleManager.displayDropItems = function() {
    var items = this._rewards.items;
    if (items.length > 0) {
        $gameMessage.newPage();
        items.forEach(function(item) {
            $gameMessage.add(TextManager.obtainItem.format(makeItemName(item)));
        });
    }
};
})();

//=============================================================================
// End of File
//=============================================================================
