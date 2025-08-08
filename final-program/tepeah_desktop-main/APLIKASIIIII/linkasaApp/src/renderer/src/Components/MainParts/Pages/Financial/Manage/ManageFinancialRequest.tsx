import React, {useState} from 'react';
import ViewManageFinancialRequest from './ViewManageFinancialRequest';

function ManageFinancialRequest(props) {
    const [change, setchange] = useState(0)
    const c = () => {
        setchange(change + 1) 
    }
    return (
        <div className='px-20 py-5'>
            <ViewManageFinancialRequest c={change} change={c}></ViewManageFinancialRequest>            
        </div>
    );
}

export default ManageFinancialRequest;
