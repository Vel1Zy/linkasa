import {getStorageInfo, updateStorage} from "@renderer/Controller/GeneralControls/StorageController";
import {Storage} from "@renderer/Controller/Interfaces/StorageInterface";
import Fetching from "@renderer/LittleComponents/Fetching";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ItemsView from "../Items/ItemsView";

function StorageDetail() {
    const { storageID } = useParams()
    const [storage, setStorage] = useState<Storage | null>(null)
    const [c, setc] = useState(0)
    const [location, setLocation] = useState('')
    const [maxWeight, setMaxWeight] = useState(0)

    const change = () => {
        console.log(c);
        setc(c + 1)
        console.log(c);
    }
    useEffect(() => {
        console.log('fetching new ones');
        if(storageID) getStorageInfo(storageID).then((result) => {
            console.log(result);
            setStorage(result)
        })
    }, [c])

    return (
        <div className="px-20 py-5">
            {storage? 
            <div>
                <div className="flex gap-5">
                    <div>
                        <p>Storage Details</p>
                        <p>Location : {storage.location}</p>
                        <p>Max Weight : {storage.maxWeight}</p>
                        <p>Current Weight : {storage.currentWeight}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <input
                            name="date"
                            className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                            placeholder="Location"
                            onChange={(o) => setLocation(o.target.value)}
                            > 
                        </input>
                        <input
                            name="date"
                            className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                            placeholder="Max Weight"
                            onChange={(o) => setMaxWeight(parseInt(o.target.value))}
                            > 
                        </input>
                        <button
                            className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                            onClick={() => {
                                updateStorage(storage, location, maxWeight).then((result) => {
                                    if(result) change()
                                });
                            }}
                        >
                            Update Storage
                        </button>
                    </div>
                </div>
                
                <ItemsView c={change} storage={storage}></ItemsView>                
            </div> : <Fetching></Fetching>}
        </div>
    );
}

export default StorageDetail;
