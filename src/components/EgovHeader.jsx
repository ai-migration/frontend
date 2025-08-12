import { Link as HLink, NavLink as HNavLink, useNavigate as useHNavigate } from "react-router-dom";
import * as EgovNet2 from "@/api/egovFetch";
import URL2 from "@/constants/url";
import CODE from "@/constants/code"; // (미사용이어도 보존)
import "@/css/header.css";
import logoImg from "/assets/images/logo_bigp.png";
import logoImgMobile from "/assets/images/logo_bigp.png";
import { getSessionItem as getSI, setSessionItem as setSI } from "@/utils/storage";
import { useEffect as useEffect2, useMemo as useMemo2, useRef as useRef2, useState as useState2, useCallback as useCallback2 } from "react";

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

  // --- Refs ---
  const headerRef = useRef2(null);
  const webMenuRef = useRef2(null);
  const btnAllMenuRef = useRef2(null);
  const hoverTimerRef = useRef2(null);

  // A11y: button title 동기화
  const menuBtnTitle = useMemo2(() => (isMenuOpen ? "전체메뉴 열림" : "전체메뉴 닫힘"), [isMenuOpen]);

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

  // 바깥 클릭 시 닫기
  useEffect2(() => {
    const onClickOutside = (e) => {
      if (!isMenuOpen) return;
      const headerEl = headerRef.current;
      if (headerEl && !headerEl.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isMenuOpen]);

  // ESC로 닫기
  useEffect2(() => {
    const onKeyDown = (e) => { if (e.key === "Escape") setIsMenuOpen(false); };
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

  return (
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
  );
}

export default EgovHeader;
