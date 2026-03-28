import React, { useState, useRef, useEffect } from 'react';
import '../../assets/css/Chat.css';

// Icons
const IconSend: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Mock conversations
const conversations = [
  {
    id: '1',
    courier: { name: 'Musa K.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
    lastMessage: 'I have arrived at your location.',
    lastMessageTime: '10:30 AM',
    unread: 0,
    messages: [
      { id: 1, text: 'Hello, I am on my way to pick up your package.', sender: 'courier', time: '10:00 AM' },
      { id: 2, text: 'Okay, thank you! I will be waiting.', sender: 'user', time: '10:05 AM' },
      { id: 3, text: 'I have arrived at your location.', sender: 'courier', time: '10:30 AM' },
    ],
  },
  {
    id: '2',
    courier: { name: 'Amina T.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', online: false },
    lastMessage: 'Please confirm delivery address.',
    lastMessageTime: 'Yesterday',
    unread: 2,
    messages: [
      { id: 1, text: 'Hi, please confirm delivery address.', sender: 'courier', time: 'Yesterday' },
      { id: 2, text: 'Sure, it is 45 Victoria Island.', sender: 'user', time: 'Yesterday' },
    ],
  },
];

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState(conversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(c => c.id === selectedChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat) {
        const newMsg = {
          id: Date.now(),
          text: newMessage,
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: 'Just now',
          unread: 0,
        };
      }
      return chat;
    });
    setChats(updatedChats);
    setNewMessage('');
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <h2>Messages</h2>
          <p>Chat with your couriers</p>
        </div>
        <div className="chat-conversations">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`conversation-item ${selectedChat === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="conversation-avatar">
                <img src={chat.courier.avatar} alt={chat.courier.name} />
                {chat.courier.online && <span className="online-dot" />}
              </div>
              <div className="conversation-info">
                <div className="conversation-name">{chat.courier.name}</div>
                <div className="conversation-last-message">{chat.lastMessage}</div>
              </div>
              <div className="conversation-meta">
                <div className="conversation-time">{chat.lastMessageTime}</div>
                {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        {!selectedChat ? (
          <div className="chat-empty">
            <IconUser />
            <p>Select a conversation to start chatting</p>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <img src={currentChat?.courier.avatar} alt={currentChat?.courier.name} className="chat-avatar" />
                <div>
                  <h3>{currentChat?.courier.name}</h3>
                  <p>{currentChat?.courier.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {currentChat?.messages.map(msg => (
                <div key={msg.id} className={`message ${msg.sender === 'user' ? 'message-outgoing' : 'message-incoming'}`}>
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" disabled={!newMessage.trim()}>
                <IconSend />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;