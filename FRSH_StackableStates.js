//=============================================================================
// FRSH_StackableStates
// FRSH_StackableStates.js
// Version: 1.0.2
//=============================================================================

var Imported = Imported || {};
Imported.StackStates = true;

var Frashaw = Frashaw || {};
Frashaw.StackStates = Frashaw.StackStates || {};

//============================================================================
/*:
* @author Frashaw27
* @plugindesc Allows States to pregress with each application.
*
* @param remove
* @text Progression Remove Type
* @type boolean
* @desc Choose if when you remove a state, does it remove all in the progression line or just itself.
* @on All
* @off Itself
* @default true
*
* @help
* ==Notetags==================================================================
* State Progression Line: <progression: >
* ===Introduction=============================================================
* In VX Ace, there was a plugin that allowed States to be amplified with
* each application of it. This is a little different as instead of taking 
* the states base effects and stacking the same values on top, this plugin
* instead takes the approach of allowing different state it to transform 
* into a different one automatically (and with no message that the
* previous one was removed).
* ===How to Use===============================================================
* In the desired progressive state, simply add in the above Notetag with
* each state id seperated by a comma (,). Don't add the state id of the
* state that has the progression line in it as it will automatically be
* added in by the plugin.
* After that, every application of the state will transform into the one
* next in the progression line until it hits the end.
* Removing a state with a progression line in it will also remove all states
* within that line to be removed, but this can be altered to just be itself.
* ===Change Log===============================================================
* Version 1.0.2 (04/06/23) :
* -Fixed Bug that caused Death State Buff and State Core Effects to not
* work
*
* Version 1.0.1 (03/04/23) :
* -Added Compatibilty to Yanfly Buff and State Core
*
* Version 1.0 (03/03/23) :
* -Finished Base Plugin
* ============================================================================
*/
//============================================================================

//The Meat & Potatoes
Game_Battler.prototype.addState = function(stateId) {
	//Checks to see if the progression line exists at all
	if ($dataStates[stateId].meta.progression != null){
		//For later loops
		var loop = 0;
		//Saves the meta value as an actual array instead of a string
		var array = arrayizer($dataStates[stateId].meta.progression);
		//Reverses array for easier coding
		array = array.reverse();
		//Adds the current state id to the end (start since it's the reversed of the normal one) of the current array 
		array.push(stateId);
		//Gets the array length
		var length = array.length;
		//Checks to see if the last state in the line is applied or not
		if (!this._states.includes(array[0])){
			//runs loop through all the various states in the line
			while (loop != length){
				//checks to see the state is the first one of the line to be applied or if the next one is already applied, allowing the state application if either is true
				if ((loop == length - 1 || this.isStateAffected(array[loop + 1]))){
					//sets the stateId variable incase any other plugins, like Yanfly Buff and States Core, uses it
					stateId = array[loop];
					//Checks to see if state is even addable to the target in the first place
					if (this.isStateAddable(stateId)) {
						//Removes the current variation of the state
						if (array[loop + 1] != null){
							//Special variation where the result isn't added to the battle log
							this.removeStateSilent(array[loop + 1])
						}
						//Normal stateAdd code
						if (!this.isStateAffected(stateId)) {
							this.addNewState(stateId);
							//Yanfly Buffs and States Core compability
							if (Imported.YEP_BuffsStatesCore){
								this.setStateOrigin(stateId);
								this.addStateEffects(stateId);
							};
							this.refresh();
						}
						this.resetStateCounts(stateId);
						this._result.pushAddedState(stateId);	
					}
					//Immediately breaks the loop so it doesn't continue
					break;
				}
				//goes to the next iteration/state
				loop++;
			}
		} else {
			//Fallback if the final state in line is already applied
			stateId = array[0];
			if (this.isStateAddable(stateId)) {
				if (!this.isStateAffected(stateId)) {
					this.addNewState(stateId);
					this.refresh();
				}
				this.resetStateCounts(stateId);
				this._result.pushAddedState(stateId);
			}
		}
	} else {
		//The normal addState code
		if (this.isStateAddable(stateId)) {
			if (!this.isStateAffected(stateId)) {
				this.addNewState(stateId);
				//Yanfly Buffs and States Core compability
				if (Imported.YEP_BuffsStatesCore){
					this.setStateOrigin(stateId);
					this.addStateEffects(stateId);
				};
				this.refresh();
			}
			this.resetStateCounts(stateId);
			this._result.pushAddedState(stateId);
		}
	}
};

Game_Battler.prototype.removeState = function(stateId) {
	//Checks to see if the progression line exists
	if ($dataStates[stateId].meta.progression != null){
		//gets the parameter value that the user set
		var bool = PluginManager.parameters('FRSH_StackableStates').remove;
		//gets an actual boolean out of it
		bool = eval(bool);
		//checks to see if type is the entire line (true) or just itself (false)
		if (bool){
			//For later looping
			var loop = 0;
			//Saves the meta value as an actual array instead of a string
			var array = arrayizer($dataStates[stateId].meta.progression);
			//Reverses array for easier coding
			array = array.reverse();
			//Adds the current state id to the end (start since it's the reversed of the normal one) of the current array 
			array.push(stateId);
			//Gets the array length
			var length = array.length;
			//Loops through the entire array, removing all the states
			while (loop != length){
				stateId = array[loop];
				if (this.isStateAffected(stateId)) {
					if (stateId === this.deathStateId()) {
						this.revive();
					}
					this.eraseState(stateId);
					//Yanfly Buffs and States Core compability
					if (Imported.YEP_BuffsStatesCore){
						this.removeStateEffects(stateId);
						this.clearStateOrigin(stateId);
					}
					this.refresh();
					this._result.pushRemovedState(stateId);
				}
				loop++;
			}
		} else {
			//fallback if state removal is made to be only itself
			if (this.isStateAffected(stateId)) {
				if (stateId === this.deathStateId()) {
					this.revive();
				}
				this.eraseState(stateId);
				//Yanfly Buffs and States Core compability
				if (Imported.YEP_BuffsStatesCore){
					this.removeStateEffects(stateId);
					this.clearStateOrigin(stateId);
				}
				this.refresh();
				this._result.pushRemovedState(stateId);
			}
		}
	} else {
		//Normal removeState code
		if (this.isStateAffected(stateId)) {
			if (stateId === this.deathStateId()) {
				this.revive();
			}
			this.eraseState(stateId);
			//Yanfly Buffs and States Core compability
			if (Imported.YEP_BuffsStatesCore){
				this.removeStateEffects(stateId);
				this.clearStateOrigin(stateId);
			}
			this.refresh();
			this._result.pushRemovedState(stateId);
		}
	}
};

//A special variation of removeState that doesn't show the state removed line in the battle log
Game_Battler.prototype.removeStateSilent = function(stateId) {
    if (this.isStateAffected(stateId)) {
        if (stateId === this.deathStateId()) {
            this.revive();
        }
        this.eraseState(stateId);
		//Yanfly Buffs and States Core compability
		if (Imported.YEP_BuffsStatesCore){
			this.removeStateEffects(stateId);
			this.clearStateOrigin(stateId);
		}
        this.refresh();
    }
};

//Allows the value to go back to array if the value is above 0 and is a number
function isPositive(yes){
	return yes > 0;
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

//=============================================================================
// End of File
//=============================================================================
