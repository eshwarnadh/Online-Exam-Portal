import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../store/data'
import Result from '../Result'
function Presentation(props) {
    const {  onStartExam, score } = props
    const [ state, dispatch ] = useContext(Store)
    return (
        <div style={{textAlign:"center"}}>
            {
                state.hasOwnProperty("my_exams") ?
                <div>
                    <p>Found {state.my_exams !== "" ? "1" : "0"} exams(s)</p>
                    {
                        state.my_exams.length ? 
                        <button onClick={onStartExam} >Start exam</button>
                        :
                        null
                    }
                </div>

                :
                <p>Please wait while we get your exams</p>    

            }
            <h4>Score :{state.score}</h4>
        </div>
    )
}

export default Presentation
