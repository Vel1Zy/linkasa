import {Schedule} from "@renderer/Controller/Interfaces/EmployeeInterface";

interface I {
    schedule : Schedule
}

function UpdateBaggageSecuritySchedule(props : I) {
    const schedule = props.schedule

    return (
        <div>
            {schedule.task}            
        </div>
    );
}

export default UpdateBaggageSecuritySchedule;
