Object.defineProperty(cc.Node.prototype, "worldPosition", {
  get: function get() {
    return this.convertToWorldSpaceAR(cc.Vec2.ZERO);
  },
  set: function set(e) {
    this.position = this.parent.convertToNodeSpaceAR(e);
  },
  enumerable: !0,
  configurable: !0
}), Object.defineProperty(cc.Node.prototype, "labelCom", {
  get: function get() {
    return this.getComponent(cc.Label);
  },
  enumerable: !0,
  configurable: !0
}), Object.defineProperty(cc.Node.prototype, "spriteCom", {
  get: function get() {
    return this.getComponent(cc.Sprite);
  },
  enumerable: !0,
  configurable: !0
}), Object.defineProperty(cc.Node.prototype, "spineCom", {
  get: function get() {
    return this.getComponent(sp.Skeleton);
  },
  enumerable: !0,
  configurable: !0
});