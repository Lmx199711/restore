var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HuntCaidanUI = undefined;
var r_UIDef = require("UIDef");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var r_TimeSystem = require("TimeSystem");
var r_HuntCaidanLogic = require("HuntCaidanLogic");
var exp_HuntCaidanUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Hunt, r_UIDef.UIDef.Res.UI.HuntCaidanUI) || this;
    t.m_Init = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HuntCaidanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HuntCaidanUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnNoSee.onClick(this.onClickBack, this);
    this.btnHelp.onClick(this.onClickFree, this);
    r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/help", cc.Prefab, function (e, o) {
      if (o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.role.node.addChild(i);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.m_controller = this.contentPane.getController("c1");
    this.m_controller.selectedIndex = 0;
    this.m_Init = false;
    r_SoundMgr.SoundMgr.playMusic("hunt/救人BGM");
    r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/huntCaidan", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (o) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(o);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_HuntCaidanLogic.default);
                this.m_Init = true;
                return [4, this.gameLogic.loadPreload()];
              } else {
                return [3, 2];
              }
            case 1:
              e.sent();
              e.label = 2;
            case 2:
              return [2];
          }
        });
      });
    });
    this.btnNoSee.visible = false;
    this.btnHelp.visible = false;
    this.qipao1.visible = false;
    this.qipao2.visible = false;
    this.showQipao();
  };
  _ctor.prototype.showQipao = function () {
    var e = this;
    this.btnNoSee.visible = false;
    this.btnHelp.visible = false;
    this.qipao2.visible = false;
    this.showQipaoContent(this.qipao1, "救命啊~");
    r_SoundMgr.SoundMgr.playSound("hunt/救命啊2");
    r_TimeSystem.TimeSystem.scheduleOnce("qipao1", 1, function () {
      e.showQipaoContent(e.qipao2, "咦~那不是猎场老板娘吗?");
      r_SoundMgr.SoundMgr.playSound("hunt/咦，那不是老板娘吗");
    });
    r_TimeSystem.TimeSystem.scheduleOnce("qipao2", 3, function () {
      e.btnNoSee.visible = true;
      e.btnHelp.visible = true;
      e.qipao2.visible = false;
    });
  };
  _ctor.prototype.showQipaoContent = function (e, t) {
    e.visible = true;
    e.getChild("content").text = t;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    _ref__ctor.Inst = false;
  };
  _ctor.prototype.onClickBack = function () {
    var e = this;
    if (1 == this.m_controller.selectedIndex) {
      this.m_controller.selectedIndex = 0;
      if (this.prefab) {
        this.prefab.destroy();
        this.prefab = null;
      }
      this.m_Init = false;
      r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/huntCaidan", cc.Prefab, function (t, o) {
        return __awaiter(e, undefined, undefined, function () {
          return __generator(this, function (e) {
            switch (e.label) {
              case 0:
                if (o) {
                  r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
                  this.prefab && this.prefab.destroy();
                  this.prefab = cc.instantiate(o);
                  this.contentPane.getChild("center").node.addChild(this.prefab);
                  this.gameLogic = this.prefab.getComponent(r_HuntCaidanLogic.default);
                  this.m_Init = true;
                  return [4, this.gameLogic.loadPreload()];
                } else {
                  return [3, 2];
                }
              case 1:
                e.sent();
                e.label = 2;
              case 2:
                return [2];
            }
          });
        });
      });
    } else {
      this.hide();
    }
  };
  _ctor.prototype.onClickFree = function () {
    if (this.m_Init) {
      this.m_controller.selectedIndex = 1;
      this.gameLogic.startGame();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNoSee")], _ctor.prototype, "btnNoSee", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnHelp")], _ctor.prototype, "btnHelp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao1")], _ctor.prototype, "qipao1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao2")], _ctor.prototype, "qipao2", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.HuntCaidanUI = exp_HuntCaidanUI;