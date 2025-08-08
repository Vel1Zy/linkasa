

function HRDNavbar (){
    return <div className="flex gap-4 items-center">
        <a href="/hrd/employee-information" className="text-sm no-underline text-black font-bold hover:underline">Employee Information</a>
        <a href="/hrd/create-employee" className="text-sm no-underline text-black font-bold hover:underline">Create Employee</a>
        <a href="/hrd/jobs" className="text-sm no-underline text-black font-bold hover:underline">Job Vacancy</a>
        <a href="/chat-employee" className="text-sm no-underline text-black font-bold hover:underline">Chat</a>
    </div>
}

export default HRDNavbar
