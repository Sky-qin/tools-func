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

function transferTree = (data, labelKey, valueKey) => {
  if (!Array.isArray(data)) {
    return [];
  }
  for (let i = 0; i < data.length; i++) {
    data[i].label = data[i][labelKey];
    data[i].value = data[i][valueKey];
    if (data[i].children) {
      transferTree(data[i].children);
    }
  }
  return data;
};

export { getUrlParam, getHashParams, transferTree };
