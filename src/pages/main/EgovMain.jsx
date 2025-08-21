import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import * as EgovNet from "@/api/egovFetch";
import URL from "@/constants/url";
import { getSessionItem as getSI, setSessionItem as setSI } from "@/utils/storage";

// 스타일 import
import "@/css/mainMotion.css";
import "@/css/modern-styles.css";

function EgovMain(props) {
  console.group("EgovMain");
  console.log("[Start] EgovMain ------------------------------");
  console.log("EgovMain [props] : ", props);

  const location = useLocation();
  console.log("EgovMain [location] : ", location);

  // --- Session / user ---
  const sessionToken = getSI("jToken");
  const sessionUser = getSI("loginUser");
  const sessionUserId = sessionUser?.id;
  const sessionUserName = sessionUser?.name;
  const sessionUserSe = sessionUser?.userSe;

  // --- Router ---
  const navigate = useNavigate();

  // --- UI state ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // === Slideshow State ===
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  // === Slideshow Images ===
  const slideshowImages = useMemo(
    () => [
      "/src/assets/images/slide1.png",
      "/src/assets/images/slide2.png",
      "/src/assets/images/slide3.jpg",
      "/src/assets/images/img_sample.png",
      "/src/assets/images/img_sample2.png",
    ],
    []
  );

  // ✅ initPage 1회만 실행
  useEffect(() => {
    import("@/js/ui").then(({ default: initPage }) => initPage?.());
  }, []);

  // 페이지 상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // === Slideshow Functions ===
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  }, [slideshowImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  }, [slideshowImages.length]);

  // Auto-play slideshow
  useEffect(() => {
    if (isSlideshowPaused || slideshowImages.length <= 1) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isSlideshowPaused, slideshowImages.length, nextSlide]);

  // Pause on hover
  const handleSlideshowMouseEnter = useCallback(() => setIsSlideshowPaused(true), []);
  const handleSlideshowMouseLeave = useCallback(() => setIsSlideshowPaused(false), []);

  // --- Header Handlers ---
  const logInHandler = useCallback(() => {
    navigate(URL.LOGIN);
    setIsMenuOpen(false);
    document.querySelector(".all_menu.Mobile")?.classList.add("closed");
  }, [navigate]);

  const logOutHandler = useCallback(() => {
    const requestOptions = {
      headers: { "Content-type": "application/json", Authorization: sessionToken },
      credentials: "include",
    };
    EgovNet.requestFetch("/users/logout", requestOptions, () => {
      setSI("loginUser", { id: "" });
      setSI("jToken", null);
      alert("로그아웃되었습니다!");
      navigate(URL.MAIN);
      setIsMenuOpen(false);
      document.querySelector(".all_menu.Mobile")?.classList.add("closed");
    });
  }, [navigate, sessionToken]);

  const toggleAllMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Hover로 열기/닫기 (지연 닫힘)
  const openAllMenuByHover = useCallback(() => {
    setIsHovering(true);
    setIsMenuOpen(true);
  }, []);

  const closeAllMenuByHover = useCallback(() => {
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) setIsMenuOpen(false);
    }, 300);
  }, [isHovering]);

  // 상단 진행바/헤더 그림자 등 스크롤 상태
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / Math.max(1, docHeight)) * 100;
      setScrolled(scrollTop > 50);
      setScrollPct(Math.min(scrollPercent, 100));
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * ✅ 개선된 스크롤 애니메이션
   * - 모든 위치 계산을 getBoundingClientRect 기반으로 변경
   * - 섹션의 진행률(scrollProgress)은 섹션이 뷰포트에 닿기 시작(0) ~ 섹션 바닥이 지나감(1)으로 정규화
   * - 바닥 부근(>=0.95)에서는 모든 층을 확실히 보이도록 세이프티 처리
   */
  useEffect(() => {
    const handleScroll = () => {
      const viewportH = window.innerHeight;

      // 1) 노멀 애니메이션(텍스트 등)
      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const trigger = 0.85; // 뷰포트 높이의 85% 지점
        if (rect.top < viewportH * trigger) {
          const delay = parseFloat(el.dataset.delay || "0");
          setTimeout(() => el.classList.add("animated"), delay * 500);
        }
      });

      // 2) 빌딩 섹션 애니메이션
      const servicesSection = document.querySelector(".integrated-services-section");
      if (!servicesSection) return;

      const sRect = servicesSection.getBoundingClientRect();
      // 섹션 전체가 지나가는 동안 0 → 1 로 진행
      const totalTravel = sRect.height + viewportH;
      // 섹션의 "진입 거리": 뷰포트 상단을 기준으로 섹션이 얼마나 지나갔는지
      const traveled = Math.min(totalTravel, Math.max(0, viewportH - sRect.top));
      const scrollProgress = traveled / Math.max(1, totalTravel);

      const buildingFloors = document.querySelectorAll(".integrated-services-section .floor");
      const totalFloors = buildingFloors.length || 4;

      buildingFloors.forEach((floor) => {
        const floorNumber = parseInt(floor.dataset.floor || "0", 10) || 0;
        const reverseFloorNumber = totalFloors - floorNumber + 1; // 4 → 1 순서로 등장
        const floorDelay = (reverseFloorNumber - 1) * 0.1; // 층마다 10% 지연
        const floorDuration = 0.3; // 각 층이 차지하는 진행 구간 30%

        const floorStart = floorDelay;
        const floorEnd = floorStart + floorDuration;

        const card = floor.querySelector(".building-card");
        if (!card) return;

        // 해당 층의 로컬 진행도(0~1)
        const floorProgress =
          scrollProgress <= floorStart
            ? 0
            : scrollProgress >= floorEnd
            ? 1
            : (scrollProgress - floorStart) / (floorEnd - floorStart);

        // 스타일 적용
        const opacity = floorProgress;
        const translateY = 100 - floorProgress * 100;
        const scale = 0.8 + floorProgress * 0.2;
        const blur = 10 - floorProgress * 10;

        card.style.opacity = opacity.toString();
        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        card.style.filter = `blur(${blur}px)`;

        if (floorProgress > 0.5 || scrollProgress >= 0.95) {
          // ✅ 하단부에서는 무조건 보이게
          floor.classList.add("floor-visible");
          floor.classList.remove("floor-hidden");
        } else if (floorProgress <= 0) {
          floor.classList.remove("floor-visible");
          floor.classList.add("floor-hidden");
        }
      });
    };

    // rAF 기반 스로틀링
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // 초기 1회 실행 (DOM 준비 후 약간 지연)
    const t = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  console.log("------------------------------EgovMain [End]");
  console.groupEnd("EgovMain");

  return (
    <>
      {/* Main Background Video */}
      <div className="main-header-background">
        <video autoPlay loop muted playsInline>
          <source src="/assets/images/crack2.mp4" type="video/mp4" />
        </video>
        <div className="main-header-overlay"></div>
      </div>

      <main className="modern-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            {/* Hero Content */}
            <div className="hero-content">
              <div className="hero-text-section">
                <div className="hero-badge">
                  <div className="badge-icon">🚀</div>
                  <span>AI-Powered Platform</span>
                </div>
                <h1 className="hero-title">
                  <span className="title-main">AI CODE MIGRATION</span>
                  <span className="title-subtitle">전자정부 경량환경</span>
                </h1>
                <p className="hero-description">
                  최신 AI 기술을 활용한 코드 변환 및 보안 검사 서비스로
                  <br />
                  현대적인 기술 스택으로의 마이그레이션을 지원합니다
                </p>
                <div className="hero-actions">
                  <Link to={URL.SUPPORT_TRANSFORM_INTRO} className="hero-btn primary">
                    <div className="btn-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <span>AI 변환기 시작하기</span>
                    <div className="btn-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </Link>
                  <Link to={URL.SUPPORT_SECURITY_INTRO} className="hero-btn secondary">
                    <div className="btn-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <span>보안 검사하기</span>
                    <div className="btn-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Slideshow Carousel */}
              <div className="hero-slideshow-section">
                <div
                  className="slideshow-container"
                  onMouseEnter={handleSlideshowMouseEnter}
                  onMouseLeave={handleSlideshowMouseLeave}
                >
                  <div className="slideshow-track">
                    {slideshowImages.map((image, index) => (
                      <div
                        key={index}
                        className={`slideshow-slide ${index === currentSlide ? "active" : ""}`}
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    ))}
                  </div>

                  {/* Slideshow Navigation */}
                  <div className="slideshow-nav">
                    {slideshowImages.map((_, index) => (
                      <button
                        key={index}
                        className={`slideshow-dot ${index === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`슬라이드 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>

                  {/* Slideshow Controls */}
                  <button className="slideshow-control prev" onClick={prevSlide} aria-label="이전 슬라이드">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>
                  <button className="slideshow-control next" onClick={nextSlide} aria-label="다음 슬라이드">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="innovation-section">
          <div className="innovation-container">
            <div className="innovation-content">
              <h2 className="innovation-title animate-on-scroll" data-delay="0">
                <span className="title-line">AI CODE MIGRATION</span>
              </h2>
              <p className="innovation-subtitle animate-on-scroll" data-delay="1">
                <span className="subtitle-line">혁신을 제고하다.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Integrated Services Section */}
        <section className="integrated-services-section">
          {/* Section Background Video */}
          <div className="section-background">
            <video autoPlay loop muted playsInline>
              <source src="/assets/images/crack.mp4" type="video/mp4" />
            </video>
            <div className="section-overlay"></div>
          </div>

          <div className="content-container">
            <div className="section-header">
              <h2 className="section-title animate-on-scroll">AI 서비스 허브</h2>
              <p className="section-subtitle animate-on-scroll" data-delay="0.5">
                혁신적인 AI 기술로 제공하는 통합 서비스 플랫폼
              </p>
            </div>

            <div className="building-container">
              <div className="building">
                <div className="floor floor-4" data-floor="4">
                  <Link to={URL.SUPPORT_TRANSFORM_INTRO} className="service-card building-card">
                    <div className="card-glow"></div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                      </svg>
                    </div>
                    <div className="card-content">
                      <h3>AI 변환기</h3>
                      <p>코드를 현대적인 기술로 변환</p>
                      <div className="card-features">
                        <span className="feature-tag">빠른 변환</span>
                        <span className="feature-tag">정확도 95%</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="floor floor-3" data-floor="3">
                  <Link to={URL.SUPPORT_SECURITY_INTRO} className="service-card building-card">
                    <div className="card-glow"></div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="card-content">
                      <h3>AI 보안기</h3>
                      <p>보안 취약점 자동 검사 및 수정</p>
                      <div className="card-features">
                        <span className="feature-tag">실시간 검사</span>
                        <span className="feature-tag">자동 수정</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="floor floor-2" data-floor="2">
                  <Link to={URL.SUPPORT_GUIDE_EGOVFRAMEWORK} className="service-card building-card">
                    <div className="card-glow"></div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                    </div>
                    <div className="card-content">
                      <h3>고객지원</h3>
                      <p>다양한 지원 서비스 제공</p>
                      <div className="card-features">
                        <span className="feature-tag">24/7 지원</span>
                        <span className="feature-tag">전문 상담</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="floor floor-1" data-floor="1">
                  <Link to={URL.ABOUT} className="service-card building-card">
                    <div className="card-glow"></div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="card-content">
                      <h3>사이트소개</h3>
                      <p>AI CODE MIGRATION 소개</p>
                      <div className="card-features">
                        <span className="feature-tag">회사 소개</span>
                        <span className="feature-tag">기술 스택</span>
                      </div>
                    </div>
                    <div className="card-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* Main Background */
        .main-header-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: -1;
          overflow: hidden;
        }
        .main-header-background video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1.1) contrast(1.05) saturate(1.1);
        }
        .main-header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
        }

        /* Modern Main */
        .modern-main { min-height: 100vh; position: relative; z-index: 1; background: transparent; }

        @keyframes slideInLeft { from { opacity:0; transform: translateX(-30px);} to {opacity:1; transform:none;} }
        @keyframes slideInRight{ from { opacity:0; transform: translateX(30px);}  to {opacity:1; transform:none;} }

        .hero-text-section { animation: slideInLeft 0.8s ease-out 0.2s both; }
        .hero-slideshow-section { animation: slideInRight 0.8s ease-out 0.4s both; }

        /* Hero Section */
        .hero-section { padding:120px 0 80px; position:relative; z-index:2; min-height:100vh; display:flex; align-items:center; }
        .hero-container { max-width:1440px; margin:0 auto; padding:0 2rem; }
        .hero-content { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; min-height:60vh; }

        /* Hero Text Section */
        .hero-text-section { display:flex; flex-direction:column; gap:2rem; }
        .hero-badge { display:inline-flex; align-items:center; gap:.75rem; padding:.75rem 1.5rem; background:linear-gradient(135deg, rgba(102,126,234,.15), rgba(118,75,162,.15)); border:1px solid rgba(102,126,234,.3); border-radius:50px; color:#667eea; font-size:.875rem; font-weight:600; width:fit-content; backdrop-filter: blur(10px); box-shadow:0 4px 15px rgba(102,126,234,.1); transition:.3s; }
        .hero-badge:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(102,126,234,.2); }
        .badge-icon { font-size:1.25rem; animation:pulse 2s infinite; }
        @keyframes pulse {0%,100%{transform:scale(1);} 50%{transform:scale(1.1);} }

        .hero-title { display:flex; flex-direction:column; gap:1rem; margin:0; font-family:"Poppins","spoqa_regular",sans-serif; }
        .title-main { font-size:4rem; font-weight:800; line-height:1.1; color:#fff; text-shadow:2px 2px 4px rgba(0,0,0,.5); background:linear-gradient(135deg,#fff 0%,#e0e7ff 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:-.02em; }
        .title-subtitle { font-size:1.75rem; font-weight:600; color:#e0e7ff; margin-top:.5rem; text-shadow:1px 1px 2px rgba(0,0,0,.5); font-family:"spoqa_medium",sans-serif; }
        .hero-description { font-size:1.25rem; line-height:1.6; color:#e0e7ff; margin:0; text-shadow:1px 1px 2px rgba(0,0,0,.5); font-family:"spoqa_regular",sans-serif; letter-spacing:-.01em; }

        .hero-actions { display:flex; gap:1rem; margin-top:1rem; }
        .hero-btn { display:flex; align-items:center; gap:.75rem; padding:1rem 2rem; border-radius:16px; text-decoration:none; font-weight:600; font-size:1rem; transition:.3s; border:2px solid transparent; position:relative; overflow:hidden; }
        .hero-btn.primary { background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; box-shadow:0 4px 15px rgba(102,126,234,.4); }
        .hero-btn.primary:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(102,126,234,.6); }
        .hero-btn.secondary { background:rgba(255,255,255,.1); backdrop-filter: blur(10px); border:2px solid rgba(255,255,255,.2); color:#fff; }
        .hero-btn.secondary:hover { background:rgba(255,255,255,.2); transform:translateY(-3px); box-shadow:0 12px 30px rgba(255,255,255,.2); }
        .btn-icon { display:flex; align-items:center; justify-content:center; width:24px; height:24px; }
        .btn-arrow { display:flex; align-items:center; justify-content:center; width:20px; height:20px; opacity:0; transform:translateX(-10px); transition:.3s; }
        .hero-btn:hover .btn-arrow { opacity:1; transform:none; }

        /* Slideshow */
        .hero-slideshow-section { display:flex; justify-content:center; align-items:center; }
        .slideshow-container { width:100%; height:500px; border-radius:20px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,.3); position:relative; background:rgba(255,255,255,.1); backdrop-filter: blur(10px); border:1px solid rgba(255,255,255,.2); margin:0 auto; z-index:1; }
        .slideshow-track { width:100%; height:100%; position:relative; }
        .slideshow-slide { position:absolute; inset:0; background-size:cover; background-position:center; background-repeat:no-repeat; opacity:0; transition: opacity .8s ease-in-out; }
        .slideshow-slide.active { opacity:1; }
        .slideshow-nav { position:absolute; bottom:20px; left:50%; transform:translateX(-50%); display:flex; gap:8px; z-index:10; }
        .slideshow-dot { width:12px; height:12px; border-radius:50%; background:rgba(255,255,255,.5); border:none; cursor:pointer; transition:.3s; }
        .slideshow-dot.active { background:#fff; transform:scale(1.2); }
        .slideshow-dot:hover { background:rgba(255,255,255,.8); }
        .slideshow-control { position:absolute; top:50%; transform:translateY(-50%); width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,.9); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:.3s; z-index:10; color:#374151; }
        .slideshow-control:hover { background:#fff; transform:translateY(-50%) scale(1.1); box-shadow:0 4px 12px rgba(0,0,0,.15); }
        .slideshow-control.prev { left:20px; } .slideshow-control.next { right:20px; }

        /* Section Background */
        .section-background { position:absolute; inset:0; z-index:-1; overflow:hidden; }
        .section-background video { width:100%; height:100%; object-fit:cover; filter: brightness(.7) contrast(1.2) saturate(1.1); }
        .section-overlay { position:absolute; inset:0; background: linear-gradient(135deg, rgba(0,0,0,.6), rgba(0,0,0,.4), rgba(0,0,0,.2)); }

        /* Animated base */
        .animate-on-scroll { opacity:0; transform: translateY(100px); transition: all 1.2s cubic-bezier(.25,.46,.45,.94); }
        .animate-on-scroll.animated { opacity:1; transform:none; }

        /* Innovation Section */
        .innovation-section { padding:120px 0; background: linear-gradient(135deg,#f8fafc 0%,#e2e8f0 50%,#cbd5e1 100%); position:relative; z-index:1; overflow:hidden; }
        .innovation-section::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at 30% 20%, rgba(59,130,246,.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147,51,234,.1) 0%, transparent 50%); z-index:0; }
        .innovation-container { max-width:1440px; margin:0 auto; padding:0 2rem; text-align:center; position:relative; z-index:2; }
        .innovation-title { font-size:4rem; font-weight:900; color:#1e293b; margin:0 0 1rem; font-family:"Poppins","spoqa_regular",sans-serif; letter-spacing:-.03em; line-height:1.1; text-shadow:2px 2px 4px rgba(0,0,0,.1); }
        .innovation-subtitle { font-size:2rem; font-weight:600; color:#475569; margin:0; font-family:"spoqa_medium",sans-serif; letter-spacing:-.01em; text-shadow:1px 1px 2px rgba(0,0,0,.1); }

        .title-line,.subtitle-line { display:inline-block; transform: translateY(100%); opacity:0; transition: all 1.5s cubic-bezier(.25,.46,.45,.94); position:relative; overflow:hidden; }
        .title-line::before,.subtitle-line::before { content:''; position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.8), transparent); transform: translateX(-100%); transition: transform 1.5s cubic-bezier(.25,.46,.45,.94); }
        .innovation-title.animated .title-line, .innovation-subtitle.animated .subtitle-line { transform:none; opacity:1; }
        .innovation-title.animated .title-line::before, .innovation-subtitle.animated .subtitle-line::before { transform: translateX(100%); }

        /* Integrated Services Section */
        .integrated-services-section { padding:120px 0; background: rgba(255,255,255,.03); backdrop-filter: blur(20px); position:relative; z-index:1; overflow:hidden; }
        .integrated-services-section::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at 50% 50%, rgba(59,130,246,.1) 0%, transparent 70%); z-index:-1; }
        .integrated-services-section::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:100%; height:100%; background: radial-gradient(ellipse at center bottom, rgba(59,130,246,.1) 0%, rgba(59,130,246,.05) 30%, transparent 70%); z-index:1; opacity:.5; pointer-events:none; }

        .content-container { max-width:1440px; margin:0 auto; padding:0 2rem; position:relative; z-index:2; }
        .section-header { text-align:center; margin-bottom:2rem; }
        .section-title { font-size:3.5rem; font-weight:900; color:#fff; margin:0 0 1.5rem; text-shadow:2px 2px 4px rgba(0,0,0,.8); letter-spacing:-.03em; position:relative; }
        .section-title::after { content:''; position:absolute; bottom:-10px; left:50%; transform:translateX(-50%); width:80px; height:4px; background: linear-gradient(135deg,#3b82f6,#60a5fa); border-radius:2px; }
        .section-subtitle { font-size:1.375rem; color:#fff; margin:0; text-shadow:2px 2px 4px rgba(0,0,0,.8); font-weight:400; font-family:"Poppins","spoqa_light",sans-serif; letter-spacing:.02em; opacity:0; transform: translateY(30px); transition: all 1.2s cubic-bezier(.25,.46,.45,.94); }
        .section-subtitle.animated { opacity:1; transform:none; }

        .building-container { display:flex; justify-content:center; align-items:center; min-height:4500px; position:relative; padding:900px 0; }
        .building { display:flex; flex-direction:column; align-items:center; gap:120px; position:relative; width:100%; max-width:400px; }

        .floor { width:100%; position:relative; opacity:0; transform: translateY(100px); transition: all .8s cubic-bezier(.25,.46,.45,.94); }
        .floor.floor-visible { opacity:1; transform:none; }
        .floor.floor-hidden { opacity:0; transform: translateY(-50px); }

        .building-card { opacity:0; transform: translateY(100px) scale(.8); filter: blur(10px); transition: all .8s cubic-bezier(.25,.46,.45,.94); position:relative; margin:0 auto; width:100%; max-width:350px; }
        .floor.floor-visible .building-card { opacity:1; transform:none; filter: blur(0); }
        .floor.floor-hidden .building-card { opacity:0; transform: translateY(-50px) scale(.95); filter: blur(5px); }

        .service-card { display:flex; flex-direction:column; padding:2.5rem; background: rgba(255,255,255,.15); backdrop-filter: blur(30px); border-radius:24px; text-decoration:none; color:inherit; transition: all .8s cubic-bezier(.25,.46,.45,.94); border:1px solid rgba(255,255,255,.2); position:relative; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.3); min-height:280px; }
        .card-glow { position:absolute; inset:0; background: linear-gradient(135deg, rgba(59,130,246,.1), rgba(96,165,250,.05)); opacity:0; transition:.5s; z-index:0; }
        .service-card:hover .card-glow { opacity:1; }
        .service-card:hover { transform: translateY(-15px) scale(1.03); box-shadow:0 35px 80px rgba(0,0,0,.4); border-color:#3b82f6; background: rgba(255,255,255,.25); }
        .service-card:active { transform: translateY(-5px) scale(1.01); }

        .card-icon { width:70px; height:70px; background: linear-gradient(135deg,#3b82f6,#1d4ed8); border-radius:18px; display:flex; align-items:center; justify-content:center; color:#fff; margin-bottom:1.5rem; position:relative; z-index:1; transition:.3s; }
        .service-card:hover .card-icon { transform: scale(1.1) rotate(5deg); box-shadow:0 10px 25px rgba(59,130,246,.4); }
        .card-icon svg { width:32px; height:32px; }
        .card-content { flex:1; z-index:1; position:relative; }
        .card-content h3 { font-size:1.5rem; font-weight:700; color:#fff; margin:0 0 .75rem; text-shadow:2px 2px 4px rgba(0,0,0,.3); }
        .card-content p { font-size:1rem; color:#e0e7ff; margin:0 0 1.5rem; line-height:1.6; opacity:.9; }
        .card-features { display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:1.5rem; }
        .feature-tag { padding:.375rem .75rem; background: rgba(59,130,246,.2); border:1px solid rgba(59,130,246,.3); border-radius:20px; font-size:.75rem; font-weight:600; color:#60a5fa; backdrop-filter: blur(10px); transition:.3s; }
        .service-card:hover .feature-tag { background: rgba(59,130,246,.3); border-color: rgba(59,130,246,.5); color:#fff; }
        .card-arrow { color:#60a5fa; transition:.4s; z-index:1; align-self:flex-end; margin-top:auto; }
        .service-card:hover .card-arrow { color:#fff; transform: translateX(8px) scale(1.1); }
        .card-arrow svg { width:24px; height:24px; }

        /* Responsive */
        @media (max-width:1024px) {
          .hero-content { grid-template-columns:1fr; gap:3rem; text-align:center; }
          .title-main { font-size:3rem; }
          .hero-actions { justify-content:center; }
          .slideshow-container { height:400px; }
          .section-title { font-size:3rem; }
          .innovation-title { font-size:3.5rem; }
          .innovation-subtitle { font-size:1.75rem; }
          .building-container { min-height:4000px; padding:800px 0; }
          .building { max-width:350px; gap:100px; }
        }

        @media (max-width:768px) {
          .hero-section { padding:100px 0 60px; }
          .innovation-section { padding:80px 0; }
          .integrated-services-section { padding:80px 0; }
          .hero-container,.content-container,.innovation-container { padding:0 1rem; }
          .title-main { font-size:2.5rem; }
          .title-subtitle { font-size:1.5rem; }
          .hero-description { font-size:1.125rem; }
          .hero-actions { flex-direction:column; }
          .hero-btn { justify-content:center; }
          .section-title { font-size:2.5rem; }
          .section-subtitle { font-size:1.125rem; }
          .innovation-title { font-size:3rem; }
          .innovation-subtitle { font-size:1.5rem; }
          .slideshow-container { height:300px; }
          .service-card { padding:2rem; min-height:250px; }
          .building-container { min-height:3800px; padding:750px 0; }
          .building { max-width:320px; gap:80px; }
        }

        @media (max-width:640px) {
          .title-main { font-size:2rem; }
          .title-subtitle { font-size:1.25rem; }
          .hero-description { font-size:1rem; }
          .section-title { font-size:2rem; }
          .section-subtitle { font-size:1rem; }
          .innovation-title { font-size:2.5rem; }
          .innovation-subtitle { font-size:1.25rem; }
          .service-card { padding:1.5rem; min-height:220px; }
          .card-content h3 { font-size:1.25rem; }
          .card-content p { font-size:.875rem; }
          .card-features { margin-bottom:1rem; }
          .feature-tag { font-size:.7rem; padding:.25rem .5rem; }
          .slideshow-container { height:250px; }
          .building-container { min-height:3600px; padding:700px 0; }
          .building { max-width:300px; gap:70px; }
          .card-icon { width:60px; height:60px; }
          .card-icon svg { width:28px; height:28px; }
        }
      `}</style>
    </>
  );
}

export default EgovMain;
