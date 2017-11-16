import React, { Component } from 'react';
import './App.css';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


/*
state= {
  recipes:[
  {
    id:'1',
    name:'risotto',
    ingredients:'',
    procedure:''
    picture:'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/24/2/BX0605H_easy-parmesan-risotto_s4x3.jpg.rend.hgtvcom.616.462.suffix/1406090695131.jpeg'
  },
],

}

*/
function addRecipe(name, ingredients, procedure, picture) {
  return {
    type: 'ADD_RECIPE',
    name: name,
    ingredients: ingredients,
    procedure: procedure,
    picture: picture,
  }
}

function deleteRecipe(recipeId) {
  return {
    type: 'DELETE_RECIPE',
    id: recipeId,
  }
}

function editRecipe(recipeId, newName, newIngredients, newProcedure, newPicture) {
  return {
    type: 'EDIT_RECIPE',
    id: recipeId,
    name: newName,
    ingredients: newIngredients,
    procedure: newProcedure,
    picture: newPicture,
  }
}

function changePhase(id) {
  return {
    type: 'CHANGE_PHASE',
    id: id,
  }
}

function editProcedure(recipeId, newProcedure) {
  return {
    type: 'EDIT_PROCEDURE',
    id: recipeId,
    procedure: newProcedure,
  }
}

function recipesReducer(state=[], action) {
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

const reducer = combineReducers({
  recipes: recipesReducer,
});

const initialState = (localStorage.getItem('recipes'))? JSON.parse(localStorage.getItem('recipes')) : {};

const store = createStore(reducer,initialState);
store.subscribe(() => {
  localStorage.setItem('recipes', JSON.stringify(store.getState()));
});
const App = () => (
  <div>
    <header><h1>CookBook</h1></header>
    <div className='main-content'>
        <div className='recipes'>
          <header><h2>Recipes</h2></header>
          <RecipesConn />
        </div>
        <div>
          <div className='addButton'>
            <header><h2>Add Recipe</h2></header>
            <ButtonConn />
          </div>
        </div>
    </div>
  </div>
)

class Recipes extends React.Component {
  state = {
    currentlyEditing: '',
    name: '',
    ingredients: '',
    procedure: '',
    picture: '',
  }

  onChange = (e) => {
    if(e.target.className === 'name'){
      this.setState({
        name: e.target.value,
      });
    }
    if(e.target.className === 'ingredients'){
      this.setState({
        ingredients: e.target.value,
      });
    }
    if(e.target.className === 'procedure'){
      this.setState({
        procedure: e.target.value,
      });
    }
    if(e.target.className === 'picture'){
      this.setState({
        picture: e.target.value,
      });
    }
  }

  handleSubmit = () => {
    this.props.editRecipe(this.state.currentlyEditing, this.state.name, this.state.ingredients, this.state.procedure, this.state.picture);
    this.setState({
      currentlyEditing: '',
      name: '',
      ingredients: '',
      procedure: '',
      picture: '',
    });
  }

  render() {
    const recipeList = this.props.recipes.map((r, index) => {
      if(r.beingEditted){
        return (
          <div key={index} className='recipe-block'>
            <ul>
              <li>Name: <input className='name' onChange={this.onChange} value={this.state.name}/></li>
              <li>Ingredients: <textarea className='ingredients' onChange={this.onChange} value={this.state.ingredients}/></li>
              <li>Procedure: <textarea className='procedure' onChange={this.onChange} value={this.state.procedure}/></li>
              <li>Picture: <input className='picture' onChange={this.onChange} value={this.state.picture}/></li>
              <li><img src={r.picture} /></li>
            </ul>
            <div className='block-buttons'>
              <button onClick={this.handleSubmit}>Submit</button>
              <button onClick={() => this.props.changePhase(r.id)}>Cancel</button>
            </div>
          </div>
        )
      }
      else{
        return (
            <div key={index} className='recipe-block'>
              <ul>
                <li>Name: {r.name}</li>
                <li>Ingredients: {r.ingredients}</li>
                <li>Procedure: {r.procedure}</li>
                <li><img src={r.picture} /></li>
              </ul>
              <div className='block-buttons'>
                <button onClick={() => {
                  this.props.changePhase(r.id);
                  this.setState({
                    currentlyEditing: r.id,
                    name: r.name,
                    ingredients: r.ingredients,
                    procedure: r.procedure,
                    picture: r.picture,
                  });
                }}>Edit</button>
                <button onClick={() => this.props.handleDelete(r.id)}>Delete</button>
              </div>
            </div>
        )
      }
    });
    return (
      <div className='recipe-display'>{recipeList}</div>
    )
  }
}

class ToggleableAddButton extends React.Component {
  state = {
    isButton: true,
    name: '',
    ingredients: '',
    procedure: '',
    picture: '',
  }

  toggleIsButton = () => {
    this.setState({
      isButton: !this.state.isButton,
      name: '',
      ingredients: '',
      procedure: '',
      picture: '',
    })
  }

  onChange = (e) =>{
    if(e.target.className === 'name'){
      this.setState({
        name: e.target.value,
      });
    }
    if(e.target.className === 'ingredients'){
      this.setState({
        ingredients: e.target.value,
      });
    }
    if(e.target.className === 'procedure'){
      this.setState({
        procedure: e.target.value,
      });
    }
    if(e.target.className === 'picture'){
      this.setState({
        picture: e.target.value,
      });
    }
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.name, this.state.ingredients, this.state.procedure, this.state.picture);
    this.setState({
      isButton: true,
      name: '',
      ingredients: '',
      procedure: '',
      picture: '',
    });
  }

  render() {
    if(this.state.isButton){
      return (
        <div><button onClick={this.toggleIsButton}>Add Recipe</button></div>
      )
    }
    else{
      return (
        <div>
          <div><input placeholder='Name' className='name' onChange={this.onChange} value={this.state.name}></input></div>
          <div><textarea placeholder='Ingredients' className='ingredients' onChange={this.onChange} value={this.state.ingredients}></textarea></div>
          <div><textarea placeholder='Procedure' className='procedure' onChange={this.onChange} value={this.state.procedure}></textarea></div>
          <div><input placeholder='Image URL' className='picture' onChange={this.onChange} value={this.state.picture}></input></div>
          <div><button onClick={this.handleSubmit}>Submit</button><button onClick={this.toggleIsButton}>Cancel</button></div>
        </div>
      )
    }
  }
}

const mapStateTo = (state) => (
  {
    recipes: state.recipes,
  }
)

const mapDispatchToButton = (dispatch) => (
  {
    handleSubmit: (name, ingredients, procedure, picture) =>  store.dispatch(addRecipe(name, ingredients, procedure, picture)),
  }
)
const mapDispatchToRecipe = (dispatch) => (
  {
    handleDelete: (id) => store.dispatch(deleteRecipe(id)),
    changePhase: (id) => store.dispatch(changePhase(id)),
    editRecipe: (id, name, ingredients, procedure, picture) => store.dispatch(editRecipe(id,name,ingredients,procedure,picture)),
  }
)

const ButtonConn = connect(mapStateTo, mapDispatchToButton)(ToggleableAddButton);
const RecipesConn = connect(mapStateTo, mapDispatchToRecipe)(Recipes);
const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default WrappedApp;
