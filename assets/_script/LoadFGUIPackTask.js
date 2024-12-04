var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadFGUIPackTask = undefined;
var r_Task = require("Task");
var exp_LoadFGUIPackTask = function (e) {
  function _ctor(t, o) {
    undefined === o && (o = "fgui");
    var i = e.call(this) || this;
    i.bundleName = o;
    i.packName = t;
    return i;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadAsset = function () {
    fgui.UIPackage.loadPackage(this.bundle, this.packName, this.onFinished.bind(this));
  };
  _ctor.prototype.onExecute = function () {
    var t = this;
    e.prototype.onExecute.call(this);
    console.log("加载fgui包", this.packName);
    if (null != this.bundleName) {
      cc.assetManager.loadBundle(this.bundleName, function (e, o) {
        if (e) {
          cc.error("加载资源失败", e);
        } else {
          t.bundle = o;
          t.loadAsset();
        }
      });
    } else {
      this.bundle = cc.resources;
      this.loadAsset();
    }
  };
  _ctor.prototype.onFinished = function () {
    this.endAction(true);
  };
  _ctor.isLocalMode = false;
  return _ctor;
}(r_Task.Task);
exports.LoadFGUIPackTask = exp_LoadFGUIPackTask;