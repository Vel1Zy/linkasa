function AirOperationsManagerNavbar() {

    return <div className="flex gap-4 items-center">
        <a href="/aom/maintenance-request" className="text-sm no-underline text-black font-bold hover:underline">Maintenance Requests</a>
        <a href="/aom/maintenances" className="text-sm no-underline text-black font-bold hover:underline">Maintenance Schedule</a>
        <a href="/aom/flight-information" className="text-sm no-underline text-black font-bold hover:underline">Flight Information</a>
        <a href="/chat-employee" className="text-sm no-underline text-black font-bold hover:underline">Chat</a>
    </div>
}

export default AirOperationsManagerNavbar;
