export const THEMES = {
  kgb: { dataTheme: 'kgb', badgeText: 'KGB' },
  advantage: { dataTheme: 'advantage', badgeText: 'AS' },
};

export function themeFor(accountId) {
  return THEMES[accountId] || THEMES.kgb;
}
