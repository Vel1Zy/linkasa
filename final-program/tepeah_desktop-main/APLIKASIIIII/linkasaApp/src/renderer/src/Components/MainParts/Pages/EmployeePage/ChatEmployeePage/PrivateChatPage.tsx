import {useEffect, useState} from "react";
import action from '../../../../../../assets/ActionIcon.png'
import {getMaintenanceCrew, getMaintenanceManager} from "@renderer/Controller/GeneralControls/MaintenanceController";
import {Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import {privateChat} from "@renderer/Controller/GeneralControls/ChatController";
import {onSnapshot, or, query, where} from "firebase/firestore";
import {privateMessages} from "@renderer/Controller/FirebaseConfig/firebaseConfig";
import {PrivateChat} from "@renderer/Controller/Interfaces/ChatInterface";

interface Props { 
    user : Employee
}

function PrivateChatPage(p : Props) {
    const [current, setCurrent] = useState('')
    const [passenger, setPassenger] = useState('')
    const [staffs, setStaffs] = useState<Employee[]>([])
    const [messages, setMessages] = useState<PrivateChat[]>([])

    useEffect(() => {
        if(p.user.role == 'MaintenanceManager') getMaintenanceCrew().then((fetch) => {
            setStaffs(fetch)
        })
        else if(p.user.role == 'MaintenanceStaff') getMaintenanceManager().then((fetch) => {
            setStaffs(fetch)
        })
    }, [])

    useEffect(() => {
        const queryMessage = query(privateMessages, or(where('to', '==', passenger), where('from', '==', passenger)))
        onSnapshot(queryMessage, (snapshot) => {
            const arr : PrivateChat[] = []
            for(const doc of snapshot.docs) {
                arr.push(doc.data() as PrivateChat)
            }
            setMessages(arr)
        })
    }, [passenger])
    

    const handleSubmit = () => {
        privateChat(p.user, passenger, current).then((result) => {
            if(result) console.log('success');
        })
    }

    return (
        <div className='mt-2 h-screen'>
            <select  name="" id="" onChange={(o) => setPassenger(o.target.value)}>
                <option value="">Select Person</option>
                {staffs.map((d, i) =>(
                    <option value={d.companyEmail} key={i}>{d.companyEmail}</option>
                ))}                
            </select>
            {(passenger == '') ? (
                <div>
                    <p className="text-black font-bold">Choose Person</p>
                </div>
            ) : (
                <div className="flex p-5 flex-col items-baseline h-4/5 v-full border-black border-2 my-2 rounded-xl border-opacity-60">
                    <div className='flex-grow'>

                    </div>
                    <div className='mt-auto w-full'>
                        <div className='flex flex-col-reverse'>
                        <div className='flex flex-col-reverse'>
                        {messages.map((m, i) => (
                            <div key={i} className='pt-3'>
                                <p className='text-sm m-0'>{m.user.companyEmail}</p>
                                <p className='text-xl m-0'>{m.message}</p>
                            </div>
                        ))}
                    </div>
                            <div>
                            </div>
                        </div>
                        <div className="w-full flex gap-2 mt-2">
                            <input value={current} onChange={(o) => setCurrent(o.target.value)} className="border border-black w-full p-2 rounded-lg" type="text" name="" id="" />
                            <button onClick={handleSubmit} className='w-10'><img src={action} alt="" /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrivateChatPage;
