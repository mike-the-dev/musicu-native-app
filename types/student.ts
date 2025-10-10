// Student related types

// ProfilePicture Interface
export interface ProfilePicture {
  url: string;
  size: number;
  width: number;
  height: number;
  filename: string;
  metadata: {
    width: number;
    height: number;
    blurHash: string;
    blurHashWidth: number;
  };
}

// StudentDTO Interface
export interface StudentDTO {
  id: string;                    // e.g., "USER#01K75PETE81MQ1JFG9KRQ3RY1W"
  email: string;
  fullName: string;
  role: string;                  // "Student"
  profilePicture: ProfilePicture | null;
  instrument: string;
  bio: string;
  location: string;
  locationDistance: number;
  canHost: boolean;
  canTravel: boolean;
  onlineLessons: boolean;
  acceptsPosts: boolean;
  acceptsIntro: boolean;
  acceptsNotices: boolean;
  termsAccepted: boolean;
  createdAt: string;             // ISO timestamp
  lastUpdated: string;           // ISO timestamp
}

// Response Type
export type ListMyStudentsResponse = StudentDTO[];

