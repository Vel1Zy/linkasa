

function MaintenanceManagerNavbar() {
    return <div className="flex gap-4 items-center">
        <a href="/maintenanceManager/maintenances" className="text-sm no-underline text-black font-bold hover:underline">Maintenances</a>
        <a href="/chat-employee" className="text-sm no-underline text-black font-bold hover:underline">Chat</a>
        <a href="/mm/maintenance-request" className="text-sm no-underline text-black font-bold hover:underline">Maintenance Request</a>
    </div>
}

export default MaintenanceManagerNavbar;
