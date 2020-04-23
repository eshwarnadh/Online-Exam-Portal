import React, { Component } from 'react'
import Presentation from './Presentation'
import { Store } from '../../../store/data'
import { ACTIONS } from '../../../store/actionTypes'
class Container extends Component {
    static contextType = Store
    componentDidMount = () => {
        const [ state, dispatch ] = this.context
        
    }
    

    render() {
        return (
            <div>
                <Presentation 
                    examId = {this.props.match.params.examId}
                />
            </div>
        )
    }
}

export default Container
