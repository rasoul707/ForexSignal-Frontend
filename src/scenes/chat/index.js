import React from "react"
import { useLocation } from "react-router-dom";

const Chat = () => {

    // const crisp = () => {
    //     window.$crisp = [];
    //     window.CRISP_WEBSITE_ID = "fd1b16d5-cbdf-4ee5-ae0c-b04458f78061";
    //     window.CRISP_RUNTIME_CONFIG = {
    //         lock_maximized: false,
    //         lock_full_view: true,
    //         cross_origin_cookies: true,
    //     };
    //     (function () {
    //         const d = document;
    //         const s = d.createElement("script");
    //         s.src = "https://client.crisp.chat/l.js";
    //         s.async = 1;
    //         d.getElementsByTagName("head")[0].appendChild(s);

    //     })();
    // }

    const location = useLocation()

    React.useEffect(() => {
        // crisp()
        // const m = setInterval(() => {
        //     console.log("mmmm")
        //     if (typeof window.$crisp.do === "function") {
        //         if (location.pathname === '/help') {
        // console.log("yyyyy", window.$crisp.is('chat:hidden'))
        //             if (window.$crisp.is('chat:closed')) {
        //                 window.$crisp.do('chat:toggle')
        //             }
        //         }
        //         else {
        //             console.log("nnnn", window.$crisp.is('chat:visible'))
        //             if (window.$crisp.is('chat:opened')) {
        //                 window.$crisp.do('chat:toggle')
        //             }
        //         }
        //     }
        // })
        // const m = setInterval(() => {
        //     console.log("d")
        //     if (typeof window.$crisp.do === "function") {
        //         console.log("s")
        //         window.$crisp.do('chat:hide')
        //         setTimeout(() => { clearInterval(m) }, 10000)
        //         // if (window.$crisp.is('chat:hidden')) {
        //         //     clearInterval(m)
        //         // }

        //     }
        // }, 100)
    }, [location.pathname])

    return null

}

export default Chat