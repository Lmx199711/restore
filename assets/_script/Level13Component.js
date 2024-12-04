var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxTipUI = require("RelaxTipUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_Level13Component = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.removeDistance = 50;
    t.putDistance = 100;
    t.tipMap = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      this.node.getChildByName("nodeTip").children[0].active = false;
    } else {
      this.node.getChildByName("nodeTip").children[0].active = true;
    }
  };
  _ctor.prototype.close = function () {
    r_RelaxSystem.RelaxSystem.clearLevel();
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_RelaxTipUI.default.showUI();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.node.getChildByName("nodeTip").children[0].active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_RelaxTipUI.default.showUI();
      });
    }
  };
  __decorate([_property({
    type: cc.Integer,
    tooltip: "拆除范围"
  })], _ctor.prototype, "removeDistance", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "吸附范围"
  })], _ctor.prototype, "putDistance", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level13Component;