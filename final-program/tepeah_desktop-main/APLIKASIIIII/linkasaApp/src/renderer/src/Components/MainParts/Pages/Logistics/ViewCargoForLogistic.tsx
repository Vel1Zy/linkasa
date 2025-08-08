import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";

interface I {
    cargos : Cargo[]
}

function ViewCargoForLogistic(props : I) {
    const cargos = props.cargos
    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Cargo ID</th>
                            <th className="py-3 px-6 text-left">Location</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {cargos.map((c, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left"> {c.cargoID} </td>
                            <td className="py-3 px-6 text-left"> {c.location} </td>
                            <td className="py-3 px-6 text-left"> {c.status} </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>           
        </div>
    );
}

export default ViewCargoForLogistic;
