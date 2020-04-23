import React, { Component } from 'react'
import Presentation from './Presentation'
import { Store }  from '../../store/data'
import Axios from 'axios'
import firebase from '../../firebase_config'
import { ACTIONS } from '../../store/actionTypes'
class Container extends Component {
    state = {
        score: 0
    }
    static contextType = Store

    componentDidMount(){
        const [ state, dispatch ] = this.context
        console.log(state)
        
        // getmyexams
        Axios.post("/getmyexams",{
            studentUID : state.user.userUID
        })
        .then(res=>{
            dispatch({
                type:ACTIONS.SET_MYEXAMS,
                payload:res.data.response
            })
        })
        .catch(err => {
            console.log(err)
        })

        // getoldresult
        Axios.post("/getoldresult",{
            studentUID : state.user.userUID
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

    onStartExam = (e) => {
                this.props.history.push("/startexam")
    }
    render() {
        
        return (
            <div>
                <Presentation 
                    onStartExam = {this.onStartExam}
                    {...this.state}
                />
            </div>
        )
    }
}

export default Container
