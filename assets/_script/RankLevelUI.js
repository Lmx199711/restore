var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankLevelUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_RankSystem = require("RankSystem");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_RankTipUI = require("RankTipUI");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_PlatformSystem = require("PlatformSystem");
var exp_RankLevelUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Res.UI.RankLevelUI) || this;
    t.mapId = 6;
    t.m_index = 0;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RankLevelUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RankLevelUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_PlatformSystem.PlatformSystem.checkGetUserId();
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnGet.onClick(this.onClickGet, this);
    this.btnGet.startX = this.btnGet.x;
    this.list1 = this.contentPane.getChild("list1").asList;
    this.list1.setVirtual();
    this.list1.itemRenderer = this.onListRenderer1.bind(this);
    this.list2 = this.contentPane.getChild("list2").asList;
    this.list2.setVirtual();
    this.list2.itemRenderer = this.onListRenderer2.bind(this);
    for (var t = 1; t <= 2; t++) {
      var o = this.contentPane.getChild("tab" + t);
      this.registTouchTap(o, t - 1);
    }
  };
  _ctor.prototype.registTouchTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      o.contentPane.getController("mode").selectedIndex != t && o.refreshList(t + 1);
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.refreshList(1);
  };
  _ctor.prototype.refreshList = function (e) {
    this.contentPane.getController("mode").selectedIndex = e - 1;
    this["list" + e].visible = false;
    this.btnGet.visible = false;
    if (1 == e) {
      r_RankSystem.RankSystem.getRankList(this.setList.bind(this, e));
    } else {
      r_RankSystem.RankSystem.getLevelRankList(this.setList.bind(this, e));
    }
  };
  _ctor.prototype.setList = function (e) {
    if (_ref__ctor.Inst) {
      console.log("RankSystem.rankList: ", r_RankSystem.RankSystem.scoreRankList);
      console.log("RankSystem.levelRankList: ", r_RankSystem.RankSystem.levelRankList);
      var t = 1 == e ? r_RankSystem.RankSystem.scoreRankList.length : r_RankSystem.RankSystem.levelRankList.length;
      var i = 1 == e ? r_RankSystem.RankSystem.getMyRank() : r_RankSystem.RankSystem.getMyLevelRank();
      this["list" + e].visible = true;
      this["list" + e].numItems = t;
      cc.sys.localStorage.setItem(r_RankSystem.RankSystem.nameMapKey, JSON.stringify(r_RankSystem.RankSystem.nameMap));
      this.contentPane.getChild("myRank").text = i ? i + "" : "未进榜";
      this.btnGet.visible = true;
      this.refreshBtn(e);
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("RankLevelUI" + this.m_index);
    cc.Tween.stopAll();
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.refreshBtn = function (e) {
    if (2 == e) {
      if (r_RankSystem.RankSystem.canGetLevelReward()) {
        this.contentPane.getChild("btnGet").grayed = false;
      } else {
        this.contentPane.getChild("btnGet").grayed = true;
      }
    } else if (r_RankSystem.RankSystem.canGetScoreReward()) {
      this.contentPane.getChild("btnGet").grayed = false;
    } else {
      this.contentPane.getChild("btnGet").grayed = true;
    }
  };
  _ctor.prototype.onListRenderer1 = function (e, t) {
    var o = r_RankSystem.RankSystem.scoreRankList[e];
    this.setItem(e, t, o);
    t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(o.score);
    if (e <= 2 && r_RankSystem.RankSystem.canGetRankFirstReward(e + 1)) {
      t.getChild("btnMo").visible = true;
      this.breathAnim(t.getChild("btnMo").node, e);
      t.onClick(function () {
        t.getChild("btnMo").visible = false;
        t.clearClick();
        r_PlayerData.PlayerData.data.rewardTimeMap["areaRank_" + (e + 1)] = r_TimeSystem.TimeSystem.getServerTime();
        r_RankTipUI.RankTipUI.showUI({
          rankInfo: o,
          index: e
        });
      }, this);
    } else {
      t.getChild("btnMo").visible = false;
    }
  };
  _ctor.prototype.onListRenderer2 = function (e, t) {
    var o = r_RankSystem.RankSystem.levelRankList[e];
    this.setItem(e, t, o);
    t.getChild("num").text = "Lv." + o.score;
    if (e <= 2 && r_RankSystem.RankSystem.canGetLevelFirstReward(e + 1)) {
      t.getChild("btnMo").visible = true;
      this.breathAnim(t.getChild("btnMo").node, e);
      t.onClick(function () {
        t.getChild("btnMo").visible = false;
        t.clearClick();
        r_PlayerData.PlayerData.data.rewardTimeMap["levelRank_" + (e + 1)] = r_TimeSystem.TimeSystem.getServerTime();
        r_RankTipUI.RankTipUI.showUI({
          rankInfo: o,
          index: e
        });
      }, this);
    } else {
      t.getChild("btnMo").visible = false;
    }
  };
  _ctor.prototype.setItem = function (e, t, o) {
    var i = this;
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
      var n = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_RankSystem.RankSystem.randomName);
      t.getChild("name").text = n;
      r_RankSystem.RankSystem.nameMap[o.uid] = n;
    }
    if (o.aUrl && "" != o.aUrl) {
      t.getChild("icon").url = o.aUrl + "?aaa=aa.jpg";
    } else if (r_RankSystem.RankSystem.nameMap["icon_" + o.uid]) {
      r_ResSystem.ResSystem.loadHeadImg(t.getChild("icon"), r_RankSystem.RankSystem.nameMap["icon_" + o.uid]);
    } else {
      var a = r_UtilsSystem.UtilsSystem.getRandomNum(1, 8);
      r_ResSystem.ResSystem.loadHeadImg(t.getChild("icon"), a);
      r_RankSystem.RankSystem.nameMap["icon_" + o.uid] = a;
    }
    t.getChild("btnMo").visible = false;
    t.clearClick();
    0 == e && (t.kuang || r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/rank/kuang", cc.Prefab, function (e, o) {
      var n = cc.instantiate(o);
      n.active = true;
      t.getChild("kuang").node.addChild(n);
      var a = (i.contentPane.getController("mode").selectedIndex + 1).toString();
      n.getComponent(sp.Skeleton).setAnimation(0, a, true);
      t.kuang = n;
    }));
  };
  _ctor.prototype.breathAnim = function (e, t) {
    var i = this;
    cc.Tween.stopAllByTarget(e);
    e.scale = 1;
    cc.tween(e).to(.5, {
      scale: 1.1
    }).to(.5, {
      scale: 1
    }).start();
    this.m_index = t;
    r_TimeSystem.TimeSystem.scheduleOnce("RankLevelUI" + t, 1, function () {
      null != _ref__ctor.Inst && i.breathAnim(e, t);
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = this.contentPane.getController("mode").selectedIndex + 1;
    if ((r_RankSystem.RankSystem.canGetLevelReward() || 2 != e) && (r_RankSystem.RankSystem.canGetScoreReward() || 1 != e)) {
      var t = _ref__ctor.rewardCoin[4];
      var i = 1 == e ? r_RankSystem.RankSystem.getMyRank() : r_RankSystem.RankSystem.getMyLevelRank();
      if (i <= 3) {
        t = _ref__ctor.rewardCoin[i - 1];
      } else {
        i <= 10 && (t = _ref__ctor.rewardCoin[3]);
      }
      r_PlayerData.PlayerData.data.scoreRankRewardTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.addCoin("排行榜", t, r_ReportSystem.SystemKey.None);
      this.refreshBtn(e);
    }
  };
  _ctor.rewardCoin = [3e9, 15e8, 1e9, 5e8, 1e8];
  _ctor.Inst = null;
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.RankLevelUI = exp_RankLevelUI;