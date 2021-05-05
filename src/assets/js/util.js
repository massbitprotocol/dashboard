import BigNumber from "bignumber.js";

export default {
  addCommas(num,point = 4) {
    num = Number( num ).toFixed( point ) - 0;
    return new BigNumber(num).toFormat();
  },
  formatStrByDot( str, start = 6, end = 3 ) {
    if(String(str).length > 12){
      var reg = new RegExp('(.{' + start + '})(.+)(.{' + end + '})', 'g');
      return String(str).replace(reg, "$1...$3")
    }
    return str;
  },
  // 格式化字符串
  getFormatCode(strValue) {
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
  },
  // 判断终端
  browserVersions() {
    var u = navigator.userAgent.toLowerCase();
    return {
      android: u.indexOf('android') > -1 || u.indexOf('adr') > -1, //android终端
      iPhone: u.indexOf('iphone') > -1, //是否为iPhone或者QQHD浏览器
      Safari: !!u.match(/version\/([\d.]+).*safari/), //是否为Safari浏览器
      weixin: u.indexOf('micromessenger') > -1, //是否微信
      mdsApp: u.indexOf('mdsapp') > -1, //是否MdsApp
      mdsVer: u.indexOf('mdsapp') > -1 ? u.match(/mdsapp\/[^\s]+\s?/)[0].trim().split('/')[1] : '0' //MdsApp版本
    };
  },
  // 计算字符数
  computeByteSize( str ) {
    for (var i = 0, byte = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      if (0 <= charCode && charCode <= 0x7f) {
        byte += 1;
      } else if (128 <= charCode && charCode <= 0x7ff) {
        byte += 2;
      } else if (2048 <= charCode && charCode <= 0xffff) {
        byte += 3;
      } else if (65536 < charCode && charCode <= 0x1FFFFF) {
        byte += 4;
      } else if (0x200000 < charCode && charCode <= 0x3FFFFFF) {
        byte += 5;
      } else if (0x4000000 < charCode && charCode <= 0x7FFFFFFF) {
        byte += 6;
      }
    }
    return byte
  },
  /**
   * cookie操作
   */
   setCookie(name, value, options) {
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var s = [cookie, expires, path, domain, secure].join('');
    var secure = options.secure ? '; secure' : '';
    var c = [name, '=', encodeURIComponent(value)].join('');
    var cookie = [c, expires, path, domain, secure].join('')
    document.cookie = cookie;
  },

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },
}