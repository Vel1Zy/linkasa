import {createJobOffer} from "@renderer/Controller/GeneralControls/JobController";
import {JobDetail} from "@renderer/Controller/Interfaces/JobInterface";
import {useState} from "react";

interface I {
    job : JobDetail
}
function InputPersonalInformation(props : I) {
    const job = props.job;
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const createHandle = () => {
        createJobOffer(job, email, name, phone, date, description).then((result) => {
            if(result) {
                alert("success!")
                window.location.reload()
            }
        })
    }

    return (
        <div className="flex flex-col gap-3 w-1/2 font-semibold">
            <input
                type="text"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                name="task"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            ></input>      
            <input
                type="text"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                name="task"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            ></input>     
            <input
                type="tel"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                name="task"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
            ></input>     
            <input
                type="date"
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                name="task"
                placeholder="DOB"
                onChange={(e) => setDate(e.target.value)}
            ></input>     
            <textarea
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Personal Description"
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
            ></textarea>           
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={createHandle}
            >
                Create Job Offer
            </button>
        </div>
    );
}

export default InputPersonalInformation;
