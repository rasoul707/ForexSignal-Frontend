import { useState, useEffect } from 'react';


const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            fetch('https://www.google.com/', { mode: 'no-cors' })
                .then(() => !isOnline && setIsOnline(true))
                .catch(() => isOnline && setIsOnline(false));
        }, 7000);

        return () => clearInterval(interval);
    }, [isOnline]);
    return { isOnline };
};

export default useNetworkStatus;