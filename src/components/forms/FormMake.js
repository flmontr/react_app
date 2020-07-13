import React from 'react'
import {Link} from 'react-router-dom'

import api from '../../api'

import './FormMake.css'

class FormMake extends React.Component{
    state = {
      currentStep: 1,
      selectedType: '',
      selectedSize: '',
      selectedFlavor: '',
      selectedExtras: [],
      choseRecomendation: false,
      successCreate: false,
      errorCreate: false,
      validationError: false
    }

  
    renderTypesOptions(){
  
      return this.props.infos.types.map(option => {
        return(
          <div className="field" key={option.id}>
            <div className="ui radio checkbox">
              <input  
                type="radio" 
                value={option.id} 
                checked={this.state.selectedType == option.id}
                onChange={event => this.setState({selectedType: event.target.value})}
              />
              <label className={`${this.state.validationError ? 'error' : ''}`}>{option.desc}</label>
            </div>
          </div>
        )
      })
    }
  
    renderSizesOptions(){
  
      return this.props.infos.sizes.map(option => {
        return(
          <div className="field" key={option.id}>
            <div className="ui radio checkbox">
              <input 
                type="radio" 
                value={option.id} 
                checked={this.state.selectedSize == option.id} 
                onChange={event => this.setState({selectedSize: event.target.value})} 
              />
              <label className={`${this.state.validationError ? 'error' : ''}`}>{option.desc}</label>
            </div>
          </div>
        )
      })
    }

    renderSelect(){
      return this.props.infos.flavors.map(option => {
        return <option key={option.id} value={option.id}>{option.desc}</option>
      })
    }

    handleChangeExtras(event, option){

      const {checked} = event.target
      const {selectedExtras} = this.state
      
      if(checked){
        this.setState({selectedExtras: [...selectedExtras, option]})
  
      } else {
        this.setState({
          selectedExtras: selectedExtras.filter(el => option.id != el.id)
        })
      }
    
    }
    
    isOptionSelected(id) {        
      return this.state.selectedExtras.some(option => {
        return option.id == id
      })
    }

    renderOptionsExtras(){

      const {extras} = this.props.infos;
  
      return extras.map(option => {
        return(
          <div className="field" style={{marginRight: '2em'}} key={option.id}>
            <div className="ui checkbox">
              <input 
                type="checkbox" 
                name={option.desc}
                checked={this.isOptionSelected(option.id)}
                onChange={(event) => this.handleChangeExtras(event, option)}
              />
              <label>{option.desc}</label>
            </div>
          </div>
        )
      })
    }

    throwError(){
      this.setState({validationError: true})
    }

    handleNavigation(next){
      const {
        currentStep,
        selectedType,
        selectedSize,
        selectedFlavor,
      } = this.state

      const {steps} = this.props.infos

      this.setState({validationError: false})
      

      //Input validation
      if(next && currentStep == 1 && !selectedType || !selectedSize){
        this.throwError()
        return
      }
      
        
      if(next && currentStep == 2 && !selectedFlavor){
        this.throwError()
        return
      }

 
      if(currentStep <= 1 && !next || currentStep == steps && next) return
  
      const step = next ? currentStep + 1 : currentStep - 1
    
      this.setState({currentStep: step})
    }

    renderButtons(){
      const {currentStep} = this.state
      const {infos} = this.props

      return(      
        <div className="buttons">
          <button
            style={{
              display: `${currentStep == infos.steps ? 'none' : 'block'}`,
              backgroundColor: '#006491',
              color:'white'
            }}
            onClick={() => this.handleNavigation(true)} 
            className="ui right floated compact icon button">
            <i className="right arrow icon"></i>
          </button>
          <button
            style={{
              display: `${currentStep == infos.steps ? 'block' : 'none'}`,
              backgroundColor: '#006491',
              color:'white'
            }}
            onClick={() => this.onFormSubmit()} 
            className="ui right floated compact icon button">
              Enviar
          </button>
          <button
            style={{
              display: `${currentStep <= 1 ? 'none' : 'block'}`,
              backgroundColor: '#e31b36',
              color:'white'
            }}
            onClick={() => this.handleNavigation(false)} 
            className="ui right floated compact icon button">
            <i className="left arrow icon"></i>
          </button>
        </div>
      )
    }

    onFormSubmit = async() => {

      const {selectedType, selectedSize, selectedFlavor, selectedExtras} = this.state

      const order = {
        selectedType, 
        selectedSize, 
        selectedFlavor, 
        selectedExtras
      }

      try {
        const response = await api.post('/orders', order)
        
        if(response.status == 201) this.setState({successCreate: true})

      } catch (error) {
        this.setState({errorCreate: true})
      }

    }
    
    renderStep1(){
      return(      
        <>
          <form className="ui form form-type">
          <div>
              <div className="field title">
                Escolha o tipo da massa
              </div>
              {this.renderTypesOptions()}
          </div>
          <div>
              <div className="field title">
                Escolha o tamanho
              </div>
              {this.renderSizesOptions()}
          </div>
          <div>
            <div className="check" data-tooltip={`Receba pontos de benefícios`} data-position="top center">
            <div className="field title">
              Confira a recomendação do dia
            </div>
                <div className="ui checkbox">
                <input 
                    type="checkbox" 
                    name="recomendation"
                    checked={this.state.choseRecomendation} 
                    onChange={event => this.setState({choseRecomendation: event.target.checked})}
                />
                
                <label>{this.props.infos.recomendation.desc}</label>
                </div>
            </div>
          </div>
          </form>
          <div>
            {this.renderButtons()} 
          </div>
          <div className="flex">
            <div className="ui compact positive message" 
              style={{
                marginLeft: '1.5em', 
                maxWidth: '35em', 
                display: `${this.state.choseRecomendation ? 'block' : 'none'}`
              }}
            >
              <div className="header">
                {this.props.infos.recomendation.message}
              </div>
                {this.props.infos.recomendation.obs}
            </div>
          </div>
        </>
        )
    }

    renderStep2(){
      return(    
        <>
          <div>
            <form className="ui form">
            <div className="field title">
                Escolha os sabores:
            </div>
            <div className="ui selection select-field">
                <select 
                  className="ui dropdown" 
                  value={this.state.selectedFlavor} 
                  onChange={event => this.setState({selectedFlavor: event.target.value})}
                  style={this.state.validationError ? {border: '1px solid red'} : {}}
                >
                <option value=""></option>
                {this.renderSelect()}
                </select>
            </div>
            </form>
          </div>
          {this.renderButtons()}
        </>
      )
    }

    renderStep3(){
      return(
        <>
          <div>
            <form className="ui form">
              <div className="field title">
                Escolha as opções extras:
              </div>
              <div className="options">
                {this.renderOptionsExtras()}
              </div>
            </form>
          </div>
          {this.renderButtons()}
        </>
      )
    }

    renderErrorCreate(){
      return(
        <>
          <div style={{display: 'flex'}} className="ui red message">
            <i style={{marginRight: '10px'}}className="material-icons">error</i>
            Algum erro ocorreu, por favor tente mais tarde
          </div>
          <button
            onClick={() => this.setState({currentStep: 1, errorCreate: false})}
            style={{
              backgroundColor: '#006491',
              color:'white'
            }}
            className="ui right floated compact icon button">
              Ok
          </button>
      </>
      )
    }

    renderSuccessCreate(){
      return(
        <>
          <div style={{display: 'flex'}} className="ui green message">
            <i style={{marginRight: '10px'}}className="material-icons">check_circle_outline</i>
            Pedido criado com sucesso
          </div>
          <Link
            to='/'
            style={{
              backgroundColor: '#006491',
              color:'white'
            }}
            className="ui right floated compact icon button">
              Ok
          </Link>
        </>
      )
    }
  
    render(){

      if(this.state.errorCreate)
        return this.renderErrorCreate()

      if(!this.state.errorCreate && this.state.successCreate)
        return this.renderSuccessCreate()

      
      switch (this.state.currentStep) {
        case 1:
          return this.renderStep1()
        case 2:
          return this.renderStep2()
        case 3:
          return this.renderStep3()
      
        default:
          break;
      }
  
    }
}

export default FormMake
