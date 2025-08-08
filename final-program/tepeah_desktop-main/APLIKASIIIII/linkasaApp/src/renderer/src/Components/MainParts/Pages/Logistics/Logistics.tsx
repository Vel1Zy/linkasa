import {Logistic} from "@renderer/Controller/Interfaces/LogisticInterface";
import {useEffect, useState} from "react";
import ViewLogistics from "./ViewLogistics";
import {getAllLogistic} from "@renderer/Controller/GeneralControls/LogisticController";

function Logistics() {
    const [logistics, setLogistics] = useState<Logistic[]>([])
    const [change, setchange] = useState(0)

    const c = () => {setchange(change + 1)}

    useEffect(() => {
        getAllLogistic().then((result) => {
            setLogistics(result)
            logistics.forEach((logistic) => logistic)
        })
    }, [change])

    return (
        <div className="px-20 py-5">
            view below
            <ViewLogistics change={c} logistics={logistics}></ViewLogistics>
        </div>
    );
}

export default Logistics;
