import { useEffect, useState } from 'react';

export default function TimeTick() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    

    return (
        <div>{currentDate.toString()}</div>
    );
}