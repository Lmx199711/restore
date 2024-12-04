var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_HomeWawaCom = require("HomeWawaCom");
var r_HomeSystem = require("HomeSystem");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_FguiResSystem = require("FguiResSystem");
var def_HomeWawaUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Home, r_UIDef.UIDef.Res.UI.HomeWawaUI) || this;
    t.wawaCom = null;
    t.m_clickCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeWawaUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeWawaUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnLeft = this.contentPane.getChild("btnLeft").asButton;
    this.btnRight = this.contentPane.getChild("btnRight").asButton;
    this.btnStart = this.contentPane.getChild("btnStart").asButton;
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnRefesh = this.contentPane.getChild("btnRefesh").asButton;
    this.btnCaidan = this.contentPane.getChild("btnCaidan").asButton;
    this.imgCaidan = this.contentPane.getChild("imgCaidan");
    this.btnBack.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("game2", "home/homeWawaCom", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.wawaCom = i.getComponent(r_HomeWawaCom.default);
      t.contentPane.getChild("center").node.addChild(i);
      i.active = true;
      t.addEvent();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    cc.director.getPhysicsManager().enabled = true;
    _ctor.instace = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    cc.director.getPhysicsManager().enabled = false;
    _ctor.instace = null;
  };
  _ctor.prototype.restart = function () {
    this.wawaCom && this.wawaCom.restart();
    this.refreshStartNum();
    this.m_clickCount = 0;
  };
  _ctor.prototype.addEvent = function () {
    this.btnLeft.on(fgui.Event.TOUCH_BEGIN, this.onClickLeftBegin, this);
    this.btnLeft.on(fgui.Event.TOUCH_END, this.onClickLeftEnd, this);
    this.btnRight.on(fgui.Event.TOUCH_BEGIN, this.onClickRightBegin, this);
    this.btnRight.on(fgui.Event.TOUCH_END, this.onClickRightEnd, this);
    this.btnCaidan.on(fgui.Event.TOUCH_END, this.onClickCaidan, this);
    this.btnRefesh.onClick(this.onClickRefresh, this);
    this.btnStart.onClick(this.onClickStart, this);
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
    this.imgCaidan && (this.imgCaidan.visible = 1 == r_PlayerData.PlayerData.data.wawaCaidan);
    this.btnCaidan && (this.btnCaidan.visible = 1 != r_PlayerData.PlayerData.data.wawaCaidan);
  };
  _ctor.prototype.refreshStartNum = function () {
    this.btnStart.getController("c1").selectedIndex = r_HomeSystem.HomeSystem.checkPlayDay() ? 1 : 0;
  };
  _ctor.prototype.onClickLeftBegin = function () {
    this.wawaCom.makeLeft();
  };
  _ctor.prototype.onClickLeftEnd = function () {
    this.wawaCom.makeStop();
  };
  _ctor.prototype.onClickRightBegin = function () {
    this.wawaCom.makeRight();
  };
  _ctor.prototype.onClickRightEnd = function () {
    this.wawaCom.makeStop();
  };
  _ctor.prototype.onClickStart = function () {
    var e = this;
    if (this.wawaCom.isTouch) {
      if (r_HomeSystem.HomeSystem.checkPlayDay()) {
        r_PlatformSystem.PlatformSystem.showVideo("看视频夹娃娃", function () {
          e.wawaCom.makeStart();
          e.refreshStartNum();
        });
      } else {
        r_HomeSystem.HomeSystem.savePlayDay();
        this.wawaCom.makeStart();
        this.refreshStartNum();
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("目前不可以操作");
    }
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    if (this.wawaCom.isTouch) {
      r_PlatformSystem.PlatformSystem.showVideo("刷新娃娃机", function () {
        r_HomeSystem.HomeSystem.initWawaList();
        e.wawaCom.refreshItem();
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("目前不可以刷新");
    }
  };
  _ctor.prototype.onClickCaidan = function () {
    this.m_clickCount++;
    if (3 == this.m_clickCount && 0 == r_PlayerData.PlayerData.data.wawaCaidan) {
      r_PlayerData.PlayerData.data.wawaCaidan = 1;
      r_PlayerData.PlayerData.saveData();
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_HomeWawaUI;