import {UserContext} from "../../../Context/UserContext";
import {useContext} from "react";
import EmployeeSchedule from "../HRDPage/EmployeeSchedule";

function PersonalSchedulePage() {
    const userContext = useContext(UserContext);
    if (userContext?.currentUser) return <div>
        <EmployeeSchedule employee={userContext.currentUser}></EmployeeSchedule>
    </div>

    return <div>

    </div>
}

export default PersonalSchedulePage
