import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";

// ✅ 동적 효과/겹침 해결용 스타일 (기존 파일 재사용)
import "@/css/mainMotion.css";

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
        <button type="button" style={btnStyle} onClick={play} aria-label="재생">▶ 재생</button>
        <button type="button" style={btnStyle} onClick={pause} aria-label="일시정지">⏸ 일시정지</button>
        <button type="button" style={btnStyle} onClick={stop} aria-label="정지">⏹ 정지</button>
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
    <div className="container P_MAIN">
      <div className="c_wrap">
        <div className="colbox">
          <div className="left_col">
            {/* ✅ 자동 슬라이드 캐러셀 */}
            <MainHeroCarousel />
          </div>

          <div className="right_col">
            <div className="mini_board glass reveal">
              <ul className="tab">
                <li><a href="#공지사항" className="on">공지사항</a></li>
              </ul>
              <div className="list">
                <div className="notice">
                  <h2 className="blind">공지사항</h2>
                  <ul>{noticeListTag}</ul>
                  <Link to={URL.INFORM_NOTICE} className="more">더보기</Link>
                </div>
              </div>
            </div>

            <div className="banner reveal hover-lift">
              <Link to={URL.SUPPORT_DOWNLOAD} className="bn1 card">
                <strong>자료실</strong>
                <span>다양한 자료를<br/>다운로드 받으실 수 있습니다.</span>
              </Link>
              <Link to={URL.ABOUT} className="bn2 card">
                <strong>표준프레임워크센터</strong>
                <span>표준프레임워크센터의<br/>약도 등의 정보를 제공합니다.</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 🔽 캐러셀과 '자세히 보기' 4개 사이에 유튜브 삽입 (겹침 방지 스타일 포함) */}
        <YouTubeEmbed video="https://youtu.be/JNsKvZo6MDs?si=xG50mmAa6J2-SJW2" autoplay={0} />

        <div className="banner_bot"></div>
        <div className="banner_bot">
          <div className="b1 card reveal hover-lift">
            <div>
              <h2>주요사업 소개</h2>
              <p>표준프레임워크가 제공하는<br/>주요 사업을 소개합니다.</p>
            </div>
            <Link to={URL.INTRO_WORKS}>자세히 보기</Link>
          </div>
          <div className="b2 card reveal hover-lift">
            <div>
              <h2>대표서비스 소개</h2>
              <p>표준프레임워크 실행환경의<br/>서비스 그룹에서 제공하는<br/>대표서비스입니다.</p>
            </div>
            <Link to={URL.INTRO_SERVICE}>자세히 보기</Link>
          </div>
          <div className="b3 card reveal hover-lift">
            <div>
              <h2>서비스 신청</h2>
              <p>표준프레임워크 경량환경<br/>홈페이지의 다양한 서비스를<br/>신청 하실 수 있습니다.</p>
            </div>
            <Link to={URL.SUPPORT_APPLY}>자세히 보기</Link>
          </div>
          <div className="b4 card reveal hover-lift">
            <div>
              <h2>일정 현황</h2>
              <p>표준프레임워크 경량환경<br/>홈페이지의 전체적인 일정<br/>현황을 조회하실 수 있습니다.</p>
            </div>
            <Link to={URL.INFORM}>자세히 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovMain;