import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import EgovProgressBar from "@/components/EgovProgressBar";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import CODE from "@/constants/code";

import { setSessionItem } from "@/utils/storage";
import { getSessionItem } from "@/utils/storage";

function EgovTestPage() {
  const esRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]); // 수신 메시지 기록
  const [status, setStatus] = useState("IDLE"); // IDLE | RUNNING | DONE | ERROR
  const [progress, setProgress] = useState(0);

  // === 실제 챗봇 기능 ===
  const [messages, setMessages] = useState([
    { 
      id: "m0", 
      role: "bot", 
      text: "안녕하세요! 🤖 AI 도우미입니다. 무엇을 도와드릴까요?",
      timestamp: new Date(),
      actions: [],
      citations: []
    }
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const chatListRef = useRef(null);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim() || pending) return;

    const userMessage = { 
      id: `m${Date.now()}`, 
      role: "user", 
      text: input,
      timestamp: new Date(),
      actions: [],
      citations: []
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPending(true);

    try {
      // ✅ FastAPI 챗봇 API 호출
      const response = await fetch("/api/chat", {
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
        timestamp: new Date(),
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
        timestamp: new Date(),
        actions: [],
        citations: []
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setPending(false);
    }
  };

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

  // === Chat auto-scroll ===
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // 언마운트 시 연결 정리
    return () => {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, []);

  const appendLog = (line) =>
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}  ${line}`]);

  const handleStart = () => {
    if (running || esRef.current) return; // 중복 시작 방지
    setLogs([]);
    setProgress(0);
    setStatus("RUNNING");
    setRunning(true);

    const es = new EventSource("http://localhost:8088/agents/test");
    esRef.current = es;

    es.addEventListener("step", (e) => {
      appendLog(`STEP: ${e.data}`);
      setProgress(prev => prev + 10);
    });

    es.addEventListener("done", (e) => {
      appendLog(`DONE: ${e.data}`);
      setStatus("DONE");
      setRunning(false);
      es.close();
      esRef.current = null;
    });

    es.addEventListener("error", (e) => {
      // 서버에서 보낸 error 이벤트 또는 네트워크 오류
      try {
        const data = e?.data ? JSON.parse(e.data) : null;
        appendLog(`ERROR: ${data?.message ?? "connection error"}`);
      } catch {
        appendLog("ERROR: connection error");
      }
      setStatus("ERROR");
      setRunning(false);
      es.close();
      esRef.current = null;
    });
  };

  const handleStop = () => {
    if (esRef.current) {
      appendLog("STOP: 사용자에 의해 연결 종료");
      esRef.current.close();
      esRef.current = null;
    }
    setRunning(false);
    setStatus("IDLE");
  };

  return (
    <div className="container">
      <div className="c_wrap">
        {/* Location */}
        <div className="location">
          <ul>
            <li>
              <a className="home" href="#!">
                Home
              </a>
            </li>
            <li>AI 챗봇</li>
          </ul>
        </div>

        <div className="layout">
          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* 본문 */}
            <div className="top_tit">
              <h1 className="tit_1">AI 챗봇</h1>
            </div>

            {/* 실제 챗봇 Section */}
            <div className="board_view2" style={{paddingTop: 20}}>
              <div style={{ maxWidth: 800, margin: "24px auto", fontFamily: "sans-serif" }}>
                
                {/* 챗봇 헤더 */}
                <div style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  padding: "20px",
                  borderRadius: "12px 12px 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    🤖
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px" }}>AI 도우미</h3>
                    <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>전자정부프레임워크 전문가</p>
                  </div>
                </div>

                {/* 챗봇 메시지 영역 */}
                <div
                  ref={chatListRef}
                  style={{
                    height: "500px",
                    overflowY: "auto",
                    padding: "20px",
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    borderTop: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}
                >
                  {messages.map((msg) => (
                    <div key={msg.id} style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.role === "user" ? "flex-end" : "flex-start"
                    }}>
                      {/* 메시지 텍스트 */}
                      <div style={{
                        maxWidth: "70%",
                        padding: "12px 16px",
                        borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        background: msg.role === "user" 
                          ? "linear-gradient(135deg, #667eea, #764ba2)" 
                          : "white",
                        color: msg.role === "user" ? "white" : "#333",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        fontSize: "14px",
                        lineHeight: "1.4",
                        whiteSpace: "pre-wrap"
                      }}>
                        {msg.text}
                      </div>

                      {/* 액션 버튼들 (봇 메시지에만 표시) */}
                      {msg.role === "bot" && msg.actions && msg.actions.length > 0 && (
                        <div style={{
                          marginTop: "8px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          maxWidth: "70%"
                        }}>
                          {msg.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleActionClick(action)}
                              style={{
                                padding: "8px 16px",
                                background: "linear-gradient(135deg, #28a745, #20c997)",
                                color: "white",
                                border: "none",
                                borderRadius: "20px",
                                fontSize: "12px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                              }}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Citations 정보 (봇 메시지에만 표시) */}
                      {msg.role === "bot" && msg.citations && msg.citations.length > 0 && (
                        <div style={{
                          marginTop: "8px",
                          maxWidth: "70%",
                          fontSize: "11px",
                          color: "#666",
                          fontStyle: "italic"
                        }}>
                          <div style={{ marginBottom: "4px" }}>📚 참조 문서:</div>
                          {msg.citations.map((citation, index) => (
                            <div key={index} style={{
                              padding: "4px 8px",
                              background: "rgba(0,0,0,0.05)",
                              borderRadius: "4px",
                              marginBottom: "2px"
                            }}>
                              <strong>{citation.source}</strong>: {citation.snippet}...
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {pending && (
                    <div style={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }}>
                      <div style={{
                        padding: "12px 16px",
                        borderRadius: "18px 18px 18px 4px",
                        background: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}>
                        <div style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "center"
                        }}>
                          <span style={{
                            width: "8px",
                            height: "8px",
                            background: "#9ca3af",
                            borderRadius: "50%",
                            animation: "typing 1.4s infinite ease-in-out"
                          }}></span>
                          <span style={{
                            width: "8px",
                            height: "8px",
                            background: "#9ca3af",
                            borderRadius: "50%",
                            animation: "typing 1.4s infinite ease-in-out",
                            animationDelay: "0.2s"
                          }}></span>
                          <span style={{
                            width: "8px",
                            height: "8px",
                            background: "#9ca3af",
                            borderRadius: "50%",
                            animation: "typing 1.4s infinite ease-in-out",
                            animationDelay: "0.4s"
                          }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 챗봇 입력 영역 */}
                <div style={{
                  display: "flex",
                  gap: "12px",
                  padding: "20px",
                  background: "white",
                  border: "1px solid #e9ecef",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px"
                }}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="메시지를 입력하세요..."
                    disabled={pending}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: "2px solid #e9ecef",
                      borderRadius: "25px",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s ease"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || pending}
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      border: "none",
                      borderRadius: "50%",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.2s ease",
                      fontSize: "18px"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  >
                    ➤
                  </button>
                </div>

                <style>{`
                  @keyframes typing {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                  }
                `}</style>
              </div>
            </div>

            {/* SSE Test Section (기존 기능 유지) */}
            <h2 className="tit_2" style={{marginTop: "50px"}}>SSE Test</h2>
            
            <div className="board_view2" style={{paddingTop: 100}}>
              <div style={{ maxWidth: 800, margin: "24px auto", fontFamily: "sans-serif" }}>
                <EgovProgressBar progress={progress} />
                <div>Progress: {progress}%</div>
                
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <button onClick={handleStart} disabled={running}>
                    {running ? "실행 중..." : "시작"}
                  </button>
                  <button onClick={handleStop} disabled={!running}>
                    중지
                  </button>
                </div>

                <div style={{ marginBottom: 8 }}>
                  상태: <strong>{status}</strong>
                </div>

                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: 12,
                    borderRadius: 8,
                    height: 400,
                    overflow: "auto",
                    background: "#fafafa",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 13,
                  }}
                >
                  {logs.length === 0 ? (
                    <div style={{ color: "#888" }}>로그 없음 (시작을 눌러 테스트하세요)</div>
                  ) : (
                    logs.map((l, i) => <div key={i}>{l}</div>)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovTestPage;