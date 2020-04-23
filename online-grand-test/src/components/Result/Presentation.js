import React, { useContext } from 'react'
import { Store } from '../../store/data'

function Presentation() {
    const [state ] = useContext(Store)
    return (
        <div style={{textAlign:"center"}}>
            {
                state.hasOwnProperty('score') ? 
                    <h4>You scored:{state.score} </h4>
                  :
                  null  
            }
        </div>
    )
}

export default Presentation
