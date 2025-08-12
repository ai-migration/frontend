import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";

import simpleMainIng from "/assets/images/simple_test.png";
import initPage from "@/js/ui";

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

  useEffect(() => {
    if (window.YT?.Player) {
      setApiReady(true);
      return;
    }

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
      script.onload = () => {
        if (window.YT?.Player) setApiReady(true);
      };
      script.onerror = () => setUseNocookie(true);
      (document.head || document.body).appendChild(script);
    }

    const t = setTimeout(() => {
      if (!window.YT?.Player) setUseNocookie(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!apiReady || useNocookie) return;

    if (playerRef.current?.loadVideoById) {
      try {
        playerRef.current.loadVideoById(videoId);
      } catch {}
      return;
    }
    try {
      playerRef.current = new window.YT.Player(PLAYER_DOM_ID, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 1,
          autoplay,
          enablejsapi: 1,
          origin: safeOrigin,
        },
        events: { onReady: () => setIsReady(true) },
      });
    } catch {
      setUseNocookie(true);
    }
    return () => {
      try {
        playerRef.current?.destroy?.();
      } catch {}
      playerRef.current = null;
    };
  }, [apiReady, useNocookie, videoId, autoplay, safeOrigin, PLAYER_DOM_ID]);

  useEffect(() => {
    if (!useNocookie || tryPlain) return;
    const t = setTimeout(() => {
      if (!nocookieLoaded) setTryPlain(true);
    }, 3500);
    return () => clearTimeout(t);
  }, [useNocookie, nocookieLoaded, tryPlain]);

  useEffect(() => {
    if (!tryPlain) return;
    const t = setTimeout(() => {
      if (!plainLoaded) setHardFallback(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [tryPlain, plainLoaded]);

  return (
    <section
      className="yt-section"
      style={{
        margin: "24px 0 28px",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Local keyframes for subtle animated backdrop */}
      <style>{`
        @keyframes floatA { 0% { transform: translate3d(-10%, -10%, 0) scale(1); } 50% { transform: translate3d(5%, 5%, 0) scale(1.05); } 100% { transform: translate3d(-10%, -10%, 0) scale(1); } }
        @keyframes floatB { 0% { transform: translate3d(15%, 10%, 0) scale(1); } 50% { transform: translate3d(-5%, -5%, 0) scale(1.06); } 100% { transform: translate3d(15%, 10%, 0) scale(1); } }
        @keyframes borderGlow { 0% { box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 0 0 0 rgba(255,255,255,0.08) inset; } 50% { box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.12) inset; } 100% { box-shadow: 0 8px 24px rgba(0,0,0,0.08), 0 0 0 0 rgba(255,255,255,0.08) inset; } }
        @keyframes pulseDark { 0% { opacity: .35; } 50% { opacity: .55; } 100% { opacity: .35; } }
      `}</style>

      {/* Animated backdrop blobs (keep dark color tone) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: 16,
          filter: "saturate(110%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "140%",
            left: "-10%",
            top: "-20%",
            background: "radial-gradient(40% 40% at 50% 50%, rgba(64,64,64,.45), rgba(0,0,0,0))",
            animation: "floatA 16s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "65%",
            height: "120%",
            right: "-10%",
            bottom: "-10%",
            background: "radial-gradient(40% 40% at 50% 50%, rgba(96,96,96,.35), rgba(0,0,0,0))",
            animation: "floatB 18s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </div>

      <div
        className="yt-player-wrap"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: 16,
          overflow: "hidden",
          background: "#000",
          animation: "borderGlow 6s ease-in-out infinite",
        }}
      >
        {/* 1) API mode */}
        {!useNocookie && (
          <div id={PLAYER_DOM_ID} className="yt-frame" style={{ width: "100%", height: "100%" }} />
        )}

        {/* 2) nocookie fallback */}
        {useNocookie && !tryPlain && !hardFallback && (
          <iframe
            title="YouTube (nocookie)"
            ref={nocookieRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1${autoplay ? "&autoplay=1&mute=1" : ""}&origin=${encodeURIComponent(
              safeOrigin
            )}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onLoad={() => setNocookieLoaded(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        )}

        {/* 3) standard youtube.com fallback */}
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

        {/* 4) final fallback: thumbnail link */}
        {hardFallback && (
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener"
            className="yt-thumb-fallback"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg)`,
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: 0.5,
            }}
          >
            ▶ 새 창에서 보기
          </a>
        )}

        {/* loading skeleton */}
        {!isReady && !useNocookie && !tryPlain && (
          <div
            className="yt-skeleton"
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(120deg,#1a1a1a,#0f0f0f)",
              animation: "pulseDark 1.8s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </section>
  );
}

function EgovMain(props) {
  console.group("EgovMain");
  console.log("[Start] EgovMain ------------------------------");
  console.log("EgovMain [props] : ", props);

  const location = useLocation();
  console.log("EgovMain [location] : ", location);

  // eslint-disable-next-line no-unused-vars
  const [noticeBoard, setNoticeBoard] = useState();
  // eslint-disable-next-line no-unused-vars
  const [gallaryBoard, setGallaryBoard] = useState();
  const [noticeListTag, setNoticeListTag] = useState();
  const [gallaryListTag, setGallaryListTag] = useState();
  
  useEffect(() => {
    initPage();
  });

  const retrieveList = useCallback(() => {
    console.groupCollapsed("EgovMain.retrieveList()");


    const retrieveListURL = "/posts?type=notice";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
  
    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        resp = resp.slice(0,5);
        setNoticeBoard(resp);

        let mutNotiListTag = [];
        mutNotiListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

        // 리스트 항목 구성
        resp.forEach(function (item, index) {
          if (index === 0) mutNotiListTag = []; // 목록 초기화
          item.createdAt = item.createdAt ? item.createdAt.substring(0, 10) : "";
          mutNotiListTag.push(
            <li key={item.nttId}>
              <Link
                to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                state={{
                  postId: item.postId,
                }}
                key={item.postId}
                className="list_item"
              >
                {item.title}
                <span>{item.createdAt}</span>
              </Link>
            </li>
          );
        });
        setNoticeListTag(mutNotiListTag);
      },
      function (resp) {
        console.log("err response : ", resp);
      }
    );
    console.groupEnd("EgovMain.retrieveList()");
  }, []);

  useEffect(() => {
    retrieveList();
  }, [retrieveList]);

  console.log("------------------------------EgovMain [End]");
  console.groupEnd("EgovMain");

  return (
    <div className="container P_MAIN">
      <div className="c_wrap">
        <div className="colbox">
          <div className="left_col">
            <img
              src={simpleMainIng}
              alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다."
            />
          </div>

          <div className="right_col">
            <div className="mini_board">
              <ul className="tab">
                <li>
                  <a href="#공지사항" className="on">
                    공지사항
                  </a>
                </li>
                {/* <li>
                  <a href="#갤러리">갤러리</a>
                </li> */}
              </ul>
              <div className="list">
                <div className="notice">
                  <h2 className="blind">공지사항</h2>
                  <ul>{noticeListTag}</ul>
                  <Link to={URL.INFORM_NOTICE} className="more">
                    더보기
                  </Link>
                </div>

                {/* <div className="gallary">
                  <h2 className="blind">갤러리</h2>
                  <ul>{gallaryListTag}</ul>
                  <Link to={URL.INFORM_GALLERY} className="more">
                    더보기
                  </Link>
                </div> */}
              </div>
            </div>

            <div className="banner">
              <Link to={URL.SUPPORT_DOWNLOAD} className="bn1">
                <strong>자료실</strong>
                <span>
                  다양한 자료를
                  <br />
                  다운로드 받으실 수 있습니다.
                </span>
              </Link>
              <Link to={URL.ABOUT} className="bn2">
                <strong>표준프레임워크센터</strong>
                <span>
                  표준프레임워크센터의
                  <br />
                  약도 등의 정보를 제공합니다.
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Trendy YouTube section between top and bottom blocks */}
        <YouTubeEmbed video="https://youtu.be/JNsKvZo6MDs?si=xG50mmAa6J2-SJW2" autoplay={0} />

        <div className="banner_bot">
          <div className="b1">
            <div>
              <h2>주요사업 소개</h2>
              <p>
                표준프레임워크가 제공하는
                <br />
                주요 사업을 소개합니다.
              </p>
            </div>
            <Link to={URL.INTRO_WORKS}>자세히 보기</Link>
          </div>
          <div className="b2">
            <div>
              <h2>대표서비스 소개</h2>
              <p>
                표준프레임워크 실행환경의
                <br />
                서비스 그룹에서 제공하는
                <br />
                대표서비스입니다.
              </p>
            </div>
            <Link to={URL.INTRO_SERVICE}>자세히 보기</Link>
          </div>
          <div className="b3">
            <div>
              <h2>서비스 신청</h2>
              <p>
                표준프레임워크 경량환경
                <br />
                홈페이지의 다양한 서비스를
                <br />
                신청 하실 수 있습니다.
              </p>
            </div>
            <Link to={URL.SUPPORT_APPLY}>자세히 보기</Link>
          </div>
          <div className="b4">
            <div>
              <h2>일정 현황</h2>
              <p>
                표준프레임워크 경량환경
                <br />
                홈페이지의 전체적인 일정
                <br />
                현황을 조회하실 수 있습니다.
              </p>
            </div>
            <Link to={URL.INFORM}>자세히 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovMain;
