var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankAreaUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_RankSystem = require("RankSystem");
var r_RankDonateUI = require("RankDonateUI");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_RankRewardUI = require("RankRewardUI");
var r_ResSystem = require("ResSystem");
var r_RankTipUI = require("RankTipUI");
var r_ReportSystem = require("ReportSystem");
var exp_RankAreaUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Res.UI.RankAreaUI) || this;
    t.isRequest = false;
    t.m_index = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RankAreaUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RankAreaUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnGet.onClick(this.onClickGet, this);
    this.btnGet.startX = this.btnGet.x;
    this.btnDonate = this.contentPane.getChild("btnDonate").asButton;
    this.btnDonate.onClick(this.onClickDonate, this);
    this.btnDonate.startX = this.btnDonate.x;
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list2 = this.contentPane.getChild("list2").asList;
    this.list2.setVirtual();
    this.list2.itemRenderer = this.onListRendererPC.bind(this);
    for (var t = 1; t <= 2; t++) {
      var o = this.contentPane.getChild("tab" + t);
      this.registTouchTap(o, t - 1);
    }
  };
  _ctor.prototype.registTouchTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      if (o.contentPane.getController("mode").selectedIndex != t) {
        o.contentPane.getController("mode").selectedIndex = t;
        0 == t && o.refreshBtn();
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.contentPane.getController("mode").selectedIndex = 0;
    this.list.visible = false;
    this.btnGet.visible = false;
    this.btnDonate.visible = false;
    this.isRequest = true;
    r_RankSystem.RankSystem.getAreaRank(function () {
      o.isRequest = false;
      if (_ctor.Inst) {
        o.refreshBtn();
        o.list.visible = true;
        o.list.numItems = r_RankSystem.RankSystem.rankList.length;
      }
    });
    r_RankSystem.RankSystem.getDonateRankList(function () {
      o.list2.numItems = r_RankSystem.RankSystem.donateRankList.length;
      cc.sys.localStorage.setItem(r_RankSystem.RankSystem.nameMapKey, JSON.stringify(r_RankSystem.RankSystem.nameMap));
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    cc.Tween.stopAll();
    r_TimeSystem.TimeSystem.scheduleClear("RankAreaUI" + this.m_index);
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshBtn = function () {
    if (r_RankSystem.RankSystem.canGetAreaReward()) {
      this.btnGet.visible = true;
      this.btnDonate.visible = true;
      this.btnGet.x = this.btnGet.startX;
      this.btnDonate.x = this.btnDonate.startX;
    } else {
      this.btnGet.visible = false;
      this.btnDonate.visible = true;
      this.btnDonate.x = (this.btnGet.startX + this.btnDonate.startX) / 2;
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = r_RankSystem.RankSystem.rankList[e];
    if (e <= 2) {
      t.getController("mode").selectedIndex = e + 1;
    } else {
      t.getController("mode").selectedIndex = 0;
      t.getChild("rank").text = e + 1;
    }
    t.getChild("name").text = r_RankSystem.RankSystem.showNameList[o.provinceid - 1];
    t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(o.source);
    0 == e && (t.rank1 || r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/rank/rank1", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      i.active = true;
      t.getChild("n21").node.addChild(i);
      t.rank1 = i;
      i.y = 6;
    }));
  };
  _ctor.prototype.onListRendererPC = function (e, t) {
    var o = r_RankSystem.RankSystem.donateRankList[e];
    if (e <= 2) {
      t.getController("mode").selectedIndex = e + 1;
    } else {
      t.getController("mode").selectedIndex = 0;
      t.getChild("rank").text = e + 1;
    }
    if (o.nname && "" != o.nname) {
      t.getChild("name").text = o.nname;
    } else if (r_RankSystem.RankSystem.nameMap[o.uid]) {
      t.getChild("name").text = r_RankSystem.RankSystem.nameMap[o.uid];
    } else {
      var i = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_RankSystem.RankSystem.randomName);
      t.getChild("name").text = i;
      r_RankSystem.RankSystem.nameMap[o.uid] = i;
    }
    t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(o.score);
    if (o.aUrl && "" != o.aUrl) {
      t.getChild("icon").url = o.aUrl;
    } else if (r_RankSystem.RankSystem.nameMap["icon_" + o.uid]) {
      r_ResSystem.ResSystem.loadHeadImg(t.getChild("icon"), r_RankSystem.RankSystem.nameMap["icon_" + o.uid]);
    } else {
      var n = r_UtilsSystem.UtilsSystem.getRandomNum(1, 8);
      r_ResSystem.ResSystem.loadHeadImg(t.getChild("icon"), n);
      r_RankSystem.RankSystem.nameMap["icon_" + o.uid] = n;
    }
    t.getChild("btnMo").visible = false;
    t.clearClick();
    if (0 == e) {
      t.rank1 || r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/rank/rank1", cc.Prefab, function (e, o) {
        var i = cc.instantiate(o);
        i.active = true;
        t.getChild("n21").node.addChild(i);
        t.rank1 = i;
        i.y = 6;
      });
      t.kuang || r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/rank/kuang", cc.Prefab, function (e, o) {
        var i = cc.instantiate(o);
        i.active = true;
        t.getChild("kuang").node.addChild(i);
        i.getComponent(sp.Skeleton).setAnimation(0, "2", true);
        t.kuang = i;
      });
    }
    if (e <= 2 && r_RankSystem.RankSystem.canGetDonateReward(e + 1)) {
      t.getChild("btnMo").visible = true;
      this.breathAnim(t.getChild("btnMo").node, e);
      t.onClick(function () {
        t.getChild("btnMo").visible = false;
        t.clearClick();
        r_PlayerData.PlayerData.data.rewardTimeMap["donateRank_" + (e + 1)] = r_TimeSystem.TimeSystem.getServerTime();
        r_RankTipUI.RankTipUI.showUI({
          rankInfo: o,
          index: e
        });
      }, this);
    } else {
      t.getChild("btnMo").visible = false;
    }
  };
  _ctor.prototype.breathAnim = function (e, o) {
    var i = this;
    cc.Tween.stopAllByTarget(e);
    e.scale = 1;
    this.m_index = o;
    cc.tween(e).to(.5, {
      scale: 1.1
    }).to(.5, {
      scale: 1
    }).start();
    r_TimeSystem.TimeSystem.scheduleOnce("RankAreaUI" + o, 1, function () {
      null != _ctor.Inst && i.breathAnim(e, o);
    });
  };
  _ctor.prototype.onClickGet = function () {
    r_PlayerData.PlayerData.data.rankRewardTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.addCoin("区域排行榜", 2e6, r_ReportSystem.SystemKey.None);
    this.refreshBtn();
    r_RankRewardUI.RankRewardUI.showUI();
  };
  _ctor.prototype.onClickDonate = function () {
    r_RankDonateUI.RankDonateUI.showUI();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.RankAreaUI = exp_RankAreaUI;