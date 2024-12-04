var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatingSelectPanel = undefined;
var r_DatingUI = require("DatingUI");
var exp_DatingSelectPanel = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    var e = this;
    this.btn1 = this.getChild("btn1").asButton;
    this.btn1.onClick(this.onTouchBtn.bind(this, 1), this);
    this.btn2 = this.getChild("btn2").asButton;
    this.btn2.onClick(this.onTouchBtn.bind(this, 2), this);
    this.btn3 = this.getChild("btn3").asButton;
    this.btn3.onClick(this.onTouchBtn.bind(this, 3), this);
    this.getController("mode").onChanged(function () {
      e.btn2.enabled = true;
      e.btn1.enabled = true;
      e.btn3.enabled = true;
    });
  };
  _ctor.prototype.restart = function () {
    this.btn2.enabled = true;
    this.btn1.enabled = true;
    this.btn3.enabled = true;
  };
  _ctor.prototype.onTouchBtn = function (e) {
    this.btn2.enabled = false;
    this.btn1.enabled = false;
    this.btn3.enabled = false;
    var t = this.getController("mode").selectedIndex;
    switch (t) {
      case 0:
        r_DatingUI.default.Inst.setFlow(e);
        break;
      case 1:
        r_DatingUI.default.Inst.setFlow(e + 3);
        break;
      case 2:
        r_DatingUI.default.Inst.setFlow(e + 6);
    }
    if (2 == e || 0 == t && 3 == e) {
      r_DatingUI.default.Inst.addPro();
    } else {
      r_DatingUI.default.Inst.subPro();
    }
  };
  return _ctor;
}(fgui.GComponent);
exports.DatingSelectPanel = exp_DatingSelectPanel;