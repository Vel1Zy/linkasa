import {MaintenaceCrew} from "@renderer/Controller/Interfaces/MaintenanceInterface";

interface P {
    crew : MaintenaceCrew
}


function CrewDetail(props : P) {
    const crew = props.crew
    return (
        <div>
            <div>
                <p className="text-black font-bold text-lg">Crew</p>
                {crew.crewEmails.map((e, i) => (
                    <p key={i}>{e}</p>
                ))}            
            </div>
        </div>
    );
}

export default CrewDetail;
