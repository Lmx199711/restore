var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FundUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var exp_FundUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.FundUI) || this;
    t.graphic = null;
    t.speed = 50;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FundUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FundUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnSell").asButton.onClick(this.onClickSell, this);
    this.contentPane.getChild("btnBuy").asButton.onClick(this.onClickBuy, this);
    var t = new cc.Node("drawNode");
    this.graphic = t.addComponent(cc.Graphics);
    this.graphic.strokeColor = cc.Color.RED;
    this.graphic.lineWidth = 10;
    this.contentPane.node.addChild(t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.graphic.clear();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistUpdate(this);
  };
  _ctor.prototype.onClickSell = function () {};
  _ctor.prototype.onClickBuy = function () {
    var e = this;
    var t = [];
    for (var o = 1; o <= 3; o++) {
      t.push(this.contentPane.getChild("p" + o).node);
    }
    var i = t[0];
    this.graphic.moveTo(i.x, i.y);
    var n = t[1];
    var a = 1;
    var s = i.x;
    r_TimeSystem.TimeSystem.registUpdate(this, function (o) {
      if ((s += o * e.speed) >= n.x) {
        e.graphic.lineTo(n.x, n.y);
        e.graphic.stroke();
        if (t[a += 1]) {
          e.graphic.moveTo(n.x, n.y);
          i = n;
          n = t[a];
        } else {
          r_TimeSystem.TimeSystem.unregistUpdate(e);
        }
      } else {
        e.graphic.lineTo(s, i.y + (s - i.x) / (n.x - i.x) * (n.y - i.y));
        e.graphic.stroke();
      }
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.FundUI = exp_FundUI;