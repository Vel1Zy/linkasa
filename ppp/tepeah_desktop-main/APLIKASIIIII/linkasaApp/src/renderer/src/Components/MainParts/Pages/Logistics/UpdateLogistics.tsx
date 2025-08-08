import {getCargo} from "@renderer/Controller/GeneralControls/CargoController";
import {deleteLogistic, updateLogistic} from "@renderer/Controller/GeneralControls/LogisticController";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import locationsArray from "@renderer/Controller/Interfaces/FlightInterface";
import {Logistic, logisticType} from "@renderer/Controller/Interfaces/LogisticInterface";
import {useEffect, useState} from "react";

interface I {
    logistic : Logistic
    change : () => void
}

function UpdateLogistics(props : I) {
    const logistic = props.logistic
    const [cargos, setCargos] = useState<Cargo[]>([])
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [type, setType] = useState('')
    const [isExternal, setIsExternal] = useState(false)

    useEffect(() => {
        getCargo().then((result) => {setCargos(result)})
    }, [])
    
    const updateHandle = () => {
        updateLogistic(logistic, source, destination, from, to, type).then((result) => {
            if(result) props.change();
        })
    }

    const deleteHandle = () => {
        deleteLogistic(logistic).then((result) => {
            if(result) props.change();
        })
    }

    return (
        <div>
            <div className="flex flex-col gap-3 w-1/2">
                <select
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Create New Schedule"
                    onChange={(o) => {
                        setType(o.target.value)
                        setIsExternal(o.target.value === 'External Logistic')
                    }}

                >
                    <option>Choose Logistic Type</option>
                    {logisticType.map((l,i) => (
                        <option key={i}>{l}</option>
                    ))}
                </select>
                {!isExternal ? <></> : 
                    <div className="flex flex-col gap-3">
                        <select
                            name="date"
                            className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                            placeholder="Source"
                            onChange={(o) => setSource(o.target.value)}
                        >
                            <option>Choose Source</option>
                            {locationsArray.map((loc) => (
                                <option value={loc.id} key={loc.id}>{loc.country}, {loc.province}</option>
                            ))}
                        </select>
                        <select
                            name="date"
                            className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                            placeholder="Source"
                            onChange={(o) => setDestination(o.target.value)}
                        >
                            <option>Choose Destination</option>
                            {locationsArray.map((loc) => (
                                <option value={loc.id} key={loc.id}>{loc.country}, {loc.province}</option>
                            ))}
                        </select>
                    </div>
                }
                
                <input
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Create New Schedule"
                    type="date"
                    onChange={(o) => setFrom(o.target.value)}
                ></input>
                <input
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Create New Schedule"
                    type="date"
                    onChange={(o) => setTo(o.target.value)}
                ></input>
                <div className="flex gap-3">
                    <button
                        className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                        onClick={updateHandle}
                    >
                        Update Logistic
                    </button>
                    <button
                        className="border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                        onClick={deleteHandle}
                    >
                        Delete Logistic
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default UpdateLogistics;
