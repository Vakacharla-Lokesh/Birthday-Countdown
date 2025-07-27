'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BalloonBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const balloonColors = ['#ffc2d1', '#ffb3c1', '#ff8fab', '#fb6f92', '#ff5c8a'];
    const numBalloons = 20;

    for (let i = 0; i < numBalloons; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      container.appendChild(balloon);

      gsap.set(balloon, {
        x: gsap.utils.random(0, container.clientWidth),
        y: gsap.utils.random(container.clientHeight, container.clientHeight * 1.5),
        backgroundColor: gsap.utils.random(balloonColors),
        width: gsap.utils.random(40, 80),
        height: gsap.utils.random(50, 100),
        borderRadius: '50%',
        position: 'absolute',
        opacity: 0.7,
      });

      animateBalloon(balloon, container);
    }

    function animateBalloon(balloon: HTMLDivElement, bounds: HTMLDivElement) {
      gsap.to(balloon, {
        y: -200,
        duration: gsap.utils.random(5, 10),
        ease: 'none',
        onComplete: () => {
          gsap.set(balloon, {
            y: bounds.clientHeight + 100,
            x: gsap.utils.random(0, bounds.clientWidth),
          });
          animateBalloon(balloon, bounds);
        },
      });

      gsap.to(balloon, {
        x: '+=50',
        duration: gsap.utils.random(2, 4),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      if (container) {
          while (container.firstChild) {
              container.removeChild(container.firstChild);
          }
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0" />;
};

export default BalloonBackground;
