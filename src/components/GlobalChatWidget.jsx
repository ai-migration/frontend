import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

function GlobalChatWidget() {
  // === Chat (전역 FAB + 모달) ===
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([
    { id: "m0", role: "bot", text: "안녕하세요! 🤖 AI 도우미입니다. 무엇을 도와드릴까요?" },
  ]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");

  // --- Chat Refs ---
  const chatRef = useRef(null);
  const chatListRef = useRef(null);
  const chatBtnRef = useRef(null);
  const inputRef = useRef(null);

  // === Chat handlers ===
  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || pending) return;

    const userMessage = { id: `m${Date.now()}`, role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = { 
        id: `m${Date.now() + 1}`, 
        role: "bot", 
        text: "죄송합니다. 현재 AI 응답 기능이 준비 중입니다. 곧 더 나은 서비스를 제공하겠습니다!" 
      };
      setMessages((prev) => [...prev, botMessage]);
      setPending(false);
    }, 1000);
  }, [input, pending]);

  // === Chat keyboard shortcuts ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isChatOpen) {
        toggleChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChatOpen, toggleChat]);

  // === Chat auto-scroll ===
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  // === Chat portal ===
  const chatPortal = createPortal(
    <>
      {/* Modal */}
      <div
        ref={chatRef}
        className={`global-chat-modal ${isChatOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
      >
        <div className="global-chat-modal-header">
          <div className="global-chat-title-section">
            <div className="global-chat-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div className="global-chat-title-info">
              <h2 id="chat-title">AI 도우미</h2>
              <span className="global-chat-status">온라인</span>
            </div>
          </div>
          <button
            ref={chatBtnRef}
            onClick={toggleChat}
            className="global-chat-close-btn"
            aria-label="챗봇 닫기"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div ref={chatListRef} className="global-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`global-chat-message ${msg.role}`}>
              <div className="global-message-content">{msg.text}</div>
            </div>
          ))}
          {pending && (
            <div className="global-chat-message bot">
              <div className="global-message-content">
                <div className="global-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="global-chat-input">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="메시지를 입력하세요..."
            disabled={pending}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || pending}
            className="global-send-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      {/* Global Chat FAB */}
      <button
        ref={chatBtnRef}
        onClick={toggleChat}
        className="global-chat-fab"
        aria-label={isChatOpen ? "챗봇 닫기" : "챗봇 열기"}
        title={isChatOpen ? "챗봇 닫기" : "챗봇 열기"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        {unread > 0 && <span className="global-unread-badge">{unread}</span>}
      </button>

      {/* Chat Portal */}
      {chatPortal}

      <style>{`
        /* Global Chat FAB */
        .global-chat-fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .global-chat-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
        }

        .global-chat-fab svg {
          width: 24px;
          height: 24px;
        }

        .global-unread-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Global Chat Modal Styles */
        .global-chat-modal {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 500px;
          height: 700px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          transform: translateY(100%) scale(0.8);
          opacity: 0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .global-chat-modal.open {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        .global-chat-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        .global-chat-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .global-chat-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .global-chat-avatar svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .global-chat-title-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .global-chat-title-info h2 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .global-chat-status {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .global-chat-close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .global-chat-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .global-chat-close-btn svg {
          width: 20px;
          height: 20px;
        }

        .global-chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .global-chat-message {
          display: flex;
          margin-bottom: 0.5rem;
        }

        .global-chat-message.user {
          justify-content: flex-end;
        }

        .global-chat-message.bot {
          justify-content: flex-start;
        }

        .global-message-content {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .global-chat-message.user .global-message-content {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .global-chat-message.bot .global-message-content {
          background: #f3f4f6;
          color: #374151;
          border-bottom-left-radius: 4px;
        }

        .global-typing-indicator {
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem;
        }

        .global-typing-indicator span {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: globalTyping 1.4s infinite ease-in-out;
        }

        .global-typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .global-typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes globalTyping {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .global-chat-input {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .global-chat-input input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 25px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .global-chat-input input:focus {
          border-color: #3b82f6;
        }

        .global-send-btn {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .global-send-btn:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .global-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .global-send-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .global-chat-fab {
            bottom: 1rem;
            right: 1rem;
            width: 50px;
            height: 50px;
          }

          .global-chat-fab svg {
            width: 20px;
            height: 20px;
          }

          .global-chat-modal {
            width: calc(100vw - 2rem);
            height: calc(100vh - 2rem);
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default GlobalChatWidget;
