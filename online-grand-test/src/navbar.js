import React, { Component } from 'react'
import Main from './Main'
import firebase from './firebase_config'
import { Store } from './store/data'
import { ACTIONS } from './store/actionTypes'
import Axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
class navbar extends Component {
    state = {
        user : ""
    }
    static contextType = Store
    componentDidMount(){
        const [ state, dispatch ] = this.context
        
        console.log("mounted")
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                user.getIdTokenResult().then(tokenResult => {
                    localStorage.setItem('role',tokenResult.claims.role)
                    dispatch({
                        type : ACTIONS.CHECK_AUTH,
                        payload : true
                    })
                    dispatch({
                        type : ACTIONS.SET_USER,
                        payload : {
                            userUID : user.uid,
                            userId : user.email,
                            role : tokenResult.claims.role,
                        }
                    })
                    this.setState({user : user.email})

                    
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
    render() {
        const [ state, dispatch ] = this.context
        return (
            <div>
                <Router>
                 <div>
                <nav class="border fixed split-nav">
                <div class="nav-brand">
                    <h3>Exam portal</h3>
                </div>
                <div class="collapsible">
                    <input id="collapsible1" type="checkbox" name="collapsible1" />
                    <button>
                    <label for="collapsible1">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </label>
                    </button>
                    <div class="collapsible-body">
                        {
                        state.isLoggedIn ? 
                    <ul class="inline">
                        
                        <li>{this.state.user} </li>
                        <li><button onClick={() => {
                            if(window.confirm("Are you sure you want to logout?"))
                           { 
                            firebase.auth().signOut()
                            .then(()=>{
                            dispatch({
                                type:ACTIONS.LOGOUT,
                            })
                            })
                        }
                        }} >Logout</button></li>
                    </ul>

                        :
                        null
                        }
                    </div>
                </div>
                </nav>
                </div>
                
                <Main />
                </Router>
            </div>
        )
    }
}

export default navbar
