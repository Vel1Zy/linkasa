import { useContext } from "react"
import {UserContext} from "../../../Context/UserContext";

function EmployeeHomePage (){
    const user = useContext(UserContext);
    if(!user?.currentUser) return <div>
        404 page not found
    </div>
    const info = user.currentUser
    return <div className="tracking-wider flex flex-col items-center">
        <div>
            <h1>Hello, { info.name }</h1>
            <h1>Your role are { info.role }</h1>
        </div>
        <div>
        </div>
    </div>
}


export default EmployeeHomePage
