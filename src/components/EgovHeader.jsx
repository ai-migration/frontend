import { Link as HLink, NavLink as HNavLink, useNavigate as useHNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import * as EgovNet2 from "@/api/egovFetch";
import URL2 from "@/constants/url";
import CODE from "@/constants/code"; // (미사용이어도 보존)
import "@/css/header.css";
import logoImg from "/assets/images/logo_bigp.png";
import logoImgMobile from "/assets/images/logo_bigp.png";
import { getSessionItem as getSI, setSessionItem as setSI } from "@/utils/storage";

/** ✅ 전역 FAB 버튼 이미지 (원하면 PNG 교체) */
import chatIconPng from "/src/assets/images/due.jpg";

import {
  useEffect as useEffect2,
  useMemo as useMemo2,
  useRef as useRef2,
  useState as useState2,
  useCallback as useCallback2,
} from "react";

export function EgovHeader() {
  // --- Session / user ---
  const sessionToken = getSI("jToken");
  const sessionUser = getSI("loginUser");
  const sessionUserId = sessionUser?.id;
  const sessionUserName = sessionUser?.name;
  const sessionUserSe = sessionUser?.userSe;

  // --- Router ---
  const navigate = useHNavigate();

  // --- UI state ---
  const [isMenuOpen, setIsMenuOpen] = useState2(false);
  const [isHovering, setIsHovering] = useState2(false);
  const [scrolled, setScrolled] = useState2(false);
  const [scrollPct, setScrollPct] = useState2(0);

  // === Chat (전역 FAB + 패널) ===
  const [isChatOpen, setIsChatOpen] = useState2(false);
  const [unread, setUnread] = useState2(0);
  const [messages, setMessages] = useState2([
    { id: "m0", role: "bot", text: "안녕하세요! 🤖 AI 도우미입니다. 무엇을 도와드릴까요?" },
  ]);
  const [pending, setPending] = useState2(false);
  const [input, setInput] = useState2("");

  // --- Refs ---
  const headerRef = useRef2(null);
  const webMenuRef = useRef2(null);
  const btnAllMenuRef = useRef2(null);
  const hoverTimerRef = useRef2(null);

  const chatRef = useRef2(null);
  const chatListRef = useRef2(null);
  const chatBtnRef = useRef2(null);
  const inputRef = useRef2(null);

  // A11y: button title 동기화
  const menuBtnTitle = useMemo2(() => (isMenuOpen ? "전체메뉴 열림" : "전체메뉴 닫힘"), [isMenuOpen]);
  const chatBtnTitle = useMemo2(() => (isChatOpen ? "챗봇 닫기" : "챗봇 열기"), [isChatOpen]);

  // --- Handlers ---
  const logInHandler = useCallback2(() => {
    navigate(URL2.LOGIN);
    setIsMenuOpen(false);
    document.querySelector(".all_menu.Mobile")?.classList.add("closed");
  }, [navigate]);

  const logOutHandler = useCallback2(() => {
    const requestOptions = { headers: { "Content-type": "application/json", Authorization: sessionToken }, credentials: "include" };
    EgovNet2.requestFetch("/users/logout", requestOptions, () => {
      setSI("loginUser", { id: "" });
      setSI("jToken", null);
      alert("로그아웃되었습니다!");
      navigate(URL2.MAIN);
      setIsMenuOpen(false);
      document.querySelector(".all_menu.Mobile")?.classList.add("closed");
    });
  }, [navigate, sessionToken]);

  const toggleAllMenu = useCallback2(() => setIsMenuOpen((prev) => !prev), []);

  // Hover로 열기/닫기 (지연 닫힘)
  const openAllMenuByHover = useCallback2(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovering(true);
    setIsMenuOpen(true);
  }, []);

  const closeAllMenuByHover = useCallback2(() => {
    setIsHovering(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => { if (!isHovering) setIsMenuOpen(false); }, 180);
  }, [isHovering]);

  const handleMenuMouseEnter = useCallback2(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovering(true);
    setIsMenuOpen(true);
  }, []);

  const handleMenuMouseLeave = useCallback2(() => {
    setIsHovering(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setIsMenuOpen(false), 120);
  }, []);

  // 바깥 클릭 시 닫기 (전체메뉴)
  useEffect2(() => {
    const onClickOutside = (e) => {
      if (!isMenuOpen) return;
      const headerEl = headerRef.current;
      if (headerEl && !headerEl.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isMenuOpen]);

  // ESC로 닫기 (전체메뉴 + 챗봇)
  useEffect2(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsChatOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // 스크롤 상태 (헤더 음영/축소 + 진행바)
  useEffect2(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 4);
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 버튼 aria 업데이트
  useEffect2(() => { if (btnAllMenuRef.current) btnAllMenuRef.current.title = menuBtnTitle; }, [menuBtnTitle]);

  // 클래스 동기화 (.closed / .active)
  useEffect2(() => {
    const menuEl = webMenuRef.current;
    const btnEl = btnAllMenuRef.current;
    if (menuEl) menuEl.classList.toggle("closed", !isMenuOpen);
    if (btnEl) btnEl.classList.toggle("active", isMenuOpen);
  }, [isMenuOpen]);

  // === Chat: FAB 열기/닫기 & 바깥 클릭 닫기 ===
  const toggleChat = useCallback2(() => setIsChatOpen((v) => !v), []);
  const closeChat = useCallback2(() => setIsChatOpen(false), []);

  useEffect2(() => {
    const onClickOutside = (e) => {
      if (!isChatOpen) return;
      const panel = chatRef.current;
      const btn = chatBtnRef.current;
      if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
        setIsChatOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isChatOpen]);

  // Chat 열릴 때 포커스/미읽음 처리
  useEffect2(() => {
    if (isChatOpen) {
      setUnread(0);
      setTimeout(() => {
        inputRef.current?.focus();
        chatListRef.current?.scrollTo({ top: chatListRef.current.scrollHeight, behavior: "smooth" });
      }, 10);
    }
  }, [isChatOpen]);

  // 메시지 자동 스크롤
  useEffect2(() => {
    if (!chatListRef.current) return;
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [messages.length]);

  // === Chat Action UI (icons + gradient chips) =====================
  const getActionTheme = (url = "") => {
    if (/\/support\/transform/i.test(url)) return "t-transform";
    if (/\/support\/security/i.test(url)) return "t-security";
    if (/\/support\/guide/i.test(url) || /egov/i.test(url)) return "t-guide";
    if (/\/inform/i.test(url)) return "t-inform";
    if (/download/i.test(url)) return "t-download";
    return "t-default";
  };

  const Icon = ({ theme }) => {
    if (theme === "t-transform")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 7h10l-2-2 1.4-1.4L18.8 8l-6.4 4.4L11 11l2-2H3zM21 17H11l2 2-1.4 1.4L5.2 16l6.4-4.4L13 13l-2 2h10z" />
        </svg>
      );
    if (theme === "t-security")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l7 3v6c0 5-3.6 9.7-7 11-3.4-1.3-7-6-7-11V5l7-3zm0 4l-4 1.7V11c0 3.5 2.2 7.1 4 8 1.8-.9 4-4.5 4-8V7.7L12 6z" />
        </svg>
      );
    if (theme === "t-guide")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 4h9a4 4 0 014 4v12H8a4 4 0 01-4-4V4zm9 2H6v10a2 2 0 002 2h9V8a2 2 0 00-2-2zM8 6h1a3 3 0 013 3v1H8V6z" />
        </svg>
      );
    if (theme === "t-download")
      return (
        <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3v10l3-3 1.4 1.4-5.4 5.4-5.4-5.4L7 10l3 3V3h2zm-7 16h14v2H5v-2z" />
        </svg>
      );
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5h4v2h-6V7h2z" />
      </svg>
    );
  };

  const ChatActionBar = ({ actions = [] }) => {
    if (!Array.isArray(actions) || actions.length === 0) return null;

    return (
      <div className="action-bar" role="list" aria-label="빠른 이동">
        {actions.map((a, idx) => {
          const theme = getActionTheme(a.url);
          const external = /^https?:\/\//i.test(a.url);

          if (external) {
            return (
              <a
                key={idx}
                className={`chip ${theme}`}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                role="listitem"
                aria-label={`${a.label} (새 창)`}
                onClick={closeChat}
              >
                <Icon theme={theme} />
                <span className="label">{a.label}</span>
                <span className="arrow" aria-hidden />
              </a>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              className={`chip ${theme}`}
              role="listitem"
              onClick={(e) => {
                e.preventDefault();
                navigate(a.url);
                closeChat();
              }}
            >
              <Icon theme={theme} />
              <span className="label">{a.label}</span>
              <span className="arrow" aria-hidden />
            </button>
          );
        })}
      </div>
    );
  };

  // === Chat: 전송 (Agent / RAG 연동) ===
  const sendMessage = useCallback2(
    async (e) => {
      e?.preventDefault?.();
      const text = input.trim();
      if (!text || pending) return;

      const myMsg = { id: `m-${Date.now()}`, role: "me", text };
      setMessages((prev) => [...prev, myMsg]);
      setInput("");
      setPending(true);

      try {
        // ✅ 실제 백엔드 연동
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s 타임아웃

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            user: { id: sessionUserId, name: sessionUserName, role: sessionUserSe },
          }),
          credentials: "include",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const reply = data?.reply ?? "응답을 받았지만 내용이 비어 있어요.";
        const actions = Array.isArray(data?.actions) ? data.actions : [];
        const citations = Array.isArray(data?.citations) ? data.citations : [];

        const botMsg = { id: `b-${Date.now()}`, role: "bot", text: reply, actions, citations };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        // ❗ 폴백 (연결 오류)
        const botMsg = {
          id: `b-${Date.now()}`,
          role: "bot",
          text: "잠시 후 다시 시도해주세요. (연결 오류)",
          actions: [
            { label: "변환 하기", url: "/support/transform/transformation" },
            { label: "AI 보안 검사", url: "/support/security/scan" },
            { label: "전자정부프레임워크 가이드", url: "/support/guide/egovframework" },
          ],
        };
        setMessages((prev) => [...prev, botMsg]);
      } finally {
        setPending(false);
        if (!isChatOpen) setUnread((n) => n + 1);
      }
    },
    [input, pending, isChatOpen, sessionUserId, sessionUserName, sessionUserSe]
  );

  return (
    <>
      <div ref={headerRef} className={`header ${scrolled ? "is-scrolled" : ""}`} data-state={isMenuOpen ? "open" : "closed"}>
        {/* 상단 스크롤 진행바 (트렌디) */}
        <div className="scroll-progress" aria-hidden style={{ transform: `scaleX(${scrollPct / 100})` }} />

        <div className="inner">
          <HLink to={URL2.MAIN} className="ico lnk_go_template" target="_blank">홈페이지 템플릿 소개 페이지로 이동</HLink>

          <h1 className="logo">
            <HLink to={URL2.MAIN} className="w" aria-label="메인으로 이동 (데스크톱 로고)"><img src={logoImg} alt="eGovFrame 심플홈페이지" /></HLink>
            <HLink to={URL2.MAIN} className="m" aria-label="메인으로 이동 (모바일 로고)"><img src={logoImgMobile} alt="eGovFrame 심플홈페이지" /></HLink>
          </h1>

          {/* GNB: 호버 시 전체메뉴 오픈 */}
          <nav
            className="gnb shift-left-40"
            role="navigation"
            aria-label="주요 메뉴"
            onMouseEnter={openAllMenuByHover}
            onMouseLeave={closeAllMenuByHover}
            onFocus={() => setIsMenuOpen(true)}
            onBlur={() => setIsMenuOpen(false)}
          >
            <ul>
              <li><HNavLink to={URL2.ABOUT}>사이트소개</HNavLink></li>
              <li><HNavLink to={URL2.SUPPORT_TRANSFORM_INTRO}>AI 변환기</HNavLink></li>
              <li><HNavLink to={URL2.SUPPORT_SECURITY_INTRO}>AI 보안기</HNavLink></li>
              <li><HNavLink to={URL2.SUPPORT_GUIDE_EGOVFRAMEWORK}>고객지원</HNavLink></li>
              {sessionUserSe === "ADM" && (<li><HNavLink to={URL2.ADMIN}>사이트관리</HNavLink></li>)}
            </ul>
          </nav>

          {/* User Area */}
          <div className="user_info" aria-live="polite" data-username={sessionUserName || ""} data-role={sessionUserSe || "GUEST"}>
            {sessionUserId ? (
              <>
                <span className="person">{sessionUserName}</span> 님, {sessionUserSe} 반갑습니다!
                {sessionUserSe === "USER" && (
                  <HNavLink to={URL2.MYPAGE} className={({ isActive }) => (isActive ? "btn login cur" : "btn login")}>마이페이지</HNavLink>
                )}
                <button onClick={logOutHandler} className="btn">로그아웃</button>
              </>
            ) : (
              <>
                <button onClick={logInHandler} className="btn login">로그인</button>
                <HNavLink to={URL2.SIGNUP} className={({ isActive }) => (isActive ? "btn login cur" : "btn login")}>회원가입</HNavLink>
              </>
            )}
          </div>

          {/* 전체메뉴 버튼 */}
          <div className="right_a">
            <button
              ref={btnAllMenuRef}
              type="button"
              className="btn btnAllMenu move-right-50"
              title={menuBtnTitle}
              aria-expanded={isMenuOpen}
              aria-controls="allmenu-web"
              aria-haspopup="menu"
              onClick={toggleAllMenu}
            >
              전체메뉴
            </button>
          </div>
        </div>

        {/* All Menu (WEB) */}
        <div
          id="allmenu-web"
          ref={webMenuRef}
          className={`all_menu WEB ${isMenuOpen ? "" : "closed"}`}
          aria-hidden={!isMenuOpen}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="inner">
            <div className="col">
              <h3>사이트소개</h3>
              <ul>
                <li><HNavLink to={URL2.ABOUT_SITE}>소개</HNavLink></li>
                <li><HNavLink to={URL2.ABOUT_HISTORY}>연혁</HNavLink></li>
                <li><HNavLink to={URL2.ABOUT_ORGANIZATION}>조직소개</HNavLink></li>
                <li><HNavLink to={URL2.ABOUT_LOCATION}>찾아오시는 길</HNavLink></li>
              </ul>
            </div>

            <div className="col">
              <h3>AI 변환기</h3>
              <ul>
                <li><HNavLink to="/support/transform/intro">기능 소개</HNavLink></li>
                <li><HNavLink to="/support/transform/transformation">변환 하기</HNavLink></li>
                <li><HNavLink to="/support/transform/view_transform">변환 이력 조회</HNavLink></li>
                <li><HNavLink to="/support/transform/view_test">테스트 이력 조회</HNavLink></li>
                <li><HNavLink to="/support/transform/download">다운로드</HNavLink></li>
              </ul>
            </div>

            <div className="col">
              <h3>AI 보안기</h3>
              <ul>
                <li><HNavLink to="/support/security/intro">기능 소개</HNavLink></li>
                <li><HNavLink to="/support/security/scan">AI 보안 검사</HNavLink></li>
                <li><HNavLink to="/support/security/vulnerability">보안 취약점탐지</HNavLink></li>
                <li><HNavLink to="/support/security/report">보안 점검결과</HNavLink></li>
                <li><HNavLink to="/support/security/report_detail">다운로드</HNavLink></li>
              </ul>
            </div>

            <div className="col">
              <h3>고객지원</h3>
              <ul>
                <li><HNavLink to="/support/guide/egovframework">전자정부프레임워크 가이드</HNavLink></li>
                <li><HNavLink to="/intro">정보마당</HNavLink></li>
                <li><HNavLink to="/inform">알림마당</HNavLink></li>
              </ul>
            </div>

            {sessionUserSe === "ADM" && (
              <div className="col">
                <h3>사이트관리</h3>
                <ul>
                  <li><HNavLink to={URL2.ADMIN_NOTICE}>공지사항 관리</HNavLink></li>
                  <li><HNavLink to={URL2.ADMIN_FAQ}>FAQ 관리</HNavLink></li>
                  <li><HNavLink to={URL2.ADMIN_QNA}>Q&A 관리</HNavLink></li>
                  <li><HNavLink to={URL2.ADMIN_MEMBERS}>회원 관리</HNavLink></li>
                  <li><HNavLink to={URL2.ADMIN_MANAGER}>관리자 관리</HNavLink></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === 전역 Floating Chat Button (FAB) === */}
      {createPortal(
        <button
          ref={chatBtnRef}
          type="button"
          className={`chat-fab ${isChatOpen ? "active" : ""}`}
          title={chatBtnTitle}
          aria-label={chatBtnTitle}
          aria-expanded={isChatOpen}
          aria-controls="ai-chat-panel"
          onClick={toggleChat}
        >
          <img src={chatIconPng} alt="AI 챗봇 열기" />
          {unread > 0 && <span className="badge">{unread > 99 ? "99+" : unread}</span>}
        </button>,
        document.body
      )}

      {/* === Chat Panel: Portal === */}
      {createPortal(
        <section
          id="ai-chat-panel"
          ref={chatRef}
          className={`chat-panel ${isChatOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="false"
          aria-label="AI 챗봇"
        >
          <header className="chat-head">
            <div className="chat-head-left">
              <span className="chat-head-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2l1.4 4.3L18 8l-4.3 1.7L12 14l-1.7-4.3L6 8l4.6-1.7L12 2z" />
                </svg>
              </span>
              <strong>AI 도우미</strong>
              <span className="chat-status" aria-live="polite">● 온라인</span>
            </div>
            <div className="chat-head-right">
              <button className="chat-head-btn" onClick={closeChat} aria-label="챗봇 닫기">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>

          <div className="chat-body" ref={chatListRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg ${m.role}`}>
                <div className="bubble">{m.text}</div>

                {/* ▶︎ 트렌디 액션 바 */}
                {m.role === "bot" && <ChatActionBar actions={m.actions} />}

                {/* ▶︎ 근거(선택) */}
                {m.role === "bot" && Array.isArray(m.citations) && m.citations.length > 0 && (
                  <details className="citations">
                    <summary>참고 근거</summary>
                    <ul>
                      {m.citations.map((c, i) => (
                        <li key={i}><strong>{c.source}</strong>: {c.snippet}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
            {pending && (
              <div className="chat-msg bot">
                <div className="bubble typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              placeholder="메시지를 입력하세요… (Enter 전송)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="메시지 입력"
            />
            <button type="submit" disabled={pending || !input.trim()} aria-label="전송">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </form>
        </section>,
        document.body
      )}
    </>
  );
}

export default EgovHeader;
