import React, { useState, useEffect, useContext } from 'react'
import { db, auth } from '../../FirebaseConfig'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  limit,
  getDocs,
  DocumentData
} from 'firebase/firestore'
import { AuthContext } from '../../AuthContext'

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<
    {
      message: string
      senderName: string
      senderRole: string
    }[]
  >([])
  const [newMessage, setNewMessage] = useState('')

  const { user } = useContext(AuthContext)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const initialQuery = query(
          collection(db, 'globalChat'),
          orderBy('timestamp', 'desc'),
          limit(25)
        )
        const initialSnapshot = await getDocs(initialQuery)

        const initialMessages = initialSnapshot.docs.map((doc) => {
          const data = doc.data() as {
            message: string
            senderName: string
            senderRole: string
          }
          return data
        })
        setMessages([...initialMessages.reverse(), ...messages])
      } catch (error) {
        console.error('Error loading initial messages:', error)
      }
    }

    const unsubscribe = onSnapshot(
      query(collection(db, 'globalChat'), orderBy('timestamp')),
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          const data = doc.data() as {
            message: string
            senderName: string
            senderRole: string
          }
          return data
        })
        setMessages(newMessages)
      }
    )

    loadMessages()

    return () => unsubscribe()
  }, [])

  const sendMessage = async () => {
    if (newMessage.trim() !== '' && user) {
      const { name, position } = user

      await addDoc(collection(db, 'globalChat'), {
        message: newMessage,
        timestamp: new Date(),
        senderName: name,
        senderRole: position
      })

      setNewMessage('')
    } else {
      // Handle the case when the user is not authenticated
      console.error('User not authenticated')
    }
  }

  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-white rounded shadow">
      <div className="mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong className="text-blue-700">{message.senderName}</strong>{' '}
            <span className="text-gray-600">({message.senderRole}):</span> {message.message}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border rounded px-2 py-1 mr-2 flex-grow"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
