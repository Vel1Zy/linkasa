import {useEffect, useState} from "react";
import CreateCargo from "./CreateCargo";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import {deleteCargo, getCargo} from "@renderer/Controller/GeneralControls/CargoController";
import action from '../../../../../../assets/ActionIcon.png'
import del from '../../../../../../assets/deleteIcon.png'

interface I {
    creating : boolean
}

function ViewCargo(i : I) {
    const [cargos, setCargos] = useState<Cargo[]>([])
    const [c, setc] = useState(0)
    
    const change = () => {
        setc(c + 1)
    }

    useEffect(() => {
        getCargo().then((result) => {
            setCargos(result)    
        })        
    }, [c])

    return (
        <div className="px-20 py-5">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            
                            <th className="py-3 px-6 text-left">Details</th>
                            {i.creating ? (
                                <th className="py-3 px-6 text-left">Delete</th>
                            ) : (
                                <></>
                            )}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {cargos.map((c, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{c.cargoID}</td>
                            <td className="py-3 px-6 text-left">{c.location}</td>
                            <td className="py-3 px-6 text-left">{c.status}</td>
                            <td className="py-3 px-6 text-left">
                                <a href={'/cargo/detail/' + c.cargoID}>
                                    <img src={action} alt="" className="w-10"/>
                                </a>
                            </td>
                            {i.creating ? (
                                <td className="py-3 px-6 text-left">
                                    <button onClick={() => {
                                        deleteCargo(c).then((result) => {
                                            if(result) window.location.reload();
                                        })
                                    }}>
                                        <img src={del} alt="" className="w-10" />
                                    </button>
                                </td>
                            ) : (
                                <></>
                            )}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {i.creating ? (
                <CreateCargo change={change}></CreateCargo> 
            ) : (
                <></>
            )}
        </div>
    );
}

export default ViewCargo;
