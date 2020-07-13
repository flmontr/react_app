import React from 'react'
import {Link} from 'react-router-dom'

import api from '../api'


class Make extends React.Component {
  state = {
    list: [],
    success: false,
    error: false
  }
  
  componentDidMount = async () => {
    try {
      let response = await api.get('/menu')

      this.setState({list: response.data, success: true})

    } catch (error) {
      this.setState({error: true})
    } 
  }

  renderList(){
    return this.state.list.map(item => {
      return(
        <div className="column">
          <div className="ui fluid card" key={item.id}>
            <Link to={`menu/id/${item.id}`} className="image">
              <img src={item.image} alt={item.description}/>
            </Link>
            <div className="content">
              <span className="header">
                {item.title}
              </span>
              <div className="meta">
                {item.description}
              </div>
            </div>
          </div>
        </div>
      )
    })

  }

  render(){    
    
    if(!this.state.success && !this.state.error){
      return(
        <div className="ui active centered inline loader" style={{marginTop: '5rem'}}/>
      )
    } 

    if(this.state.error){
      return(
        <div style={{display: 'flex'}} className="ui red message">
          <i style={{marginRight: '10px'}}className="material-icons">error</i>
          Algum erro ocorreu, por favor tente mais tarde
        </div>
      )
    } 

    return(
      <div>
        <h1 class="ui dividing center aligned header" style={{margin: '2em 8em', fontWeight: '800'}}>
          Menu
        </h1>
        <div className="ui three column grid" style={{marginTop: '5em'}}>
          {this.renderList()}
        </div>
      </div>
    )
  }

}

export default Make
