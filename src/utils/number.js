//百分数转化为小数
export const toPoint = function (percent) {
  var str = percent.replace("%", "");
  str = str / 100;
  return str;
}
//小数转化为百分数
export const toPercent = function (point) {
  var str = Number(point * 100).toFixed(1);
  str += "%";
  return str;
}
