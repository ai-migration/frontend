import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";

// ✅ 동적 효과/겹침 해결용 스타일 (기존 파일 재사용)
import "@/css/mainMotion.css";
import "@/css/modern-styles.css";
import "@/css/visual-effects.css";

/** 접근성/성능: 사용자 환경 설정 확인 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = (e) => setReduced(e.matches);
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

function YouTubeEmbed({ video, autoplay = 0 }) {
  const [apiReady, setApiReady] = useState(false);
  const [useNocookie, setUseNocookie] = useState(false);
  const [nocookieLoaded, setNocookieLoaded] = useState(false);
  const [tryPlain, setTryPlain] = useState(false);
  const [plainLoaded, setPlainLoaded] = useState(false);
  const [hardFallback, setHardFallback] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const playerRef = useRef(null);
  const nocookieRef = useRef(null);
  const plainRef = useRef(null);
  const domIdRef = useRef(`yt-player-${Math.random().toString(36).slice(2)}`);
  const PLAYER_DOM_ID = domIdRef.current;
  const YT_SCRIPT_ID = "youtube-iframe-api";

  const extractYouTubeId = (input) => {
    try {
      const u = new window.URL(input);
      if (u.hostname.includes("youtube.com")) {
        if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
        if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1]?.split("?")[0];
        if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1]?.split("?")[0];
      }
      if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
    } catch {
      if (/^[\w-]{6,}$/.test(input)) return input;
    }
    return null;
  };
  const videoId = extractYouTubeId(video);
  if (!videoId) return null;

  const safeOrigin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://localhost";

  // 1) API 로드 시도 (차단되면 2로)
  useEffect(() => {
    if (window.YT?.Player) { setApiReady(true); return; }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
      if (typeof prev === "function") prev();
    };

    let script = document.getElementById(YT_SCRIPT_ID);
    if (!script) {
      script = document.createElement("script");
      script.id = YT_SCRIPT_ID;
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.defer = true;
      script.onload = () => { if (window.YT?.Player) setApiReady(true); };
      script.onerror = () => setUseNocookie(true); // API 막히면 nocookie 임베드로
      (document.head || document.body).appendChild(script);
    }

    const t = setTimeout(() => {
      if (!window.YT?.Player) setUseNocookie(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // 1-1) API 플레이어 생성
  useEffect(() => {
    if (!apiReady || useNocookie) return;

    // 이전 인스턴스 재사용
    if (playerRef.current?.loadVideoById) {
      try { playerRef.current.loadVideoById(videoId); } catch {}
      return;
    }
    try {
      playerRef.current = new window.YT.Player(PLAYER_DOM_ID, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          rel: 0, modestbranding: 1, controls: 1, autoplay,
          enablejsapi: 1,
          origin: safeOrigin,
        },
        events: { onReady: () => setIsReady(true) },
      });
    } catch {
      setUseNocookie(true);
    }
    return () => { try { playerRef.current?.destroy?.(); } catch {} playerRef.current = null; };
  }, [apiReady, useNocookie, videoId, autoplay, safeOrigin, PLAYER_DOM_ID]);

  // 2) nocookie 임베드가 3.5초 내 로드 안 되면 3) 일반 임베드로 전환
  useEffect(() => {
    if (!useNocookie || tryPlain) return;
    const t = setTimeout(() => {
      if (!nocookieLoaded) setTryPlain(true);
    }, 3500);
    return () => clearTimeout(t);
  }, [useNocookie, nocookieLoaded, tryPlain]);

  // 3) 일반 임베드도 못 불러오면 4) 썸네일 링크
  useEffect(() => {
    if (!tryPlain) return;
    const t = setTimeout(() => {
      if (!plainLoaded) setHardFallback(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [tryPlain, plainLoaded]);

  const play = () => {
    if (apiReady && !useNocookie) return playerRef.current?.playVideo?.();
    // nocookie/일반 임베드는 클릭 자체가 사용자 제스처라 플레이 허용됨
  };
  const pause = () => {
    if (apiReady && !useNocookie) return playerRef.current?.pauseVideo?.();
  };
  const stop = () => {
    if (apiReady && !useNocookie) {
      try { playerRef.current.stopVideo(); playerRef.current.seekTo(0, true); } catch {}
    }
  };

  return (
    <section className="yt-section card" style={{ margin: "24px 0 28px", clear: "both", position: "relative", zIndex: 10 }}>
      <div className="yt-header" style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>

      </div>

      <div className="yt-player-wrap"
           style={{ position: "relative", width: "100%", aspectRatio: "16/9",
                    borderRadius: 14, overflow: "hidden", background: "#000",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
        {/* 1) API 모드 */}
        {!useNocookie && <div id={PLAYER_DOM_ID} className="yt-frame" style={{ width: "100%", height: "100%" }} />}

        {/* 2) nocookie 폴백 */}
        {useNocookie && !tryPlain && !hardFallback && (
          <iframe
            title="YouTube (nocookie)"
            ref={nocookieRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1${autoplay ? "&autoplay=1&mute=1" : ""}&origin=${encodeURIComponent(safeOrigin)}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onLoad={() => setNocookieLoaded(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        )}

        {/* 3) 일반 youtube.com 임베드 (nocookie가 정책/확장에 막힌 경우) */}
        {tryPlain && !hardFallback && (
          <iframe
            title="YouTube (standard)"
            ref={plainRef}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1${autoplay ? "&autoplay=1&mute=1" : ""}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onLoad={() => setPlainLoaded(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        )}

        {/* 4) 최후 폴백: 썸네일 + 새창 */}
        {hardFallback && (
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener"
            className="yt-thumb-fallback"
            style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundSize: "cover", backgroundPosition: "center",
              backgroundImage: `url(https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg)`,
              color: "#fff", fontWeight: 700, textDecoration: "none",
            }}
          >
            ▶ 새 창에서 보기
          </a>
        )}

        {/* 로딩 스켈레톤 */}
        {!isReady && !useNocookie && !tryPlain && (
          <div className="yt-skeleton" aria-hidden
               style={{ position: "absolute", inset: 0,
                        background: "linear-gradient(120deg,#1a1a1a,#0f0f0f)",
                        animation: "pulse 1.4s ease-in-out infinite" }} />
        )}
      </div>

            <div className="yt-controls" style={{ display: "flex", gap: 8, marginTop: 10 }}>

      </div>
    </section>
  );
}


const btnStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
  cursor: "pointer",
};

/** 메인 히어로 캐러셀 (src/assets/images 전체 자동 슬라이드) */
function MainHeroCarousel() {
  // 👉 src/assets/images 폴더(하위 폴더 포함)의 모든 이미지 자동 로드
  const images = useMemo(() => Object.values(
    import.meta.glob("/src/assets/images/**/*.{png,jpg,jpeg,webp,gif,svg}", { eager: true, import: "default" })
  ), []);

  const slides = images;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const AUTOPLAY_MS = 3500;
  const reduced = usePrefersReducedMotion();

  const next = useCallback(() => {
    if (slides.length <= 1) return;
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length <= 1) return;
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1 || reduced) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, slides.length, next, reduced]);

  // 가시성 변화 시 일시정지 (탭 전환 등)
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (slides.length === 0) return null;

  return (
    <section
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="메인 비주얼"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="blob blob-a" />
      <div className="blob blob-b" />

      <div className="track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((src, i) => (
          <div className="slide" id={`slide-${i}`} key={i} aria-hidden={i !== index}>
            <img src={src} alt={`메인 이미지 ${i + 1}`} loading="lazy" draggable="false" />
            <div className="slide-overlay">
              <div className="caption glass">
                <strong>전자정부 경량환경</strong>
                <span>최신 정보와 기술을 한 눈에</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="nav prev" onClick={prev} aria-label="이전 슬라이드">‹</button>
          <button className="nav next" onClick={next} aria-label="다음 슬라이드">›</button>
        </>
      )}

      {slides.length > 1 && (
        <div className="dots" role="tablist" aria-label="슬라이드 선택">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-controls={`slide-${i}`}
              tabIndex={i === index ? 0 : -1}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function EgovMain(props) {
  console.group("EgovMain");
  console.log("[Start] EgovMain ------------------------------");
  console.log("EgovMain [props] : ", props);

  const location = useLocation();
  console.log("EgovMain [location] : ", location);

  const [noticeBoard, setNoticeBoard] = useState();
  const [gallaryBoard, setGallaryBoard] = useState(); // eslint-disable-line no-unused-vars
  const [noticeListTag, setNoticeListTag] = useState();

  // ✅ initPage 1회만 실행
  useEffect(() => {
    import("@/js/ui").then(({ default: initPage }) => initPage?.());
  }, []);

  const retrieveList = useCallback(() => {
    console.groupCollapsed("EgovMain.retrieveList()");
    const retrieveListURL = "/posts?type=notice";
    const requestOptions = { method: "GET", headers: { "Content-type": "application/json" } };

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        resp = resp.slice(0, 5);
        setNoticeBoard(resp);

        let mutNotiListTag = [];
        mutNotiListTag.push(<li key="0">검색된 결과가 없습니다.</li>);

        resp.forEach(function (item, index) {
          if (index === 0) mutNotiListTag = [];
          const createdAt = item.createdAt ? item.createdAt.substring(0, 10) : "";
          mutNotiListTag.push(
            <li key={item.postId} className="reveal">
              <Link to={{ pathname: URL.INFORM_NOTICE_DETAIL }} state={{ postId: item.postId }} className="list_item">
                {item.title}
                <span>{createdAt}</span>
              </Link>
            </li>
          );
        });
        setNoticeListTag(mutNotiListTag);
      },
      (resp) => console.log("err response : ", resp)
    );
    console.groupEnd("EgovMain.retrieveList()");
  }, []);

  useEffect(() => { retrieveList(); }, [retrieveList]);

  // 🔎 스크롤 리빌(IntersectionObserver)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [noticeListTag]);

  console.log("------------------------------EgovMain [End]");
  console.groupEnd("EgovMain");

  return (
    <main className="modern-main">
      {/* 배경 애니메이션 요소들 */}
      <div className="main-background">
        <div className="animated-grid"></div>
        <div className="floating-elements">
          <div className="element element-1"></div>
          <div className="element element-2"></div>
          <div className="element element-3"></div>
          <div className="element element-4"></div>
          <div className="element element-5"></div>
        </div>
        <div className="wave-animation">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        {/* 정부 건물 실루엣 SVG */}
        <div className="government-silhouette">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M0,200 L0,120 L80,120 L80,80 L120,80 L120,60 L180,60 L180,40 L220,40 L220,20 L280,20 L280,40 L320,40 L320,60 L380,60 L380,80 L420,80 L420,120 L500,120 L500,100 L540,100 L540,80 L580,80 L580,60 L620,60 L620,80 L660,80 L660,100 L700,100 L700,120 L800,120 L800,200 Z" fill="rgba(0, 0, 255, 0.03)"/>
            <circle cx="250" cy="30" r="8" fill="rgba(0, 0, 255, 0.1)">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="550" cy="70" r="6" fill="rgba(65, 105, 225, 0.1)">
              <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* 데이터 플로우 라인 */}
        <div className="data-flow-lines">
          <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0, 0, 255, 0)" />
                <stop offset="50%" stopColor="rgba(0, 0, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 0, 255, 0)" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,150 600,200 T1200,200" stroke="url(#flowGradient)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="8s" repeatCount="indefinite"/>
            </path>
            <path d="M0,250 Q400,200 800,250 T1200,250" stroke="url(#flowGradient)" strokeWidth="1.5" fill="none" opacity="0.7">
              <animate attributeName="stroke-dasharray" values="0,800;800,0;0,800" dur="10s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-carousel-wrapper">
              <MainHeroCarousel />
            </div>
            
            <div className="hero-sidebar">
              {/* Notice Board */}
              <div className="notice-card modern-card reveal">
                <div className="card-header">
                  <div className="header-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                  </div>
                  <h2>공지사항</h2>
                  <Link to={URL.INFORM_NOTICE} className="view-all-btn">
                    전체보기
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="notice-list">
                  <ul>{noticeListTag}</ul>
                </div>
              </div>

              {/* Quick Access Cards */}
              <div className="quick-access-grid">
                <Link to={URL.SUPPORT_DOWNLOAD} className="quick-card modern-card reveal hover-lift">
                  <div className="quick-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7,10 12,15 17,10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div className="quick-card-content">
                    <h3>자료실</h3>
                    <p>다양한 자료를 다운로드 받으실 수 있습니다</p>
                  </div>
                </Link>

                <Link to={URL.ABOUT} className="quick-card modern-card reveal hover-lift">
                  <div className="quick-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="quick-card-content">
                    <h3>찾아오시는 길</h3>
                    <p>표준프레임워크센터의 위치 정보를 제공합니다</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        {/* 기술 네트워크 배경 */}
        <div className="tech-network-bg">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 0, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 0, 255, 0)" />
              </radialGradient>
            </defs>
            {/* 네트워크 노드들 */}
            <circle cx="200" cy="100" r="4" fill="url(#nodeGradient)">
              <animate attributeName="r" values="4;8;4" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="600" cy="150" r="3" fill="url(#nodeGradient)">
              <animate attributeName="r" values="3;6;3" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1000" cy="80" r="5" fill="url(#nodeGradient)">
              <animate attributeName="r" values="5;9;5" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="400" cy="300" r="3" fill="url(#nodeGradient)">
              <animate attributeName="r" values="3;7;3" dur="6s" repeatCount="indefinite"/>
            </circle>
            
            {/* 연결 라인들 */}
            <line x1="200" y1="100" x2="600" y2="150" stroke="rgba(0, 0, 255, 0.05)" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.05;0.15;0.05" dur="4s" repeatCount="indefinite"/>
            </line>
            <line x1="600" y1="150" x2="1000" y2="80" stroke="rgba(0, 0, 255, 0.05)" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.05;0.12;0.05" dur="5s" repeatCount="indefinite"/>
            </line>
            <line x1="200" y1="100" x2="400" y2="300" stroke="rgba(0, 0, 255, 0.05)" strokeWidth="1">
              <animate attributeName="stroke-opacity" values="0.05;0.1;0.05" dur="6s" repeatCount="indefinite"/>
            </line>
          </svg>
        </div>

        <div className="video-container">
          <div className="section-header">
            <h2>전자정부 프레임워크 소개</h2>
            <p>최신 기술과 트렌드를 반영한 전자정부 표준 프레임워크를 소개합니다</p>
          </div>
          <YouTubeEmbed video="https://youtu.be/JNsKvZo6MDs?si=xG50mmAa6J2-SJW2" autoplay={0} />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        {/* 서비스 연결망 배경 */}
        <div className="services-network-bg">
          <svg viewBox="0 0 1400 800" preserveAspectRatio="none">
            <defs>
              <pattern id="serviceGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="rgba(0, 0, 255, 0.05)">
                  <animate attributeName="r" values="1;3;1" dur="8s" repeatCount="indefinite"/>
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#serviceGrid)" opacity="0.3"/>
            
            {/* 서비스 연결 라인들 */}
            <g stroke="rgba(0, 0, 255, 0.08)" strokeWidth="1" fill="none">
              <path d="M200,200 Q400,100 600,200 T1000,200">
                <animate attributeName="stroke-dasharray" values="0,2000;2000,0;0,2000" dur="12s" repeatCount="indefinite"/>
              </path>
              <path d="M300,400 Q500,300 700,400 T1100,400">
                <animate attributeName="stroke-dasharray" values="0,1800;1800,0;0,1800" dur="10s" repeatCount="indefinite"/>
              </path>
              <path d="M100,600 Q350,500 600,600 T1200,600">
                <animate attributeName="stroke-dasharray" values="0,2200;2200,0;0,2200" dur="14s" repeatCount="indefinite"/>
              </path>
            </g>
          </svg>
        </div>

        <div className="services-container">
          <div className="section-header">
            <h2>주요 서비스</h2>
            <p>전자정부 프레임워크가 제공하는 핵심 서비스들을 확인해보세요</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card modern-card reveal hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <div className="service-content">
                <h3>주요사업 소개</h3>
                <p>표준프레임워크가 제공하는 주요 사업을 소개합니다</p>
                <Link to={URL.INTRO_WORKS} className="service-link">
                  자세히 보기
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7,7 17,7 17,17"></polyline>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="service-card modern-card reveal hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div className="service-content">
                <h3>대표서비스 소개</h3>
                <p>표준프레임워크 실행환경의 서비스 그룹에서 제공하는 대표서비스입니다</p>
                <Link to={URL.INTRO_SERVICE} className="service-link">
                  자세히 보기
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7,7 17,7 17,17"></polyline>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="service-card modern-card reveal hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
                </svg>
              </div>
              <div className="service-content">
                <h3>서비스 신청</h3>
                <p>표준프레임워크 경량환경 홈페이지의 다양한 서비스를 신청하실 수 있습니다</p>
                <Link to={URL.SUPPORT_APPLY} className="service-link">
                  자세히 보기
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7,7 17,7 17,17"></polyline>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="service-card modern-card reveal hover-lift">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="service-content">
                <h3>일정 현황</h3>
                <p>표준프레임워크 경량환경 홈페이지의 전체적인 일정 현황을 조회하실 수 있습니다</p>
                <Link to={URL.INFORM} className="service-link">
                  자세히 보기
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7,7 17,7 17,17"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EgovMain;