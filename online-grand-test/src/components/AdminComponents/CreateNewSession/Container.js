import React, { Component } from 'react'
import Presentation from './Presentation'
class Container extends Component {
    state = {

    }

    onCreateNewSession = () => {
        this.props.history.push("/providekey")
    }
    render() {
        return (
            <div>
                <Presentation 
                    onCreateNewSession = {this.onCreateNewSession}
                />
            </div>
        )
    }
}

export default Container
