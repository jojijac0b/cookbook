import { combineReducers } from 'redux'
import recipesReducer from './recipeReducer'

const rootReducer = combineReducers({
  recipes : recipesReducer
});

export default rootReducer
