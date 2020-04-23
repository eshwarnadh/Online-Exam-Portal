import React from 'react'
import CreateNewSession from '../AdminComponents/CreateNewSession'
import SessionList from '../AdminComponents/SessionList'
import DataLoader from '../DataLoader'
function Presentation(props) {
    return (
        <div>
            <div style={{textAlign:"center"}} >
                <h3>Welcome admin</h3>
            </div>
            <CreateNewSession />
            <SessionList 
                exams = {props.exams}
            />
        </div>
    )
}

export default Presentation
