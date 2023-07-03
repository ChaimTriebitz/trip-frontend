import React, { useEffect, useRef } from 'react';

export const Doodlejump = () => {
   const canvasRef = useRef(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const platformWidth = 80;
      const platformHeight = 20;
      const jumpForce = 20;
      let x = canvasWidth / 2 - platformWidth / 2;
      let y = canvasHeight - platformHeight;
      let dy = 0;
      let platforms = [
         { x: 0, y: canvasHeight - platformHeight },
         { x: canvasWidth - platformWidth, y: canvasHeight - platformHeight },
      ];
      let score = 0;

      const drawPlatform = (platform) => {
         context.fillStyle = '#000';
         context.fillRect(platform.x, platform.y, platformWidth, platformHeight);
      };

      const drawDoodle = () => {
         context.fillStyle = '#f00';
         context.fillRect(x, y, platformWidth, platformHeight);
      };

      const drawScore = () => {
         context.font = '24px Arial';
         context.fillStyle = '#000';
         context.fillText(`Score: ${score}`, 10, 30);
      };

      const update = () => {
         context.clearRect(0, 0, canvasWidth, canvasHeight);

         platforms.forEach((platform) => {
            platform.y -= dy;
            drawPlatform(platform);
         });

         dy -= 0.5;

         if (y > canvasHeight / 2) {
            y -= dy;
         } else {
            platforms.forEach((platform, index) => {
               platform.y -= dy;

               if (platform.y > canvasHeight) {
                  platforms.splice(index, 1);
                  platforms.push({
                     x: Math.random() * (canvasWidth - platformWidth),
                     y: platform.y - canvasHeight,
                  });
                  score++;
               }

               drawPlatform(platform);
            });

            drawDoodle();
            drawScore();
         }

         requestAnimationFrame(update);
      };

      const handleKeyDown = (event) => {
         if (event.key === 'ArrowUp') {
            dy = jumpForce;
         }
      };

      document.addEventListener('keydown', handleKeyDown);

      update();

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   return <canvas ref={canvasRef} width={400} height={600} />;
}
