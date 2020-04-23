import React, { Component } from 'react'
import { Store } from '../../../store/data'
import { ACTIONS } from '../../../store/actionTypes'
import Presentation from './Presentation'
import firebase from '../../../firebase_config'
class Container extends Component {
    state = {
        exams : []
    }
    static contextType = Store
    componentDidMount(){
        const [ state, dispatch ] = this.context
        this.setState({exams:this.props.exams})
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Presentation 
                />
            </div>
        )
    }
}

export default Container
