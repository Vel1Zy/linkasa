import {useRef, useState} from "react";
import {LostAndFoundItem} from "../../../../Controller/Interfaces/LostAndFoundInterface";
import {addLostAndFoundItem} from "../../../../Controller/PageControllers/LostAndFoundController";
import {Timestamp} from "firebase/firestore";

const defaultState : LostAndFoundItem  = {
    id : '',
    photoUrl : '',
    locationFound : '',
    description : '',
    storageLocation : '',
    dateFound : Timestamp.fromDate(new Date()),
    dateClaimed : null,
    status : 'unclaimed'
}


function AddLogPage() {
    const [item, setItem] = useState<LostAndFoundItem>(defaultState)
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const click = () => {
        if (fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0]
            addLostAndFoundItem(file,  item).then((result) => {
                if(result) window.location.reload()
            })
        }
    }
    return <div className={"px-20 py-5"}>
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
            Submit
        </button>
    </div>
}

export default AddLogPage;
