import { LOGIN_STATE, USER_INFO } from "./constants";

export const isLogined = function() {
  return localStorage.getItem(LOGIN_STATE) || 1;
};

export const setLogined = function(val) {
  return localStorage.setItem(LOGIN_STATE, val);
};

export const cacheUserInfo = function(val = null) {
  return localStorage.setItem(USER_INFO, JSON.stringify(val));
};

export const getUserInfo = function() {
  return JSON.parse(localStorage.getItem(USER_INFO) || null);
};

export const transformMenuData = function transformMenuData(arr) {
  let result = [];
  for (var i = 0; i < arr.length; i++) {
    let item = arr[i];
    let obj = {
      id: item.id,
      key: item.id,
      title: item.name,
      name: item.name,
      url: item.url
    };
    if (item.childEbResourceVos && item.childEbResourceVos.length > 0) {
      obj.children = transformMenuData(item.childEbResourceVos);
    }
    result.push(obj);
  }
  return result;
};

export const promptMsgAndJump = function promptMsgAndJump(msg, url) {
  window.message.success(msg);
  let st = setTimeout(() => {
    this.$router.push(url);
    clearTimeout(st);
  }, 2000);
};
