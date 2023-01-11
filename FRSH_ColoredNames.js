//=============================================================================
// FRSH_ColoredNames
// FRSH_ColoredNames.js
// Version: 1.0.1
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
* last one to overwrite it to be the one that overwrites it. The only current
* intended capatability is with my other plugin Dynamic Battlelog Message.
* ===Change Log===============================================================
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
	
	//Function to mass call the name colorization
	function nameCaller(fool){
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
		var name = "\\c[" + color + "]" + fool.name() + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		return name;
		}
	
	//Changes Battlelog messages for skills that call the names. 
	if (!Imported.DBLMessage && !Imported.CIMessage){
	//If my other scripts, Dynamic Battlelog Message and Custom Item Messages
	//is enabled, this won't run and instead the other one will
	Window_BattleLog.prototype.displayAction = function(subject, item) {
    var numMethods = this._methods.length;
	var color = 0;
	if (item.meta.nameColor != null){
		color = parseInt(item.meta.nameColor);
	}
	var icon = 0;
	if (item.meta.iconNum != null){
		icon = parseInt(item.iconNum);
	}
	var name = "\\c[" + color + "]" + item.name + "\\c[0]";
	if (icon != 0){
		name = "\\i[" + icon + "]" + name;
	}
	color = 0;
	icon = 0;
	if (subject.isActor()){
	var id = subject.actorId()
	if ($dataActors[id].meta.nameColor != null){
		color = parseInt($dataActors[id].meta.nameColor);
	}
	if ($dataActors[id].meta.iconNum != null){
		icon = parseInt($dataActors[id].meta.iconNum);
	}
	} else {
	var id = subject.enemyId()
	if ($dataEnemies[id].meta.nameColor != null){
		color = parseInt($dataEnemies[id].meta.nameColor);
	}
	if ($dataEnemies[id].meta.iconNum != null){
		icon = parseInt($dataEnemies[id].meta.iconNum);
	}
	}
	var name2 = "\\c[" + color + "]" + subject.name() + "\\c[0]";
	if (icon != 0){
		name2 = "\\i[" + icon + "]" + name2;
	}
    if (DataManager.isSkill(item)) {
        if (item.message1) {
            this.push('addText', name2 + item.message1.format(name));
        }
        if (item.message2) {
            this.push('addText', item.message2.format(name));
        }
    } else {
        this.push('addText', TextManager.useItem.format(name2, name));
    }
    if (this._methods.length === numMethods) {
        this.push('wait');
    }
	}
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
	var name = actor.name();
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
		var id = this.actorId();
		var color = 0;
		var icon = 0;
		if ($dataActors[id].meta.nameColor != null){
			color = parseInt($dataActors[id].meta.nameColor);
		}
		if ($dataActors[id].meta.iconNum != null){
			icon = parseInt($dataActors[id].meta.iconNum);
		}
		var name = "\\c[" + color + "]" + this.name() + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		var text = TextManager.levelUp.format(name, TextManager.level, this._level);
		$gameMessage.newPage();
		$gameMessage.add(text);
		newSkills.forEach(function(skill) {
			var id = skill.id;
			var color = 0;
			var icon = 0;
			if ($dataSkills[id].meta.nameColor != null){
				color = parseInt($dataSkills[id].meta.nameColor);
			}
			if ($dataSkills[id].meta.iconNum != null){
				icon = parseInt($dataSkills[id].meta.iconNum);
			}
			var name2 = "\\c[" + color + "]" + skill.name + "\\c[0]";
			if (icon != 0){
				name2 = "\\i[" + icon + "]" + name2;
			}
			$gameMessage.add(TextManager.obtainSkill.format(name2));
		});
	};
	
	//Changes the Party leader's name to be colored. Feel free to edit it further if want to fuck with it yourself.
	Game_Party.prototype.name = function() {
		var numBattleMembers = this.battleMembers().length;
		var id = this.leader().actorId();
		var color = 0;
		var icon = 0;
		if ($dataActors[id].meta.nameColor != null){
			color = parseInt($dataActors[id].meta.nameColor);
		}
		if ($dataActors[id].meta.iconNum != null){
			icon = parseInt($dataActors[id].meta.iconNum);
		}
		var name = "\\c[" + color + "]" + this.leader().name() + "\\c[0]";
		if (icon != 0){
			name = "\\i[" + icon + "]" + name;
		}
		if (numBattleMembers > 1){
			var name2 = $dataSystem.terms.messages.partyName;
			nameArray = name2.split("%1");
			var text = name + nameArray[1];
		} else {
			return name;
		}
		return text;
	};
	
	//All below here are just the battlelog messages that remain so that the names 
	//can be colorized.
	//Checks to see if Dynamic Battlelogg Messages if active
	if(!Imported.DBLMessage){
		Window_BattleLog.prototype.displayCounter = function(target) {
			this.push('performCounter', target);
			this.push('addText', TextManager.counterAttack.format(nameCaller(target)));
		};

		Window_BattleLog.prototype.displayReflection = function(target) {
			this.push('performReflection', target);
			this.push('addText', TextManager.magicReflection.format(nameCaller(target)));
		};

		Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
			var substName = substitute.name();
			this.push('performSubstitute', substitute, target);
			this.push('addText', TextManager.substitute.format(substName, nameCaller(target)));
		};
		
		if (!Imported.Antifail){//Adds a capatability to one of my other plugins, Antifail
		Window_BattleLog.prototype.displayFailure = function(target) {
		if (target.result().isHit() && !target.result().success) {
				this.push('addText', TextManager.actionFailure.format(nameCaller(target)));
			}
		}
		};
		
		Window_BattleLog.prototype.displayFailure = function(target) {
		if (target.result().isHit() && !target.result().success) {
				this.push('addText', TextManager.actionFailure.format(nameCaller(target)));
			}
		};
		
		Window_BattleLog.prototype.displayMiss = function(target) {
		var fmt;
			if (target.result().physical) {
				fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
				this.push('performMiss', target);
			} else {
				fmt = TextManager.actionFailure;
			}
			this.push('addText', fmt.format(nameCaller(target)));
		};
		
		Window_BattleLog.prototype.displayEvasion = function(target) {
		var fmt;
			if (target.result().physical) {
				fmt = TextManager.evasion;
				this.push('performEvasion', target);
			} else {
				fmt = TextManager.magicEvasion;
				this.push('performMagicEvasion', target);
			}
			this.push('addText', fmt.format(nameCaller(target)));
		};
		
		Window_BattleLog.prototype.displayAddedStates = function(target) {
			target.result().addedStateObjects().forEach(function(state) {
				var stateMsg = target.isActor() ? state.message1 : state.message2;
				if (state.id === target.deathStateId()) {
					this.push('performCollapse', target);
				}
				if (stateMsg) {
					this.push('popBaseLine');
					this.push('pushBaseLine');
					this.push('addText', nameCaller(target) + stateMsg);
					this.push('waitForEffect');
				}
			}, this);
		};

		Window_BattleLog.prototype.displayRemovedStates = function(target) {
			target.result().removedStateObjects().forEach(function(state) {
				if (state.message4) {
					this.push('popBaseLine');
					this.push('pushBaseLine');
					this.push('addText', nameCaller(target) + state.message4);
				}
			}, this);
		};
		
		Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
			buffs.forEach(function(paramId) {
				this.push('popBaseLine');
				this.push('pushBaseLine');
				this.push('addText', fmt.format(nameCaller(target), TextManager.param(paramId)));
			}, this);
		};

		Window_BattleLog.prototype.makeHpDamageText = function(target) {
			var result = target.result();
			var damage = result.hpDamage;
			var isActor = target.isActor();
			var fmt;
			if (damage > 0 && result.drain) {
				fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
				return fmt.format(nameCaller(target), TextManager.hp, damage);
			} else if (damage > 0) {
				fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
				return fmt.format(nameCaller(target), damage);
			} else if (damage < 0) {
				fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
				return fmt.format(nameCaller(target), TextManager.hp, -damage);
			} else {
				fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
				return fmt.format(nameCaller(target));
			}
		};

		Window_BattleLog.prototype.makeMpDamageText = function(target) {
			var result = target.result();
			var damage = result.mpDamage;
			var isActor = target.isActor();
			var fmt;
			if (damage > 0 && result.drain) {
				fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
				return fmt.format(nameCaller(target), TextManager.mp, damage);
			} else if (damage > 0) {
				fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
				return fmt.format(nameCaller(target), TextManager.mp, damage);
			} else if (damage < 0) {
				fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
				return fmt.format(nameCaller(target), TextManager.mp, -damage);
			} else {
				return '';
			}
		};

		Window_BattleLog.prototype.makeTpDamageText = function(target) {
			var result = target.result();
			var damage = result.tpDamage;
			var isActor = target.isActor();
			var fmt;
			if (damage > 0) {
				fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
				return fmt.format(nameCaller(target), TextManager.tp, damage);
			} else if (damage < 0) {
				fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
				return fmt.format(nameCaller(target), TextManager.tp, -damage);
			} else {
				return '';
			}
		};
	}
})();

//=============================================================================
// End of File
//=============================================================================
