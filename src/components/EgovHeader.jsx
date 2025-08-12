import { Link as HLink, NavLink as HNavLink, useNavigate as useHNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import * as EgovNet2 from "@/api/egovFetch";
import URL2 from "@/constants/url";
import CODE from "@/constants/code"; // (미사용이어도 보존)
import "@/css/header.css";
import logoImg from "/assets/images/logo_bigp.png";
import logoImgMobile from "/assets/images/logo_bigp.png";

/** ✅ PNG 아이콘 경로만 바꾸면 즉시 적용 */
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

  // === Chat state ===
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

  // A11y
  const menuBtnTitle = useMemo2(() => (isMenuOpen ? "전체메뉴 열림" : "전체메뉴 닫힘"), [isMenuOpen]);
  const chatBtnTitle = useMemo2(() => (isChatOpen ? "챗봇 닫기" : "챗봇 열기"), [isChatOpen]);

  // --- Handlers ---
  const logInHandler = useCallback2(() => {
    navigate(URL2.LOGIN);
    setIsMenuOpen(false);
    document.querySelector(".all_menu.Mobile")?.classList.add("closed");
  }, [navigate]);

  const logOutHandler = useCallback2(() => {
    const requestOptions = {
      headers: { "Content-type": "application/json", Authorization: sessionToken },
      credentials: "include",
    };
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
    hoverTimerRef.current = setTimeout(() => {
      if (!isHovering) setIsMenuOpen(false);
    }, 180);
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

  // 스크롤 상태 (헤더 음영/진행바)
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
  useEffect2(() => {
    if (btnAllMenuRef.current) btnAllMenuRef.current.title = menuBtnTitle;
  }, [menuBtnTitle]);

  // 클래스 동기화 (.closed / .active)
  useEffect2(() => {
    const menuEl = webMenuRef.current;
    const btnEl = btnAllMenuRef.current;
    if (menuEl) menuEl.classList.toggle("closed", !isMenuOpen);
    if (btnEl) btnEl.classList.toggle("active", isMenuOpen);
  }, [isMenuOpen]);

  // === Chat: 열기/닫기 & 바깥 클릭 닫기 ===
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

  // === Chat: 전송 (Agent/RAG 연동 포인트) ===
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
        // 실제 백엔드 연동 지점:
        // const res = await fetch("/api/chat", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     text,
        //     user: { id: sessionUserId, name: sessionUserName, role: sessionUserSe },
        //   }),
        //   credentials: "include",
        // });
        // const { reply } = await res.json();

        // 데모 응답
        const reply =
          "요청을 접수했어요. 현재 RAG/에이전트 백엔드와 연결 준비 중입니다. 원하는 기능(문서요약, 코드변환, eGovFrame 가이드 질의 등)을 말씀해 주세요!";

        const botMsg = { id: `b-${Date.now()}`, role: "bot", text: reply };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        const botMsg = {
          id: `b-${Date.now()}`,
          role: "bot",
          text: "잠시 후 다시 시도해주세요. (연결 오류)",
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
    <div
      ref={headerRef}
      className={`header ${scrolled ? "is-scrolled" : ""}`}
      data-state={isMenuOpen ? "open" : "closed"}
    >
      {/* 상단 스크롤 진행바 */}
      <div className="scroll-progress" aria-hidden style={{ transform: `scaleX(${scrollPct / 100})` }} />

      {/* ✅ [로고] [GNB] [오른쪽(유저+햄버거)] */}
      <div className="inner grid3">
        {/* 좌: 로고 */}
        <h1 className="logo">
          <HLink to={URL2.MAIN} className="w" aria-label="메인으로 이동 (데스크톱 로고)">
            <img src={logoImg} alt="eGovFrame 심플홈페이지" />
          </HLink>
          <HLink to={URL2.MAIN} className="m" aria-label="메인으로 이동 (모바일 로고)">
            <img src={logoImgMobile} alt="eGovFrame 심플홈페이지" />
          </HLink>
        </h1>

        {/* 중: GNB (챗봇 버튼 포함) */}
        <nav
          className="gnb gnb-left"
          role="navigation"
          aria-label="주요 메뉴"
          onMouseEnter={openAllMenuByHover}
          onMouseLeave={closeAllMenuByHover}
          onFocus={() => setIsMenuOpen(true)}
          onBlur={() => setIsMenuOpen(false)}
        >
          <ul>
            {/* ▶ 챗봇 버튼: PNG 사용 + 미읽음 배지 */}
            <li className="gnb-chat">
              <button
                ref={chatBtnRef}
                type="button"
                className={`chat-gnb-btn ${isChatOpen ? "active" : ""}`}
                title={chatBtnTitle}
                aria-label={chatBtnTitle}
                aria-expanded={isChatOpen}
                aria-controls="ai-chat-panel"
                onClick={() => setIsChatOpen((v) => !v)}
              >
                <img src={chatIconPng} alt="AI 챗봇 열기" />
                {unread > 0 && <span className="badge">{unread > 99 ? "99+" : unread}</span>}
              </button>
            </li>

            <li><HNavLink to={URL2.ABOUT}>사이트소개</HNavLink></li>
            <li><HNavLink to={URL2.SUPPORT_TRANSFORM_INTRO}>AI 변환기</HNavLink></li>
            <li><HNavLink to={URL2.SUPPORT_SECURITY_INTRO}>AI 보안기</HNavLink></li>
            <li><HNavLink to={URL2.SUPPORT_GUIDE_EGOVFRAMEWORK}>고객지원</HNavLink></li>
            {sessionUserSe === "ADM" && <li><HNavLink to={URL2.ADMIN}>사이트관리</HNavLink></li>}
          </ul>
        </nav>

        {/* 우: 사용자 영역 + 햄버거 버튼 */}
        <div className="right_cluster">
          <div
            className="user_info"
            aria-live="polite"
            data-username={sessionUserName || ""}
            data-role={sessionUserSe || "GUEST"}
          >
            {sessionUserId ? (
              <>
                <span className="person">{sessionUserName}</span> 님, {sessionUserSe} 반갑습니다!
                {sessionUserSe === "USER" && (
                  <HNavLink to={URL2.MYPAGE} className={({ isActive }) => (isActive ? "btn login cur" : "btn login")}>
                    마이페이지
                  </HNavLink>
                )}
                <button onClick={logOutHandler} className="btn">로그아웃</button>
              </>
            ) : (
              <>
                <button onClick={logInHandler} className="btn login">로그인</button>
                <HNavLink to={URL2.SIGNUP} className={({ isActive }) => (isActive ? "btn login cur" : "btn login")}>
                  회원가입
                </HNavLink>
              </>
            )}
          </div>

          <div className="right_a">
            <button
              ref={btnAllMenuRef}
              type="button"
              className="btn btnAllMenu"
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
    </div>
  );
}

// utils import는 파일 하단에 둬도 무방
import { getSessionItem as getSI, setSessionItem as setSI } from "@/utils/storage";

export default EgovHeader;
