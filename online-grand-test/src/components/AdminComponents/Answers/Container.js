import React, { Component } from 'react'
import Presentation from './Presentation'
import { Store } from '../../../store/data'
import { ACTIONS } from '../../../store/actionTypes'
import Axios from 'axios'
class Container extends Component {
    state = {
        initialArray : [],
        qstns : [],
        isCreating : false,
        title:""
    }

    static contextType = Store

    componentDidMount = () => {
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
        e.preventDefault()
        let ansArr = this.state.initialArray
        let count = 0
        let noAns = []
        ansArr.forEach((ans,index) => {
            if(ans === ""){
                count++
                noAns.push(index+1)
            }
        })
        if(count > 0){
            window.alert("Cannot submit still some blank answers are appearing?"+noAns)
            
        }
        else{
            this.createNewSession()
        }
    }

    createNewSession = () => {
        const [ state, dispatch ] = this.context
        // let arr = [ 4, 4, 2, 2, 2, 2, 1, 2, 3, 2, 2, 4, 4, 2, 2, 2, 1, 1, 1, 4, 3, 4, 1, 3, 4, 3, 4, 2, 1, 2, 2, 2, 2, 3, 4, 1, 3, 2, 4, 3, 1, 3, 2, 2, 1, 2, 3, 1, 2, 2, 4, 3, 3, 4, 3, 2, 3,4, 4, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 4, 3, 2, 1, 2, 3, 4, 3, 1, 4, 4, 3, 2, 3, 3, 4, 4, 4, 2, 4, 3, 2, 1, 2, 2, 4, 2, 2, 1, 1, 4, 4, 1, 3, 2, 1, 2, 3, 3, 2, 2, 3, 3, 2, 1, 1, 3, 3, 3, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 4, 3, 4, 4, 3, 3, 3, 3, 3, 1, 3, 3, 2, 2, 4, 3, 3, 3, 2, 3, 4, 4, 2, 1, 2, 1, 2, 3, 3, 2, 3, 2, 2, 4, 3, 1, 1, 1, 4, 2, 4, 3, 2, 3, 3, 2, 4, 3, 3, 1, 3, 4,   ]
        // let newArr = []
        // arr.map(i => {
        //     newArr.push(""+i+"")
        // })
        dispatch({
            type : ACTIONS.NEW_SESSION,
            payload : {
                title : this.state.title,
                key : this.state.initialArray,
                isSessionCreated : this.isSessionCreated
            }
        })
        this.setState({isCreating : true})
    }

    isSessionCreated = (bool) => {
        if(bool){
            alert("Session created successfully")
            this.props.history.push("/")
        }
    }

    handleTitle = (e) => {
        this.setState({title:e.target.value})
    }

    componentWillUnmount = () => {
        this.setState({
            initialArray : [],
            qstns : [],
            isCreating : false
        })
    }

    render() {
        return (
            <div>
                <Presentation 
                {...this.state}
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                    handleTitle = {this.handleTitle}
                    createNewSession = {this.createNewSession}
                />
            </div>
        )
    }
}

export default Container
