import uuid from 'uuid'

const initState = []


const recipeReducer = (state = initState, action) => {
  if(action.type === 'ADD_RECIPE'){
    const newRecipe = {
      id: uuid.v4(),
      name: action.name,
      ingredients: action.ingredients,
      procedure: action.procedure,
      picture: action.picture,
      beingEditted: false,
    }
    return state.concat(newRecipe);
  }
  if(action.type === 'DELETE_RECIPE'){
    return state.filter(r => (r.id !== action.id));
  }
  if(action.type === 'CHANGE_PHASE'){
    const newState = state.map(s => {
      return {
        ...s,
        beingEditted: false,
      }
    })

    const oldRecipeIndex = state.findIndex(r => r.id === action.id);

    const oldRecipe = state[oldRecipeIndex];
    const newRecipe = {
      ...oldRecipe,
      beingEditted: !oldRecipe.beingEditted,
    }
    return [
      ...newState.slice(0, oldRecipeIndex),
      newRecipe,
      ...newState.slice(oldRecipeIndex+1, state.length),
    ]
  }
  if(action.type === 'EDIT_RECIPE'){
    const oldRecipeIndex = state.findIndex(r => r.id === action.id);
    const oldRecipe = state[oldRecipeIndex];
    const newRecipe = {
      ...oldRecipe,
      name: action.name,
      ingredients: action.ingredients,
      procedure: action.procedure,
      picture: action.picture,
      beingEditted: false,
    }
    return [
      ...state.slice(0, oldRecipeIndex),
      newRecipe,
      ...state.slice(oldRecipeIndex+1, state.length),
    ]
  }
  return state;
}

export default recipeReducer
