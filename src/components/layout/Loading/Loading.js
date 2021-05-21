/*
    Reusable static loading spinner
*/

export const Loading = () => {
    return(
        <>
            <hr></hr>
            <div className="d-flex align-items-center justify-content-center my-5">
                <div className="spinner-border text-info mr-2" style={{"width": "3rem", "height": "3rem"}} role="status" aria-hidden="true"></div>
                <span className="text-info" style={{"fontSize": "3rem"}} >Loading data...</span>
            </div>
            <hr></hr>
        </>

    )
}