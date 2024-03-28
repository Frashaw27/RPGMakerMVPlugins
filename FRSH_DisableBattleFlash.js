//=============================================================================
// FRSH_DisableBattleFlash
// FRSH_DisableBattleFlash.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.noBattleFlash = true;

var Frashaw = Frashaw || {};
Frashaw.noBattleFlash = Frashaw.noBattleFlash || {};

/*:
* @plugindesc Allows the ability to disable battle flashing via the options menu.
* @author Frashaw27
*
* @param flashName
* @text Name of Flash Option
* @type text
* @desc Put the name of the option for disabling flashes in battle for the options menu.
* @default Show Battle Flashes?
*
* @param flashDefault
* @text Default Flash Option
* @type boolean
* @desc Click True or False for the default setting for showing flashes in battle. 
* @default false
*
* 
* @help 
* ===Introduction=============================================================
* It is common practice to warn people with epilepsy to not play games due to
* health risks, this plugin is to help mitigate those risks by disabling
* flashes in battle animations, as those can be quite rapid sometimes.
* ===How to Use===============================================================
* Plug and play. Beyond setting the name and the default state, it will
* run perfectly smoothly otherwise.
* ===Change Log===============================================================
* Version 1.0 (03/28/24) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_DisableBattleFlash');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.FlashName = Parameters.flashName;
Frashaw.Param.FlashDefault = (Parameters.flashDefault == "true");

//This stops the flash from starting if the option to disable them is true
frsh_no_battle_flash_show_flash = Sprite_Animation.prototype.startScreenFlash
Sprite_Animation.prototype.startScreenFlash = function(color, duration) {
	if (ConfigManager.disableBattleFlash) return;
    frsh_no_battle_flash_show_flash.call(this, color, duration);
};

//This sets the config disable battle flash based on what the current one is
frsh_no_battle_flash_set_data_a = ConfigManager.makeData
ConfigManager.makeData = function() {
    var config = frsh_no_battle_flash_set_data_a.call(this);
    config.disableBattleFlash = this.disableBattleFlash;
    return config;
};

//This sets the current config disable battle flash based on what the config is, defaulting to false
//if it doesn't exist
frsh_no_battle_flash_set_data_b = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    frsh_no_battle_flash_set_data_b.call(this, config);
    this.disableBattleFlash = (config["disableBattleFlash"] != null) ? config["disableBattleFlash"] : Frashaw.Param.FlashDefault ;
};

//This shows the option to disable battle flash in battle to the options menu
frsh_no_battle_flash_option_show = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  frsh_no_battle_flash_option_show.call(this);
  this.addCommand(Frashaw.Param.FlashName, "disableBattleFlash");
};

})();

//=============================================================================
// End of File
//=============================================================================