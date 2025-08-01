import { useState } from "react";
import "@/css/chatbotwidget.css";

function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // ✅ GPT-3.5 API 호출 (OpenRouter 프록시)
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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" // ✅ 데모 키. 정식 사용 시 개인 키 필요
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "당신은 친절한 한국어 도우미 챗봇입니다." },
            { role: "user", content: input }
          ]
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "⚠️ 응답을 받지 못했습니다.";
      setMessages([...newMessages, { type: "bot", text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { type: "bot", text: "⚠️ 에러가 발생했습니다." }]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      marginTop: "20px",
      backgroundColor: "#f9f9f9"
    }}>
      <div style={{ fontWeight: "bold", marginBottom: "12px" }}>💬 GPT 챗봇과 대화해보세요</div>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "12px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.type === "user" ? "right" : "left",
            marginBottom: "8px"
          }}>
            <span style={{
              display: "inline-block",
              padding: "10px",
              background: msg.type === "user" ? "#d0e7ff" : "#eee",
              borderRadius: "6px",
              maxWidth: "80%",
              whiteSpace: "pre-wrap"
            }}>{msg.text}</span>
          </div>
        ))}
        {loading && <div style={{ color: "#888" }}>⏳ GPT 응답 생성 중...</div>}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="질문을 입력하세요"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: "#246BEB",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0 16px",
            fontWeight: "bold"
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default ChatbotWidget;
