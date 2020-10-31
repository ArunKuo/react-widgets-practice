import React, {useState} from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";
// AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
const options = [
    {
        label: "Afrikaans",
        value: "af"
    },
    {
        label: "Arabic",
        value: "ar"
    },
    {
        label: "Hindi",
        value: "hi"
    },
    {
        label: "Chinese(Tranditional)",
        value: "zh-TW"
    },
    {
        label: "Japan",
        value: "ja"
    },
];


const Translate = () =>{
    const [language, setLanguage] = useState(options[3]);
    const [text, setText] = useState("");

    return(
        <div>

            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value={text} onChange={(e)=> setText(e.target.value)}/>
                </div>
            </div>

            <Dropdown 
            selected={language} 
            onSelectedChange={setLanguage} 
            options={options} 
            label="Select a Language"
            />
            <hr/>
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language}/>
        </div>        
    );
};

export default Translate;