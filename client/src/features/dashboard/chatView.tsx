import React, { useState, useRef, useEffect } from 'react';
// import { analyzePatientInput } from '../services/aiEngine';
import "./chatView.css"

export default function ChatView({ messages, setMessages } : any) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isTyping]);

  const handleSend = (e : any) => {
    e?.preventDefault();
    const query = input.trim();
    if (!query) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    //   const botResponseHtml = analyzePatientInput(query);
    //   setMessages([...newMessages, { sender: 'bot', html: botResponseHtml }]);
    }, 700);
  };

//   const handleChipClick = (chipText) => {
//     setInput(chipText);
//   };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg : any, index : any) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            <div className="avatar">{msg.sender === 'bot' ? '🩺' : '👤'}</div>
            <div className="message-content">
              {msg.html ? (
                <div dangerouslySetInnerHTML={{ __html: msg.html }} />
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
            <div className="avatar">🩺</div>
            <div className="message-content">
              <div className="typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* <div style={{ padding: '0 24px 10px 24px' }}>
        <div className="suggestion-chips">
          <button className="chip" onClick={() => handleChipClick("I have a high fever and body ache")}>
            🌡️ Fever & Body Ache
          </button>
          <button className="chip" onClick={() => handleChipClick("Severe headache and dizziness")}>
            🤕 Headache & Dizziness
          </button>
          <button className="chip" onClick={() => handleChipClick("Stomach pain and nausea after eating")}>
            🤢 Stomach Pain
          </button>
          <button className="chip" onClick={() => handleChipClick("Red skin rash and itching")}>
            🧴 Skin Rash
          </button>
        </div>
      </div> */}

      <footer className="chat-input-container">
        <form onSubmit={handleSend} className="chat-form">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your symptoms or health query here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
        <div className="disclaimer">
          ⚠️ Disclaimer: This tool provides preliminary health guidance only and is not a substitute for professional medical diagnosis.
        </div>
      </footer>
    </div>
  );
}
