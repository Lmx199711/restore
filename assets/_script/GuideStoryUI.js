var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideStoryUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
var exp_GuideStoryUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Guide, r_UIDef.UIDef.Res.UI.GuideStoryUI) || this;
    t.car = null;
    t.carPos = null;
    t.carPos1 = null;
    t.carMsg = null;
    t.bgList = [];
    t.bgStartPosList = [];
    t.spineNodeList = [];
    t.msgNodeList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GuideStoryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GuideStoryUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.skipBtn = this.contentPane.getChild("btnSkip").asButton;
    this.skipBtn.onClick(this.clickSkipStory, this);
    this.btnStartGame = this.contentPane.getChild("btnStartGame").asButton;
    this.btnStartGame.node.opacity = 0;
    this.btnStartGame.onClick(this.onClickStartGame, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/story/story", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.initStoryData();
      t.restart();
    });
  };
  _ctor.prototype.initStoryData = function () {
    for (var e = 1; e <= 7; e++) {
      this.bgList[e - 1] = this.prefab.getChildByName("bg" + e);
      this.bgStartPosList[e - 1] = this.bgList[e - 1].getPosition();
      this.spineNodeList[e - 1] = this.bgList[e - 1].getChildByName("node1").getChildByName("effect");
      this.bgList[e - 1].getChildByName("node1").getChildByName("msg").active = false;
    }
    this.car = this.spineNodeList[0];
    this.carPos = this.bgList[0].getChildByName("node1").getChildByName("pos");
    this.carPos1 = this.bgList[0].getChildByName("node1").getChildByName("pos1");
    this.carMsg = this.car.getChildByName("msg");
    this.carMsg.active = false;
  };
  _ctor.prototype.restart = function () {
    this.initNodePosition();
    this.playStory(0);
  };
  _ctor.prototype.initNodePosition = function () {
    for (var e = 1; e <= 7; e++) {
      this.bgList[e - 1].active = true;
      var t = -1e3;
      if (e % 2 == 0) {
        t = 1e3;
        if (6 == e) {
          t = 0;
          this.bgList[e - 1].active = false;
        }
      }
      7 == e && (t = 1e3);
      this.bgList[e - 1].setPosition(this.bgList[e - 1].getPosition().x + t, this.bgList[e - 1].getPosition().y);
    }
    this.car.setPosition(this.car.getPosition().x - 1e3, this.car.getPosition().y);
    this.btnStartGame.node.opacity = 0;
    this.skipBtn.node.active = true;
  };
  _ctor.prototype.clickSkipStory = function () {
    var e = this;
    for (var t = 1; t <= 7; t++) {
      this.bgList[t - 1].stopAllActions();
      this.bgList[t - 1].opacity = 255;
      this.bgList[t - 1].active = true;
      this.bgList[t - 1].setPosition(this.bgStartPosList[t - 1]);
      this.car.setPosition(this.carPos1.getPosition());
      this.bgList[t - 1].getChildByName("node1").getChildByName("msg").active = true;
      this.carMsg.active = true;
      this.stopSpineAnim(this.spineNodeList[t - 1]);
    }
    this.skipBtn.enabled = false;
    setTimeout(function () {
      r_PlayerData.PlayerData.data.guideIndex = 0;
      e.hide();
      e.skipBtn.enabled = true;
    }, 1e3);
  };
  _ctor.prototype.onClickStartGame = function () {
    for (var e = 1; e <= 7; e++) {
      this.bgList[e - 1].stopAllActions();
      this.stopSpineAnim(this.spineNodeList[e - 1]);
    }
    r_PlayerData.PlayerData.data.guideIndex = 0;
    this.hide();
  };
  _ctor.prototype.playStory = function (e) {
    var t = this;
    if (e > 6) {
      console.log("完成");
      this.skipBtn.node.active = false;
      return void cc.tween(this.btnStartGame.node).repeat(3, cc.tween(this.btnStartGame).to(.3, {
        opacity: 255
      }, {
        easing: "sineOutIn"
      }).to(.3, {
        opacity: 0
      }, {
        easing: "sineOutIn"
      })).call(function () {
        t.btnStartGame.node.opacity = 255;
      }).start();
    }
    if (0 == e) {
      this.playeSpineAnim(this.car, "animation", function () {}, true);
      cc.tween(this.bgList[0]).to(1, {
        x: this.bgStartPosList[0].x
      }).start();
      cc.tween(this.car).to(1, {
        x: this.carPos.getPosition().x
      }).call(function () {
        t.carMsg.active = true;
      }).to(1, {
        x: this.carPos1.getPosition().x
      }).call(function () {
        t.stopSpineAnim(t.car);
        t.playStory(e + 1);
      }).start();
    } else if (1 == e || 2 == e) {
      cc.tween(this.bgList[e]).to(1, {
        x: this.bgStartPosList[e].x
      }).call(function () {
        t.playeSpineAnim(t.spineNodeList[e], "animation", function () {
          t.playStory(e + 1);
        });
      }).start();
    } else if (3 == e) {
      cc.tween(this.bgList[e]).to(1, {
        x: this.bgStartPosList[e].x
      }).call(function () {
        t.playeSpineAnim(t.spineNodeList[e], "animation", function () {
          t.bgList[e].getChildByName("node1").getChildByName("msg").active = true;
          t.playStory(e + 1);
        });
      }).start();
    } else if (4 == e) {
      cc.tween(this.bgList[e]).to(1, {
        x: this.bgStartPosList[e].x
      }).call(function () {
        t.playeSpineAnim(t.spineNodeList[e], "huishou", function () {
          t.bgList[e].getChildByName("node1").getChildByName("msg").active = true;
          t.playeSpineAnim(t.spineNodeList[e], "huishou2");
        });
      }).delay(3.5).call(function () {
        t.playStory(e + 1);
      }).start();
    } else if (5 == e) {
      this.bgList[e].active = true;
      this.bgList[e].opacity = 0;
      cc.tween(this.bgList[e]).to(.5, {
        opacity: 255
      }).call(function () {
        t.playeSpineAnim(t.spineNodeList[e], "huishou3", function () {});
      }).delay(.5).call(function () {
        t.playStory(e + 1);
      }).start();
    } else {
      6 == e && cc.tween(this.bgList[e]).to(1, {
        x: this.bgStartPosList[e].x
      }).call(function () {
        t.playeSpineAnim(t.spineNodeList[e], "huishou4", function () {
          t.bgList[e].getChildByName("node1").getChildByName("msg").active = true;
        });
      }).delay(1.5).call(function () {
        t.playStory(e + 1);
      }).start();
    }
  };
  _ctor.prototype.playeSpineAnim = function (e, t, o, i) {
    undefined === i && (i = false);
    e.getComponent(sp.Skeleton).timeScale = 1;
    e.getComponent(sp.Skeleton).loop = i;
    e.getComponent(sp.Skeleton).paused = false;
    var n = e.getComponent(sp.Skeleton).setAnimation(0, t, i);
    o && e.getComponent(sp.Skeleton).setTrackCompleteListener(n, function () {
      o();
    });
  };
  _ctor.prototype.stopSpineAnim = function (e) {
    e.getComponent(sp.Skeleton).paused = true;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.prefab && this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.GuideStoryUI = exp_GuideStoryUI;