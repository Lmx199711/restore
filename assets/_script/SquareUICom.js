var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SDKMgr1 = require("SDKMgr1");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BottleUI = require("BottleUI");
var r_FruitsUI = require("FruitsUI");
var r_LotteryUI = require("LotteryUI");
var r_MailUI = require("MailUI");
var r_ScrapingCarUI = require("ScrapingCarUI");
var r_StoneNewUI = require("StoneNewUI");
var r_TakeTrashUI = require("TakeTrashUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_SquareUICom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this.node.getChildByName("btnMail");
    e.active = true;
    r_PlatformSystem.PlatformSystem.jjs && "0" == r_PlatformSystem.PlatformSystem.jjs && (e.active = false);
  };
  _ctor.prototype.onLoad = function () {
    if ("0" == r_PlatformSystem.PlatformSystem.jjs) {
      this.node.getChildByName("btnFruits").active = false;
      this.node.getChildByName("btnMail").active = false;
      this.node.getChildByName("btnBottle").active = false;
      this.node.getChildByName("btnGold").active = false;
    }
  };
  _ctor.prototype.onClickLottery = function () {
    if (0 != r_SDKMgr1.SDKMgr1.weixinpingbi) {
      console.log("点击彩票中心");
      r_SoundMgr.SoundMgr.playSound("click");
      r_LotteryUI.LotteryUI.showUI();
      r_PlatformSystem.PlatformSystem.report("Play_click_Level2", {
        stage: "彩票中心"
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("暂未开启");
    }
  };
  _ctor.prototype.onClickGold = function () {
    console.log("点击点石成金");
    r_SoundMgr.SoundMgr.playSound("click");
    r_StoneNewUI.default.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level2", {
      stage: "点石成金"
    });
  };
  _ctor.prototype.onClickMail = function () {
    console.log("点击未开启");
    r_SoundMgr.SoundMgr.playSound("click");
    r_MailUI.MailUI.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level2", {
      stage: "邮票"
    });
  };
  _ctor.prototype.onClickBottle = function () {
    console.log("点击滚瓶子");
    r_SoundMgr.SoundMgr.playSound("click");
    r_BottleUI.default.showUI();
  };
  _ctor.prototype.onClcickFruits = function () {
    console.log("切榴莲");
    r_SoundMgr.SoundMgr.playSound("click");
    r_FruitsUI.FruitsUI.showUI();
  };
  _ctor.prototype.onClickTakeTrash = function () {
    console.log("倒垃圾");
    r_SoundMgr.SoundMgr.playSound("click");
    r_TakeTrashUI.default.showUI();
  };
  _ctor.prototype.onClickScrapCar = function () {
    console.log("专属副驾");
    r_SoundMgr.SoundMgr.playSound("click");
    r_ScrapingCarUI.ScrapingCarUI.showUI();
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SquareUICom;