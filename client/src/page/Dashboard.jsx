import React from 'react';
import ChatRoom from '../components/ChatRoom';

const Dashboard = ({ socket, userName, room }) => {
    return (
        <div className="flex">
            <div className="w-1/4 h-screen bg-black sticky top-0 p-4 text-white border-r-2">
                {/* <h2 className="text-lg font-bold mb-4 border px-1 text-center rounded-lg">Dashboard</h2> */}
                <h2 className="text-lg font-bold mb-4 px-1 rounded-lg">
                    🟢 online
                </h2>
                <h2 className="text-lg font-bold mb-4 border px-1 text-center rounded-lg">
                    {userName}
                </h2>
                <ul className="list-none">
                    <li className="mb-2"><a href="#" className="text-gray-400 hover:text-gray-100">
                        Room : {room}
                    </a></li>
                    <li className="mb-2"><a href="#" className="text-gray-400 hover:text-gray-100">
                        ID : {socket.id}
                    </a></li>
                </ul>
            </div>
            <div className="w-3/4">
                <ChatRoom socket={socket} userName={userName} room={room} />
            </div>
        </div>
    );
};

export default Dashboard;
