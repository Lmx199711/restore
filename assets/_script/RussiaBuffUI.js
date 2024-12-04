var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_RussiaSystem = require("RussiaSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_RussiaBuffUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Russia, r_UIDef.UIDef.Res.UI.RussiaBuffUI) || this;
    t.m_buffList = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.RussiaBuffUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RussiaBuffUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.item0, this.item1, this.btnRefresh, this.btnAll);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    this.data.hideBack && this.data.hideBack();
  };
  _ctor.prototype.restart = function () {
    this.m_buffList = r_RussiaSystem.RussiaSystem.getBuffList();
    this.setItem(this.item0, this.m_buffList[0]);
    this.setItem(this.item1, this.m_buffList[1]);
  };
  _ctor.prototype.setItem = function (e, t) {
    e.getChild("labName").text = t.name;
    e.getChild("labDesc").text = t.desc;
    e.getController("mode").selectedIndex = t.id;
    e.getController("level").selectedIndex = t.level - 1;
  };
  _ctor.prototype.onClickitem0 = function () {
    r_RussiaSystem.RussiaSystem.setBuff(this.m_buffList[0]);
    this.hide();
  };
  _ctor.prototype.onClickitem1 = function () {
    r_RussiaSystem.RussiaSystem.setBuff(this.m_buffList[1]);
    this.hide();
  };
  _ctor.prototype.onClickbtnRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("俄罗斯轮盘刷新道具", function () {
      e.restart();
    });
  };
  _ctor.prototype.onClickbtnAll = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("俄罗斯轮盘双道具领取", function () {
      r_RussiaSystem.RussiaSystem.setBuff(e.m_buffList[0]);
      r_RussiaSystem.RussiaSystem.setBuff(e.m_buffList[1]);
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("item0")], _ctor.prototype, "item0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("item1")], _ctor.prototype, "item1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRefresh")], _ctor.prototype, "btnRefresh", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAll")], _ctor.prototype, "btnAll", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RussiaBuffUI;