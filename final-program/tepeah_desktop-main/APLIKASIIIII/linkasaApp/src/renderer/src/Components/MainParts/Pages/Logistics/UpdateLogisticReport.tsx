import {updateReport} from "@renderer/Controller/GeneralControls/LogisticController";
import {LogisticReport} from "@renderer/Controller/Interfaces/LogisticReportInterface";
import {useState} from "react";

interface I {
    report : LogisticReport
    c : () => void
}


function UpdateLogisticReport(props : I)  {
    const report = props.report;
    const [desc, setDesc] = useState('')

    const updateHandle = () => {
        updateReport(report, desc).then((result) => {
            if(result) props.c();
        })   
    }

    return (
        <div>
            <p className="text-2xl font-bold">Update Report</p>            
            <p>updating {report.reportID}</p>
            <textarea
                name="report"
                rows={4}
                className="w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300 p-3"
                placeholder="Report"
                onChange={(o) => setDesc(o.target.value)}
            ></textarea>
            <button
                className="border-none mt-2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                onClick={updateHandle}
            >
                Update Report
            </button>
        </div>
    );
}

export default UpdateLogisticReport;
