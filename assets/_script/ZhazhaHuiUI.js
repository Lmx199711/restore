var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiGestureSys = require("FguiGestureSys");
var r_PoolSystem = require("PoolSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ZhazhaHuiSystem = require("ZhazhaHuiSystem");
var r_ZhazhaHuiCfg = require("ZhazhaHuiCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ZhazhaHuiTipUI = require("ZhazhaHuiTipUI");
var def_ZhazhaHuiUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ZhazhaHui, r_UIDef.UIDef.Res.UI.ZhazhaHuiUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.m_pos0 = cc.v2();
    t.m_pos1 = cc.v2();
    t.isOnce = true;
    t.m_propList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "mode", {
    get: function () {
      return this.contentPane.getController("mode").selectedIndex;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ZhazhaHuiUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ZhazhaHuiUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ZhazhaHuiProp1, "ui://ZhazhaHui/prop1", 1, this.modeDropPorp0);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ZhazhaHuiProp2, "ui://ZhazhaHui/prop2", 1, this.modeDropPorp0);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ZhazhaHuiProp3, "ui://ZhazhaHui/prop3", 1, this.modeDropPorp0);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ZhazhaHuiProp4, "ui://ZhazhaHui/prop4", 1, this.modeDropPorp1);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.ZhazhaHuiProp5, "ui://ZhazhaHui/prop5", 1, this.modeDropPorp0);
    this.contentPane.getController("mode").selectedIndex = 1;
    this.m_pos1 = cc.v2(this.role.x, this.role.y);
    this.contentPane.getController("mode").selectedIndex = 0;
    this.m_pos0 = cc.v2(this.role.x, this.role.y);
    this.bindBtnCallback(this.zhu, this.niu, this.boss, this.btnLeft, this.btnRight, this.nvren);
    this.bubble.enabled = false;
    this.bubble.grayed = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    this.m_propList.forEach(function (e) {
      r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem["ZhazhaHuiProp" + e.data.id], e);
    });
    this.m_propList = [];
    r_TimeSystem.TimeSystem.scheduleClearAll();
  };
  _ctor.prototype.restart = function () {
    this.isOnce = true;
    this.m_propList.forEach(function (e) {
      r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem["ZhazhaHuiProp" + e.data.id], e);
    });
    this.m_propList = [];
    r_TimeSystem.TimeSystem.scheduleClearAll();
    this.m_propList = [];
    this.contentPane.getController("mode").selectedIndex = 0;
    this.contentPane.getTransition("init").play();
    this.role.init(this.m_pos0, this.m_pos1);
    this.zhu.init(0, cc.v2(this.pos1.x, this.pos1.y));
    this.niu.init(1, cc.v2(this.pos2.x, this.pos2.y));
    this.boss.init(2, cc.v2(this.pos3.x, this.pos3.y));
    this.nvren.init(cc.v2(this.pos4.x, this.pos4.y));
    r_UtilsSystem.UtilsSystem.playAnim(this.nvren, "daiji", true);
    this.gameStart();
  };
  _ctor.prototype.onClickzhu = function () {
    _ref__ctor.isChanged && this.onAtatackMonster(this.zhu);
  };
  _ctor.prototype.onClickniu = function () {
    _ref__ctor.isChanged && this.onAtatackMonster(this.niu);
  };
  _ctor.prototype.onClickboss = function () {
    _ref__ctor.isChanged && this.onAtatackMonster(this.boss);
  };
  _ctor.prototype.onClicknvren = function () {
    _ref__ctor.isChanged && (this.nvren.isDie || r_ZhazhaHuiSystem.ZhazhaHuiSystem.checkCanUp() || this.onAtatackMonster(this.nvren));
  };
  _ctor.prototype.gameStart = function () {
    this.contentPane.getController("mode").selectedIndex = 0;
  };
  _ctor.prototype.showChat = function () {};
  _ctor.prototype.onAtatackMonster = function (e) {
    this.role.attack(e);
  };
  _ctor.prototype.onDropProp = function (e, t, i) {
    var n = this;
    var a = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem["ZhazhaHuiProp" + e]);
    a.x = i.x;
    a.y = i.y;
    cc.tween(a).to(.5, {
      x: t.x,
      y: t.y
    }).call(function () {
      a.data = r_ZhazhaHuiCfg.ZhazhaHuiPropCfg[e];
      if (e <= 3) {
        r_FguiGestureSys.FguiGestureSys.bindMoveEvent("ZhazhahuiProp" + _ref__ctor.m_id++, a, a, n.role, n.gosub.bind(n, a), null, true);
      } else if (4 == e) {
        r_FguiGestureSys.FguiGestureSys.bindMoveEvent("ZhazhahuiProp" + _ref__ctor.m_id++, a, a, n.nvren, n.gosub.bind(n, a), null, true);
      } else {
        5 == e && a.onClick(n.gosub.bind(n, a), n);
      }
      n.m_propList.push(a);
    }).start();
  };
  _ctor.prototype.gosub = function (e) {
    var t = this;
    var o = e.data;
    switch (o.type) {
      case 0:
        if (r_ZhazhaHuiSystem.ZhazhaHuiSystem.checkCanUp()) {
          if (Math.random() <= o.pr) {
            this.role.upLevel();
          } else {
            this.role.downLevel();
          }
        } else {
          r_UtilsSystem.UtilsSystem.showTip("已升至满级");
        }
        break;
      case 1:
        this.nvren.revive();
        this.role.setBubble("复活吧我的爱人");
        r_TimeSystem.TimeSystem.scheduleOnce("zhazhahuiGameOver", 4, function () {
          r_ZhazhaHuiTipUI.default.showUI({
            index: 2
          });
        });
        break;
      case 2:
        return void r_ZhazhaHuiTipUI.default.showUI({
          index: 0,
          openChest: function () {
            e.clearClick();
            t.openChest(e, o);
          }
        });
    }
    this.m_propList.splice(this.m_propList.findIndex(function (t) {
      return e == t;
    }), 1);
    r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem["ZhazhaHuiProp" + o.id], e);
  };
  _ctor.prototype.openChest = function (e, t) {
    var i = this;
    var n = [];
    for (var a = 0; a < t.pr.length; a++) {
      var s = r_UtilsSystem.UtilsSystem.randomPercentFromArray(t.pr).id;
      n.push(s);
    }
    var l = cc.v2(this.centerPos.x, this.centerPos.y);
    r_ZhazhaHuiSystem.ZhazhaHuiSystem.isHasChest = false;
    n.forEach(function (e, n) {
      var a = cc.v2(t.dorpPos[n].x + i.centerPos.x, t.dorpPos[n].y + i.centerPos.y);
      var s = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem["ZhazhaHuiProp" + e]);
      s.x = l.x;
      s.y = l.y;
      s.data = r_ZhazhaHuiCfg.ZhazhaHuiPropCfg[e];
      cc.tween(s).to(.5, {
        x: a.x,
        y: a.y
      }).call(function () {
        r_FguiGestureSys.FguiGestureSys.bindMoveEvent("ZhazhahuiProp" + _ref__ctor.m_id++, s, s, i.role, i.gosub.bind(i, s), null, true);
        i.m_propList.push(s);
      }).start();
    });
    this.m_propList.splice(this.m_propList.findIndex(function (t) {
      return e == t;
    }), 1);
    r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem["ZhazhaHuiProp" + t.id], e);
  };
  _ctor.prototype.onClickbtnLeft = function () {
    if (_ref__ctor.isChanged) {
      this.contentPane.getController("mode").selectedIndex = 1;
      if (this.isOnce) {
        this.contentPane.getTransition("sos").play();
        this.isOnce = false;
      }
      this.role.x = this.m_pos1.x;
      this.role.y = this.m_pos1.y;
    }
  };
  _ctor.prototype.onClickbtnRight = function () {
    _ref__ctor.isChanged && (this.contentPane.getController("mode").selectedIndex = 0);
  };
  _ctor.prototype.checkFightWin = function () {};
  _ctor.prototype.fightLose = function () {};
  _ctor.prototype.killSelf = function () {
    this.lose();
  };
  _ctor.prototype.lose = function () {};
  _ctor.prototype.fightWin = function () {};
  _ctor.prototype.killMonter = function () {};
  _ctor.prototype.dorpProp = function () {
    this.dropItem(null);
  };
  _ctor.prototype.dropItem = function () {};
  _ctor.isChanged = true;
  _ctor.m_id = 0;
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("niu")], _ctor.prototype, "niu", undefined);
  __decorate([r_DecorateFunction1.AutoFind("zhu")], _ctor.prototype, "zhu", undefined);
  __decorate([r_DecorateFunction1.AutoFind("boss")], _ctor.prototype, "boss", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLeft")], _ctor.prototype, "btnLeft", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("modeDropPorp0")], _ctor.prototype, "modeDropPorp0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("modeDropPorp1")], _ctor.prototype, "modeDropPorp1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("nvren")], _ctor.prototype, "nvren", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pos1")], _ctor.prototype, "pos1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pos2")], _ctor.prototype, "pos2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pos3")], _ctor.prototype, "pos3", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pos4")], _ctor.prototype, "pos4", undefined);
  __decorate([r_DecorateFunction1.AutoFind("centerPos")], _ctor.prototype, "centerPos", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble")], _ctor.prototype, "bubble", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_ZhazhaHuiUI;