// 工具函数create by qinwenlong，email：1095174004@qq.com

/**
 * 获取URL上某个参数值
 * @param {[type]} name [string] 获取url产生key值
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 * 获取URL上某个hash值
 * @param {[type]} name [string] 要获取的hash参数key值
 */
function getHashParams(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURIComponent(window.location.hash.split("?")[1]).match(reg);
  if (r != null) return unescape(r[2] || "");
  return null;
};

/**
 * 格式化数组 转为value label形式，方便三方组件使用
 * @param {[type]} data [array]
 * @param {[type]} options [array | object]
 * 当传入object时，object包含两个属性(也只有两个属性)labelKey和valueKey；
 * 当传入array时，即数组里面的每个对象就是要替换的key值组合{ oldKey: oldKey, newKey: newKey },
 */
function formatList(data = [], options){
  // check options type
  let type = ""
  let newData = [];
  if (options instanceof Object) {
    type = 'object';
  };
  if (Array.isArray(options)) {
    type = 'array';
  };
  if( type === "") {
    console.log("传入options参数格式不正确")
    return data
  }
  if(type === "object") {
    return newData = data.map(item => {
      return { ...item, label: item[options.labelKey], value: item[options.valueKey] }
    })
  }
  if(type === "array") {
    return newData = data.map(item => {
      let newItem = {}
      options.map(option => {
        newItem[option.newKey] = item[option.oldKey];
      })
      return { ...item, ...newItem };
    })
  }
  return data
};

/**
 * 格式化树形数据key值
 * @param {[type]} data [array]
 * @param {[type]} labelKey [string] 要替换为label值的key值
 * @param {[type]} valueKey [string] 要替换为value值的key值
 */
function transferTree(data, labelKey, valueKey){
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

/**
 * 数字格式化显示
 * @param  {[type]} s [数字]
 * @param  {[type]} n [保留小数点后n位]
 * @return {[type]}   [1234.567 => 1,234.56]
 */
function fmoney(s, n){
  n = n >= 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';

  var l = s.split('.')[0].split('').reverse(), r = s.split(".")[1],
      t = "";

  for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  if(n == 0){
      return t.split('').reverse().join('');
  }
  return t.split('').reverse().join('') + '.' + r;
};


/**
 * 
 * @param {[type]} copyText [string]
 * @param {[type]} sucCallBack function
 * @param {[type]} failCallBack function
 * @returns 
 */
function copyText(copyText, sucCallBack, failCallBack){
  let textArea = document.createElement('textarea');

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '1px';
  textArea.style.height = '1px';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = copyText;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    let msg = document.execCommand('copy');
    if (msg) {
      document.body.removeChild(textArea);
      // Feedback.toast.success('复制成功');
      console.log("复制成功！")
      sucCallBack();
      return;
    }
    // Feedback.toast.error('复制失败');
    console.log("复制失败！")
    failCallBack();
  } catch (err) {
    console.log('不能使用这种方法复制内容')
    failCallBack();
  }
};

/**
 * 正则
 */
const Pattern = {
  // 身份证正则校验
  cardId:
    /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  // 手机号正则校验
  phone: /^1[3-9]\d{9}$/,
  //邮箱正则校验
  eMail: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/,
  // 判断字符是不是中文
  testChinese: /[^\x00-\xff]/
};

export {
  getUrlParam,
  getHashParams,
  formatList,
  transferTree,
  copyText,
  fmoney,
  Pattern
};
