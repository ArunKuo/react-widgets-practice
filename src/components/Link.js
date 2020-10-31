import React from 'react';

const Link = ({className, href, children})=>{
    const onClick = (event)=>{
        if(event.metakey || event.crtlKey){
            return;
        }

        event.preventDefault();   
        // popstate: 當網址改動時會觸發popstate事件 
        // 使用 history.pushState 不會出發popstate事件 
        window.history.pushState({},"", href);
       
        // 建立一個新的popstate事件 並觸發它
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };


    return (
    <a onClick={onClick} className={className} href={href}>{children}</a>
    )
};

export default Link;