//=============================================================================
// FRSH_BGMVoiceDampen
// FRSH_BGMVoiceDampen.js
// Version: 1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.VDampen = true;

var Frashaw = Frashaw || {};
Frashaw.VDampen = Frashaw.VDampen || {};

/*:
* @plugindesc Upon playing a Sound Effect from an Event, BGMs quiets while it plays.
* @author Frashaw27
* 
* @help 
* ===Plugin Commands============================================================
* ! - Case Sensitive
* dampenEnable enable - Turn on the plugin.
* dampenEnable disable - Turn off the plugin.
* ===Introduction===============================================================
* I got tired of having to constantly push my voice lines to extreme volumes
* to make them be heard over the BGM that is playing, so I made this plugin so
* that I don't have the audio peak as much just in order to be heard.
* ===How to Use=================================================================
* Plug and play. Sound Effects will be played at half volume. Note that it only 
* works on Sound Effects played with event commands as all over times it 
* would've made battles sound terrible from how often the song would be reduced. 
* Use the plugin commands to turn this plugin off if needed for a scene or 
* something.
* ===Change Log=================================================================
* Version 1.0.2 (06/29/24):
* -Fixed Bug where the plugin would glitch out if you used a there wasn't a BGM
* playing
* -Turned an == to an >= to catch weird bugs that would cause the BGM to 
* infinitely grow in colume
* -Reduced the BGM volume to 1/4th of the original volume instead of 1/2th
*
* Version 1.0.1 (06/29/24):
* -Fixed Bug that was the result of me calling a variable that didn't exist
*
* Version 1.0.0 (06/26/24):
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
(function() {
//Variable setting
var volumeAddInterval = undefined;
var volume = undefined;
var enable = true;

//A function that is to be called on to return the volume to it's original value
function volumeAdd(){
	//Gets what sound effects are currently playing to determine if there are any playing
	AudioManager._seBuffers = AudioManager._seBuffers.filter(function(audio) {
        return audio.isPlaying();
    });
	//Runs if the amount playing are 0
	if (AudioManager._seBuffers.length == 0){
		//Gets current BGM info to properly return the correct BGM beign played
		var info = AudioManager.saveBgm();
		//Backup for the one below it, in case shinnanigans happen
		if (info.volume == volume){
			volume = undefined;
			clearInterval(volumeAddInterval);
			volumeAddInterval = undefined;
		}
		//Adds 1 to the current BGM's volume to increase it
		info.volume = info.volume + 1;
		//Plays the volume adjusted audio
		AudioManager.playBgm(info);
		//Checks to see if the current volume is the same as the stored one
		if (info.volume >= volume){
			//Makes the stored one null as to set it again
			volume = undefined;
			//Both stops this function from running
			clearInterval(volumeAddInterval);
			volumeAddInterval = undefined;
		}
	}
}

//An overwrite that makes the sound effect called from events be the one that triggers the
//the specific audio triggers
Game_Interpreter.prototype.command250 = function() {
	AudioManager.playEventSe(this._params[0]);
    return true;
};

//A copy of the normal playSe function, but with the added bits to regulate the volume 
AudioManager.playEventSe = function(se) {
    if (se.name) {
        this._seBuffers = this._seBuffers.filter(function(audio) {
            return audio.isPlaying();
        });
        var buffer = this.createBuffer('se', se.name);
        this.updateSeParameters(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
		//Checks to see if the plugin is currently enabled and if the current BGM isn't actually nothing
		if (enable && AudioManager.saveBgm().name != ""){
			//Gets the info of the currently playing BGM to play the correct one
			var info = AudioManager.saveBgm();
			//If the volume variable isn't defined, it defines it as the current volume of the BGM
			if (volume == null) volume = info.volume;
			//Cuts the current volume in half
			info.volume /= 4;
			//Plays the modified BGM
			AudioManager.playBgm(info);
			//Sets up the Volume Increasing function to be triggered
			if (volumeAddInterval == null) volumeAddInterval = setInterval(volumeAdd,25);
		}
	}
};

//An extention to add the plugin commands
frsh_vdampen_enable_plugins = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	frsh_vdampen_enable_plugins.call(this,command, args);
	if (command == "dampenEnable"){
		if (args == "enable"){
			enable = true;
		} else if (args == "disable"){
			enable = false;
		}
	}
	return true;
};
})();
//=============================================================================
// End of File
//=============================================================================
