var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenDriftBottleUI = undefined;
var r_UIDef = require("UIDef");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_DriftBottleTipUI = require("DriftBottleTipUI");
var u = [{
  id: 1,
  name: "吐露心扉",
  title: "吐露心扉",
  pr: .25,
  desc: "自从离开乡村后，发现心里的那个人还是放不下，也不敢回乡，我怕他已经膝下承欢，只能将这份念想藏在这瓶中"
}, {
  id: 2,
  name: "重金求子",
  title: "重金求子",
  pr: .25,
  desc: "本人常某，27岁，身材丰满，夫富商，家大业大，奈何丈夫不育，圆我母亲们梦，酬金500万"
}, {
  id: 3,
  name: "策划方案",
  title: "策划的农场设计方案",
  pr: .25,
  desc: "老板不准，那我就偷偷的做"
}, {
  id: 4,
  name: "卖茶女孩",
  title: "卖茶女孩",
  pr: .25,
  desc: "爷爷病了茶叶卖不出去，原价5万块一斤，现在只要500块一斤，若好哥哥能帮卖一点我将以身相许"
}];
var exp_OpenDriftBottleUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.OpenDriftBottleUI) || this;
    t.resuletId = 1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.OpenDriftBottleUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.OpenDriftBottleUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnPutAway.onClick(this.onClickPutAway, this);
    this.btnReport.onClick(this.onClickReport, this);
    this.btnReport1.onClick(this.onClickReport, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.resuletId = 1;
    this.randomResult();
    this.contentPane.getController("c1").selectedIndex = this.resuletId - 1;
    this.lbTitle.text = u[this.resuletId - 1].title;
    this.lbTitle1.text = u[this.resuletId - 1].title;
    this.lbDesc.text = u[this.resuletId - 1].desc;
    this.lbDesc1.text = u[this.resuletId - 1].desc;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.randomResult = function () {
    var e = 0;
    var t = Math.random();
    for (var o = 0; o < u.length; o++) {
      if (t < (e += u[o].pr)) {
        this.resuletId = u[o].id;
        break;
      }
    }
  };
  _ctor.prototype.onClickPutAway = function () {
    var e = this;
    r_DriftBottleTipUI.DriftBottleTipUI.showUI({
      type: 0,
      id: this.resuletId,
      opendCallback: function () {
        e.hide();
      }
    });
  };
  _ctor.prototype.onClickReport = function () {
    var e = this;
    this.hide();
    r_DriftBottleTipUI.DriftBottleTipUI.showUI({
      type: 1,
      id: this.resuletId,
      opendCallback: function () {
        e.hide();
      }
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnPutAway")], _ctor.prototype, "btnPutAway", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnReport")], _ctor.prototype, "btnReport", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnReport1")], _ctor.prototype, "btnReport1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbTitle")], _ctor.prototype, "lbTitle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbTitle1")], _ctor.prototype, "lbTitle1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbDesc")], _ctor.prototype, "lbDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbDesc1")], _ctor.prototype, "lbDesc1", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.OpenDriftBottleUI = exp_OpenDriftBottleUI;