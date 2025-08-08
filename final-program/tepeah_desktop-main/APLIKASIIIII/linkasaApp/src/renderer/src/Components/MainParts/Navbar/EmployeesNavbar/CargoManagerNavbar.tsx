
function CargoManagerNavbar() {
    return <div className="flex gap-4 items-center">
        <a href="/cargo/create" className="text-sm no-underline text-black font-bold hover:underline">Cargo</a>
        <a href="/cargo/task" className="text-sm no-underline text-black font-bold hover:underline">Task</a>
        <a href="/chat-employee" className="text-sm no-underline text-black font-bold hover:underline">Chat</a>
    </div>
}

export default CargoManagerNavbar;
