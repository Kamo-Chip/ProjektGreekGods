import React from 'react'
import { TiDelete } from 'react-icons/ti'

const Help = ({data, setIsActive}) => {
    const closeHelp = () => {
        document.querySelector(".help").style.display = "none";
        setIsActive(false);
    }

    const createMarkup = () =>{
        return {__html: data.text};
    }
    return (
        <div className="help">
            <TiDelete onClick={closeHelp} size="24px" style={{
                position: "absolute",
                right: "0",
            }}
            />
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "1em"}}>
                <h1 className="page-header" style={{marginBottom: "0",}}>Help</h1>
                <p dangerouslySetInnerHTML={createMarkup()}></p>
                {data.imageSrc ?  <img style={{width: "95%"}} src={data.imageSrc} alt="Help"/> : null}
            </div>
        </div>
    )
}

export default Help;