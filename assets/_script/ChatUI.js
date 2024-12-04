var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_ChatSystem = require("ChatSystem");
var r_ChatDetailUI = require("ChatDetailUI");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_PhoneUI = require("PhoneUI");
var r_GuideSystem = require("GuideSystem");
var r_TimeSystem = require("TimeSystem");
var r_HomeworkTip2UI = require("HomeworkTip2UI");
var r_ResSystem = require("ResSystem");
var exp_ChatUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Chat, r_UIDef.UIDef.Res.UI.ChatUI) || this;
    t.chatList = [];
    t.m_isVideo = false;
    t.chatHomeworkList = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008];
    t.m_index = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ChatUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChatUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    this.btnTip.onClick(this.onClickbtnTip, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    if (this.data && "homework" == this.data.task) {
      this.m_isVideo = true;
      return void this.restartHomeWork();
    }
    this.btnTip.visible = false;
    this.refreshList();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_PhoneUI.PhoneUI.Inst && r_PhoneUI.PhoneUI.Inst.refreshRedTips();
    r_GuideSystem.GuideSystem.onChatUIHide();
    r_TimeSystem.TimeSystem.scheduleClear("restartHomeWork");
  };
  _ctor.prototype.restartHomeWork = function () {
    var e = this;
    this.btnTip.visible = true;
    this.btnTip.getController("mode").selectedIndex = this.m_isVideo ? 0 : 1;
    this.m_index = 0;
    this.chatList = this.chatHomeworkList;
    var t = function () {
      if (e.m_index <= e.chatList.length) {
        e.list.numItems = e.m_index;
        e.m_index++;
        r_TimeSystem.TimeSystem.scheduleOnce("restartHomeWork", .15, t);
      }
    };
    t();
  };
  _ctor.prototype.refreshList = function () {
    this.chatList = [];
    var e = {};
    console.log("PlayerData.data.curChatTaskList:", r_PlayerData.PlayerData.data.curChatTaskList);
    for (var t = r_PlayerData.PlayerData.data.curChatTaskList.length - 1; t >= 0; t--) {
      var o = r_PlayerData.PlayerData.data.curChatTaskList[t];
      if (!(r_ChatSystem.ChatSystem.isOneTimeTask(o) || r_ChatSystem.ChatSystem.isNotShowTask(o))) {
        r_PlatformSystem.PlatformSystem.jjs && r_PlatformSystem.PlatformSystem.jjs;
        e[(i = r_ChatSystem.ChatSystem.getChatTaskById(o)).personId] = true;
        this.chatList.push(o);
      }
    }
    for (t = r_PlayerData.PlayerData.data.finishChatTaskList.length - 1; t >= 0; t--) {
      var i;
      o = r_PlayerData.PlayerData.data.finishChatTaskList[t];
      if (!(r_ChatSystem.ChatSystem.isOneTimeTask(o) || r_ChatSystem.ChatSystem.isNotShowTask(o))) {
        r_PlatformSystem.PlatformSystem.jjs && r_PlatformSystem.PlatformSystem.jjs;
        if (!e[(i = r_ChatSystem.ChatSystem.getChatTaskById(o)).personId]) {
          e[i.personId] = true;
          this.chatList.push(o);
        }
      }
    }
    this.list.numItems = this.chatList.length;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.chatList[e];
    var i = r_ChatSystem.ChatSystem.getChatTaskById(o);
    t.getChild("name").text = i.name;
    t.getChild("content").text = i.taskList[0].chatList[0].content;
    t.getChild("icon").visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/" + i.icon, cc.SpriteFrame, function (e, o) {
      t.getChild("icon").texture = o;
      t.getChild("icon").visible = true;
    });
    if (r_ChatSystem.ChatSystem.isTaskFinish(o)) {
      t.getChild("redTip").visible = false;
    } else {
      t.getChild("redTip").visible = true;
    }
    t.clearClick();
    t.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_ChatDetailUI.ChatDetailUI.showUI({
        taskId: o
      });
    }, this);
    if (this.data && "homework" == this.data.task && e == this.m_index - 1) {
      t.getTransition("t0").play();
      r_SoundMgr.SoundMgr.playSound("homework/提示音");
    }
  };
  _ctor.prototype.onClickbtnTip = function () {
    var e = this;
    if (this.m_isVideo) {
      r_PlatformSystem.PlatformSystem.showVideo("寒假作业提示", function () {
        r_HomeworkTip2UI.default.showUI();
        e.m_isVideo = false;
        e.btnTip.getController("mode").selectedIndex = e.m_isVideo ? 0 : 1;
      });
    } else {
      r_HomeworkTip2UI.default.showUI();
    }
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChatUI = exp_ChatUI;