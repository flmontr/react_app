import React from 'react'

import api from '../api'
import Box from './Box'

import FormMake from './forms/FormMake'


class Make extends React.Component {
  state = {
    success: false,
    error: false
  }
  
  componentDidMount = async () => {
    const form = FormMake;    

    try {
      let response = await api.get('/infos')      

      const [recomendation, types, sizes, flavors, extras] = response.data

      const infos = {
        ...recomendation,
        ...types,
        ...sizes,
        ...flavors,
        ...extras,
        form,
        steps: 3
      }

      this.setState({infos, success: true})

    } catch (error) {
      this.setState({error: true})
    }
    
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
      <Box boxInfo={{title: 'Monte sua pizza', icon: '/images/love-pizza.jpg'}} infos={this.state.infos} />
    )
  }

}

export default Make
