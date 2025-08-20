import { useState, useEffect, useRef } from "react";

function DynamicBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const animationRef = useRef();

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 스크롤 위치 추적
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 윈도우 크기 추적
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dynamic-background">
      {/* 메인 그라데이션 오버레이 */}
      <div
        className="gradient-overlay"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.1), transparent 50%)`,
        }}
      />

      {/* 플로팅 파티클들 */}
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${20 + (i * 12) % 60}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${(mousePos.x - 50) * 0.1}px, ${(mousePos.y - 50) * 0.1 + scrollY * 0.2}px)`
            }}
          />
        ))}
      </div>

      {/* 기하학적 패턴 */}
      <div className="geometric-patterns">
        <div
          className="pattern pattern-1"
          style={{
            transform: `rotate(${scrollY * 0.1}deg) translate(${(mousePos.x - 50) * 0.5}px, ${scrollY * 0.3}px)`
          }}
        />
        <div
          className="pattern pattern-2"
          style={{
            transform: `rotate(${-scrollY * 0.05}deg) translate(${(mousePos.x - 50) * -0.3}px, ${scrollY * 0.2}px)`
          }}
        />
        <div
          className="pattern pattern-3"
          style={{
            transform: `rotate(${scrollY * 0.08}deg) translate(${(mousePos.x - 50) * 0.2}px, ${scrollY * -0.1}px)`
          }}
        />
      </div>

      {/* 웨이브 애니메이션 */}
      <div className="wave-container">
        <svg
          className="wave-svg"
          viewBox="0 0 1200 120"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <path
            d={`M0,60 Q300,${60 + Math.sin(scrollY * 0.01) * 20} 600,60 T1200,60 V120 H0 Z`}
            fill="rgba(59, 130, 246, 0.05)"
          />
          <path
            d={`M0,80 Q300,${80 + Math.sin(scrollY * 0.01 + 1) * 15} 600,80 T1200,80 V120 H0 Z`}
            fill="rgba(147, 197, 253, 0.05)"
          />
        </svg>
      </div>

      <style>{`
        .dynamic-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: background 0.3s ease;
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #3b82f6, #93c5fd);
          border-radius: 50%;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .particle:nth-child(even) {
          animation-direction: reverse;
          background: linear-gradient(45deg, #06b6d4, #67e8f9);
        }

        .particle:nth-child(3n) {
          width: 6px;
          height: 6px;
          opacity: 0.4;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        .geometric-patterns {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .pattern {
          position: absolute;
          border-radius: 50%;
          opacity: 0.03;
          transition: transform 0.3s ease;
        }

        .pattern-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          right: 10%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          animation: pulse 8s ease-in-out infinite;
        }

        .pattern-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          left: 5%;
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          animation: pulse 6s ease-in-out infinite reverse;
        }

        .pattern-3 {
          width: 150px;
          height: 150px;
          top: 30%;
          left: 20%;
          background: linear-gradient(225deg, #8b5cf6, #7c3aed);
          animation: pulse 10s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.03;
            transform: scale(1);
          }
          50% {
            opacity: 0.06;
            transform: scale(1.1);
          }
        }

        .wave-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 120px;
        }

        .wave-svg {
          width: 100%;
          height: 100%;
        }

        /* 접근성: 모션 감소 설정 */
        @media (prefers-reduced-motion: reduce) {
          .dynamic-background {
            display: none !important;
          }
        }

        /* 모바일 최적화 */
        @media (max-width: 768px) {
          .particle {
            display: none;
          }
          
          .pattern {
            opacity: 0.02;
          }
          
          .gradient-overlay {
            opacity: 0.5;
          }
        }

        /* 성능 최적화 */
        .dynamic-background * {
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default DynamicBackground;