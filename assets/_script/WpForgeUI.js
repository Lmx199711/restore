var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WpForgeUI = undefined;
var s;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_Tip2BtnAdUI = require("Tip2BtnAdUI");
var r_Tip2BtnUI = require("Tip2BtnUI");
var r_WpForgeResUI = require("WpForgeResUI");
(function (e) {
  e[e.None = 0] = "None";
  e[e.Make = 1] = "Make";
  e[e.Hammer = 2] = "Hammer";
  e[e.Water = 3] = "Water";
})(s || (s = {}));
var C = s.None;
var exp_WpForgeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpForgeUI) || this;
    t.info = null;
    t.prefabNode = null;
    t.passTime = 0;
    t.hasInit = false;
    t.tNode = null;
    t.loop = false;
    t.runMakeCursor = false;
    t.runMakeBars = true;
    t.bar_blue = null;
    t.bar_red = null;
    t.txtTemprature = null;
    t.starHeight = 60;
    t.speedGrow = 10;
    t.bar1Height = 0;
    t.moveSpeed = 40;
    t.makeStep = 10;
    t.minBar1Yellow = 30;
    t.makeResSpeed = 10;
    t.forgeState = 2;
    t.spine1Forge = null;
    t.spine1Action = null;
    t.spine2Action = null;
    t.spine3Water = null;
    t.hammerInCD = false;
    t.bar2Runing = true;
    t.bar2Width = 0;
    t.minValue = 0;
    t.maxValue = 100;
    t.prefix = 1;
    t.prefixCursor = 1;
    t.hasHammerTime = 0;
    t.fator = 2;
    t.aniNode = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.WpForgeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WpForgeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.trunBack, this);
    this.btnJump0.onClick(this.jump0, this);
    this.btnJump1.onClick(this.jump1, this);
    this.stage = this.contentPane.getController("stage");
    this.tempState = this.contentPane.getController("tempState");
    this.resState = this.contentPane.getController("resState");
    this.loadPrefab();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.aniNode = null;
    r_TimeSystem.TimeSystem.unregistUpdate(this);
  };
  _ctor.prototype.loadPrefab = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "forge", cc.Prefab, function (t, o) {
      if (t) {
        cc.warn("资源都没有啊 哥");
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.prefabNode = cc.instantiate(o);
        e.prefabNode.parent = e.hang.node;
        e.spine1Forge = e.prefabNode.getChildByName("0").getChildByName("luzi").getComponent(sp.Skeleton);
        e.spine1Action = e.prefabNode.getChildByName("0").getChildByName("shanzi").getComponent(sp.Skeleton);
        e.spine2Action = e.prefabNode.getChildByName("1").getChildByName("chuizi").getComponent(sp.Skeleton);
        e.spine3Water = e.prefabNode.getChildByName("2").getChildByName("jian").getComponent(sp.Skeleton);
        e.prefabNode.x = 0;
        e.prefabNode.y = 0;
        e.tNode = e.prefabNode.getChildByName("touch");
        e.initAll();
        e.hasInit = true;
      }
    });
  };
  _ctor.prototype.registTouch = function () {
    this.unregistTouch();
    this.tNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.tNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.tNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.tNode.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.tNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.tNode.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
  };
  _ctor.prototype.onShown = function () {
    this.data && this.data.info && (this.info = this.data.info);
    this.hasInit && this.initAll();
  };
  _ctor.prototype.initAll = function () {
    if (this.data.begin && 3 == this.data.begin) {
      C = s.Water;
      this.changeToWaterState();
    } else {
      this.bar1.value = 50;
      this.bar1Height = this.bar1.height;
      this.resState.setSelectedPage("none");
      this.passTime = 0;
      this.progress.value = 0;
      this.cursor = this.bar2.getChild("cursor");
      this.sliderBlock = this.bar2.getChild("sliderBlock");
      this.bar_blue = this.bar1.getChild("blue");
      this.bar_red = this.bar1.getChild("red");
      this.starHeight = this.bar1Height - this.info.sizeFire;
      this.starHeight < 0 && (this.starHeight = 0);
      this.bar_blue.height = this.bar_red.height = this.starHeight;
      this.speedGrow = this.info.speedGrow;
      this.registTouch();
      this.txtTemprature = this.bar1.getChild("txtNum");
      this.loop = true;
      this.runMakeBars = true;
      this.runMakeCursor = true;
      r_TimeSystem.TimeSystem.registUpdate(this, this.update.bind(this));
      this.bar2.value = 50;
      this.bar2Width = this.bar2.width;
      this.sliderBlock.getChild("png").width = this.info.sizeSlid;
      this.minValue = this.bar2.max * (this.info.sizeSlid / 2 / this.bar2Width);
      this.maxValue = this.bar2.max - this.minValue;
      this.hasHammerTime = 0;
      this.prefix = 1;
      C = s.Make;
      this.refreshScene();
    }
  };
  _ctor.prototype.touchStart = function () {};
  _ctor.prototype.touchMove = function () {};
  _ctor.prototype.touchEnd = function () {
    if (this.loop) {
      if (C == s.Make) {
        this.ActionMake();
      } else {
        C == s.Hammer && (this.hammerInCD || this.ActionHammer());
      }
    }
  };
  _ctor.prototype.update = function (e) {
    if (this.loop) {
      this.passTime += e;
      if (C == s.Make) {
        if (this.runMakeBars) {
          this.bar_red.height += this.speedGrow * e;
          this.bar_blue.height += this.speedGrow * e;
          this.bar_blue.height >= this.bar1Height / 2 - this.minBar1Yellow && (this.runMakeBars = false);
        }
        if (this.bar1.value < this.bar_blue.height / this.bar1Height * 100) {
          this.setForgeState(1);
        } else if (this.bar1.value > 100 - this.bar_red.height / this.bar1Height * 100) {
          this.setForgeState(3);
        } else {
          this.setForgeState(2);
          if (this.progress.value < 100) {
            this.progress.value += this.makeResSpeed * e;
          } else {
            this.changeToHamState();
          }
        }
        if (this.runMakeCursor) {
          this.bar1.value > 0 && (this.bar1.value -= this.moveSpeed * e);
          this.txtTemprature.text = 100 + 10 * Math.ceil(this.bar1.value) + " C";
        }
        this.refreshTime();
      } else if (C == s.Hammer) {
        if (this.bar2Runing) {
          this.updateCursor(e);
          this.bar2.value += this.prefix * e * this.info.speedSlid;
          if (this.bar2.value <= this.minValue) {
            this.prefix = 1;
          } else {
            this.bar2.value >= this.maxValue && (this.prefix = -1);
          }
        }
        this.refreshTime();
      }
    }
  };
  _ctor.prototype.updateCursor = function (e) {
    this.cursor.x += this.prefixCursor * e * this.info.speedCursor;
    if (this.cursor.x <= 10) {
      this.prefixCursor = 1;
    } else {
      this.cursor.x >= this.bar2Width - 10 && (this.prefixCursor = -1);
    }
  };
  _ctor.prototype.refreshTime = function () {
    var e = this;
    var t = 0;
    if (C == s.Make) {
      t = this.info.timeFire - this.passTime;
    } else {
      C == s.Hammer && (t = this.info.timeHam - this.passTime);
    }
    this.timeCom.getChild("time").text = Math.ceil(t) + "";
    if (t < 0) {
      this.loop = false;
      C = s.None;
      this.resState.selectedIndex = 2;
      r_Tip2BtnAdUI.Tip2BtnAdUI.showUI({
        closeCallback: function () {
          e.exitForge();
        },
        okCallback: function () {
          r_WeaponSystem.WeaponSystem.GetWeaponRecipe(e.data.info.id);
          e.exitForge();
        }
      });
    }
  };
  _ctor.prototype.ActionHammer = function () {
    var e = this;
    var t = this.sliderBlock.x - this.info.sizeSlid / 2;
    var o = this.sliderBlock.x + this.info.sizeSlid / 2;
    if (this.cursor.x > t && this.cursor.x < o) {
      this.spine2Action.setAnimation(0, "step_1", false);
      this.sliderBlock.getController("colorState").selectedIndex = 1;
      r_TimeSystem.TimeSystem.scheduleOnce("delayToAddBar2Val", .35, function () {
        e.hasHammerTime++;
        if (e.hasHammerTime < e.info.countHam) {
          e.progress.value = 100 / e.info.countHam * e.hasHammerTime;
          e.cursor.x = Math.random() * e.bar2Width + 10;
          e.prefixCursor = Math.random() > .5 ? 1 : -1;
        } else {
          e.progress.value = 100;
          e.resState.selectedIndex = 1;
          e.changeToWaterState();
        }
        r_SoundMgr.SoundMgr.playSound("forge/datie");
      });
    } else {
      cc.tween(this.cursor).by(.05, {
        x: -1 * this.fator,
        y: -1 * this.fator
      }).by(.05, {
        x: 2 * this.fator,
        y: 1 * this.fator
      }).by(.05, {
        x: -1 * this.fator,
        y: 1 * this.fator
      }).by(.05, {
        x: -1 * this.fator,
        y: -1 * this.fator
      }).by(.05, {
        x: 2 * this.fator,
        y: -1 * this.fator
      }).by(.05, {
        x: -2 * this.fator,
        y: 2 * this.fator
      }).by(.05, {
        x: 1 * this.fator,
        y: -1 * this.fator
      }).start();
      cc.tween(this.sliderBlock).by(.05, {
        x: -1 * this.fator,
        y: -1 * this.fator
      }).by(.05, {
        x: 2 * this.fator,
        y: 1 * this.fator
      }).by(.05, {
        x: -1 * this.fator,
        y: 1 * this.fator
      }).by(.05, {
        x: -1 * this.fator,
        y: -1 * this.fator
      }).by(.05, {
        x: 2 * this.fator,
        y: -1 * this.fator
      }).by(.05, {
        x: -2 * this.fator,
        y: 2 * this.fator
      }).by(.05, {
        x: 1 * this.fator,
        y: -1 * this.fator
      }).start();
    }
    this.hammerInCD = true;
    this.bar2Runing = false;
    r_TimeSystem.TimeSystem.scheduleOnce("hameInCD", .58, function () {
      return e.hammerInCD = false;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("bar2Runing", .48, function () {
      e.sliderBlock.getController("colorState").selectedIndex = 0;
      e.bar2Runing = true;
    });
  };
  _ctor.prototype.ActionMake = function () {
    var e = this;
    this.spine1Action.setAnimation(0, "animation", false);
    r_SoundMgr.SoundMgr.playSound("forge/shanfeng");
    if (!(this.bar1.value > 99)) {
      this.runMakeCursor = false;
      var t = this.bar1.value;
      var o = 100 - this.bar1.value;
      var i = Math.min(o, 30) / 300;
      r_TimeSystem.TimeSystem.clearTimeMapUpdate("moveToTop");
      r_TimeSystem.TimeSystem.timeMapUpdate("moveToTop", i, function (o) {
        e.bar1.value = t + e.makeStep * o;
        e.runMakeCursor = true;
      });
    }
  };
  _ctor.prototype.setForgeState = function (e) {
    if (this.forgeState != e) {
      this.spine1Forge.setAnimation(0, "huo_" + e, true);
      this.forgeState = e;
      this.tempState.selectedIndex = e - 1;
    }
  };
  _ctor.prototype.trunBack = function () {
    var e = this;
    if (!(C != s.Make && C != s.Hammer)) {
      this.loop = false;
      r_Tip2BtnUI.Tip2BtnUI.showUI({
        title: "是否继续返回？",
        desc: "返回后锻造材料不退还",
        closeCallback: function () {
          e.loop = true;
        },
        okCallback: function () {
          e.exitForge();
        }
      });
    }
  };
  _ctor.prototype.exitForge = function () {
    this.hide();
  };
  _ctor.prototype.changeToHamState = function () {
    var e = this;
    C = s.None;
    this.resState.selectedIndex = 1;
    r_TimeSystem.TimeSystem.scheduleOnce("ffsfsgkkk", 1, function () {
      e.resState.selectedIndex = 0;
      e.passTime = 0;
      C = s.Hammer;
      e.progress.value = 0;
      e.refreshScene();
    });
  };
  _ctor.prototype.changeToWaterState = function () {
    var e = this;
    C = s.None;
    this.loop = false;
    r_TimeSystem.TimeSystem.scheduleOnce("finishHammerToNext", 1, function () {
      e.changeToWater();
    });
    this.info.showAnim && r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", this.info.showAnim, cc.Prefab, function (t, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
      e.aniNode = cc.instantiate(o);
      e.aniNode.active = false;
      e.aniNode.name = "hhh";
      e.aniNode.parent = e.prefabNode;
      e.aniNode.x = 0;
      e.aniNode.y = 0;
    });
  };
  _ctor.prototype.changeToWater = function () {
    var e = this;
    C = s.Water;
    this.resState.selectedIndex = 0;
    this.refreshScene();
    this.spine3Water.setSkin(this.info.skinName);
    this.spine3Water.setAnimation(0, "animation", false);
    r_WeaponSystem.WeaponSystem.forgeWeapon(this.info.id);
    r_TimeSystem.TimeSystem.scheduleOnce("waitFinishWater", 2.5, function () {
      if (e.aniNode) {
        var t = e.aniNode.getComponent(sp.Skeleton);
        e.aniNode.active = true;
        t.setCompleteListener(function () {
          e.aniNode.destroy();
          e.aniNode = null;
          e.hide();
          r_WpForgeResUI.WpForgeResUI.showUI({
            info: e.info
          });
        });
        t.setAnimation(0, "animation", false);
      } else {
        e.hide();
        r_WpForgeResUI.WpForgeResUI.showUI({
          info: e.info
        });
      }
    });
  };
  _ctor.prototype.showBg2 = function (e) {
    undefined === e && (e = true);
    this.prefabNode.getChildByName("bg2").active = e;
    e && (this.prefabNode.getChildByName("bg2").color = cc.color(255, 255, 255));
  };
  _ctor.prototype.refreshScene = function (e) {
    switch (e || C) {
      case s.Make:
        this.prefabNode.getChildByName("0").active = true;
        this.stage.selectedIndex = 0;
        this.prefabNode.getChildByName("1").active = false;
        this.prefabNode.getChildByName("2").active = false;
        this.showBg2(false);
        break;
      case s.Hammer:
        this.prefabNode.getChildByName("0").active = false;
        this.prefabNode.getChildByName("1").active = true;
        this.stage.selectedIndex = 1;
        this.prefabNode.getChildByName("2").active = false;
        this.showBg2(true);
        break;
      case s.Water:
        this.prefabNode.getChildByName("0").active = false;
        this.prefabNode.getChildByName("1").active = false;
        this.prefabNode.getChildByName("2").active = true;
        this.stage.selectedIndex = 2;
        this.showBg2(true);
        this.prefabNode.getChildByName("bg2").color = cc.color(51, 51, 51);
        break;
      case s.None:
    }
  };
  _ctor.prototype.jump0 = function () {
    var e = this;
    if (C == s.Make) {
      this.loop = false;
      r_PlatformSystem.PlatformSystem.showVideo("锻造跳过扇风", function () {
        r_TimeSystem.TimeSystem.clearTimeMapUpdate("moveToTop");
        e.bar1.value = 50;
        e.tempState.selectedIndex = 1;
        var t = 100 - e.progress.value;
        var o = .1 + .1 * Math.floor(t / 20);
        cc.log("value:" + t + ",time:" + o);
        cc.tween(e.progress).to(o, {
          value: 100
        }).call(function () {
          e.changeToHamState();
          e.loop = true;
        }).start();
      }, function () {
        e.loop = true;
      });
    }
  };
  _ctor.prototype.jump1 = function () {
    var e = this;
    if (C == s.Hammer) {
      this.loop = false;
      r_PlatformSystem.PlatformSystem.showVideo("锻造跳过锤炼", function () {
        r_TimeSystem.TimeSystem.clearTimeMapUpdate("delayToAddBar2Val");
        var t = 100 - e.progress.value;
        var o = .1 + .1 * Math.floor(t / 20);
        cc.log("value:" + t + ",time:" + o);
        cc.tween(e.progress).to(o, {
          value: 100
        }).call(function () {
          e.loop = false;
          e.changeToWaterState();
        }).start();
      }, function () {
        e.loop = true;
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bar1")], _ctor.prototype, "bar1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bar2")], _ctor.prototype, "bar2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("progress")], _ctor.prototype, "progress", undefined);
  __decorate([r_DecorateFunction1.AutoFind("timeCom")], _ctor.prototype, "timeCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnJump0")], _ctor.prototype, "btnJump0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnJump1")], _ctor.prototype, "btnJump1", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WpForgeUI = exp_WpForgeUI;