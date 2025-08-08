import {getJobInformation} from '@renderer/Controller/GeneralControls/JobController';
import {JobDetail} from '@renderer/Controller/Interfaces/JobInterface';
import Fetching from '@renderer/LittleComponents/Fetching';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import InputPersonalInformation from './InputPersonalInformation';

function CreateJobOfferDetail() {
    const { jobID } = useParams()
    const [detail, setDetail] = useState<JobDetail | null>(null)

    useEffect(() => {
        if(jobID) getJobInformation(jobID).then((result) => {
            setDetail(result)
        })    
    }, [])

    return (
        <div className='px-20 py-5'>
            {detail ? <div className='text-xl font-bold flex gap-4 flex-col'>
                <div>
                    <p>Title : {detail?.title}</p>
                    <p>Department: {detail?.department}</p>
                    <p>Title : {detail?.title}</p>
                    <p>Slot : {detail?.slot}</p>
                </div>
                <InputPersonalInformation job={detail}></InputPersonalInformation>
            </div> : <Fetching></Fetching>}
        </div>
    );
}

export default CreateJobOfferDetail;
