var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawAndGuessTip = undefined;
var r_UIDef = require("UIDef");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var exp_DrawAndGuessTip = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.DrawAndGuessTip) || this;
    t.showAnimFlag = true;
    t.isGet = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DrawAndGuessTip, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DrawAndGuessTip);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOk.onClick(this.onClickClose, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    r_ResSystem.ResSystem.loadBundleRes("game5", "drawAndGuess/drawAtlas", cc.SpriteAtlas, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function () {
          o && (this.pic.texture = o.getSpriteFrame("pic" + (2 * (this.data.curQuest - 1) + 1 + this.data.curSelect)));
          return [2];
        });
      });
    });
    this.labDesc.text = "答案：" + this.data.anser;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labDesc")], _ctor.prototype, "labDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pic")], _ctor.prototype, "pic", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.DrawAndGuessTip = exp_DrawAndGuessTip;