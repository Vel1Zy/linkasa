import {createItem} from "@renderer/Controller/GeneralControls/ItemController";
import {Storage} from "@renderer/Controller/Interfaces/StorageInterface";
import {useState} from "react";

interface I {
    storage : Storage
    c : () => void
}
function AddItem(props : I) {
    const storage = props.storage;
    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0)


    const addHandle = () => {
        createItem(storage, name, weight).then((result) => {
            if(result) props.c()
        })
    }

    return (
        <div className="flex flex-col gap-3 w-1/2 mt-5">
            <input
                onChange={(o) => setName(o.target.value)}
                name="number"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Name"
                type="text"
            ></input>        
            <input
                name="number"
                onChange={(o) => setWeight(parseInt(o.target.value))}
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Weight"
                type="number"
            ></input>           
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={addHandle}
            >
                Add Item 
            </button>
        </div>
    );
}

export default AddItem;
