import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { User } from '../../types/user';

interface ChatProps {
  currentUser: User;
  recipient: User;
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ recipient, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b">
        <img
          src={recipient.profileImage || '/default-avatar.png'}
          alt={recipient.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-medium">{recipient.name}</h3>
          <p className="text-sm text-gray-500">En línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSend}
            className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full"
            title="Enviar mensaje"
          >
            <Send className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full"
            title="Adjuntar archivo"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </form>
    </div>
  );
};

export default Chat;
