// ── src/auth.js ───────────────────────────────────────────────────────────────
// Simple static credential store for internal team access.
// To add or change users, edit the USERS list below and redeploy.
//
// ⚠️  This is a lightweight access control layer, not enterprise-grade security.
//     Since the app is public on GitHub Pages, anyone with credentials can access it.
//     Migrate to Firebase Auth or Azure AD when moving to Azure.

export const USERS = [
  { username: "alic.antunez",        password: "Resideo2025!", name: "Alic Antunez",         email: "Alic.Antunez@resideo.com"        },
  { username: "jorge.torres",        password: "Resideo2025!", name: "Jorge Torres",         email: "Jorge.Torres@resideo.com"        },
  { username: "guillermo.cerda",     password: "Resideo2025!", name: "Guillermo Cerda",      email: "Guillermo.Cerda@resideo.com"     },
  { username: "adrian.pliego",       password: "Resideo2025!", name: "Adrian Pliego",        email: "Adrian.Pliegoa@resideo.com"     },
  { username: "thomas.pelkas",       password: "Resideo2025!", name: "Thomas Pelkas",        email: "Thomas.Pelkas@resideo.com"       },
  { username: "sachin.balachandran", password: "Resideo2025!", name: "Sachin Balachandran",  email: "Sachin.Balachandran@resideo.com" },
];

const SESSION_KEY = "noc_session";

export function login(username, password) {
  const user = USERS.find(
    (u) => u.username === username.toLowerCase().trim() && u.password === password
  );
  if (user) {
    const session = { username: user.username, name: user.name, email: user.email };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }
  return null;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}
