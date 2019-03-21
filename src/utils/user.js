
export function saveLocalLogin({logined}) {
  return window.localStorage.setItem('LOGIN', logined)
}

export function getLocalLogin() {
  let logined = window.localStorage.getItem('LOGIN');
  if( logined === 'undefined' ) return undefined;
  if( logined === 'true' ) return true;
}