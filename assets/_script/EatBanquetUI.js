var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EatBanquetUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_BanquetDownUI = require("BanquetDownUI");
var r_BanquetCfg = require("BanquetCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_BanquetEndUI = require("BanquetEndUI");
var r_SoundMgr = require("SoundMgr");
var exp_EatBanquetUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Banquet, r_UIDef.UIDef.Res.UI.EatBanquetUI) || this;
    t.uiType = "fullScreen";
    t.nodeList = [];
    t.abandonList = [];
    t.isStart = false;
    t.time = 0;
    t.freshTime = 0;
    t.getTime1 = 0;
    t.getTime2 = 0;
    t.getTime3 = 0;
    t.get1_speed = 0;
    t.get2_speed = 0;
    t.get3_speed = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EatBanquetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EatBanquetUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.desk = this.contentPane.getChild("desk").asGraph;
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.toDown = this.contentPane.getChild("toDown");
    this.toDown.onClick(this.onClickDown, this);
    this.pos1 = this.contentPane.getChild("otherAnim1").node;
    this.pos1.name = "anim_1";
    this.pos2 = this.contentPane.getChild("otherAnim2").node;
    this.pos2.name = "anim_2";
    this.pos3 = this.contentPane.getChild("otherAnim3").node;
    this.pos3.name = "anim_3";
    this.anim = this.contentPane.getChild("anim").asCom;
    this.timeText = this.contentPane.getChild("time").asTextField;
    this.btnStart = this.contentPane.getChild("btnStart").asButton;
    this.btnStart.onClick(this.onClickStart, this);
    this.my_group = this.contentPane.getChild("group").asGroup;
    this.pos1_pos = this.desk.node.convertToNodeSpaceAR(this.pos1.convertToWorldSpaceAR(cc.v2(0, 0)));
    this.pos2_pos = this.desk.node.convertToNodeSpaceAR(this.pos2.convertToWorldSpaceAR(cc.v2(0, 0)));
    this.pos3_pos = this.desk.node.convertToNodeSpaceAR(this.pos3.convertToWorldSpaceAR(cc.v2(0, 0)));
    this.myPos_pos = this.desk.node.convertToNodeSpaceAR(this.contentPane.getChild("meAnim").node.convertToWorldSpaceAR(cc.v2(0, 0)));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {
    r_SoundMgr.SoundMgr.playMusic("banquet/进入酒桌后bgm");
    this.contentPane.getChild("n27").visible = "high" == this.data;
    if (this.isDown) {
      this.isDown = false;
      this.clearAllAbandonFood();
      this.reBindClick();
    } else {
      this.initGame();
    }
  };
  _ctor.prototype.initGame = function () {
    var e = this;
    this.my_group.visible = false;
    this.clearAllFood();
    this.isPause = false;
    this.isStart = false;
    this.isDown = false;
    this.setIconVisible(true);
    this.time = 0;
    this.freshTime = 0;
    this.getTime1 = 0;
    this.getTime2 = 0;
    this.getTime3 = 0;
    this.get1_speed = 0;
    this.get2_speed = 0;
    this.get3_speed = 0;
    this.priceList = {
      anim_1: {
        count: 0,
        price: 0
      },
      anim_2: {
        count: 0,
        price: 0
      },
      anim_3: {
        count: 0,
        price: 0
      },
      anim_me: {
        count: 0,
        price: 0
      }
    };
    this.levelType = this.data ? this.data : "normal";
    this.baseCfg = r_BanquetCfg.BanquetBaseCfg[this.levelType];
    this.gameCfg = r_BanquetCfg.BanquetGameCfg[this.levelType];
    this.gameTime = this.gameCfg.gameTime;
    this.nodeList = [];
    for (var t = 0; t < this.gameCfg.initNum; t++) {
      this.createWhiteSprite();
    }
    this.PlayAnim(this.anim, this.baseCfg.anim_1, true, true);
    this.timeText.text = "剩余时间：" + this.gameTime.toString();
    this.timer = setInterval(function () {
      e.isStart && !e.isPause && e.playSound();
    }, 4e3);
  };
  _ctor.prototype.onUpdate = function (e) {
    this.timeText && (this.timeText.visible = this.isStart && this.gameTime > 0);
    if (this.isStart) {
      this.time += e;
      if (this.time >= 1) {
        this.time--;
        if (this.gameTime > 0) {
          this.gameTime--;
          this.timeText.text = "剩余时间：" + this.gameTime.toString();
          if (this.gameTime <= 0) {
            this.showLastFood();
            this.timeText.visible = false;
            this.gameTime = 0;
            this.get1_speed = 0;
            this.get2_speed = 0;
            this.get3_speed = 0;
            this.isPause = true;
          }
        }
        if (this.pauseTime > 0) {
          this.pauseTime--;
          if (this.pauseTime <= 0) {
            this.isPause = false;
            this.PlayAnim(this.anim, this.baseCfg.anim_2, true, true);
            this.anim.visible = true;
            this.playSound();
          }
        }
      }
      this.gaming_1(e);
      this.gaming_2(e);
    }
  };
  _ctor.prototype.randomPointInEllipse = function (e, t) {
    var o = Math.random() * Math.PI * 2;
    var i = Math.random() * e * Math.cos(o);
    var n = Math.random() * t * Math.sin(o);
    return cc.v2(i, n);
  };
  _ctor.prototype.createWhiteSprite = function () {
    var e = this;
    var t = r_BanquetCfg.BanquetFoodCfg[Math.floor(Math.random() * r_BanquetCfg.BanquetFoodCfg.length)];
    r_ResSystem.ResSystem.loadImg(t.icon, function (o) {
      if (o) {
        var i = o.node;
        i.name = t.name;
        i.price = t.price * e.baseCfg.multiply;
        i.setScale(1.5);
        e.desk.node.addChild(i);
        i.setPosition(e.randomPointInEllipse(e.desk.width / 2, e.desk.height / 2));
        i.on(cc.Node.EventType.TOUCH_START, e.onClickNode, e);
        e.nodeList.push(i);
      }
    });
  };
  _ctor.prototype.onClickNode = function (e, t) {
    var o = this;
    if (this.isStart) {
      var i = e.target ? e.target : e;
      i.off(cc.Node.EventType.TOUCH_START, this.onClickNode, this);
      var n = this.nodeList.indexOf(i);
      -1 != n && this.nodeList.splice(n, 1);
      this.abandonList.push(i);
      if (!t) {
        console.log("点击了" + i.name);
        this.priceList.anim_me.price += i.price;
        this.priceList.anim_me.count++;
        this.contentPane.getChild("me").asCom.getChild("title").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.priceList.anim_me.price);
      }
      var a = t || this.contentPane.getChild("meAnim").node;
      var s = a.convertToNodeSpaceAR(i.convertToWorldSpaceAR(cc.v2(0, 0)));
      i.parent = a;
      i.setPosition(s);
      cc.tween(i).to(.1, {
        x: 0,
        y: 0,
        scale: .5
      }).call(function () {
        o.abandonList.splice(o.abandonList.indexOf(i), 1);
        i.destroy();
      }).start();
    }
  };
  _ctor.prototype.onClickLastNode = function (e, t, o) {
    var i = o ? this.desk.node.convertToNodeSpaceAR(o.convertToWorldSpaceAR(cc.v2(0, 0))) : this.myPos_pos;
    var n = i.sub(e.getPosition()).normalize();
    n.mulSelf(Math.floor(Math.random() * r_BanquetCfg.BanquetOtherCfg.lastFoodMoveUnit) + 1);
    var a = e.getPosition().add(n);
    e.setPosition(a);
    if (e.getPosition().sub(i).mag() < 10) {
      if (o) {
        this.priceList[o.name].price += e.price;
        this.priceList[o.name].count++;
      } else {
        this.priceList.anim_me.price += e.price;
        this.priceList.anim_me.count++;
      }
      this.isStart = false;
      e.destroy();
      this.last_node = null;
      clearInterval(this.timer);
      r_SoundMgr.SoundMgr.stopSound("banquet/压轴菜争抢");
      r_BanquetEndUI.BanquetEndUI.showUI({
        priceList: this.priceList,
        levelType: this.levelType
      });
    }
  };
  _ctor.prototype.onClickAnim1 = function () {
    if (this.nodeList.length > 0) {
      var e = this.nodeList[Math.floor(Math.random() * this.nodeList.length)];
      e.emit(cc.Node.EventType.TOUCH_START, e, this.pos1);
      this.priceList.anim_1.price += e.price;
      this.priceList.anim_1.count++;
      this.contentPane.getChild("other1").asCom.getChild("title").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.priceList.anim_1.price);
    }
  };
  _ctor.prototype.onClickAnim2 = function () {
    if (this.nodeList.length > 0) {
      var e = this.nodeList[Math.floor(Math.random() * this.nodeList.length)];
      e.emit(cc.Node.EventType.TOUCH_START, e, this.pos2);
      this.priceList.anim_2.price += e.price;
      this.priceList.anim_2.count++;
      this.contentPane.getChild("other2").asCom.getChild("title").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.priceList.anim_2.price);
    }
  };
  _ctor.prototype.onClickAnim3 = function () {
    if (this.nodeList.length > 0) {
      var e = this.nodeList[Math.floor(Math.random() * this.nodeList.length)];
      e.emit(cc.Node.EventType.TOUCH_START, e, this.pos3);
      this.priceList.anim_3.price += e.price;
      this.priceList.anim_3.count++;
      this.contentPane.getChild("other3").asCom.getChild("title").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.priceList.anim_3.price);
    }
  };
  _ctor.prototype.onClickDown = function () {
    if (!this.isPause) {
      this.isDown = true;
      r_BanquetDownUI.BanquetDownUI.showUI(this.levelType);
    }
  };
  _ctor.prototype.PlayAnim = function (e, t, o, i) {
    e.loop = o;
    e.animationName = t;
    e.playing = i;
  };
  _ctor.prototype.onClickStart = function () {
    this.isStart = true;
    this.PlayAnim(this.anim, this.baseCfg.anim_2, true, true);
    this.setIconVisible(false);
    r_SoundMgr.SoundMgr.playSound("banquet/" + this.levelType);
  };
  _ctor.prototype.setIconVisible = function (e) {
    this.btnStart.visible = e;
    this.contentPane.getChild("me").visible = !e;
    this.contentPane.getChild("me").asCom.getController("c1").selectedIndex = 1;
    this.contentPane.getChild("other1").visible = !e;
    this.contentPane.getChild("other2").visible = !e;
    this.contentPane.getChild("other3").visible = "high" == this.levelType && !e;
    this.contentPane.getChild("other1").asCom.getChild("title").text = "0";
    this.contentPane.getChild("other2").asCom.getChild("title").text = "0";
    this.contentPane.getChild("other3").asCom.getChild("title").text = "0";
    this.contentPane.getChild("me").asCom.getChild("title").text = "0";
  };
  _ctor.prototype.gaming_1 = function (e) {
    if (!(this.gameTime <= 0)) {
      this.freshTime += e;
      if (Math.random() * this.gameCfg.freshTime < this.freshTime) {
        this.freshTime = 0;
        for (var t = 0; t < this.gameCfg.freshNum; t++) {
          this.createWhiteSprite();
        }
      }
      if (!(this.isPause || this.pauseTime > 0)) {
        this.getTime1 += e;
        this.getTime2 += e;
        this.getTime3 += e;
        this.get1_speed || (this.get1_speed = Math.random() * (this.gameCfg.npcSlowSpeed - this.gameCfg.npcFastSpeed) + this.gameCfg.npcFastSpeed);
        this.get2_speed || (this.get2_speed = Math.random() * (this.gameCfg.npcSlowSpeed - this.gameCfg.npcFastSpeed) + this.gameCfg.npcFastSpeed);
        this.get3_speed || (this.get3_speed = Math.random() * (this.gameCfg.npcSlowSpeed - this.gameCfg.npcFastSpeed) + this.gameCfg.npcFastSpeed);
        if (this.nodeList.length > 0 && this.get1_speed < this.getTime1) {
          this.getTime1 = 0;
          this.onClickAnim1();
        }
        if (this.nodeList.length > 0 && this.get2_speed < this.getTime2) {
          this.getTime2 = 0;
          this.onClickAnim2();
        }
        if (this.nodeList.length > 0 && this.get3_speed < this.getTime3) {
          this.getTime3 = 0;
          "high" == this.levelType && this.onClickAnim3();
        }
      }
    }
  };
  _ctor.prototype.gaming_2 = function (e) {
    if (!(!this.isStart || !this.last_node || this.isPause || this.pauseTime > 0)) {
      this.getTime1 += e;
      this.getTime2 += e;
      this.getTime3 += e;
      this.get1_speed || (this.get1_speed = Math.random() * (this.gameCfg.npcSlowSpeed_last - this.gameCfg.npcFastSpeed_last) + this.gameCfg.npcFastSpeed_last);
      this.get2_speed || (this.get2_speed = Math.random() * (this.gameCfg.npcSlowSpeed_last - this.gameCfg.npcFastSpeed_last) + this.gameCfg.npcFastSpeed_last);
      this.get3_speed || (this.get3_speed = Math.random() * (this.gameCfg.npcSlowSpeed_last - this.gameCfg.npcFastSpeed_last) + this.gameCfg.npcFastSpeed_last);
      if (this.get1_speed < this.getTime1) {
        this.getTime1 = 0;
        this.last_node.emit(cc.Node.EventType.TOUCH_START, this.last_node, this.pos1);
      }
      if (this.get2_speed < this.getTime2) {
        this.getTime2 = 0;
        this.last_node.emit(cc.Node.EventType.TOUCH_START, this.last_node, this.pos2);
      }
      if (this.get3_speed < this.getTime3) {
        this.getTime3 = 0;
        "high" == this.levelType && this.last_node.emit(cc.Node.EventType.TOUCH_START, this.last_node, this.pos3);
      }
    }
  };
  _ctor.prototype.clearAllFood = function () {
    for (var e = 0; e < this.nodeList.length; e++) {
      var t = this.nodeList[e];
      t.off(cc.Node.EventType.TOUCH_START, this.onClickNode, this);
      t.destroy();
    }
    this.clearAllAbandonFood();
    if (this.last_node) {
      this.last_node.destroy();
      this.last_node = null;
    }
    this.nodeList = [];
  };
  _ctor.prototype.clearAllAbandonFood = function () {
    for (var e = 0; e < this.abandonList.length; e++) {
      this.abandonList[e].destroy();
    }
    this.abandonList = [];
  };
  _ctor.prototype.reBindClick = function () {
    for (var e = 0; e < this.nodeList.length; e++) {
      var t = this.nodeList[e];
      t.off(cc.Node.EventType.TOUCH_START, this.onClickNode, this);
      t.on(cc.Node.EventType.TOUCH_START, this.onClickNode, this);
    }
    if (this.last_node) {
      this.last_node.off(cc.Node.EventType.TOUCH_START);
      this.last_node.on(cc.Node.EventType.TOUCH_START, this.onClickLastNode.bind(this, this.last_node), this);
    }
  };
  _ctor.prototype.showLastFood = function () {
    var e = this;
    this.clearAllFood();
    r_SoundMgr.SoundMgr.stopSound("banquet/" + this.data);
    r_SoundMgr.SoundMgr.playSound("banquet/压轴菜出场");
    this.my_group.visible = true;
    this.contentPane.getTransition("t0").play();
    var t = r_BanquetCfg.BanquetFoodLastCfg[this.gameCfg.lastFood];
    this.contentPane.getChild("center").asLoader.url = t.url;
    setTimeout(function () {
      r_ResSystem.ResSystem.loadImg(t.icon, function (o) {
        if (o) {
          e.last_node = o.node;
          e.last_node.name = t.name;
          e.last_node.price = t.price * e.baseCfg.multiply;
          e.desk.node.addChild(e.last_node);
          var i = cc.v2(0, 0);
          var n = 3;
          i.addSelf(e.pos1_pos);
          i.addSelf(e.pos2_pos);
          i.addSelf(e.myPos_pos);
          if ("high" == e.levelType) {
            i.addSelf(e.pos3_pos);
            n++;
          }
          n > 0 && i.divSelf(n);
          e.last_node.setPosition(i);
          e.last_node.on(cc.Node.EventType.TOUCH_START, e.onClickLastNode.bind(e, e.last_node), e);
          e.isPause = false;
        }
        e.my_group.visible = false;
      });
    }, 2500);
  };
  _ctor.prototype.npcPause = function () {
    this.isPause = true;
    this.pauseTime = this.baseCfg.stopTime;
    this.anim.visible = false;
    this.PlayAnim(this.anim, this.baseCfg.anim_1, true, true);
    r_SoundMgr.SoundMgr.stopSound("banquet/" + this.levelType);
  };
  _ctor.prototype.playSound = function () {
    var e = this.levelType;
    if (this.last_node) {
      r_SoundMgr.SoundMgr.stopSound("banquet/压轴菜争抢");
      r_SoundMgr.SoundMgr.playSound("banquet/压轴菜争抢");
    } else {
      r_SoundMgr.SoundMgr.stopSound("banquet/" + e);
      r_SoundMgr.SoundMgr.playSound("banquet/" + e);
    }
  };
  _ctor.prototype.onClickBack = function () {
    r_SoundMgr.SoundMgr.playMusic("banquet/主界面bgm");
    clearInterval(this.timer);
    r_SoundMgr.SoundMgr.stopAllSound();
    this.hide();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.EatBanquetUI = exp_EatBanquetUI;