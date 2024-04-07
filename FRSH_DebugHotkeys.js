//=============================================================================
// FRSH_DebugHotkeys
// FRSH_DebugHotkeys.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.DBHKeys = true;

var Frashaw = Frashaw || {};
Frashaw.DBHKeys = Frashaw.DBHKeys || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows to set keys for Debug Commands in Test Mode.
*
* @param debugCmd1
* @text 1
* @type text
* @desc Put the Code Snippet you want to use when pressing "1".
*
* @param debugCmd2
* @text 2
* @type text
* @desc Put the Code Snippet you want to use when pressing "2".
*
* @param debugCmd3
* @text 3
* @type text
* @desc Put the Code Snippet you want to use when pressing "3".
*
* @param debugCmd4
* @text 4
* @type text
* @desc Put the Code Snippet you want to use when pressing "4".
*
* @param debugCmd5
* @text 5
* @type text
* @desc Put the Code Snippet you want to use when pressing "5".
*
* @param debugCmd6
* @text 6
* @type text
* @desc Put the Code Snippet you want to use when pressing "6".
*
* @param debugCmd7
* @text 7
* @type text
* @desc Put the Code Snippet you want to use when pressing "7".
*
* @param debugCmd8
* @text 8
* @type text
* @desc Put the Code Snippet you want to use when pressing "8".
*
* @param debugCmd9
* @text 9
* @type text
* @desc Put the Code Snippet you want to use when pressing "9".
*
* @param debugCmd0
* @text 0
* @type text
* @desc Put the Code Snippet you want to use when pressing "0".
*
* @param debugCmdMinus
* @text -
* @type text
* @desc Put the Code Snippet you want to use when pressing "-".
*
* @param debugCmdEquals
* @text =
* @type text
* @desc Put the Code Snippet you want to use when pressing "=".
*
* @param debugCmdBackspace
* @text Backspace
* @type text
* @desc Put the Code Snippet you want to use when pressing "Backspace".
*
* @param debugCmdCapsLock
* @text CapsLock
* @type text
* @desc Put the Code Snippet you want to use when pressing "CapsLock".
*
* @param debugCmdShift
* @text Shift
* @type text
* @desc Put the Code Snippet you want to use when pressing "Shift".
*
* @param debugCmdRgtBracket
* @text ]
* @type text
* @desc Put the Code Snippet you want to use when pressing "]".
*
* @param debugCmdLftBracket
* @text [
* @type text
* @desc Put the Code Snippet you want to use when pressing "[".
*
* @param debugCmdSemiColan
* @text ;
* @type text
* @desc Put the Code Snippet you want to use when pressing ";".
*
* @param debugCmdApost
* @text '
* @type text
* @desc Put the Code Snippet you want to use when pressing "'".
*
* @param debugCmdEnter
* @text Enter
* @type text
* @desc Put the Code Snippet you want to use when pressing "Enter".
*
* @param debugCmdComma
* @text ,
* @type text
* @desc Put the Code Snippet you want to use when pressing ",".
*
* @param debugCmdPeriod
* @text .
* @type text
* @desc Put the Code Snippet you want to use when pressing ".".
*
* @param debugCmdBckSlash
* @text /
* @type text
* @desc Put the Code Snippet you want to use when pressing "/".
*
* @param debugCmdq
* @text q
* @type text
* @desc Put the Code Snippet you want to use when pressing "q".
*
* @param debugCmdw
* @text w
* @type text
* @desc Put the Code Snippet you want to use when pressing "w".
*
* @param debugCmde
* @text e
* @type text
* @desc Put the Code Snippet you want to use when pressing "e".
*
* @param debugCmdr
* @text r
* @type text
* @desc Put the Code Snippet you want to use when pressing "r".
*
* @param debugCmdt
* @text t
* @type text
* @desc Put the Code Snippet you want to use when pressing "t".
*
* @param debugCmdy
* @text y
* @type text
* @desc Put the Code Snippet you want to use when pressing "y".
*
* @param debugCmdu
* @text u
* @type text
* @desc Put the Code Snippet you want to use when pressing "u".
*
* @param debugCmdi
* @text i
* @type text
* @desc Put the Code Snippet you want to use when pressing "i".
*
* @param debugCmdo
* @text o
* @type text
* @desc Put the Code Snippet you want to use when pressing "o".
*
* @param debugCmdp
* @text p
* @type text
* @desc Put the Code Snippet you want to use when pressing "p".
*
* @param debugCmda
* @text a
* @type text
* @desc Put the Code Snippet you want to use when pressing "a".
*
* @param debugCmds
* @text s
* @type text
* @desc Put the Code Snippet you want to use when pressing "s".
*
* @param debugCmdd
* @text d
* @type text
* @desc Put the Code Snippet you want to use when pressing "d".
*
* @param debugCmdf
* @text f
* @type text
* @desc Put the Code Snippet you want to use when pressing "f".
*
* @param debugCmdg
* @text g
* @type text
* @desc Put the Code Snippet you want to use when pressing "g".
*
* @param debugCmdh
* @text h
* @type text
* @desc Put the Code Snippet you want to use when pressing "h".
*
* @param debugCmdj
* @text j
* @type text
* @desc Put the Code Snippet you want to use when pressing "j".
*
* @param debugCmdk
* @text k
* @type text
* @desc Put the Code Snippet you want to use when pressing "k".
*
* @param debugCmdl
* @text l
* @type text
* @desc Put the Code Snippet you want to use when pressing "l".
*
* @param debugCmdz
* @text z
* @type text
* @desc Put the Code Snippet you want to use when pressing "z".
*
* @param debugCmdx
* @text x
* @type text
* @desc Put the Code Snippet you want to use when pressing "x".
*
* @param debugCmdc
* @text c
* @type text
* @desc Put the Code Snippet you want to use when pressing "c".
*
* @param debugCmdv
* @text v
* @type text
* @desc Put the Code Snippet you want to use when pressing "v".
*
* @param debugCmdb
* @text b
* @type text
* @desc Put the Code Snippet you want to use when pressing "b".
*
* @param debugCmdn
* @text n
* @type text
* @desc Put the Code Snippet you want to use when pressing "n".
*
* @param debugCmdm
* @text m
* @type text
* @desc Put the Code Snippet you want to use when pressing "m".
*
* @help
* ===Introduction=============================================================
* While testing my RPG Maker games, the set of Debug commands were a bit...
* lacking to me. Sure, I could use the debug console, but constantly using
* it got tiring after a while, especially when it was the exact same command
* each time, so I made this to allow me to summon code snippets at the press
* of the button while in Test Mode.
* ===How to Use===============================================================
* Put the respective commands on the respective key on they'll run the code
* that is associated with it in Test Mode. Leaving one blank will render it
* disabled. Note: Trying to use the capitalizaed letters (QWERTY) will not
* work as it is case sensitive.
* ===Change Log===============================================================
* Version 1.0 (04/07/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
(function() {
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_DebugHotkeys');
Frashaw.Param = Frashaw.Param || {};
var letterArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "=", "Backspace", "CapsLock", "Shift", "[", "]", ";", "'", "Enter", ",", ".", "/", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "l", "z", "x", "c", "v", "b", "n", "m"];
var cmdArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "Minus", "Equals", "Backspace", "CapsLock", "Shift", "LftBracket", "RgtBracket", "SemiColan", "Apost", "Enter", "Comma", "Period", "BckSlash", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "l", "z", "x", "c", "v", "b", "n", "m"];
var commandArray = [];
for (var loop = 0; loop != letterArray.length; loop++){
	if (eval("Parameters.debugCmd" + (cmdArray[loop]) + " != ''")) commandArray.push([letterArray[loop], eval("Parameters.debugCmd" + cmdArray[loop])]);
}

document.addEventListener('keyup', (e) => {
	if ($gameTemp.isPlaytest() == 1){
		for (var loop = 0; loop != commandArray.length; loop++){
			if (e.key == commandArray[loop][0]) eval(commandArray[loop][1]);
		}
	}
});
})();
//=============================================================================
// End of File
//=============================================================================