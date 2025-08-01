import { type Friend } from './data';

export interface FriendWithNextBirthday extends Friend {
  nextBirthday: Date;
  isToday: boolean;
}

// Function to get the current date in IST
function getCurrentDateInIST(): Date {
  const now = new Date();
  // IST is UTC+5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istNow = new Date(utc + istOffset);
  return istNow;
}

export function getUpcomingBirthdays(friends: Friend[]): FriendWithNextBirthday[] {
  const today = getCurrentDateInIST();
  today.setHours(0, 0, 0, 0); // Normalize today's date in IST
  const currentYear = today.getFullYear();

  const friendsWithNextBirthday = friends.map((friend) => {
    const [birthYear, birthMonth, birthDay] = friend.birthday.split('-').map(Number);
    
    // Create birthday date object using UTC to avoid timezone issues, then treat as IST
    const birthDateThisYear = new Date(Date.UTC(currentYear, birthMonth - 1, birthDay));

    let nextBirthday: Date;
    let isToday = false;

    // Compare dates by just year, month, and day
    const isBirthdayPassed = 
      birthDateThisYear.getUTCMonth() < today.getMonth() ||
      (birthDateThisYear.getUTCMonth() === today.getMonth() && birthDateThisYear.getUTCDate() < today.getDate());

    const isBirthdayToday = 
      birthDateThisYear.getUTCMonth() === today.getMonth() &&
      birthDateThisYear.getUTCDate() === today.getDate();

    if (isBirthdayToday) {
      nextBirthday = new Date(Date.UTC(currentYear, birthMonth - 1, birthDay));
      isToday = true;
    } else if (isBirthdayPassed) {
      // If birthday has already passed this year, check for next year's
      nextBirthday = new Date(Date.UTC(currentYear + 1, birthMonth - 1, birthDay));
    } else {
      nextBirthday = birthDateThisYear;
    }
    
    // Set time to midnight IST for countdown purposes
    const finalNextBirthday = new Date(nextBirthday.getUTCFullYear(), nextBirthday.getUTCMonth(), nextBirthday.getUTCDate());

    return {
      ...friend,
      nextBirthday: finalNextBirthday,
      isToday,
    };
  });

  // Sort by next birthday, putting today's birthdays first
  return friendsWithNextBirthday.sort((a, b) => {
    if (a.isToday && !b.isToday) return -1;
    if (!a.isToday && b.isToday) return 1;
    return a.nextBirthday.getTime() - b.nextBirthday.getTime();
  });
}