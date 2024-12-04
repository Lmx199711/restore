var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SCClickShowUI = require("SCClickShowUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_SCShowCarCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.animNode = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.showAnim = function (e) {
    this.animNode = this.node.getChildByName(e.animNode);
    this.animNode.active = true;
    this.animNode.getComponent(sp.Skeleton).setAnimation(0, e.idleAnim, true);
  };
  _ctor.prototype.hideAnim = function () {
    this.animNode.active = false;
  };
  _ctor.prototype.clickCom = function () {
    r_SCClickShowUI.SCClickShowUI.showUI();
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SCShowCarCom;