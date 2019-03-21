export function log(...msg) {
  console.log(...msg);
}

export function warn(...msg) {
  console.warn(...msg);
}

export function error(...msg) {
  console.error(...msg);
}

export default {
  log, warn, error
}