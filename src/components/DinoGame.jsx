import { useEffect, useRef, useState } from 'react';

const DinoGame = ({ isVisible, onClose }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Game variables
    let animationId;
    let gameSpeed = 3;
    let gravity = 0.5;
    let currentScore = 0;
    
    // Dino object
    const dino = {
      x: 50,
      y: 150,
      width: 40,
      height: 40,
      dy: 0,
      jumpPower: 12,
      grounded: false,
      color: '#535353'
    };

    // Obstacles array
    let obstacles = [];
    let spawnTimer = 0;
    
    // Ground
    const ground = {
      x: 0,
      y: canvas.height - 20,
      width: canvas.width,
      height: 20,
      color: '#535353'
    };

    // Clouds array
    let clouds = [];
    
    // Initialize clouds
    for (let i = 0; i < 3; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: 30 + Math.random() * 50,
        width: 40,
        height: 20
      });
    }

    // Game functions
    const spawnObstacle = () => {
      const size = Math.random() * 20 + 20;
      obstacles.push({
        x: canvas.width,
        y: ground.y - size,
        width: size,
        height: size,
        color: '#535353'
      });
    };

    const updateDino = () => {
      // Gravity
      if (dino.y < ground.y - dino.height) {
        dino.dy += gravity;
        dino.grounded = false;
      } else {
        dino.dy = 0;
        dino.grounded = true;
        dino.y = ground.y - dino.height;
      }
      
      dino.y += dino.dy;
    };

    const updateObstacles = () => {
      // Spawn obstacles
      if (spawnTimer <= 0) {
        spawnObstacle();
        spawnTimer = Math.random() * 100 + 100;
      }
      spawnTimer--;

      // Update obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        
        if (obstacles[i].x + obstacles[i].width < 0) {
          obstacles.splice(i, 1);
          currentScore += 10;
          setScore(currentScore);
        }
      }
    };

    const updateClouds = () => {
      for (let cloud of clouds) {
        cloud.x -= gameSpeed * 0.5;
        if (cloud.x + cloud.width < 0) {
          cloud.x = canvas.width;
          cloud.y = 30 + Math.random() * 50;
        }
      }
    };

    const checkCollision = () => {
      for (let obstacle of obstacles) {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
          return true;
        }
      }
      return false;
    };

    const drawDino = () => {
      ctx.fillStyle = dino.color;
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      
      // Simple dino shape
      ctx.fillStyle = '#fff';
      ctx.fillRect(dino.x + 5, dino.y + 5, 8, 8); // eye
      ctx.fillRect(dino.x + 20, dino.y + 30, 15, 8); // leg
    };

    const drawObstacles = () => {
      ctx.fillStyle = '#535353';
      for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }
    };

    const drawGround = () => {
      ctx.fillStyle = ground.color;
      ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
      
      // Ground pattern
      ctx.strokeStyle = '#535353';
      ctx.lineWidth = 2;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, ground.y);
        ctx.lineTo(i + 10, ground.y);
        ctx.stroke();
      }
    };

    const drawClouds = () => {
      ctx.fillStyle = '#c4c4c4';
      for (let cloud of clouds) {
        // Simple cloud shape
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, 8, 0, Math.PI * 2);
        ctx.arc(cloud.x + 15, cloud.y, 12, 0, Math.PI * 2);
        ctx.arc(cloud.x + 30, cloud.y, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawScore = () => {
      ctx.fillStyle = '#535353';
      ctx.font = '20px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`점수: ${currentScore}`, canvas.width - 20, 30);
    };

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update
      updateDino();
      updateObstacles();
      updateClouds();
      
      // Check collision
      if (checkCollision()) {
        setGameOver(true);
        return;
      }
      
      // Draw
      drawGround();
      drawClouds();
      drawDino();
      drawObstacles();
      drawScore();
      
      // Increase speed gradually
      gameSpeed += 0.001;
      
      animationId = requestAnimationFrame(gameLoop);
    };

    const jump = () => {
      if (dino.grounded) {
        dino.dy = -dino.jumpPower;
        dino.grounded = false;
      }
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    const handleClick = () => {
      jump();
    };

    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleClick);

    // Start game
    gameLoop();

    gameRef.current = {
      restart: () => {
        obstacles = [];
        currentScore = 0;
        setScore(0);
        setGameOver(false);
        gameSpeed = 3;
        dino.y = 150;
        dino.dy = 0;
        dino.grounded = false;
        spawnTimer = 0;
        gameLoop();
      }
    };

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleClick);
    };
  }, [isVisible]);

  const handleRestart = () => {
    setGameOver(false);
    gameRef.current?.restart();
  };

  if (!isVisible) return null;

  return (
    <div className="dino-game-modal">
      <div className="dino-game-backdrop" onClick={onClose} />
      <div className="dino-game-container">
        <div className="dino-game-header">
          <h3>변환 진행 중...</h3>
          <p>잠시만 기다려주세요. 게임으로 시간을 보내세요!</p>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="dino-game-content">
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className="dino-canvas"
          />
          
          {gameOver && (
            <div className="game-over-overlay">
              <h4>게임 오버!</h4>
              <p>점수: {score}</p>
              <button onClick={handleRestart} className="restart-btn">
                다시 시작
              </button>
            </div>
          )}
          
          <div className="game-instructions">
            <p>🎮 스페이스바 또는 클릭으로 점프하세요!</p>
          </div>
        </div>
      </div>

      <style>{`
        .dino-game-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dino-game-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
        }

        .dino-game-container {
          position: relative;
          background: white;
          border-radius: var(--border-radius-2xl);
          box-shadow: var(--shadow-2xl);
          overflow: hidden;
          max-width: 700px;
          width: 90%;
          max-height: 90%;
        }

        .dino-game-header {
          position: relative;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          color: white;
          text-align: center;
        }

        .dino-game-header h3 {
          margin: 0 0 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .dino-game-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 1rem;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .close-btn svg {
          width: 16px;
          height: 16px;
        }

        .dino-game-content {
          position: relative;
          padding: 2rem;
          text-align: center;
        }

        .dino-canvas {
          border: 2px solid var(--gray-200);
          border-radius: var(--border-radius-lg);
          background: #f7f7f7;
          cursor: pointer;
        }

        .game-over-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.95);
          padding: 2rem;
          border-radius: var(--border-radius-xl);
          box-shadow: var(--shadow-lg);
          text-align: center;
        }

        .game-over-overlay h4 {
          margin: 0 0 1rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--gray-900);
        }

        .game-over-overlay p {
          margin: 0 0 1.5rem;
          color: var(--gray-600);
          font-size: 1.125rem;
        }

        .restart-btn {
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: var(--border-radius-lg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .restart-btn:hover {
          background: var(--dark-blue);
          transform: translateY(-1px);
        }

        .game-instructions {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--gray-50);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--gray-200);
        }

        .game-instructions p {
          margin: 0;
          color: var(--gray-600);
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .dino-game-container {
            width: 95%;
          }

          .dino-canvas {
            width: 100%;
            height: auto;
          }

          .dino-game-content {
            padding: 1rem;
          }

          .dino-game-header {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DinoGame;