var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostessUI2 = undefined;
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_ResSystem = require("ResSystem");
var r_HostnessCfg = require("HostnessCfg");
var r_SoundMgr = require("SoundMgr");
var r_TimeSystem = require("TimeSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_PlatformSystem = require("PlatformSystem");
var r_HelpGrandResultUI = require("HelpGrandResultUI");
var r_VideoGameCfg = require("VideoGameCfg");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_VideoGameSystem = require("VideoGameSystem");
var I = "none";
var exp_HostessUI2 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.JumpFish, r_UIDef.UIDef.Res.UI.HostessUI2) || this;
    t.w = 0;
    t.h = 0;
    t.curIndex = 1;
    t.levelNode = null;
    t.lastId = "";
    t.levelId = 1;
    t.canChoose = false;
    t.flySpeed = .3;
    t.overDelay = 3e3;
    t.btns = [];
    t.curItems = ["x", "y", "z"];
    t.curSceneIndex = 0;
    t.curSceneName = "";
    t.curReason = "";
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HostessUI2, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HostessUI2);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.clickBack, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if (this.data) {
      this.info = r_VideoGameSystem.VideoGameSystem.getCfg(r_HostnessCfg.HostnessCfg, {
        id: this.data
      })[0];
      this.miniGameInfo = r_VideoGameSystem.VideoGameSystem.getCfg(r_VideoGameCfg.VideoGameCfg, {
        data: this.data
      })[0];
    }
    if (this.info) {
      if (this.lastId && this.lastId == this.info) {
        this.instanNode();
      } else {
        r_ResSystem.ResSystem.loadBundleRes("game1", this.info.path, cc.Prefab, function (e, o) {
          t.hostess = o;
          t.instanNode();
        });
      }
      this.info.flySpeed && (this.flySpeed = this.info.flySpeed);
      this.info.overDelay && (this.overDelay = this.info.overDelay);
      r_TYEventDispatcher.TYEventDispatcher.on("hostnessClick1", this.clickItem.bind(this, 1), this);
      r_TYEventDispatcher.TYEventDispatcher.on("hostnessClick2", this.clickItem.bind(this, 2), this);
      r_TYEventDispatcher.TYEventDispatcher.on("hostnessClick3", this.clickItem.bind(this, 3), this);
      r_TYEventDispatcher.TYEventDispatcher.on("hostChange1", this.change1, this);
      r_TYEventDispatcher.TYEventDispatcher.on("hostChange2", this.change2, this);
      r_TYEventDispatcher.TYEventDispatcher.on("hostChange3", this.change3, this);
    } else {
      cc.warn("-没有data，或id名错误");
    }
  };
  _ctor.prototype.clickBack = function () {
    if ("choose" == I || "locking" == I) {
      I = "none";
      this.hide();
    } else {
      cc.log("非选择状态，不能返回：" + I);
    }
  };
  _ctor.prototype.instanNode = function () {
    var e = cc.instantiate(this.hostess);
    e.active = true;
    this.contentPane.getChild("center").node.addChild(e);
    this.levelNode = e;
    this.w = this.levelNode.width;
    this.h = this.levelNode.height;
    if (!this.btns || this.btns.length < 1) {
      this.btns.push(this.levelNode.getChildByName("btns").getChildByName("btn1").getChildByName("item1"));
      this.btns.push(this.levelNode.getChildByName("btns").getChildByName("btn2").getChildByName("item2"));
      this.btns.push(this.levelNode.getChildByName("btns").getChildByName("btn3").getChildByName("item3"));
    }
    this.pngs = this.levelNode.getChildByName("items");
    this.fly = this.levelNode.getChildByName("fly");
    this.allScene = this.levelNode.getChildByName("allScene");
    this.ending = this.levelNode.getChildByName("ending");
    this.ending.active = false;
    this.ending.children.forEach(function (e) {
      return e.opacity = 0;
    });
    this.btnsNode = this.levelNode.getChildByName("btns");
    this.changeToScene(1);
    this.handleBtnBar("up");
    this.info.bgm && r_SoundMgr.SoundMgr.playMusic(this.info.bgm, true);
  };
  _ctor.prototype.onHide = function () {
    var t;
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm", true);
    r_TimeSystem.TimeSystem.scheduleClear("plyendsoud");
    r_TimeSystem.TimeSystem.scheduleClear("gotoNextHost");
    r_TYEventDispatcher.TYEventDispatcher.off("hostnessClick1", this.clickItem.bind(this, 1), this);
    r_TYEventDispatcher.TYEventDispatcher.off("hostnessClick2", this.clickItem.bind(this, 2), this);
    r_TYEventDispatcher.TYEventDispatcher.off("hostnessClick3", this.clickItem.bind(this, 3), this);
    r_TYEventDispatcher.TYEventDispatcher.off("hostChange1", this.change1, this);
    r_TYEventDispatcher.TYEventDispatcher.off("hostChange2", this.change2, this);
    r_TYEventDispatcher.TYEventDispatcher.off("hostChange3", this.change3, this);
    this.btns = [];
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    null === (t = this.levelNode) || undefined === t || t.destroy();
  };
  _ctor.prototype.clickItem = function (e) {
    var t = this;
    if (this.canChoose) {
      this.forbiddenBtn();
      cc.log("-你点击了选项:" + JSON.stringify(this.curScene.items[e - 1]));
      r_SoundMgr.SoundMgr.playSound("hostess2/点击");
      if (this.curScene.items[e - 1].reason) {
        this.curReason = this.curScene.items[e - 1].reason;
      } else {
        this.curReason = "";
      }
      var o = this.pngs.getChildByName(this.curItems[e - 1]);
      var i = this.curScene.items[e - 1];
      if (o) {
        var n = i.show;
        var a = 0;
        if (i.delayFly) {
          a = Number(i.delayFly);
          cc.log("延迟" + a);
        }
        i.show2 && this.showThings(n);
        if (i.flyTo) {
          var s;
          var r = this.allScene.getChildByName(this.curSceneName).getChildByName(i.flyTo);
          this.fly.getComponent(cc.Sprite).spriteFrame = o.getComponent(cc.Sprite).spriteFrame;
          s = this.btns[e - 1].convertToWorldSpaceAR(cc.Vec2.ZERO);
          this.levelNode.convertToNodeSpaceAR(s, s);
          var c = r.convertToWorldSpaceAR(cc.Vec2.ZERO);
          this.levelNode.convertToNodeSpaceAR(c, c);
          this.fly.x = s.x;
          this.fly.y = s.y;
          this.fly.active = true;
          var l = this.curSceneNode.getChildByName("flash" + i.flyTo);
          cc.tween(this.fly).delay(.1 + a).to(this.flySpeed, {
            x: c.x,
            y: c.y
          }).call(function () {
            l && cc.tween(l).to(.05, {
              opacity: 255
            }).to(.15, {
              opacity: 0
            }).start();
          }).delay(.2).call(function () {
            t.fly.active = false;
            if (i.event) {
              cc.log("选择后触发:" + i.event);
              if ("string" == typeof i.event) {
                r_BehaviorMgr.BehaviorMgr.trigger(i.event);
              } else {
                i.event instanceof Array && i.event.forEach(function (e) {
                  r_BehaviorMgr.BehaviorMgr.trigger(e);
                });
              }
            }
            var e = i.show2 || i.show;
            e && e.length > 0 && t.showThings(e);
            i.sound && i.sound.forEach(function (e) {
              r_SoundMgr.SoundMgr.playSound(e);
            });
          }).start();
        } else {
          setTimeout(function () {
            var e = i.show2 || i.show;
            e && e.length > 0 && t.showThings(e);
            i.sound && i.sound.forEach(function (e) {
              r_SoundMgr.SoundMgr.playSound(e);
            });
          }, 1e3);
        }
        r_TimeSystem.TimeSystem.scheduleOnce("gotoNextHost", 2, function () {
          t.curScene && t.curScene.endEvent && r_BehaviorMgr.BehaviorMgr.trigger(t.curScene.endEvent);
          t.next(i);
        });
      } else {
        cc.warn("图片集合里没有:" + this.curItems[e - 1]);
      }
    }
  };
  _ctor.prototype.afterFly = function () {};
  _ctor.prototype.next = function (e) {
    var t = e.turnTo;
    e.needKey && e.turnTo2 && (r_GameKeyMgr.GameKeyMgr.has(e.needKey) || (t = e.turnTo2));
    if ("number" == typeof t) {
      this.changeToScene(t);
    } else {
      "string" == typeof t && this.changeToEnding(t);
    }
  };
  _ctor.prototype.changeToScene = function (e) {
    var t = this;
    this.curSceneIndex = e;
    this.curScene = JSON.parse(JSON.stringify(this.info.scenes.find(function (t) {
      return t.id == e;
    })));
    this.curScene.sceneName && (this.curSceneName = this.curScene.sceneName);
    this.curScene.beginEvent && r_BehaviorMgr.BehaviorMgr.trigger(this.curScene.beginEvent);
    for (var o = 0; o < this.allScene.childrenCount; o++) {
      if (this.curSceneName == this.allScene.children[o].name) {
        this.curSceneNode = this.allScene.children[o];
        this.allScene.children[o].active = true;
      } else {
        "_bg" != this.allScene.children[o].name && (this.allScene.children[o].active = false);
      }
    }
    this.curScene.beginShow && this.showThings(this.curScene.beginShow);
    this.refreshBtn();
    if (this.curScene.lockVideo) {
      this.levelNode.width = 0;
      this.levelNode.height = 0;
      cc.tween(this.comContinue).to(.5, {
        alpha: 100
      }).call(function () {
        I = "locking";
      }).start();
    } else {
      setTimeout(function () {
        t.activeBtns();
      }, 800);
    }
  };
  _ctor.prototype.lockBack = function () {
    "locking" == I && this.hide();
  };
  _ctor.prototype.lockVideo = function () {
    var e = this;
    if ("locking" == I) {
      I = "anim";
      r_PlatformSystem.PlatformSystem.showVideo("场景剧情解锁-" + this.info.id, function () {
        e.continueGame();
      }, function () {
        I = "locking";
      });
    }
  };
  _ctor.prototype.hideWord = function () {};
  _ctor.prototype.continueGame = function () {
    var e = this;
    cc.tween(this.comContinue).to(.5, {
      alpha: 0
    }).call(function () {
      I = "choose";
      e.comContinue.visible = false;
      setTimeout(function () {
        e.activeBtns();
        e.levelNode.width = e.w;
        e.levelNode.height = e.h;
      }, 200);
    }).start();
  };
  _ctor.prototype.refreshBtn = function () {
    for (var e = 0; e < 3; e++) {
      this.curItems[e] = this.curScene.items[e].name;
      var t = this.pngs.getChildByName(this.curItems[e]).getComponent(cc.Sprite).spriteFrame;
      this.btns[e] && this.btns[e].getComponent(cc.Sprite) && (this.btns[e].getComponent(cc.Sprite).spriteFrame = t);
    }
  };
  _ctor.prototype.change1 = function () {
    this.curScene.items[0] = this.curScene.newItems[0];
    this.refreshBtn();
  };
  _ctor.prototype.change2 = function () {
    this.curScene.items[1] = this.curScene.newItems[1];
    this.refreshBtn();
  };
  _ctor.prototype.change3 = function () {
    this.curScene.items[2] = this.curScene.newItems[2];
    this.refreshBtn();
  };
  _ctor.prototype.changeToEnding = function (e) {
    var t = this;
    cc.log("changeToEnding->str:" + e);
    this.hideWord();
    this.ending.active = true;
    var o = this.ending.getChildByName(e);
    var i = this.overDelay;
    if (o) {
      cc.log("有结束图");
      cc.tween(o).to(1, {
        opacity: 255
      }).start();
    } else {
      cc.log("没有结束图");
      i = 100;
    }
    this.handleBtnBar("down");
    this.playEndSound(e);
    if (this.info.defeat.includes(e)) {
      setTimeout(function () {
        t.gameOver(false, e);
      }, i);
    } else {
      setTimeout(function () {
        t.gameOver(true, e);
      }, i);
    }
  };
  _ctor.prototype.playEndSound = function (e) {
    var t = this;
    this.info.endSound[e] && r_TimeSystem.TimeSystem.scheduleOnce("plyendsoud", 1, function () {
      r_SoundMgr.SoundMgr.playSound(t.info.endSound[e]);
    });
  };
  _ctor.prototype.showThings = function (e) {
    for (var t = 0; t < e.length; t++) {
      e[t] && this._showThing(e[t]);
    }
  };
  _ctor.prototype._showThing = function (e) {
    var t = e.split("-");
    var o = this.curSceneNode.getChildByName(t[0]);
    for (var i = 1; i < t.length; i++) {
      var n = o;
      var a = t[i];
      o = o.getChildByName(a);
      if (o) {
        n.active = true;
      }
    }
    o.active = true;
    o.parent.children.forEach(function (e) {
      e.name != o.name && "_bg" != e.name && (e.active = false);
    });
  };
  _ctor.prototype.findNode = function (e) {
    var t = e.split("-");
    var o = this.curSceneNode.getChildByName(t[0]);
    for (var i = 1; i < t.length; i++) {
      var n = t[i];
      o = o.getChildByName(n);
    }
    return o;
  };
  _ctor.prototype.gameOver = function (e) {
    var t = this;
    cc.tween(this.node).delay(1.5).call(function () {
      if (e) {
        console.log("胜利");
        r_SoundMgr.SoundMgr.playSound("hostess/胜利");
        r_HelpGrandResultUI.HelpGrandResultUI.showUI({
          reward: t.miniGameInfo.reward,
          title: t.info.title,
          type: "success"
        });
      } else {
        console.log("失败");
        r_SoundMgr.SoundMgr.playSound("hostess/失败");
      }
      t.hide();
    }).start();
  };
  _ctor.prototype.hide = function () {
    e.prototype.hide.call(this);
  };
  _ctor.prototype.handleBtnBar = function (e) {
    if (this.btnsNode) {
      if ("up" == e) {
        cc.tween(this.btnsNode).to(.5, {
          y: -460
        }).start();
      } else {
        cc.tween(this.btnsNode).to(.5, {
          y: -1350
        }).start();
      }
    }
  };
  _ctor.prototype.forbiddenBtn = function () {
    var e = this;
    this.canChoose = false;
    I = "anim";
    this.btns[0].parent.getComponent(cc.Button).enabled = false;
    this.btns[1].parent.getComponent(cc.Button).enabled = false;
    this.btns[2].parent.getComponent(cc.Button).enabled = false;
    setTimeout(function () {
      e.hideWord();
    }, 800);
  };
  _ctor.prototype.activeBtns = function () {
    this.canChoose = true;
    I = "choose";
    this.btns[0].parent.getComponent(cc.Button).enabled = true;
    this.btns[1].parent.getComponent(cc.Button).enabled = true;
    this.btns[2].parent.getComponent(cc.Button).enabled = true;
  };
  __decorate([r_DecorateFunction1.AutoFind("iconBg")], _ctor.prototype, "iconBg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("comContinue")], _ctor.prototype, "comContinue", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.HostessUI2 = exp_HostessUI2;