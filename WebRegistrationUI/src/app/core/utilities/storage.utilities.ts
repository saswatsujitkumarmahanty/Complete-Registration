import { AuthResponse } from '../models/auth';

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';
const USER_NAME_KEY = 'userName';
const ROLE_KEY = 'role';

function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
         typeof localStorage !== 'undefined';
}

export function storeAuthResponse(res: AuthResponse): void {
  if (!isBrowser()) return;

  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_ID_KEY, res.userId);
  localStorage.setItem(USER_NAME_KEY, res.name);

  if (res.role) {
    localStorage.setItem(ROLE_KEY, res.role);
  }
}

export function clearAuth(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getRole(): string | null {
  if (!isBrowser()) return null;

  return localStorage.getItem(ROLE_KEY);
}

export function isAdmin(): boolean {
  return getRole() === 'Admin';
}

function avatarKey(userId: string): string {
  return `avatar_${userId}`;
}

export function getAvatar(
  userId: string | null
): string | null {
  if (!userId || !isBrowser()) return null;

  return localStorage.getItem(avatarKey(userId));
}

export function setAvatar(
  userId: string,
  dataUrl: string
): void {
  if (!isBrowser()) return;

  localStorage.setItem(
    avatarKey(userId),
    dataUrl
  );
}

export function removeAvatar(
  userId: string
): void {
  if (!isBrowser()) return;

  localStorage.removeItem(
    avatarKey(userId)
  );
}