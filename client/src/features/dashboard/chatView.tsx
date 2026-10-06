import { useState, useRef, useEffect } from "react";
import { MoreVertical, Trash2, Edit2, Pin, Save, Share2, Stethoscope, User, AlertTriangle, RefreshCw } from "lucide-react";
// import { analyzePatientInput } from '../services/aiEngine';
import "./chatView.css";
import ReactMarkdown from "react-markdown";

export default function ChatView({ messages, setMessages }: any) {
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState(() => localStorage.getItem("health_app_chat_session"));
    const chatBottomRef = useRef<any>(null);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveMenuId(null);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const [sessionsList, setSessionsList] = useState<any[]>([]);

    const fetchSessions = () => {
        fetch("/api/chat/sessions")
            .then((res) => res.json())
            .then((data) => {
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
                    const text = item.parts[0]?.text || "";
                    if (item.role === "user") {
                        return { sender: "user", text };
                    } else {
                        return { sender: "bot", text };
                    }
                });
                setMessages(formatted);
                setSessionId(id);
                localStorage.setItem("health_app_chat_session", id);
            }
        } catch (error) {
            console.error("Error loading session:", error);
        }
    };

    const startNewSession = () => {
        setSessionId(null);
        localStorage.removeItem("health_app_chat_session");
        setMessages([
            {
                sender: "bot",
                text: `Hello! I am your **AI Healthcare Recommendation Assistant**.\n\nDescribe how you are feeling or what symptoms you have (e.g., *"I have a high fever and headache"*). I will analyze your symptoms, estimate risk level, and recommend the right doctor department & first-aid steps.`,
            },
        ]);
    };

    const handleDeleteSession = async (id: string) => {
        try {
            await fetch(`/api/chat/sessions/${id}`, { method: 'DELETE' });
            if (id === sessionId) {
                startNewSession();
            }
            fetchSessions();
        } catch (e) {
            console.error("Error deleting session", e);
        }
    };

    const handleRenameSession = async (id: string, currentTitle: string) => {
        const newTitle = prompt("Enter new session name:", currentTitle);
        if (newTitle && newTitle.trim() !== "") {
            try {
                await fetch(`/api/chat/sessions/${id}/rename`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: newTitle.trim() })
                });
                fetchSessions();
            } catch (e) {
                console.error("Error renaming session", e);
            }
        }
    };

    const handlePinSession = async (id: string, currentPinStatus: boolean) => {
        try {
            await fetch(`/api/chat/sessions/${id}/pin`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPinned: !currentPinStatus })
            });
            fetchSessions();
        } catch (e) {
            console.error("Error pinning session", e);
        }
    };

    const handleSaveTranscript = (id: string) => {
        // Download transcript as text file
        const textToSave = messages.map((m: any) => `${m.sender === 'bot' ? 'AI Assistant' : 'User'}: ${m.text}`).join('\n\n');
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Consultation_Transcript_${id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleShareSession = (id: string) => {
        // Mock share for now
        alert(`Sharing session link for ${id} (link copied to clipboard)`);
        navigator.clipboard.writeText(`http://localhost:5173/dashboard/chat?session=${id}`);
    };

    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendToBot = async (query: string, currentMessages: any[]) => {
        const lastIdx = currentMessages.length - 1;
        let messagesToUse = [...currentMessages];
        if (messagesToUse[lastIdx]?.sender === "user") {
            messagesToUse[lastIdx] = { ...messagesToUse[lastIdx], isError: false, errorMessage: undefined };
        }
        setMessages(messagesToUse);
        setIsTyping(true);

        try {
            let response;
            if (!sessionId) {
                response = await fetch("/api/chat/new", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userMessage: query }),
                });
            } else {
                response = await fetch(`/api/chat/${sessionId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userMessage: query }),
                });
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Server responded with an error");
            }

            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
                localStorage.setItem("health_app_chat_session", data.sessionId);
            }

            // Refresh sessions list if we created a new session or added a message
            fetchSessions();

            const reply = data.reply || data.error || "No response from server.";

            setMessages([...messagesToUse, { sender: "bot", text: reply }]);
        } catch (error: any) {
            console.error("Chat error:", error);
            let errorMessage = "Sorry, I encountered an error connecting to the server.";
            if (error.message) {
                try {
                    const parsed = JSON.parse(error.message);
                    if (parsed.error && parsed.error.message) {
                        errorMessage = parsed.error.message;
                    } else {
                        errorMessage = error.message;
                    }
                } catch (e) {
                    errorMessage = error.message;
                }
            }

            const updated = [...messagesToUse];
            if (updated[lastIdx]?.sender === "user") {
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

        const newMessages = [...messages, { sender: "user", text: query }];
        setMessages(newMessages);
        setInput("");
        sendToBot(query, newMessages);
    };

    //   const handleChipClick = (chipText) => {
    //     setInput(chipText);
    //   };

    return (
        <div style={{ display: "flex", width: "100%", flex: 1, minHeight: 0 }}>
            {/* Sidebar */}
            <div
                style={{
                    width: "260px",
                    borderRight: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-primary)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div style={{ padding: "16px", borderBottom: "1px solid var(--border-color)" }}>
                    <button
                        onClick={startNewSession}
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "var(--accent-color)",
                            color: "white",
                            border: "none",
                            borderRadius: "var(--radius-sm)",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        + New Chat
                    </button>
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {sessionsList.map((session) => {
                        const defaultPreview = session.history?.find((h: any) => h.role === "user")?.parts[0]?.text || "New Chat";
                        const previewText = session.title || defaultPreview;
                        const isSelected = sessionId === session.sessionId;
                        return (
                            <div
                                key={session.sessionId}
                                onClick={() => loadSession(session.sessionId)}
                                className="group relative"
                                style={{
                                    padding: "16px",
                                    borderBottom: "1px solid var(--border-color)",
                                    cursor: "pointer",
                                    backgroundColor: isSelected ? "var(--bg-secondary)" : "transparent",
                                    borderLeft: isSelected ? "4px solid var(--accent-color)" : "4px solid transparent",
                                }}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "var(--text-primary)",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            flex: 1
                                        }}
                                    >
                                        {previewText}
                                    </div>
                                    <div className="relative">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveMenuId(activeMenuId === session.sessionId ? null : session.sessionId);
                                            }}
                                            className="p-1 hover:bg-gray-200 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                        
                                        {activeMenuId === session.sessionId && (
                                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-[100] py-1" onClick={e => e.stopPropagation()}>
                                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700" onClick={() => { setActiveMenuId(null); handleRenameSession(session.sessionId, previewText); }}>
                                                    <Edit2 size={14} /> Rename
                                                </button>
                                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700" onClick={() => { setActiveMenuId(null); handlePinSession(session.sessionId, session.isPinned); }}>
                                                    <Pin size={14} className={session.isPinned ? "fill-current text-blue-600" : ""} /> {session.isPinned ? "Unpin" : "Pin"}
                                                </button>
                                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700" onClick={() => { setActiveMenuId(null); handleSaveTranscript(session.sessionId); }}>
                                                    <Save size={14} /> Save
                                                </button>
                                                <button className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700" onClick={() => { setActiveMenuId(null); handleShareSession(session.sessionId); }}>
                                                    <Share2 size={14} /> Share
                                                </button>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <button className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center gap-2 text-sm text-red-600" onClick={() => { setActiveMenuId(null); handleDeleteSession(session.sessionId); }}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    {session.isPinned && <Pin size={12} className="fill-current text-blue-600 shrink-0" />}
                                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                                        {new Date(session.updatedAt).toLocaleDateString()}{" "}
                                        {new Date(session.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="chat-container relative">
                {/* Removed top header menu as it was moved to sidebar */}

                <div className="chat-messages">
                    {messages.map((msg: any, index: any) => (
                        <div key={index} className={`message ${msg.sender}-message`}>
                            <div className={`avatar flex items-center justify-center rounded-full text-white ${msg.sender === 'bot' ? 'bg-blue-600' : 'bg-gray-400'}`}>
                                {msg.sender === "bot" ? <Stethoscope size={18} /> : <User size={18} />}
                            </div>
                            <div className={`message-content ${msg.sender === "bot" ? "ai-message" : ""}`}>
                                {msg.sender === "bot" ? (
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                ) : (
                                    msg.text
                                )}
                                {msg.isError && (
                                    <div
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "13px",
                                            color: "#ff4d4f",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px",
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <span className="flex items-center gap-1"><AlertTriangle size={14} /> {msg.errorMessage}</span>
                                        <button
                                            onClick={() => sendToBot(msg.text, messages)}
                                            style={{
                                                padding: "4px 12px",
                                                backgroundColor: "#ff4d4f",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                            }}
                                        >
                                            <RefreshCw size={14} /> Resend
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message bot-message">
                            <div className="avatar flex items-center justify-center rounded-full bg-blue-600 text-white"><Stethoscope size={18} /></div>
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
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                    </form>
                    <div className="disclaimer flex items-center gap-1">
                        <AlertTriangle size={14} className="text-yellow-600" /> Disclaimer: This tool provides preliminary health guidance only and is not a substitute for professional medical diagnosis.
                    </div>
                </footer>
            </div>
        </div>
    );
}
