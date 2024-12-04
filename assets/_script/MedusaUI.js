var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_MedusaResultUI = require("MedusaResultUI");
var def_MedusaUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Medusa, r_UIDef.UIDef.Res.UI.MedusaUI) || this;
    t.uiType = "fullScreen";
    t.m_touchNum = 0;
    t.m_index = 0;
    t.m_dubaiContent = ["第一次见到高傲的女王，你决定带什么礼物", "进了房间后，女王问你想做点什么", "女王有点累了，此时你决定", "女王被你打动了，你们结婚了！"];
    t.m_corrects = [[2], [0, 1], [1]];
    t.m_duziNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MedusaUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MedusaUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.item0_0, this.item0_1, this.item0_2, this.item1_0, this.item1_1, this.item1_2, this.item2_0, this.item2_1, this.item2_2, this.item3);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    r_SoundMgr.SoundMgr.playMusic("escapeRoom/BGM_01(1)");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("change");
    r_TimeSystem.TimeSystem.scheduleClear("jiaoc");
    r_SoundMgr.SoundMgr.playMusic("bgm");
    _ctor.instance = null;
  };
  _ctor.prototype.restart = function () {
    this.initView();
  };
  _ctor.prototype.initView = function () {
    this.door0.url = "ui://" + r_UIDef.UIDef.Pack.Medusa + "/第一场景@1@图层_368";
    this.nv0.url = "ui://" + r_UIDef.UIDef.Pack.Medusa + "/第一场景@1@正面美杜莎";
    this.bg1.url = "ui://" + r_UIDef.UIDef.Pack.Medusa + "/第五场景@图层_63_拷贝";
    this.bg2.url = "ui://" + r_UIDef.UIDef.Pack.Medusa + "/第六场景@图层_250";
    this.door2.url = "ui://" + r_UIDef.UIDef.Pack.Medusa + "/第六场景@图层_268";
    this.nv0.visible = true;
    this.badIcon.visible = false;
    this.anger.visible = false;
    this.shy.visible = false;
    this.bubble0_1.visible = false;
    this.bubble0_2.visible = false;
    this.nan0.visible = true;
    this.bubble0_1.alpha = 0;
    this.bubble0_2.alpha = 0;
    this.itemIcon.visible = false;
    this.m_index = 0;
    this.black.visible = false;
    this.black.alpha = 1;
    this.bubble1_0.alpha = 0;
    this.result0.visible = false;
    this.face1_0.visible = false;
    this.face1_1.visible = false;
    this.face1_2.visible = true;
    this.bubble1_0.visible = false;
    this.bubble2_0.visible = false;
    this.bubble2_1.visible = false;
    this.bubble2_2.visible = false;
    this.choose.visible = true;
    this.choose1.visible = true;
    this.choose3.visible = true;
    this.she.visible = false;
    this.m_duziNum = 0;
    this.duzi.url = "";
    this.duzi.visible = true;
    this.renwu1.visible = true;
    this.renwu2.visible = true;
    this.result1.visible = false;
    this.lvmao.visible = false;
    this.cos.visible = false;
    this.tuanju.visible = false;
    this.jiehun.visible = true;
    this.door2.visible = true;
    this.face2.visible = true;
    this.face4.visible = true;
    this.face5.visible = false;
    this.face6.visible = false;
    this.dubai.visible = false;
    this.next();
  };
  _ctor.prototype.next = function () {
    this.m_touchNum = 0;
    this.contentPane.getController("mode").selectedIndex = this.m_index;
    this.isTouch = true;
    this.showDubai();
  };
  _ctor.prototype.onClickitem0_0 = function () {
    this.playBtnAction(0);
  };
  _ctor.prototype.onClickitem0_1 = function () {
    this.playBtnAction(1);
  };
  _ctor.prototype.onClickitem0_2 = function () {
    this.playBtnAction(2);
  };
  _ctor.prototype.onClickitem1_0 = function () {
    this.playBtnAction(0);
  };
  _ctor.prototype.onClickitem1_1 = function () {
    this.playBtnAction(1);
  };
  _ctor.prototype.onClickitem1_2 = function () {
    this.playBtnAction(2);
  };
  _ctor.prototype.onClickitem2_0 = function () {
    this.playBtnAction(0);
  };
  _ctor.prototype.onClickitem2_1 = function () {
    this.playBtnAction(1);
  };
  _ctor.prototype.onClickitem2_2 = function () {
    this.playBtnAction(2);
  };
  _ctor.prototype.onClickitem3 = function () {
    var e = this;
    if (this.isTouch) {
      this.isTouch = false;
      cc.Tween.stopAllByTarget(this.itemIcon);
      this.itemIcon.alpha = 1;
      this.itemIcon.visible = true;
      this.itemIcon.url = this.item3.icon;
      this.itemIcon.x = this.item3.x;
      this.itemIcon.y = this.item3.y;
      r_SoundMgr.SoundMgr.playSound("medusa/物品飞上去");
      cc.tween(this.itemIcon).to(.25, {
        x: this.target.x,
        y: this.target.y,
        alpha: .5
      }).call(function () {
        e.m_duziNum++;
        e.itemIcon.visible = false;
        if (e.m_duziNum >= 6) {
          r_TimeSystem.TimeSystem.scheduleOnce("wait333", 1, function () {
            e.contentPane.getTransition("end").play(function () {
              r_MedusaResultUI.default.showUI({
                index: 3
              });
            });
          });
        } else {
          e.isTouch = true;
          e.duzi.url = "ui://" + r_UIDef.UIDef.Pack.Medusa + "/duzi" + e.m_duziNum;
        }
      }).start();
    }
  };
  _ctor.prototype.playBtnAction = function (e) {
    var t = this;
    if (this.isTouch) {
      this.isTouch = false;
      this.itemIcon.visible = true;
      var o = this.m_index + "_" + e;
      this.itemIcon.url = this["item" + o].icon;
      this.itemIcon.x = this["item" + o].x;
      this.itemIcon.y = this["item" + o].y;
      var i = function () {
        t.isTouch = true;
      };
      var n = function () {
        if (!t.m_corrects[t.m_index].includes(e)) {
          if (0 == t.m_index) {
            if (0 == e) {
              r_MedusaResultUI.default.showUI({
                index: 0
              });
            } else {
              1 == e && r_MedusaResultUI.default.showUI({
                index: 2
              });
            }
          }
          1 == t.m_index && 2 == e && r_MedusaResultUI.default.showUI({
            index: 2
          });
          return void (2 == t.m_index && (0 == e ? r_MedusaResultUI.default.showUI({
            index: 1
          }) : 2 == e && r_MedusaResultUI.default.showUI({
            index: 2
          })));
        }
        t.m_index++;
        t.contentPane.getTransition("change").play();
        r_TimeSystem.TimeSystem.scheduleOnce("change", .5, function () {
          t.next();
        });
      };
      cc.Tween.stopAllByTarget(this.itemIcon);
      this.itemIcon.alpha = 1;
      this.itemIcon.visible = true;
      r_SoundMgr.SoundMgr.playSound("medusa/物品飞上去");
      cc.tween(this.itemIcon).to(.25, {
        x: this.target.x,
        y: this.target.y,
        alpha: .5
      }).call(function () {
        t.itemIcon.visible = false;
        if (t.m_touchNum >= 5) {
          if (t.m_corrects[t.m_index].includes(e) || 2 == t.m_index && 0 == e) {
            r_SoundMgr.SoundMgr.playSound("medusa/害羞");
          } else {
            r_SoundMgr.SoundMgr.playSound("medusa/生气");
          }
          if (0 == t.m_index && 0 == e) {
            t.she.visible = true;
            r_TimeSystem.TimeSystem.scheduleOnce("jiaoc", 1.5, function () {
              r_UtilsSystem.UtilsSystem.playAnim(t.she, "gongji", false);
            });
          } else if (1 == t.m_index && 2 == e) {
            t.tichu.visible = true;
            r_TimeSystem.TimeSystem.scheduleOnce("jiaoc", 2, function () {
              r_UtilsSystem.UtilsSystem.playAnim(t.tichu, "jiaoc", false);
            });
          } else if (2 == t.m_index && 2 == e) {
            t.tichu2.visible = true;
            r_TimeSystem.TimeSystem.scheduleOnce("jiaoc", 2, function () {
              r_UtilsSystem.UtilsSystem.playAnim(t.tichu2, "jiaoc", false);
            });
          }
          t.contentPane.getTransition(o).play(n);
        } else if (t.m_corrects[t.m_index].includes(e) || 2 == t.m_index && 0 == e) {
          t.contentPane.getTransition("correct" + t.m_index).play(i);
        } else {
          t.contentPane.getTransition("mistake" + t.m_index).play(i);
        }
      }).start();
      this.m_touchNum++;
    }
  };
  _ctor.prototype.showDubai = function () {
    var e = this;
    this.dubai.title = this.m_dubaiContent[this.m_index];
    this.dubai.visible = true;
    this.dubai.alpha = 0;
    cc.Tween.stopAllByTarget(this.dubai);
    cc.tween(this.dubai).to(.25, {
      alpha: 1
    }).delay(3.5).call(function () {
      e.dubai.visible = false;
    }).start();
  };
  __decorate([r_DecorateFunction1.AutoFind("door0")], _ctor.prototype, "door0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("badIcon")], _ctor.prototype, "badIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("nan0")], _ctor.prototype, "nan0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("nv0")], _ctor.prototype, "nv0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anger")], _ctor.prototype, "anger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("shy")], _ctor.prototype, "shy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble0_1")], _ctor.prototype, "bubble0_1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item0_0")], _ctor.prototype, "item0_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item0_1")], _ctor.prototype, "item0_1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item0_2")], _ctor.prototype, "item0_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble0_2")], _ctor.prototype, "bubble0_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("itemIcon")], _ctor.prototype, "itemIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("target")], _ctor.prototype, "target", undefined);
  __decorate([r_DecorateFunction1.AutoFind("black")], _ctor.prototype, "black", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face1_1")], _ctor.prototype, "face1_1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face1_0")], _ctor.prototype, "face1_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face1_2")], _ctor.prototype, "face1_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble1_0")], _ctor.prototype, "bubble1_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble2_2")], _ctor.prototype, "bubble2_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble2_0")], _ctor.prototype, "bubble2_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble2_1")], _ctor.prototype, "bubble2_1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("result0")], _ctor.prototype, "result0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item1_0")], _ctor.prototype, "item1_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item1_1")], _ctor.prototype, "item1_1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item1_2")], _ctor.prototype, "item1_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("choose")], _ctor.prototype, "choose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("choose1")], _ctor.prototype, "choose1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("choose3")], _ctor.prototype, "choose3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item2_0")], _ctor.prototype, "item2_0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item2_1")], _ctor.prototype, "item2_1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item2_2")], _ctor.prototype, "item2_2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item3")], _ctor.prototype, "item3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("duzi")], _ctor.prototype, "duzi", undefined);
  __decorate([r_DecorateFunction1.AutoFind("she")], _ctor.prototype, "she", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tichu")], _ctor.prototype, "tichu", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tichu2")], _ctor.prototype, "tichu2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("renwu1")], _ctor.prototype, "renwu1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("renwu2")], _ctor.prototype, "renwu2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg1")], _ctor.prototype, "bg1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg2")], _ctor.prototype, "bg2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("result1")], _ctor.prototype, "result1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lvmao")], _ctor.prototype, "lvmao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("cos")], _ctor.prototype, "cos", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tuanju")], _ctor.prototype, "tuanju", undefined);
  __decorate([r_DecorateFunction1.AutoFind("jiehun")], _ctor.prototype, "jiehun", undefined);
  __decorate([r_DecorateFunction1.AutoFind("door2")], _ctor.prototype, "door2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face2")], _ctor.prototype, "face2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face4")], _ctor.prototype, "face4", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face5")], _ctor.prototype, "face5", undefined);
  __decorate([r_DecorateFunction1.AutoFind("face6")], _ctor.prototype, "face6", undefined);
  __decorate([r_DecorateFunction1.AutoFind("dubai")], _ctor.prototype, "dubai", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_MedusaUI;