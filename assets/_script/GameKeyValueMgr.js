Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameKeyValueMgr = undefined;
exports.GameKeyValueMgr = {
  keyValueMap: {},
  setValue: function (e, t) {
    this.keyValueMap[e] = t;
  },
  remove: function (e) {
    this.keyValueMap[e] = null;
  },
  clear: function () {
    this.keyValueMap = {};
  },
  getValue: function (e) {
    return this.keyValueMap[e];
  }
};