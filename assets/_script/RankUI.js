var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_RankSystem = require("RankSystem");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_RankTipUI = require("RankTipUI");
var r_ReportSystem = require("ReportSystem");
var exp_RankUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Res.UI.RankUI) || this;
    t.m_index = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RankUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RankUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnGet.onClick(this.onClickGet, this);
    this.btnGet.startX = this.btnGet.x;
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    for (var o = 1; o <= 2; o++) {
      var i = this.contentPane.getChild("tab" + o);
      this.registTouchTap(i, o - 1);
    }
    for (o = 1; o <= 5; o++) {
      var n = this.contentPane.getChild("reward" + o);
      n.getController("mode").selectedIndex = o <= 3 ? o - 1 : 3;
      4 == o && (n.getChild("rank").text = "4-10");
      5 == o && (n.getChild("rank").text = "11-50");
      n.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(_ctor.rewardCoin[o - 1]);
    }
  };
  _ctor.prototype.registTouchTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      o.contentPane.getController("mode").selectedIndex != t && (o.contentPane.getController("mode").selectedIndex = t);
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.list.visible = false;
    this.btnGet.visible = false;
    r_RankSystem.RankSystem.getRankList(function () {
      if (_ctor.Inst) {
        o.list.visible = true;
        o.list.numItems = r_RankSystem.RankSystem.scoreRankList.length;
        cc.sys.localStorage.setItem(r_RankSystem.RankSystem.nameMapKey, JSON.stringify(r_RankSystem.RankSystem.nameMap));
        if (r_RankSystem.RankSystem.getMyRank()) {
          o.contentPane.getChild("myRank").text = r_RankSystem.RankSystem.getMyRank() + "";
        } else {
          o.contentPane.getChild("myRank").text = "未进榜";
        }
        o.btnGet.visible = true;
        o.refreshBtn();
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("RankUI" + this.m_index);
    cc.Tween.stopAll();
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshBtn = function () {
    if (r_RankSystem.RankSystem.canGetScoreReward()) {
      this.contentPane.getChild("btnGet").grayed = false;
    } else {
      this.contentPane.getChild("btnGet").grayed = true;
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = r_RankSystem.RankSystem.scoreRankList[e];
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
        i.getComponent(sp.Skeleton).setAnimation(0, "1", true);
        t.kuang = i;
      });
    }
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
  _ctor.prototype.breathAnim = function (e, o) {
    var i = this;
    cc.Tween.stopAllByTarget(e);
    e.scale = 1;
    cc.tween(e).to(.5, {
      scale: 1.1
    }).to(.5, {
      scale: 1
    }).start();
    this.m_index = o;
    r_TimeSystem.TimeSystem.scheduleOnce("RankUI" + o, 1, function () {
      null != _ctor.Inst && i.breathAnim(e, o);
    });
  };
  _ctor.prototype.onClickGet = function () {
    if (r_RankSystem.RankSystem.canGetScoreReward()) {
      var e = _ctor.rewardCoin[4];
      var o = r_RankSystem.RankSystem.getMyRank();
      if (o <= 3) {
        e = _ctor.rewardCoin[o - 1];
      } else {
        o <= 10 && (e = _ctor.rewardCoin[3]);
      }
      r_PlayerData.PlayerData.data.scoreRankRewardTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.addCoin("排行榜", e, r_ReportSystem.SystemKey.None);
      this.refreshBtn();
    }
  };
  _ctor.prototype.onClickDonate = function () {};
  _ctor.rewardCoin = [3e9, 15e8, 1e9, 5e8, 1e8];
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.RankUI = exp_RankUI;