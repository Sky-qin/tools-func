function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getHashParams(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURIComponent(window.location.hash.split("?")[1]).match(reg);
  if (r != null) return unescape(r[2] || "");
  return null;
}

export { getUrlParam, getHashParams };
