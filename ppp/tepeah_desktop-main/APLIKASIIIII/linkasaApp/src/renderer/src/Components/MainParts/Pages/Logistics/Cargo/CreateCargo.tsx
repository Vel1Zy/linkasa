import {createCargo} from "@renderer/Controller/GeneralControls/CargoController";
import {useState} from "react";

interface I {
    change : () => void;
}

function CreateCargo(props : I) {
    const [location, setLocation] = useState('')

    const createHandle = () => {
        createCargo(location).then((result) => {
            if(result) props.change()
        })
    }

    return (
        <div>
            <p className="text-xl font-bold">Create Cargo</p> <br />
            <div className="flex flex-col gap-3 w-1/2">
                <input
                    name="location"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Location"
                    type="text"
                    onChange={(o) => setLocation(o.target.value)}
                ></input> 
                <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={createHandle}
                >
                    Create Cargo
                </button>
            </div>
        </div>
    );
}

export default CreateCargo;
