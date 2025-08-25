import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function GlobalChatWidget() {
  // === Chat (전역 FAB + 모달) ===
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([
    { 
      id: "m0", 
      role: "bot", 
      text: "안녕하세요! 🤖 AI 도우미입니다. 무엇을 도와드릴까요?",
      actions: [],
      citations: []
    },
  ]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // --- Chat Refs ---
  const chatRef = useRef(null);
  const chatListRef = useRef(null);
  const chatBtnRef = useRef(null);
  const inputRef = useRef(null);

  // === Chat handlers ===
  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  // 액션 버튼 클릭 핸들러
  const handleActionClick = (action) => {
    console.log("액션 클릭:", action);
    // URL이 내부 경로인 경우 navigate 사용
    if (action.url.startsWith('/')) {
      navigate(action.url);
    } else {
      // 외부 URL인 경우 새 탭에서 열기
      window.open(action.url, '_blank');
    }
  };

  const sendMessage = useCallback(async () => {
    if (!input.trim() || pending) return;

    const userMessage = { 
      id: `m${Date.now()}`, 
      role: "user", 
      text: input,
      actions: [],
      citations: []
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    try {
      // ✅ FastAPI 챗봇 API 호출
      const response = await fetch("http://3.39.231.225:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          user: {
            id: "user",
            name: "사용자",
            role: "user"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // ✅ API 응답에서 reply, actions, citations 추출
      const botMessage = { 
        id: `m${Date.now() + 1}`, 
        role: "bot", 
        text: data.reply || "죄송합니다. 응답을 받지 못했습니다.",
        actions: data.actions || [],
        citations: data.citations || []
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error("챗봇 API 호출 오류:", error);
      const errorMessage = { 
        id: `m${Date.now() + 1}`, 
        role: "bot", 
        text: "죄송합니다. 서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
        actions: [],
        citations: []
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setPending(false);
    }
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
              
              {/* 액션 버튼들 (봇 메시지에만 표시) */}
              {msg.role === "bot" && msg.actions && msg.actions.length > 0 && (
                <div className="global-message-actions">
                  {msg.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      className="global-action-btn"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Citations 정보 (봇 메시지에만 표시) */}
              {msg.role === "bot" && msg.citations && msg.citations.length > 0 && (
                <div className="global-message-citations">
                  <div className="global-citations-title">📚 참조 문서:</div>
                  {msg.citations.map((citation, index) => (
                    <div key={index} className="global-citation-item">
                      <strong>{citation.source}</strong>: {citation.snippet}...
                    </div>
                  ))}
                </div>
              )}
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
          border-radius: 0.5rem;
          transition: background-color 0.2s ease;
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
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .global-chat-message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .global-chat-message.user {
          align-self: flex-end;
        }

        .global-chat-message.bot {
          align-self: flex-start;
        }

        .global-message-content {
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .global-chat-message.user .global-message-content {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border-bottom-right-radius: 0.25rem;
        }

        .global-chat-message.bot .global-message-content {
          background: #f3f4f6;
          color: #374151;
          border-bottom-left-radius: 0.25rem;
        }

        /* 액션 버튼 스타일 */
        .global-message-actions {
          margin-top: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .global-action-btn {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
          border: none;
          border-radius: 1rem;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .global-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        /* Citations 스타일 */
        .global-message-citations {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #666;
          font-style: italic;
        }

        .global-citations-title {
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .global-citation-item {
          padding: 0.25rem 0.5rem;
          background: rgba(0,0,0,0.05);
          border-radius: 0.25rem;
          margin-bottom: 0.125rem;
        }

        .global-typing-indicator {
          display: flex;
          gap: 0.25rem;
          align-items: center;
        }

        .global-typing-indicator span {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .global-typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .global-typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
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
          border-radius: 1.5rem;
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

        .global-send-btn:hover {
          transform: scale(1.1);
        }

        .global-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .global-send-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
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
