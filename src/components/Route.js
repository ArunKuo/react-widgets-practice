import {useEffect, useState} from 'react';

const Route = ({path, children})=>{
    const [currentPath ,setCurrentPath] = useState(window.location.pathname);

    useEffect(()=>{
        const onLocationChange = ()=>{
            setCurrentPath(window.location.pathname);
        }
        // 當觸發popstate事件時
        window.addEventListener("popstate", onLocationChange);

        // rerender前 移除監聽 popstate事件
        return ()=>{
            window.removeEventListener("popstate",onLocationChange);
        }
    },[]);

    return currentPath === path ? children : null ;

};

export default Route;