import React, { useContext } from 'react'
import { Store } from '../../../store/data'
import { Link } from 'react-router-dom'
function Presentation(props) {
    const [ state, dispatch ] = useContext(Store)
    const { exams } = props
    return (
        <div>
            {
                state.hasOwnProperty('examList') && state.examList.length ? 
                <table>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>No of students</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.examList.map(exam => {
                            return (<tr>
                                <td><Link style={{color:"blue"}} to={"/adminconsole/leaderboard/"+exam.id} >{exam.title} </Link></td>
                                <td>{exam.students.length}</td>
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
