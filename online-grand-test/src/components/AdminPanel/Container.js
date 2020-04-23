import React, { Component } from 'react'
import Presentation from './Presentation'
import Axios from 'axios'
import { Store } from '../../store/data'
import firebase from '../../firebase_config'
import { ACTIONS } from '../../store/actionTypes'
class Container extends Component {
    state = {
        students : [],
        exams : []
    }
    static contextType = Store
    componentDidMount(){
        const [ state, dispatch ] = this.context
        

    }
    render() {
        return (
            <div>
                <Presentation 
                    {...this.state}
                />
            </div>
        )
    }
}

export default Container
