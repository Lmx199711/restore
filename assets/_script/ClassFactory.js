Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassFactory = undefined;
var r_UIWind = require("UIWind");
var r_Scene = require("Scene");
var exp_ClassFactory = function () {
  function _ctor() {}
  _ctor.regFguiCom = function (e, t) {
    this.FuiClass || (this.FuiClass = {});
    this.FuiClass[e] = t;
  };
  _ctor.regUIClass = function (e) {
    this.UIClass || (this.UIClass = []);
    this.UIClass.push(e);
  };
  _ctor.regSceneClass = function (e) {
    this.SceneClass || (this.SceneClass = []);
    this.SceneClass.push(e);
  };
  _ctor.init = function () {
    _ctor.UIClass && _ctor.UIClass.forEach(function (e) {
      r_UIWind.UIWind.add(e);
    });
    if (_ctor.FuiClass) {
      for (var t in _ctor.FuiClass) fgui.UIObjectFactory.setExtension(t, _ctor.FuiClass[t]);
    }
    _ctor.SceneClass && _ctor.SceneClass.forEach(function (e) {
      r_Scene.Scene.addScene(e);
    });
  };
  return _ctor;
}();
exports.ClassFactory = exp_ClassFactory;