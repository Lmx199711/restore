var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var exp_AlertUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MainHome, r_UIDef.UIDef.Res.UI.AlertUI) || this;
    t.okFun = null;
    t.target = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AlertUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AlertUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.labDesc = this.contentPane.getChild("labDesc");
    this.btnOk = this.contentPane.getChild("btnOk");
    this.btnNo = this.contentPane.getChild("btnNo");
    this.btnVideo = this.contentPane.getChild("btnVideo");
    this.labTitle = this.contentPane.getChild("labTitle");
    this.btnBlack = this.contentPane.getChild("btnBlack");
    this.btnOk.onClick(this.ClickOk, this);
    this.btnNo.onClick(function () {
      t.data.noFun && t.data.noFun();
      t.hide();
    }, this);
    this.btnVideo.onClick(this.ClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.labDesc.text = this.data.desc;
    this.contentPane.getController("c1").selectedIndex = this.data.type;
    if (this.data.okFun && this.data.target) {
      this.okFun = this.data.okFun;
      this.target = this.data.target;
    }
    this.btnOk.title = this.data.okTxt;
    this.btnNo.title = this.data.noTxt;
    this.labTitle.text = this.data.title;
    this.btnVideo.title = this.data.okTxt;
    this.btnBlack.node.off(cc.Node.EventType.TOUCH_START);
    this.btnBlack.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.okFun = null;
    this.target = null;
  };
  _ctor.prototype.ClickOk = function () {
    if (this.okFun) {
      if (this.target) {
        this.okFun.call(this);
      } else {
        this.okFun();
      }
    }
    this.okFun = null;
    this.target = null;
    this.hide();
  };
  _ctor.prototype.ClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo(this.data.desc, function () {
      e.ClickOk();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.AlertUI = exp_AlertUI;