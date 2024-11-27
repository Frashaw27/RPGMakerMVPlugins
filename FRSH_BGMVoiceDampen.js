//=============================================================================
// FRSH_BGMVoiceDampen
// FRSH_BGMVoiceDampen.js
// Version: 1.3.0
//=============================================================================

var Imported = Imported || {};
Imported.VDampen = true;

var Frashaw = Frashaw || {};
Frashaw.VDampen = Frashaw.VDampen || {};

/*:
* @plugindesc Upon playing a Sound Effect from an Event, BGMs quiets while it plays.
* @author Frashaw27
*
* @param useAnySoundEffect
* @text Trigger On Any SE?
* @type boolean
* @on Any Sound Effect
* @off Only Voices
* @desc Select if you want to have all sound effects trigger the dampen or if just the voices that you list.
* @default false
*
* @param voiceDampenNameList
* @text Voice Name List
* @type text[]
* @desc Fill out with the various names that the voiceline in your game will use to reduce the BGM volume for. Ex: "Eric -".
*
* @param volumeMult
* @text Reduced Volume Multiplier
* @type number
* @decimals 2
* @min 0
* @max 1
* @desc Put the number you want the number to be multiplied by when a voice line is said.
* @default 0.25
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
* Plug and play. Sound Effects will be played at quarter volume/whatever you set 
* it to. Note that it only works on Sound Effects played with event commands as 
* all over times it would've made battles sound terrible from how often the song 
* would be reduced. Use the plugin commands to turn this plugin off if needed 
* for a scene or 
* something.
* ===Change Log=================================================================
* Version 1.3.0 (10/23/2024):
* -Added an alt way for the basic "Save BGM" command to not save the reduced 
* volume version of a track
*
* Version 1.2.1 (10/23/2024):
* -Added a check so that the plugin doesn't run if the BGM volume isn't 0
*
* Version 1.2.0 (10/09/2024):
* -Change the way that the music reduction is triggered, now it specifically
* waiting until the end of the specified sound effects to activate.
* -Removed the ability to stack audios to create a horrid freedback loop
* over ever increasing music.
*
* Version 1.1.0 (08/28/2024):
* -Fixed a bug where several SE's being played in succession would rapidly 
* decrease the BGM volume.
* -Added options to make the dampen to only trigger when SEs only have a certain
* specification about them and the multiplier for the volume reduction
*
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
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_BGMVoiceDampen');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.DampenAnySound = Parameters.useAnySoundEffect == "true";
if (Parameters.voiceDampenNameList != ''){
	Frashaw.Param.VoiceNameList = JSON.parse(Parameters.voiceDampenNameList);
} else {
	Frashaw.Param.VoiceNameList = [];
}
Frashaw.Param.VoiceMultiplier = Number(Parameters.volumeMult);

//Variable setting
var volumeAddInterval = undefined;
var volume = undefined;
var enable = true;
var check = false;

//A function that is to be called on to return the volume to it's original value
function volumeAdd(){
	//Gets current BGM info to properly return the correct BGM beign played
	var info = AudioManager.saveBgm();
	//Backup for the one below it, in case shinnanigans happen
	if (info.volume == volume || volume == null){
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

//An extention that checks to see if the current audio is reduced by a voice, if so then the
//"Save BGM" feature still correctly gets the correct volume
frsh_vdampen_save_bgm_correctly = Game_Interpreter.prototype.command243;
Game_Interpreter.prototype.command243 = function() {
    $gameSystem._savedBgm = AudioManager.saveBgmField()
	return true;
};

//A variation of the Save BGM that is used with the command "SaveBGM" so as to not save Reduced
//volume tracks
AudioManager.saveBgmField = function() {
    if (this._currentBgm) {
        var bgm = this._currentBgm;
        return {
            name: bgm.name,
            volume: (volumeAddInterval == null) ? bgm.volume : volume,
            pitch: bgm.pitch,
            pan: bgm.pan,
            pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0
        };
    } else {
        return this.makeEmptyAudioObject();
    }
};

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
		if (enable && AudioManager.saveBgm().name != "" && AudioManager.saveBgm().volume != 0){
			check = false;
			//Checks to see if the developer want to have any SE dampen the BGM
			if (!Frashaw.Param.DapenAnySound){
				//Goes through the list of deined voice names and checks then 
				//against the current BGM being played
				Frashaw.Param.VoiceNameList.forEach(function(i){
					if (se.name.contains(i)) check = true;
				})
			} else {
				check = true;
			}
			//If check is true, run the dampen
			if (check){
				//Makes the loop that increases the volume not run again
				clearInterval(volumeAddInterval);
				volumeAddInterval = undefined;
				//Removes the current flag of music reincrease check
				AudioManager._seBuffers[AudioManager._seBuffers.length-1].removeStopListener();
				//Gets the info of the currently playing BGM to play the correct one
				var info = AudioManager.saveBgm();
				//If the volume variable isn't defined, it defines it as the current volume of the BGM
				if (volume == undefined) volume = info.volume;
				//A fail safe to stop a sound effect from further reducting the volume when
				//it already is
				if (volume != null && info.volume >= volume*Frashaw.Param.VoiceMultiplier){
					//Cuts the current volume by the multiplier
					info.volume *= Frashaw.Param.VoiceMultiplier;
				}
				//Plays the modified BGM
				AudioManager.playBgm(info);
				//Sets up the Volume Increasing function to be triggered
				//if (volumeAddInterval == null) volumeAddInterval = setInterval(volumeAdd,25);
				AudioManager._seBuffers[AudioManager._seBuffers.length-1].addStopListener(
					() => {if (volumeAddInterval == undefined) volumeAddInterval = setInterval(volumeAdd,25)}
				);
				
			}
		}
	}
};

//A special function made to remove the checks of the 
WebAudio.prototype.removeStopListener = function() {
    this._stopListeners.splice(this._stopListeners.indexOf("() => {if (volumeAddInterval == undefined) volumeAddInterval = setInterval(volumeAdd,25)}"), 1);
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
