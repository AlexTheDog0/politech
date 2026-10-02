export function readPreference(storage, key, allowed, fallback) {
  try {
    const value = storage?.getItem(`ipmt:${key}`);
    return allowed.includes(value) ? value : fallback;
  } catch { return fallback; }
}

export function writePreference(storage, key, value) {
  try { storage?.setItem(`ipmt:${key}`, value); } catch { /* Storage can be disabled; the in-memory choice still works. */ }
}
