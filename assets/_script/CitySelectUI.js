var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_EntryCitySystem = require("EntryCitySystem");
var r_GroupSystem = require("GroupSystem");
var r_LimitSystem = require("LimitSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_MainHomeUI = require("MainHomeUI");
var def_CitySelectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CitySelect, r_UIDef.UIDef.Res.UI.CitySelectUI) || this;
    t.showAnimFlag = true;
    t.items = [];
    t.arr = [3, 0, 1, 2];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CitySelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CitySelectUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < this.arr.length; t++) {
      var o = this.arr[t];
      var i = this.contentPane.getChild("item" + t).asCom;
      this.items.push(i);
      i.getChild("icon").asLoader.url = "ui://CitySelect/map" + o;
      i.getChild("text").asLoader.url = "ui://CitySelect/name" + o;
      i.getChild("labDesc").text = "";
      i.onClick(this.onTouchRender.bind(this, o), this);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    for (var e = 0; e < this.arr.length; e++) {
      var t = this.arr[e];
      var o = this.items[e];
      var i = r_EntryCitySystem.EntryCitySystem.getCfgById(t);
      if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel()[i.name])) {
        o.getController("lock").selectedIndex = 1;
      } else {
        o.getController("lock").selectedIndex = 0;
        o.getChild("labDesc").text = "等级到达" + r_GroupSystem.GroupSystem.getLimitLevel()[i.name] + "解锁";
      }
    }
  };
  _ctor.prototype.onTouchRender = function (e) {
    var t = r_EntryCitySystem.EntryCitySystem.getCfgById(e);
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel()[t.name]) && r_MainHomeUI.default.Inst) {
      this.hide();
      r_MainHomeUI.default.Inst.showMainAndChange(e);
    }
  };
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_CitySelectUI;