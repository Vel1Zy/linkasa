import {deleteFlightCrewFromFlight} from "@renderer/Controller/GeneralControls/FlightController";
import {Crew} from "../../../../Controller/Interfaces/CrewInterface";
import {Flight} from "@renderer/Controller/Interfaces/FlightInterface";

interface Props {
    flight : Flight,
    crew : Crew
}


function CrewInformation(props : Props) {

    const crew = props.crew

    const deleteHandle = () => {
        deleteFlightCrewFromFlight(props.flight, props.crew).then((result) => {
            if(result) window.location.reload()
        })
    }
    return (
        <div className={'px-30'}>
            <div className={'border border-black rounded-lg p-5 w-1/3 border-opacity-60 flex flex-col gap-2'}>
                <p className={''}>Crew Name : {crew.crewName}</p>
                <p className={''}>Pilot : {crew.pilot}</p>
                <div className="flex gap-2 flex-wrap">
                    <p className="font-bold">Flight Attendant : </p>
                    {crew.flightAttendants.map((attendant, index) => (
                        <p key={index}>{attendant}</p>
                    ))}
                </div>
            </div>
            <button
                onClick={deleteHandle}
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
            >
                Delete Flight Crew
            </button>
        </div>
    );
}

export default CrewInformation;
