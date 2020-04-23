import React from 'react'

function Presentation(props) {
    const { handleChange, onLogin } = props
    return (
        <div className="row" >
            <div className="col-4 col" >
            
            </div>
            <div class="card" style={{width: "20rem"}}>
                <form  className="col-4 col" onSubmit={onLogin} >
                    <input type="text" onChange={handleChange} name="email" placeholder="email" required="required" /><br/>
                    <input type="password" onChange={handleChange} name="password" placeholder="password" required="required" /><br/>
                    <input type="submit" value="Login" />
                </form>
            </div>
            <div className="col-4 col">

            </div>
        </div>
    )
}

export default Presentation
