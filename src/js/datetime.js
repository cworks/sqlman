
function _datetime() {

  return {
      now: function() {
          return new Date();
      },
      nowSuffix: function() {
          var now = new Date();
          var date = new Date(now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds());

          var hour = date.getHours();
          hour = (hour < 10 ? "0" : "") + hour;

          var min  = date.getMinutes();
          min = (min < 10 ? "0" : "") + min;

          var sec  = date.getSeconds();
          sec = (sec < 10 ? "0" : "") + sec;

          var year = date.getFullYear();

          var month = date.getMonth() + 1;
          month = (month < 10 ? "0" : "") + month;

          var day  = date.getDate();
          day = (day < 10 ? "0" : "") + day;
          return year + month + day + "_" + hour + min + sec;
      }
  }

}

module.exports = _datetime;
