import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import birdImage from '../../assets/imgs/bird-1.webp';
import foodImage from '../../assets/imgs/food-9.webp';
import pipeBottomImage from '../../assets/imgs/pipe-bottom.jpg';
import pipeTopImage from '../../assets/imgs/pipe-top.png';
import backgroundImage1 from '../../assets/imgs/background-1.jpg';
import backgroundImage2 from '../../assets/imgs/background-2.png';
import backgroundImage3 from '../../assets/imgs/background-3.png';
export const Floppybird = () => {
   const canvasRef = useRef(null);
   const scoreRef = useRef(0);
   const [gameOver, setGameOver] = useState(true);
   const frameRef = useRef(null);
   const foodsRef = useRef([]);
   const [backgroundIndex, setBackgroundIndex] = useState(0);
   const [counterText, setCounterText] = useState('')
   const backgroundImages = [
      backgroundImage1,
      backgroundImage2,
      backgroundImage3,
   ];
   useEffect(() => {
      if (!gameOver) {
         const intervalId = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
         }, 20000); // Change the background image every 5 seconds (adjust the interval as needed)

         return () => {
            clearInterval(intervalId);
         };
      }
   }, [gameOver]);

   useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const birdSize = 30;
      const birdGravity = 0.25;
      const birdJumpStrength = 5;
      const pipeWidth = 80;
      let pipeSpeed = 4.5;
      const pipeGap = 300;

      const bird = {
         x: canvasWidth / 4,
         y: canvasHeight / 10,
         width: birdSize,
         height: birdSize - 10,
         velocity: 0,
         jump: function () {
            this.velocity = -birdJumpStrength;
         },
         update: function () {
            if (this.y + this.height >= canvasHeight) {
               setGameOver(true);
            }
            this.velocity += birdGravity;
            this.y += this.velocity;
         },
         draw: function () {
            const birdImg = new Image();
            birdImg.src = birdImage;
            ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
         },

      };

      const pipe = {
         x: canvasWidth,
         y: 0,
         width: pipeWidth,
         height: 150,
         passed: false,
         update: function () {
            this.x -= pipeSpeed;
            if (this.x + this.width < 0) {
               this.x = canvasWidth;
               this.height = Math.random() * (canvasHeight - pipeGap);
               this.passed = false;
               addFood();
            }
            if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
               if (bird.y < this.height || bird.y + bird.height > this.height + pipeGap) {
                  setGameOver(true);
               }
            }
            if (!this.passed && bird.x > this.x + this.width) {
               scoreRef.current += 5;
               pipeSpeed += Math.random() * (0.1) + 0.1;;
               this.passed = true;
            }
         },
         draw: function () {
            const top = new Image();
            top.src = pipeTopImage;
            const bottom = new Image();
            bottom.src = pipeBottomImage;
            ctx.drawImage(top, this.x, this.y, this.width, this.height);
            ctx.drawImage(bottom, this.x, this.y + this.height + pipeGap, this.width, canvasHeight - this.height - pipeGap);
         },
      };

      const food = {
         x: 0,
         y: 0,
         width: 50,
         height: 20,
         active: false,
         update: function () {
            this.x -= pipeSpeed;
            if (this.x + this.width < 0) {
               this.active = false;
            }
            if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
               if (bird.y < this.y + this.height && bird.y + bird.height > this.y) {
                  this.active = false;
                  scoreRef.current += 2;
               }
            }
         },
         draw: function () {
            if (this.active) {
               const foodImg = new Image();
               foodImg.src = foodImage;
               ctx.drawImage(foodImg, this.x, this.y, this.width, this.height);
            }
         },
      };

      const addFood = () => {
         const newFood = { ...food };
         newFood.x = canvasWidth;
         newFood.y = Math.random() * (canvasHeight - newFood.height);
         newFood.active = Math.random() > 0.7; // 30% chance of appearing
         foodsRef.current.push(newFood);
      };

      const handleKeyDown = (event) => {
         if (event.keyCode === 32 && !gameOver) {
            bird.jump();
         } else if (event.keyCode === 13 && gameOver) {
            startGame();
         }
      };
      const handleClick = (event) => {
         // startGame()
         bird.jump()
      };

      const startGame = () => {
         scoreRef.current = 0;
         setGameOver(false);
         bird.y = (canvasHeight / 2);
         bird.velocity = 0;
         pipe.x = canvasWidth;
         pipe.height = Math.random() * (canvasHeight - pipeGap);
         pipe.passed = false;
         foodsRef.current = [];
         draw();
      };

      const draw = () => {
         ctx.clearRect(0, 0, canvasWidth, canvasHeight);
         const backgroundImg = new Image();
         backgroundImg.src = backgroundImages[backgroundIndex];
         ctx.drawImage(backgroundImg, 0, 0, canvasWidth, canvasHeight);
         bird.update();
         bird.draw();
         pipe.update();
         pipe.draw();
         foodsRef.current.forEach((food) => {
            food.update();
            food.draw();
         });
         ctx.fillStyle = '#000';
         ctx.font = '24px sans-serif';
         ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);
         if (gameOver) {
            scoreRef.current = 0
            ctx.fillText(`Game Over`, canvasWidth / 2 - 60, 200);
            cancelAnimationFrame(frameRef.current);
         } else {
            frameRef.current = requestAnimationFrame(draw);
         }
      };
      draw();
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClick);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);

         cancelAnimationFrame(frameRef.current);
      };
   }, [backgroundIndex, gameOver]);

   function handleStart(e) {
      if (!gameOver) return
      let count = 3;
      const counterInterval = setInterval(() => {
         if (count > 0) {
            setCounterText(count)
            count--
         } else {
            setCounterText('Go!')
            setTimeout(() => {
               setGameOver(false)
               setCounterText('')
               clearInterval(counterInterval);
            }, 1000)
         }
      }, 1000);

   }

   return (
      <div className='game' >
         <div className='counter'>{counterText && <span>{counterText}</span>} </div>
         {gameOver && <button className='start btn b2' onClick={handleStart}>start</button>}
         <canvas ref={canvasRef} width={400} height={650} tabIndex="0" />
      </div>
   );
}
