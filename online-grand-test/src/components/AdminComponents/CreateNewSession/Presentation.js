import React from 'react'
import { Link } from 'react-router-dom'
function Presentation(props) {
    const { onCreateNewSession } = props
    return (
        <div>
            <div>
                <Link className="no-dec" to="/provideanswers" ><button>Create new session</button></Link>
            </div>
        </div>
    )
}

export default Presentation
