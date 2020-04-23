import React, { Component } from 'react'
import { Store } from '../../store/data'
import { ACTIONS } from '../../store/actionTypes'
import Presentation from './Presentation'
class Container extends Component {
    static contextType = Store
    componentDidMount = () => {
        const [ state, dispatch ] = this.context
        dispatch({
            type:ACTIONS.SET_SCORE,
            payload : dispatch
        })
    }
    render() {
        return (
            <div>
                <Presentation />
            </div>
        )
    }
}

export default Container
