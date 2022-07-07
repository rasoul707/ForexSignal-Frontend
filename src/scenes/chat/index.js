import React from "react"

const Chat = () => {

    const crisp = () => {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "fd1b16d5-cbdf-4ee5-ae0c-b04458f78061";
        window.CRISP_RUNTIME_CONFIG = {
            lock_maximized: true,
            lock_full_view: true,
            cross_origin_cookies: true,
        };
        (function () {
            const d = document;
            const s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
    }

    React.useEffect(() => {
        crisp()
    }, [])

}

export default Chat