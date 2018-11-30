import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRecipe } from '../store/actions/recipeActions'

class ToggleableAddButton extends Component {
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
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  isValid = () => {
    return !(this.state.name.length == 0 || this.state.ingredients.length == 0 || this.state.procedure.length == 0 || this.state.picture.length == 0)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(!this.isValid())
      alert("Please fill out entire form");
    else if(!this.isUrl(this.state.picture)){
      alert("Not a valid picture url")
    }
    else{
      this.props.handleSubmit(this.state.name, this.state.ingredients, this.state.procedure, this.state.picture);
      this.setState({
        isButton: true,
        name: '',
        ingredients: '',
        procedure: '',
        picture: '',
      });
    }
  }

  isUrl = (str) => {
    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  render() {
    if(this.state.isButton){
      return (
        <div>
          <button className="btn" onClick={this.toggleIsButton}>Add Recipe</button>
        </div>
      )
    }
    else{
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <input placeholder='Name' id='name' onChange={this.onChange} value={this.state.name}></input>
          </div>
          <div>
            <textarea className="materialize-textarea" placeholder='Ingredients' id='ingredients' onChange={this.onChange} value={this.state.ingredients}></textarea>
          </div>
          <div>
            <textarea className="materialize-textarea" placeholder='Procedure' id='procedure' onChange={this.onChange} value={this.state.procedure}></textarea>
          </div>
          <div>
            <input placeholder='Image URL' id='picture' onChange={this.onChange} value={this.state.picture}></input>
          </div>
          <div>
            <button className="btn" onClick={this.handleSubmit}>Submit</button>
            <button className="btn grey" onClick={this.toggleIsButton}>Cancel</button>
          </div>
        </form>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    handleSubmit: (name, ingredients, procedure, picture) =>  dispatch(addRecipe(name, ingredients, procedure, picture)),
  }
)

export default connect(null, mapDispatchToProps)(ToggleableAddButton)
