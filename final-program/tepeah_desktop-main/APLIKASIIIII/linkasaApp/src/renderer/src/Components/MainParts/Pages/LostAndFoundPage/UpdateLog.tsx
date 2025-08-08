import {UserContext} from "@renderer/Components/Context/UserContext";
import {LostAndFoundItem} from "@renderer/Controller/Interfaces/LostAndFoundInterface";
import {updateLog} from "@renderer/Controller/PageControllers/LostAndFoundController";
import {Timestamp} from "firebase/firestore";
import {useContext, useRef, useState} from "react";

interface Props {
    item : LostAndFoundItem
}
const defaultState : LostAndFoundItem  = {
    id : '',
    photoUrl : '',
    locationFound : '',
    description : '',
    storageLocation : '',
    dateFound : Timestamp.fromDate(new Date()),
    dateClaimed : Timestamp.fromDate(new Date()),
    status : 'unclaimed'
}


function UpdateLog(props : Props) {
    const user = useContext(UserContext)?.currentUser
    const [item, setItem] = useState<LostAndFoundItem>(defaultState)
    const orginalItem = props.item
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const click = () => {
        if (fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0]
            updateLog(item, orginalItem, file).then((result) => {
                if(result) window.location.reload()
            })
        }
    }

    return <div className={"mt-4"}>
        {(user && user.role === 'LostAndFoundStaff' ? <div>
            <div className="mb-4">
                <label htmlFor="stringField" className="block text-gray-700 text-sm font-bold mb-2">
                    Location Found
                </label>
                <input
                    name={'locationFound'}
                    onChange={(o) => setItem({...item, [o.target.name] : o.target.value})}
                    type="text"
                    id="stringField"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="enter location"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="stringField" className="block text-gray-700 text-sm font-bold mb-2">
                    Storage Location
                </label>
                <input
                    onChange={(o) => setItem({...item, [o.target.name] : o.target.value})}
                    type="text"
                    id="stringField"
                    name={"storageLocation"}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="enter location"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="stringField" className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <textarea
                    name={'description'}
                    onChange={(o) => setItem({...item, [o.target.name] : o.target.value})}
                    rows={4}
                    id="stringField"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter a description"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dateField" className="block text-gray-700 text-sm font-bold mb-2">
                    Date Found
                </label>
                <input
                    type="date"
                    name={'dateFound'}
                    onChange={(o) => setItem({...item, [o.target.name] : Timestamp.fromDate(new Date(o.target.value))})}
                    id="dateField"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="stringField" className="block text-gray-700 text-sm font-bold mb-2">
                    Photo
                </label>
                <input
                    type={'file'}
                    ref={fileInputRef}
                    id="stringField"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter a description"
                />
            </div>
            <button
                onClick={click}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
            >
                Update 
            </button>
        </div> : <></>)}
        
    </div>
}

export default UpdateLog;
