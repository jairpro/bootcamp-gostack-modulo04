import React, { Component } from 'react';
import TechItem from './TechItem';
// import PropTypes from 'prop-types';

class TechList extends Component {
  /*
  static defaultProps = {
    tech3: 'Oculto3'
  }
  */
  /*
  static propTypes = {
    tech3: PropTypes.string,
    onDelete: PropTypes.func.isRequired
  }
  */

  state = {
    newTech: '',
    techs: [],
    /*
    techs: [
      'Node.js',
      'ReactJS',
      'React Native'
    ]
    */
  };

  handleInputChange = e => {
    // console.log(e.target.value);
    this.setState({ newTech: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    // console.log(this.state.newTech);

    this.setState({ 
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });

    // document.getElementsByTagName("INPUT")[0].value = "";
  }

  handleDelete = (tech) => {
    this.setState({
      techs: this.state.techs.filter(t => t !== tech)
    });
  }

  // Executado assim que o componente aparece em tela
  componentDidMount() {
    // this.setState({techs: []});
    const techs = JSON.parse(localStorage.getItem('techs'));
    if (techs) {
      this.setState({techs: techs})
    }
  }

  // Executado sempre que houver alterações nas props ou estado
  //componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(_, prevState) {
    // this.props
    // this.state
    console.log("componentDidUpdate");
    if (this.state.techs !== prevState.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
      console.log("save: "+this.state.techs);
    }
  }

  // Executado quando o componente deixa de existir
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    //console.log(this.state);
    
    return (
      /*
      <ul onMouseMove={e => {
        this.setState({
          newTech: e.clientX
        })
      }}>
        <li>Node.js</li>
        <li>ReactJS</li>
        <li>React Native</li>
      </ul>
      */
      // <h1>{this.state.newTech}</h1>
      // <h1>{tech2}</h1>
      // <h1>{tech3}</h1>
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => 
            <TechItem
              key={tech}
              tech={tech}
              onDelete={()=>this.handleDelete(tech)}
            />
            /*
            <TechItem
              key={tech}
              tech={tech}
              onDelete={this.handleDelete}
            />
            */
          )}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
      // <TechItem onDelete={()=>this.handleDelete(TechItem.defaultProps.tech)}/>
      // <TechItem tech="ExpressJS"onDelete={()=>this.handleDelete("ExpressJS")}/>
    );
  }
}

/*
TechList.defaultProps = {
  tech2: 'Oculto2'
}
*/

export default TechList;