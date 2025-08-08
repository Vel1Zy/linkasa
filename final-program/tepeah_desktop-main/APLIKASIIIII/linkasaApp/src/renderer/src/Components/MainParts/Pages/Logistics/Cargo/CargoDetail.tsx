import {getCargoInfo, updateCargoStatus} from "@renderer/Controller/GeneralControls/CargoController";
import {Cargo, cargoStatus} from "@renderer/Controller/Interfaces/CargoInterface";
import Fetching from "@renderer/LittleComponents/Fetching";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import StoragesView from "../Storages/StoragesView";
import {UserContext} from "@renderer/Components/Context/UserContext";

function CargoDetail() {
    const user = useContext(UserContext)?.currentUser
    const { cargoID } = useParams()
    const [cargo, setCargo] = useState<Cargo | null>(null)
    const [status, setStatus] = useState('')
    const [c, setc] = useState(0)

    useEffect(() => {
        if(cargoID) getCargoInfo(cargoID).then((result) => {
            setCargo(result)
        })
    }, [c])

    return (
        <div className="px-20 py-5">
            {(cargo && user) ? 
            <div>
                <div className="flex gap-5 w-full">
                    <div>
                        <p>Cargo Details</p>
                        <p>Location : {cargo.location}</p>
                        <p>Status : {cargo.status}</p>
                        <p>Storages</p>
                    </div>
                    <div>
                        <select
                        name="date"
                        className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                        placeholder="Create New Schedule"
                        onChange={(o) => setStatus(o.target.value)}
                        > 
                            <option>Choose Status</option>
                            {cargoStatus.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                        <button
                            className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                            onClick={() => {
                                updateCargoStatus(cargo, status).then((result) => {
                                    if(result) setc(c + 1)
                                })
                            }}
                        >
                            Update Status
                        </button>
                    </div>
                </div>
                <StoragesView creating={user.role === 'CargoManager'} cargo={cargo}></StoragesView>
            </div> : <Fetching></Fetching>}
        </div>
    );
}

export default CargoDetail;
