import React, { createContext, useReducer } from 'react'
import { ACTIONS } from './actionTypes'
import firebase from '../firebase_config'
import Axios from 'axios'
import { render } from 'react-dom'
export const Store = createContext()

const initialState = {
    isLoggedIn : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN : login(action.payload)
                            return state
        case ACTIONS.CHECK_AUTH : 
                            return {
                                ...state,
                                isLoggedIn : action.payload
                            } 
        case ACTIONS.SET_USER : 
                            return {
                                ...state,
                                user : {
                                    ...action.payload
                                }
                            } 
        case ACTIONS.LOGOUT : logout()
                            return state
        
        case ACTIONS.SET_MYEXAMS : 
                            return {
                                ...state,
                                my_exams:action.payload
                            }   
        case ACTIONS.START_EXAM : startExam(state, action.payload)
                            return state
        case ACTIONS.SUBMIT_EXAM : submitExam(state, action.payload)
                                return state

        case ACTIONS.SET_STUDENTS : setStudents(state, action.payload)                        
                            return state
        case ACTIONS.LIST_OF_STUDENTS :
                                return {
                                    ...state,
                                    students : action.payload
                                }                    
        case ACTIONS.NEW_SESSION : newSession(state, action.payload)
                            return state 
        case ACTIONS.SET_SESSION_LIST :    
                            return {
                                ...state,
                                examList : action.payload
                            }

        case ACTIONS.LIST_OF_SESSION : 
                            return {
                                ...state,
                                sessionList : action.payload
                            }
                             
        case ACTIONS.SET_LEADERBOARD : setLeaderboard(state, action.payload)
                            return state   
                            
        case ACTIONS.SET_SCORE : 
                            return {
                                ...state,
                                score : action.payload
                            }
        case ACTIONS.SEE_SCORE : 
                            return {
                                ...state,
                                score : action.payload
                            }                    
        default:
            return state
    }
}
const StoreProvider = (props) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    return (
        <Store.Provider value={[state, dispatch]} >
            { props.children }
        </Store.Provider>   
    )
}

export default StoreProvider

const login = (cred) => {
    const email = cred.email
    const password = cred.password
    console.log(cred)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
        console.log("User logged in")
    })
    .catch(err => {
        alert(err)
        console.log(err)
    })
}

const logout = () => {
    firebase.auth().signOut()
    .then(() => {
       return window.location.reload()
    })
    .catch(err => {
        console.log(err)
    })
}

const startExam = (state, startUI) => {
    const examId = state.my_exams
    const studentUID = state.user.userUID
    Axios.post("/startexam",{
        examId,
        studentUID
    })
    .then(() => {
        startUI(true)
    })
    .catch(err => {
        console.log(err)
        startUI(false)
    })
}

const submitExam = (state, action) => {
    const examId = state.my_exams
    const studentUID = state.user.userUID
    const options = action.options
    Axios.post("/studentfinishexam",{
        examId,
        studentUID,
        options
    })
    .then(() => {
        action.isExamFinished(true)
    })
    .catch(err => {
        action.isExamFinished(false)
    })
}

const setStudents = (state, dispatch) => {
    Axios.post("/listofstudents")
    .then(res => {
        if(res.data.status)
            dispatch({
                type:ACTIONS.LIST_OF_STUDENTS,
                payload : res.data.response
            })
    })
}

const newSession = (state, action) => {
    console.log(action.key)
    Axios.post("/createexamsession",{
        students:state.students.map(student => student.uid),
        key : action.key,
        title : action.title
    })
    .then(() => {
        action.isSessionCreated(true)
    })
    .catch(err => {
        action.isSessionCreated(false)
    })
}

const setSession = (state, dispatch) => {
    Axios.post("/getsessionlist")
    .then(res => {
        dispatch({
            type : ACTIONS.LIST_OF_SESSION,
            payload : res.data.response
        })
    })
    .catch(err => {
        console.log(err)
    })
}

const setLeaderboard = (state, dispatch) => {

}

const setScore = (state, dispatch) => {
    Axios.post("/getresult",{
        studentUID : state.user.userUID,
        examId : state.my_exams
    })
    .then(res => {
        dispatch({
            type : ACTIONS.SEE_SCORE,
            payload : res.data.response
        })
    })
    .catch(err => {
        console.log(err)
    })
}