import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LostAndFoundItem} from "../../../../Controller/Interfaces/LostAndFoundInterface";
import {deleteLostAndFound, getLogInformationByID, itemClaimedControl} from "../../../../Controller/PageControllers/LostAndFoundController";
import UpdateLog from "./UpdateLog";
import {UserContext} from "@renderer/Components/Context/UserContext";

function LogDetail () {
    const { id } = useParams<string>();
    const [detail, setDetail] = useState<LostAndFoundItem>()
    const user = useContext(UserContext)?.currentUser
    useEffect(() => {
        if (id) getLogInformationByID(id).then((log) => {
            if (log) setDetail(log)
        })
    }, []);

    const d = () => {
        if(id) deleteLostAndFound(id).then((result) => {
            if(result) window.history.back()
        })
    }

    const updateStatus = () => {
        if (detail) itemClaimedControl(detail).then(() => {
        })
    }

    if (detail) return <div className={'px-20 py-5'}>
        <div className={'flex gap-10'}>
            <div className={'flex w-72 h-72 overflow-hidden rounded-xl'}>
                <img src={detail.photoUrl} alt={'something'} className={'object-cover w-full h-full'}/>
            </div>
            <div className={'w-1/2 flex flex-col gap-2'}>
                <div className={'border p-3 rounded-lg border-black'}>
                    <p>Detail : </p>
                    <p>{detail.description}</p>
                </div>
                <div className={'border p-3 rounded-lg border-black'}>
                    <p>Location Found : </p>
                    <p>{detail.locationFound}</p>
                </div>
                <div className={'border p-3 rounded-lg border-black'}>
                    <p>Storage Location : </p>
                    <p>{detail.storageLocation}</p>
                </div>
                <div className={'border p-3 rounded-lg border-black'}>
                    <p>Date Found : </p>
                    <p>{detail.dateFound?.toLocaleString()}</p>
                </div>
                <div className={'border p-3 rounded-lg border-black'}>
                    <p>Date Found : </p>
                    <p>{detail.dateFound?.toLocaleString()}</p>
                </div>
                {detail.status == 'unclaimed' ? (
                    <div>
                        <button onClick={updateStatus}>
                            <div className={'border p-3 rounded-lg border-black'}>
                                claimed
                            </div>
                        </button>
                    </div>
                ): (
                    <div>
                        {(user && user.role ==='LostAndFoundStaff') ? <>
                            <div>
                                <div className={'border p-3 rounded-lg border-black'}>
                                    <p>Date Claimed: </p>
                                    <p>{detail.dateClaimed?.toLocaleString()}</p>
                                </div>
                            </div>
                        </> : <></>}
                    </div>
                )}
                {(user && user.role == 'LostAndFoundStaff') ? <>
                    <button onClick={d} className="w-1/3 font-bold bg-blue-500 rounded-lg p-3 text-white">Delete</button>
                </> : <></>}
                <UpdateLog item={detail}></UpdateLog>
            </div>
        </div>
    </div>

    return <div>

    </div>
}

export default LogDetail
