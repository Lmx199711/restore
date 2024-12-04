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
var r_BathResultUI = require("BathResultUI");
var r_BathSelectCom = require("BathSelectCom");
var def_BathGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bath, r_UIDef.UIDef.Res.UI.BathGameUI) || this;
    t.showAnimFlag = false;
    t.exc = {
      0: {
        steps: [{
          type: "anim",
          name: "0_0"
        }, {
          type: "next",
          name: null
        }],
        bubble: []
      },
      1: {
        steps: [{
          type: "stop",
          name: null
        }, {
          type: "anim",
          name: "1_0"
        }, {
          type: "next",
          name: null
        }],
        bubble: []
      },
      2: {
        steps: [{
          type: "fun",
          name: "setPropItem"
        }, {
          type: "anim",
          name: "2_0"
        }, {
          type: "stop",
          name: null
        }, {
          type: "anim",
          name: "2_1"
        }, {
          type: "next",
          name: null
        }],
        bubble: ["想看我穿哪件衣服"]
      },
      3: {
        steps: [{
          type: "fun",
          name: "setPropItem"
        }, {
          type: "anim",
          name: "2_0"
        }, {
          type: "stop",
          name: null
        }, {
          type: "anim",
          name: "2_1"
        }, {
          type: "next",
          name: null
        }],
        bubble: ["左边还是右边"]
      },
      4: {
        steps: [{
          type: "fun",
          name: "setPropItem"
        }, {
          type: "anim",
          name: "2_0"
        }, {
          type: "stop",
          name: null
        }, {
          type: "fun",
          name: "addWater"
        }, {
          type: "next",
          name: null
        }],
        bubble: ["喜欢用多少度的水温"]
      },
      5: {
        steps: [{
          type: "fun",
          name: "setPropItem"
        }, {
          type: "anim",
          name: "2_0"
        }, {
          type: "fun",
          name: "niejiao"
        }, {
          type: "next",
          name: null
        }],
        bubble: ["那我开始按脚了"]
      }
    };
    t.m_maxStep = 5;
    t.m_step = 0;
    t.m_currStep = 0;
    t.m_isLeft = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.BathGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BathGameUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnSelect, this.btnSelect0, this.btnSelect1, this.btnSelect2, this.btnSelect3, this.btnFree, this.btnLeft, this.btnRight);
    r_ResSystem.ResSystem.loadBundleRes("game3", "bath/selectCom", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.selectCom.node.addChild(i);
      t.bathSelectCom = i.getComponent(r_BathSelectCom.default);
      t.bathSelectCom.init();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("niejiao");
    r_TimeSystem.TimeSystem.scheduleClear("niejiao1");
  };
  _ctor.prototype.restart = function () {
    this.bathSelectCom && this.bathSelectCom.init();
    for (var e = 0; e < 4; e++) {
      this["btnSelect" + e].getController("mode").selectedIndex = 0;
    }
    this.step = 0;
    this.contentPane.getTransition("init").play();
    r_UtilsSystem.UtilsSystem.playAnim(this.jiao, "xijiao_daiji", true);
    for (e = 0; e < 4; e++) {
      this["btnSelect" + e].enabled = true;
    }
    this.proBath.value = 0;
    r_SoundMgr.SoundMgr.playSound("bath/老板翻个牌子挑选技师吧");
  };
  _ctor.prototype.onClickbtnSelect = function () {
    var e = r_BathCfg.BathSelectCardCfg[this.m_selectNum].price;
    if (r_PlayerData.PlayerData.isCoinEnough(e)) {
      r_PlayerData.PlayerData.deleteCoin("洗脚城翻牌子", e, r_ReportSystem.SystemKey.洗脚城);
      this.playSelectBtn();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  Object.defineProperty(_ctor.prototype, "step", {
    set: function (e) {
      this.m_step = e;
      this.m_currStep = 0;
      this.contentPane.getController("mode").selectedIndex = this.m_step;
      this.execute();
      var t = this.exc[this.m_step].bubble;
      if (!(t.length <= 0)) {
        this.bubble.title = t[0];
        r_SoundMgr.SoundMgr.playSound("bath/" + t[0]);
      }
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.execute = function () {
    var e = this;
    var t = this.exc[this.m_step].steps;
    if (!(this.m_currStep >= t.length)) {
      var o = t[this.m_currStep];
      console.log("execute: ", "mode步骤：" + this.m_step + ", 内置步骤:" + this.m_currStep + ", 类型：" + o.type + ",名称：" + o.name);
      switch (o.type) {
        case "anim":
          this.contentPane.getTransition(o.name).play(function () {
            e.m_currStep++;
            e.execute();
          });
          break;
        case "fun":
          this[o.name].bind(this, function () {
            e.m_currStep++;
            e.execute();
          })();
          break;
        case "next":
          return void (this.m_step < this.m_maxStep ? this.step = ++this.m_step : r_BathResultUI.default.showUI({
            index: this.m_selectNum + 3,
            cId: this.bathSelectCom.cId
          }));
        default:
          return void this.m_currStep++;
      }
    }
  };
  _ctor.prototype.onClickbtnSelect0 = function () {
    this.setBtnCard(0);
  };
  _ctor.prototype.onClickbtnSelect1 = function () {
    this.setBtnCard(1);
  };
  _ctor.prototype.onClickbtnSelect2 = function () {
    this.setBtnCard(2);
  };
  _ctor.prototype.onClickbtnSelect3 = function () {
    this.setBtnCard(3);
  };
  _ctor.prototype.playSelectBtn = function () {
    var e = this;
    for (var t = 0; t < 4; t++) {
      var o = this["btnSelect" + t];
      o.enabled = false;
      o.grayed = false;
    }
    this.btnFree.visible = false;
    this.btnSelect.visible = false;
    var i = this["btnSelect" + this.m_selectNum];
    cc.Tween.stopAllByTarget(i);
    cc.tween(i).to(.25, {
      scaleX: 0
    }).call(function () {
      i.getController("mode").selectedIndex = 2;
    }).to(.25, {
      scaleX: 1
    }).delay(1).call(function () {
      e.execute();
      e.bathSelectCom.setIndex(e.m_selectNum);
    }).start();
  };
  _ctor.prototype.setBtnCard = function (e) {
    this.m_selectNum = e;
    for (var t = 0; t < 4; t++) {
      this["btnSelect" + t].getController("mode").selectedIndex = 0;
    }
    this["btnSelect" + e].getController("mode").selectedIndex = 1;
    this.btnSelect.title = r_UtilsSystem.UtilsSystem.numFormats(r_BathCfg.BathSelectCardCfg[e].price);
    this.btnFree.visible = true;
    this.btnSelect.visible = true;
  };
  _ctor.prototype.onClickbtnFree = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("洗脚城翻牌子", function () {
      e.playSelectBtn();
    });
  };
  _ctor.prototype.setPropItem = function (e) {
    this.bathSelectCom.setStep(this.m_step);
    e && e();
  };
  _ctor.prototype.onClickbtnLeft = function () {
    this.bathSelectCom.setLeft();
    this.m_isLeft = true;
    this.execute();
  };
  _ctor.prototype.onClickbtnRight = function () {
    this.bathSelectCom.setRight();
    this.m_isLeft = false;
    this.execute();
  };
  _ctor.prototype.addWater = function (e) {
    this.btnLeft.scaleX = this.btnLeft.scaleY = 0;
    this.btnRight.scaleX = this.btnRight.scaleY = 0;
    if (this.m_isLeft) {
      r_UtilsSystem.UtilsSystem.playAnim(this.jiao, "shui_re", false);
    } else {
      r_UtilsSystem.UtilsSystem.playAnim(this.jiao, "shui_leng", false);
    }
    r_TimeSystem.TimeSystem.scheduleOnce("addWater", 4, function () {
      e && e();
    });
    r_SoundMgr.SoundMgr.playSound("bath/倒热冷水");
  };
  _ctor.prototype.niejiao = function (e) {
    var t = this;
    this.proBath.value = 0;
    this.proBath.tweenValue(100, r_BathCfg.BathNiejiaoTime);
    r_TimeSystem.TimeSystem.scheduleOnce("niejiao", r_BathCfg.BathNiejiaoTime, function () {
      e();
    });
    r_TimeSystem.TimeSystem.scheduleOnce("niejiao1", 5, function () {
      r_SoundMgr.SoundMgr.playSound("bath/按完了");
      cc.Tween.stopAllByTarget(t.bubble);
      t.bubble.title = "按完了，记得下次再来找我呀";
      cc.tween(t.bubble).to(.5, {
        alpha: 1
      }).delay(1).to(.5, {
        alpha: 0
      }).start();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSelect0")], _ctor.prototype, "btnSelect0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect1")], _ctor.prototype, "btnSelect1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect2")], _ctor.prototype, "btnSelect2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect3")], _ctor.prototype, "btnSelect3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelect")], _ctor.prototype, "btnSelect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFree")], _ctor.prototype, "btnFree", undefined);
  __decorate([r_DecorateFunction1.AutoFind("selectCom")], _ctor.prototype, "selectCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("jiao")], _ctor.prototype, "jiao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble")], _ctor.prototype, "bubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("proBath")], _ctor.prototype, "proBath", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BathGameUI;