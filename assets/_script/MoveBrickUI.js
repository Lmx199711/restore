var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveBrickUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_AnimSystem = require("AnimSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var exp_MoveBrickUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MoveBrick, r_UIDef.UIDef.Res.UI.MoveBrickUI) || this;
    t.uiType = "fullScreen";
    t.addCoinNum = 500;
    t.autoMakeTime = 300;
    t.makeOneTime = .3;
    t.moveAnimTime = 1.75;
    t.sourecBrickList = [];
    t.targetList = [];
    t.maxNum = 8;
    t.equipList = [];
    t.equip1List = [];
    t.equip2List = [];
    t.autoLeftTime = 0;
    t.curIndex = 0;
    t.curMultiple = 1;
    t.isPlayAnim = false;
    t.isAutoMake = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MoveBrickUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MoveBrickUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.btnEquip = this.contentPane.getChild("btnEquip").asButton;
    this.btnEquip.onClick(this.onClickEquip, this);
    this.btnAuto = this.contentPane.getChild("btnAuto").asButton;
    this.btnAuto.onClick(this.onClickAuto, this);
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnDouble.onClick(this.onClickDouble, this);
    this.multipleNode = this.btnDouble.getChild("num").asLoader;
    this.videoNode = this.btnDouble.getChild("n4");
    this.maxNode = this.btnDouble.getChild("over");
    this.maxNode.node.active = false;
    this.leftTimeCom = this.contentPane.getChild("leftTimeCom");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/moveBrick/moveBrick", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.restart();
    });
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    if (this.isAutoMake) {
      var e = 0;
      for (var t = 0; t < 1e3 && !(this.curIndex >= 8 && (e += 1, this.autoLeftTime = this.autoLeftTime - this.moveAnimTime, this.autoLeftTime < 0)) && (this.curIndex = this.curIndex + 1, this.autoLeftTime = this.autoLeftTime - this.makeOneTime, !(this.autoLeftTime < 0)); t++) {
        ;
      }
      var o = e * this.addCoinNum * this.curMultiple;
      r_PlayerData.PlayerData.addCoin("自动打螺丝", o, r_ReportSystem.SystemKey.电子厂);
      this.isAutoMake = false;
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("movebrickBGM");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("MoveBrickAutoMake");
  };
  _ctor.prototype.secondUpdate = function () {
    if (this.isAutoMake) {
      this.autoLeftTime = this.autoLeftTime - 1;
      this.setAutoTime();
      if (this.autoLeftTime <= 0) {
        r_TimeSystem.TimeSystem.unregistSecondUpdate("MoveBrickAutoMake");
        this.btnAuto.visible = true;
        this.btnEquip.visible = true;
        this.isAutoMake = false;
        this.leftTimeCom.visible = false;
      }
    }
  };
  _ctor.prototype.reFreshDoubeBtn = function () {
    var e = 2 * this.curMultiple;
    if (this.curMultiple >= 32) {
      e = this.curMultiple;
      this.maxNode.node.active = true;
      this.videoNode.node.active = false;
      this.btnDouble.getController("c1").selectedIndex = 1;
      this.btnDouble.enable = false;
    } else {
      this.maxNode.node.active = false;
      this.videoNode.node.active = true;
      this.btnDouble.getController("c1").selectedIndex = 0;
      this.btnDouble.enable = true;
    }
    var t = fairygui.UIPackage.getItemURL(r_UIDef.UIDef.Pack.MoveBrick, "收益x" + e);
    this.multipleNode.url = t;
  };
  _ctor.prototype.setAutoTime = function () {
    this.leftTimeCom.getChild("time").text = this.getTimeForm(this.autoLeftTime);
  };
  _ctor.prototype.getTimeForm = function (e) {
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t > 10 ? "" + t : "0" + t) + "_" + (o > 10 ? "" + o : "0" + o);
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    this.curMultiple >= 32 || r_PlatformSystem.PlatformSystem.showVideo("双倍", function () {
      e.curMultiple *= 2;
      r_PlayerData.PlayerData.data.moveBrickMap.curMultiple = e.curMultiple;
      r_PlayerData.PlayerData.saveData();
      e.reFreshDoubeBtn();
    });
  };
  _ctor.prototype.onClickAuto = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("自动打螺丝", function () {
      e.btnAuto.visible = false;
      e.btnEquip.visible = false;
      e.isAutoMake = true;
      e.autoLeftTime = e.autoMakeTime;
      e.leftTimeCom.visible = true;
      e.setAutoTime();
      r_TimeSystem.TimeSystem.registSecondUpdate("MoveBrickAutoMake", e.secondUpdate.bind(e));
      e.onClickEquip();
    });
  };
  _ctor.prototype.onClickEquip = function () {
    var e = this;
    if (this.prefab) {
      console.log("onClickEquip");
      if (!this.isPlayAnim) {
        r_SoundMgr.SoundMgr.playSound("pinzhuang");
        this.isPlayAnim = true;
        cc.tween(this.sourecBrickList[this.curIndex]).delay(.1).call(function () {
          e.sourecBrickList[e.curIndex].active = false;
          e.playeMovebrickAnim("banz");
        }).start();
        r_SoundMgr.SoundMgr.playSound("liushuixian");
      }
    }
  };
  _ctor.prototype.playeMovebrickAnim = function (e, t) {
    var o = this;
    var i = this.prefab.getChildByName("person");
    i.active = true;
    i.getComponent(sp.Skeleton).timeScale = 1;
    this.isAutoMake && (i.getComponent(sp.Skeleton).timeScale = 2);
    i.getComponent(sp.Skeleton).loop = false;
    var n = i.getComponent(sp.Skeleton).setAnimation(0, e, false);
    i.getComponent(sp.Skeleton).setTrackCompleteListener(n, function () {
      t && t();
      o.playeDaiJiAnim();
      o.targetList[o.curIndex].active = true;
      o.isPlayAnim = false;
      o.curIndex = o.curIndex + 1;
      if (o.curIndex == o.maxNum) {
        o.playMoveAnim();
      } else {
        o.isAutoMake && o.onClickEquip();
      }
    });
  };
  _ctor.prototype.playeDaiJiAnim = function () {
    var e = this.prefab.getChildByName("person");
    e.active = true;
    e.getComponent(sp.Skeleton).timeScale = 1;
    e.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
    e.getComponent(sp.Skeleton).loop = true;
  };
  _ctor.prototype.playMoveAnim = function () {
    var e = this;
    this.isPlayAnim = true;
    this.playeDaiJiAnim();
    r_PlayerData.PlayerData.addCoin("打螺丝", this.addCoinNum * this.curMultiple, r_ReportSystem.SystemKey.电子厂, false);
    r_SoundMgr.SoundMgr.playSound("liushuixian");
    var t = this.prefab.getChildByName("car");
    t.getPosition();
    cc.tween(t).to(this.moveAnimTime - 1, {
      y: -2e3
    }).call(function () {
      e.playBrickAnim();
      r_UtilsSystem.UtilsSystem.showTip("获得金币" + r_UtilsSystem.UtilsSystem.getShowCoin(e.addCoinNum * e.curMultiple));
      r_AnimSystem.AnimSystem.playCoinAnim(e.prefab.getChildByName("phoneRoot"));
    }).start();
  };
  _ctor.prototype.playBrickAnim = function () {
    var e = this;
    this.showTargetBrick(false);
    this.showSourecBrick(true);
    var t = this.prefab.getChildByName("car");
    var o = new cc.Vec3(0, 0, 0);
    o.x = this.targetBrickPos.x + 1e3;
    o.y = this.targetBrickPos.y + 100;
    o.z = this.targetBrickPos.z;
    t.setPosition(o);
    t.angle = -90;
    cc.tween(t).to(.5, {
      position: new cc.Vec3(this.targetBrickPos.x, o.y, o.z)
    }).to(.1, {
      angle: 0
    }).to(.4, {
      position: this.targetBrickPos
    }).start();
    var i = this.prefab.getChildByName("brick");
    var n = new cc.Vec3(0, 0, 0);
    n.x = this.sourecBrickPos.x - 1e3;
    n.y = this.sourecBrickPos.y;
    n.z = this.sourecBrickPos.z;
    i.setPosition(n);
    cc.tween(i).to(1, {
      position: this.sourecBrickPos
    }).call(function () {
      e.curIndex = 0;
      e.isPlayAnim = false;
      e.isAutoMake && e.onClickEquip();
    }).start();
  };
  _ctor.prototype.restart = function () {
    if (this.prefab) {
      this.curIndex = 0;
      this.btnAuto.visible = true;
      this.btnEquip.visible = true;
      this.leftTimeCom.visible = false;
      this.isAutoMake = false;
      this.isPlayAnim = false;
      this.showTargetBrick(false);
      this.showSourecBrick();
      this.curMultiple = r_PlayerData.PlayerData.data.moveBrickMap.curMultiple;
      this.reFreshDoubeBtn();
      this.playeDaiJiAnim();
      var e = this.prefab.getChildByName("phoneRoot");
      e.x = 0;
      e.y = 0;
      var t = this.prefab.getChildByName("car");
      t.setPosition(this.targetBrickPos);
      t.angle = 0;
    }
  };
  _ctor.prototype.showTargetBrick = function (e) {
    undefined === e && (e = true);
    var t = this.prefab.getChildByName("car").getChildByName("target");
    this.targetBrickPos || (this.targetBrickPos = this.prefab.getChildByName("car").getPosition());
    this.prefab.getChildByName("car").setPosition(this.targetBrickPos);
    for (var o = 1; o <= this.maxNum; o++) {
      t.getChildByName(o + "").active = e;
      this.targetList[o - 1] || this.targetList.push(t.getChildByName(o + ""));
    }
  };
  _ctor.prototype.showSourecBrick = function (e) {
    undefined === e && (e = true);
    var t = this.prefab.getChildByName("brick");
    this.sourecBrickPos || (this.sourecBrickPos = t.getPosition());
    t.setPosition(this.sourecBrickPos);
    for (var o = 1; o <= this.maxNum; o++) {
      t.getChildByName("brick" + o).active = e;
      this.sourecBrickList[o - 1] || this.sourecBrickList.push(t.getChildByName("brick" + o));
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MoveBrickUI = exp_MoveBrickUI;