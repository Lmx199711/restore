Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSelfSystem = undefined;
var r_Tb = require("Tb");
var r_SoundMgr = require("SoundMgr");
var r_AdPushSystem = require("AdPushSystem");
var r_AnimSystem = require("AnimSystem");
var r_BagSystem = require("BagSystem");
var r_BillSystem = require("BillSystem");
var r_BusinessSystem = require("BusinessSystem");
var r_ChatSystem = require("ChatSystem");
var r_CoinSystem = require("CoinSystem");
var r_DaySystem = require("DaySystem");
var r_DebugSystem = require("DebugSystem");
var r_DrawCardSystem = require("DrawCardSystem");
var r_EmgcSystem = require("EmgcSystem");
var r_MailSystem = require("MailSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayGameLimitSystem = require("PlayGameLimitSystem");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_PopSystem = require("PopSystem");
var r_RelaxSystem = require("RelaxSystem");
var r_SecretSystem = require("SecretSystem");
var r_StoneSystem = require("StoneSystem");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var k = function () {
  function e() {}
  e.prototype.initFrist = function () {
    fgui.UIConfig.buttonSound = "ui://MainHome/click";
    r_Tb.Tb.Init();
    r_PlatformSystem.PlatformSystem.init();
    r_AdPushSystem.AdPushSystem.init();
    r_BillSystem.BillSystem.init();
    r_PlayerData.PlayerData.init();
  };
  e.prototype.init = function () {
    r_BusinessSystem.BusinessSystem.checkInit();
    r_CoinSystem.CoinSystem.init();
    r_DrawCardSystem.DrawCardSystem.init();
    r_PhoneSystem.PhoneSystem.init();
    r_StoneSystem.StoneSystem.init();
    r_ChatSystem.ChatSystem.init();
    r_DebugSystem.DebugSystem.init();
    r_AnimSystem.AnimSystem.init();
    r_MailSystem.MailSystem.init();
    r_EmgcSystem.EmgcSystem.init();
    r_PopSystem.PopSystem.init();
    r_SecretSystem.SecretSystem.init();
    r_BagSystem.BagSystem.init();
    r_PlayGameLimitSystem.PlayGameLimitSystem.init();
    r_RelaxSystem.RelaxSystem.init();
    this.initUI();
    r_WeaponSystem.WeaponSystem.init();
    r_PoolSystem.PoolSystem.initMain();
    r_DaySystem.DaySystem.refresh();
    r_SoundMgr.SoundMgr.musicVolume = 1;
    r_TimeSystem.TimeSystem.registUpdate("GameSystemUpdate", this.update.bind(this));
    r_DaySystem.DaySystem.reportLastDayAndCoin();
    r_DaySystem.DaySystem.reportLastDayAndDiamond();
    r_PlatformSystem.PlatformSystem.checkInWhiteList();
  };
  e.prototype.initUI = function () {
    this.uiHideRoot = new fgui.GComponent();
    fgui.GRoot.inst.addChild(this.uiHideRoot);
    this.uiHideRoot.active = false;
    this.uiHideRoot.visible = false;
    this.uiTopRoot = new fgui.GComponent();
    this.uiTopRoot.node.zIndex = this.uiTopRoot.sortingOrder = 99;
    fgui.GRoot.inst.addChild(this.uiTopRoot);
    var e = cc.director.getScene();
    this.blockTouchBg = e.getChildByName("blockTouchBg");
    this.blockTouchBg.active = false;
    this.blockTouchBg.zIndex = 9999;
    this.blockTouchBg.on(cc.Node.EventType.TOUCH_START, function () {
      console.log("屏蔽所有点击事件");
    });
    this.effectsBg = e.getChildByName("effectsBg");
    this.effectsBg.active = true;
    this.effectsBg.zIndex = 1e4;
    e.getChildByName("loading").zIndex = 10001;
  };
  e.prototype.update = function () {};
  return e;
}();
exports.GameSelfSystem = new k();