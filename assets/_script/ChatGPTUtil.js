Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLineCircleIntersections = undefined;
exports.getLineCircleIntersections = function (e, t) {
  var o = [];
  var i = e.p2.x - e.p1.x;
  var n = e.p2.y - e.p1.y;
  var a = i * i + n * n;
  var s = 2 * (i * (e.p1.x - t.center.x) + n * (e.p1.y - t.center.y));
  var r = s * s - 4 * a * (t.center.x * t.center.x + t.center.y * t.center.y + e.p1.x * e.p1.x + e.p1.y * e.p1.y - 2 * (t.center.x * e.p1.x + t.center.y * e.p1.y) - t.radius * t.radius);
  if (r < 0) {
    return o;
  }
  var c = Math.sqrt(r);
  var l = (-s + c) / (2 * a);
  var u = (-s - c) / (2 * a);
  if (l >= 0 && l <= 1) {
    var h = {
      x: e.p1.x + i * l,
      y: e.p1.y + n * l
    };
    o.push(h);
  }
  if (u >= 0 && u <= 1) {
    h = {
      x: e.p1.x + i * u,
      y: e.p1.y + n * u
    };
    o.push(h);
  }
  return o;
};