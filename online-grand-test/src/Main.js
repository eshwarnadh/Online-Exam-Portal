import React, { useContext } from 'react';
import { Store } from './store/data'
import { ACTIONS } from './store/actionTypes'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import Answers from './components/AdminComponents/Answers'
import StartExam from './components/StartExam'
import Leaderboard from './components/AdminComponents/Leaderboard'
import Result from './components/Result'
import DataLoader from './components/DataLoader'
import firebase from './firebase_config'
import history from './history'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
function Main() {
  const [ state, dispatch ] = useContext(Store)
  return (
    <div className="Main">
      {
        state.hasOwnProperty("user") && state.user.role === "admin" ? 
          <DataLoader />
          :
          null
      }

            {
                state.hasOwnProperty("user") ?
                        state.user.role === "admin" ? 
                            <Switch>
                                <Route exact path="/" component={AdminPanel}/>
                                <Route exact path="/provideanswers" component={Answers}/>
                                <Route exact path="/adminconsole/leaderboard/:examId" component={Leaderboard}/>
                            </Switch>    
                        :
                        <Switch>
                            <Route exact path="/result" component={Result} />
                            <Route exact path="/startexam" component={StartExam} />
                            <Route path="/" component={Dashboard} />
                            <Route path="/dashboard" component={Dashboard} />
                        </Switch>    
                :
                <p style={{textAlign:"center"}} >Loading ...</p>
            }
                
    </div>
  );
}

export default Main;
