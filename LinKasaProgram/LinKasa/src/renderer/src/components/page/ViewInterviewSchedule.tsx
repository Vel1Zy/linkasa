import React, { useEffect, useState } from 'react';
import { InterviewSchedule } from '../model/InterviewSchedule';
import { collection, getDocs, query, deleteDoc, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '@renderer/FirebaseConfig';

const fetchInterviewScheduleData: () => Promise<InterviewSchedule[]> = async () => {
    const q = query(collection(db, 'interviewSchedule'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        const { interviewID, interviewDate, interviewTime, interviewLocation, intervieweeName, intervieweeEmail, interviewerName, interviewerEmail, status } = doc.data();
        const interviewSchedule: InterviewSchedule = {
            interviewID: interviewID,
            interviewDate: interviewDate,
            interviewTime: interviewTime,
            interviewLocation: interviewLocation,
            intervieweeName: intervieweeName,
            intervieweeEmail: intervieweeEmail,
            interviewerName: interviewerName,
            interviewerEmail: interviewerEmail,
            status: status
        };
        return interviewSchedule;
    });
};

const deleteInterviewScheduleData = async (interviewID: string) => {
    const q = query(collection(db, 'interviewSchedule'), where('interviewID', '==', interviewID));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
};

const ViewInterviewSchedule = () => {
    const [interviewSchedule, setInterviewSchedule] = useState<InterviewSchedule[] | undefined>();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedInterviewSchedule, setSelectedInterviewSchedule] = useState<InterviewSchedule | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchInterviewScheduleData().then((interviewSchedule) => setInterviewSchedule(interviewSchedule));
    }, []);

    const handleDelete = async (interviewID: string) => {
        await deleteInterviewScheduleData(interviewID);
        // Refresh the interview schedule data after deletion
        fetchInterviewScheduleData().then((interviewSchedule) => setInterviewSchedule(interviewSchedule));
    };

    const handleEdit = (interviewSchedule: InterviewSchedule) => {
        setSelectedInterviewSchedule(interviewSchedule);
        setEditModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const q = query(
            collection(db, 'interviewSchedule'),
            where('interviewID', '==', selectedInterviewSchedule?.interviewID)
        );
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs[0];
        try {
            const docRef = doc.ref;
            await updateDoc(docRef, {
                interviewDate: selectedInterviewSchedule?.interviewDate,
                interviewTime: selectedInterviewSchedule?.interviewTime,
                interviewLocation: selectedInterviewSchedule?.interviewLocation,
                intervieweeName: selectedInterviewSchedule?.intervieweeName,
                intervieweeEmail: selectedInterviewSchedule?.intervieweeEmail,
                interviewerName: selectedInterviewSchedule?.interviewerName,
                interviewerEmail: selectedInterviewSchedule?.interviewerEmail,
                status: selectedInterviewSchedule?.status
            });
            fetchInterviewScheduleData().then((interviewSchedule) => setInterviewSchedule(interviewSchedule));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {interviewSchedule?.map((interviewSchedule, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-md">
                    <div>
                        <div className="font-bold text-blue-500 text-2xl"> {interviewSchedule.interviewID}</div>
                        <div>
                            <strong>Date : </strong>
                            {interviewSchedule.interviewDate}
                        </div>
                        <div>
                            <strong>Time : </strong>
                            {interviewSchedule.interviewTime}
                        </div>
                        <div>
                            <strong>Location : </strong>
                            {interviewSchedule.interviewLocation}
                        </div>
                        <div>
                            <strong>Interviewee Name : </strong>
                            {interviewSchedule.intervieweeName}
                        </div>
                        <div>
                            <strong>Interviewee Email : </strong>
                            {interviewSchedule.intervieweeEmail}
                        </div>
                        <div>
                            <strong>Interviewer Name : </strong>
                            {interviewSchedule.interviewerName}
                        </div>
                        <div>
                            <strong>Interviewer Email : </strong>
                            {interviewSchedule.interviewerEmail}
                        </div>
                        <div>
                            <strong>Status : </strong>
                            {interviewSchedule.status}
                        </div>
                    </div>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(interviewSchedule.interviewID)}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleEdit(interviewSchedule)}
                    >
                        Edit
                    </button>
                </div>
            ))}
            {editModalOpen && selectedInterviewSchedule && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <div>
                            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                                <label className="text-gray-600">Date</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.interviewDate}
                                />
                                <label className="text-gray-600">Time</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.interviewTime}
                                />
                                <label className="text-gray-600">Location</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.interviewLocation}
                                />
                                <label className="text-gray-600">Interviewee Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.intervieweeName}
                                />
                                <label className="text-gray-600">Interviewee Email</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.intervieweeEmail}
                                />
                                <label className="text-gray-600">Interviewer Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.interviewerName}
                                />
                                <label className="text-gray-600">Interviewer Email</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.interviewerEmail}
                                />
                                <label className="text-gray-600">Status</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2"
                                    defaultValue={selectedInterviewSchedule.status}
                                />
                                {error && <span className="text-red-500">{error}</span>}
                                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">
                                    Update Interview Schedule
                                </button>
                                <button
                                    className="bg-red-500 text-white rounded-md p-2 mt-2"
                                    onClick={() => setEditModalOpen(false)}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewInterviewSchedule;
