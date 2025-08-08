import {Flight} from '@renderer/Controller/Interfaces/FlightInterface';
import actionIcon from '../../../../../assets/ActionIcon.png'
import {Link} from 'react-router-dom';
import {utc} from '@renderer/Controller/GeneralControls/DateControl';
import {Plane} from '@renderer/Controller/Interfaces/PlaneInterface';

interface Props {
    flights : Flight[]
    planes : Plane[]
}

function FlightSchedules(props : Props) {
    const flights = props.flights
    const planes = props.planes;
    return (
        <div>
            <h1 className={'text-2xl font-bold tracking-wide'}>Flight Information</h1>
        <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
                <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Source</th>
                    <th className="py-3 px-6 text-left">Destination</th>
                    <th className="py-3 px-6 text-left">Boarding Time</th>
                    <th className="py-3 px-6 text-left">Plane Name</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Action</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {flights.map((flight, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td className="py-3 px-6 text-left">{flight.source.province}, {flight.source.country}</td>
                        <td className="py-3 px-6 text-left">{flight.destination.province}, {flight.destination.country}</td>
                        <td className="py-3 px-6 text-left">{utc(flight.boardingTime.seconds)}</td>
                        <td className="py-3 px-6 text-left">{(planes.length > 0) ? <>
                            {planes[index].name}
                        </> : <></>}</td>
                        <td className="py-3 px-6 text-left font-bold text-green600">{flight.status}</td>
                        <td className="py-3 px-6 text-left font-bold">
                            <Link to={'/fom/flight-detail/' + flight.flightID}>
                                <img src={actionIcon} alt={'actionIcon'} className={'w-10'}/>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default FlightSchedules;
