var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_RelaxSystem = require("RelaxSystem");
var def_RelaxTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.City85, r_UIDef.UIDef.Res.UI.RelaxTipUI) || this;
    t.showAnimFlag = true;
    t.tipImgs = [];
    t.tipNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RelaxTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.City85UI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.img = this.contentPane.getChild("img").asLoader;
    this.contentPane.getChild("btnBlack").onClick(this.hide, this);
    this.contentPane.getChild("labBack").onClick(this.hide, this);
    this.btnLift = this.contentPane.getChild("btnL");
    this.btnLift.onClick(this.btnL, this);
    this.btnRight = this.contentPane.getChild("btnR");
    this.btnRight.onClick(this.btnR, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.tipImgs = [];
    var t = r_RelaxSystem.RelaxSystem.lastLevelId;
    var o = 0;
    var i = 0;
    for (var n = Object.entries(r_RelaxSystem.RelaxSystem.tipNums); i < n.length; i++) {
      var a = n[i];
      var s = a[0];
      var c = a[1];
      s == t && (o = c);
    }
    if (o > 0) {
      for (var l = 0; l <= o; l++) {
        var u = "ui/City85/tip/tip" + t + "_" + l;
        this.tipImgs.push(u);
      }
      this.contentPane.getController("c1").selectedIndex = 1;
      this.tipNum = 0;
      this.img.url = "ui/City85/tip/tip" + t + "_" + this.tipNum;
      this.btnLift.visible = false;
      this.btnRight.visible = true;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
      this.img.url = "ui/City85/tip/tip" + t;
    }
  };
  _ctor.prototype.btnL = function () {
    this.btnRight.visible || (this.btnRight.visible = true);
    if (this.tipNum > 0) {
      this.tipNum--;
      0 == this.tipNum && (this.btnLift.visible = false);
    }
    this.img.url = this.tipImgs[this.tipNum];
  };
  _ctor.prototype.btnR = function () {
    this.btnLift.visible || (this.btnLift.visible = true);
    if (this.tipNum < this.tipImgs.length - 1) {
      this.tipNum++;
      this.tipNum == this.tipImgs.length - 1 && (this.btnRight.visible = false);
      this.img.url = this.tipImgs[this.tipNum];
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_RelaxTipUI;