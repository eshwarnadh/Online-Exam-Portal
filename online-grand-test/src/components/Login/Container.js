import React, { Component } from 'react'
import Presentation from './Presentation'
import { ACTIONS } from '../../store/actionTypes'
import { Store } from '../../store/data'
import firebase from '../../firebase_config'
import { withRouter } from 'react-router-dom'
export class Container extends Component {
    state = {
        email:"",
        password:""
    }

    static contextType = Store

    componentDidMount(){
        const [ state, dispatch ] = this.context
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                user.getIdTokenResult().then(tokenResult => {
                    
                    dispatch({
                        type : ACTIONS.CHECK_AUTH,
                        payload : true
                    })
                    dispatch({
                        type : ACTIONS.SET_USER,
                        payload : {
                            userUID : user.uid,
                            userId : user.email,
                            role : tokenResult.claims.role
                        }
                    })
                })
            }
            else{
                dispatch({
                    type : ACTIONS.CHECK_AUTH,
                    payload : false
                })
      
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onLogin = (e) => {
        e.preventDefault()
        const [ state, dispatch ] = this.context
        const { email, password } = this.state
        dispatch({
            type:ACTIONS.LOGIN,
            payload:{
                email:email,
                password:password
            }
        })
    }
    render() {
        return (
            <div>
                <Presentation 
                    handleChange = {this.handleChange}
                    onLogin = {this.onLogin}
                />
            </div>
        )
    }
}

export default Container
