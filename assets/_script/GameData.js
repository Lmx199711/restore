Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameData = undefined;
var exp_GameData = function () {
  function _ctor() {}
  _ctor.getModel = function (e) {
    if (this.models.has(e)) {
      return this.models.get(e);
    } else {
      return null;
    }
  };
  _ctor.regModel = function (e) {
    if (this.models.has(e)) {
      console.warn("注册数据模型失败，模型存在", e);
    } else {
      this.models.set(e, new e());
    }
  };
  _ctor.init = function (e) {
    this.models.forEach(function (t) {
      t.needExecutionTask && e(t.needExecutionTask);
    });
  };
  _ctor.taskFinished = function () {
    this.models.forEach(function (e) {
      e.onInit();
    });
  };
  _ctor.models = new Map();
  return _ctor;
}();
exports.GameData = exp_GameData;