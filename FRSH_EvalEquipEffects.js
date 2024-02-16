//=============================================================================
// FRSH_EvalEquipEffects
// FRSH_EvalEquipEffects.js
// Version: 1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.EEEffects = true;

var Frashaw = Frashaw || {};
Frashaw.EEEffects = Frashaw.EEEffects || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Adds the battle evals to equipment, actors, and enemies.
*
* @help
* ==Notetages=================================================================
* Weapons, Armors, Actors, Enemies:
* <Custom Turn Start Effect></Custom Turn Start Effect> - Put code inbetween
* these to run at the start of all turns. Requires Yanfly Battle Core.
* <Custom Turn End Effect></Custom Turn End Effect> - Put code inbetween
* these to run at the end of all turns.
* <Custom Regenerate Effect></Custom Regenerate Effect> - Put code inbetween
* these to run when they regenerate hp, mp, and tp.
* <Custom Action Start Effect></Custom Action Start Effect> - Put code inbetween
* these to run at the start of the things actions.
* <Custom Action End Effect></Custom Action End Effect> - Put code inbetween
* these to run at the end of the things actions.
* <Custom Battle Effect></Custom Battle Effect> - Put code inbetween
* these to run when the battle starts.
* <Custom End Effect></Custom End Effect> - Put code inbetween
* these to run when the battle ends.
* <Custom Victory Effect></Custom Victory Effect> - Put code inbetween
* these to run when the battle is won. Enemies can't use these.
* <Custom Defeat Effect></Custom Defeat Effect> - Put code inbetween
* these to run when the battle is lost. Enemies can't use these.
* <Custom Escape Effect></Custom Escape Effect> - Put code inbetween
* these to run when the battle is escaped from. Enemies can't use these.
*
* Reference Effect Order:
* Initiate (User) -> Select (Target) -> Confirm (User) -> React (Target) ->
* Respond (Target) -> Establish (User) -> Deselect (Target) -> Conclude (User)
* 
* <Custom Initiate Effect></Custom Initiate Effect> - Occurs when user 
* starts their action.
* <Custom Select Effect></Custom Select Effect> - Occurs when the thing is
* targeted for the user's action.
* <Custom Confirm Effect></Custom Confirm Effect> - Occurs when the user's
* attack lands, but before damage is calculated.
* <Custom React Effect></Custom React Effect> - Occurs when the 
* attacker's attack lands, but before damage is calculated.
* <Custom Respond Effect></Custom Respond Effect> - Occurs when the user
* takes damage.
* <Custom Establish Effect></Custom Establish Effect> - Occurs when the target
* takes damage.
* <Custom Deselect Effect></Custom Deselect Effect> - Always run the user was
* targeted by the attacker.
* <Custom Conclude Effect></Custom Conclude Effect> - Always run when the 
* user's attack ends.
* ===Introduction=============================================================
* So I liked the way Yanfly made their states have these effects that could
* allow for very interesting things, but I didn't want to bog down my states
* list with 100s of passives states for this reason. So I made this plugin
* so that I could cut out the middle man and put them directly on the things
* themselves.
* ===How to Use===============================================================
* !!! ~~Requires Yanfly Buffs and States Core or This Won't Run~~ !!!
* !!! ~~Also Place This Underneath Yanfly Buffs and States Core~~ !!!
* Just put whatever you'd place in the states for the respective thing and
* it shouldn't work.
* ===Change Log===============================================================
* Version 1.1.0 (02/16/24) :
* -Added functionality for Enemies and Actors to have innate evals
*
* Version 1.0.1 (12/04/23) :
* -Removed apart of when you mess up code so it doesn't display the wrong thing
*
* Version 1.0 (01/11/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

//Checks to see if Buffs and States Core is in, doesn't run if not
if (Imported.YEP_BuffsStatesCore){
(function (){
//Preloads the weapons and armor for the evals
var FrshEEEffectsLoaded = false;
FrshEEffects_database = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!FrshEEffects_database.call(this)) return false; 
	if (FrshEEEffectsLoaded == false) {
		this.processEvalEquips($dataActors);
		this.processEvalEquips($dataClasses);
		this.processEvalEquips($dataWeapons);
		this.processEvalEquips($dataArmors);
		this.processEvalEquips($dataEnemies);
		FrshEEEffectsLoaded = true;
	}
	return true;
};

//Sets said evals
DataManager.processEvalEquips = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		//Sets the evals to blank strings so that they don't crash if there's nothing there and they're called
		obj.equipEffectEval = {};
		obj.equipEffectEval['turnStartState'] = '';
		obj.equipEffectEval['turnEndState'] = '';
		obj.equipEffectEval['regenerateState'] = '';
		obj.equipEffectEval['selectState'] = '';
		obj.equipEffectEval['deselectState'] = '';
		obj.equipEffectEval['reactState'] = '';
		obj.equipEffectEval['respondState'] = '';
		obj.equipEffectEval['initiateState'] = '';
		obj.equipEffectEval['concludeState'] = '';
		obj.equipEffectEval['confirmState'] = '';
		obj.equipEffectEval['establishState'] = '';
		obj.equipEffectEval['actionStartState'] = '';
		obj.equipEffectEval['actionEndState'] = '';
		obj.equipEffectEval['battle'] = '';
		obj.equipEffectEval['end'] = '';
		obj.equipEffectEval['victory'] = '';
		obj.equipEffectEval['defeat'] = '';
		obj.equipEffectEval['escape'] = '';
		var evalMode = 'none';
		var evalType = 'none';

		//Goes through the lines of all the note tag to see what they can gather
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			//Checks to see if the words 'custom' and 'effect' are in the notetage line to see what type they should be adding the eval lines to 
			if (line.match(/<CUSTOM[ ](.*)[ ]EFFECT>/i)) {
				var name = String(RegExp.$1).toUpperCase();
				evalMode = 'custom state effect';
				if (['TURN START', 'BEGIN'].contains(name)) {
				  evalType = 'turnStartState';
				} else if (['TURN END', 'CLOSE'].contains(name)) {
				  evalType = 'turnEndState';
				} else if (['REGENERATE', 'REGEN', 'WHILE'].contains(name)) {
				  evalType = 'regenerateState';
				} else if (['SELECT', 'ONTARGET'].contains(name)) {
				  evalType = 'selectState';
				} else if (['DESELECT', 'OFFTARGET'].contains(name)) {
				  evalType = 'deselectState';
				} else if (['REACT', 'REACTION'].contains(name)) {
				  evalType = 'reactState';
				} else if (['RESPOND', 'RESPONSE'].contains(name)) {
				  evalType = 'respondState';
				} else if (['INITIATE', 'ONAPPLY'].contains(name)) {
				  evalType = 'initiateState';
				} else if (['CONFIRM', 'PREDAMAGE', 'PRE-DAMAGE'].contains(name)) {
				  evalType = 'confirmState';
				} else if (['ESTABLISH', 'POSTDAMAGE', 'POST-DAMAGE'].contains(name)) {
				  evalType = 'establishState';
				} else if (['CONCLUDE', 'OFFAPPLY'].contains(name)) {
				  evalType = 'concludeState';
				} else if (['ACTION START', 'START'].contains(name)) {
				  evalType = 'actionStartState';
				} else if (['ACTION END', 'FINISH'].contains(name)) {
				  evalType = 'actionEndState';
				} else if (['BATTLE', 'BATTLE START'].contains(name)) {
				  evalType = 'battle';
				} else if (['END', 'BATTLE END'].contains(name)) {
				  evalType = 'end';
				} else if (['VICTORY', 'BATTLE VICTORY'].contains(name)) {
				  evalType = 'victory';
				} else if (['DEFEAT', 'BATTLE DEFEAT'].contains(name)) {
				  evalType = 'defeat';
				} else if (['ESCAPE', 'BATTLE ESCAPE'].contains(name)) {
				  evalType = 'escape';
				}
			//Ends the eval adding
			} else if (line.match(/<\/CUSTOM[ ](.*)[ ]EFFECT>/i)) {
				evalMode = 'none';
				evalType = 'none';
			//Adds the lines to the eval to be ran
			} else if (evalMode === 'custom state effect') {
				obj.equipEffectEval[evalType] = obj.equipEffectEval[evalType] +
				line + '\n';
			}
		}
	}
};

//A function to run the eval of a eval with no damage values
Game_Battler.prototype.noTargetEval = function(target, code) {
    if (code == '') return;
    var attacker = this;
    var defender = this;
    var a = this;
    var b = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code,
        'CUSTOM EQUIP CODE ERROR');
    }
    return;
};

//Runs the turn start evals
Frsh_EEEffects_onTurnStartStateEffects = Game_Battler.prototype.onTurnStartStateEffects;
Game_Battler.prototype.onTurnStartStateEffects = function() {
    Frsh_EEEffects_onTurnStartStateEffects.call(this);
	if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['turnStartState']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['turnStartState']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['turnStartState']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['turnStartState']);
	}
};

//Runs the turn end evals
Frsh_EEEffects_onTurnEndStateEffects = Game_Battler.prototype.onTurnEndStateEffects;
Game_Battler.prototype.onTurnEndStateEffects = function() {
    Frsh_EEEffects_onTurnEndStateEffects.call(this);
	if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['turnEndState']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['turnEndState']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['turnEndState']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['turnEndState']);
	}
};

//Runs the regenerate evals
Frsh_EEEffects_onRegenerateStateEffects = Game_Battler.prototype.onRegenerateStateEffects;
Game_Battler.prototype.onRegenerateStateEffects = function() {
    Frsh_EEEffects_onRegenerateStateEffects.call(this);
	if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['regenerateState']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['regenerateState']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['regenerateState']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['regenerateState']);
	}
};

//Runs the action start evals
Frsh_EEEffects_onActionStartStateEffects = Game_Battler.prototype.onActionStartStateEffects;
Game_Battler.prototype.onActionStartStateEffects = function() {
    Frsh_EEEffects_onActionStartStateEffects.call(this);
	if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['actionStartState']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['actionStartState']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['actionStartState']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['actionStartState']);
	}
};

//Runs the action end evals
Frsh_EEEffects_onActionEndStateEffects = Game_Battler.prototype.onActionEndStateEffects;
Game_Battler.prototype.onActionEndStateEffects = function() {
    Frsh_EEEffects_onActionEndStateEffects.call(this);
	if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['actionEndState']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['actionEndState']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['actionEndState']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['actionEndState']);
	}
};

//Runs the battle start evals 
Frsh_EEEffects_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Frsh_EEEffects_onBattleStart.call(this);
    if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['battle']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['battle']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['battle']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['battle']);
	}
};

//Runs the battle end evals
Frsh_EEEffects_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    Frsh_EEEffects_onBattleEnd.call(this);
	if (this.isActor()){
		this.noTargetEval(this, $dataActors[this._actorId].equipEffectEval['end']);
		this.noTargetEval(this, $dataClasses[this._classId].equipEffectEval['end']);
		for (var loop = 0; loop != this.equips().length; loop++){
			var equip = this.equips()[loop];
			if (equip == null) continue;
			this.noTargetEval(this, equip.equipEffectEval['end']);
		}
	} else if (this.isEnemy()){
		this.noTargetEval(this, $dataEnemies[this._enemyId].equipEffectEval['end']);
	}
};

//Runs the specific defeat, victory, or escape evals
Frsh_EEEffects_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	var term = '';
    if (result === 0) {
      term = 'victory';
    } else if (result === 1) {
      term = 'escape';
    } else if (result === 2) {
      term = 'defeat';
    }
	for (var pool = 0; pool != $gameParty.members().length; pool++){
		var user = $gameParty.members()[pool];
		user.noTargetEval(user, $dataActors[user._actorId].equipEffectEval[term]);
		user.noTargetEval(user, $dataClasses[user._classId].equipEffectEval[term]);
		for (var loop = 0; loop != user.equips().length; loop++){
			var equip = user.equips()[loop];
			if (equip == null) continue;
			user.noTargetEval(user, equip.equipEffectEval[term]);
		}
	}
    Frsh_EEEffects_endBattle.call(this, result);
};

//A variant of the eval runner that uses damage values
Game_Battler.prototype.targetEval = function(target, value, code) {
    if (code == '') return value;
    var attacker = this;
    var defender = target;
    var a = this;
    var b = target;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code,
        'CUSTOM EQUIP CODE ERROR');
    }
    return value;
};

//Runs the initiate evals
Game_Action.prototype.onApplyStateEffects = function(target) {
	if (this.subject().isActor()){
		this.subject().noTargetEval(target, $dataActors[this.subject()._actorId].equipEffectEval['initiateState']);
		this.subject().noTargetEval(target, $dataClasses[this.subject()._classId].equipEffectEval['initiateState']);
		for (var loop = 0; loop != this.subject().equips().length; loop++){
			var equip = this.subject().equips()[loop];
			if (equip == null) continue;
			this.subject().noTargetEval(target, equip.equipEffectEval['initiateState']);
		}
	} else if (this.subject().isEnemy()){
		this.subject().noTargetEval(target, $dataEnemies[this.subject()._enemyId].equipEffectEval['initiateState']);
	}
    var states = this.subject().states();
    var length = this.subject().states().length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      this.initiateStateEffects(target, state.id)
    }
};

//Runs the on select evals
Game_Action.prototype.onSelectStateEffects = function(target) {
	if (target.isActor()){
		this.subject().noTargetEval(target, $dataActors[target._actorId].equipEffectEval['selectState']);
		this.subject().noTargetEval(target, $dataClasses[target._classId].equipEffectEval['selectState']);
		for (var loop = 0; loop != target.equips().length; loop++){
			var equip = target.equips()[loop];
			if (equip == null) continue;
			this.subject().noTargetEval(target, equip.equipEffectEval['selectState']);
		}
	} else if (target.isEnemy()){
		this.subject().noTargetEval(target, $dataEnemies[target._enemyId].equipEffectEval['selectState']);
	}
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      this.selectStateEffects(target, state.id)
    }
};

//Runs the deselect evals
Game_Action.prototype.onDeselectStateEffects = function(target) {
	if (target.isActor()){
		this.subject().noTargetEval(target, $dataActors[target._actorId].equipEffectEval['deselectState']);
		this.subject().noTargetEval(target, $dataClasses[target._classId].equipEffectEval['deselectState']);
		for (var loop = 0; loop != target.equips().length; loop++){
			var equip = target.equips()[loop];
			if (equip == null) continue;
			this.subject().noTargetEval(target, equip.equipEffectEval['deselectState']);
		}
	} else if (target.isEnemy()){
		this.subject().noTargetEval(target, $dataEnemies[target._enemyId].equipEffectEval['deselectState']);
	}
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      this.deselectStateEffects(target, state.id)
    }
};

//Runs the conclude evals
Game_Action.prototype.offApplyStateEffects = function(target) {
	if (this.subject().isActor()){
		this.subject().noTargetEval(target, $dataActors[this.subject()._actorId].equipEffectEval['concludeState']);
		this.subject().noTargetEval(target, $dataClasses[this.subject()._classId].equipEffectEval['concludeState']);
		for (var loop = 0; loop != this.subject().equips().length; loop++){
			var equip = this.subject().equips()[loop];
			if (equip == null) continue;
			this.subject().noTargetEval(target, equip.equipEffectEval['concludeState']);
		}
	} else if (this.subject().isEnemy()){
		this.subject().noTargetEval(target, $dataEnemies[this.subject()._enemyId].equipEffectEval['concludeState']);
	}
    var states = this.subject().states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      this.concludeStateEffects(target, state.id)
    }
};

//Runs the confirm evals
Game_Action.prototype.onPreDamageStateEffects = function(target, value) {
	if (this.subject().isActor()){
		value = this.subject().targetEval(target, value, $dataActors[this.subject()._actorId].equipEffectEval['confirmState']);
		value = this.subject().targetEval(target, value, $dataClasses[this.subject()._classId].equipEffectEval['confirmState']);
		for (var loop = 0; loop != this.subject().equips().length; loop++){
			var equip = this.subject().equips()[loop];
			if (equip == null) continue;
			value = this.subject().targetEval(target, value, equip.equipEffectEval['confirmState']);
		}
	} else if (this.subject().isEnemy()){
		value = this.subject().targetEval(target, value, $dataEnemies[this.subject()._enemyId].equipEffectEval['confirmState']);
	}
    var states = this.subject().states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      value = this.confirmStateEffects(target, state.id, value);
    }
    return value;
};

//Runs the react evals
Game_Action.prototype.onReactStateEffects = function(target, value) {
	if (target.isActor()){
		value = this.subject().targetEval(target, value, $dataActors[target._actorId].equipEffectEval['reactState']);
		value = this.subject().targetEval(target, value, $dataClasses[target._classId].equipEffectEval['reactState']);
		for (var loop = 0; loop != target.equips().length; loop++){
			var equip = target.equips()[loop];
			if (equip == null) continue;
			value = this.subject().targetEval(target, value, equip.equipEffectEval['reactState']);
		}
	} else if (target.isEnemy()){
		value = this.subject().targetEval(target, value, $dataEnemies[target._enemyId].equipEffectEval['reactState']);
	}
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      value = this.reactStateEffects(target, state.id, value);
    }
    return value;
};

//Runs the respond evals
Game_Action.prototype.onRespondStateEffects = function(target, value) {
	if (target.isActor()){
		value = this.subject().targetEval(target, value, $dataActors[target._actorId].equipEffectEval['respondState']);
		value = this.subject().targetEval(target, value, $dataClasses[target._classId].equipEffectEval['respondState']);
		for (var loop = 0; loop != target.equips().length; loop++){
			var equip = target.equips()[loop];
			if (equip == null) continue;
			value = this.subject().targetEval(target, value, equip.equipEffectEval['respondState']);
		}
	} else if (target.isEnemy()){
		value = this.subject().targetEval(target, value, $dataEnemies[target._enemyId].equipEffectEval['respondState']);
	}
    var states = target.states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      value = this.respondStateEffects(target, state.id, value);
    }
    return value;
};

//Runs the establish evals
Game_Action.prototype.onPostDamageStateEffects = function(target, value) {
	if (this.subject().isActor()){
		value = this.subject().targetEval(target, value, $dataActors[this.subject()._actorId].equipEffectEval['establishState']);
		value = this.subject().targetEval(target, value, $dataClasses[this.subject()._classId].equipEffectEval['establishState']);
		for (var loop = 0; loop != this.subject().equips().length; loop++){
			var equip = this.subject().equips()[loop];
			if (equip == null) continue;
			value = this.subject().targetEval(target, value, equip.equipEffectEval['establishState']);
		}
	} else if (this.subject().isEnemy()){
		value = this.subject().targetEval(target, value, $dataEnemies[this.subject()._enemyId].equipEffectEval['establishState']);
	}
    var states = this.subject().states();
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (!state) continue;
      value = this.establishStateEffects(target, state.id, value);
    }
    return value;
};
})();
}
//=============================================================================
// End of File
//=============================================================================
