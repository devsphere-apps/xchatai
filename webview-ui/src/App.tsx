import useChatStore from './store/useChatStore';
import { useState } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const DEMO_RESPONSES: { [key: string]: string } = {
  "setup": 
    "1. Install Node.js and npm\n2. Install React Native CLI globally\n3. Create new project: npx react-native init MyApp\n4. cd into project directory\n5. Run npm install\n6. Start Metro bundler\n7. Run on Android/iOS",

  "flexbox": 
    "1. Use flex: 1 for full container\n2. Set flexDirection (row/column)\n3. Use justifyContent for main axis\n4. Use alignItems for cross axis\n5. Apply padding/margin as needed",

  "navigation": 
    "1. Install @react-navigation/native\n2. Install @react-navigation/stack\n3. Install required dependencies\n4. Setup NavigationContainer\n5. Create Stack Navigator\n6. Define screens\n7. Add navigation logic",

  "styling": 
    "1. Create StyleSheet object\n2. Define styles using camelCase\n3. Use numbers for dimensions\n4. Apply platform-specific styles\n5. Use style arrays for multiple styles",

  "flatlist": 
    "1. Import FlatList component\n2. Prepare data array\n3. Define renderItem function\n4. Add keyExtractor\n5. Handle onRefresh\n6. Implement pagination\n7. Add list header/footer",

  "state": 
    "1. Import useState hook\n2. Define state variable\n3. Use setState function\n4. Import useEffect if needed\n5. Handle side effects\n6. Clean up when needed",

  "platform": 
    "1. Use Platform.select()\n2. Check Platform.OS\n3. Create platform-specific files\n4. Use platform-specific extensions\n5. Handle platform differences",

  "debug": 
    "1. Enable developer menu\n2. Use console.log\n3. Enable remote debugging\n4. Use Chrome DevTools\n5. Install React Native Debugger\n6. Set breakpoints",

  "apis": 
    "1. AsyncStorage\n2. Fetch API\n3. Animated\n4. Alert\n5. Dimensions\n6. AppState\n7. Linking\n8. Geolocation\n9. Camera\n10. Push Notifications",

  "help": 
    "Ask me about:\n1. setup - New project setup\n2. flexbox - Layout design\n3. navigation - React Navigation\n4. styling - Component styling\n5. flatlist - List handling\n6. state - State management\n7. platform - Platform-specific code\n8. debug - Debugging tips\n9. apis - Common APIs\n10. Type 'help' for this list"
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, input, setInput, addMessage } = useChatStore();

  const sendMessage = () => {
    if (input.trim()) {
      setIsLoading(true);
      const newMessage: Message = { text: input, sender: 'user' };
      addMessage(newMessage);

      const currentInput = input.toLowerCase().trim();
      setInput('');

      setTimeout(() => {
        // Find exact match or partial match
        const key = Object.keys(DEMO_RESPONSES).find(k => 
          currentInput.includes(k) || k.includes(currentInput)
        );

        const response = key 
          ? DEMO_RESPONSES[key]
          : "I'm here to help with your coding questions! Type 'help' to see available topics.";

        addMessage({ text: response, sender: 'ai' });
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

      {/* Updated welcome message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-white">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Welcome, ABDUL MATEEN!</h2>
            <p className="text-lg text-[#0066b8]">Ask me anything about React Native!</p>
            <div className="text-sm text-[#4dc4ff] mt-6">
              Try asking about: <span className="text-[#89d185]">"setup"</span>, 
              <span className="text-[#89d185]">"flexbox"</span>, 
              <span className="text-[#89d185]">"navigation"</span>, etc.
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 mr-2 flex-shrink-0 rounded-full bg-[#0066b8] flex items-center justify-center">
                <span className="text-xs text-white">AI</span>
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
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

      {/* Input area */}
      <div className="border-t border-[#333333] bg-[#1e1e1e] p-4">
        <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-lg p-2">
          <input
            className="flex-1 bg-transparent border-none text-[#cccccc] 
                     placeholder-[#666666] focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-md hover:bg-[#333333] transition-colors"
          >
            <svg className="w-5 h-5 text-[#0066b8]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
