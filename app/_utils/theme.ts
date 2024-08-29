export function setThemeCookie(theme: 'light' | 'dark') {
  document.cookie = `theme=${theme}; path:/; max-age=3153600`;
}

export function getThemeFromCookie(): 'light' | 'dark' | null {
  const match = document.cookie.match(/theme=(dark|light)/);
  return match ? (match[1] as 'light' | 'dark') : null;
}
