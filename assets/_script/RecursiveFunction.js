Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildTree = exports.TreeKeyInfo = exports.OperationTp = undefined;
var i;
// var r_Strategy_TipAnswerTree = require("Strategy_TipAnswerTree");
(function (e) {
  e[e["无"] = 0] = "无";
  e[e["有"] = 1] = "有";
  e[e["有，或未执行"] = 2] = "有，或未执行";
})(i = exports.OperationTp || (exports.OperationTp = {}));
var exp_TreeKeyInfo = function (e) {
  this.operationType = i.有;
  this.subTrr = [];
  this.name = e;
};
exports.TreeKeyInfo = exp_TreeKeyInfo;
exports.BuildTree = function e(t, o) {
  if (t.childrenCount > 0) {
    for (var i = 0; i < t.childrenCount; i++) {
      var s = t.children[i];
      var r = new exp_TreeKeyInfo(s.name);
      o.subTrr.push(r);
      if (s.getComponent(require("Strategy_TipAnswerTree").default)) {
        r.operationType = s.getComponent(require("Strategy_TipAnswerTree").default).operationType;
        e(s, r);
      }
    }
  }
};