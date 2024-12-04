var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LotteryUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_FootballUI = require("FootballUI");
var r_LuckyTenUI = require("LuckyTenUI");
var r_CowUI = require("CowUI");
var r_NumBallUI = require("NumBallUI");
var r_NiuniuUI = require("NiuniuUI");
var r_BigSmallUI = require("BigSmallUI");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_YugongUI = require("YugongUI");
var r_GirlsFriendUI = require("GirlsFriendUI");
var r_PencilUI = require("PencilUI");
var r_WuGangUI = require("WuGangUI");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_TaskSystem = require("TaskSystem");
var r_TaskCfg = require("TaskCfg");
var r_ElevenTickUI = require("ElevenTickUI");
var r_ShenronUI = require("ShenronUI");
var r_CaishenUI = require("CaishenUI");
var r_NianMonsterUI = require("NianMonsterUI");
var r_BlockSystem = require("BlockSystem");
var exp_LotteryUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.LotteryUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LotteryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LotteryUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("block").on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    var t = this.contentPane.getChild("btnPencil");
    t.onClick(this.onClickPencil, this);
    t.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyPencilCoin, 0);
    this.contentPane.getChild("btnFootball").onClick(this.onClickFootball, this);
    var o = this.contentPane.getChild("btnTen");
    o.onClick(this.onClickTen, this);
    o.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyLuckyTenCoin, 0);
    var i = this.contentPane.getChild("btnNiu");
    i.onClick(this.onClickCow, this);
    i.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyCowCoin, 0);
    var n = this.contentPane.getChild("btnGirls");
    n.onClick(this.onClickGirls, this);
    n.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyGirlsCoin, 0);
    var a = this.contentPane.getChild("btnNiuniu");
    a.onClick(this.onClickNiuniu, this);
    var s = this.contentPane.getChild("btnBigSamll");
    s.onClick(this.onClickBigSamll, this);
    s.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyBigSmallCoin, 0);
    var c = this.contentPane.getChild("btnCaishen");
    c.onClick(this.onClickCaishen, this);
    c.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyCaiShen, 0);
    var l = this.contentPane.getChild("btnYugong");
    l.onClick(this.onClickYugong, this);
    l.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyYugongCoin, 0);
    this.btnWuGang = this.contentPane.getChild("btnWuGang");
    this.btnWuGang.onClick(this.onClickWuGang, this);
    this.btnWuGang.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyWuGangCoin, 0);
    this.btnElevenTick = this.contentPane.getChild("btnElevenTick");
    this.btnElevenTick.onClick(this.onClickElevenTick, this);
    this.btnLeft = this.contentPane.getChild("btnLeft");
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight = this.contentPane.getChild("btnRIght");
    this.btnRight.onClick(this.onClickRight, this);
    this.btnShenron = this.contentPane.getChild("btnShenron");
    this.btnShenron.onClick(this.onClickShenron, this);
    this.btnShenron.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyShenronCoin, 0);
    this.btnNianMonster = this.contentPane.getChild("btnNianMonster");
    this.btnNianMonster.onClick(this.onClickNianMonster, this);
    this.btnNianMonster.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyNianMonster, 0);
    for (var u = 1; u <= 3; u++) {
      var p = this.contentPane.getChild("btnTap" + u);
      this.registBtnTap(p, u - 1);
    }
    if ("0" == r_PlatformSystem.PlatformSystem.jjs) {
      this.contentPane.getChild("btnTap3").visible = false;
      this.contentPane.getChild("btnTap1").visible = false;
      o.visible = false;
      i.visible = false;
      a.visible = false;
      s.visible = false;
      s.visible = false;
    }
    r_NumBallUI.NumBallUI.init(this);
  };
  _ctor.prototype.onClickLeft = function () {
    this.contentPane.getController("index").selectedIndex = 0;
  };
  _ctor.prototype.onClickRight = function () {
    this.contentPane.getController("index").selectedIndex = 1;
  };
  _ctor.prototype.refreshTap = function () {
    for (var e = 1; e <= 3; e++) {
      var t = this.contentPane.getChild("btnTap" + e);
      if (e - 1 == this.contentPane.getController("mode").selectedIndex) {
        t.getController("mode").selectedIndex = 1;
      } else {
        t.getController("mode").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.registBtnTap = function (e, t) {
    var o = this;
    e.onClick(function () {
      if (o.contentPane.getController("mode").selectedIndex != t) {
        o.contentPane.getController("mode").selectedIndex = t;
        o.refreshTap();
        if (2 == t) {
          r_NumBallUI.NumBallUI.onShown();
        } else {
          r_NumBallUI.NumBallUI.onHide();
        }
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("mode").selectedIndex = 0;
    this.refreshTap();
    if (r_PlayerData.PlayerData.data.wugangVideo) {
      this.btnWuGang.getController("c1").selectedIndex = 0;
    } else {
      this.btnWuGang.getController("c1").selectedIndex = 1;
    }
    var t = this.contentPane.getChild("btnBigSamll");
    if (r_PlayerData.PlayerData.data.bigAndSmallVideo) {
      t.getController("c1").selectedIndex = 0;
    } else {
      t.getController("c1").selectedIndex = 1;
    }
    if (r_PlayerData.PlayerData.data.shenronVideo) {
      this.btnShenron.getController("c1").selectedIndex = 0;
    } else {
      this.btnShenron.getController("c1").selectedIndex = 1;
    }
    var o = this.contentPane.getChild("btnCaishen");
    if (r_PlayerData.PlayerData.data.caiShenVideo) {
      o.getController("c1").selectedIndex = 0;
    } else {
      o.getController("c1").selectedIndex = 1;
    }
    if (r_PlayerData.PlayerData.getComeInSysCount("NianMonster") <= 0) {
      this.btnNianMonster.getController("c1").selectedIndex = 1;
    } else {
      this.btnNianMonster.getController("c1").selectedIndex = 0;
    }
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.打年兽)) {
      this.btnNianMonster.visible = false;
    } else {
      this.btnNianMonster.visible = true;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_NumBallUI.NumBallUI.onHide();
  };
  _ctor.prototype.onClickFootball = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("足球门票", function () {
      r_FootballUI.FootballUI.showUI();
      e.addLuckyNum();
    });
  };
  _ctor.prototype.onClickTen = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyLuckyTenCoin)) {
      r_PlayerData.PlayerData.deleteCoin("购买幸运10倍", r_LotteryTicketCfg.BuyLuckyTenCoin, r_ReportSystem.SystemKey.彩票);
      r_LuckyTenUI.LuckyTenUI.showUI();
      this.addLuckyNum();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickPencil = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyPencilCoin)) {
      r_PlayerData.PlayerData.deleteCoin("妙笔生花", r_LotteryTicketCfg.BuyPencilCoin, r_ReportSystem.SystemKey.彩票);
      r_PencilUI.PencilUI.showUI();
      this.addLuckyNum();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickCow = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyCowCoin)) {
      r_PlayerData.PlayerData.deleteCoin("购买牛气冲天", r_LotteryTicketCfg.BuyCowCoin, r_ReportSystem.SystemKey.彩票);
      r_CowUI.CowUI.showUI();
      this.addLuckyNum();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickGirls = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyGirlsCoin)) {
      r_PlayerData.PlayerData.deleteCoin("购买比体重", r_LotteryTicketCfg.BuyGirlsCoin, r_ReportSystem.SystemKey.彩票);
      r_GirlsFriendUI.default.showUI();
      this.addLuckyNum();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickNiuniu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("斗牛门票", function () {
      r_NiuniuUI.default.showUI();
      e.addLuckyNum();
    });
  };
  _ctor.prototype.onClickElevenTick = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双12门票", function () {
      r_ElevenTickUI.default.showUI();
      e.addLuckyNum();
    });
  };
  _ctor.prototype.onClickShenron = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.shenronVideo) {
      if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyShenronCoin)) {
        r_PlayerData.PlayerData.deleteCoin("神龙彩票门票", r_LotteryTicketCfg.BuyShenronCoin, r_ReportSystem.SystemKey.彩票);
        r_ShenronUI.default.showUI();
        this.addLuckyNum();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解锁神龙彩票", function () {
        e.contentPane.getChild("btnShenron").getController("c1").selectedIndex = 0;
        r_PlayerData.PlayerData.data.shenronVideo = true;
      });
    }
  };
  _ctor.prototype.onClickBigSamll = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.bigAndSmallVideo) {
      if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyBigSmallCoin)) {
        r_PlayerData.PlayerData.deleteCoin("比大小门票", r_LotteryTicketCfg.BuyBigSmallCoin, r_ReportSystem.SystemKey.彩票);
        r_BigSmallUI.default.showUI();
        this.addLuckyNum();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解锁比大小彩票", function () {
        e.contentPane.getChild("btnBigSamll").getController("c1").selectedIndex = 0;
        r_PlayerData.PlayerData.data.bigAndSmallVideo = true;
      });
    }
  };
  _ctor.prototype.onClickCaishen = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.caiShenVideo) {
      if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyCaiShen)) {
        r_PlayerData.PlayerData.deleteCoin("财神彩票门票", r_LotteryTicketCfg.BuyCaiShen, r_ReportSystem.SystemKey.彩票);
        r_CaishenUI.default.showUI();
        this.addLuckyNum();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解锁财神彩票", function () {
        e.contentPane.getChild("btnCaishen").getController("c1").selectedIndex = 0;
        r_PlayerData.PlayerData.data.caiShenVideo = 1;
      });
    }
  };
  _ctor.prototype.onClickNianMonster = function () {
    var e = this;
    if (r_PlayerData.PlayerData.getComeInSysCount("NianMonster") <= 0) {
      r_PlatformSystem.PlatformSystem.showVideo("解锁打年兽彩票", function () {
        e.contentPane.getChild("btnNianMonster").getController("c1").selectedIndex = 0;
        r_PlayerData.PlayerData.setComeInSysCount("NianMonster");
      });
    } else if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyNianMonster)) {
      r_PlayerData.PlayerData.deleteCoin("打年兽彩票门票", r_LotteryTicketCfg.BuyNianMonster, r_ReportSystem.SystemKey.彩票);
      r_NianMonsterUI.default.showUI();
      this.addLuckyNum();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickYugong = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyYugongCoin)) {
      r_PlayerData.PlayerData.deleteCoin("愚公移山门票", r_LotteryTicketCfg.BuyYugongCoin, r_ReportSystem.SystemKey.彩票);
      r_YugongUI.default.showUI();
      this.addLuckyNum();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickWuGang = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.wugangVideo) {
      if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyYugongCoin)) {
        r_PlayerData.PlayerData.deleteCoin("吴刚伐桂门票", r_LotteryTicketCfg.BuyWuGangCoin, r_ReportSystem.SystemKey.彩票);
        r_WuGangUI.default.showUI();
        this.addLuckyNum();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("解锁吴刚彩票", function () {
        e.btnWuGang.getController("c1").selectedIndex = 0;
        r_PlayerData.PlayerData.data.wugangVideo = true;
      });
    }
  };
  _ctor.prototype.addLuckyNum = function () {
    r_PlayerData.PlayerData.data.luckyNum++;
    r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.刮刮乐);
    r_PlayerData.PlayerData.saveData();
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.LotteryUI = exp_LotteryUI;