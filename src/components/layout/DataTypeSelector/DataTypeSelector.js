/*
    Custom reusable menu
*/
export const DataTypeSelector = ({types, setType, selected}) => {
    return(
        <div className="d-flex justify-content-center align-items-center">
        {
            types.map(type => <button key={type.text} type="button" className={"btn m-3 " + (selected === type.type ? "btn-secondary" : "customButton")} onClick={() => setType(type.type)}>Render {type.text}</button>)
        }
        </div>    
    )
    
}

