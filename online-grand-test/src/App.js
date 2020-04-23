import React, { useContext } from 'react';
import { Store } from './store/data'
import { ACTIONS } from './store/actionTypes'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import StartExam from './components/StartExam'
import firebase from './firebase_config'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './Main'
import history from './history'
import Navbar from './navbar'
function App(props){
  const [ state, dispatch ] = useContext(Store)
  return (
    <div className="App">
     
      <div style={{marginTop:"100px"}} >
            {
              state.isLoggedIn ? 
            
                <Navbar />
                :
                <Login />
            }
      </div>
     
      

    </div>
  );
}

export default App;
