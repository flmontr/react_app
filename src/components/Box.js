import React from 'react'

import FormWizard from './FormWizard'


const Box = props => {  

  return(
    <div className="ui container">
      <div className="ui segment">
        <h2 className="ui header">
          <img src={props.boxInfo.icon} className="ui circular image" alt="icon"/>
          {props.boxInfo.title}
        </h2>
        <div className="ui section divider" style={{marginTop: '1rem'}}/>
        <FormWizard infos={props.infos}/>
      </div>
    </div>
  )
}

export default Box
