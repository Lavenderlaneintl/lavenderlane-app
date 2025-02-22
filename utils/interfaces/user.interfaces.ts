export interface IUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  username: string;
  coupleId: string;
  createdAt: string;
  endearment: string | null;
  id: string;
  imagePublicId: string | null;
  imageUrl: string | null;
  inSync: boolean;
  isActive: boolean;
  isVerified: boolean;
  phoneNumber: string | null;
  sharedRef: string;
  syncId: string;
  syncedWith: string;
  updatedAt: string;
}
