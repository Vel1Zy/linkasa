import {useContext, useEffect, useState} from 'react';
import action from '../../../../../../assets/ActionIcon.png'
import { GlobalChat } from '@renderer/Controller/Interfaces/ChatInterface';
import { Timestamp, addDoc, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import {UserContext} from '@renderer/Components/Context/UserContext';
import {globalMessage} from '@renderer/Controller/FirebaseConfig/firebaseConfig';
function GlobalChatPage() {
    const currentUser = useContext(UserContext)?.currentUser
    const [messages, setMessages] = useState<GlobalChat[]>([])
    const [current, setCurrent] = useState('')

    useEffect(() => {
        const queryMessage = query(globalMessage, orderBy('createdAt', 'desc'), limit(9))
        onSnapshot(queryMessage, (snapshot) => {
            console.log(snapshot);
            const dummy : GlobalChat[] = []
            for(const doc of snapshot.docs) {
                dummy.push(doc.data() as GlobalChat)
            }
            console.log(dummy);
            setMessages(dummy)
        })
    }, [])
    


    const handleSumbit = async () => {
        if(currentUser) {
                const newChat : GlobalChat= {
                message : current, 
                createdAt : Timestamp.fromDate(new Date()),
                user : currentUser 
            }
            await addDoc(globalMessage, newChat)
            setCurrent('')
        }
    }

    return (
        <div className="flex p-5 flex-col items-baseline h-4/5 v-full border-black border-2 my-2 rounded-xl border-opacity-60">
            <div className='flex-grow'>

            </div>
            <div className='mt-auto w-full'>
                <div className='flex flex-col-reverse'>
                    {messages.map((m, i) => (
                        <div key={i} className='pt-3'>
                            <p className='text-sm m-0'>{m.user.companyEmail}</p>
                            <p className='text-xl m-0'>{m.message}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full flex gap-2 mt-2">
                    <input value={current} onChange={(o) => setCurrent(o.target.value)} className="border border-black w-full p-2 rounded-lg" type="text" name="" id="" />
                    <button onClick={handleSumbit} className='w-10'><img src={action} alt="" /></button>
                </div>
            </div>
        </div>
    );
}

export default GlobalChatPage;
