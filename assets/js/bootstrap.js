pluginWebpack([2],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        value: {
            type: String,
            required: true
        },

        shortcodes: {
            type: Object,
            required: false
        }
    },

    data() {
        return {
            editorId: this._uid,
            fileFrame: null
        };
    },

    mounted() {
        const vm = this;

        window.tinymce.init({
            selector: `#dokan-tinymce-${this.editorId}`,
            branding: false,
            height: 200,
            menubar: false,
            convert_urls: false,
            theme: 'modern',
            skin: 'lightgray',
            fontsize_formats: '10px 11px 13px 14px 16px 18px 22px 25px 30px 36px 40px 45px 50px 60px 65px 70px 75px 80px',
            font_formats: 'Arial=arial,helvetica,sans-serif;' + 'Comic Sans MS=comic sans ms,sans-serif;' + 'Courier New=courier new,courier;' + 'Georgia=georgia,palatino;' + 'Lucida=Lucida Sans Unicode, Lucida Grande, sans-serif;' + 'Tahoma=tahoma,arial,helvetica,sans-serif;' + 'Times New Roman=times new roman,times;' + 'Trebuchet MS=trebuchet ms,geneva;' + 'Verdana=verdana,geneva;',
            plugins: 'textcolor colorpicker wplink wordpress code hr wpeditimage',
            toolbar: ['shortcodes bold italic underline bullist numlist alignleft aligncenter alignjustify alignright link image wp_adv', 'formatselect forecolor backcolor blockquote hr code fontselect fontsizeselect removeformat undo redo'],
            setup(editor) {
                const shortcodeMenuItems = [];

                weLo_.forEach(vm.shortcodes, (shortcodeObj, shortcodeType) => {
                    shortcodeMenuItems.push({
                        text: shortcodeObj.title,
                        classes: 'menu-section-title'
                    });

                    weLo_.forEach(shortcodeObj.codes, (codeObj, shortcode) => {
                        shortcodeMenuItems.push({
                            text: codeObj.title,
                            onclick() {
                                let code = `[${shortcodeType}:${shortcode}]`;

                                if (codeObj.default) {
                                    code = `[${shortcodeType}:${shortcode} default="${codeObj.default}"]`;
                                }

                                if (codeObj.text) {
                                    code = `[${shortcodeType}:${shortcode} text="${codeObj.text}"]`;
                                }

                                if (codeObj.plainText) {
                                    code = codeObj.text;
                                }

                                editor.insertContent(code);
                            }
                        });
                    });
                });

                // editor.addButton('shortcodes', {
                //     type: 'menubutton',
                //     icon: 'shortcode',
                //     tooltip: 'Shortcodes',
                //     menu: shortcodeMenuItems
                // });

                editor.addButton('image', {
                    icon: 'image',
                    onclick() {
                        vm.browseImage(editor);
                    }
                });

                // editor change triggers
                editor.on('change keyup NodeChange', () => {
                    vm.$emit('input', editor.getContent());
                });
            }
        });
    },

    methods: {
        browseImage(editor) {
            const vm = this;
            const selectedFile = {
                id: 0,
                url: '',
                type: ''
            };

            if (vm.fileFrame) {
                vm.fileFrame.open();
                return;
            }

            const fileStates = [new wp.media.controller.Library({
                library: wp.media.query(),
                multiple: false,
                title: this.__('Select an image', 'wepos'),
                priority: 20,
                filterable: 'uploaded'
            })];

            vm.fileFrame = wp.media({
                title: this.__('Select an image', 'wepos'),
                library: {
                    type: ''
                },
                button: {
                    text: this.__('Select an image', 'wepos')
                },
                multiple: false,
                states: fileStates
            });

            vm.fileFrame.on('select', () => {
                const selection = vm.fileFrame.state().get('selection');

                selection.map(image => {
                    image = image.toJSON();

                    if (image.id) {
                        selectedFile.id = image.id;
                    }

                    if (image.url) {
                        selectedFile.url = image.url;
                    }

                    if (image.type) {
                        selectedFile.type = image.type;
                    }

                    vm.insertImage(editor, selectedFile);

                    return null;
                });
            });

            vm.fileFrame.on('ready', () => {
                vm.fileFrame.uploader.options.uploader.params = {
                    type: 'dokan-image-uploader'
                };
            });

            vm.fileFrame.open();
        },

        insertImage(editor, image) {
            if (!image.id || image.type !== 'image') {
                this.alert({
                    type: 'error',
                    text: this.__('Please select an image,', 'wepos')
                });

                return;
            }

            const img = `<img src="${image.url}" alt="${image.alt}" title="${image.title}" style="max-width: 100%; height: auto;">`;

            editor.insertContent(img);
        }
    }
});

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Modal',

    props: {

        footer: {
            type: Boolean,
            required: false,
            default: false
        },
        header: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        width: {
            type: String,
            required: false,
            default: '600px'
        },
        height: {
            type: String,
            required: false,
            default: 'auto'
        },
        backdropOpacity: {
            type: String,
            required: false,
            default: '0.2'
        }
    },

    data() {
        return {};
    },

    methods: {
        handleModalSubmit() {
            let self = this;

            document.addEventListener("keypress", function (evt) {
                if ("Enter" === evt.code) {
                    self.$emit('enterpressed');
                }
            });
        }
    },

    mounted() {
        this.$emit('open');
        this.handleModalSubmit();
    }
});

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({

    name: 'Switches',

    props: {
        enabled: {
            type: Boolean, // String, Number, Boolean, Function, Object, Array
            required: true,
            default: false
        },
        value: {
            type: [String, Number]
        }
    },

    data() {
        return {};
    },

    methods: {

        trigger(e) {
            this.$emit('input', e.target.checked, e.target.value);
        }
    }
});

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventBus = undefined;

var _vue = __webpack_require__(15);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(95);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vuex = __webpack_require__(97);

var _vuex2 = _interopRequireDefault(_vuex);

var _Api = __webpack_require__(233);

var _Api2 = _interopRequireDefault(_Api);

var _lodash = __webpack_require__(234);

var _lodash2 = _interopRequireDefault(_lodash);

var _Mixin = __webpack_require__(374);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _vueJsPopover = __webpack_require__(93);

var _vueJsPopover2 = _interopRequireDefault(_vueJsPopover);

var _TextEditor = __webpack_require__(376);

var _TextEditor2 = _interopRequireDefault(_TextEditor);

var _vTooltip = __webpack_require__(92);

var _vHotkey = __webpack_require__(28);

var _vHotkey2 = _interopRequireDefault(_vHotkey);

var _vueMultiselect = __webpack_require__(94);

var _vueMultiselect2 = _interopRequireDefault(_vueMultiselect);

var _Modal = __webpack_require__(378);

var _Modal2 = _interopRequireDefault(_Modal);

var _Switches = __webpack_require__(381);

var _Switches2 = _interopRequireDefault(_Switches);

__webpack_require__(384);

var _dayjs = __webpack_require__(33);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _vueSweetalert = __webpack_require__(96);

var _vueSweetalert2 = _interopRequireDefault(_vueSweetalert);

__webpack_require__(387);

var _vueDatepicker = __webpack_require__(89);

var _vueDatepicker2 = _interopRequireDefault(_vueDatepicker);

__webpack_require__(389);

var _hooks = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.dayjs = _dayjs2.default;

// Vue Sweet Alert


_vue2.default.use(_vueSweetalert2.default);

_vue2.default.use(_vueDatepicker2.default, {
    lang: 'en'
});

_vue2.default.directive('tooltip', _vTooltip.VTooltip);
_vue2.default.directive('close-popover', _vTooltip.VClosePopover);
_vue2.default.component('v-popover', _vTooltip.VPopover);
_vue2.default.component('multiselect', _vueMultiselect2.default);

_vue2.default.directive('click-outside', {
    bind: function bind(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
            var compName = vNode.context.name;
            var warn = '[Vue-click-outside:] provided expression \'' + binding.expression + '\' is not a function, but has to be';
            if (compName) {
                warn += 'Found in component \'' + compName + '\'';
            }

            console.warn(warn);
        }
        // Define Handler and cache it on the element
        var bubble = binding.modifiers.bubble;
        var handler = function handler(e) {
            if (bubble || !el.contains(e.target) && el !== e.target) {
                binding.value(e);
            }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener('click', handler);
    },

    unbind: function unbind(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
    }
});

_vue2.default.mixin(_Mixin2.default);
_vue2.default.use(_vueJsPopover2.default, { defaultBoundariesElement: document.body });
_vue2.default.use(_vHotkey2.default);

window.wepos_get_lib = function (lib) {
    return window.wepos.libs[lib];
};

var EventBus = exports.EventBus = new _vue2.default();

window.weLo_ = _lodash2.default;
window.wepos._ = _lodash2.default;
window.wepos.api = new _Api2.default();
window.wepos.libs['Vue'] = _vue2.default;
window.wepos.libs['Router'] = _vueRouter2.default;
window.wepos.libs['Vuex'] = _vuex2.default;
window.wepos.libs['TextEditor'] = _TextEditor2.default;
window.wepos.libs['EventBus'] = EventBus;
window.wepos.libs['Modal'] = _Modal2.default;
window.wepos.libs['Switches'] = _Switches2.default;

// WordPress Hooks


window.wepos.hooks = (0, _hooks.createHooks)();

wepos.addFilter = function (hookName, namespace, component) {
    var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

    wepos.hooks.addFilter(hookName, namespace, function (components) {
        components.push(component);
        return components;
    }, priority);
};

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WePos_API = function () {
    function WePos_API() {
        _classCallCheck(this, WePos_API);
    }

    _createClass(WePos_API, [{
        key: 'headers',
        value: function headers() {
            return {};
        }
    }, {
        key: 'get',
        value: function get(path) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return this.ajax(path, 'GET', headers, data);
        }
    }, {
        key: 'post',
        value: function post(path) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.ajax(path, 'POST', this.headers(), data);
        }
    }, {
        key: 'put',
        value: function put(path) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.ajax(path, 'PUT', this.headers(), data);
        }
    }, {
        key: 'delete',
        value: function _delete(path) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return this.ajax(path, 'DELETE', this.headers(), data);
        }

        // jQuery ajax wrapper

    }, {
        key: 'ajax',
        value: function ajax(path, method, headers, data) {
            var override = null;

            if ('PUT' === method || 'DELETE' === method) {
                override = method;
                method = 'POST';
            }

            return jQuery.ajax({
                url: path,
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', window.wepos.rest.nonce);

                    if (override) {
                        xhr.setRequestHeader('X-HTTP-Method-Override', override);
                    }
                },
                type: method,
                data: data
            });
        }
    }]);

    return WePos_API;
}();

exports.default = WePos_API;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(236);

var _core2 = _interopRequireDefault(_core);

var _findindex = __webpack_require__(237);

var _findindex2 = _interopRequireDefault(_findindex);

var _truncate = __webpack_require__(300);

var _truncate2 = _interopRequireDefault(_truncate);

var _includes = __webpack_require__(311);

var _includes2 = _interopRequireDefault(_includes);

var _debounce = __webpack_require__(371);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ = _core2.default.noConflict();
_.findIndex = _findindex2.default;
_.truncate = _truncate2.default;
_.includes = _includes2.default;
_.debounce = _debounce2.default;

exports.default = _;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(235)))

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

module.exports = window.wepos._;

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _i18n = __webpack_require__(375);

exports.default = {
    methods: {
        setLocaleData: function setLocaleData(data) {
            return (0, _i18n.setLocaleData)(data);
        },
        __: function __(text, domain) {
            return (0, _i18n.__)(text, domain);
        },
        _nx: function _nx(single, plural, number, context, domain) {
            return (0, _i18n._nx)(single, plural, number, context, domain);
        },
        __n: function __n(single, plural, number, domain) {
            return _n(single, plural, number, domain);
        },
        sprintf: function sprintf(fmt) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return _i18n.sprintf.apply(undefined, [fmt].concat(args));
        },
        formatPrice: function formatPrice(value) {
            return accounting.formatMoney(value, wepos.currency_format_symbol, wepos.currency_format_num_decimals, wepos.currency_format_thousand_sep, wepos.currency_format_decimal_sep, wepos.currency_format);
        },
        formatNumber: function formatNumber(value) {
            return accounting.formatNumber(value, wepos.currency_format_num_decimals, wepos.currency_format_thousand_sep, wepos.currency_format_decimal_sep);
        },
        truncateNumber: function truncateNumber(value) {
            return parseFloat(accounting.toFixed(value, wepos.currency_format_num_decimals));
        },
        unFormat: function unFormat(value) {
            if (value.indexOf(wepos.currency_format_decimal_sep) > -1) {
                return accounting.unformat(value, wepos.currency_format_decimal_sep);
            }
            return accounting.unformat(value);
        },
        findMatchingVariations: function findMatchingVariations(variations, attributes) {
            var matching = [];
            for (var i = 0; i < variations.length; i++) {
                var variation = variations[i];
                var variationAttributes = {};

                for (var j = 0; j < variation.attributes.length; j++) {
                    variationAttributes[variation.attributes[j].name] = variation.attributes[j].option;
                }

                if (this.isMatch(variationAttributes, attributes)) {
                    matching.push(variation);
                }
            }
            return matching;
        },
        isMatch: function isMatch(variationAttributes, attributes) {
            var match = true;
            for (var attr_name in variationAttributes) {
                if (variationAttributes.hasOwnProperty(attr_name)) {
                    var val1 = variationAttributes[attr_name];
                    var val2 = attributes[attr_name];
                    if (val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2) {
                        match = false;
                    }
                }
            }
            return match;
        },
        confirmAlert: function confirmAlert(_ref) {
            var _ref$title = _ref.title,
                title = _ref$title === undefined ? '' : _ref$title,
                _ref$text = _ref.text,
                text = _ref$text === undefined ? '' : _ref$text;

            return this.$swal.fire({
                icon: 'warning',
                title: title,
                text: text,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3b80f4',
                cancelButtonColor: '#e34d4d',
                confirmButtonText: this.__('Confirm', 'wepos')
            });
        },
        toast: function toast(_ref2) {
            var title = _ref2.title,
                _ref2$type = _ref2.type,
                type = _ref2$type === undefined ? '' : _ref2$type,
                _ref2$position = _ref2.position,
                position = _ref2$position === undefined ? '' : _ref2$position;

            var toast = this.$swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                animation: true
            });

            switch (type) {
                case 'success':
                    toast.fire({
                        icon: 'success',
                        title: title
                    });
                    break;
                case 'error':
                    toast.fire({
                        icon: 'error',
                        title: title
                    });
                    break;
                case 'warning':
                    toast.fire({
                        icon: 'warning',
                        title: title
                    });
                    break;
                case 'info':
                    toast.fire({
                        icon: 'info',
                        title: title
                    });
                    break;
                default:
                    toast.fire({
                        icon: 'success',
                        title: title
                    });
                    break;
            }
        },
        hasStock: function hasStock(product) {
            var productCartQty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (!product.manage_stock) {
                return 'outofstock' !== product.stock_status;
            }

            if (product.backorders_allowed) {
                return true;
            }

            return product.stock_quantity > productCartQty;
        }
    },

    computed: {
        wepos: function (_wepos) {
            function wepos() {
                return _wepos.apply(this, arguments);
            }

            wepos.toString = function () {
                return _wepos.toString();
            };

            return wepos;
        }(function () {
            return wepos;
        }),
        eventBus: function eventBus() {
            return wepos_get_lib('EventBus');
        }
    }
};

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocaleData = setLocaleData;
exports.getI18n = getI18n;
exports.__ = __;
exports._x = _x;
exports._n = _n;
exports._nx = _nx;
/**
 * External dependencies
 */
var i18n = {};

/**
 * Creates a new Jed instance with specified locale data configuration.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {Object} data Locale data configuration.
 */
function setLocaleData(data) {
  var jed = new Jed(data);
  i18n[jed._textdomain] = jed;
}

/**
 * Returns the current Jed instance, initializing with a default configuration
 * if not already assigned.
 *
 * @return {Jed} Jed instance.
 */
function getI18n() {
  var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (!i18n[domain]) {
    setLocaleData({ '': {} });
  }

  return i18n[domain];
}

/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string} text Text to translate.
 * @param {string} domain Domain to retrieve the translated text.
 *
 * @return {string} Translated text.
 */
function __(text, domain) {
  return getI18n(domain) ? getI18n(domain).dgettext(domain, text) : text;
}

/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string} text    Text to translate.
 * @param {string} context Context information for the translators.
 * @param {string} domain Domain to retrieve the translated text.
 *
 * @return {string} Translated context string without pipe.
 */
function _x(text, context, domain) {
  return getI18n(domain).dpgettext(domain, context, text);
}

/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string} single The text to be used if the number is singular.
 * @param {string} plural The text to be used if the number is plural.
 * @param {number} number The number to compare against to use either the
 *                         singular or plural form.
 * @param {string} domain Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */
function _n(single, plural, number, domain) {
  return getI18n(domain).dngettext(domain, single, plural, number);
}

/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string} single  The text to be used if the number is singular.
 * @param {string} plural  The text to be used if the number is plural.
 * @param {number} number  The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} context Context information for the translators.
 * @param {string} domain Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */
function _nx(single, plural, number, context, domain) {
  return getI18n(domain).dnpgettext(domain, context, single, plural, number);
}

/**
 * Returns a formatted string.
 *
 * @see http://www.diveintojavascript.com/projects/javascript-sprintf
 *
 * @type {string}
 */
var sprintf = exports.sprintf = Jed.sprintf;

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TextEditor_vue__ = __webpack_require__(142);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b8977ca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TextEditor_vue__ = __webpack_require__(377);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TextEditor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b8977ca_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TextEditor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/admin/components/TextEditor.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b8977ca", Component.options)
  } else {
    hotAPI.reload("data-v-1b8977ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("textarea", {
    attrs: { id: "dokan-tinymce-" + _vm.editorId },
    domProps: { value: _vm.value }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1b8977ca", esExports)
  }
}

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Modal_vue__ = __webpack_require__(143);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e7f44b2a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Modal_vue__ = __webpack_require__(380);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(379)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Modal_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e7f44b2a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Modal_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/utils/components/Modal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e7f44b2a", Component.options)
  } else {
    hotAPI.reload("data-v-e7f44b2a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 379:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wepos-modal-dialog" }, [
    _c("div", { staticClass: "wepos-modal" }, [
      _c(
        "div",
        { staticClass: "wepos-modal-content", style: { width: _vm.width } },
        [
          _c(
            "section",
            { class: ["wepos-modal-main", { "has-footer": _vm.footer }] },
            [
              _vm.header
                ? _c(
                    "header",
                    { staticClass: "modal-header" },
                    [_vm._t("header", [_c("h1", [_vm._v(_vm._s(_vm.title))])])],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "modal-body", style: { height: _vm.height } },
                [_vm._t("body")],
                2
              ),
              _vm._v(" "),
              _vm.footer
                ? _c("footer", { staticClass: "modal-footer" }, [
                    _c("div", { staticClass: "inner" }, [_vm._t("footer")], 2)
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("span", {
                staticClass:
                  "modal-close modal-close-link flaticon-cancel-music",
                on: {
                  click: function($event) {
                    _vm.$emit("close")
                  }
                }
              })
            ]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _c("div", {
      staticClass: "wepos-modal-backdrop",
      style: { opacity: _vm.backdropOpacity }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e7f44b2a", esExports)
  }
}

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Switches_vue__ = __webpack_require__(144);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_71008314_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Switches_vue__ = __webpack_require__(383);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(382)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Switches_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_71008314_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Switches_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "assets/src/utils/components/Switches.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71008314", Component.options)
  } else {
    hotAPI.reload("data-v-71008314", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 382:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("label", { staticClass: "switch tips" }, [
    _c("input", {
      staticClass: "toogle-checkbox",
      attrs: { type: "checkbox" },
      domProps: { checked: _vm.enabled, value: _vm.value },
      on: { change: _vm.trigger }
    }),
    _vm._v(" "),
    _c("span", { staticClass: "slider round" })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-71008314", esExports)
  }
}

/***/ })

},[232]);