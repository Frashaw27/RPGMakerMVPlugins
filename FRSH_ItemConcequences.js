//=============================================================================
// FRSH_ItemConcequences
// FRSH_ItemConcequences.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.IConcequence = true;

var Frashaw = Frashaw || {};
Frashaw.IConcequence = Frashaw.IConcequence || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows Items to have Concequences after so many uses.
*
* @param ---Consequence #1-----
* @default
*
* @param cn1
* @text Name
* @parent ---Consequence #1-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab1
* @text Abbriviation
* @parent ---Consequence #1-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes1
* @text Message
* @parent ---Consequence #1-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m1
* @text Max
* @parent ---Consequence #1-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec1
* @text Decrease
* @parent ---Consequence #1-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval1
* @text Evaluation
* @parent ---Consequence #1-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla1
* @text Color 1
* @parent ---Consequence #1-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb1
* @text Color 2
* @parent ---Consequence #1-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA1
* @text Companion Bar
* @parent ---Consequence #1-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB1
* @text Other Companion Bar
* @parent ---Consequence #1-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace1
* @text Main Bar Placement
* @parent ---Consequence #1-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace1
* @text Sub Bar Placement
* @parent ---Consequence #1-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace1
* @text Sub Bar Placement
* @parent ---Consequence #1-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #2-----
* @default
*
* @param cn2
* @text Name
* @parent ---Consequence #2-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab2
* @text Abbriviation
* @parent ---Consequence #2-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes2
* @text Message
* @parent ---Consequence #2-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m2
* @text Max
* @parent ---Consequence #2-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec2
* @text Decrease
* @parent ---Consequence #2-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval2
* @text Evaluation
* @parent ---Consequence #2-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla2
* @text Color 1
* @parent ---Consequence #2-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb2
* @text Color 2
* @parent ---Consequence #2-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA2
* @text Companion Bar
* @parent ---Consequence #2-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB2
* @text Other Companion Bar
* @parent ---Consequence #2-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace2
* @text Main Bar Placement
* @parent ---Consequence #2-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace2
* @text Sub Bar Placement
* @parent ---Consequence #2-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace2
* @text Sub Bar Placement
* @parent ---Consequence #2-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #3-----
* @default
*
* @param cn3
* @text Name
* @parent ---Consequence #3-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab3
* @text Abbriviation
* @parent ---Consequence #3-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes3
* @text Message
* @parent ---Consequence #3-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m3
* @text Max
* @parent ---Consequence #3-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec3
* @text Decrease
* @parent ---Consequence #3-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval3
* @text Evaluation
* @parent ---Consequence #3-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla3
* @text Color 1
* @parent ---Consequence #3-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb3
* @text Color 2
* @parent ---Consequence #3-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA3
* @text Companion Bar
* @parent ---Consequence #3-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB3
* @text Other Companion Bar
* @parent ---Consequence #3-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace3
* @text Main Bar Placement
* @parent ---Consequence #3-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace3
* @text Sub Bar Placement
* @parent ---Consequence #3-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace3
* @text Sub Bar Placement
* @parent ---Consequence #3-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #4-----
* @default
*
* @param cn4
* @text Name
* @parent ---Consequence #4-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab4
* @text Abbriviation
* @parent ---Consequence #4-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes4
* @text Message
* @parent ---Consequence #4-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m4
* @text Max
* @parent ---Consequence #4-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec4
* @text Decrease
* @parent ---Consequence #4-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval4
* @text Evaluation
* @parent ---Consequence #4-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla4
* @text Color 1
* @parent ---Consequence #4-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb4
* @text Color 2
* @parent ---Consequence #4-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA4
* @text Companion Bar
* @parent ---Consequence #4-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB4
* @text Other Companion Bar
* @parent ---Consequence #4-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace4
* @text Main Bar Placement
* @parent ---Consequence #4-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace4
* @text Sub Bar Placement
* @parent ---Consequence #4-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace4
* @text Sub Bar Placement
* @parent ---Consequence #4-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #5-----
* @default
*
* @param cn5
* @text Name
* @parent ---Consequence #5-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab5
* @text Abbriviation
* @parent ---Consequence #5-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes5
* @text Message
* @parent ---Consequence #5-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m5
* @text Max
* @parent ---Consequence #5-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec5
* @text Decrease
* @parent ---Consequence #5-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval5
* @text Evaluation
* @parent ---Consequence #5-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla5
* @text Color 1
* @parent ---Consequence #5-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb5
* @text Color 2
* @parent ---Consequence #5-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA5
* @text Companion Bar
* @parent ---Consequence #5-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB5
* @text Other Companion Bar
* @parent ---Consequence #5-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace5
* @text Main Bar Placement
* @parent ---Consequence #5-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace5
* @text Sub Bar Placement
* @parent ---Consequence #5-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace5
* @text Sub Bar Placement
* @parent ---Consequence #5-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #6-----
* @default
*
* @param cn6
* @text Name
* @parent ---Consequence #6-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab6
* @text Abbriviation
* @parent ---Consequence #6-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes6
* @text Message
* @parent ---Consequence #6-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m6
* @text Max
* @parent ---Consequence #6-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec6
* @text Decrease
* @parent ---Consequence #6-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval6
* @text Evaluation
* @parent ---Consequence #6-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla6
* @text Color 1
* @parent ---Consequence #6-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb6
* @text Color 2
* @parent ---Consequence #6-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA6
* @text Companion Bar
* @parent ---Consequence #6-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB6
* @text Other Companion Bar
* @parent ---Consequence #6-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
* @param mainplace6
* @text Main Bar Placement
* @parent ---Consequence #6-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace6
* @text Sub Bar Placement
* @parent ---Consequence #6-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace6
* @text Sub Bar Placement
* @parent ---Consequence #6-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #7-----
* @default
*
* @param cn7
* @text Name
* @parent ---Consequence #7-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab7
* @text Abbriviation
* @parent ---Consequence #7-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes7
* @text Message
* @parent ---Consequence #7-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m7
* @text Max
* @parent ---Consequence #7-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec7
* @text Decrease
* @parent ---Consequence #7-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval7
* @text Evaluation
* @parent ---Consequence #7-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla7
* @text Color 1
* @parent ---Consequence #7-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb7
* @text Color 2
* @parent ---Consequence #7-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA7
* @text Companion Bar
* @parent ---Consequence #7-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB7
* @text Other Companion Bar
* @parent ---Consequence #7-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace7
* @text Main Bar Placement
* @parent ---Consequence #7-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace7
* @text Sub Bar Placement
* @parent ---Consequence #7-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace7
* @text Sub Bar Placement
* @parent ---Consequence #7-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #8-----
* @default
*
* @param cn8
* @text Name
* @parent ---Consequence #8-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab8
* @text Abbriviation
* @parent ---Consequence #8-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes8
* @text Message
* @parent ---Consequence #8-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m8
* @text Max
* @parent ---Consequence #8-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec8
* @text Decrease
* @parent ---Consequence #8-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval8
* @text Evaluation
* @parent ---Consequence #8-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla8
* @text Color 1
* @parent ---Consequence #8-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb8
* @text Color 2
* @parent ---Consequence #8-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA8
* @text Companion Bar
* @parent ---Consequence #8-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB8
* @text Other Companion Bar
* @parent ---Consequence #8-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace8
* @text Main Bar Placement
* @parent ---Consequence #8-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace8
* @text Sub Bar Placement
* @parent ---Consequence #8-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace8
* @text Sub Bar Placement
* @parent ---Consequence #8-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #9-----
* @default
*
* @param cn9
* @text Name
* @parent ---Consequence #9-----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab9
* @text Abbriviation
* @parent ---Consequence #9-----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes9
* @text Message
* @parent ---Consequence #9-----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m9
* @text Max
* @parent ---Consequence #9-----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec9
* @text Decrease
* @parent ---Consequence #9-----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval9
* @text Evaluation
* @parent ---Consequence #9-----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default
*
* @param cla9
* @text Color 1
* @parent ---Consequence #9-----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb9
* @text Color 2
* @parent ---Consequence #9-----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA9
* @text Companion Bar
* @parent ---Consequence #9-----
* @type select
* @option Hp
* @value 1
* @option Mp
* @value 2
* @option Tp
* @value 3
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB9
* @text Other Companion Bar
* @parent ---Consequence #9-----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace9
* @text Main Bar Placement
* @parent ---Consequence #9-----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace9
* @text Sub Bar Placement
* @parent ---Consequence #9-----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace9
* @text Sub Bar Placement
* @parent ---Consequence #9-----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param ---Consequence #10----
* @default
*
* @param cn10
* @text Name
* @parent ---Consequence #10----
* @type text
* @desc Put the name of the tag you want to have to track the concequence (No Spaces). Ex: 'peanutButter'
* @default
*
* @param ab10
* @text Abbriviation
* @parent ---Consequence #10----
* @type text
* @desc Put the abbrivation of your concequence. Preferably 2 letters. Ex: "Pb"
* @default
*
* @param mes10
* @text Message
* @parent ---Consequence #10----
* @type text
* @desc Put the message you want to display when the effect happens. Ex: target.name() + " got poisoned!"
* @default
*
* @param m10
* @text Max
* @parent ---Consequence #10----
* @type number
* @desc Put the max/limit that the number has to reach to trigger the concequence.
* @default
* @min 1
*
* @param dec10
* @text Decrease
* @parent ---Consequence #10----
* @type number
* @desc Put the number the concequence meters decrease each turn.
* @default
* @min 0
*
* @param eval10
* @text Evaluation
* @parent ---Consequence #10----
* @type text
* @desc Put code that happens when the concequence happens target being the victim. Ex: target.gainHp(-100); 
* @default 
*
* @param cla10
* @text Color 1
* @parent ---Consequence #10----
* @type number
* @desc Put the first color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param clb10
* @text Color 2
* @parent ---Consequence #10----
* @type number
* @desc Put the second color (in your palette of colors in Window) that you'd like the bar to be
* @default 0
* @min 0
*
* @param compA10
* @text Companion Bar
* @parent ---Consequence #10----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other visible bar to be. Leave blank to not use. (usually the one that's also going up).
* @default
*
* @param compB10
* @text Other Companion Bar
* @parent ---Consequence #10----
* @type select
* @option Hp
* @option Mp
* @option Tp
* @desc Put what you want the other other visible bar to be. Leave blank to not use.
* @default
*
* @param mainplace10
* @text Main Bar Placement
* @parent ---Consequence #10----
* @type number
* @desc Put if you want the main bar in the 1st, 2nd, or 3rd Slot.
* @default 1
* @min 1
* @max 3
*
* @param subplace10
* @text Sub Bar Placement
* @parent ---Consequence #10----
* @type number
* @desc Put if you want the other bar in the 1st, 2nd, or 3rd Slot.
* @default 2
* @min 1
* @max 3
*
* @param subsubplace10
* @text Sub Bar Placement
* @parent ---Consequence #10----
* @type number
* @desc Put if you want the other other bar in the 1st, 2nd, or 3rd Slot.
* @default 3
* @min 1
* @max 3
*
* @param switched
* @text Control Switches
* @type text
* @desc Put in the Switch Id(s) that will turn concequences on or not. Put 0 for always on. Seperate multiple by commas.
* @default 0
*
* @help
* ==texttags==================================================================
* Consequence Adding: <(whatever name you put for the consequence): >
* ===Introduction=============================================================
* In Five Nights at F%^&boys: Complete Collection, Zain (the creator) did
* something unique to help add difficulty for harder modes without just
* adding more stats and the like to enemies. What he did was that items
* would give a certain value to a meter that would give a consequence if
* it ever got to high. While I liked this mechanic and wanted to replicate
* it for my games, the implamentation could be made a lot more modular
* and simpler to use past the inital setting of the plugin parameters.
* So I made this plugin for that express purpose.
* ===How to Use===============================================================
* After setting up all the values nessary, just add the requisite tags to
* the desired items, and you'll be good to go. Note that the names can't
* be spaced out (like this "peanut butter") as the game will crash from it.
* This plugin also only works for adding values onto an actor that's the 
* target and not any enemies, so that's a short coming that might be
* fixed later.
* ===Change Log===============================================================
* Version 1.0 (02/19/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================
//Sets up the information got from the plugin parameters
Parameters = PluginManager.parameters('FRSH_ItemConcequences');
Frashaw.Param = Frashaw.Param || {};
//Loops through all 10 parameter sets without having to manually input them all
var loop = 0;
while (loop != 10){
//Gets the name of the consequence
var textA = 'Frashaw.Param.Concequence' + (loop + 1) + ' = Parameters.cn' + (loop + 1) + ';';
//Get the value max of the consequence
var textB = 'Frashaw.Param.Max' + (loop + 1) + ' = Parameters.m' + (loop + 1) + ';';
//Gets the results if the consequence value reaches the max 
var textC = 'Frashaw.Param.Eval' + (loop + 1) + ' = Parameters.eval' + (loop + 1) + ';';
//Gets the first color for the consequence bar
var textD = 'Frashaw.Param.ColorA' + (loop + 1) + ' = Parameters.cla' + (loop + 1) + ';';
//Gets the second color for the consequence bar
var textE = 'Frashaw.Param.ColorB' + (loop + 1) + ' = Parameters.clb' + (loop + 1) + ';';
//Gets the first companion bar
var textF = 'Frashaw.Param.CompanionA' + (loop + 1) + ' = Parameters.compA' + (loop + 1) + ';';
//Gets the place for the consequence bar
var textG = 'Frashaw.Param.Place' + (loop + 1) + ' = Parameters.mainplace' + (loop + 1) + ';';
//Gets the value that the consequence bar decrease each turn
var textH = 'Frashaw.Param.Decrease' + (loop + 1) + ' = Parameters.dec' + (loop + 1) + ';';
//Gets the message when the consequence reach over the max
var textJ = 'Frashaw.Param.Message' + (loop + 1) + ' = Parameters.mes' + (loop + 1) + ';';
//Gets the other companion bar
var textI = 'Frashaw.Param.CompanionB' + (loop + 1) + ' = Parameters.compB' + (loop + 1) + ';';
//Gets the place of the first companion bar
var textK = 'Frashaw.Param.SubPlace' + (loop + 1) + ' = Parameters.subplace' + (loop + 1) + ';';
//Gets the place of the second companion bar
var textL = 'Frashaw.Param.SubSubPlace' + (loop + 1) + ' = Parameters.subsubplace' + (loop + 1) + ';';
//Gets the abbrivation that goes above the consequence bar
var textM = 'Frashaw.Param.Abbriviation' + (loop + 1) + ' = Parameters.ab' + (loop + 1) + ';';
//Runs all the above Gets
eval(textA);
eval(textB);
eval(textC);
eval(textD);
eval(textE);
eval(textF);
eval(textG);
eval(textH);
eval(textJ);
eval(textI);
eval(textK);
eval(textL);
eval(textM);
loop++;
}
//Processes the switches into an array to be checked
Frashaw.Param.SwitchArray = arrayizer(Parameters.switched);

//A function that checks if the value in the array is both a value and positive,
//and removes them if they're not
function isPositive(yes){
	return yes >= 0;
}

//Turns all the array elements into intergers
function eacher(item, index, arr){
	arr[index] = parseInt(item);
}

//A function meant to seperate the values gotten from the plugin parameters
//into arrays along with removing any not used valeus
function arrayizer(yes){
	array = yes.split(",");
	array.forEach(eacher);
	array = array.filter(isPositive);
	return array;
}

//variable to check if on the item use screen or not
var currentWindow = 1;
var loop = 0;
//Makes an array for all the values that will be used
var concLoopArray = [];

while (loop != 10){
var text = "Frashaw.Param.Concequence" + (loop + 1) + " != ''"
var bool = eval(text);
if (bool){
	//Roughly does the same thing as the parameter gets above
	text = "var concequence" + (loop + 1) + " = Frashaw.Param.Concequence" + (loop + 1) + ";";
	eval(text);
	text = "var max" + (loop + 1) + " = Frashaw.Param.Max" + (loop + 1) + ";";
	eval(text);
	text = "var evaluation" + (loop + 1) + " = Frashaw.Param.Eval" + (loop + 1) + ";";
	eval(text);
	text = "var colorA" + (loop + 1) + " = Frashaw.Param.ColorA" + (loop + 1) + ";";
	eval(text);
	text = "var colorB" + (loop + 1) + " = Frashaw.Param.ColorB" + (loop + 1) + ";";
	eval(text);
	text = "var compA" + (loop + 1) + " = Frashaw.Param.CompanionA" + (loop + 1) + ";";
	eval(text);
	text = "var place" + (loop + 1) + " = Frashaw.Param.Place" + (loop + 1) + ";";
	eval(text);
	text = "var dec" + (loop + 1) + " = Frashaw.Param.Decrease" + (loop + 1) + ";";
	eval(text);
	text = "var message" + (loop + 1) + " = Frashaw.Param.Message" + (loop + 1) + ";";
	eval(text);
	text = "var compB" + (loop + 1) + " = Frashaw.Param.CompanionB" + (loop + 1) + ";";
	eval(text);
	text = "var subplace" + (loop + 1) + " = Frashaw.Param.SubPlace" + (loop + 1) + ";";
	eval(text);
	text = "var subsubplace" + (loop + 1) + " = Frashaw.Param.SubSubPlace" + (loop + 1) + ";";
	eval(text);
	text = "var ab" + (loop + 1) + " = Frashaw.Param.Abbriviation" + (loop + 1) + ";";
	eval(text);
	//Adds a number to array of ids that will be used
	concLoopArray.push((loop + 1));
} else {
	//Makes the value null so that it doesn't be used for future reference
	text = "var concequence" + (loop + 1) + " = null";
	eval(text);
}
loop++;
}

//Gets the length of the array for future looping
var concLoopLength = concLoopArray.length;

//a fuction used to determine if all the need switches are on or not
function switchAllowel(){
	var array = (Frashaw.Param.SwitchArray);
	//Will immediatly return true if any of the values are 0
	if (array.includes(0)){
		return true;
	}
	var length = array.length;
	var loop = 0;
	//used to count the number of switches that are on
	var pass = 0;
	while (loop != length){
		//Checks to see if the specified switch is on
		if ($gameSwitches.value(array[loop])){
			//If it is, adds to the pass count
			pass++;
		}
		loop++;
	}
	//Checks to see if all the switches are on or not
	if (pass == length){
		return true;
	} else {
		return false;
	}
}

//Sets up 10 arrays for later use
var placeArray1 = [];
var placeArray2 = [];
var placeArray3 = [];
var placeArray4 = [];
var placeArray5 = [];
var placeArray6 = [];
var placeArray7 = [];
var placeArray8 = [];
var placeArray9 = [];
var placeArray10 = [];

//Makes arrays from above set to the values of the bar placements from the parameters
function arrayMaker(bar1, bar2, bar3, place1, place2, place3, pool){
	var loop = 0;
	while(loop != 3){
		var text = "bar" + (loop + 1) + " != ''";
		var bool = eval(text);
		if (bool){
			text = "placeArray" + pool + ".push([bar" + (loop + 1) + ", place" + (loop + 1) + "])"
			eval(text);
		}
		loop++;
	}
}

//Sorts the 2nd columnn (the one with the positions) into numerical order
function arraySort(a, b){
	if (Number(a[1]) == Number(b[1])){
		return 0;
	} else {
		return (a[1] < b[1]) ? -1 : 1;
	}
}

//Filters out 1, 2, and 3 from the squashed array for easier use later
function arrayFilter(yes){
	return yes != "1" && yes != "2" && yes != "3";
}

var loop = 0;
while (loop != concLoopLength){
	//Sets up the array
	var text = "arrayMaker(concequence" + (loop + 1) + ", compA" + (loop + 1) + ", compB"  + (loop + 1) + ", place" + (loop + 1) + ", subplace" + (loop + 1) + ", subsubplace" + (loop + 1) + ", " + (loop + 1) + ")";
	eval(text);
	//Sorts the array
	text = "placeArray" + (loop + 1) + ".sort(arraySort)"
	eval(text);
	//Flatens the array into just one dimention
	text = "placeArray" + (loop + 1) + " = placeArray" + (loop + 1) + ".flat();"
	eval(text);
	//Removes numbers from the array
	text = "placeArray" + (loop + 1) + " = placeArray" + (loop + 1) + ".filter(arrayFilter);"
	eval(text);
	//Adds in additional blanks if the array isn't at 3
	text = "if (placeArray" + (loop + 1) + ".length != 3) placeArray" + (loop + 1) + ".push('');"
	eval(text);
	text = "if (placeArray" + (loop + 1) + ".length != 3) placeArray" + (loop + 1) + ".push('');"
	eval(text);
	text = "if (placeArray" + (loop + 1) + ".length != 3) placeArray" + (loop + 1) + ".push('');"
	eval(text);
	//Adding three blank check adds wasn't really needed, but better safe then sorry 
	loop++;
}

	
_frsh_yes = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	//Sets up the values for the actor's consequences
	_frsh_yes.call(this,actorId);
	var loop = 0;
	while (loop != 10){
		//Checks the consequences to see if it's actually set or not
		var text = 'if (concequence' + (loop + 1) + ' != null){ var peas = concequence' + (loop + 1) + "} else {peas = null} ;";
		eval(text);
		if (peas != null){
			//Does the actual setting
			var tex = 'this._' 
			tex += peas;
			tex += ' = 0;';
			eval(tex);
		}
		loop++;
	}
};

//Sets up variable for later use
var itemId = 0;
	
_frsh_use = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	_frsh_use.call(this,item);
	//if the last used thing was an item, sets the previously set variable to the id. else puts it at 0;
	if (DataManager.isItem(item)){
		itemId = item.id;
	} else {
		itemId = 0;
	}
}

function clear(){
	//hear because it didn't want to not crash when left by itself
	SceneManager._scene._logWindow.clear();
}

Window_BattleLog.prototype.waitt = function() {
	//adds a purposeful delay in the battlelog when called to sync up with the clear
	this._waitCount = 60;
};

//The part where all variable adding happens
_frsh_endAction = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
	_frsh_endAction.call(this);
	//Checks to see if switches are on
	var bool = switchAllowel();
	//Calls the target data to see if the last target was an actor
	var text = "BattleManager._action.isForFriend()";
	var actor = eval(text);
	//Checks to see if switches are on, target is ally, and if the last action was an item or not
	if (bool && actor && itemId != 0){
		//Gets target id how specified use
		var aId = BattleManager._action.subject()._lastTargetIndex;
		//Sets up target proper
		var target = $gameParty.members()[aId];
		var id = itemId;
		var loop = 0;
		while(loop != concLoopLength){
			//Gets the name of the consequence
			var text = "var peas = concequence" + concLoopArray[loop] + ";";
			eval(text);
			//Checks if the consequence is a tag on the item to use
			var bool = eval("$dataItems[id].meta." + peas + " != null");
			if (bool){
				//adds the requisite points on use
				var text = "target._" + peas + "+= Number($dataItems[id].meta." + peas + ");";
				eval(text);
				//Sets up limit variable for later comparison
				var text = "var limit = target._" + peas + ";";
				eval(text);
				//Gets max variable for comparison
				var text = "var max = max" + concLoopArray[loop] + ";";
				eval(text);
				//Checks if the amount the actor has is over the max amount
				if (limit > max){
					//checks to see if a message needs to be played
					var text = ("message" + concLoopArray[loop] + " != ''");
					var bool = eval(text);
					if (bool){
						//adds message if requested
						var text = "var tex = message" + concLoopArray[loop] + ";";
						eval(text);
						var text = "SceneManager._scene._logWindow.addText(" + tex + ");" 
						eval(text);
						//Adds the eval for the effect
						var text = "evaluation" + concLoopArray[loop];
						var peanut = "eval(" + text + ")";
						eval(peanut);
						//Adds the wait in the battle log
						SceneManager._scene._logWindow.waitt();
						//Adds the synced up clear command. Doesn't have () as otherwise it would start the function immediatly
						setTimeout(clear,1000);
					} else {
						//Sets up the eval for use
						var text = "evaluation" + concLoopArray[loop];
						var peanut = "eval(" + text + ")";
						eval(peanut);
					}
				}
			}
			loop++;
		}
	}
};

//Decrease the actors shit at the end of every turn
_frsh_turnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
	_frsh_turnEnd.call(this);
	var actor = this;
	var loop = 0;
	//Checks to see if all the switches are on
	var bool = switchAllowel();
	while(loop != concLoopLength && bool){
		//Gets the name of the consequence to decrease
		var text = "var peas = concequence" + concLoopArray[loop] + ";";
		eval(text);
		//Adds check to see if the consequence if above 0
		var bool = eval("actor._" + peas + " > 0");
		if (bool){
			//Reduces consequence by the desired amount
			var text = "actor._" + peas + "-= Number(dec" + concLoopArray[loop] +  ");";
			eval(text);
			//Checks to see if consequence if below 0, setting it to 0 if it is
			var text = "if (actor._" + peas + " < 0) actor._" + peas + " = 0;";
			eval(text);
		}
		loop++;
	}
};

//Resets values to 0 at end of battle
_frsh_battleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    _frsh_battleEnd.call(this);
	var actor = this;
	var loop = 0;
	var bool = switchAllowel();
	while(loop != concLoopLength && bool){
        //Gets name of consequence
		var text = "var peas = concequence" + concLoopArray[loop] + ";";
		eval(text);
		//Sets consequence value to 0
		var bool = eval("actor._" + peas + " = 0");
		eval(bool);
		loop++;
	}
	//Sets the current window to be normal, because it seemed to help with a crash
	currentWindow = 1;
};

//Divider between window stuff and function stuff
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Sets the window to the item use one upon atempt to use an item 
_frsh_okay = Scene_Battle.prototype.onItemOk;
Scene_Battle.prototype.onItemOk = function() {
	currentWindow = 2;
	BattleManager.refreshStatus()
    _frsh_okay.call(this);
};

//Resets window after backing out of using an item
_frsh_cancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
	currentWindow = 1;
	BattleManager.refreshStatus()
    _frsh_cancel.call(this);
};

//Resets window after the battle log starts being used, i.e. when stuff starts happening
_frsh_battlelog_show = Window_BattleLog.prototype.startTurn;
Window_BattleLog.prototype.startTurn = function() {
	currentWindow = 1;
	BattleManager.refreshStatus()
	_frsh_battlelog_show.call(this);
 };
 
 //Resets window upon making the command list for actor
 _frsh_Window_ActorCommand_show = Window_ActorCommand.prototype.makeCommandList;
	Window_ActorCommand.prototype.makeCommandList = function() {
        _frsh_Window_ActorCommand_show.call(this);
        currentWindow = 1;
    };

//The thing that draws all the gauges
Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = parseInt(totalArea * 108 / 300);
    var otW = parseInt(totalArea * 96 / 300);
	//An array to call the various x values for each bar
	var xs = ["rect.x + 0", "rect.x + hpW", "rect.x + hpW + otW + 20"]
	//Checks to see if the required switches are on
	var switchBool = switchAllowel();
    if (switchBool) {
		//Checks to see if the window is the item use window
        if (currentWindow == 2) {
			//Failsafe
            if (SceneManager._scene._itemWindow.item() !== null) {
				//Sets id for later use
				var id = SceneManager._scene._itemWindow.item().id;
				var loop = 0;
				//Sets up fallback if the item has no special values
				var fallback = 0;
				while (loop != concLoopLength && fallback != 1){
					//Gets name of consequence to show
					var text = "var pez = concequence" + concLoopArray[loop] + ";";
					eval(text);
					//Checks to see if the curret item has consequence value
					text = "$dataItems[id].meta." + pez + " != null";
					var bool = eval(text);
					//Runs if item does have such a value
					if (bool) {
						//A seperate value for a second loop 
						var pool = 0;
						//Stops after getting 3 bars
						while (pool != 3){
						//Checks to see if the current position needs a hp gauge
						text = "placeArray" + concLoopArray[loop] + "[" + pool + "] != '' && placeArray" + concLoopArray[loop] + "[" + pool + "] == 'Hp'";
						var boolA = eval(text);
						//Ditto for a Mp gauge
						text = "placeArray" + concLoopArray[loop] + "[" + pool + "] != '' && placeArray" + concLoopArray[loop] + "[" + pool + "] == 'Mp'";
						var boolB = eval(text);
						//Ditto for a Tp gauge
						text = "placeArray" + concLoopArray[loop] + "[" + pool + "] != '' && placeArray" + concLoopArray[loop] + "[" + pool + "] == 'Tp'";
						var boolC = eval(text);
						//Ditto for a special/consequencegauge, only runs if the value is not any of the other three
						text = "placeArray" + concLoopArray[loop] + "[" + pool + "] != '' && (placeArray" + concLoopArray[loop] + "[" + pool + "] != 'Hp' && placeArray" + concLoopArray[loop] + "[" + pool + "] != 'Mp' && placeArray" + concLoopArray[loop] + "[" + pool + "] != 'Tp')";
						var boolD = eval(text);
						//Runs if Hp Gauge is Needed
						if (boolA){
							text = "this.drawActorHp(actor," + xs[pool] + ", rect.y, hpW);"
							eval(text);
						}
						//Runs if Mp Gauge is Needed
						if (boolB){
							text = "this.drawActorMp(actor," + xs[pool] + ", rect.y, hpW);"
							eval(text);
						}
						//Runs if Tp Gauge is Needed
						if (boolC){
							text = "this.drawActorTp(actor," + xs[pool] + ", rect.y, hpW);"
							eval(text);
						}
						//Runs if Consequence Gauge is Needed
						if (boolD){
							var text = "this.drawConcequence(actor, " + xs[pool] + ", rect.y, otW, colorA" + concLoopArray[loop] + ", colorB" + concLoopArray[loop] + ", ab" + concLoopArray[loop] + ", max" + concLoopArray[loop] + ", concequence" + concLoopArray[loop] + ");";
							eval(text);	
						}
						pool++;
						}
						//Sets fallback to not run
						fallback = 1;
					}
					loop++;
				}
				if (fallback == 0){
					//Fallback if no special values
					this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
					this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
					this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
				}
            };
        } else {
			//Fallback window is not item use
            this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
            this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
            this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
        }
	} else {
		//Fallback window if switch(es) are not on
        this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
        this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
        this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
    } 
};

    Window_Base.prototype.drawConcequence = function(actor, x, y, width, color1, color2, name, max, cname) {
        width = width || 186;
		//Sets the first color of the gauge
        var colorA = this.textColor(color1);
		//Sets second color of the gauge
        var colorB = this.textColor(color2);
		//gets the value that needs to represented
        var text = "var concequence = actor._" + cname;
		eval(text);
		//gets the gauge determined by the current value by the max
        var rate = concequence/ max;
		//Draws gauge
        this.drawGauge(x, y, width, rate, colorA, colorB);
        this.changeTextColor(this.systemColor());
		//Draws the abbrivation
        this.drawText(name, x, y, 44);
		//Draws the current value for the consequence
        this.drawCurrentAndMax(concequence, max, x, y, width, this.mpColor(actor), this.normalColor());
    };
	
//=============================================================================
// End of File
//=============================================================================