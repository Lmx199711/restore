var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FruitsGameUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_FruitsCfg = require("FruitsCfg");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_FruitsRsultUI = require("FruitsRsultUI");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_FruitsGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Fruits, r_UIDef.UIDef.Res.UI.FruitsGameUI) || this;
    t.uiType = "fullScreen";
    t.fruits = [];
    t.initPos = [];
    t.m_maxStep = 6;
    t.isMove = false;
    t.points = [];
    t.price = 0;
    t.chats = [];
    t.m_lastPos = null;
    t.isTouch = false;
    t.imgs = [];
    t.m_index = 0;
    t.m_tempData = [];
    t.lastBubble = null;
    t.newBubble = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FruitsGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FruitsGameUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    for (var o = 0; o < 6; o++) {
      var i = this.contentPane.getChild("fruits" + o).asLoader;
      this.fruits.push(i);
      this.initPos.push(cc.v2(i.x, i.y));
      i.onClick(this.onClickFruits.bind(this, o), this);
    }
    this.points = [];
    for (o = 0; o < 12; o++) {
      i = this.contentPane.getChild("point" + o);
      this.points.push(cc.v2(i.x, i.y));
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "fruits/fruitsPrefab", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.touch = i.getChildByName("touch");
        t.chats = [];
        for (var n = 0; n < 3; n++) {
          var a = i.getChildByName("chats").getChildByName("chatItem" + n);
          t.chats.push(a);
          a.active = false;
        }
        t.hand = t.contentPane.getChild("hand").asLoader;
        t.handPos = cc.v2(t.hand.x, t.hand.y);
        r_ResSystem.ResSystem.loadBundleRes("game1", "fruits/shouzhi", cc.Prefab, function (e, o) {
          r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
          var i = cc.instantiate(o);
          t.hand.node.addChild(i);
          i.active = true;
          t.shouzhi = i.getComponent(sp.Skeleton);
          t.restart();
        });
      }
    });
    this.labDesc = this.contentPane.getChild("labDesc").asLabel;
    this.groupFruits = this.contentPane.getChild("groupFruits").asGroup;
    this.img0 = this.contentPane.getChild("img0").asLoader;
    this.img1 = this.contentPane.getChild("img1").asLoader;
    this.img0.onClick(this.onClcikImg.bind(this, 0), this);
    this.img1.onClick(this.onClcikImg.bind(this, 1), this);
    this.labPrice = this.contentPane.getChild("labPrice").asTextField;
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnTransaction = this.contentPane.getChild("btnTransaction").asButton;
    this.btnTransaction.onClick(this.onClcickGameOver, this);
    this.groupFruitsRou = this.contentPane.getChild("groupFruitsRou").asImage;
    this.groupPos = cc.v2(this.groupFruitsRou.x, this.groupFruitsRou.y);
  };
  _ctor.prototype.restart = function () {
    this.isTouch = false;
    this.isMove = false;
    this.groupFruits.visible = false;
    this.img0.alpha = 1;
    this.img1.alpha = 1;
    this.img0.visible = true;
    this.img1.visible = true;
    this.imgs = [];
    this.m_index = 0;
    this.price = 0;
    this.labPrice.text = "0";
    this.btnTransaction.visible = false;
    this.labDesc.text = "滑动切开榴莲";
    this.groupFruitsRou.x = this.groupPos.x;
    this.groupFruitsRou.y = this.groupPos.y;
    if (this.touch) {
      var e = r_UtilsSystem.UtilsSystem.randomPercentFromArray(this.data.pr).id;
      this.data.random = r_FruitsCfg.FruitsRandomCfg[e].pr;
      this.touch.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      this.touch.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
      this.hand.x = this.handPos.x;
      this.hand.y = this.handPos.y;
      this.m_tempStep = 0;
      this.chats.forEach(function (e) {
        e.active = false;
      });
      this.runStep();
    }
  };
  _ctor.prototype.runStep = function () {
    this.m_tempStep < 6 && this.slicingFrits();
  };
  _ctor.prototype.slicingFrits = function () {
    switch (this.m_tempStep) {
      case 0:
        this.step0();
        break;
      case 1:
        this.step1();
        break;
      case 2:
        this.step2();
        break;
      case 3:
        this.step3();
        break;
      case 4:
        this.step4();
        break;
      case 5:
        this.step5();
    }
  };
  _ctor.prototype.step0 = function () {
    var e = this;
    this.shouzhi.setAnimation(0, "step_1", true);
    this.shouzhi.node.active = true;
    this.fruits.forEach(function (t, o) {
      t.visible = true;
      t.scaleX = 1;
      t.scaleY = 1;
      t.x = e.initPos[o].x;
      t.y = e.initPos[o].y;
      t.url = "ui://Fruits/fruits_" + (5 == e.data.id ? 1 : 0) + "_" + o;
    });
    this.isMove = true;
  };
  _ctor.prototype.step1 = function () {
    this.shouzhi.setAnimation(0, "step_2", true);
    this.qieFrits(0);
  };
  _ctor.prototype.step2 = function () {
    this.isMove = true;
  };
  _ctor.prototype.step3 = function () {
    this.shouzhi.setAnimation(0, "step_3", true);
    this.qieFrits(1);
  };
  _ctor.prototype.step4 = function () {
    this.isMove = true;
  };
  _ctor.prototype.step5 = function () {
    this.shouzhi.node.active = false;
    this.qieFrits(2);
    this.isTouch = true;
    this.showShouzhi();
    this.labDesc.text = "点击果壳摘下果肉";
  };
  _ctor.prototype.qieFrits = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("qieFruits");
    var o = r_FruitsCfg.FruitsStepCfg[e];
    for (var i = 0; i < o.group.length; i++) {
      var n = this.fruits[o.group[i]].x + o.x;
      var a = this.fruits[o.group[i]].y + o.y;
      cc.tween(this.fruits[o.group[i]]).to(.5, {
        x: n,
        y: a
      }).start();
    }
    r_TimeSystem.TimeSystem.scheduleOnce("qieFrits", 1, function () {
      t.m_tempStep++;
      t.runStep();
    });
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.isMove && cc.Vec2.distance(this.m_lastPos, e.getLocation()) > 100) {
      this.m_lastPos = null;
      this.isMove = false;
      this.m_tempStep++;
      this.runStep();
    }
  };
  _ctor.prototype.showShouzhi = function () {
    var e = this.fruits.findIndex(function (e) {
      return e.visible;
    });
    this.shouzhi.node.active = -1 != e;
    this.shouzhi.setAnimation(0, "step_4", true);
    if (-1 != e) {
      this.hand.x = this.fruits[e].x;
      this.hand.y = this.fruits[e].y;
    }
  };
  _ctor.prototype.onTouch = function (e) {
    this.m_lastPos = e.getLocation();
  };
  _ctor.prototype.onClickFruits = function (e) {
    this.isTouch && (this.m_tempStep < 6 || (this.shouzhi.node.active = false, this.boFruits(e)));
  };
  _ctor.prototype.boFruits = function (e) {
    var t = this;
    this.isTouch = false;
    cc.tween(this.fruits[e]).to(.2, {
      scaleX: 0,
      scaleY: 0
    }).call(function () {
      t.fruits[e].visible = false;
      t.groupFruits.visible = true;
      t.groupFruits.scaleX = 0;
      t.groupFruits.scaleY = 0;
      t.setImg(e);
      cc.tween(t.groupFruits).to(.5, {
        scaleX: 1,
        scaleY: 1
      }).start();
    }).start();
  };
  _ctor.prototype.onClcikImg = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this["img" + e].visible = false;
    var o = new fgui.GLoader();
    o.url = this["img" + e].url;
    o.autoSize = true;
    o.setPivot(.5, 0, true);
    o.x = this["img" + e].x;
    o.y = this["img" + e].y;
    this.contentPane.addChild(o);
    this.imgs.push(o);
    cc.tween(o).to(.5, {
      x: this.points[this.m_index].x,
      y: this.points[this.m_index].y,
      scaleX: .7,
      scaleY: .7
    }).call(function () {
      t.m_tempData[e].isHave = false;
      t.addPrice(t.m_tempData[e].price);
      var o = r_FruitsCfg.FruitsBubble[t.m_tempData[e].data.type].length - 1;
      t.showBubble(r_FruitsCfg.FruitsBubble[t.m_tempData[e].data.type][r_UtilsSystem.UtilsSystem.getRandomNum(0, o)]);
      if (!t.checkHasFruitsRou()) {
        t.fruitsRouComplate();
        t.showShouzhi();
      }
    }).start();
    this.m_index++;
    this.m_index > 11 && (this.m_index = 0);
  };
  _ctor.prototype.setImg = function (e) {
    var t = this;
    this.m_tempData = [];
    this.setImgUrl(e, this.img0, 0);
    this.setImgUrl(e, this.img1, 1);
    this.checkHasFruitsRou() || r_TimeSystem.TimeSystem.scheduleOnce("checkHasFruitsRou", 1, function () {
      t.fruitsRouComplate();
      t.showShouzhi();
    });
  };
  _ctor.prototype.setImgUrl = function (e, t, o) {
    var i = r_FruitsCfg.FruitsPreCfg[this.data.random[e][o]];
    var n = r_UtilsSystem.UtilsSystem.randomPercentFromArray(i);
    if (0 != n.type) {
      t.visible = true;
      t.url = "ui://Fruits/fruitsRou_" + (5 == this.data.id ? 1 : 0) + "_" + n.type;
      this.m_tempData.push({
        isHave: true,
        price: this.data.price * r_FruitsCfg.FruitsCoeffCfg[n.type],
        data: n
      });
    } else {
      t.visible = false;
      this.m_tempData.push({
        isHave: false,
        price: this.data.price * r_FruitsCfg.FruitsCoeffCfg[n.type],
        data: n
      });
    }
  };
  _ctor.prototype.showBubble = function (e) {
    var t = this;
    this.m_tween && this.m_tween.stop();
    this.m_tween = null;
    this.chats.forEach(function (e) {
      e.active = false;
    });
    this.getRandomBubble();
    this.newBubble.active = true;
    this.newBubble.opacity = 255;
    this.newBubble.children[0].getComponent(cc.Label).string = e;
    this.m_tween = cc.tween(this.newBubble).delay(2).to(.3, {
      opacity: 0
    }).call(function () {
      t.newBubble.active = false;
    }).start();
  };
  _ctor.prototype.getRandomBubble = function () {
    var e = this;
    if (this.lastBubble) {
      var t = this.chats.filter(function (t) {
        return t != e.lastBubble;
      });
      this.newBubble = t[r_UtilsSystem.UtilsSystem.getRandomNum(0, 1)];
    } else {
      this.newBubble = this.chats[r_UtilsSystem.UtilsSystem.getRandomNum(0, 2)];
    }
    this.lastBubble = this.newBubble;
  };
  _ctor.prototype.fruitsRouComplate = function () {
    var e = this;
    this.groupFruits.visible = false;
    if (-1 == this.fruits.findIndex(function (e) {
      return e.visible;
    })) {
      cc.tween(this.groupFruitsRou).to(.2, {
        y: this.groupPos.y - 200
      }).call(function () {
        e.btnTransaction.visible = true;
      }).start();
      return void this.imgs.forEach(function (e) {
        var t = e.y - 200;
        cc.tween(e).to(.2, {
          y: t
        }).start();
      });
    }
    this.isTouch = true;
  };
  _ctor.prototype.checkHasFruitsRou = function () {
    return -1 != this.m_tempData.findIndex(function (e) {
      return e.isHave;
    });
  };
  _ctor.prototype.addPrice = function (e) {
    this.price += e;
    this.labPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.price);
  };
  _ctor.prototype.onClcickGameOver = function () {
    var e = JSON.parse(JSON.stringify(this.data));
    e.result = this.price;
    r_FruitsRsultUI.default.showUI(e);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.imgs.forEach(function (e) {
      e.dispose();
    });
    if (this.touch) {
      this.touch.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      this.touch.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    }
    this.imgs.length = 0;
    this.m_tween && this.m_tween.stop();
    this.m_tween = null;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.FruitsGameUI = exp_FruitsGameUI;