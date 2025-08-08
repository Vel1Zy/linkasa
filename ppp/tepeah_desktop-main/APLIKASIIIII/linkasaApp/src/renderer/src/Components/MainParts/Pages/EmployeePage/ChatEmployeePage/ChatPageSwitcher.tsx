import {useContext, useState} from 'react';
import switchIcon from '../../../../../../assets/switchIcon.png'
import GlobalChatPage from './GlobalChatPage';
import DepartmentChatPage from './DepartmentChatPage';
import PrivateChatPage from './PrivateChatPage';
import {UserContext} from '@renderer/Components/Context/UserContext';
import Fetching from '@renderer/LittleComponents/Fetching';

function ChatPageSwitcher() {
    const employee = useContext(UserContext)?.currentUser
    const [option, setOption] = useState('global')
    if(employee) return <div className='px-20 py-5'>
        <div className='flex items-center gap-3'>
            <p className='font-bold text-lg'>Chat Type</p>
            <select onChange={(o) => setOption(o.target.value)} className='p-3 border-black border'>
                <option value={'global'}>Global</option>
                <option value={'department'}>Department</option>
                {(employee.role == 'MaintenanceManager' || employee.role == 'MaintenanceStaff') ? (
                    <option value={'private'}>Private</option>
                ) : (<div></div>)} 
            </select>
        </div>
        <div className='h-screen'>
            {(option == 'global' ? (
                <GlobalChatPage></GlobalChatPage>
            ) : (
                <div>
                    {(option == 'department') ? (
                        <DepartmentChatPage user={employee}></DepartmentChatPage>
                    ) : (
                        <PrivateChatPage user={employee}></PrivateChatPage>
                    )}
                </div>
            ))}
        </div>
    </div>

    return <Fetching></Fetching>
}

export default ChatPageSwitcher;
