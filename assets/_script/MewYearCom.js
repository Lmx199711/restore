var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RelaxSystem = require("RelaxSystem");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BattleDebugUI = require("BattleDebugUI");
var r_TextTipUI = require("TextTipUI");
var r_MiniGamingUI = require("MiniGamingUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_MewYearCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.clearCom = null;
    t.moneyLab = null;
    t.content = "1.拖动两次福字到门上,然后再次点击福字后旋转\n2.拖动花字到两边窗户上\n3.拖动花到右上树枝上\n4.拖动花到天空上\n5.拖动雨到天空上后,再拖动山到雨字下方组合后,点击山字旋转\n6.分别拖动两次火和丁字到屋檐下组成灯字\n7.分别拖动耳和关字到门框左右,组成联字\n8.拖动火字到包字身上,组成炮字\n9.上序操作都完成后拖动龙到门上,出现龙门\n10.拖动水里的鲤鱼到龙门上\n11.点击龙口中的对联后出现红包,最后点击龙手上的红包";
    t.moneyNum = 0;
    t.isCleanSuccess = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playMusic("newYear/新年bgm");
    this.moneyNum = r_UtilsSystem.UtilsSystem.getRandomNum(100, 3e6);
    this.clearCom.cleanAllSuccessCallBack = function () {
      e.isCleanSuccess = true;
    };
    this.showMoneyLab();
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (r_RelaxSystem.RelaxSystem.checkTip()) {
      r_TextTipUI.TextTipUI.showUI(this.content);
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解压提示", function () {
        e.node.getChildByName("nodeTip").children[0].active = false;
        r_RelaxSystem.RelaxSystem.addTip();
        r_TextTipUI.TextTipUI.showUI(e.content);
      });
    }
  };
  _ctor.prototype.showMoneyLab = function () {
    this.moneyLab.string = r_UtilsSystem.UtilsSystem.getShowCoin(this.moneyNum);
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.tool = function () {
    r_PlatformSystem.PlatformSystem.getIsWebPlatform() && r_BattleDebugUI.default.showUI({
      ui: this
    });
  };
  _ctor.prototype.setDebugNum = function (e, t) {
    var o = this;
    this.moneyNum = e;
    if (1 == t) {
      this.moneyNum = 1e4 * this.moneyNum;
    } else {
      2 == t && (this.moneyNum = 1e8 * this.moneyNum);
    }
    this.isCleanSuccess = false;
    this.moneyLab.node.active = false;
    this.showMoneyLab();
    this.clearCom.startClean();
    cc.Tween.stopAllByTarget(this.moneyLab.node);
    cc.tween(this.moneyLab.node).delay(.2).call(function () {
      o.moneyLab.node.active = true;
    }).start();
  };
  _ctor.prototype.ok = function () {
    if (this.isCleanSuccess) {
      r_PlayerData.PlayerData.addCoin("过年啦红包", this.moneyNum, r_ReportSystem.SystemKey.小游戏);
      r_MiniGamingUI.MiniGamingUI.hide();
      r_SoundMgr.SoundMgr.playMusic("bgm");
    }
  };
  _ctor.prototype.again = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("过年啦再来一次", function () {
      e.isCleanSuccess = false;
      e.moneyLab.node.active = false;
      e.moneyNum = r_UtilsSystem.UtilsSystem.getRandomNum(100, 3e6);
      e.showMoneyLab();
      e.clearCom.startClean();
      cc.Tween.stopAllByTarget(e.moneyLab.node);
      cc.tween(e.moneyLab.node).delay(.2).call(function () {
        e.moneyLab.node.active = true;
      }).start();
    });
  };
  __decorate([_property({
    type: r_EraseCom.default,
    displayName: "清理组件"
  })], _ctor.prototype, "clearCom", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "压岁钱文本"
  })], _ctor.prototype, "moneyLab", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MewYearCom;