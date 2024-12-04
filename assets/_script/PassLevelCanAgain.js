var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_PassLevelCanAgain = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isShowAgain = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  __decorate([_property({
    displayName: "过关界面是否显示重来"
  })], _ctor.prototype, "isShowAgain", undefined);
  return __decorate([_ccclass("PassLevelCanAgain")], _ctor);
}(cc.Component);
exports.default = def_PassLevelCanAgain;