import {useState} from "react";
import ViewCargo from "../ViewCargo";
import {Cargo} from "@renderer/Controller/Interfaces/CargoInterface";
import CreateTask from "./CreateTask";

function ViewTasks() {
    const [cargo, setCargo] = useState<Cargo | null>(null)
    const [c, setc] = useState(0)
    const change = () => {setc(c + 1)}
    return (
        <div className="px-20 py-5">
            <p className="text-2xl font-bold">Tasks</p>
            <ViewCargo choose={setCargo} creating={false}></ViewCargo>        
            {cargo ? (
                <CreateTask cValue={c} c={change} cargo={cargo}></CreateTask>
            ) : (
                <p>Choose a cargo for creating task</p>
            )}
        </div>
    );
}

export default ViewTasks;
