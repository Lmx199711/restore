var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_GameGuideSystem = require("GameGuideSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_GameGuideCfg = require("GameGuideCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_GameGuideChatUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GameGuide, r_UIDef.UIDef.Res.UI.GameGuideChatUI) || this;
    t.m_step = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GameGuideChatUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GameGuideChatUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnSigna = this.agreeCom.getChild("btnSigna");
    this.btnSigna.onClick(this.onClickSigna, this);
    this.bindBtnCallback(this.btnBubble, this.btnBack, this.btnNext);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("signa");
  };
  _ctor.prototype.restart = function () {
    this.m_step = 0;
    this.agreeCom.getController("mode").selectedIndex = 0;
    this.next();
  };
  _ctor.prototype.onClickbtnBubble = function () {
    var e = this;
    if (!(this.btnBubble.scaleX < 1)) {
      this.btnBubble.scaleX = this.btnBubble.scaleY = 0;
      this.btnBubble.visible = false;
      var t = r_GameGuideCfg.GameGuideChatCfg1[this.m_step - 1];
      t.bubbleSound.length > 0 && r_SoundMgr.SoundMgr.playSound("gameGuide/" + t.bubbleSound);
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnBubble", t.nextWait, function () {
        if (e.m_step >= r_GameGuideCfg.GameGuideChatCfg1.length) {
          e.onClickbtnBack();
        } else {
          e.next();
        }
      });
    }
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    this.test();
    r_GameGuideSystem.GameGuideSystem.init();
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onClickbtnNext = function () {
    this.next();
  };
  _ctor.prototype.onClickSigna = function () {
    this.agreeCom.getController("mode").selectedIndex = 1;
    r_TimeSystem.TimeSystem.scheduleOnce("signa", 1, this.next.bind(this));
    r_SoundMgr.SoundMgr.playSound("gameGuide/info/按手指");
  };
  _ctor.prototype.next = function () {
    var e = this;
    var t = r_GameGuideCfg.GameGuideChatCfg1[this.m_step];
    this.contentPane.getController("c1").selectedIndex = this.m_step;
    this.btnBubble.scaleX = this.btnBubble.scaleY = 0;
    this.btnBubble.visible = true;
    t.soundName.length > 0 && r_SoundMgr.SoundMgr.playSound("gameGuide/" + t.soundName);
    this.labChat.text = t.msg;
    this.labName.text = t.name;
    this.btnBubble.title = t.bubble;
    t.anim1 && r_UtilsSystem.UtilsSystem.playAnim(this.anim1, t.anim1.action, t.anim1.isLoop);
    t.anim2 && r_UtilsSystem.UtilsSystem.playAnim(this.anim2, t.anim2.action, t.anim2.isLoop);
    r_TimeSystem.TimeSystem.scheduleOnce("next", t.soundWait, function () {
      e.contentPane.getTransition("choose").play();
    });
    this.m_step++;
  };
  _ctor.prototype.test = function () {
    r_PlayerData.PlayerData.data.gameGuide = 3;
  };
  __decorate([r_DecorateFunction1.AutoFind("labChat")], _ctor.prototype, "labChat", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBubble")], _ctor.prototype, "btnBubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labName")], _ctor.prototype, "labName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNext")], _ctor.prototype, "btnNext", undefined);
  __decorate([r_DecorateFunction1.AutoFind("agreeCom")], _ctor.prototype, "agreeCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim1")], _ctor.prototype, "anim1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim2")], _ctor.prototype, "anim2", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_GameGuideChatUI;