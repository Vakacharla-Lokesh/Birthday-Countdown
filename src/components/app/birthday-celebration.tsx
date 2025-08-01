'use client';

import type { FriendWithNextBirthday } from '@/lib/dates';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PartyPopper } from 'lucide-react';

interface BirthdayCelebrationProps {
  friend: FriendWithNextBirthday;
}

export default function BirthdayCelebration({ friend }: BirthdayCelebrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const confettiColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    const numConfetti = 100;

    for (let i = 0; i < numConfetti; i++) {
      const confetto = document.createElement('div');
      confetto.className = 'confetti';
      container.appendChild(confetto);

      gsap.set(confetto, {
        x: gsap.utils.random(0, container.clientWidth),
        y: gsap.utils.random(-100, -20),
        width: gsap.utils.random(5, 15),
        height: gsap.utils.random(5, 15),
        backgroundColor: gsap.utils.random(confettiColors),
        position: 'absolute',
        opacity: 1,
      });

      animateConfetto(confetto, container.clientHeight);
    }

    function animateConfetto(element: HTMLDivElement, height: number) {
      gsap.to(element, {
        y: height + 100,
        x: '+=100',
        rotation: gsap.utils.random(180, 360),
        duration: gsap.utils.random(3, 6),
        ease: 'power1.in',
        onComplete: () => {
           gsap.set(element, { y: -20 });
           animateConfetto(element, height);
        },
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

  return (
    <Card className="overflow-hidden shadow-lg border-2 border-primary relative">
       <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden z-0" />
      <CardContent className="p-4 md:p-8 text-center z-10 relative">
        <div className="mb-4 animate-bounce">
          <PartyPopper className="w-16 h-16 text-primary mx-auto" />
        </div>
        <p className="text-primary font-bold text-2xl mb-2">It's Today!</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-primary">
            <AvatarImage src={friend.avatar} alt={friend.name} />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Happy Birthday, {friend.name}!</h2>
        <p className="text-base md:text-lg text-muted-foreground mt-2">We wish you all the best!</p>
      </CardContent>
    </Card>
  );
}