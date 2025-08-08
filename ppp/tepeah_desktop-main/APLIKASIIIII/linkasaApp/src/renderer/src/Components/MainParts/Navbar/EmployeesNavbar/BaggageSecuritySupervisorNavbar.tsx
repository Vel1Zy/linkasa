
function BaggageSecuritySupervisorNavbar() {
    return <div className="flex gap-4 items-center">
        <a href="/security-staff-schedules" className="text-sm no-underline text-black font-bold hover:underline">Security Staff Schedule</a>
        <a href="/flight-information" className="text-sm no-underline text-black font-bold hover:underline">Flight Information</a>
        <a href="/lost-and-founds" className="text-sm no-underline text-black font-bold hover:underline">View Lost And Found</a>
        <a href="/add-lost-and-founds" className="text-sm no-underline text-black font-bold hover:underline">Add Lost And Found</a>
        <a href="/security-incident" className="text-sm no-underline text-black font-bold hover:underline">Security Incidents</a>
    </div>   
}

export default BaggageSecuritySupervisorNavbar;
