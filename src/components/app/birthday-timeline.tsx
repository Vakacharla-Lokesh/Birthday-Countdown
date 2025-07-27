import type { FriendWithNextBirthday } from '@/lib/dates';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface BirthdayTimelineProps {
  friends: FriendWithNextBirthday[];
}

export default function BirthdayTimeline({ friends }: BirthdayTimelineProps) {
  return (
    <div className="relative flex flex-col gap-6 pl-6 before:absolute before:left-6 before:top-0 before:h-full before:w-[2px] before:bg-border">
      {friends.map((friend, index) => (
        <div key={friend.id} className="relative flex items-center gap-6">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-4 w-4 rounded-full bg-primary border-4 border-background" />
          <div className="flex items-center gap-4 w-full p-4 rounded-lg bg-card transition-colors hover:bg-accent/50">
             <Avatar className="h-12 w-12">
              <AvatarImage src={friend.avatar} alt={friend.name} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow hidden md:block">
              <p className="font-semibold text-lg">{friend.name}</p>
            </div>
            <div className="text-right flex-grow md:flex-grow-0">
              <p className="font-mono text-base font-medium text-primary">
                {format(friend.nextBirthday, 'MMM dd')}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(friend.nextBirthday, 'EEEE')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
