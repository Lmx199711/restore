var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameGuideSystem = require("GameGuideSystem");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_GameGuideTipUI = require("GameGuideTipUI");
var def_StoryBaseUI = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_step = 0;
    t.m_cfg = null;
    t.anim1Index = 0;
    t.anim2Index = 0;
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
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBubble, this.btnBack);
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
    this.next();
  };
  _ctor.prototype.onClickbtnBubble = function () {
    var e = this;
    if (!(this.btnBubble.scaleX < 1)) {
      this.btnBubble.scaleX = this.btnBubble.scaleY = 0;
      this.btnBubble.visible = false;
      var t = r_GroupSystem.GroupSystem.getGameguideStory()[r_PlayerData.PlayerData.data.storyMap.id][this.m_step - 1];
      t.bubbleSound.length > 0 && r_SoundMgr.SoundMgr.playSound("gameGuide/" + t.bubbleSound);
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnBubble", t.nextWait, function () {
        if (e.m_step >= r_GroupSystem.GroupSystem.getGameguideStory()[r_PlayerData.PlayerData.data.storyMap.id].length) {
          e.onClickbtnBack();
        } else {
          e.next();
        }
      });
    }
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    r_PlayerData.PlayerData.data.gameGuideCountDown[r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id].id] = r_TimeSystem.TimeSystem.getServerTime() + r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id].time;
    r_GameGuideTipUI.default.showUI({
      needGuide: true,
      id: r_GameGuideSystem.GameGuideSystem.tip[r_PlayerData.PlayerData.data.storyMap.id].id
    });
    r_PlayerData.PlayerData.data.storyMap.isShow = true;
    r_GameGuideSystem.GameGuideSystem.init();
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onClickSigna = function () {
    r_TimeSystem.TimeSystem.scheduleOnce("signa", 1, this.next.bind(this));
  };
  _ctor.prototype.next = function () {
    var e = this;
    this.contentPane.getController("c1").selectedIndex = this.m_step;
    var t = r_GroupSystem.GroupSystem.getGameguideStory()[r_PlayerData.PlayerData.data.storyMap.id][this.m_step];
    this.btnBubble.scaleX = this.btnBubble.scaleY = 0;
    this.btnBubble.visible = true;
    t.soundName.length > 0 && r_SoundMgr.SoundMgr.playSound("gameGuide/" + t.soundName);
    r_TimeSystem.TimeSystem.scheduleOnce("next", t.soundWait, function () {
      e.contentPane.getTransition("choose").play();
    });
    this.labChat.text = t.msg;
    this.labName.text = t.name;
    this.btnBubble.title = t.bubble;
    t.anim1 && t.anim1.length > 0 && this.setAnim(1, this.anim1, t.anim1);
    t.anim2 && t.anim1.length > 0 && this.setAnim(2, this.anim2, t.anim2);
    this.m_step++;
  };
  _ctor.prototype.setAnim = function (e, t, o) {
    var i = this;
    var n = o[this["anim" + e + "Index"]];
    if (n) {
      r_UtilsSystem.UtilsSystem.playAnim(t, n.action, n.isLoop);
      n.time && r_TimeSystem.TimeSystem.scheduleOnce("setAnim", n.time, function () {
        i["anim" + e + "Index"]++;
        i.setAnim(e, t, o);
      });
    } else {
      this["anim" + e + "Index"] = 0;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("labChat")], _ctor.prototype, "labChat", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBubble")], _ctor.prototype, "btnBubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim1")], _ctor.prototype, "anim1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim2")], _ctor.prototype, "anim2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labName")], _ctor.prototype, "labName", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_StoryBaseUI;