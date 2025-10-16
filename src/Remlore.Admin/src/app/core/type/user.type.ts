export interface User {
  id: string;
  profile: UserProfile;
}

export interface UserProfile {
  sub: string; // User ID (Claims.Subject)
  email: string; // Email
  displayName: string; // Your custom DisplayName claim
  avatar: string; // Your custom avatar claim
  roles: string[]; // User roles
}
