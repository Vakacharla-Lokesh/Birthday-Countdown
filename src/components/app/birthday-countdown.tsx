'use client';

import type { FriendWithNextBirthday } from '@/lib/dates';
import { useCountdown } from '@/hooks/use-countdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

interface BirthdayCountdownProps {
  friend: FriendWithNextBirthday;
}

const CountdownUnit = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-16 w-12 md:h-20 md:w-16">
        <AnimatePresence>
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-bold text-primary"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
};

export default function BirthdayCountdown({ friend }: BirthdayCountdownProps) {
  const { days, hours, minutes, seconds } = useCountdown(friend.nextBirthday.toISOString());

  return (
    <Card className="overflow-hidden shadow-lg border-2 border-primary">
      <CardContent className="p-4 md:p-8 text-center">
        <p className="text-muted-foreground font-medium mb-2">Next Birthday</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-border">
            <AvatarImage src={friend.avatar} alt={friend.name} />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-headline">{friend.name}</h2>
            <p className="text-base md:text-lg text-muted-foreground">{format(friend.nextBirthday, 'MMMM do')}</p>
          </div>
        </div>
        
        <div className="flex justify-center items-start gap-1 md:gap-4 mt-6">
          <CountdownUnit value={days} label="Days" />
          <div className="text-3xl md:text-5xl font-bold text-muted-foreground/50">:</div>
          <CountdownUnit value={hours} label="Hours" />
          <div className="text-3xl md:text-5xl font-bold text-muted-foreground/50">:</div>
          <CountdownUnit value={minutes} label="Minutes" />
          <div className="text-3xl md:text-5xl font-bold text-muted-foreground/50">:</div>
          <CountdownUnit value={seconds} label="Seconds" />
        </div>
      </CardContent>
    </Card>
  );
}
