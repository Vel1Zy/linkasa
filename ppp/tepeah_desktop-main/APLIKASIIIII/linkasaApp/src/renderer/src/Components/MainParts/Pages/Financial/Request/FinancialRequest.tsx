import {UserContext} from "@renderer/Components/Context/UserContext";
import {useContext, useState} from "react";
import CreateFinancialRequest from "./CreateFinancialRequest";
import ViewFinancialRequest from "./ViewFinancialRequest";

function FinancialRequest() {
    const user = useContext(UserContext)
    const [change, setChange] = useState(0)
    const c = () => {
        setChange(change + 1)
    }

    return (
        <div className="px-20 py-5">
            <ViewFinancialRequest c={change}></ViewFinancialRequest>
            <CreateFinancialRequest c={c}></CreateFinancialRequest>
        </div>
    );
}

export default FinancialRequest;
