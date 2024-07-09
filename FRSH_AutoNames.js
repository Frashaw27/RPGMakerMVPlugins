//=============================================================================
// FRSH_AutoNames
// FRSH_AutoNames.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.ANames = true;

var Frashaw = Frashaw || {};
Frashaw.ANames = Frashaw.ANames || {};

/*:
* @plugindesc Allows the user to auto show names based on the Faceset choosen.
* @author Frashaw27
*
* @param faceFileNameList
* @text Face List
* @type file[]
* @dir img/faces/
* @desc Fill out with the face files that will trigger the name to show. Make sure the desired name file line up placement wise.
*
* @param faceNameList
* @text Name List
* @type text[]
* @desc Fill out with the various names that will appear with face. All text codes need to use "//" instead of "/". Ex:\\i[5]Bob
* 
* @help 
* ===Introduction===============================================================
* In my games, I like the use of Yanfly's Message Core to show the names of 
* characters that are talking, but I found the process of adding a call for 
* each name indiviually both tiresome and ugly when looking in the game files.
* So I made this automated process so that I didn't have to dedicate a semi 
* significant amount of time to doing it by hand.
* ===How to Use=================================================================
* !This Plugin Requires Yanfly Message Core to be in and to be placed below it!
* Once setup, there is nothing else to really to do with this plugin.
* ===Change Log=================================================================
* Version 1.0 (07/08/24):
* -Finished Base Plugin
* ==============================================================================
*/
//==============================================================================
(function() {
if (Imported.YEP_MessageCore){
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_AutoNames');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.FaceFileNameList = JSON.parse(Parameters.faceFileNameList);
Frashaw.Param.FaceNameList = JSON.parse(Parameters.faceNameList);

//An overwrite of the basic command of showing the message in a text box so that we can add the automatic
//name showing to the text box
Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
        $gameMessage.setFaceImage(this._params[0], this._params[1]);
        $gameMessage.setBackground(this._params[2]);
        $gameMessage.setPositionType(this._params[3]);
        while (this.nextEventCode() === 401) {  // Text data
            this._index++;
			//Grabs the current text for the incoming text box
			var text = this.currentCommand().parameters[0];
			//Grabs the name of the current face so it can be called
			var face = this._params[0];
			//A Variable to act as the name placement if called
			var add = "";
			//Checks to if the Face isn't blank and is apart is of the list of faces to call from
			//then grabs actual name by calling the index number of the face name
			if (face != "" && Frashaw.Param.FaceFileNameList.contains(face)) add = "\\n<" + Frashaw.Param.FaceNameList[Frashaw.Param.FaceFileNameList.indexOf(face)] + ">";
			//Adds the name variable to the start of the text box
			text = add + text;
			//Adds text to the message box
            $gameMessage.add(text);
        }
        switch (this.nextEventCode()) {
        case 102:  // Show Choices
            this._index++;
            this.setupChoices(this.currentCommand().parameters);
            break;
        case 103:  // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104:  // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
        }
        this._index++;
        this.setWaitMode('message');
    }
    return false;
};
}
})();
//=============================================================================
// End of File
//=============================================================================