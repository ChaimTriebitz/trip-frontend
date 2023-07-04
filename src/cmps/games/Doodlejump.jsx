import React, { useEffect } from 'react';

export const Doodlejump = () => {
  // Board
  let board;
  let boardWidth = 360;
  let boardHeight = 576;
  let context;

  // Doodler
  let doodlerWidth = 46;
  let doodlerHeight = 46;
  let doodlerX = boardWidth / 2 - doodlerWidth / 2;
  let doodlerY = boardHeight * 7 / 8 - doodlerHeight;

  let doodler = {
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight,
  };

  // Physics
  let velocityX = 0;
  let velocityY = 0; // Doodler jump speed
  let initialVelocityY = -8; // Starting velocity Y
  let gravity = 0.4;

  // Platforms
  let platformArray = [];
  let platformWidth = 60;
  let platformHeight = 18;

  let score = 0;
  let maxScore = 0;
  let gameOver = false;

  useEffect(() => {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');

    velocityY = initialVelocityY;
    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener('keydown', moveDoodler);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('keydown', moveDoodler);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const update = () => {
    requestAnimationFrame(update);
    if (gameOver) {
      return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth) {
      doodler.x = 0;
    } else if (doodler.x + doodler.width < 0) {
      doodler.x = boardWidth;
    }

    velocityY += gravity;
    doodler.y += velocityY;
    if (doodler.y > board.height) {
      gameOver = true;
    }
    context.fillStyle = 'green';
    context.fillRect(doodler.x, doodler.y, doodler.width, doodler.height);

    // Platforms
    for (let i = 0; i < platformArray.length; i++) {
      let platform = platformArray[i];
      if (velocityY < 0 && doodler.y < boardHeight * 3 / 4) {
        platform.y -= initialVelocityY; // Slide platform down
      }
      if (detectCollision(doodler, platform) && velocityY >= 0) {
        velocityY = initialVelocityY; // Jump
      }
      context.fillStyle = 'brown';
      context.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    // Clear platforms and add new platform
    while (platformArray.length > 0 && platformArray[0].y >= boardHeight) {
      platformArray.shift(); // Removes first element from the array
      newPlatform(); // Replace with new platform on top
    }

    // Score
    updateScore();
    context.fillStyle = 'black';
    context.font = '16px sans-serif';
    context.fillText(score, 5, 20);

    if (gameOver) {
      context.fillText('Game Over: Press "Space" to Restart', boardWidth / 7, boardHeight * 7 / 8);
    }
  };

  const moveDoodler = (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      // Move right
      velocityX = 4;
    } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      // Move left
      velocityX = -4;
    } else if (e.code === 'Space' && gameOver) {
      // Reset
      doodler = {
        x: doodlerX,
        y: doodlerY,
        width: doodlerWidth,
        height: doodlerHeight,
      };

      velocityX = 0;
      velocityY = initialVelocityY;
      score = 0;
      maxScore = 0;
      gameOver = false;
      placePlatforms();
    }
  };

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 0) {
      // Move right
      velocityX = 4;
    } else if (deltaX < 0) {
      // Move left
      velocityX = -4;
    }
  };

  const placePlatforms = () => {
    platformArray = [];

    // Starting platforms
    let platform = {
      x: boardWidth / 2,
      y: boardHeight - 50,
      width: platformWidth,
      height: platformHeight,
    };

    platformArray.push(platform);

    for (let i = 0; i < 6; i++) {
      let randomX = Math.floor(Math.random() * (boardWidth * 3 / 4)); // (0-1) * boardWidth*3/4
      let platform = {
        x: randomX,
        y: boardHeight - 75 * i - 150,
        width: platformWidth,
        height: platformHeight,
      };

      platformArray.push(platform);
    }
  };

  const newPlatform = () => {
    let randomX = Math.floor(Math.random() * (boardWidth * 3 / 4)); // (0-1) * boardWidth*3/4
    let platform = {
      x: randomX,
      y: -platformHeight,
      width: platformWidth,
      height: platformHeight,
    };

    platformArray.push(platform);
  };

  const detectCollision = (a, b) => {
    return (
      a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
      a.x + a.width > b.x && // a's top right corner passes b's top left corner
      a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner
      a.y + a.height > b.y // a's bottom left corner passes b's top left corner
    );
  };

  const updateScore = () => {
    let points = Math.floor(50 * Math.random()); // (0-1) * 50 --> (0-50)
    if (velocityY < 0) {
      // Negative going up
      maxScore += points;
      if (score < maxScore) {
        score = maxScore;
      }
    } else if (velocityY >= 0) {
      maxScore -= points;
    }
  };

  return <canvas id="board"></canvas>;
};

