import { type Friend } from "./data";

export interface FriendWithNextBirthday extends Friend {
  nextBirthday: Date;
}

export function getUpcomingBirthdays(
  friends: Friend[]
): FriendWithNextBirthday[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();

  const friendsWithNextBirthday = friends.map((friend) => {
    const [birthYear, birthMonth, birthDay] = friend.birthday
      .split("-")
      .map(Number);

    let nextBirthdayThisYear = new Date(currentYear, birthMonth - 1, birthDay);
    nextBirthdayThisYear.setHours(0, 0, 0, 0);

    let nextBirthday: Date;

    if (nextBirthdayThisYear < today) {
      nextBirthday = new Date(currentYear + 1, birthMonth - 1, birthDay);
    } else {
      nextBirthday = nextBirthdayThisYear;
    }

    return {
      ...friend,
      nextBirthday,
    };
  });

  return friendsWithNextBirthday.sort(
    (a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime()
  );
}
