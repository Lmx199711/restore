var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineCfg = exports.OnlineGiftType = undefined;
(function (e) {
  e[e["金币"] = 1] = "金币";
  e[e["宝箱"] = 2] = "宝箱";
  e[e["自动点击"] = 3] = "自动点击";
  e[e["升级"] = 4] = "升级";
})(i = exports.OnlineGiftType || (exports.OnlineGiftType = {}));
exports.OnlineCfg = [{
  id: 1,
  type: i.金币,
  time: 3,
  content: "点击收益x25"
}, {
  id: 2,
  type: i.宝箱,
  time: 5,
  content: "全屏宝箱奖励"
}, {
  id: 3,
  type: i.自动点击,
  time: 10,
  content: "自动点击X1"
}, {
  id: 4,
  type: i.升级,
  time: 15,
  content: "主角等级+5",
  video: true,
  num: 5
}, {
  id: 5,
  type: i.升级,
  time: 30,
  content: "主角等级+10",
  video: true,
  num: 10
}];