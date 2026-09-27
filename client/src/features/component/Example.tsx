import {useEffect, useState} from "react";
import axios from "axios";

function Example(_props : any){
    const [message, setMessage] = useState("here");
    useEffect(() => {
        axios.get("/api/status")
            .then((res) => setMessage(res.data.message))
            .catch(() => setMessage("Error with backend"))
    }, []);

    return (
        <div>
            <h1>
                Show Backend status
            </h1>
            <p>
                Backend Status: <strong>{message}</strong>
            </p>
        </div>
    )
}

export default Example;