var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxTipUI = require("RelaxTipUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_NodeTip = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.acFun = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_RelaxTipUI.default.showUI();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.node.children[0].active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_RelaxTipUI.default.showUI();
      });
    }
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_NodeTip;