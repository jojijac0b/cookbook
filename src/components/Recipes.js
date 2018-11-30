import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteRecipe, changePhase, editRecipe } from '../store/actions/recipeActions'

class Recipes extends Component {
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

  handleEdit = (id, name, ingredients, procedure, picture) => {
    this.props.changePhase(id);
    this.setState({
      currentlyEditing: id,
      name: name,
      ingredients: ingredients,
      procedure: procedure,
      picture: picture,
    });
  }

  handleDelete = (id) => {
    this.props.handleDelete(id)
  }

  render() {
    const recipeList = this.props.recipes.map((r, index) => {
      if(r.beingEditted){
        return (
          <div key={index} className='recipe-block container'>
            <ul>
              <li>Name: <input className='name' onChange={this.onChange} value={this.state.name}/></li>
              <li>Ingredients: <textarea className='ingredients' onChange={this.onChange} value={this.state.ingredients}/></li>
              <li>Procedure: <textarea className='procedure' onChange={this.onChange} value={this.state.procedure}/></li>
              <li>Picture: <input className='picture' onChange={this.onChange} value={this.state.picture}/></li>
              <li><img src={r.picture} /></li>
            </ul>
            <div className='block-buttons'>
              <button className="btn" onClick={this.handleSubmit}>Submit</button>
              <button className="btn grey" onClick={() => this.props.changePhase(r.id)}>Cancel</button>
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
                <button className="btn" onClick={() => this.handleEdit(r.id, r.name, r.ingredients, r.procedure, r.picture)}>Edit</button>
                <button className="btn red" onClick={() => this.handleDelete(r.id)}>Delete</button>
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

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    handleDelete: (id) => dispatch(deleteRecipe(id)),
    changePhase: (id) => dispatch(changePhase(id)),
    editRecipe: (id, name, ingredients, procedure, picture) => dispatch(editRecipe(id,name,ingredients,procedure,picture)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
