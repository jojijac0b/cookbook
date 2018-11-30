export const addRecipe = (name, ingredients, procedure, picture) => {
  return {
    type: 'ADD_RECIPE',
    name: name,
    ingredients: ingredients,
    procedure: procedure,
    picture: picture,
  }
}

export const deleteRecipe = (recipeId) => {
  return {
    type: 'DELETE_RECIPE',
    id: recipeId,
  }
}

export const editRecipe = (recipeId, newName, newIngredients, newProcedure, newPicture) => {
  return {
    type: 'EDIT_RECIPE',
    id: recipeId,
    name: newName,
    ingredients: newIngredients,
    procedure: newProcedure,
    picture: newPicture,
  }
}

export const changePhase = (id) => {
  return {
    type: 'CHANGE_PHASE',
    id: id,
  }
}

export const editProcedure = (recipeId, newProcedure) => {
  return {
    type: 'EDIT_PROCEDURE',
    id: recipeId,
    procedure: newProcedure,
  }
}
