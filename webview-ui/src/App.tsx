import useChatStore from './store/useChatStore';
import { useState } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, input, setInput, addMessage } = useChatStore();

  const sendMessage = () => {
    if (input.trim()) {
      setIsLoading(true);
      const newMessage: Message = { text: input, sender: 'user' };
      addMessage(newMessage);
      setInput('');

      // Mock AI response
      setTimeout(() => {
        addMessage({ text: 'Hello! How can I assist?', sender: 'ai' });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e]">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-1">
          <div className="h-full bg-[#0066b8] animate-loading-bar"></div>
        </div>
      )}
      
      <div className="p-3 border-b border-[#333333] bg-[#2d2d2d]">
        <h2 className="text-[#cccccc] text-sm font-medium">Chat Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 mr-2 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-xs text-white">AI</span>
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-[85%] ${
                msg.sender === 'ai'
                  ? 'bg-[#2d2d2d] text-[#cccccc]'
                  : 'bg-[#0066b8] text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#333333] bg-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 p-2 rounded-md bg-[#3c3c3c] border border-[#444444] 
                       text-[#cccccc] focus:outline-none focus:border-[#0066b8]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-3 py-2 rounded-md bg-[#0066b8] text-white 
                     hover:bg-[#005499] transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
