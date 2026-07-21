#!/usr/bin/env node
// Onboard a new client account: pushes env vars to Vercel and wires up
// accounts.js / theme.js / index.css for you. Run with: npm run add-client
//
// Still requires a manual review + deploy afterward (npm run build,
// git commit, git push, vercel deploy --prod) — this script edits local
// files but does not commit or deploy on its own.

import { createInterface } from 'node:readline/promises';
import { randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const rl = createInterface({ input: process.stdin, output: process.stdout });
async function ask(question, fallback) {
  const suffix = fallback ? ` (${fallback})` : '';
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer || fallback || '';
}

function hexToRgbTriplet(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function initialsFor(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

function vercelEnvAdd(name, value, environment) {
  if (!value) return;
  try {
    execFileSync('vercel', ['env', 'add', name, environment, '--value', value, '--yes'], {
      cwd: root,
      stdio: 'pipe',
    });
    console.log(`  added ${name} -> ${environment}`);
  } catch (err) {
    console.log(`  FAILED ${name} -> ${environment}: ${err.message.split('\n')[0]}`);
  }
}

async function main() {
  console.log('--- New client onboarding ---\n');

  const slug = (await ask('Client slug (lowercase, no spaces, e.g. "acme")')).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!slug) throw new Error('Slug is required.');
  const prefix = slug.toUpperCase();

  const displayName = await ask('Display name (e.g. "Acme Roofing")', slug);
  const username = await ask('Login username', slug);
  const generatedPassword = randomBytes(9).toString('base64url');
  const password = await ask('Login password (blank = auto-generate)', generatedPassword);
  const badgeText = await ask('Header badge text (2-3 letters)', initialsFor(displayName));

  const inkHex = await ask('Dark/ink theme color (hex)', '#0F172A');
  const accentHex = await ask('Primary accent color (hex)', '#395FD9');
  const blueHex = await ask('Secondary accent color (hex)', '#155EEF');
  const font = await ask('Font family (must already be loaded in index.html)', 'Plus Jakarta Sans');

  console.log('\nGHL config (leave blank to fill in later):');
  const ghlLocationId = await ask('  GHL Location ID', '');
  const ghlToken = await ask('  GHL Private Integration Token', '');
  const ghlPipelineId = await ask('  GHL Pipeline ID', '');
  const ghlCalendarId = await ask('  GHL Calendar ID', '');

  rl.close();

  console.log('\nPushing env vars to Vercel...');
  const vars = {
    USERNAME: username,
    PASSWORD: password,
    GHL_LOCATION_ID: ghlLocationId,
    GHL_TOKEN: ghlToken,
    GHL_PIPELINE_ID: ghlPipelineId,
    GHL_CALENDAR_ID: ghlCalendarId,
  };
  for (const [key, value] of Object.entries(vars)) {
    for (const environment of ['production', 'preview', 'development']) {
      vercelEnvAdd(`${prefix}_${key}`, value, environment);
    }
  }

  console.log('\nUpdating api/_lib/accounts.js...');
  const accountsPath = join(root, 'api/_lib/accounts.js');
  let accountsSrc = readFileSync(accountsPath, 'utf8');
  const accountLine = `  ${slug}: account('${prefix}', '${displayName.replace(/'/g, "\\'")}'),\n`;
  accountsSrc = accountsSrc.replace(/(export const ACCOUNTS = \{\n)/, `$1${accountLine}`);
  writeFileSync(accountsPath, accountsSrc);

  console.log('Updating src/theme.js...');
  const themePath = join(root, 'src/theme.js');
  let themeSrc = readFileSync(themePath, 'utf8');
  const themeLine = `  ${slug}: { dataTheme: '${slug}', badgeText: '${badgeText}' },\n`;
  themeSrc = themeSrc.replace(/(export const THEMES = \{\n)/, `$1${themeLine}`);
  writeFileSync(themePath, themeSrc);

  console.log('Updating src/index.css...');
  const cssPath = join(root, 'src/index.css');
  let cssSrc = readFileSync(cssPath, 'utf8');
  const cssBlock = `\n[data-theme='${slug}'] {\n  --ink: ${inkHex.toLowerCase()};\n  --ink-rgb: ${hexToRgbTriplet(inkHex)};\n  --accent: ${accentHex.toLowerCase()};\n  --accent-rgb: ${hexToRgbTriplet(accentHex)};\n  --blue: ${blueHex.toLowerCase()};\n  --blue-rgb: ${hexToRgbTriplet(blueHex)};\n  --font: '${font}', -apple-system, system-ui, sans-serif;\n}\n`;
  cssSrc += cssBlock;
  writeFileSync(cssPath, cssSrc);

  console.log(`
--- Done ---
Account "${slug}" (${displayName}) is wired up.
Login: ${username} / ${password}
${ghlLocationId ? '' : '\nGHL config was left blank — the portal will show "not connected yet" until you add it (rerun this script, or set the env vars manually).\n'}
Next steps:
  npm run build
  git add -A && git commit -m "Add ${displayName} client account"
  git push
  vercel deploy --prod --yes
`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
