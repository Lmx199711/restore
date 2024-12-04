var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiledGameUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_EraseCom = require("EraseCom");
var r_FIeldTipUI = require("FIeldTipUI");
var r_CommonFunc = require("CommonFunc");
var r_SoundMgr = require("SoundMgr");
var r_FiledCfg = require("FiledCfg");
var r_ResSystem = require("ResSystem");
var exp_FiledGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Field, r_UIDef.UIDef.Res.UI.FiledGameUI) || this;
    t.uiType = "fullScreen";
    t.isUpdate = false;
    t.m_clearList = [];
    t.m_checkList = [];
    t.m_openWinList = [];
    t.lastShowFlag = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_coefficient = e.coeff;
    this.show(r_UIDef.UIDef.Urls.UI.FiledGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FiledGameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.config = r_FiledCfg.FiledGameConfig;
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    this.isUpdate = false;
    this.contentPane.visible = false;
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("filedBgm");
    this.m_clearList = [];
    this.m_checkList = [];
    this.m_openWinList = [];
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/field/prefab/fieldMap" + this.data.random, cc.Prefab, function (e, o) {
      t.contentPane.visible = true;
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.content = t.prefab.getChildByName("content");
      t.prefab.getChildByName("touch").on(cc.Node.EventType.TOUCH_START, t.onBgTouchStart, t);
      t.eraseCom.startClean();
      t.isUpdate = true;
    });
  };
  _ctor.prototype.cleanSuccess = function (e) {
    if (!(this.content.childrenCount <= e)) {
      this.m_clearList.includes(e) || this.m_clearList.push(e);
      console.log("挖到东西了：", e);
      var o = this.content.children[e];
      var i = this.config[o.name.split("_")[0]];
      i.price = parseInt(o.name.split("_")[1]) * _ctor.m_coefficient;
      if (!(0 != i.clearType || this.m_checkList.includes(e))) {
        this.m_checkList.push(e);
        this.setEvents(i, o);
      }
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {};
  _ctor.prototype.onBgTouchStart = function (e) {
    e.stopPropagation();
    var t = e.getLocation();
    for (var o = 0; o < this.content.childrenCount; o++) {
      var i = this.content.children[o];
      r_CommonFunc.checkTouchNode(t, i) && this.onclickItem(o);
    }
  };
  _ctor.prototype.onclickItem = function (e) {
    var o = e;
    console.log("点击触发事件：", o);
    if (this.m_clearList.includes(o)) {
      var i = this.content.children[o];
      var n = this.config[i.name.split("_")[0]];
      n.price = parseInt(i.name.split("_")[1]) * _ctor.m_coefficient;
      if (!(1 != n.clearType || this.m_checkList.includes(o))) {
        this.m_checkList.push(o);
        this.setEvents(n, i);
      }
    }
  };
  _ctor.prototype.setEvents = function (e, t) {
    var o = this;
    var i = parseInt(t.name.split("_")[0]);
    this.eraseCom.stopClean();
    switch (i) {
      case 1:
        if (n = t.getComponent(sp.Skeleton)) {
          n.setAnimation(0, "baozha", true);
          cc.tween(t).delay(1).call(function () {
            o.oepnTipUI(e);
          }, this).start();
        }
        break;
      case 2:
        if (n = t.getComponent(sp.Skeleton)) {
          n.setAnimation(0, "chuxian", false);
          this.prefab.getChildByName("touch").off(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
          r_SoundMgr.SoundMgr.playSound("growl");
          cc.tween(t).delay(2).call(function () {
            n.setAnimation(0, "daiji", true);
          }).delay(1).call(function () {
            n.node.removeFromParent();
            o.prefab.addChild(n.node);
            o.prefab.children.forEach(function (e) {
              e.active = false;
            });
            n.node.active = true;
            o.oepnTipUI(e);
          }).start();
        }
        break;
      case 3:
        var n;
        (n = this.prefab.getChildByName("baozha").getComponent(sp.Skeleton)).node.active = true;
        n.setAnimation(0, "animation", false);
        r_SoundMgr.SoundMgr.playSound("boom");
        this.prefab.getChildByName("touch").off(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
        cc.tween(t).delay(1.6).call(function () {
          o.oepnTipUI(e);
          o.prefab.active = false;
        }).start();
        break;
      case 9:
        t.getChildByName("node0").active = false;
        t.getChildByName("node1").active = true;
        cc.tween(this.prefab).delay(.5).call(function () {
          o.oepnTipUI(e);
        }).start();
        break;
      default:
        if (1 == e.clearType) {
          this.oepnTipUI(e);
        } else {
          cc.tween(this.prefab).delay(.5).call(function () {
            o.oepnTipUI(e);
          }).start();
        }
    }
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
    if (this.isUpdate) {
      if (!r_FIeldTipUI.FIeldTipUI.showFlag && this.m_openWinList.length > 0) {
        console.log("this.m_openWinList", this.m_openWinList);
        r_FIeldTipUI.FIeldTipUI.showUI(this.m_openWinList[0]);
        this.m_openWinList.splice(0, 1);
        this.prefab.getChildByName("touch").active = false;
        this.eraseCom && this.eraseCom.stopClean();
      }
      if (this.lastShowFlag && !r_FIeldTipUI.FIeldTipUI.showFlag) {
        this.prefab.getChildByName("touch").active = true;
        this.eraseCom && this.eraseCom.touchArea && (this.eraseCom.touchArea.active = true);
      }
      this.lastShowFlag = r_FIeldTipUI.FIeldTipUI.showFlag;
    }
  };
  _ctor.prototype.oepnTipUI = function (e) {
    this.m_openWinList.includes(e) || this.m_openWinList.push(e);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    this.m_openWinList = [];
    this.prefab.getChildByName("touch").off(cc.Node.EventType.TOUCH_START, this.onBgTouchStart, this);
    this.eraseCom.cleanSuccessCallBack = null;
    this.eraseCom.cleanAllSuccessCallBack = null;
    this.eraseCom.stopClean();
    this.prefab.destroy();
  };
  _ctor.m_coefficient = 1;
  return _ctor;
}(r_TYIndex.UIWind);
exports.FiledGameUI = exp_FiledGameUI;