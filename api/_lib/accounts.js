function account(prefix, name) {
  return {
    id: prefix.toLowerCase(),
    name,
    username: process.env[`${prefix}_USERNAME`],
    password: process.env[`${prefix}_PASSWORD`],
    ghlLocationId: process.env[`${prefix}_GHL_LOCATION_ID`],
    ghlToken: process.env[`${prefix}_GHL_TOKEN`],
    ghlPipelineId: process.env[`${prefix}_GHL_PIPELINE_ID`],
    ghlCalendarId: process.env[`${prefix}_GHL_CALENDAR_ID`],
  };
}

export const ACCOUNTS = {
  advantage: account('ADVANTAGE', 'Advantage Services'),
  kgb: account('KGB', 'KGB Marketing'),
};

export function findAccountByCredentials(username, password) {
  const needle = (username || '').trim().toLowerCase();
  return Object.values(ACCOUNTS).find(
    (a) => a.username && a.password && a.username.toLowerCase() === needle && a.password === password
  );
}

export function getAccount(accountId) {
  return ACCOUNTS[accountId] || null;
}
