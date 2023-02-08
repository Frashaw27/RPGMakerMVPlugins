//=============================================================================
// FRSH_IconScroll
// FRSH_IconScroll.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.IconScroll = true;

var Frashaw = Frashaw || {};
Frashaw.IconScroll = Frashaw.IconScroll || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Shifts Icons in the Battle Status to show if there more then the max.
*
* @param ---Generic Setup-----
* @default
*
* @param battleMax
* @text Max Icons in Battle
* @parent ---Generic Setup-----
* @type number
* @desc Put the number of how many Icons you want to show at once in battle.
* @default 2
* @min 1
*
* @param menuMax
* @text Max Icons in Menu
* @parent ---Generic Setup-----
* @type number
* @desc Put the number of how many Icons you want to show at once in the menu.
* @default 2
* @min 1
*
* @param seconds
* @text Seconds between Swaps
* @parent ---Generic Setup-----
* @type number
* @desc Put the number of seconds between each swap.
* @default 5
* @min 1
*
*
* @help
* ===Introduction=============================================================
* RPG Maker MV has one core issue with it's out of the box Hud in my
* opinion. It doesn't show all your Buffs and States on an actor in
* battle. This can often matter a whole lot to a large majority of games 
* as keeping track of what things the actor has active on them can be
* crucial for gameplay. So what this plugin sets out to achieve is to
* give the in-game BASE Hud that functionality.  
* ===How to Use===============================================================
* Input the numbers you want into the Parameters and it'll work on its own.
* If you have Yanfly Buff and States Core, put this below it to both work
* properly and to have Turn Counters on if you so desire.
* ===Change Log===============================================================
* Version 1.0 (02/08/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_IconScroll');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.BMax = Parameters.battleMax;
Frashaw.Param.MMax = Parameters.menuMax;
Frashaw.Param.Sec = Parameters.seconds;

function repeated() {
	if ($gameParty.inBattle()){
		BattleManager.refreshStatus()
	}
}

var repeater = setInterval(repeated, Frashaw.Param.Sec*1000);


//Used to add compatiblity with another of my plugins, Dynamic Battlelog Messages
	if (Imported.YEP_BuffsStatesCore){
		var parameterbb = PluginManager.parameters('YEP_BuffsStatesCore')
		var numb = eval(String(parameterbb['Show Turns']));
		if (numb === true){
			var check = true;
		} else {
			var check = false;
		}
	} else {
	//If Dynamic Battlelog Messages isn't on
		var check = false;
	}

_frsh_repeat = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
		_frsh_repeat.call(this,actorId);
		this._repeat = 0;
};
	
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
	width = actor.allIcons().length;
	var max = Frashaw.Param.BMax;
	var repeat = Math.ceil(width/max);
	var icons = actor.allIcons().slice(0, width);
	if (width <= max){
		for (var i = 0; i < max; i++) {
			this.drawIcon(icons[i], x + Window_Base._iconWidth * (i - 2), y + 2);
		}
		if (check){
			this.drawActorIconsTurns(actor, x-(Window_Base._iconWidth*(max-2)), y, width*Window_Base._iconWidth, width, 0);
		}
	} else {
		var t = 0;
		for (var i = 0; i < max; i++) {
			if (icons[i+(max*actor._repeat)] != null){
				this.drawIcon((icons[i+(max*actor._repeat)]), x + Window_Base._iconWidth * (i - (max-2)), y + 2);
			} else {
				this.drawIcon(icons[t], x + Window_Base._iconWidth * (i - (max-2)), y + 2);
				t++	
			}
			if (check){
				this.drawActorIconsTurns(actor, x-(Window_Base._iconWidth*(max-2)), y, width*Window_Base._iconWidth, max, actor._repeat);
			}
		}
		actor._repeat++;
		if (repeat == actor._repeat){
			actor._repeat = 0;
		}
	}
};
	
if (check){
Window_Base.prototype.drawActorIconsTurns = function(actor, wx, wy, ww, max, modifier) {
	  var iw = Window_Base._iconWidth;
	  var icons = actor.allIcons().slice(0, Math.floor(ww / iw));
	  var shownMax = max;
	  var exclude = modifier*max;
	  while (shownMax > 0){
	  for (var i = 0; i < actor.states().length; ++i) {
		if (exclude > 0){
			exclude--;
			continue;
		} 
		if (shownMax <= 0) break;
		var state = actor.states()[i];
		if (state.iconIndex <= 0) continue;
		if (state.autoRemovalTiming > 0) {
		  this.drawStateTurns(actor, state, wx, wy);
		}
		this.drawStateCounter(actor, state, wx, wy);
		wx += iw;
		--shownMax;
	  }
	  for (var i = 0; i < 8; ++i) {
		if (exclude > 0){
			exclude--;
			continue;
		}
		if (shownMax <= 0) break;
		if (actor._buffs[i] === 0) continue;
		this.drawBuffTurns(actor, i, wx, wy);
		if (Yanfly.Param.BSCShowBuffRate) {
		  this.drawBuffRate(actor, i, wx, wy);
		}
		wx += iw;
		--shownMax;
	  }
	  }
	  this.resetFontSettings();
	  this.resetTextColor();
};
}

Window_Base.prototype.drawActorIcon = function(actor, x, y, width) {
    width = Frashaw.Param.MMax;
    var icons = actor.allIcons().slice(0, Math.floor(width));
    for (var i = 0; i < Frashaw.Param.MMax; i++) {
        this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
    }
	if (check){
		this.drawActorIconsTurn(actor, x, y + 2, width*Window_Base._iconWidth, Frashaw.Param.MMax, 0);
	}
};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
	if (actor.actorId() != 6) {
    this.drawActorLevel(actor, x, y + lineHeight * 1);
	}
    this.drawActorIcon(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
	if (this._actor.actorId() != 6) {
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
	}
    this.drawActorIcon(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    this.drawActorMp(this._actor, x, y + lineHeight * 3);
};

if (check){
Window_Base.prototype.drawActorIconsTurn = function(actor, wx, wy, ww, max) {
	  var iw = Window_Base._iconWidth;
	  var icons = actor.allIcons().slice(0, Math.floor(ww / iw));
	  var shownMax = max;
	  for (var i = 0; i < actor.states().length; ++i) {
		if (shownMax <= 0) break;
		var state = actor.states()[i];
		if (state.iconIndex <= 0) continue;
		if (state.autoRemovalTiming > 0) {
		  this.drawStateTurns(actor, state, wx, wy);
		}
		this.drawStateCounter(actor, state, wx, wy);
		wx += iw;
		--shownMax;
	  }
	  for (var i = 0; i < 8; ++i) {
		if (shownMax <= 0) break;
		if (actor._buffs[i] === 0) continue;
		this.drawBuffTurns(actor, i, wx, wy);
		if (Yanfly.Param.BSCShowBuffRate) {
		  this.drawBuffRate(actor, i, wx, wy);
		}
		wx += iw;
		--shownMax;
	  }
	  this.resetFontSettings();
	  this.resetTextColor();
};
}