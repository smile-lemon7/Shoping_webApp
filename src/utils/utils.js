import { file_host } from '../constants';
const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
export function isPhoneNum(path) {
  return reg.test(path);
}

/**
 * 获取url中的某个参数的值
 * @param {string}} field 
 */
// export function getQueryString(field) {
//   var reg = new RegExp("(^|&)" + field + "=([^&]*)(&|$)", "i");
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null) return unescape(r[2]); return null;
// }

export function getQueryString(field) {
  var reg = new RegExp("(^|&)" + field + "=([^&]*)(&|$)", "i");
  var params = window.location.hash.split('?')[1];
  var r = params.match(reg);
  if (r != null) return unescape(r[2]); return null;
}

export function saveLocalStorage({type, value}) {
  return window.localStorage.setItem(type, value)
}

export function getLocalStorage(type) {
  let value = window.localStorage.getItem(type);
  return value;
}

export function formatImageUrl(url) {
  return file_host + url;
}