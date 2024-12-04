var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetRankUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_RankSystem = require("RankSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_PetCommon = require("PetCommon");
var r_PetCfg = require("PetCfg");
var exp_PetRankUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetRankUI) || this;
    t.rankList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetRankUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetRankUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.tab = this.contentPane.getController("tab");
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.itemRenderer.bind(this);
    this.tab.onChanged(function () {
      if (0 == t.tab.selectedIndex) {
        t.initRank(5);
      } else {
        t.initRank(4);
      }
    });
    this.contentPane.getChild("refreshTime").asTextField.setVar("time", Math.ceil(r_RankSystem.RankSystem.requestSpaceTime / 60) + "").flushVars();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.tab.selectedIndex = 0;
    this.initRank(5);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.initRank = function (e) {
    var t = this;
    r_RankSystem.RankSystem.getPetRankList(e, function (e) {
      t.rankList = e || [];
      t.list.numItems = t.rankList.length;
      t.list.scrollPane.scrollTop();
      cc.sys.localStorage.setItem(r_RankSystem.RankSystem.nameMapKey, JSON.stringify(r_RankSystem.RankSystem.nameMap));
      t.myRank();
    });
  };
  _ctor.prototype.myRank = function () {
    var e = this.rankList.findIndex(function (e) {
      return e.uid == r_PlayerData.PlayerData.data.userId;
    });
    var t = this.contentPane.getChild("myRank").asCom;
    if (-1 != e) {
      var o = this.rankList[e];
      var i = o.nname;
      if (!i) {
        if (r_RankSystem.RankSystem.nameMap[o.uid]) {
          i = r_RankSystem.RankSystem.nameMap[o.uid];
        } else {
          i = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_RankSystem.RankSystem.randomName);
          r_RankSystem.RankSystem.nameMap[o.uid] = i;
        }
      }
      this.setRankItem(t, e + 1, i, o.score);
    } else {
      t.getChild("icon").visible = false;
      t.getChild("rank").text = "";
      t.getChild("name").text = "未上榜";
      t.getChild("val").text = "";
    }
  };
  _ctor.prototype.setRankItem = function (e, t, o, i) {
    e.getChild("icon").asLoader.url = "ui://Pet/rank" + (t < 4 ? t : 4);
    e.getChild("rank").text = t > 3 ? t : "";
    e.getChild("name").text = o;
    if (0 == this.tab.selectedIndex) {
      e.getChild("val").text = i;
    } else {
      var n = r_PetCommon.PetCommon.getTierInfo(i);
      e.getChild("val").text = r_PetCfg.PetGameCfg.tier.name[n.tier1];
      if (n.tier1 < 6) {
        e.getChild("val").text += 4 - n.tier2;
      } else {
        e.getChild("val").text += "x" + n.star;
      }
    }
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    var o = this.rankList[e];
    var i = o.nname;
    if (!i) {
      if (r_RankSystem.RankSystem.nameMap[o.uid]) {
        i = r_RankSystem.RankSystem.nameMap[o.uid];
      } else {
        i = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_RankSystem.RankSystem.randomName);
        r_RankSystem.RankSystem.nameMap[o.uid] = i;
      }
    }
    this.setRankItem(t, e + 1, i, o.score);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetRankUI = exp_PetRankUI;