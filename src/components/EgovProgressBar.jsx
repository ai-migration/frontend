import React from "react";
import { useSpring, animated } from "@react-spring/web";

const GlobalStyles = () => (
  <style>{`
  @keyframes stripeMove {
    0% { background-position: 0 0; }
    100% { background-position: 40px 0; }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 rgba(0,0,0,0.15); }
    50% { box-shadow: 0 0 14px rgba(0,0,0,0.25); }
  }
`}</style>
);

function EgovProgressBar({ progress, height = 20, color = "#4cafef", background = "#ddd" }) {
  const styles = useSpring({
    width: `${progress}%`,
    config: { tension: 170, friction: 26 }, // 스프링 애니메이션 탄성 조절
  });

  return (
    <>
        <div
        style={{
            width: "100%",
            height: `${height}px`,
            backgroundColor: background,
            borderRadius: "10px",
            overflow: "hidden",
        }}
        >
    <GlobalStyles/>
        <animated.div
            style={{
            height: "100%",
            backgroundColor: color,
            ...styles,
            }}
        />
        </div>
    </>
  );
}

export default EgovProgressBar;