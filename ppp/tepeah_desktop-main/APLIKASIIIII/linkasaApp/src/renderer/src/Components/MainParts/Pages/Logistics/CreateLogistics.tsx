import {getCargo} from "@renderer/Controller/GeneralControls/CargoController";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import {useEffect, useState} from "react";
import ViewCargoForLogistic from "./ViewCargoForLogistic";
import {logisticType} from "@renderer/Controller/Interfaces/LogisticInterface";
import {createLogistic} from "@renderer/Controller/GeneralControls/LogisticController";
import locationsArray from "@renderer/Controller/Interfaces/FlightInterface";

function CreateLogistics() {
    const [cargos, setCargos] = useState<Cargo[]>([])
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [type, setType] = useState('')
    const [cargo, setCargo] = useState('')
    const [c, setc] = useState(0)
    const [isExternal, setIsExternal] = useState(false)
    
    const change = () => {
        setc(c + 1)
    }

    useEffect(() => {
        getCargo().then((result) => {setCargos(result)})
    }, [c])

    const createHandle = () => {
        createLogistic(cargo, source, destination, from, to, type).then((result) => {
            if(result) change()
        })
    }

    return (
        <div className="px-20 py-5">
            <ViewCargoForLogistic cargos={cargos}></ViewCargoForLogistic>
            <div className="flex flex-col gap-3 w-1/2">
                <select
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Create New Schedule"
                    onChange={(o) => setCargo(o.target.value)}
                >
                    <option>Choose Cargo</option>
                    {cargos.map((cargo, index) => (
                        <option key={index}>{cargo.cargoID}</option>
                    ))}
                </select>
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
                <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={createHandle}
                >
                    Add Schedule
                </button>
            </div>
        </div>
    );
}

export default CreateLogistics;
