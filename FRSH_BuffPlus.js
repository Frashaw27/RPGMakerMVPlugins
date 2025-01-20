//=============================================================================
// FRSH_BuffPlus
// FRSH_BuffPlus.js
// Version: 1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.BPlus = true;

var Frashaw = Frashaw || {};
Frashaw.BPlus = Frashaw.BPlus || {};

/*:
* @plugindesc Expands the customizbility and related features of Buffs and Debuffs.
* @author Frashaw27
*
* @param maxHpMpScale
* @text Max Hp/Mp Buffs Scale?
* @type boolean
* @desc Click True or False if you want Max Hp and Mp buffs to naturally match their pre-apply % of Hp and Mp.
* @default true
*
* @param doubleBuffInf
* @text Double Buffs Infinitely?
* @type boolean
* @desc Click True or False if you want Double Buff/Debuff to apply that extra one for each application or once per action.
* @default false
*
* @param
* @default
*
* @param buffSound
* @text Buff Apply Sound
* @default
*
* @param buffSoundName
* @parent buffSound
* @text Buff SE
* @dir audio/se/
* @type file
* @desc Choose sound effect you want to use when applying buffs. Leave blank to not use.
*
* @param buffSoundVolume
* @parent buffSound
* @text Buff SE Volume
* @type number
* @max 100
* @min 0
* @default 90
* @desc Choose the volume you want to use when applying buffs.
*
* @param buffSoundPitch
* @parent buffSound
* @text Buff SE Pitch
* @type number
* @max 150
* @min 50
* @default 100
* @desc Choose the Pitch you want to use when applying buffs.
*
* @param
* @default
*
* @param debuffSound
* @text Debuff Apply Sound
* @default
*
* @param debuffSoundName
* @parent debuffSound
* @text Debuff SE
* @dir audio/se/
* @type file
* @desc Choose sound effect you want to use when applying debuffs. Leave blank to not use.
*
* @param debuffSoundVolume
* @parent debuffSound
* @text Debuff SE Volume
* @type number
* @max 100
* @min 0
* @default 90
* @desc Choose the volume you want to use when applying debuffs.
*
* @param debuffSoundPitch
* @parent debuffSound
* @text Debuff SE Pitch
* @type number
* @max 150
* @min 50
* @default 100
* @desc Choose the Pitch you want to use when applying debuffs.
*
* @param
* @default
*
* @param buffFormulaType
* @text Buff Type
* @type select
* @option General All-In-One Formula
* @option General Stat-Based Formula
* @option Actor/Enemy All-In-One Formula
* @option Actor/Enemy Stat-Based Formula
* @option General All-In-One Increments
* @option General Stat-Based Increments
* @option Actor/Enemy All-In-One Increments
* @option Actor/Enemy Stat-Based Increments
* @default General All-In-One Formula
* @desc Choose the type that appeals most to you and then fill out the various sectors under the option you choose.
*
* @param debuffSplit
* @text Debuff Formulas?
* @type boolean
* @desc Click True if you want to add a seperate formulas for Debuffs; False to use the buff formula for both.
* @default false
*
* @param
* @default
*
* @param generalFormula
* @text General All-In-One Formula
* @default
*
* @param genBuffFormula
* @parent generalFormula
* @text General Buff Formula
* @type text
* @desc Enter in the Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genDebuffFormula
* @parent generalFormula
* @text General Debuff Formula
* @type text
* @desc Enter in the Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25.
* @default 1 + buffs * 0.25
*
* @param
* @default
*
* @param generalStatFormula
* @text General Stat-Based Formula
* @default
*
* @param genMhpFormula
* @parent generalStatFormula
* @text General Max Hp Formula
* @type text
* @desc Enter in the Max Hp Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMhpDebuffFormula
* @parent generalStatFormula
* @text General Max Hp Debuff
* @type text
* @desc Enter in the Max Hp Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMmpFormula
* @parent generalStatFormula
* @text General Max Mp Formula
* @type text
* @desc Enter in the Max Mp Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMmpDebuffFormula
* @parent generalStatFormula
* @text General Max Mp Debuff
* @type text
* @desc Enter in the Max Mp Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genAtkFormula
* @parent generalStatFormula
* @text General Attack Formula
* @type text
* @desc Enter in the Attack Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genAtkDebuffFormula
* @parent generalStatFormula
* @text General Attack Debuff
* @type text
* @desc Enter in the Attack Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genDefFormula
* @parent generalStatFormula
* @text General Defense Formula
* @type text
* @desc Enter in the Def Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genDefDebuffFormula
* @parent generalStatFormula
* @text General Defense Debuff
* @type text
* @desc Enter in the Defense Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMatFormula
* @parent generalStatFormula
* @text General M. Attack Formula
* @type text
* @desc Enter in the M. Attack Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMatDebuffFormula
* @parent generalStatFormula
* @text General M. Attack Debuff
* @type text
* @desc Enter in the M. Attack Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMdfFormula
* @parent generalStatFormula
* @text General M. Def Formula
* @type text
* @desc Enter in the M. Defense Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genMdfDebuffFormula
* @parent generalStatFormula
* @text General M. Defense Debuff
* @type text
* @desc Enter in the M. Defense Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genAgiFormula
* @parent generalStatFormula
* @text General Agility Formula
* @type text
* @desc Enter in the Agility Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genAgiDebuffFormula
* @parent generalStatFormula
* @text General Agility Debuff
* @type text
* @desc Enter in the Agility Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genLukFormula
* @parent generalStatFormula
* @text General Luck Formula
* @type text
* @desc Enter in the Luck Buff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param genLukDebuffFormula
* @parent generalStatFormula
* @text General Luck Debuff
* @type text
* @desc Enter in the Luck Debuff Formula everyone will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param
* @default
*
* @param aeGenFormula
* @text A/E All-In-One Formula
* @default
*
* @param aGenBuffFormula
* @parent aeGenFormula
* @text Actor Buff Formula
* @type text
* @desc Enter in the Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aGenDebuffFormula
* @parent aeGenFormula
* @text Actor Debuff Formula
* @type text
* @desc Enter in the Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25.
* @default 1 + buffs * 0.25
*
* @param eGenBuffFormula
* @parent aeGenFormula
* @text Enemy Buff Formula
* @type text
* @desc Enter in the Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eGenDebuffFormula
* @parent aeGenFormula
* @text Enemy Debuff Formula
* @type text
* @desc Enter in the Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25.
* @default 1 + buffs * 0.25
*
* @param
* @default
*
* @param aeStatFormula
* @text A/E Stat-Based Formula
* @default
*
* @param aMhpFormula
* @parent aeStatFormula
* @text Actor Max Hp Formula
* @type text
* @desc Enter in the Max Hp Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMhpDebuffFormula
* @parent aeStatFormula
* @text Actor Max Hp Debuff
* @type text
* @desc Enter in the Max Hp Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMmpFormula
* @parent aeStatFormula
* @text Actor Max Mp Formula
* @type text
* @desc Enter in the Max Mp Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMmpDebuffFormula
* @parent aeStatFormula
* @text Actor Max Mp Debuff
* @type text
* @desc Enter in the Max Mp Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aAtkFormula
* @parent aeStatFormula
* @text Actor Attack Formula
* @type text
* @desc Enter in the Attack Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aAtkDebuffFormula
* @parent aeStatFormula
* @text Actor Attack Debuff
* @type text
* @desc Enter in the Attack Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aDefFormula
* @parent aeStatFormula
* @text Actor Defense Formula
* @type text
* @desc Enter in the Def Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aDefDebuffFormula
* @parent aeStatFormula
* @text Actor Defense Debuff
* @type text
* @desc Enter in the Defense Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMatFormula
* @parent aeStatFormula
* @text Actor M. Attack Formula
* @type text
* @desc Enter in the M. Attack Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMatDebuffFormula
* @parent aeStatFormula
* @text Actor M. Attack Debuff
* @type text
* @desc Enter in the M. Attack Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMdfFormula
* @parent aeStatFormula
* @text Actor M. Def Formula
* @type text
* @desc Enter in the M. Defense Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aMdfDebuffFormula
* @parent aeStatFormula
* @text Actor M. Defense Debuff
* @type text
* @desc Enter in the M. Defense Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aAgiFormula
* @parent aeStatFormula
* @text Actor Agility Formula
* @type text
* @desc Enter in the Agility Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aAgiDebuffFormula
* @parent aeStatFormula
* @text Actor Agility Debuff
* @type text
* @desc Enter in the Agility Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aLukFormula
* @parent aeStatFormula
* @text Actor Luck Formula
* @type text
* @desc Enter in the Luck Buff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param aLukDebuffFormula
* @parent aeStatFormula
* @text Actor Luck Debuff
* @type text
* @desc Enter in the Luck Debuff Formula Actors will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMhpFormula
* @parent aeStatFormula
* @text Enemy Max Hp Formula
* @type text
* @desc Enter in the Max Hp Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMhpDebuffFormula
* @parent aeStatFormula
* @text Enemy Max Hp Debuff
* @type text
* @desc Enter in the Max Hp Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMmpFormula
* @parent aeStatFormula
* @text Enemy Max Mp Formula
* @type text
* @desc Enter in the Max Mp Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMmpDebuffFormula
* @parent aeStatFormula
* @text Enemy Max Mp Debuff
* @type text
* @desc Enter in the Max Mp Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eAtkFormula
* @parent aeStatFormula
* @text Enemy Attack Formula
* @type text
* @desc Enter in the Attack Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eAtkDebuffFormula
* @parent aeStatFormula
* @text Enemy Attack Debuff
* @type text
* @desc Enter in the Attack Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eDefFormula
* @parent aeStatFormula
* @text Enemy Defense Formula
* @type text
* @desc Enter in the Def Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eDefDebuffFormula
* @parent aeStatFormula
* @text Enemy Defense Debuff
* @type text
* @desc Enter in the Defense Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMatFormula
* @parent aeStatFormula
* @text Enemy M. Attack Formula
* @type text
* @desc Enter in the M. Attack Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMatDebuffFormula
* @parent aeStatFormula
* @text Enemy M. Attack Debuff
* @type text
* @desc Enter in the M. Attack Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMdfFormula
* @parent aeStatFormula
* @text Enemy M. Def Formula
* @type text
* @desc Enter in the M. Defense Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eMdfDebuffFormula
* @parent aeStatFormula
* @text Enemy M. Defense Debuff
* @type text
* @desc Enter in the M. Defense Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eAgiFormula
* @parent aeStatFormula
* @text Enemy Agility Formula
* @type text
* @desc Enter in the Agility Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eAgiDebuffFormula
* @parent aeStatFormula
* @text Enemy Agility Debuff
* @type text
* @desc Enter in the Agility Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eLukFormula
* @parent aeStatFormula
* @text Enemy Luck Formula
* @type text
* @desc Enter in the Luck Buff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param eLukDebuffFormula
* @parent aeStatFormula
* @text Enemy Luck Debuff
* @type text
* @desc Enter in the Luck Debuff Formula Enemies will use. Use "buffs" to indicate the buff level. Ex: 1 + buffs * 0.25
* @default 1 + buffs * 0.25
*
* @param
* @default
*
* @param generalInc
* @text General All-In-One Inc
* @default
*
* @param genBuffInc
* @parent generalInc
* @text General Buff Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Buff Increments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genDebuffInc
* @parent generalInc
* @text General Debuff Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Debuff Increments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param
* @default
*
* @param generalStatInc
* @text General Stat-Based Inc
* @default
*
* @param genMhpInc
* @parent generalStatInc
* @text General Max Hp Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Hp Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genMhpDebuffInc
* @parent generalStatInc
* @text General Max Hp Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Hp Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genMmpInc
* @parent generalStatInc
* @text General Max Mp Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Mp Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genMmpDebuffInc
* @parent generalStatInc
* @text General Max Mp Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Mp Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genAtkInc
* @parent generalStatInc
* @text General Attack Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Attack Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genAtkDebuffInc
* @parent generalStatInc
* @text General Attack Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Attack Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genDefInc
* @parent generalStatInc
* @text General Defense Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Defense Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genDefDebuffInc
* @parent generalStatInc
* @text General Defense Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Defense Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genMatInc
* @parent generalStatInc
* @text General M. Attack Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Attack Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genMatDebuffInc
* @parent generalStatInc
* @text General M. Attack Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Attack Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genMdfInc
* @parent generalStatInc
* @text General M. Def Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Defense Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genMdfDebuffInc
* @parent generalStatInc
* @text General M. Defense Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Defense Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genAgiInc
* @parent generalStatInc
* @text General Agility Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Agility Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genAgiDebuffInc
* @parent generalStatInc
* @text General Agility Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Agility Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param genLukInc
* @parent generalStatInc
* @text General Luck Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Luck Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param genLukDebuffInc
* @parent generalStatInc
* @text General Luck Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Luck Incerments everyone will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param
* @default
*
* @param aeGenInc
* @text A/E All-In-One Inc
* @default
*
* @param aGenBuffInc
* @parent aeGenInc
* @text Actor Buff Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Buff Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aGenDebuffInc
* @parent aeGenInc
* @text Actor Debuff Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Debuff Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eGenBuffInc
* @parent aeGenInc
* @text Enemy Buff Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Buff Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eGenDebuffInc
* @parent aeGenInc
* @text Enemy Debuff Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Debuff Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param
* @default
*
* @param aeStatInc
* @text A/E Stat-Based Inc
* @default
*
* @param aMhpInc
* @parent aeStatInc
* @text Actor Max Hp Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Hp Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aMhpDebuffInc
* @parent aeStatInc
* @text Actor Max Hp Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Hp Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aMmpInc
* @parent aeStatInc
* @text Actor Max Mp Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Mp Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aMmpDebuffInc
* @parent aeStatInc
* @text Actor Max Mp Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Mp Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aAtkInc
* @parent aeStatInc
* @text Actor Attack Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Attack Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aAtkDebuffInc
* @parent aeStatInc
* @text Actor Attack Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Attack Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aDefInc
* @parent aeStatInc
* @text Actor Defense Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Defense Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aDefDebuffInc
* @parent aeStatInc
* @text Actor Defense Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Defense Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aMatInc
* @parent aeStatInc
* @text Actor M. Attack Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Attack Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aMatDebuffInc
* @parent aeStatInc
* @text Actor M. Attack Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Attack Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aMdfInc
* @parent aeStatInc
* @text Actor M. Def Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Defense Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aMdfDebuffInc
* @parent aeStatInc
* @text Actor M. Defense Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Defense Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aAgiInc
* @parent aeStatInc
* @text Actor Agility Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Agility Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aAgiDebuffInc
* @parent aeStatInc
* @text Actor Agility Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Agility Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param aLukInc
* @parent aeStatInc
* @text Actor Luck Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Luck Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param aLukDebuffInc
* @parent aeStatInc
* @text Actor Luck Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Luck Incerments Actors will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eMhpInc
* @parent aeStatInc
* @text Enemy Max Hp Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Hp Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eMhpDebuffInc
* @parent aeStatInc
* @text Enemy Max Hp Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Hp Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eMmpInc
* @parent aeStatInc
* @text Enemy Max Mp Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Mp Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eMmpDebuffInc
* @parent aeStatInc
* @text Enemy Max Mp Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Max Mp Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eAtkInc
* @parent aeStatInc
* @text Enemy Attack Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Attack Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eAtkDebuffInc
* @parent aeStatInc
* @text Enemy Attack Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Attack Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eDefInc
* @parent aeStatInc
* @text Enemy Defense Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Defense Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eDefDebuffInc
* @parent aeStatInc
* @text Enemy Defense Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Defense Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eMatInc
* @parent aeStatInc
* @text Enemy M. Attack Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Attack Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eMatDebuffInc
* @parent aeStatInc
* @text Enemy M. Attack Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Attack Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eMdfInc
* @parent aeStatInc
* @text Enemy M. Def Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Defense Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eMdfDebuffInc
* @parent aeStatInc
* @text Enemy M. Defense Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the M. Defense Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eAgiInc
* @parent aeStatInc
* @text Enemy Agility Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Agility Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eAgiDebuffInc
* @parent aeStatInc
* @text Enemy Agility Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Agility Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
*
* @param eLukInc
* @parent aeStatInc
* @text Enemy Luck Inc
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Luck Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["1.25", "1.5"]
*
* @param eLukDebuffInc
* @parent aeStatInc
* @text Enemy Luck Debuff
* @type number[]
* @min 0
* @decimals 2
* @desc Enter in the Luck Incerments Enemies will use. Use decimals to for each modifier. Ex: 0.25, 0.5
* @default ["0.75", "0.5"]
* 
* @help 
* ==Notetags====================================================================
* | = either one works
* Non-case sensitive
* Actors, Classes, Weapons, Armors, Enemies, and States:
* Buff Strength: <Buff Strength|buffStrength: multiplier> - Gets a multiplier 
* that increases/decrease the potency of all Buffs.
* Debuff Strength: <Debuff Strength|debuffStrength: multiplier> - Gets a 
* multiplier that increases/decrease the potency of all Debuffs.
*
* Params (Max Hp, Max Mp, Attack, Defense, Magic Attack, Magic Defense, 
* Agility, Luck) - All parameters can applied to the below call, just replace 
* the below (Param Full Name) with the respective name like: 
* "Max Hp Buff Strength".
* Param Buff Strength: <(Param Full Name) Buff Stength|
* (Param Full Name)BuffStrength|(param short name)BuffStrength> - Gives a 
* modifier to buffs under this parameter.
* Param Debuff Strength: <(Param Full Name) Debuff Stength|
* (Param Full Name)DebuffStrength|(param short name)DebuffStrength> - Gives a 
* modifier to debbuffs under this parameter.
*
* Giving Buff Turns: <Applying Buff Bonus|Giving Buff Bonus|applyBuffBonus|
* giveBuffBonus: turn increase> - Increase the turn duration of applying buffs.
* Recieving Buff Turns: <Recieving Buff Bonus|Taking Buff Bonus|
* recieveBuffBonus|takeBuffBonus: turn increase> - Increases the duration 
* of debuffs applied to the recipient.
* Giving Debuff Turns: <Applying Debuff Bonus|Giving Debuff Bonus|
* applyDebuffBonus|giveDebuffBonus: turn increase> - Increases the turn duration 
* of applying debuffs.
* Recieving Debuff Turns: <Recieving Debuff Bonus|Taking Debuff Bonus|
* recieveDebuffBonus|takeDebuffBonus: turn increase> - Increases the duration 
* of debuffs applied to the recipient.
*
* Doubling Buff Applications: <Buff Double|Buff Apply Double|buffDouble> -
* Doubles the number of buffs that gets applied to the target, either once per
* parameter type or infinite depending on your settings.
* Doubling Debuff Applications: <Debuff Double|Debuff Apply Double|
* debuffDouble> - Same as above but for debuffs.
* ===Script Calls===============================================================
* [actors, enemies].addBuffSpecific(buffId, turns, user): Adds a Buff to an
* actor or enemy based on a specific user, even none at all. Mostly used for
* applications where you don't want a specific user to be the applier like an
* end of turn effect.
* [actors, enemies].addDebuffSpecific(buffId, turns, user): Same as above, but
* for debuffs.
* [actors, enemies].numBuffs(): Returns the total number of buffs the actor or
* enemy has on them at that moment. Includes buff levels.
* [actors, enemies].numUniqueBuffs(): Returns the total number of buffs the 
* actor or enemy has on them at that moment. Doesn't include buff levels.
* [actors, enemies].numDebuffs(): Same as the buff version but for debuffs.
* [actors, enemies].numUniqueDebuffs(): Same as the buff version but for 
* debuffs.
* ===Introduction===============================================================
* Simple and clean, the buff system is one I see be commonly ignored/replaced
* and one of the most common reason I've seen is that the power of them is
* too strong. So I made this plugin initally to choose/persoanlize the effects
* of said buffs. All the other stuff was added after the fact.
* ===How to Use=================================================================
* Setup the stuff on the right and it's mostly done unless you want to add the
* appropriate tags in. Does not conflict with Yanfly's BuffStatesCore due
* to the method it uses to apply the buff modifiers.
* ===Change Log=================================================================
* Version 1.1.0 (01/20/2025):
* -Fixed the way the buff formulas are calculated so that the modifier doesn'Tacks
* accidently reduce the stats
*
* Version 1.0.1 (12/25/2024):
* -Fixed a typo causing different options to not work
* -Added something to make sure parameters are properly initalized without 
* crashes
*
* Version 1.0.0 (12/24/2024):
* -Finished Base Plugin
* ==============================================================================
*/
(function() {
//==============================================================================
//Setup
//==============================================================================
//Gets the parameters from the plugin-in settings
Parameters = PluginManager.parameters('FRSH_BuffPlus');
Frashaw.Param = Frashaw.Param || {};
Frashaw.Param.BuffType = Parameters.buffFormulaType;
Frashaw.Param.DoubleInfinite = Parameters.doubleBuffInf == "true";
Frashaw.Param.DebuffSplit = Parameters.debuffSplit == "true";
Frashaw.Param.BuffSE = [Parameters.buffSoundName, Number(Parameters.buffSoundVolume), Number(Parameters.buffSoundPitch)];
Frashaw.Param.DebuffSE = [Parameters.debuffSoundName, Number(Parameters.debuffSoundVolume), Number(Parameters.debuffSoundPitch)];
Frashaw.Param.HpMpMatch = Parameters.maxHpMpScale == "true";

//Sets up the variable so the database stuff is only loaded once
var FrshBuffPlusLoaded = false;

//Starts the function to intialize all the buff notetags
FrshBuffPlus_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	//The normal database initalization
	if (!FrshBuffPlus_database.call(this)) return false; 
	//Runs if the above variable is false
	if (FrshBuffPlusLoaded == false) {
		//Processes the notetags of actors, classes, enemies, weapons, armors, and states
		this.processBuffPlusNotetags($dataActors);
		this.processBuffPlusNotetags($dataClasses);
		this.processBuffPlusNotetags($dataEnemies);
		this.processBuffPlusNotetags($dataWeapons);
		this.processBuffPlusNotetags($dataArmors);
		this.processBuffPlusNotetags($dataStates);
		//Make sure it doesn't run twice
		FrshBuffPlusLoaded = true;
	}
	return true;
};

//Does the processing for everything else
DataManager.processBuffPlusNotetags = function(group) {
	//Loads up various strings to check for
	var note1 = /<(?:BUFF STRENGTH|buffStrength):(.*)>/i;
	var note2 = /<(?:DEBUFF STRENGTH|debuffStrength):(.*)>/i;
	var note3 = /<(?:MAX HP BUFF STRENGTH|MHP BUFF STRENGTH|maxhpBuffStrength|mhpBuffStrength):(.*)>/i;
	var note4 = /<(?:MAX MP BUFF STRENGTH|MMP BUFF STRENGTH|maxmpBuffStrength|mmpBuffStrength):(.*)>/i;
	var note5 = /<(?:ATTACK BUFF STRENGTH|attackBuffStrength|atkBuffStrength):(.*)>/i;
	var note6 = /<(?:DEFENSE BUFF STRENGTH|defenseBuffStrength|defBuffStrength):(.*)>/i;
	var note7 = /<(?:MAGIC ATTACK BUFF STRENGTH|M ATTACK BUFF STRENGTH|magicattackBuffStrength|mattackBuffStrength|matBuffStrength):(.*)>/i;
	var note8 = /<(?:MAGIC DEFENSE BUFF STRENGTH|M DEFENSE BUFF STRENGTH|magicdefenseBuffStrength|mdefenseBuffStrength|mdfBuffStrength):(.*)>/i;
	var note9 = /<(?:AGILITY BUFF STRENGTH|agilityBuffStrength|agiBuffStrength):(.*)>/i;
	var note10 = /<(?:LUCK BUFF STRENGTH|luckBuffStrength|lukBuffStrength):(.*)>/i;
	var note11 = /<(?:MAX HP DEBUFF STRENGTH|MHP DEBUFF STRENGTH|maxhpDebuffStrength|mhpDebuffStrength):(.*)>/i;
	var note12 = /<(?:MAX MP DEBUFF STRENGTH|MMP DEBUFF STRENGTH|maxmpDebuffStrength|mmpDebuffStrength):(.*)>/i;
	var note13 = /<(?:ATTACK DEBUFF STRENGTH|attackDebuffStrength|atkDebuffStrength):(.*)>/i;
	var note14 = /<(?:DEFENSE DEBUFF STRENGTH|defenseDebuffStrength|defDebuffStrength):(.*)>/i;
	var note15 = /<(?:MAGIC ATTACK DEBUFF STRENGTH|M ATTACK DEBUFF STRENGTH|magicattackDebuffStrength|mattackDebuffStrength|matDebuffStrength):(.*)>/i;
	var note16 = /<(?:MAGIC DEFENSE DEBUFF STRENGTH|M DEFENSE DEBUFF STRENGTH|magicdefenseDebuffStrength|mdefenseDebuffStrength|mdfDebuffStrength):(.*)>/i;
	var note17 = /<(?:AGILITY DEBUFF STRENGTH|agilityDebuffStrength|agiDebuffStrength):(.*)>/i;
	var note18 = /<(?:LUCK DEBUFF STRENGTH|luckDebuffStrength|lukDebuffStrength):(.*)>/i;
	var note18 = /<(?:LUCK DEBUFF STRENGTH|luckDebuffStrength|lukDebuffStrength):(.*)>/i;
	var note19 = /<(?:APPLYING BUFF BONUS|GIVING BUFF BONUS|applyBuffBonus|giveBuffBonus):(.*)>/i;
	var note20 = /<(?:RECIEVING BUFF BONUS|TAKING BUFF BONUS|recieveBuffBonus|takeBuffBonus):(.*)>/i;
	var note21 = /<(?:APPLYING DEBUFF BONUS|GIVING DEBUFF BONUS|applyDebuffBonus|giveDebuffBonus):(.*)>/i;
	var note22 = /<(?:RECIEVING DEBUFF BONUS|TAKING DEBUFF BONUS|recieveDebuffBonus|takeDebuffBonus):(.*)>/i;
	var note23 = /<(?:BUFF DOUBLE|BUFF APPLY DOUBLE|buffDouble)>/i;
	var note24 = /<(?:DEBUFF DOUBLE|DEBUFF APPLY DOUBLE|debuffDouble)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.buffStrength = 1;
		obj.debuffStrength = 1;
		obj.mhpBuffStrength = 1;
		obj.mmpBuffStrength = 1;
		obj.atkBuffStrength = 1;
		obj.defBuffStrength = 1;
		obj.matBuffStrength = 1;
		obj.mdfBuffStrength = 1;
		obj.agiBuffStrength = 1;
		obj.lukBuffStrength = 1;
		obj.mhpDebuffStrength = 1;
		obj.mmpDebuffStrength = 1;
		obj.atkDebuffStrength = 1;
		obj.defDebuffStrength = 1;
		obj.matDebuffStrength = 1;
		obj.mdfDebuffStrength = 1;
		obj.agiDebuffStrength = 1;
		obj.lukDebuffStrength = 1;
		obj.giveBuffBonus = 0;
		obj.takeBuffBonus = 0;
		obj.giveDebuffBonus = 0;
		obj.takeDebuffBonus = 0;
		obj.buffDouble = false;
		obj.debuffDouble = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.buffStrength = Number(RegExp.$1);
			} else if (line.match(note2)){
				obj.debuffStrength = Number(RegExp.$1);
			} else if (line.match(note3)){
				obj.mhpBuffStrength = Number(RegExp.$1);
			} else if (line.match(note4)) {
				obj.mmpBuffStrength = Number(RegExp.$1);
			} else if (line.match(note5)){
				obj.atkBuffStrength = Number(RegExp.$1);
			} else if (line.match(note6)){
				obj.defBuffStrength = Number(RegExp.$1);
			} else if (line.match(note7)){
				obj.matBuffStrength = Number(RegExp.$1);
			} else if (line.match(note8)){
				obj.mdfBuffStrength = Number(RegExp.$1);
			} else if (line.match(note9)){
				obj.agiBuffStrength = Number(RegExp.$1);
			} else if (line.match(note10)){
				obj.lukBuffStrength = Number(RegExp.$1);
			} else if (line.match(note11)){
				obj.mhpDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note12)){
				obj.mmpDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note13)){
				obj.atkDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note14)){
				obj.defDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note15)){
				obj.matDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note16)){
				obj.mdfDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note17)){
				obj.agiDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note18)){
				obj.lukDebuffStrength = Number(RegExp.$1);
			} else if (line.match(note19)){
				obj.giveBuffBonus = Number(RegExp.$1);
			} else if (line.match(note20)){
				obj.takeBuffBonus = Number(RegExp.$1);
			} else if (line.match(note21)){
				obj.giveDebuffBonus = Number(RegExp.$1);
			} else if (line.match(note22)){
				obj.takeDebuffBonus = Number(RegExp.$1);
			} else if (line.match(note23)){
				obj.buffDouble = true;
			} else if (line.match(note24)){
				obj.debuffDouble = true;
			}
		}
	}
}

//The actor version where it runs through the actor, its class, it's equipment, and its States
//to get all the values of the buff modifiers and apply them to the actor
Game_Actor.prototype.getStrengths = function() {
	var user = this;
	var labels = ["buffStrength", "debuffStrength", "mhpBuffStrength", "mmpBuffStrength", "atkBuffStrength", "defBuffStrength", "matBuffStrength", "mdfBuffStrength", "agiBuffStrength", "lukBuffStrength", "mhpDebuffStrength", "mmpDebuffStrength", "atkDebuffStrength", "defDebuffStrength", "matDebuffStrength", "mdfDebuffStrength", "agiDebuffStrength", "lukDebuffStrength", "giveBuffBonus", "takeBuffBonus", "giveDebuffBonus", "takeDebuffBonus"];
	var data = $dataActors[user.actorId()];
	user.buffDouble = data.buffDouble;
	user.debuffDouble = data.debuffDouble;
	labels.forEach(function(i){ eval("user." + i + " *= data." + i); });
	var classed = $dataClasses[user._classId];
	labels.forEach(function(i){ eval("user." + i + " *= classed." + i) });
	if (!user.buffDouble) user.buffDouble = classed.buffDouble;
	if (!user.debuffDouble) user.debuffDouble = classed.debuffDouble;
	for (var i = 0; i != user.equips().length; i++){
		var equip = user.equips()[i];
		if (equip == null) continue;
		labels.forEach(function(i){ eval("user." + i + " *= equip." + i) });
		if (!user.buffDouble) user.buffDouble = equip.buffDouble;
		if (!user.debuffDouble) user.debuffDouble = equip.debuffDouble;
	}
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var state = $dataStates[stateList[i].id];
		labels.forEach(function(i){ eval("user." + i + " *= state." + i) });
		if (!user.buffDouble) user.buffDouble = data.buffDouble;
		if (!user.debuffDouble) user.debuffDouble = data.debuffDouble;
	}
};

//The enemy version where it runs through the enemy and its States to get all the values of the 
//buff modifiers and apply them to the enemy
Game_Enemy.prototype.getStrengths = function() {
	var user = this;
	var labels = ["buffStrength", "debuffStrength", "mhpBuffStrength", "mmpBuffStrength", "atkBuffStrength", "defBuffStrength", "matBuffStrength", "mdfBuffStrength", "agiBuffStrength", "lukBuffStrength", "mhpDebuffStrength", "mmpDebuffStrength", "atkDebuffStrength", "defDebuffStrength", "matDebuffStrength", "mdfDebuffStrength", "agiDebuffStrength", "lukDebuffStrength", "giveBuffBonus", "takeBuffBonus", "giveDebuffBonus", "takeDebuffBonus"];
	var data = $dataEnemies[user.enemyId()];
	labels.forEach(function(i){ eval("user." + i + " *= data." + i) });
	user.buffDouble = data.buffDouble;
	user.debuffDouble = data.debuffDouble;
	var stateList = user.states();
	for (var i = 0; i != stateList.length; i++){
		var state = $dataStates[stateList[i].id];
		labels.forEach(function(i){ eval("user." + i + " *= state." + i) });
		if (!user.buffDouble) user.buffDouble = data.buffDouble;
		if (!user.debuffDouble) user.debuffDouble = data.debuffDouble;
	}
};

//Resets the various modifiers so they don't bleed over and mass apply themselves
Game_BattlerBase.prototype.removeStrengths = function(){
	this.buffStrength = 1;
	this.debuffStrength = 1;
	this.mhpBuffStrength = 1;
	this.mmpBuffStrength = 1;
	this.atkBuffStrength = 1;
	this.defBuffStrength = 1;
	this.matBuffStrength = 1;
	this.mdfBuffStrength = 1;
	this.agiBuffStrength = 1;
	this.lukBuffStrength = 1;
	this.mhpDebuffStrength = 1;
	this.mmpDebuffStrength = 1;
	this.atkDebuffStrength = 1;
	this.defDebuffStrength = 1;
	this.matDebuffStrength = 1;
	this.mdfDebuffStrength = 1;
	this.agiDebuffStrength = 1;
	this.lukDebuffStrength = 1;
	this.giveBuffBonus = 0;
	this.takeBuffBonus = 0;
	this.giveDebuffBonus = 0;
	this.takeDebuffBonus = 0;
	this.buffDouble = false;
	this.debuffDouble = false;
}

//Calls all the the gets stuffs and the remove stuffs
frsh_bplus_refresh_strengths = Game_BattlerBase.prototype.refresh
Game_BattlerBase.prototype.refresh = function(){
	frsh_bplus_refresh_strengths.call(this);
	this.removeStrengths();
	this.getStrengths();
}

//==============================================================================
//Applying Buffs/Debuffs
//==============================================================================
//An extention that adds the checks to see if an extra buff/debuff has been applied
//to a target or not
frsh_bplus_doubled_init = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    frsh_bplus_doubled_init.call(this);
	this.doubledBuffs = [false, false, false, false, false, false, false, false];
	this.doubledDebuffs = [false, false, false, false, false, false, false, false];
};

//An extention that re-initalizes the checks for 1 additional buff/debuff each action
frsh_bplus_doubled_reinit = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    frsh_bplus_doubled_reinit.call(this);
	this.doubledBuffs = [false, false, false, false, false, false, false, false];
	this.doubledDebuffs = [false, false, false, false, false, false, false, false];
};

//An extention that allows buffs to play their noise, get their boosted turns
frsh_bplus_buff_apply = Game_Battler.prototype.addBuff
Game_Battler.prototype.addBuff = function(paramId, turns) {
	//If the user does exist, the turns they can boost applications of buffs by is added
	if (BattleManager._action != null && BattleManager._action.subject().isActing()) turns += BattleManager._action.subject().giveBuffBonus;
	//Adds the bonus turns of buff the recipient gets
	turns += this.takeBuffBonus;
	//Sets variables to take the % of the Hp and Mp for Max Hp and Mp buffs respectively
	var hpPerc = 0;
	var spPerc = 0;
	//If the user is alive it gets the rates of both Hp and Mp
	if (this.isAlive()){
		if (paramId == 0) hpPerc = this.hp/this.mhp;
		if (paramId == 1) spPerc = this.mp/this.mmp;
	}
	//Adds the buff
	frsh_bplus_buff_apply.call(this,paramId, turns);
	//Checks to see if a second buff should be added or not by checking if the user can
	//double buff and if the buff hasn't been doubled
	if (BattleManager._action != null && BattleManager._action.subject().buffDouble && !BattleManager._action.subject().doubledBuffs[paramId]){
		//Adds secound buff
		frsh_bplus_buff_apply.call(this,paramId, turns);
		//If the infinite doubling is enabled, this doesn't set the one per action double 
		//to occur
		if (!Frashaw.Param.DoubleInfinite) BattleManager._action.subject().doubledBuffs[paramId] = true;
	}
	if (this.isAlive()){
		//Sets the user's Hp and Mp to the appropriate %s
		if (Frashaw.Param.HpMpMatch){
			if (paramId == 0) this.setHp(Math.round(this.mhp*hpPerc));
			if (paramId == 1 && this.mp != 0) this.setMp(Math.round(this.mmp*spPerc));
		}
		//Plays a sound when appling a buff if wanted
		if (Frashaw.Param.BuffSE[0] != ""){
			AudioManager.playSe({
				name: Frashaw.Param.BuffSE[0],
				volume: Frashaw.Param.BuffSE[1],
				pitch: Frashaw.Param.BuffSE[2],
				pan: 0
			});
		}
	}
};

//Allows for debuffs to play a sound when added, and to also account for debuff resistances
frsh_bplus_debuff_apply = Game_Battler.prototype.addDebuff
Game_Battler.prototype.addDebuff = function(paramId, turns, user) {
	//Does the exact same things as above, but for debuffs instead of buffs
	if (this.isAlive()){
		if (BattleManager._action != null && BattleManager._action.subject().isActing()) turns += BattleManager._action.subject().giveDebuffBonus;
		turns += this.takeDebuffBonus;
		frsh_bplus_debuff_apply.call(this,paramId, turns, user);
		if (BattleManager._action != null && BattleManager._action.subject().debuffDouble && !BattleManager._action.subject().doubledDebuffs[paramId]){
			frsh_bplus_debuff_apply.call(this,paramId, turns);
			if (!Frashaw.Param.DoubleInfinite) BattleManager._action.subject().doubledDebuffs[paramId] = true;
		}
		if (Frashaw.Param.DebuffSE[0] != ""){
			AudioManager.playSe({
				name: Frashaw.Param.DebuffSE[0],
				volume: Frashaw.Param.DebuffSE[1],
				pitch: Frashaw.Param.DebuffSE[2],
				pan: 0
			});
		}
	}
};

//A function where you can specifiy the user that is using the buff action
Game_Battler.prototype.addBuffSpecific = function(paramId, turns, user) {
	if (user != null) turns += user.giveBuffBonus;
	turns += this.takeBuffBonus;
	var hpPerc = 0;
	var spPerc = 0;
	if (this.isAlive()){
		if (paramId == 0) hpPerc = this.hp/this.mhp;
		if (paramId == 1) spPerc = this.mp/this.mmp;
	}
	frsh_bplus_buff_apply.call(this, paramId, turns);
	if (this.isAlive()){
		if (Frashaw.Param.HpMpMatch){
			if (paramId == 0) this.setHp(Math.round(this.mhp*hpPerc));
			if (paramId == 1 && this.mp != 0) this.setMp(Math.round(this.mmp*spPerc));
		}
		if (Frashaw.Param.BuffSE[0] != ""){
			AudioManager.playSe({
				name: Frashaw.Param.BuffSE[0],
				volume: Frashaw.Param.BuffSE[1],
				pitch: Frashaw.Param.BuffSE[2],
				pan: 0
			});
		}
	}
};

//A function where you can specifiy the user that is using the debuff action
Game_Battler.prototype.addDebuffSpecific = function(paramId, turns, user) {
	if (user != null) turns += user.giveDebuffBonus;
	turns += this.takeDebuffBonus;
    frsh_bplus_debuff_apply.call(this, paramId, turns);
	if (Frashaw.Param.DebuffSE[0] != ""){
		AudioManager.playSe({
			name: Frashaw.Param.DebuffSE[0],
			volume: Frashaw.Param.DebuffSE[1],
			pitch: Frashaw.Param.DebuffSE[2],
			pan: 0
		});
	}
};

//==============================================================================
//Buff/Debuff Counting
//==============================================================================
//A function to get the number of buffs on on the specified user
Game_BattlerBase.prototype.numBuffs = function(){
	var value = 0;
	for(var loop = 0; loop < 8; loop++){
		if (this._buffs[loop] > 0) value += this._buffs[loop];
	}
	return value;
}

//A function to get the number of unique buffs on on the specified user
Game_BattlerBase.prototype.numUniqueBuffs = function(){
	var value = 0;
	for(var loop = 0; loop < 8; loop++){
		if (this._buffs[loop] > 0) value++;
	}
	return value;
}

//A function to get the number of debuffs on on the specified user
Game_BattlerBase.prototype.numDebuffs = function(){
	var value = 0;
	for(var loop = 0; loop < 8; loop++){
		if (this._buffs[loop] < 0) value += this._buffs[loop];
	}
	value *= -1;
	return value;
}

//A function to get the number of unique debuffs on on the specified user
Game_BattlerBase.prototype.numUniqueDebuffs = function(){
	var value = 0;
	for(var loop = 0; loop < 8; loop++){
		if (this._buffs[loop] < 0) value++;
	}
	return value;
}

//==============================================================================
//Formula Shit
//==============================================================================
//Sets all the buff and debuff arrays for the parameters later
var maxHpBuffActor = ["1"];
var maxHpDebuffActor = ["1"];
var maxMpBuffActor = ["1"];
var maxMpDebuffActor = ["1"];
var atkBuffActor = ["1"];
var atkDebuffActor = ["1"];
var defBuffActor = ["1"];
var defDebuffActor = ["1"];
var matBuffActor = ["1"];
var matDebuffActor = ["1"];
var mdfBuffActor = ["1"];
var mdfDebuffActor = ["1"];
var agiBuffActor = ["1"];
var agiDebuffActor = ["1"];
var lukBuffActor = ["1"];
var lukDebuffActor = ["1"];

var maxHpBuffEnemy = ["1"];
var maxHpDebuffEnemy = ["1"];
var maxMpBuffEnemy = ["1"];
var maxMpDebuffEnemy = ["1"];
var atkBuffEnemy = ["1"];
var atkDebuffEnemy = ["1"];
var defBuffEnemy = ["1"];
var defDebuffEnemy = ["1"];
var matBuffEnemy = ["1"];
var matDebuffEnemy = ["1"];
var mdfBuffEnemy = ["1"];
var mdfDebuffEnemy = ["1"];
var agiBuffEnemy = ["1"];
var agiDebuffEnemy = ["1"];
var lukBuffEnemy = ["1"];
var lukDebuffEnemy = ["1"];

//Checks if it is a formula or increment type, forcing the parameters to behave differently
var formulaType = 0;

if (Frashaw.Param.BuffType == "General All-In-One Formula"){
	if (!Frashaw.Param.DebuffSplit){
		//Goes through each buff and debuff to add the generic formula to is
		["maxHpBuffActor", "maxMpBuffActor", "atkBuffActor", "defBuffActor", "matBuffActor", "mdfBuffActor", "agiBuffActor", "lukBuffActor", "maxHpBuffEnemy", "maxMpBuffEnemy", "atkBuffEnemy", "defBuffEnemy", "matBuffEnemy", "mdfBuffEnemy", "agiBuffEnemy", "lukBuffEnemy", "maxHpDebuffActor", "maxMpDebuffActor", "atkDebuffActor", "defDebuffActor", "matDebuffActor", "mdfDebuffActor", "agiDebuffActor", "lukDebuffActor", "maxHpDebuffEnemy", "maxMpDebuffEnemy", "atkDebuffEnemy", "defDebuffEnemy", "matDebuffEnemy", "mdfDebuffEnemy", "agiDebuffEnemy", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genBuffFormula");
		});
	} else {
		//Goes through each buff to add the generic formula to it
		["maxHpBuffActor", "maxMpBuffActor", "atkBuffActor", "defBuffActor", "matBuffActor", "mdfBuffActor", "agiBuffActor", "lukBuffActor", "maxHpBuffEnemy", "maxMpBuffEnemy", "atkBuffEnemy", "defBuffEnemy", "matBuffEnemy", "mdfBuffEnemy", "agiBuffEnemy", "lukBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genBuffFormula");
		});
		//Goes through each debuff to apply the generic debuff formula to it
		["maxHpDebuffActor", "maxMpDebuffActor", "atkDebuffActor", "defDebuffActor", "matDebuffActor", "mdfDebuffActor", "agiDebuffActor", "lukDebuffActor", "maxHpDebuffEnemy", "maxMpDebuffEnemy", "atkDebuffEnemy", "defDebuffEnemy", "matDebuffEnemy", "mdfDebuffEnemy", "agiDebuffEnemy", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genDebuffFormula");
		});
	}
} else if (Frashaw.Param.BuffType == "General Stat-Based Formula"){
	if (!Frashaw.Param.DebuffSplit){
		//Goes through each buff and debuff of each parameter and applies the generic formula to each
		["maxHpBuffActor", "maxHpBuffEnemy", "maxHpDebuffActor", "maxHpDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMhpFormula");
		});
		["maxMpBuffActor", "maxMpBuffEnemy", "maxMpDebuffActor", "maxMpDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMmpFormula");
		});
		["atkBuffActor", "atkBuffEnemy", "atkDebuffActor", "atkDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genAtkFormula");
		});
		["defBuffActor", "defBuffEnemy", "defDebuffActor", "defDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genDefFormula");
		});
		["matBuffActor", "matBuffEnemy", "matDebuffActor", "matDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMatFormula");
		});
		["mdfBuffActor", "mdfBuffEnemy", "mdfDebuffActor", "mdfDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMdfFormula");
		});
		["agiBuffActor", "agiBuffEnemy", "agiDebuffActor", "agiDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genAgiFormula");
		});
		["lukBuffActor", "lukBuffEnemy", "lukDebuffActor", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genLukFormula");
		});
	} else {
		//Goes through each buff of each parameter and applies the generic formula to each
		["maxHpBuffActor", "maxHpBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMhpFormula");
		});
		["maxMpBuffActor", "maxMpBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMmpFormula");
		});
		["atkBuffActor", "atkBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genAtkFormula");
		});
		["defBuffActor", "defBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genDefFormula");
		});
		["matBuffActor", "matBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMatFormula");
		});
		["mdfBuffActor", "mdfBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMdfFormula");
		});
		["agiBuffActor", "agiBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genAgiFormula");
		});
		["lukBuffActor", "lukBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genLukFormula");
		});
		//Goes through each debuff of each parameter and applies the generic debuff formula to each
		["maxHpDebuffActor", "maxHpDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMhpDebuffFormula");
		});
		["maxMpDebuffActor", "maxMpDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMmpDebuffFormula");
		});
		["atkDebuffActor", "atkDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genAtkDebuffFormula");
		});
		["defDebuffActor", "defDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genDefDebuffFormula");
		});
		["matDebuffActor", "matDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMatDebuffFormula");
		});
		["mdfDebuffActor", "mdfDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genMdfDebuffFormula");
		});
		["agiDebuffActor", "agiDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genAgiDebuffFormula");
		});
		["lukDebuffActor", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.genLukDebuffFormula");
		});
	}
} else if (Frashaw.Param.BuffType == "Actor/Enemy All-In-One Formula"){
	if (!Frashaw.Param.DebuffSplit){
		//Goes through each buff and debuff of each actor and applies the generic formula to each
		["maxHpBuffActor", "maxMpBuffActor", "atkBuffActor", "defBuffActor", "matBuffActor", "mdfBuffActor", "agiBuffActor", "lukBuffActor", "maxHpDebuffActor", "maxMpDebuffActor", "atkDebuffActor", "defDebuffActor", "matDebuffActor", "mdfDebuffActor", "agiDebuffActor", "lukDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aGenBuffFormula");
		});
		//Goes through each buff and debuff of each enemy and applies the generic formula to each
		["maxHpBuffEnemy", "maxMpBuffEnemy", "atkBuffEnemy", "defBuffEnemy", "matBuffEnemy", "mdfBuffEnemy", "agiBuffEnemy", "lukBuffEnemy", "maxHpDebuffEnemy", "maxMpDebuffEnemy", "atkDebuffEnemy", "defDebuffEnemy", "matDebuffEnemy", "mdfDebuffEnemy", "agiDebuffEnemy", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eGenBuffFormula");
		});
	} else {
		//Goes through each buff of each actor and applies the generic formula to each
		["maxHpBuffActor", "maxMpBuffActor", "atkBuffActor", "defBuffActor", "matBuffActor", "mdfBuffActor", "agiBuffActor", "lukBuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aGenBuffFormula");
		});
		//Goes through each buff of each enemy and applies the generic formula to each
		["maxHpBuffEnemy", "maxMpBuffEnemy", "atkBuffEnemy", "defBuffEnemy", "matBuffEnemy", "mdfBuffEnemy", "agiBuffEnemy", "lukBuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eGenBuffFormula");
		});
		//Goes through each debuff of each actor and applies the generic debuff formula to each
		["maxHpDebuffActor", "maxMpDebuffActor", "atkDebuffActor", "defDebuffActor", "matDebuffActor", "mdfDebuffActor", "agiDebuffActor", "lukDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aGenDebuffFormula");
		});
		//Goes through each debuff of each enemy and applies the generic debuff formula to each
		["maxHpDebuffEnemy", "maxMpDebuffEnemy", "atkDebuffEnemy", "defDebuffEnemy", "matDebuffEnemy", "mdfDebuffEnemy", "agiDebuffEnemy", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eGenDebuffFormula");
		});
	}
} else if (Frashaw.Param.BuffType == "Actor/Enemy Stat-Based Formula"){
	if (!Frashaw.Param.DebuffSplit){
		//Gets the param buff and debuff for each actor and sets it to the generic formula
		["maxHpBuffActor", "maxHpDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aMhpFormula");
		});
		["maxMpBuffActor", "maxMpDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aMmpFormula");
		});
		["atkBuffActor", "atkDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aAtkFormula");
		});
		["defBuffActor", "defDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aDefFormula");
		});
		["matBuffActor", "matDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aMatFormula");
		});
		["mdfBuffActor", "mdfDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aMdfFormula");
		});
		["agiBuffActor", "agiDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aAgiFormula");
		});
		["lukBuffActor", "lukDebuffActor"].forEach(function (i){
			eval(i + "[0] = Parameters.aLukFormula");
		});
		//Gets the param buff and debuff for each enemy and sets it to the generic formula
		["maxHpBuffEnemy","maxHpDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eMhpFormula");
		});
		["maxMpBuffEnemy", "maxMpDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eMmpFormula");
		});
		["atkBuffEnemy", "atkDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eAtkFormula");
		});
		["defBuffEnemy", "defDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eDefFormula");
		});
		["matBuffEnemy", "matDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eMatFormula");
		});
		["mdfBuffEnemy", "mdfDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eMdfFormula");
		});
		["agiBuffEnemy", "agiDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eAgiFormula");
		});
		["lukBuffEnemy", "lukDebuffEnemy"].forEach(function (i){
			eval(i + "[0] = Parameters.eLukFormula");
		});
	} else {
		//Gets the param buff and debuff for each actor and sets it to the generic formula 
		//and generic debuff formulas respectively
		maxHpBuffActor[0] = Parameters.aMhpFormula;
		maxHpDebuffActor[0] = Parameters.aMhpDebuffFormula;
		maxMpBuffActor[0] = Parameters.aMmpFormula;
		maxMpDebuffActor[0] = Parameters.aMmpDebuffFormula;
		atkBuffActor[0] = Parameters.aAtkFormula;
		atkDebuffActor[0] = Parameters.aAtkDebuffFormula;
		defBuffActor[0] = Parameters.aDefFormula;
		defDebuffActor[0] = Parameters.aDefDebuffFormula;
		matBuffActor[0] = Parameters.aMatFormula;
		matDebuffActor[0] = Parameters.aMarDebuffFormula;
		mdfBuffActor[0] = Parameters.aMdfFormula;
		mdfDebuffActor[0] = Parameters.aMdfDebuffFormula;
		agiBuffActor[0] = Parameters.aAgiFormula;
		agiDebuffActor[0] = Parameters.aAgiDebuffFormula;
		lukBuffActor[0] = Parameters.aLukFormula;
		lukDebuffActor[0] = Parameters.aLukDebuffFormula;
		//Gets the param buff and debuff for each enemy and sets it to the generic formula 
		//and generic debuff formulas respectively
		maxHpBuffEnemy[0] = Parameters.eMhpFormula;
		maxHpDebuffEnemy[0] = Parameters.eMhpDebuffFormula;
		maxMpBuffEnemy[0] = Parameters.eMmpFormula;
		maxMpDebuffEnemy[0] = Parameters.eMmpDebuffFormula;
		atkBuffEnemy[0] = Parameters.eAtkFormula;
		atkDebuffEnemy[0] = Parameters.eAtkDebuffFormula;
		defBuffEnemy[0] = Parameters.eDefFormula;
		defDebuffEnemy[0] = Parameters.eDefDebuffFormula;
		matBuffEnemy[0] = Parameters.eMatFormula;
		matDebuffEnemy[0] = Parameters.eMarDebuffFormula;
		mdfBuffEnemy[0] = Parameters.eMdfFormula;
		mdfDebuffEnemy[0] = Parameters.eMdfDebuffFormula;
		agiBuffEnemy[0] = Parameters.eAgiFormula;
		agiDebuffEnemy[0] = Parameters.eAgiDebuffFormula;
		lukBuffEnemy[0] = Parameters.eLukFormula;
		lukDebuffEnemy[0] = Parameters.eLukDebuffFormula;
	}
} else if (Frashaw.Param.BuffType == "General All-In-One Increments"){
	formulaType = 1;
	//Processes the buff increments to use
	buffs = JSON.parse(Parameters.genBuffInc);
	["maxHpBuffActor", "maxMpBuffActor", "atkBuffActor", "defBuffActor", "matBuffActor", "mdfBuffActor", "agiBuffActor", "lukBuffActor", "maxHpBuffEnemy", "maxMpBuffEnemy", "atkBuffEnemy", "defBuffEnemy", "matBuffEnemy", "mdfBuffEnemy", "agiBuffEnemy", "lukBuffEnemy"].forEach(function (i){
		//Tacks on the buff increments to the end of the array 
		eval(i + " = " + i + ".concat(buffs)");
	});
	//Processes the debuff increments to use
	debuffs = JSON.parse(Parameters.genDebuffInc);
	["maxHpDebuffActor", "maxMpDebuffActor", "atkDebuffActor", "defDebuffActor", "matDebuffActor", "mdfDebuffActor", "agiDebuffActor", "lukDebuffActor", "maxHpDebuffEnemy", "maxMpDebuffEnemy", "atkDebuffEnemy", "defDebuffEnemy", "matDebuffEnemy", "mdfDebuffEnemy", "agiDebuffEnemy", "lukDebuffEnemy"].forEach(function (i){
		//Tacks on the debuff increments to the end of the array 
		eval(i + " = " + i + ".concat(debuffs)");
	});
} else if (Frashaw.Param.BuffType == "General Stat-Based Increments"){
	formulaType = 1;
	//Goes through the param buff increments to use for actors and enemies
	["maxHpBuffActor", "maxHpBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMhpInc))");
	});
	["maxMpBuffActor", "maxMpBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMmpInc))");
	});
	["atkBuffActor", "atkBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genAtkInc))");
	});
	["defBuffActor", "defBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genDefInc))");
	});
	["matBuffActor", "matBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMatInc))");
	});
	["mdfBuffActor", "mdfBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMdfInc))");
	});
	["agiBuffActor", "agiBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genAgiInc))");
	});
	["lukBuffActor", "lukBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genLukInc))");
	});
	//Goes through the param debuff increments to use for actors and enemies
	["maxHpDebuffActor", "maxHpDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMhpDebuffInc))");
	});
	["maxMpDebuffActor", "maxMpDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMmpDebuffInc))");
	});
	["atkDebuffActor", "atkDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genAtkDebuffInc))");
	});
	["defDebuffActor", "defDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genDefDebuffInc))");
	});
	["matDebuffActor", "matDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMatDebuffInc))");
	});
	["mdfDebuffActor", "mdfDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genMdfDebuffInc))");
	});
	["agiDebuffActor", "agiDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genAgiDebuffInc))");
	});
	["lukDebuffActor", "lukDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.genLukDebuffInc))");
	});
} else if (Frashaw.Param.BuffType == "Actor/Enemy All-In-One Increments"){
	formulaType = 1;
	//Goes through each actor param to apply the generic increments to each
	["maxHpBuffActor", "maxMpBuffActor", "atkBuffActor", "defBuffActor", "matBuffActor", "mdfBuffActor", "agiBuffActor", "lukBuffActor"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.aGenBuffInc))");
	});
	//Goes through each enemy param to apply the generic increments to each
	["maxHpDebuffActor", "maxMpDebuffActor", "atkDebuffActor", "defDebuffActor", "matDebuffActor", "mdfDebuffActor", "agiDebuffActor", "lukDebuffActor"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.aGenDebuffInc))");
	});
	//Goes through each actor param to apply the generic debuff increments to each
	["maxHpBuffEnemy", "maxMpBuffEnemy", "atkBuffEnemy", "defBuffEnemy", "matBuffEnemy", "mdfBuffEnemy", "agiBuffEnemy", "lukBuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.eGenBuffInc))");	
	});
	//Goes through each enemy param to apply the generic debuff increments to each
	["maxHpDebuffEnemy", "maxMpDebuffEnemy", "atkDebuffEnemy", "defDebuffEnemy", "matDebuffEnemy", "mdfDebuffEnemy", "agiDebuffEnemy", "lukDebuffEnemy"].forEach(function (i){
		eval(i + " = " + i + ".concat(JSON.parse(Parameters.eGenDebuffInc))");
	});
} else if (Frashaw.Param.BuffType == "Actor/Enemy Stat-Based Increments"){
	formulaType = 1;
	//Goes through each actor param to apply the specific increments to each
	maxHpBuffActor.concat(JSON.parse(Parameters.aMhpInc));
	maxMpBuffActor.concat(JSON.parse(Parameters.aMmpInc));
	atkBuffActor.concat(JSON.parse(Parameters.aAtkInc));
	defBuffActor.concat(JSON.parse(Parameters.aDefInc));
	matBuffActor.concat(JSON.parse(Parameters.aMatInc));
	mdfBuffActor.concat(JSON.parse(Parameters.aMdfInc));
	agiBuffActor.concat(JSON.parse(Parameters.aAgiInc));
	lukBuffActor.concat(JSON.parse(Parameters.aLukInc));
	maxHpDebuffActor.concat(JSON.parse(Parameters.aMhpDebuffInc));
	maxMpDebuffActor.concat(JSON.parse(Parameters.aMmpDebuffInc));
	atkDebuffActor.concat(JSON.parse(Parameters.aAtkDebuffInc));
	defDebuffActor.concat(JSON.parse(Parameters.aDefDebuffInc));
	matDebuffActor.concat(JSON.parse(Parameters.aMatDebuffInc));
	mdfDebuffActor.concat(JSON.parse(Parameters.aMdfDebuffInc));
	agiDebuffActor.concat(JSON.parse(Parameters.aAgiDebuffInc));
	lukDebuffActor.concat(JSON.parse(Parameters.aLukDebuffInc));
	//Goes through each enemy param to apply the specific increments to each
	maxHpBuffEnemy.concat(JSON.parse(Parameters.eMhpInc));
	maxMpBuffEnemy.concat(JSON.parse(Parameters.eMmpInc));
	atkBuffEnemy.concat(JSON.parse(Parameters.eAtkInc));
	defBuffEnemy.concat(JSON.parse(Parameters.eDefInc));
	matBuffEnemy.concat(JSON.parse(Parameters.eMatInc));
	mdfBuffEnemy.concat(JSON.parse(Parameters.eMdfInc));
	agiBuffEnemy.concat(JSON.parse(Parameters.eAgiInc));
	lukBuffEnemy.concat(JSON.parse(Parameters.eLukInc));
	maxHpDebuffEnemy.concat(JSON.parse(Parameters.eMhpDebuffInc));
	maxMpDebuffEnemy.concat(JSON.parse(Parameters.eMmpDebuffInc));
	atkDebuffEnemy.concat(JSON.parse(Parameters.eAtkDebuffInc));
	defDebuffEnemy.concat(JSON.parse(Parameters.eDefDebuffInc));
	matDebuffEnemy.concat(JSON.parse(Parameters.eMatDebuffInc));
	mdfDebuffEnemy.concat(JSON.parse(Parameters.eMdfDebuffInc));
	agiDebuffEnemy.concat(JSON.parse(Parameters.eAgiDebuffInc));
	lukDebuffEnemy.concat(JSON.parse(Parameters.eLukDebuffInc));
}

//Formula to determine the buff rate for various buffs and debuffs for actors
Game_Actor.prototype.paramBuffRate = function(paramId) {
	var buffs = this._buffs[paramId];
	if (buffs > 0){
		modifier = 0;
		if (paramId == 0){
			//If the formula type is 0, it gets the 0 element of the array, otherwise it 
			//takes the element based on the level
			//Also multiplies the buff by the recipients buff strength
			mod = eval(maxHpBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.mhpBuffStrength;
		} else if (paramId == 1){
			mod = eval(maxMpBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.mmpBuffStrength;
		} else if (paramId == 2){
			mod = eval(atkBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.atkBuffStrength;
		} else if (paramId == 3){
			mod = eval(defBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.defBuffStrength;
		} else if (paramId == 4){
			mod = eval(matBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.matBuffStrength;
		} else if (paramId == 5){
			mod = eval(mdfBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.mdfBuffStrength;
		} else if (paramId == 6){
			mod = eval(agiBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.agiBuffStrength;
		} else if (paramId == 7){
			mod = eval(lukBuffActor[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.lukBuffStrength;
		}
		return 1 + (modifier * this.buffStrength);
	} else if (buffs < 0){
		if (paramId == 0){
			modifier = eval(maxHpDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.mhpDebuffStrength;
		} else if (paramId == 1){
			modifier = eval(maxMpDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.mmpDebuffStrength;
		} else if (paramId == 2){
			modifier = eval(atkDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.atkDebuffStrength;
		} else if (paramId == 3){
			modifier = eval(defDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.defDebuffStrength;
		} else if (paramId == 4){
			modifier = eval(matDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.matDebuffStrength;
		} else if (paramId == 5){
			modifier = eval(mdfDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.mdfDebuffStrength;
		} else if (paramId == 6){
			modifier = eval(agiDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.agiDebuffStrength;
		} else if (paramId == 7){
			modifier = eval(lukDebuffActor[((formulaType == 0) ? 0 : -buffs)]) * this.lukDebuffStrength;
		}
		return modifier * this.debuffStrength;
	} else {
		return 1;
	}
}

//Formula to determine the buff rate for various buffs and debuffs for enemies
Game_Enemy.prototype.paramBuffRate = function(paramId) {
	var buffs = this._buffs[paramId];
	if (buffs > 0){
		modifier = 0;
		if (paramId == 0){
			mod = eval(maxHpBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.mhpBuffStrength;
		} else if (paramId == 1){
			mod = eval(maxMpBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.mmpBuffStrength;
		} else if (paramId == 2){
			mod = eval(atkBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.atkBuffStrength;
		} else if (paramId == 3){
			mod = eval(defBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.defBuffStrength;
		} else if (paramId == 4){
			mod = eval(matBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.matBuffStrength;
		} else if (paramId == 5){
			mod = eval(mdfBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.mdfBuffStrength;
		} else if (paramId == 6){
			mod = eval(agiBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.agiBuffStrength;
		} else if (paramId == 7){
			mod = eval(lukBuffEnemy[((formulaType == 0) ? 0 : buffs)]);
			mod = (mod > 1) ? mod - 1 : mod;
			modifier = mod * this.lukBuffStrength;
		}
		return 1 + (modifier * this.buffStrength);
	} else if (buffs < 0){
		if (paramId == 0){
			modifier = eval(maxHpDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.mhpDebuffStrength;
		} else if (paramId == 1){
			modifier = eval(maxMpDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.mmpDebuffStrength;
		} else if (paramId == 2){
			modifier = eval(atkDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.atkDebuffStrength;
		} else if (paramId == 3){
			modifier = eval(defDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.defDebuffStrength;
		} else if (paramId == 4){
			modifier = eval(matDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.matDebuffStrength;
		} else if (paramId == 5){
			modifier = eval(mdfDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.mdfDebuffStrength;
		} else if (paramId == 6){
			modifier = eval(agiDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.agiDebuffStrength;
		} else if (paramId == 7){
			modifier = eval(lukDebuffEnemy[((formulaType == 0) ? 0 : -buffs)]) * this.lukDebuffStrength;
		}
		return modifier * this.debuffStrength;
	} else {
		return 1
	}
}
})();
//=============================================================================
// End of File
//=============================================================================
