import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'


const socket = io('http://localhost:3000')

function App() {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.emit('chat', { message });
      setMessage('');
    }
  };



  useEffect(() => {
    socket.on('chat', (data) => {
      setChat([...chat, data]
      )
    })
  }, [sendChat])

  console.log(chat);

  return (
    <div className='mx-auto flex flex-col justify-center items-center bg-gray-900 min-h-screen'>
      <h1 className='text-4xl font-bold text-white'>Chat App</h1>
      <div className='mt-12 bg-gray-[#03203C] rounded-lg backdrop-blur-lg w-[400px] px-4 pt-4 bg-gradient-to-b from-white/60 to-white/30  border-2 h-96 flex flex-col justify-between'>
        <h2 className='text-center mb-8 text-white'>Messages</h2>
        <div className='flex flex-col items-end overflow-x-hidden pr-1'>
          {chat?.map((payload, index) => {
            return (
              <div key={nanoid(10)} className='bg-gray-800 py-[6px] rounded-full px-4 w-fit my-1'>
                <p className='text-white'>{payload.message}</p>
              </div>
            )
          })}
        </div>
      </div>

      <form onSubmit={sendChat} className='relative mt-6 bg-gray-[#03203C] rounded-lg backdrop-blur-lg w-[400px] px-4 py-16 bg-gradient-to-b from-white/60 to-white/30  border-2 '>
        <input type="text" name='chat' placeholder='Send Message...' className='py-[6px] px-3 rounded-full w-full' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className='absolute right-[15px] bg-fuchsia-500 hover:bg-fuchsia-300 transition-all rounded-full py-[6px] px-4'>Send </button>
      </form>
    </div>
  )
}

export default App
