import React, { Component } from 'react'
import { ACTIONS } from '../../store/actionTypes'
import {Store} from '../../store/data'
import firebase from '../../firebase_config'
import Axios from 'axios'
class Container extends Component {
    static contextType = Store
    componentDidMount(){
        console.log(this.context)
        const [ state, dispatch ] = this.context
        

        dispatch({
            type : ACTIONS.SET_STUDENTS,
            payload : dispatch
        })
        let exams = []

        firebase.firestore().collection("Exams")
        .orderBy("createdAt","desc")
        .get()
        .then(snap => {
            let data = snap.docs.map(doc => doc.data())
            data.map(exam => {
                firebase.firestore().collection("Exams")
                .doc(exam.id)
                .collection("Session")
                .get()
                .then(snaps => {
                    let students = snaps.docs.map(doc => doc.data())
                   
                    exams.push({
                        title : exam.title,
                        id : exam.id,
                        students : students
                    })
                    dispatch({
                        type: ACTIONS.SET_SESSION_LIST,
                        payload : exams
                    })
                console.log(exams)
                })
            })
        })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Container
