// User Model
export interface User {
    id: string;
    name: string;
    email: string;
    location: string;
    favoritePlants: string[];
    profileImage?: string;
    createdAt: Date;
  }
  
  // Post (Bibit & Hasil Panen) Model
  export interface Post {
    id: string;
    userId: string;
    title: string;
    type: 'seed' | 'harvest'; // bibit or hasil panen
    quantity: number;
    location: string;
    images: string[];
    description: string;
    status: 'available' | 'completed';
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
  }
  
  // Request (Permintaan) Model
  export interface Request {
    id: string;
    userId: string;
    plantName: string;
    location: string;
    reason: string;
    status: 'open' | 'fulfilled';
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
  }
  
  // Article Model
  export interface Article {
    id: string;
    userId: string;
    title: string;
    content: string;
    image?: string;
    category?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Comment Model
  export interface Comment {
    id: string;
    userId: string;
    parentId: string; // Post ID or Request ID
    parentType: 'post' | 'request';
    content: string;
    createdAt: Date;
  }
  
  // History (Riwayat Tukar) Model
  export interface History {
    id: string;
    postId?: string;
    requestId?: string;
    userId: string;
    partnerId: string;
    plantName: string;
    date: Date;
    notes: string;
    type: 'post' | 'request'; // source of the exchange
  }