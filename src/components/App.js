import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Navbar from './Navbar'
import Make from './Make'
import List from './List'

import 'typeface-roboto';
import './App.css'



class App extends React.Component{

  render(){

    return(
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <div style={{height: '55vh'}}/>
          <div className="app-section">
            <Switch>
              <Route path='/' exact component={List}/>
              <Route path='/make' exact component={Make}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
