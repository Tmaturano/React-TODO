//Statefull component

import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {

  //default props in a statefull component (class)
  //is defined like this:
  //static defaultProps = {
  //};

  //proptype in a statefull component (class)
  //is defined like this:
  //static propTypes = {
    //someProp: PropTypes.string...
  //}

  // to use like this (without constructor), it was needed to install
  // the babel plugin: yarn add @babel/plugin-proposal-class-properties
  state = {
    newTech: '',
    techs: []
  };

  //Executed when the component is displayed on the screen
  componentDidMount() {
    //Example: if we need to call an API when the component is ready, we 
    //usually call from this method.
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }


  //Executed whenever there're updates on the props or state
  componentDidUpdate(prevProps, prevState) {
    // this.props, this.state
    //we can compare the this.props with prevProps
    //we can compare the this.state with prevState

    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  //Executed the whe component is destroyed
  componentWillUnmount() {
    
  }

  // functions in class components must be in arrow function, otherwise
  // we can't access the THIS (other class properties, functions, etc)
  handleInputChange = e => {
    this.setState({ newTech: e.target.value });

    //if we want to access a property, we could use this.props.propName
  }

  handleSubmit = e =>{
    e.preventDefault();
    
    // ... copy everything from the techs array
    this.setState({ 
      techs: [... this.state.techs, this.state.newTech],
      newTech: '' 
    });
  }

  //Functions that manipulate a state of a component should be in the same file
  //where the state exists.
  //we usually pass as a parameter to another component when needed.
  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  }

  //<> html content inside </> means Fragment. Fragments are useful if we don't
  //want to use a div to add more html elements(because react only accepts 1
  //html element)
  //technology in TechItem is a property (accessed from props.technology)
  //The arrow function at the onDelete property means that the function will not
  //be executed when the component renders (because a javascript function with
  //open and close parenthesis is executed whenever the render method is executed)
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem key={tech} 
            technology={tech} 
            onDelete={() => this.handleDelete(tech)} />)
          )}
        </ul>

        <input type="text" 
          onChange={this.handleInputChange} 
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default TechList;
