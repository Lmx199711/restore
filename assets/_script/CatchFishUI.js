var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatchFishUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_FguiResSystem = require("FguiResSystem");
var exp_CatchFishUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CatchFish, r_UIDef.UIDef.Res.UI.CatchFishUI) || this;
    t.uiType = "fullScreen";
    t.clickTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CatchFishUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CatchFishUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/catchFish", cc.Prefab, function (e, t) {
      return __awaiter(o, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (t) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, t);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(t);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.CatchFish = this.prefab.getComponent("CatchFish");
                return [4, this.CatchFish.loadPreload()];
              } else {
                return [3, 2];
              }
            case 1:
              e.sent();
              e.label = 2;
            case 2:
              return [2];
          }
        });
      });
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    this.CatchFish.leaveLevel();
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickShowLimitUI = function () {
    var e = new Date().getTime();
    if (e - this.clickTime < 500) {
      return true;
    }
    this.clickTime = e;
  };
  _ctor.prototype.videoLockSuccess = function () {};
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.CatchFishUI = exp_CatchFishUI;