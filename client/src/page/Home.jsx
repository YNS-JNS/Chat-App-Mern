import { useState } from 'react';
import io from 'socket.io-client';
import Dashboard from './Dashboard';

// connect with server
const socket = io.connect("http://localhost:5000");

const Home = () => {

    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [showChatRoom, setShowChatRoom] = useState(false);

    const joinRoom = () => {
        if (!userName || !room) {
            return alert("Please enter a user name and room!");
        }
        socket.emit("join_room", { userName, room });
        setShowChatRoom(true);
    };


    return (

        <>
            {
                !showChatRoom ? (
                    <div className='flex flex-col justify-center items-center bg-black text-white h-screen'>
                        <h1 className="text-6xl font-display mb-4">Chat App</h1>

                        <div className='my-1'>
                            <input
                                className='border-2 border-white rounded-lg px-2 py-1 bg-black'

                                type="text"
                                value={userName}
                                placeholder='Enter your username'
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className='my-1'>
                            <input
                                className='border-2 border-white rounded-lg px-2 py-1 bg-black'
                                type="text"
                                value={room}
                                placeholder='Enter your room ID'
                                onChange={(e) => setRoom(e.target.value)}
                            />
                        </div>

                        <button
                            className='border border-white p-2 px-4 my-4 bg-black hover:bg-sky-600 rounded-md'
                            onClick={joinRoom}>
                            Join room
                        </button>


                    </div>
                )
                    :
                    (
                        <Dashboard socket={socket} userName={userName} room={room} />
                    )
            }
        </>


    )
}

export default Home