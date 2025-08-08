import {useEffect, useState} from "react";
import {getAllLog} from "../../../../Controller/PageControllers/LostAndFoundController";
import {LostAndFoundItem} from "../../../../Controller/Interfaces/LostAndFoundInterface";
import actionIcon from '../../../../../assets/ActionIcon.png'


function ViewLog(){
  const [logs, setLogs] = useState<LostAndFoundItem[] | null>(null)
  useEffect(() => {
    getAllLog().then((respond) => {
      setLogs(respond)
    })
  }, []);
  return <div className={'px-20'}>
    <h1>Lost And Found Items</h1>
    <div className="container mx-auto p-4 flex items-center">
      <table className="min-w-full bg-white">
        <thead>
        <tr>
          <th className="py-2 px-4 text-left">Picture</th>
          <th className="py-2 px-4 text-left">Location Found</th>
          <th className="py-2 px-4 text-left">Storage Location</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-left">Action</th>
        </tr>
        </thead>
        <tbody>
        {logs?.map((log, index) => (
          <>
            <tr className="border-b border-gray-200 text-gray-800 border" key={index}>
              <td className="py-2 px-4">
                <div className={'w-10 h-10 overflow-hidden rounded-lg flex justify-center items-center'}>
                  <img src={log.photoUrl} className={''} alt={"photo"}/>
                </div>
              </td>
              <td className="py-2 px-4">{log.locationFound}</td>
              <td className="py-2 px-4">{log.storageLocation}</td>
              <td className="py-2 px-4">{log.status}</td>
              <td className="py-2 px-4">
                <a href={"/laf/view-log/detail/" + log.id}>
                  <img src={actionIcon} className={"w-10"} alt={'action icon'}/>
                </a>
              </td>
            </tr>
          </>

        ))}
        </tbody>
      </table>
    </div>
  </div>
}


export default ViewLog
