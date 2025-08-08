import {Item} from "@renderer/Controller/Interfaces/ItemInterface";
import {Storage} from "@renderer/Controller/Interfaces/StorageInterface";
import {useEffect, useState} from "react";
import AddItem from "./AddItem";
import {deleteItemFromStorage, getItemFromStorage} from "@renderer/Controller/GeneralControls/ItemController";
import del from '../../../../../../assets/deleteIcon.png'

interface I {
    storage : Storage
    c : () => void
}
function ItemsView(props : I) {
    const storage = props.storage;
    const [items, setItems] = useState<Item[]>([])
    const change = () => {
        props.c()
    }

    useEffect(() => {
        getItemFromStorage(storage).then((result) => {
            setItems(result)
        })
    }, [storage.currentWeight])

    return (
        <div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Weight</th>
                            <th className="py-3 px-6 text-left">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {items.map((i, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{i.itemID}</td>
                            <td className="py-3 px-6 text-left">{i.name}</td>
                            <td className="py-3 px-6 text-left">{i.weight}</td>
                            <td className="py-3 px-6 text-left">
                                <button onClick={() => {
                                    deleteItemFromStorage(storage, i).then((result) => {
                                        if(result) change()
                                    })
                                }}>
                                    <img src={del} alt="" className="w-10"/>
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddItem c={change} storage={storage}></AddItem>
        </div>
    );
}

export default ItemsView;
