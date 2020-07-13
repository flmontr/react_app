import React from 'react'

import './FormWizard.css'


class FormWizard extends React.Component{

  render(){
    const {infos} = this.props

    const FormComponent = this.props.infos.form; 
    
    return(      
      <div>
        <div className="container">
          <FormComponent infos={infos} />
        </div>
      </div>
    )
  }
}

export default FormWizard
