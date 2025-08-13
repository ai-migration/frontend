import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //Link, 제거

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
      setProgress(prev => prev + 25);
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
        {/* <!-- Location --> */}
        <div className="location">
          <ul>
            <li>
              <a className="home" href="#!">
                Home
              </a>
            </li>
            <li>Test</li>
          </ul>
        </div>
        {/* <!--// Location --> */}

        <div className="layout">
          {/* <!-- Navigation --> */}
          {/* <EgovLeftNav></EgovLeftNav> *}
                    {/* <!--// Navigation --> */}

          <div className="contents BOARD_CREATE_REG" id="contents">
            {/* <!-- 본문 --> */}

            <div className="top_tit">
              <h1 className="tit_1">Test</h1>
            </div>

            <h2 className="tit_2">SSE Test</h2>

            
            <div className="board_view2" style={{paddingTop:100}}>
            <div style={{ maxWidth: 800, margin: "24px auto", fontFamily: "sans-serif" }}>

            <EgovProgressBar
              progress={progress}
            />
            {progress}
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

            {/* <div className="board_view2" style={{paddingTop:100}}>
              <EgovProgressBar
                progress={progress}
              />

              <button
              onClick={() => setProgress(progress-5)}>감소</button>

              <button
              onClick={() => setProgress(progress+5)}>증가</button>

              
              <button
              onClick={() => setProgress(progress)}>실행</button>
              {progress}

            </div> */}