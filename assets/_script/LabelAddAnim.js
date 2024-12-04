var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelAddAnim = undefined;
var r_ActionBase = require("ActionBase");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_LabelAddAnim = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.animTime = .5;
    t.startNum = 0;
    t.endNum = 0;
    t.startkey = "";
    t.endkey = "";
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onTrigger = function () {
    var e;
    var t = this;
    e = "" != this.startkey ? Number(r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.startkey)) : Number(this.startNum);
    var i;
    var n = (i = "" != this.endkey ? Number(r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.endkey)) : Number(this.endNum)) - e;
    this.label.string = e + "";
    _ref__ctor.index = _ref__ctor.index + 1;
    r_TimeSystem.TimeSystem.timeMapUpdate("LabelAddAnim" + _ref__ctor.index, this.animTime, function (o) {
      t.label.string = 1 == o ? i + "" : Math.floor(e + n * o) + "";
    });
  };
  _ctor.index = 0;
  __decorate([_property({
    type: cc.Label,
    displayName: "label节点"
  })], _ctor.prototype, "label", undefined);
  __decorate([_property({
    type: Number,
    displayName: "动画时间"
  })], _ctor.prototype, "animTime", undefined);
  __decorate([_property({
    type: Number,
    displayName: "开始数值"
  })], _ctor.prototype, "startNum", undefined);
  __decorate([_property({
    type: Number,
    displayName: "结束数值"
  })], _ctor.prototype, "endNum", undefined);
  __decorate([_property({
    displayName: "根据key设置开始数值"
  })], _ctor.prototype, "startkey", undefined);
  __decorate([_property({
    displayName: "根据key设置结束数值"
  })], _ctor.prototype, "endkey", undefined);
  return _ref__ctor = __decorate([_ccclass("LabelAddAnim")], _ctor);
}(r_ActionBase.ActionBase);
exports.LabelAddAnim = exp_LabelAddAnim;