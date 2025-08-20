import { useState, useEffect, useRef } from "react";

function FloatingElements() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const elementsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const floatingIcons = [
    { icon: "⚡", size: "2rem", delay: 0 },
    { icon: "🚀", size: "1.8rem", delay: 1 },
    { icon: "💡", size: "1.6rem", delay: 2 },
    { icon: "⭐", size: "1.4rem", delay: 0.5 },
    { icon: "🔧", size: "1.7rem", delay: 1.5 },
    { icon: "📱", size: "1.5rem", delay: 2.5 },
  ];

  return (
    <div className="floating-elements">
      {/* 코드 블록 애니메이션 */}
      <div className="code-blocks">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="code-block"
            style={{
              left: `${15 + (i * 12) % 70}%`,
              top: `${20 + (i * 15) % 60}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `translate(${(mousePos.x - 50) * 0.05}px, ${(mousePos.y - 50) * 0.05 + scrollY * 0.1}px)`
            }}
          >
            <div className="code-line" style={{ width: '80%' }}></div>
            <div className="code-line" style={{ width: '60%' }}></div>
            <div className="code-line" style={{ width: '90%' }}></div>
          </div>
        ))}
      </div>

      {/* 플로팅 아이콘들 */}
      <div className="floating-icons">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className="floating-icon"
            style={{
              left: `${10 + (i * 15) % 80}%`,
              top: `${10 + (i * 20) % 70}%`,
              fontSize: item.size,
              animationDelay: `${item.delay}s`,
              transform: `translate(${(mousePos.x - 50) * 0.08}px, ${(mousePos.y - 50) * 0.08 + scrollY * 0.15}px)`
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* 데이터 플로우 라인들 */}
      <div className="data-flow">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flow-line"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.6}s`,
              transform: `translateY(${scrollY * 0.2}px)`
            }}
          >
            <div className="flow-dot"></div>
            <div className="flow-dot"></div>
            <div className="flow-dot"></div>
          </div>
        ))}
      </div>

      {/* 회전하는 기어들 */}
      <div className="rotating-gears">
        <div
          className="gear gear-1"
          style={{
            transform: `rotate(${scrollY * 0.3}deg) translate(${(mousePos.x - 50) * 0.1}px, ${(mousePos.y - 50) * 0.1}px)`
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24m-6.72 0L.76 5.5m16.48 13L12.76 14.26m-6.72 0L1.76 18.5"/>
          </svg>
        </div>
        <div
          className="gear gear-2"
          style={{
            transform: `rotate(${-scrollY * 0.2}deg) translate(${(mousePos.x - 50) * 0.15}px, ${(mousePos.y - 50) * 0.15}px)`
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24m-6.72 0L.76 5.5m16.48 13L12.76 14.26m-6.72 0L1.76 18.5"/>
          </svg>
        </div>
      </div>

      <style>{`
        .floating-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .code-blocks {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .code-block {
          position: absolute;
          width: 80px;
          height: 50px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
          padding: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          animation: codeFloat 8s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .code-line {
          height: 3px;
          background: rgba(59, 130, 246, 0.4);
          border-radius: 2px;
          margin-bottom: 4px;
          animation: codePulse 2s ease-in-out infinite;
        }

        .code-line:nth-child(2) {
          animation-delay: 0.3s;
        }

        .code-line:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes codeFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
            opacity: 0.8;
          }
        }

        @keyframes codePulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        .floating-icons {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-icon {
          position: absolute;
          animation: iconFloat 6s ease-in-out infinite;
          transition: transform 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .floating-icon:nth-child(even) {
          animation-direction: reverse;
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }

        .data-flow {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .flow-line {
          position: absolute;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3), transparent);
          animation: flowMove 4s linear infinite;
        }

        .flow-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          left: -1px;
          animation: dotMove 3s linear infinite;
        }

        .flow-dot:nth-child(2) {
          animation-delay: 1s;
        }

        .flow-dot:nth-child(3) {
          animation-delay: 2s;
        }

        @keyframes flowMove {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes dotMove {
          0% {
            top: -10px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .rotating-gears {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .gear {
          position: absolute;
          width: 60px;
          height: 60px;
          color: rgba(59, 130, 246, 0.2);
          transition: transform 0.3s ease;
        }

        .gear-1 {
          top: 20%;
          right: 15%;
        }

        .gear-2 {
          bottom: 30%;
          left: 10%;
          width: 40px;
          height: 40px;
        }

        .gear svg {
          width: 100%;
          height: 100%;
        }

        /* 접근성 및 성능 최적화 */
        @media (prefers-reduced-motion: reduce) {
          .floating-elements {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .code-block,
          .floating-icon {
            display: none;
          }
          
          .data-flow,
          .rotating-gears {
            opacity: 0.5;
          }
        }

        .floating-elements * {
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}

export default FloatingElements;