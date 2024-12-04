var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BlockSystem = require("BlockSystem");
var r_ChangeSystem = require("ChangeSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TaskSystem = require("TaskSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TaskCfg = require("TaskCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_TaskUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Task, r_UIDef.UIDef.Res.UI.TaskUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.gifts = [];
    t.m_index = 0;
    t.m_topIndex = 0;
    t.initY = 0;
    t.prop = {
      0: 0,
      1: 2,
      2: 0,
      3: 0,
      4: 1
    };
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TaskUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TaskUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.listTap.itemRenderer = this.onTapRenderer.bind(this);
    this.listMain.itemRenderer = this.onGrowRenderer.bind(this);
    this.listDay.itemRenderer = this.onDayRenderer.bind(this);
    this.bindBtnCallback(this.btnOpen, this.toggle);
    this.gifts = [];
    this.gifts.push(this.proAll.getChild("gift0"), this.proAll.getChild("gift1"), this.proAll.getChild("gift2"));
    this.gifts.forEach(function (e, o) {
      e.clearClick();
      e.onClick(t.onClickGift.bind(t, o), t);
    });
    this.initY = this.gifts[0].y;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    _ctor.Inst = null;
    cc.Tween.stopAll();
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    r_TaskSystem.TaskSystem.sortMainList();
    if (null != this.data && null != this.data.index) {
      this.m_topIndex = 0;
      this.m_index = this.data.index;
      this.data = null;
    }
    this.setTop(this.m_topIndex);
    this.setTapContent(this.m_index);
    this.setMainList(this.m_index);
    this.setDayList();
    this.setRed();
    this.setProAll();
  };
  _ctor.prototype.onClicktoggle = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    this.setTop(this.m_topIndex ? 0 : 1);
  };
  _ctor.prototype.setTop = function (e) {
    this.m_topIndex = e;
    this.contentPane.getController("mode").selectedIndex = e;
  };
  _ctor.prototype.setRed = function () {
    this.toggle.getChild("mainRed").visible = r_TaskSystem.TaskSystem.checkMainTasksState();
    this.toggle.getChild("dayRed").visible = r_TaskSystem.TaskSystem.checkDayTasksState();
  };
  _ctor.prototype.onTapRenderer = function (e, t) {
    var o = this;
    var i = r_TaskSystem.TaskSystem.getTapList()[e];
    t.getChild("labName").text = i.name;
    t.getChild("labTitle").text = i.title;
    t.getChild("imgLock").visible = !r_TaskSystem.TaskSystem.getTapIsLock(e);
    t.getChild("labDay").text = r_TaskSystem.TaskSystem.getTapIsLock(e) ? "" : "第" + i.day + "天解锁";
    if (e == this.m_index) {
      t.getController("c1").selectedIndex = 1;
    } else {
      t.getController("c1").selectedIndex = 0;
    }
    r_TaskSystem.TaskSystem.getTapIsOpen(e) || (t.getController("c1").selectedIndex = 2);
    t.clearClick();
    t.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      if (r_TaskSystem.TaskSystem.getTapIsOpen(e)) {
        if (r_TaskSystem.TaskSystem.getTapIsLock(e)) {
          o.setTapContent(e);
          o.setMainList(e);
        } else {
          r_UtilsSystem.UtilsSystem.showTip("第" + i.day + "天开启");
        }
      } else {
        r_UtilsSystem.UtilsSystem.showTip("敬请期待");
      }
    }, this);
  };
  _ctor.prototype.onGrowRenderer = function (e, t) {
    var o = this;
    if (e == r_TaskSystem.TaskSystem.getMainList(this.m_index).length) {
      t.getController("mode").selectedIndex = 3;
      t.getChild("labTitle").text = r_TaskSystem.TaskSystem.getTapList()[this.m_index].title + "：" + r_TaskSystem.TaskSystem.getTapList()[this.m_index].name;
      t.getChild("btnHuigu").clearClick();
      return void t.getChild("btnHuigu").onClick(function () {
        o.contentPane.getController("mainType").selectedIndex = 0;
      }, this);
    }
    var i = r_TaskSystem.TaskSystem.getMainData(this.m_index)[e];
    var n = r_TaskSystem.TaskSystem.getMainCfg(this.m_index, i.id);
    t.getChild("labDesc").text = n.desc;
    t.getChild("labCoin").text = r_UtilsSystem.UtilsSystem.numFormats(n.award[0]);
    t.getChild("labExp").text = r_UtilsSystem.UtilsSystem.numFormats(n.award[1] / 20);
    var a = Math.min(r_TaskSystem.TaskSystem.getMainTaskValue(n.type), n.maxNum);
    var s = (a - n.minNum) / (n.maxNum - n.minNum) || 0;
    t.getChild("pro").value = 100 * s;
    t.getChild("pro").getChild("lab").text = a - n.minNum + "/" + (n.maxNum - n.minNum);
    t.getController("mode").selectedIndex = this.prop[r_TaskSystem.TaskSystem.getMainItemState(this.m_index, i.id)];
    t.getChild("btnGo").clearClick();
    t.getChild("btnGo").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      if (n.type == r_TaskCfg.TaskMainType.付清彩礼 && r_PlayerData.PlayerData.data.newGuideType < 1) {
        r_UtilsSystem.UtilsSystem.showTip("请先打败老马");
      } else if (n.type == r_TaskCfg.TaskMainType.完成结婚 && r_PlayerData.PlayerData.data.newGuideType < 2) {
        r_UtilsSystem.UtilsSystem.showTip("请完成先前剧情");
      } else {
        o.hide();
        r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.彩票) && 4 == n.id || r_ChangeSystem.ChangeSystem.setChangeWin(n.change);
      }
    }, this);
    t.getChild("btnGet").clearClick();
    t.getChild("btnGet").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_TaskSystem.TaskSystem.getMainTaskAward(o.m_index, i.id);
      o.restart();
      r_PlatformSystem.PlatformSystem.report("Task", {
        id: i.id
      });
    }, this);
  };
  _ctor.prototype.onDayRenderer = function (e, t) {
    var o = this;
    var i = r_TaskSystem.TaskSystem.getDayList()[e];
    var n = r_TaskSystem.TaskSystem.getDayInfo(i.id);
    t.getChild("labDesc").text = n.desc;
    t.getChild("labExp").text = "奖励：活跃度X" + n.award;
    var a = Math.min(i.value, n.maxNum);
    var s = a / n.maxNum;
    t.getChild("pro").value = 100 * s;
    t.getChild("pro").getChild("lab").text = a + "/" + n.maxNum;
    t.getController("mode").selectedIndex = this.prop[r_TaskSystem.TaskSystem.getDayItemState(n.id)];
    t.getChild("btnGo").clearClick();
    t.getChild("btnGo").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      o.hide();
      r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.彩票) && 9 == n.id || r_ChangeSystem.ChangeSystem.setChangeWin(n.change);
    }, this);
    t.getChild("btnGet").clearClick();
    t.getChild("btnGet").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_TaskSystem.TaskSystem.getDayTaskAward(i.id);
      o.restart();
    }, this);
  };
  _ctor.prototype.setTapContent = function (e) {
    this.m_index = e;
    this.listTap.numItems = r_TaskSystem.TaskSystem.getTapList().length;
    this.contentPane.getController("mainType").selectedIndex = r_TaskSystem.TaskSystem.getMainLock(e) ? 1 : 0;
    var t = r_TaskSystem.TaskSystem.getTapList()[e];
    this.labTitle.text = t.title;
    this.labName.text = t.name;
    this.labDesc.text = t.desc;
  };
  _ctor.prototype.setMainList = function (e) {
    this.m_index = e;
    this.listMain.numItems = r_TaskSystem.TaskSystem.getMainList(e).length + 1;
  };
  _ctor.prototype.setDayList = function () {
    this.listDay.numItems = r_TaskSystem.TaskSystem.getDayList().length;
  };
  _ctor.prototype.onClickbtnOpen = function () {
    r_TaskSystem.TaskSystem.unlockTop(this.m_index);
    this.contentPane.getController("mainType").selectedIndex = 1;
  };
  _ctor.prototype.setProAll = function () {
    var e = this;
    var t = Math.min(r_TaskSystem.TaskSystem.getDayTaskAllExp(), r_TaskCfg.DayMaxExp);
    this.proAll.value = t / r_TaskCfg.DayMaxExp * 100;
    this.proAll.getChild("labValue").text = t;
    r_TaskSystem.TaskSystem.getDayAwardList().forEach(function (o, i) {
      e.gifts[i].url = o ? "ui://Task/kgift_" + i : "ui://Task/gift_" + i;
      e.gifts[i].angle = 0;
      e.gifts[i].y = e.initY;
      var n = e.initY;
      cc.Tween.stopAllByTarget(e.gifts[i]);
      if (!o && t >= 50 * (i + 1)) {
        var a = cc.tween().to(.2, {
          rotation: 2,
          y: n - 20
        }).to(.2, {
          rotation: -2,
          y: n
        });
        cc.tween(e.gifts[i]).then(a).repeatForever().start();
      }
    });
  };
  _ctor.prototype.onClickGift = function (e) {
    var t = 50 * (e + 1);
    if (!(r_TaskSystem.TaskSystem.getDayTaskAllExp() < t || r_TaskSystem.TaskSystem.getDayAwardList()[e])) {
      r_TaskSystem.TaskSystem.getDayAward(e);
      r_PlayerData.PlayerData.addCoin("领取每日奖励", r_TaskCfg.DayAwards[e], r_ReportSystem.SystemKey.任务系统);
      this.restart();
    }
  };
  _ctor.taskComId = 0;
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("listTap")], _ctor.prototype, "listTap", undefined);
  __decorate([r_DecorateFunction1.AutoFind("listMain")], _ctor.prototype, "listMain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("listDay")], _ctor.prototype, "listDay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("toggle")], _ctor.prototype, "toggle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labName")], _ctor.prototype, "labName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTitle")], _ctor.prototype, "labTitle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labDesc")], _ctor.prototype, "labDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("proAll")], _ctor.prototype, "proAll", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TaskUI;