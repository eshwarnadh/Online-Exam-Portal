import React, { useContext } from 'react'
import { Store } from '../../../store/data'

function Presentation(props) {
    const [state] = useContext(Store)
    return (
        <div>
            {
                state.hasOwnProperty('examList') && state.examList.length ? 
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>isStarted</th>
                    <th>isFinished</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.examList.filter(exam => exam.id === props.examId)[0].students.map(examStudent => {
                           return( <tr>
                                <td>{state.students.filter(student => examStudent.studentUID === student.uid)[0].email} </td>
                                <td>{examStudent.isStarted ? <span style={{color:"red"}}>Started</span> : "not started"} </td>
                                <td>{examStudent.isFinished ? <span style={{color:"red"}}>Finished</span> : "not finished"} </td>
                                <td>{examStudent.score} </td>
                            </tr>)
                        })
                    }
                </tbody>
                </table>
                :
                <p style={{textAlign:"center"}} >Getting session list...</p>
 
            }
            
        </div>
    )
}

export default Presentation
