import React, {useState, useEffect} from "react";
import axios from 'axios';

const Search= ()=>{

    const [term, setTerm] = useState("Javascript");
    const [debouncedTerm,setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    // 輸入的關鍵字變動時
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncedTerm(term)
        },1000)

        return ()=>{
            clearTimeout(timerId);
        }
    },[term]);

    // debouncedTerm 變動時 && 一開始render時
    useEffect(()=>{
        const searchWiki =async ()=>{
            const {data} = await axios.get("https://en.wikipedia.org/w/api.php",{
                params: {
                    action: "query",
                    list: "search",
                    origin: "*",
                    format: "json",
                    srsearch: debouncedTerm
                }
            });
            setResults(data.query.search);
       };

       if(debouncedTerm){
        searchWiki();
       }
    }, [debouncedTerm]);




    // useEffect(()=>{

    //    if(term && !results.length){
    //        searchWiki();
    //    }else {
    //         const TimeoutId = setTimeout(()=>{
    //         if(term) {
    //             searchWiki();
    //            }
    //        },1000);
    
    //        return ()=>{
    //            clearTimeout(TimeoutId);
    //        }
    //    }
    // },[term, results.length]);



    const renderedResults = results.map((result)=>{
        return(
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a 
                        className="ui button" 
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                </div>
            </div>
        );
    });


    return(
        <div>
            <div className="ui form">
                <div className="field">
                    <label>輸入關鍵字</label>
                    <input 
                        value={term}
                        onChange={e=> setTerm(e.target.value)}
                        className="input"                     
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
}

export default Search;