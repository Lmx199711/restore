Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeSystem = exports._ChangeSystem = undefined;
var r_UIDef = require("UIDef");
var r_Index = require("Index");
var r_MainHomeUI = require("MainHomeUI");
var r_MainUI = require("MainUI");
var r_Config = require("Config");
var exp__ChangeSystem = function () {
  function _ctor() {}
  _ctor.prototype.setChangeWin = function (e) {
    var t = this;
    if (0 != e.length) {
      if (r_Index.UIWind.curWindList.findIndex(function (e) {
        return e.resName == r_UIDef.UIDef.Res.UI.MainUI;
      }) > -1 && e[0] == r_MainUI.MainUI) {
        this.changeScene(e, 1);
      } else if (r_Index.UIWind.curWindList.findIndex(function (e) {
        return e.resName == r_UIDef.UIDef.Res.UI.MainHomeUI;
      }) > -1 && e[0] == r_MainHomeUI.default) {
        this.changeScene(e, 1);
      } else if (e[0] == r_MainUI.MainUI) {
        r_MainHomeUI.default.instance.showMainUI(function () {
          t.changeScene(e, 1);
        });
      } else if (e[0] == r_MainHomeUI.default) {
        r_MainUI.MainUI.hide();
        this.changeScene(e, 0);
      } else {
        this.changeScene(e, 0);
      }
    }
  };
  _ctor.prototype.changeScene = function (e, t) {
    e[t] && e[t].showUI({
      opendCallback: this.changeScene.bind(this, e, ++t)
    });
  };
  _ctor.prototype.setChangeWinNew = function (e) {
    var t = this;
    if (0 != e.length) {
      r_Index.UIWind.hideAllNotMain();
      if (r_Index.UIWind.curWindList.findIndex(function (e) {
        return e.resName == r_UIDef.UIDef.Res.UI.MainUI;
      }) > -1 && "MainUI" == e[0]) {
        this.changeSceneNew(e, 1);
      } else if (r_Index.UIWind.curWindList.findIndex(function (e) {
        return e.resName == r_UIDef.UIDef.Res.UI.MainHomeUI;
      }) > -1 && "MainHomeUI" == e[0]) {
        this.changeSceneNew(e, 1);
      } else if ("MainUI" == e[0]) {
        r_MainHomeUI.default.instance.showMainUI(function () {
          t.changeSceneNew(e, 1);
        });
      } else if ("MainHomeUI" == e[0]) {
        r_MainUI.MainUI.hide();
        this.changeSceneNew(e, 0);
      } else {
        this.changeSceneNew(e, 0);
      }
    }
  };
  _ctor.prototype.changeSceneNew = function (e, t) {
    e[t] && r_Config.default.uiClassMap[e[t]].showUI({
      opendCallback: this.changeSceneNew.bind(this, e, ++t)
    });
  };
  return _ctor;
}();
exports._ChangeSystem = exp__ChangeSystem;
exports.ChangeSystem = new exp__ChangeSystem();