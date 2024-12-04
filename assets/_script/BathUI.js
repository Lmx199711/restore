var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BathCfg = require("BathCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_BathGameUI = require("BathGameUI");
var r_BathResultUI = require("BathResultUI");
var def_BathUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bath, r_UIDef.UIDef.Res.UI.BathUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.m_index = -1;
    t.m_nextTime = 7;
    t.m_playTime = 3;
    t.btns = [];
    t.roleAnimMap = {
      1: ["_1", "_1_2", "_1_3"],
      0: ["_2", "_2_2", "_2_3"],
      2: ["_3", "_3_1", "_3_2"]
    };
    t.roleAnimDoMap = {
      1: ["tuibei1", "caibei1", "tuibei1_1"],
      0: ["tuibei2", "caibei2", "tuibei2_1"],
      2: ["tuibei3", "caibei3", "tuibei3_1"]
    };
    t.m_stpe = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.BathUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BathUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnGoRoom, this.btnSpa, this.btnBath, this.btnSpace, this.btnGoSelect, this.btnSelect0, this.btnSelect1, this.btnSelect2, this.btnQuick, this.btnSlow, this.btnSmall, this.btnBig, this.btnJingyou, this.btnHuasheng, this.btnNoNeed, this.btnNeed, this.btnClose);
    this.btns.push(this.btnQuick, this.btnSlow, this.btnSmall, this.btnBig, this.btnJingyou, this.btnHuasheng, this.btnNoNeed, this.btnNeed);
    r_ResSystem.ResSystem.loadBundleRes("game3", "bath/roleDoCom", cc.Prefab, function (e, o) {
      if (!e) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        for (var n = 0; n < 3; n++) {
          t["roleDo_" + n] = i.getChildByName("bathRole" + n).getComponent(sp.Skeleton);
        }
        t.roleDoCom.node.addChild(i);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_SoundMgr.SoundMgr.playMusic("bath/洗浴城bgm");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    this.contentPane.getTransition("init").play();
    this.contentPane.getTransition("t0").play();
    r_TimeSystem.TimeSystem.scheduleOnce("bubble0", .5, function () {
      r_SoundMgr.SoundMgr.playSound("bath/老板晚上好");
    });
  };
  _ctor.prototype.onClickbtnGoRoom = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.contentPane.getTransition("top1").play();
    r_TimeSystem.TimeSystem.scheduleOnce("bubble1", .5, function () {
      r_SoundMgr.SoundMgr.playSound("bath/老板,今天想做什么项目");
    });
  };
  _ctor.prototype.onClickbtnBath = function () {
    r_BathGameUI.default.showUI();
  };
  _ctor.prototype.onClickbtnSpa = function () {
    this.contentPane.getController("c1").selectedIndex = 2;
  };
  _ctor.prototype.onClickbtnSpace = function () {
    r_UtilsSystem.UtilsSystem.showTip("敬请期待");
  };
  _ctor.prototype.onClickbtnGoSelect = function () {
    this.contentPane.getTransition("top2").play();
    r_SoundMgr.SoundMgr.playSound("bath/开门");
    for (var e = 0; e < 3; e++) {
      var t = this["btnSelect" + e];
      t.getController("c1").selectedIndex = 0;
      t.getController("video").selectedIndex = r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathRoleCfg[e].showPrice) ? 0 : 1;
      t.title = r_UtilsSystem.UtilsSystem.numFormats(r_BathCfg.BathRoleCfg[e].showPrice);
      r_UtilsSystem.UtilsSystem.playAnim(this["role" + e], "zhan" + this.roleAnimMap[e][0], true);
    }
  };
  _ctor.prototype.onClickbtnSelect0 = function () {
    this.checkSelect(0);
  };
  _ctor.prototype.onClickbtnSelect1 = function () {
    this.checkSelect(1);
  };
  _ctor.prototype.onClickbtnSelect2 = function () {
    this.checkSelect(2);
  };
  _ctor.prototype.checkSelect = function (e) {
    var t = this;
    var o = function () {
      t["btnSelect" + e].getController("c1").selectedIndex = 1;
      if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathRoleCfg[e].selectPrice)) {
        t["btnSelect" + e].getController("video").selectedIndex = 0;
        t["btnSelect" + e].title = r_UtilsSystem.UtilsSystem.numFormats(r_BathCfg.BathRoleCfg[e].selectPrice);
      } else {
        t["btnSelect" + e].getController("video").selectedIndex = 1;
      }
      r_UtilsSystem.UtilsSystem.playAnim(t["role" + e], "zhan" + t.roleAnimMap[e][1], false);
      r_TimeSystem.TimeSystem.scheduleOnce("zhan", 1.5, function () {
        r_UtilsSystem.UtilsSystem.playAnim(t["role" + e], "zhan" + t.roleAnimMap[e][2], true);
      });
    };
    if (0 == this["btnSelect" + e].getController("c1").selectedIndex) {
      if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathRoleCfg[e].showPrice)) {
        r_PlayerData.PlayerData.deleteCoin("揭露洗脚城技师", r_BathCfg.BathRoleCfg[e].showPrice, r_ReportSystem.SystemKey.洗脚城);
        o();
      } else {
        r_PlatformSystem.PlatformSystem.showVideo("揭露洗脚城技师", function () {
          o();
        });
      }
    } else {
      var i = function () {
        t.m_index = e;
        cc.Tween.stopAllByTarget(t["bu" + e]);
        r_SoundMgr.SoundMgr.playSound("bath/老板很高兴为您服务");
        cc.tween(t["bu" + e]).to(.5, {
          alpha: 1
        }).start();
        for (var o = 0; o < 3; o++) {
          t["btnSelect" + o].visible = false;
          if (o != e) {
            var i = t["role" + o];
            cc.Tween.stopAllByTarget(i);
            cc.tween(i).to(.5, {
              alpha: 0
            }).start();
          }
        }
        r_TimeSystem.TimeSystem.scheduleOnce("NextScene", 2, function () {
          t.contentPane.getController("c1").selectedIndex = 3;
          t.init3();
        });
      };
      if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathRoleCfg[e].selectPrice)) {
        r_PlayerData.PlayerData.deleteCoin("选择洗脚城技师", r_BathCfg.BathRoleCfg[e].selectPrice, r_ReportSystem.SystemKey.洗脚城);
        i();
      } else {
        r_PlatformSystem.PlatformSystem.showVideo("选择洗脚城技师", function () {
          i();
        });
      }
    }
  };
  Object.defineProperty(_ctor.prototype, "roleDo", {
    get: function () {
      return this["roleDo_" + this.m_index];
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init3 = function () {
    var e = this;
    for (var t = 0; t < 3; t++) {
      this["roleDo_" + t].node.active = false;
    }
    this.roleDo.node.active = true;
    this.contentPane.getController("type").selectedIndex = this.m_index;
    this.initAnim();
    this.m_stpe = 0;
    r_TimeSystem.TimeSystem.scheduleOnce("init3", 3, function () {
      e.next();
    });
  };
  _ctor.prototype.awaitInitAnim = function () {
    var e = this;
    this.btns.forEach(function (e) {
      e.scaleX = e.scaleY = 0;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("awaitInitAnim", 4, function () {
      e.initAnim();
      e.m_stpe++;
      e.next();
    });
  };
  _ctor.prototype.initAnim = function () {
    this.roleDo.setAnimation(0, this.roleAnimDoMap[this.m_index][0], true);
    this.roleDo.timeScale = 1;
    r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_1", true);
    this.animHongzhong.visible = false;
    this.animHuasheng.visible = false;
    this.animJingyou.visible = false;
  };
  _ctor.prototype.next = function () {
    1 == this.m_stpe && r_SoundMgr.SoundMgr.playSound("bath/速度怎么样");
    0 == this.m_stpe && r_SoundMgr.SoundMgr.playSound("bath/这个力度还可以吗");
    3 == this.m_stpe && r_SoundMgr.SoundMgr.playSound("bath/老板需要踩下背吗");
    if (4 != this.m_stpe) {
      this.contentPane.getTransition("3_" + this.m_stpe).play();
      if (2 == this.m_stpe) {
        if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathPropCfg[0].price)) {
          this.btnJingyou.getController("video").selectedIndex = 0;
          this.btnJingyou.title = r_UtilsSystem.UtilsSystem.numFormats(r_BathCfg.BathPropCfg[0].price);
        } else {
          this.btnJingyou.getController("video").selectedIndex = 1;
        }
        if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathPropCfg[1].price)) {
          this.btnHuasheng.getController("video").selectedIndex = 0;
          this.btnHuasheng.title = r_UtilsSystem.UtilsSystem.numFormats(r_BathCfg.BathPropCfg[1].price);
        } else {
          this.btnHuasheng.getController("video").selectedIndex = 1;
        }
        r_SoundMgr.SoundMgr.playSound("bath/请问需要什么油");
      }
    } else {
      r_BathResultUI.default.showUI({
        index: this.m_index
      });
    }
  };
  _ctor.prototype.onClickbtnQuick = function () {
    this.roleDo.timeScale = 2;
    this.roleDo.setAnimation(0, this.roleAnimDoMap[this.m_index][0], true);
    r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_3", true);
    r_SoundMgr.SoundMgr.playSound("bath/男人惨叫");
    this.awaitInitAnim();
  };
  _ctor.prototype.onClickbtnSlow = function () {
    this.roleDo.timeScale = .5;
    this.roleDo.setAnimation(0, this.roleAnimDoMap[this.m_index][0], true);
    r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_2", true);
    r_SoundMgr.SoundMgr.playSound("bath/男人舒服");
    this.awaitInitAnim();
  };
  _ctor.prototype.onClickbtnSmall = function () {
    this.roleDo.setAnimation(0, this.roleAnimDoMap[this.m_index][0], true);
    r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_2", true);
    r_SoundMgr.SoundMgr.playSound("bath/男人舒服");
    this.awaitInitAnim();
  };
  _ctor.prototype.onClickbtnBig = function () {
    this.roleDo.setAnimation(0, this.roleAnimDoMap[this.m_index][2], true);
    r_UtilsSystem.UtilsSystem.playAnim(this.animHongzhong, "beis_xue", false);
    r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_3", true);
    r_SoundMgr.SoundMgr.playSound("bath/男人惨叫");
    this.awaitInitAnim();
  };
  _ctor.prototype.onClickbtnJingyou = function () {
    var e = this;
    if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathPropCfg[0].price)) {
      r_PlayerData.PlayerData.deleteCoin("精油开背", r_BathCfg.BathPropCfg[0].price, r_ReportSystem.SystemKey.洗脚城);
      r_SoundMgr.SoundMgr.playSound("bath/倒油");
      r_UtilsSystem.UtilsSystem.playAnim(this.animJingyou, "daoyou2", false);
      r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_2", true);
      r_SoundMgr.SoundMgr.playSound("bath/男人舒服");
      this.awaitInitAnim();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("精油开背", function () {
        r_UtilsSystem.UtilsSystem.playAnim(e.animJingyou, "daoyou2", false);
        r_UtilsSystem.UtilsSystem.playAnim(e.animNan, "nan_2", true);
        r_SoundMgr.SoundMgr.playSound("bath/倒油");
        r_SoundMgr.SoundMgr.playSound("bath/男人舒服");
        e.awaitInitAnim();
      });
    }
  };
  _ctor.prototype.onClickbtnHuasheng = function () {
    var e = this;
    if (r_PlayerData.PlayerData.isCoinEnough(r_BathCfg.BathPropCfg[1].price)) {
      r_PlayerData.PlayerData.deleteCoin("精油开背", r_BathCfg.BathPropCfg[1].price, r_ReportSystem.SystemKey.洗脚城);
      r_UtilsSystem.UtilsSystem.playAnim(this.animHuasheng, "daoyou", false);
      r_UtilsSystem.UtilsSystem.playAnim(this.animNan, "nan_3", true);
      r_SoundMgr.SoundMgr.playSound("bath/男人惨叫");
      r_SoundMgr.SoundMgr.playSound("bath/倒油");
      this.awaitInitAnim();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("精油开背", function () {
        r_UtilsSystem.UtilsSystem.playAnim(e.animHuasheng, "daoyou", false);
        r_UtilsSystem.UtilsSystem.playAnim(e.animNan, "nan_3", true);
        r_SoundMgr.SoundMgr.playSound("bath/男人惨叫");
        r_SoundMgr.SoundMgr.playSound("bath/倒油");
        e.awaitInitAnim();
      });
    }
  };
  _ctor.prototype.onClickbtnNoNeed = function () {
    this.awaitInitAnim();
  };
  _ctor.prototype.onClickbtnNeed = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("洗脚城脚踩背", function () {
      e.roleDo.setAnimation(0, e.roleAnimDoMap[e.m_index][1], true);
      r_UtilsSystem.UtilsSystem.playAnim(e.animNan, "nan_2", true);
      r_SoundMgr.SoundMgr.playSound("bath/男人舒服");
      e.awaitInitAnim();
    });
  };
  _ctor.prototype.onClickbtnClose = function () {
    if (this.contentPane.getController("c1").selectedIndex > 1) {
      this.returnUI();
    } else {
      this.hide();
    }
  };
  _ctor.prototype.returnUI = function () {
    this.contentPane.getTransition("init").play();
    this.onClickbtnGoRoom();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnGoRoom")], _ctor.prototype, "btnGoRoom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSpa")], _ctor.prototype, "btnSpa", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBath")], _ctor.prototype, "btnBath", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSpace")], _ctor.prototype, "btnSpace", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGoSelect")], _ctor.prototype, "btnGoSelect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect1")], _ctor.prototype, "btnSelect1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect0")], _ctor.prototype, "btnSelect0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect2")], _ctor.prototype, "btnSelect2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role1")], _ctor.prototype, "role1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role0")], _ctor.prototype, "role0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role2")], _ctor.prototype, "role2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnQuick")], _ctor.prototype, "btnQuick", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSlow")], _ctor.prototype, "btnSlow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSmall")], _ctor.prototype, "btnSmall", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBig")], _ctor.prototype, "btnBig", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnJingyou")], _ctor.prototype, "btnJingyou", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnHuasheng")], _ctor.prototype, "btnHuasheng", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNoNeed")], _ctor.prototype, "btnNoNeed", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNeed")], _ctor.prototype, "btnNeed", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animNan")], _ctor.prototype, "animNan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleDoCom")], _ctor.prototype, "roleDoCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animHongzhong")], _ctor.prototype, "animHongzhong", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animHuasheng")], _ctor.prototype, "animHuasheng", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animJingyou")], _ctor.prototype, "animJingyou", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bu0")], _ctor.prototype, "bu0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bu0")], _ctor.prototype, "bu1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bu0")], _ctor.prototype, "bu2", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BathUI;