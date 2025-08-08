import {createStorage} from "@renderer/Controller/GeneralControls/StorageController";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import {useState} from "react";

interface I {
    cargo : Cargo
    c : () => void
}

function CreateStorage(props : I) {
    const cargo = props.cargo
    const [location, setLocation] = useState('')
    const [maxWeight, setMaxWeight] = useState(0)
    const createHandle = () => {
        createStorage(cargo, location, maxWeight).then((result) => {
            console.log(result);
            if(result) props.c()
        })
    }

    return (
        <div className="p-2 mt-4 flex flex-col gap-2 w-1/2">
            <p className="text-lg font-bold">Add New Storage</p>
            <input
                name="number"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Max Weight (Kg)"
                type="number"
                onChange={(o) => setMaxWeight(parseInt(o.target.value))}
            ></input>           
            <input
                name="number"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Location"
                type="text"
                onChange={(o) => setLocation(o.target.value)}
            ></input>           
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={createHandle}
            >
                Add Storage
            </button>
        </div>
    );
}

export default CreateStorage;
