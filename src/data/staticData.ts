
export const users = [
  {
    id: "1",
    username: "Hamza",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamza",
    bio: "Fashion enthusiast | Style curator",
    pins: 120,
    followers: 1500,
    following: 890
  },
  {
    id: "2",
    username: "Ayoub",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayoub",
    bio: "Street style photographer | Creative director",
    pins: 85,
    followers: 2200,
    following: 750
  },
  {
    id: "3",
    username: "Ana",
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    bio: "Fashion blogger | Digital creator",
    pins: 200,
    followers: 3100,
    following: 920
  }
];

export const staticPins = [
  {
    id: "1",
    title: "Vintage Truck Jacket",
    description: "Classic denim jacket with unique truck design",
    type: "PRODUCT",
    imageUrl: "https://i.ibb.co/LdYxcj50/truck-jacket.jpg",
    user: users[0],
    likes: 0
  },
  {
    id: "2",
    title: "Urban Street Style",
    description: "Modern street fashion combination",
    type: "PRODUCT",
    imageUrl: "https://i.ibb.co/LDpwG5Y7/6b4143c82251eef546f5c6a33ba2784a.jpg",
    user: users[1],
    likes: 0
  },
  {
    id: "3",
    title: "Casual Elegance",
    description: "Simple yet sophisticated outfit",
    type: "PRODUCT",
    imageUrl: "https://i.ibb.co/JDgm9MT/3395ce42d9f9a393d6971c74679d5d76.jpg",
    user: users[2],
    likes: 0
  },
  {
    id: "4",
    title: "Summer Vibes Outfit",
    description: "Perfect combination for summer days",
    type: "OUTFIT",
    imageUrl: "https://i.ibb.co/F4V6jm40/d9056bb3325fd3fa2e78000d57f3cea6.jpg",
    user: users[0],
    likes: 0
  },
  {
    id: "5",
    title: "Street Fashion Look",
    description: "Urban style outfit inspiration",
    type: "OUTFIT",
    imageUrl: "https://i.ibb.co/rGWCJZj7/720f88eae35743c41c89fecae05a347f.jpg",
    user: users[1],
    likes: 0
  },
  {
    id: "6",
    title: "Modern Casual",
    description: "Contemporary street style ensemble",
    type: "OUTFIT",
    imageUrl: "https://i.ibb.co/rGWCJZj7/720f88eae35743c41c89fecae05a347f.jpg",
    user: users[2],
    likes: 0
  }
];

export const wardrobes: Wardrobe[] = [];

export interface Wardrobe {
  id: string;
  name: string;
  description: string;
  pins: typeof staticPins[0][];
  createdAt: Date;
}

export const likedPins: Set<string> = new Set();

