import { useState, useRef, useEffect } from 'react';
// import { analyzePatientInput } from '../services/aiEngine';
import "./chatView.css"
import ReactMarkdown from 'react-markdown';

export default function ChatView({ messages, setMessages }: any) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => localStorage.getItem('health_app_chat_session'));
  const chatBottomRef = useRef<any>(null);

  const [sessionsList, setSessionsList] = useState<any[]>([]);

  const fetchSessions = () => {
    fetch('/api/chat/sessions')
      .then(res => res.json())
      .then(data => {
        if (data.sessions) setSessionsList(data.sessions);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const loadSession = async (id: string) => {
    try {
      const res = await fetch(`/api/chat/sessions/${id}`);
      const data = await res.json();
      if (data.history) {
        const formatted = data.history.map((item: any) => {
          const text = item.parts[0]?.text || '';
          if (item.role === 'user') {
            return { sender: 'user', text };
          } else {
            return { sender: 'bot', html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') };
          }
        });
        setMessages(formatted);
        setSessionId(id);
        localStorage.setItem('health_app_chat_session', id);
      }
    } catch (error) {
      console.error("Error loading session:", error);
    }
  };

  const startNewSession = () => {
    setSessionId(null);
    localStorage.removeItem('health_app_chat_session');
    setMessages([{ 
      sender: 'bot', 
      html: `<p>Hello! I am your <strong>AI Healthcare Recommendation Assistant</strong>.</p><p>Describe how you are feeling or what symptoms you have (e.g., <em>"I have a high fever and headache"</em>). I will analyze your symptoms, estimate risk level, and recommend the right doctor department & first-aid steps.</p>` 
    }]);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendToBot = async (query: string, currentMessages: any[]) => {
    const lastIdx = currentMessages.length - 1;
    let messagesToUse = [...currentMessages];
    if (messagesToUse[lastIdx]?.sender === 'user') {
       messagesToUse[lastIdx] = { ...messagesToUse[lastIdx], isError: false, errorMessage: undefined };
    }
    setMessages(messagesToUse);
    setIsTyping(true);

    try {
      let response;
      if (!sessionId) {
        response = await fetch('/api/chat/new', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMessage: query })
        });
      } else {
        response = await fetch(`/api/chat/${sessionId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMessage: query })
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server responded with an error');
      }

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem('health_app_chat_session', data.sessionId);
      }
      
      // Refresh sessions list if we created a new session or added a message
      fetchSessions();

      const reply = data.reply || data.error || 'No response from server.';
      const formattedHtml = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');

      setMessages([...messagesToUse, { sender: 'bot', reply, html: reply }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMessage = 'Sorry, I encountered an error connecting to the server.';
      if (error.message) {
        try {
            const parsed = JSON.parse(error.message);
            if (parsed.error && parsed.error.message) {
                errorMessage = parsed.error.message;
            } else {
                errorMessage = error.message;
            }
        } catch(e) {
            errorMessage = error.message;
        }
      }

      const updated = [...messagesToUse];
      if (updated[lastIdx]?.sender === 'user') {
          updated[lastIdx] = { ...updated[lastIdx], isError: true, errorMessage: errorMessage };
      }
      setMessages(updated);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (e: any) => {
    e?.preventDefault();
    const query = input.trim();
    if (!query) return;

    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    sendToBot(query, newMessages);
  };

  //   const handleChipClick = (chipText) => {
  //     setInput(chipText);
  //   };

  return (
    <div style={{ display: 'flex', width: '100%', flex: 1, minHeight: 0 }}>
      {/* Sidebar */}
      <div style={{ width: '260px', borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            onClick={startNewSession} 
            style={{ width: '100%', padding: '12px', backgroundColor: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + New Chat
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sessionsList.map(session => {
            const previewText = session.history?.find((h: any) => h.role === 'user')?.parts[0]?.text || 'New Chat';
            const isSelected = sessionId === session.sessionId;
            return (
              <div 
                key={session.sessionId} 
                onClick={() => loadSession(session.sessionId)}
                style={{ 
                  padding: '16px', 
                  borderBottom: '1px solid var(--border-color)', 
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--bg-secondary)' : 'transparent',
                  borderLeft: isSelected ? '4px solid var(--accent-color)' : '4px solid transparent'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {previewText}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  {new Date(session.updatedAt).toLocaleDateString()} {new Date(session.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
        {messages.map((msg: any, index: any) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            <div className="avatar">{msg.sender === 'bot' ? '🩺' : '👤'}</div>
            <div className="message-content ai-message">
              {msg.html ? (
                <ReactMarkdown>
                  {msg.html}
                </ReactMarkdown>
              ) : (
                <ReactMarkdown>
                  {msg.text}
                </ReactMarkdown>
                // <p> hi</p>
              )}
              {msg.isError && (
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#ff4d4f', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <span>⚠️ {msg.errorMessage}</span>
                  <button 
                    onClick={() => sendToBot(msg.text, messages)}
                    style={{ padding: '4px 12px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>🔄</span> Resend
                  </button>
                </div>
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
    </div>
  );
}
