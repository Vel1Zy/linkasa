import {utc} from "@renderer/Controller/GeneralControls/DateControl";
import {createLogisticReport, deleteReport, getReport} from "@renderer/Controller/GeneralControls/LogisticController";
import {LogisticReport} from "@renderer/Controller/Interfaces/LogisticReportInterface";
import {useEffect, useState} from "react";
import UpdateLogisticReport from "./UpdateLogisticReport";

function LogisticReports() {
    const [report, setReport] = useState('')
    const [reports, setReports] = useState<LogisticReport[]>([])
    const [change, setChange] = useState(0)
    const [chosen, setchosen] = useState<LogisticReport>()

    useEffect(() => {
        getReport().then((rs) => {
            setReports(rs)
        })
    }, [change])

    const c = () => {
        setChange(change + 1)
    }

    const createHandle = () => {
        createLogisticReport(report).then((result) => {
            if(result) c()
        })
    }

    return (
        <div className="px-20 py-5 flex flex-col gap-3">
            <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {reports.map((r, index) =>  (
                    <div className="container mx-auto p-4" 
                    onClick={() => setchosen(r)}>
                            <div key={index} className="max-w-md mx-auto bg-white rounded overflow-hidden shadow-lg">
                                <div className="p-6">
                                    <div className="font-bold text-xl mb-2">Date : {utc(r.date.seconds)}</div>
                                    <p className="text-gray-700 text-base">{r.report}</p>
                                    <div className="flex gap-2">
                                        <button
                                            className="border-none mt-2 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none"
                                            onClick={() => {
                                                deleteReport(r).then((result) => {
                                                    if(result) c()
                                                })
                                            }}
                                        >
                                            Delete?
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}   
            </div>

            {chosen ?<UpdateLogisticReport c={c} report={chosen}></UpdateLogisticReport> : <></>}
            
            
            <p className="text-2xl font-bold">Create Logistic Report</p>
            <div className="w-1/2">
                <textarea
                    name="date"
                    className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                    placeholder="Report"
                    rows={4}
                    onChange={(o) => setReport(o.target.value)}
                ></textarea>
                <button
                    className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    onClick={createHandle}
                >
                    Create Report
                </button>
            </div>
            
        </div>
    );
}

export default LogisticReports;
