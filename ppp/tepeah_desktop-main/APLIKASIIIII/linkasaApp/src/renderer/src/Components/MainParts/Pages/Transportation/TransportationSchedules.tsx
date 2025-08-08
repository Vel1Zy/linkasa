import {useState} from "react";
import CreateTransportationSchedule from "./CreateTransportationSchedule";

function TransportationSchedules() {
    const [change, setChange] = useState(0)

    const c = () => { setChange(change + 1) }

    return (
        <div className="px-20 py-5">
            <CreateTransportationSchedule c={c}></CreateTransportationSchedule>
        </div>
    );
}

export default TransportationSchedules;
