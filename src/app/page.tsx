import { getUpcomingBirthdays } from "@/lib/dates";
import { friendsData } from "@/lib/data";
import BirthdayCountdown from "@/components/app/birthday-countdown";
import BirthdayTimeline from "@/components/app/birthday-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { FullscreenToggle } from "@/components/app/fullscreen-toggle";
import BalloonBackground from "@/components/app/balloon-background";

export default function Home() {
  const sortedBirthdays = getUpcomingBirthdays(friendsData);
  const upcomingFriend = sortedBirthdays[0];

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      <BalloonBackground />
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <ThemeToggle />
        <FullscreenToggle />
      </div>
      <div className="container mx-auto max-w-4xl p-4 md:p-8 z-10">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            Frienday Countdown 🎂
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Never miss a celebration again.
          </p>
        </header>

        <section
          id="countdown"
          className="mb-8 md:mb-12"
        >
          {upcomingFriend ? (
            <BirthdayCountdown friend={upcomingFriend} />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p>No upcoming birthdays found. Add some friends!</p>
              </CardContent>
            </Card>
          )}
        </section>

        <Separator className="my-8" />

        <section id="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">
                Birthday Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedBirthdays.length > 0 ? (
                <BirthdayTimeline friends={sortedBirthdays} />
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>Your friends' birthdays will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
