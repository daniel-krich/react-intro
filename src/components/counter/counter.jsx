import { useState } from "react";
import './counter.css';

export default function Counter() {
    const [counter, setCounter] = useState(0);

    return (
        <div className="margin">
            <button onClick={() => setCounter(counter + 1)}>+</button>
            <h3>{counter}</h3>
            <button onClick={() => setCounter(counter - 1)}>-</button>
        </div>
    );
}