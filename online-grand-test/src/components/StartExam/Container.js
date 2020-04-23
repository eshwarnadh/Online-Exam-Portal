import React, { Component } from 'react'
import Presentation from './Presentation'
import firebase from '../../firebase_config'
import { Store } from '../../store/data'
import { ACTIONS } from '../../store/actionTypes'
export class Container extends Component {
    state = {
        initialArray : [],
        qstns : []
    }
    static contextType = Store
    componentDidMount = () => {
        console.log("start")
        const [ state, dispatch ] = this.context
        if(state.my_exams)
        if(window.confirm("You are going to start exam")){
            dispatch({
                type : ACTIONS.START_EXAM,
                payload : this.isExamConfirmed
            })
        }
        else{
            this.props.history.push("/")
        }
            
    }

    isExamConfirmed = (isStart) => {
        console.log(isStart)
        this.setState({isStart:isStart})
        let arr = []
        let emptyAns = []
        for( let i = 0; i<180; i++){
            arr.push('qstn'+(i+1))
            emptyAns.push('')
        }
        this.setState({qstns : arr})
        this.setState({initialArray:emptyAns})
    }

    handleChange = (e) => {
        console.log(this.state.initialArray)
        let qstns = this.state.qstns
        let ansArr = this.state.initialArray
        let qstn = e.target.name
        let index = qstns.indexOf(qstn)
        ansArr[index] = e.target.value
        this.setState({initialArray : ansArr})
    }

    handleSubmit = (e) => {
        let ansArr = this.state.initialArray
        let count = 0
        ansArr.forEach(ans => {
            if(ans === "")
                count++
        })
        if(count > 0){
            if(window.confirm("Are you sure you want to submit there are still some unanswered questions?"))
                this.handleProceed()
        }
    }

    handleProceed = () => {
        const [ state, dispatch ] = this.context
        dispatch({
            type : ACTIONS.SUBMIT_EXAM,
            payload : {
                options:this.state.initialArray,
                isExamFinished : this.isExamFinished
            }
        })
    }

    isExamFinished = (isFinished) => {
        if(isFinished)
            this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <Presentation 
                   {...this.state}
                   handleChange={this.handleChange}
                   handleSubmit = {this.handleSubmit}
                />
            </div>
        )
    }
}

export default Container
