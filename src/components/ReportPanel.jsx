// ReportPanel.jsx
import { useMemo } from "react";

export default function ReportPanel({ conversion }) {
  const summary = conversion?.["요약"] ?? "";
  const changes = conversion?.["변경 사항"] ?? "";
  const additions = conversion?.["추가 사항"] ?? "";

  // 문장 단위로 깔끔히 나누기
  const splitSentences = (text) =>
    text
      .split(/(?<=[.?!])\s+(?=[가-힣A-Za-z0-9])/g) // 문장 구분
      .map((s) => s.trim())
      .filter(Boolean);

  // 코드/패키지/클래스 이름 하이라이트 (간단 규칙)
  const renderWithHighlights = (text) => {
    if (!text) return null;
    const regex =
      /(egovframework(?:\.[a-zA-Z_]\w*)+)|([A-Z][A-Za-z0-9_]+)|(`[^`]+`)/g;
    const parts = [];
    let lastIdx = 0;
    text.replace(regex, (match, pkg, clazz, backticked, idx) => {
      if (lastIdx < idx) parts.push(text.slice(lastIdx, idx));
      const token = match.replace(/^`|`$/g, "");
      parts.push(
        <code key={idx} style={codeChip}>
          {token}
        </code>
      );
      lastIdx = idx + match.length;
      return match;
    });
    if (lastIdx < text.length) parts.push(text.slice(lastIdx));
    return <span>{parts}</span>;
  };

  const changeItems = useMemo(() => splitSentences(changes), [changes]);
  const additionItems = useMemo(() => splitSentences(additions), [additions]);

  const copyAll = async () => {
    const json = JSON.stringify({ conversion }, null, 2);
    await navigator.clipboard.writeText(json);
    alert("리포트 JSON을 클립보드에 복사했어요.");
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify({ conversion }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversion-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={wrap}>
      {/* 상단 요약 배너 */}
      <div style={hero}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>요약</div>
        <p style={{ margin: "8px 0 0" }}>{renderWithHighlights(summary)}</p>
      </div>

      {/* 액션 버튼 */}
      <div style={{ display: "flex", gap: 8, margin: "10px 0" }}>
        <button style={btn} onClick={copyAll}>JSON 복사</button>
        <button style={btn} onClick={downloadJson}>JSON 다운로드</button>
      </div>

      {/* 2열 카드 레이아웃 */}
      <div style={grid2}>
        <section style={card}>
          <h4 style={cardTitle}>변경 사항</h4>
          {changeItems.length ? (
            <ul style={ul}>
              {changeItems.map((s, i) => (
                <li key={i} style={li}>
                  {renderWithHighlights(s)}
                </li>
              ))}
            </ul>
          ) : (
            <div style={empty}>내용 없음</div>
          )}
        </section>

        <section style={card}>
          <h4 style={cardTitle}>추가 사항</h4>
          {additionItems.length ? (
            <ul style={ul}>
              {additionItems.map((s, i) => (
                <li key={i} style={li}>
                  {renderWithHighlights(s)}
                </li>
              ))}
            </ul>
          ) : (
            <div style={empty}>내용 없음</div>
          )}
        </section>
      </div>
    </div>
  );
}

/* styles */
const wrap = { display: "grid", gap: 12 };
const hero = {
  border: "1px solid #e9edf5",
  background: "#f7f9ff",
  padding: 14,
  borderRadius: 12,
  lineHeight: 1.6,
};
const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};
const card = {
  border: "1px solid #ececec",
  borderRadius: 12,
  padding: 12,
  background: "#fff",
  minHeight: 120,
};
const cardTitle = { margin: "4px 0 10px", fontSize: 16 };
const ul = { margin: 0, paddingLeft: 18 };
const li = { margin: "6px 0", lineHeight: 1.7 };
const empty = { color: "#999" };
const btn = {
  padding: "6px 10px",
  border: "1px solid #d8dbe6",
  borderRadius: 8,
  background: "#fff",
  cursor: "pointer",
};
const codeChip = {
  background: "#f0f2f7",
  border: "1px solid #e0e4ef",
  borderRadius: 6,
  padding: "1px 6px",
  margin: "0 2px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: 12,
};