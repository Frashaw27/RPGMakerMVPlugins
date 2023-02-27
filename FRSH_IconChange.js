//=============================================================================
// FRSH_IconChange
// FRSH_IconChange.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.IChange = true;

var Frashaw = Frashaw || {};
Frashaw.IChange = Frashaw.IChange || {};

/*:
* @plugindesc Allows the ability to change Icon Sets on the fly.
* @author Frashaw27
* 
* @help 
* ==Script Calls==============================================================
* $gameSystem.changeIconSet('(your iconset name)')
* ===Introduction=============================================================
* I have always like Hime's Window Change for the way it allowed that little
* bit of customization to some areas and/or fights. So I decided to make
* something simular for Icon Sets.
* ===How to Use===============================================================
* First, put the Icon Set you want into your img/system folder and the use
* the above script call to change it. Do be warned that the icons will only
* change on the next time they're drawn/called.
* ===Change Log=============================================================== 
* Version 1.0 (01/09/23):
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function () {
	
  var iconset = '';

  var FRSH_GameSystem_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    FRSH_GameSystem_initialize.call(this);
    iconset = "IconSet";
  };

  Game_System.prototype.setIconSet = function(name) {
    iconset = name;
  };
  
  Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem(iconset);
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
  };
  
})();

//=============================================================================
// End of File
//=============================================================================