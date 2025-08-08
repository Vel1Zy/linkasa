import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {Logistic} from "@renderer/Controller/Interfaces/LogisticInterface";
import UpdateLogistics from "./UpdateLogistics";
import {useState} from "react";

interface I {
    logistics : Logistic[]
    change : () => void
}

function ViewLogistics(props : I) {
    const logistics = props.logistics
    const [logistic, setLogistic] = useState<Logistic | null>(null)
    console.log(logistics);

    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className=" table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">LogisticID</th>
                            <th className="py-3 px-6 text-left">CargoID</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-left">Source</th>
                            <th className="py-3 px-6 text-left">Destination</th>
                            <th className="py-3 px-6 text-left">From</th>
                            <th className="py-3 px-6 text-left">To</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {logistics.map((log, index) => (
                        <tr
                            onClick={() => {setLogistic(log)}}
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{log.logisticID}</td>
                            <td className="py-3 px-6 text-left">{log.cargoID}</td>
                            <td className="py-3 px-6 text-left">{log.type}</td>
                            {!(logistic?.type === 'Internal Logistic') ? <>
                                <td className="py-3 px-6 text-left">{log.source.province}, {log.source.country}</td>
                                <td className="py-3 px-6 text-left">{log.destination.province}, {log.destination.country}</td>
                            </> : <>
                                <td className="py-3 px-6 text-left">Internal</td>
                                <td className="py-3 px-6 text-left">Internal</td>
                            </>}
                            
                            <td className="py-3 px-6 text-left">{utc(log.from.seconds)}</td>
                            <td className="py-3 px-6 text-left">{utc(log.to.seconds)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {logistic ? <UpdateLogistics change={props.change} logistic={logistic}></UpdateLogistics> : <></>}
            
        </div>
    );
}

export default ViewLogistics;
