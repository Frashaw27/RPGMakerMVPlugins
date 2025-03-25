//=============================================================================
// FRSH_BGMVoiceDampen
// FRSH_BGMVoiceDampen.js
// Version: 1.4.1
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
* @param volumeStep
* @text volume Increase Step
* @type number
* @decimals 2
* @min 0
* @max 1
* @desc Put the number you want the number of the number to increase by to return to normal volume.
* @default 0.05
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
* for a scene or something.
* ===Change Log=================================================================
* Version 1.4.1 (03/25/2025):
* -Added the same things to Fading in BGMs as fading them out
*
* Version 1.4.0 (03/20/2025):
* -Rewrote the plugin with a different method of lowering volume that didn't
* come with all the issues of the previous iterations via a volume 
* modifier on bgm output.
* -Global sound dampening via plugin parameters now works properly
* -Fixed a bug where fadeout bgm didn't work
*
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
Frashaw.Param.VoiceStep = Number(Parameters.volumeStep);

//Variable setting
var volumeAddInterval = undefined;
var volume = undefined;
var enable = true;
var check = false;
var audioMod = 1;
var fadingCheck = false;
var bufferCheck = false;

//An always running programming occuring every 1/4th of a second dedicated
//for automatically adjusting the volume on the BGM
function passiveVolumeControl(){
	//Checks that makes sure it doesn't run when it shouldn't
	if (!fadingCheck && !bufferCheck){
		//Increases the audio volume for steps
		if (audioMod < 1) audioMod += Frashaw.Param.VoiceStep;
		//Failsafe incase it somehow exceeds 1
		if (audioMod > 1) audioMod = 1;
		//Updates the BGM parameters to account the modifier
		AudioManager.updateBgmParameters(AudioManager.saveBgm())
	}
}

//Sets up the passiveVolumeControl to always be running
setInterval(passiveVolumeControl, 250);

//An overwrite that makes the fadeout not just immediatly lose sound
AudioManager.fadeOutBgm = function(duration) {
    if (this._bgmBuffer && this._currentBgm) {
		fadingCheck = true;
        this._bgmBuffer.fadeOut(duration);
		setTimeout(function(){
			audioMod = 1;
			fadingCheck = false;
		}, duration * 1000);
        this._currentBgm = null;
    }
};

//Same as above, but for audio fade ins
AudioManager.fadeInBgm = function(duration) {
    if (this._bgmBuffer && this._currentBgm) {
		fadingCheck = true;
		this._bgmBuffer.fadeIn(duration);
		setTimeout(function(){
			audioMod = 1;
			fadingCheck = false;
		}, duration * 1000);   
    }
};

//An overwright made so that the bgm volume could be altered by the audioMod
AudioManager.updateBgmParameters = function(bgm) {
    this.updateBufferParameters(this._bgmBuffer, this._bgmVolume*audioMod, bgm);
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
		//A varity of checks to make sure the plugin doesn't interact with things it
		//isn't suppose to
		if (enable && AudioManager.saveBgm().name != "" && AudioManager.saveBgm().volume != 0){
			check = false;
			//Checks to see if the developer want to have any SE dampen the BGM
			if (!Frashaw.Param.DampenAnySound){
				//Goes through the list of deined voice names and checks then 
				//against the current BGM being played
				Frashaw.Param.VoiceNameList.forEach(function(i){
					if (se.name.contains(i)) check = true;
				});
			} else {
				check = true;
			}
			if (check){
				//Sets the audio modifier to the one in the plugin parameters
				audioMod = Frashaw.Param.VoiceMultiplier;
				AudioManager.updateBgmParameters(AudioManager.saveBgm());
				//Makes the sure the audomatic adjustment don't run while the sound
				//effect plays
				if (!bufferCheck) bufferCheck = true;
				AudioManager._seBuffers[AudioManager._seBuffers.length-1].addStopListener(
					//Runs when the sound effect ends, allowing the auto sound adjust to
					//work again
					() => { bufferCheck = false }
				);
			}
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
