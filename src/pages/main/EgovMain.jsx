import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";

import * as THREE from "three";
import simpleMainIng from "/assets/images/simple_test.png";
import initPage from "@/js/ui";

function EgovMain(props) {
  console.group("EgovMain");
  console.log("[Start] EgovMain ------------------------------");
  console.log("EgovMain [props] : ", props);

  const location = useLocation();
  console.log("EgovMain [location] : ", location);

  const [noticeItems, setNoticeItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState({ notice: true, gallery: true });
  const [error, setError] = useState({ notice: null, gallery: null });
  const [activeTab, setActiveTab] = useState("notice");
  const [isTabHovering, setIsTabHovering] = useState(false);

  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    initPage();
  });

  // Vanta background effect for the left column (trendy animated background)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const NET = (await import("vanta/dist/vanta.net.min"))?.default;
        if (NET && vantaRef.current && !vantaEffectRef.current) {
          vantaEffectRef.current = NET({
            el: vantaRef.current,
            THREE,
            color: 0x1e90ff,
            backgroundColor: 0x0a0a0a,
            points: 8.0,
            maxDistance: 18.0,
            spacing: 16.0,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
          });
        }
      } catch (e) {
        // Fallback to static image when Vanta fails to load
        console.warn("Vanta load failed, using static image", e);
      }
    })();
    return () => {
      isMounted = false;
      try {
        vantaEffectRef.current?.destroy?.();
        vantaEffectRef.current = null;
      } catch (_) {}
    };
  }, []);

  const buildListItems = (type, items) => {
    if (!items || items.length === 0) {
      return [<li key="empty">검색된 결과가 없습니다.</li>];
    }
    return items.map((item) => {
      const created = item.createdAt ? item.createdAt.substring(0, 10) : "";
      const toPath = type === "gallery" ? URL.INFORM_GALLERY_DETAIL : URL.INFORM_NOTICE_DETAIL;
      return (
        <li key={item.postId}>
          <Link
            to={{ pathname: toPath }}
            state={{ postId: item.postId }}
            className="list_item"
          >
            {item.title}
            <span>{created}</span>
          </Link>
        </li>
      );
    });
  };

  const retrieveNotice = useCallback(() => {
    const retrieveListURL = "/posts?type=notice";
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    setLoading((prev) => ({ ...prev, notice: true }));
    setError((prev) => ({ ...prev, notice: null }));

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        const list = Array.isArray(resp)
          ? resp
          : Array.isArray(resp?.result?.notiList)
          ? resp.result.notiList
          : [];
        const trimmed = list.slice(0, 5);
        setNoticeItems(trimmed);
        setLoading((prev) => ({ ...prev, notice: false }));
      },
      (resp) => {
        console.log("err response : ", resp);
        setError((prev) => ({ ...prev, notice: "공지사항을 불러오지 못했습니다." }));
        setLoading((prev) => ({ ...prev, notice: false }));
      }
    );
  }, []);

  const retrieveGallery = useCallback(() => {
    const retrieveListURL = "/posts?type=gallery";
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    setLoading((prev) => ({ ...prev, gallery: true }));
    setError((prev) => ({ ...prev, gallery: null }));

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        const list = Array.isArray(resp)
          ? resp
          : Array.isArray(resp?.result?.galList)
          ? resp.result.galList
          : [];
        const trimmed = list.slice(0, 5);
        setGalleryItems(trimmed);
        setLoading((prev) => ({ ...prev, gallery: false }));
      },
      (resp) => {
        console.log("err response : ", resp);
        setError((prev) => ({ ...prev, gallery: "갤러리를 불러오지 못했습니다." }));
        setLoading((prev) => ({ ...prev, gallery: false }));
      }
    );
  }, []);

  // Initial load
  useEffect(() => {
    retrieveNotice();
    retrieveGallery();
  }, [retrieveNotice, retrieveGallery]);

  // Auto-rotate tabs every 6s, pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTabHovering) {
        setActiveTab((prev) => (prev === "notice" ? "gallery" : "notice"));
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isTabHovering]);

  console.log("------------------------------EgovMain [End]");
  console.groupEnd("EgovMain");

  const renderSkeleton = () => (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li key={`skeleton-${idx}`}>
          <div style={{
            height: 16,
            width: "80%",
            background: "#f0f0f0",
            borderRadius: 4,
          }} />
        </li>
      ))}
    </>
  );

  return (
    <div className="container P_MAIN">
      <div className="c_wrap">
        <div className="colbox">
          <div className="left_col" style={{ position: "relative", minHeight: 260 }}>
            <div ref={vantaRef} style={{ position: "absolute", inset: 0, borderRadius: 8, overflow: "hidden" }} />
            <img
              src={simpleMainIng}
              alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다."
              style={{ position: "relative", zIndex: 1, mixBlendMode: "screen", opacity: 0.9 }}
            />
          </div>

          <div className="right_col">
            <div className="mini_board">
              <ul
                className="tab"
                onMouseEnter={() => setIsTabHovering(true)}
                onMouseLeave={() => setIsTabHovering(false)}
              >
                <li>
                  <a
                    href="#공지사항"
                    className={activeTab === "notice" ? "on" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("notice");
                    }}
                  >
                    공지사항
                  </a>
                </li>
                <li>
                  <a
                    href="#갤러리"
                    className={activeTab === "gallery" ? "on" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("gallery");
                    }}
                  >
                    갤러리
                  </a>
                </li>
              </ul>
              <div className="list">
                {activeTab === "notice" && (
                  <div className="notice">
                    <h2 className="blind">공지사항</h2>
                    <ul>
                      {error.notice && <li>{error.notice}</li>}
                      {loading.notice ? renderSkeleton() : buildListItems("notice", noticeItems)}
                    </ul>
                    <Link to={URL.INFORM_NOTICE} className="more">더보기</Link>
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div className="gallary">
                    <h2 className="blind">갤러리</h2>
                    <ul>
                      {error.gallery && <li>{error.gallery}</li>}
                      {loading.gallery ? renderSkeleton() : buildListItems("gallery", galleryItems)}
                    </ul>
                    <Link to={URL.INFORM_GALLERY} className="more">더보기</Link>
                  </div>
                )}
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
