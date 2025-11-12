
export interface Token {
  id: number;
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  revoked: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}