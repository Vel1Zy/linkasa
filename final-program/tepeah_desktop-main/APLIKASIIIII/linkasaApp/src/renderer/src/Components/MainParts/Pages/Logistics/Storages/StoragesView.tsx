import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import {useEffect, useState} from "react";
import CreateStorage from "./CreateStorage";
import {deleteStorage, getStorageOfCargo} from "@renderer/Controller/GeneralControls/StorageController";
import {Storage} from "@renderer/Controller/Interfaces/StorageInterface";
import del from '../../../../../../assets/deleteIcon.png'
import act from '../../../../../../assets/ActionIcon.png'

interface I {
    cargo : Cargo, 
    creating : boolean
}

function StoragesView(props : I) {
    const [storages, setStorages] = useState<Storage[]>([])
    const [c, setc] = useState(0)

    useEffect(() => {
        getStorageOfCargo(props.cargo).then((result) => {
            setStorages(result)
        })
    }, [c])

    const changeHandle = () => setc(c + 1)

    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-left">Max Weight</th>
                            <th className="py-3 px-6 text-left">Current Weight</th>
                            <th className="py-3 px-6 text-left">Details</th>
                            {props.creating ? <th className="py-3 px-6 text-left">Remove</th> : <></>}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {storages.map((s, index) => (
                        <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={index}
                        >
                            <td className="py-3 px-6 text-left">{s.location}</td>
                            <td className="py-3 px-6 text-left">{s.maxWeight}</td>
                            <td className="py-3 px-6 text-left">{s.currentWeight}</td>
                            <td className="py-3 px-6 text-left">
                                <a href={"/cargo/storage/detail/" + s.storageID}>
                                    <img src={act} className="w-10 h-10" alt="delete"/>
                                </a>
                            </td>
                            {props.creating ? 
                                <td className="py-3 px-6 text-left">
                                    <button onClick={() => {
                                        deleteStorage(s, props.cargo).then((result) => {
                                            if(result) changeHandle()
                                        })
                                    }}>
                                        <img src={del} alt="" className="w-10" />
                                    </button>
                                </td>
                            : <></>}
                            
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {props.creating ? <CreateStorage c={changeHandle} cargo={props.cargo}></CreateStorage> : <></>}
        </div>
    );
}

export default StoragesView;
