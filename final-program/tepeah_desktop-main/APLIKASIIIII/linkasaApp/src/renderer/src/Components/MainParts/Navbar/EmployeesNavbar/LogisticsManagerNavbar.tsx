
function LogisticsManagerNavbar() {
    return <div className="flex gap-4 items-center">
        <a href="/chat-employee" className="text-sm no-underline text-black font-bold hover:underline">Chat</a>
        <a href="/logistics" className="text-sm no-underline text-black font-bold hover:underline">Logistic</a>
        <a href="/logistics/create" className="text-sm no-underline text-black font-bold hover:underline">Create Logistic</a>
        <a href="/logistics/report" className="text-sm no-underline text-black font-bold hover:underline">Logistic Reports</a>
    </div>
}

export default LogisticsManagerNavbar;
