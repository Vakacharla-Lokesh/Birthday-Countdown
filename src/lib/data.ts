export interface Friend {
  id: number;
  name: string;
  birthday: string; // YYYY-MM-DD
  avatar: string;
}

const generateBirthdays = () => {
  const friends: Friend[] = [];
  const today = new Date();
  const names = [
    "Alex Johnson",
    "Maria Garcia",
    "Chen Wei",
    "Fatima Al-Fassi",
    "David Smith",
    "Yuki Tanaka",
    "Olga Petrova",
    "Carlos Rodriguez",
    "Aisha Khan",
    "John Miller",
    "Sofia Rossi",
    "Liam O'Connell",
  ];

  for (let i = 0; i < names.length; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() + i);
    date.setDate(Math.floor(Math.random() * 28) + 1);

    friends.push({
      id: i + 1,
      name: names[i],
      birthday: `199${i % 10}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`,
      avatar: `https://placehold.co/128x128.png`,
    });
  }
  return friends;
};

export const friendsData: Friend[] = [
  {
    id: 0,
    name: "Aarya Jain",
    birthday: "2004-01-08",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 1,
    name: "Arpit Kumar",
    birthday: "2004-01-09",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 2,
    name: "Khaled Edres Yousef",
    birthday: "2003-03-11",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 3,
    name: "Kushagra Pankaj",
    birthday: "2004-03-19",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 4,
    name: "Subham Prasad Achary",
    birthday: "2003-03-28",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 5,
    name: "Danial Abdullah",
    birthday: "2002-05-30",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 6,
    name: "Vakacharla Lokesh",
    birthday: "2004-07-11",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 7,
    name: "Khushi Omar",
    birthday: "2004-08-05",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 8,
    name: "Saniyya C Das",
    birthday: "2004-09-27",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 9,
    name: "Anshdeep Singh",
    birthday: "2004-09-27",
    avatar: "https://placehold.co/128x128.png",
  },
  {
    id: 10,
    name: "Aryan Walia",
    birthday: "2004-09-29",
    avatar: "https://placehold.co/128x128.png",
  },
];
