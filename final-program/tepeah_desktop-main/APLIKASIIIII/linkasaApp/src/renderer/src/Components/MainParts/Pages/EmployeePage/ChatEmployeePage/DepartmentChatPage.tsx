import {Department, Employee} from "@renderer/Controller/Interfaces/EmployeeInterface";
import action from '../../../../../../assets/ActionIcon.png'
import {useEffect, useRef, useState} from "react";
import {departmentChat} from "@renderer/Controller/GeneralControls/ChatController";
import {limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {departmentMessage} from "@renderer/Controller/FirebaseConfig/firebaseConfig";
import {DepartmentChat} from "@renderer/Controller/Interfaces/ChatInterface";

interface Props {
    user : Employee
}

function DepartmentChatPage(p : Props) {
    const [department, setDepartment] = useState('')
    const [current, setCurrent] = useState('')
    const [messages, setMessages] = useState<DepartmentChat[]>([])
    useEffect(() => {
        const queryMessage = query(departmentMessage, where('department', '==', department), limit(9))
        onSnapshot(queryMessage, (snapshot) => {
            const data : DepartmentChat[] = []
            snapshot.forEach((snap) => {
                data.push(snap.data() as DepartmentChat)
            })

            setMessages(data)
        })
    }, [department])
    

    const handleSubmit = () => {
        departmentChat(department, current, p.user).then((result) => {
            if(result) setCurrent('')
        })
    }

    return (
        <div className='mt-2 h-screen'>
            <select  name="" id="" onChange={(o) => setDepartment(o.target.value)}>
                <option value="">Select Department</option>
                {Department.map((d, i) =>(
                    <option value={d} key={i}>{d}</option>
                ))}                
            </select>
            {(department == '') ? (
                <div>
                    <p className="text-black font-bold">Choose Department</p>
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

export default DepartmentChatPage;
