'use strict';

exports.__esModule = true;

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// require('css/blocks/handle.postcss.css');
// let CLASSES = require('css/blocks/handle.postcss.css.json');

var Ripple = function (_Module) {
  _inherits(Ripple, _Module);

  function Ripple() {
    _classCallCheck(this, Ripple);

    return _possibleConstructorReturn(this, _Module.apply(this, arguments));
  }

  /*
    Method to declare defaults.
    @private
    @overrides @ Module.
  */

  Ripple.prototype._declareDefaults = function _declareDefaults() {
    _Module.prototype._declareDefaults.call(this);
    this._defaults.withHold = true;
  };
  /*
    Method to render the component.
    @private
    @overrides @ Module
  */


  Ripple.prototype._render = function _render() {
    _Module.prototype._render.call(this);
    this._addRipple();
  };
  /*
    Method to construct ripple object.
    @private
  */


  Ripple.prototype._addRipple = function _addRipple() {
    var _this2 = this,
        _ref;

    this.transit = new mojs.Transit((_ref = {
      parent: this.el,
      strokeWidth: { 10: 0 },
      fill: 'none',
      stroke: 'hotpink'
    }, _ref['fill'] = 'hotpink', _ref.fillOpacity = .75, _ref.opacity = { .85: 0 }, _ref.radius = { 0: 40 }, _ref.isShowEnd = false, _ref.onStart = function onStart() {
      _this2.isStart = true;
    }, _ref.onUpdate = this._onUpdate.bind(this), _ref.onComplete = function onComplete() {
      _this2.isStart = false;
    }, _ref));
  };
  /*
    Method that is invoked on ripple update.
    @private
    @param {Number} Curret progress [0...1].
  */


  Ripple.prototype._onUpdate = function _onUpdate(p) {
    if (!this._props.withHold) {
      return;
    }
    if (p >= .15 && this.isStart && !this.isRelease) {
      this.isStart = false;
      this.transit.setSpeed(.02);
    }
  };
  /*
    Method that should be run on touch serface release.
    @private
  */


  Ripple.prototype._release = function _release() {
    // console.log('release');
    if (!this._props.withHold) {
      return;
    }
    this.isRelease = true;
    this.transit.setSpeed(1).play();
  };
  /*
    Method that should be run on touch serface hold.
    @private
    @param {Object} Origin event object.
  */


  Ripple.prototype._hold = function _hold(e) {
    var x = e.offsetX != null ? e.offsetX : e.layerX,
        y = e.offsetY != null ? e.offsetY : e.layerY;

    this.isRelease = false;
    this.transit.tune({ x: x, y: y }).replay();
  };
  /*
    Method that should be run on touch serface cancel.
    @private
  */


  Ripple.prototype._cancel = function _cancel() {
    if (!this._props.withHold) {
      return;
    }
    this.isRelease = true;
    this.transit.pause().setSpeed(1).playBackward();
  };

  return Ripple;
}(_module2.default);

exports.default = Ripple;