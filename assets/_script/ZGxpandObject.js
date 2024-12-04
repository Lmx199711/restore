Object.defineProperty(cc.Node.prototype, "worldPosition", {
  get: function () {
    return this.convertToWorldSpaceAR(cc.Vec2.ZERO);
  },
  set: function (e) {
    this.position = this.parent.convertToNodeSpaceAR(e);
  },
  enumerable: true,
  configurable: true
});
Object.defineProperty(cc.Node.prototype, "labelCom", {
  get: function () {
    return this.getComponent(cc.Label);
  },
  enumerable: true,
  configurable: true
});
Object.defineProperty(cc.Node.prototype, "spriteCom", {
  get: function () {
    return this.getComponent(cc.Sprite);
  },
  enumerable: true,
  configurable: true
});
Object.defineProperty(cc.Node.prototype, "spineCom", {
  get: function () {
    return this.getComponent(sp.Skeleton);
  },
  enumerable: true,
  configurable: true
});