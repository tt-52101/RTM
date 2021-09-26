(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/core-js/json/stringify */ "./node_modules/@babel/runtime/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _riophae_vue_treeselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @riophae/vue-treeselect */ "./node_modules/@riophae/vue-treeselect/dist/vue-treeselect.cjs.js");
/* harmony import */ var _riophae_vue_treeselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_riophae_vue_treeselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _riophae_vue_treeselect_dist_vue_treeselect_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @riophae/vue-treeselect/dist/vue-treeselect.css */ "./node_modules/@riophae/vue-treeselect/dist/vue-treeselect.css");
/* harmony import */ var _riophae_vue_treeselect_dist_vue_treeselect_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_riophae_vue_treeselect_dist_vue_treeselect_css__WEBPACK_IMPORTED_MODULE_2__);

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


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Treeselect: _riophae_vue_treeselect__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      user_data: null,
      user_not_found: false,
      accessSelected: [],
      accessList: []
    };
  },
  computed: {
    validateForm: function validateForm() {
      return !this.errors.any();
    }
  },
  watch: {
    activeTab: function activeTab() {
      this.fetch_user_data(this.$route.params.userId);
    }
  },
  methods: {
    fetch_user_data: function fetch_user_data(userId) {
      var _this = this;

      this.$vs.loading();
      this.$store.dispatch("userManagement/fetchUser", userId).then(function (res) {
        _this.$vs.loading.close();

        _this.user_data = res.data.userDetail[0];
        _this.accessSelected = res.data.accessByUser;
        _this.accessList = res.data.access;
      }).catch(function (err) {
        /* if (err.response.status === 404) {
        this.user_not_found = true
        return
        }*/
        console.error(err);
      });
    },
    save_changes: function save_changes() {
      /* eslint-disable */
      if (!this.validateForm) return; // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data: function reset_data() {
      this.data_local = JSON.parse(_babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.data));
    },
    update_avatar: function update_avatar() {// You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  },
  created: function created() {
    // Register Module UserManagement Module
    this.fetch_user_data(this.$route.params.userId);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=template&id=fcadc9bc&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=template&id=fcadc9bc& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "user-edit" } },
    [
      _vm.user_data
        ? _c(
            "vx-card",
            { staticClass: "mb-base" },
            [
              _c(
                "div",
                {
                  staticClass: "tabs-container px-6 pt-6",
                  attrs: { slot: "no-body" },
                  slot: "no-body"
                },
                [
                  _c("div", { staticClass: "vx-row" }, [
                    _c(
                      "div",
                      { staticClass: "vx-col w-full" },
                      [
                        _c(
                          "div",
                          { staticClass: "flex items-end px-3" },
                          [
                            _c("feather-icon", {
                              staticClass: "mr-2",
                              attrs: { svgClasses: "w-6 h-6", icon: "UserIcon" }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "font-medium text-lg leading-none"
                              },
                              [_vm._v("Información")]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("vs-divider")
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "vx-col md:w-1/2 w-full" },
                      [
                        _c("vs-input", {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: "required|alpha_num",
                              expression: "'required|alpha_num'"
                            }
                          ],
                          staticClass: "w-full mt-4",
                          attrs: { label: "Username", name: "username" },
                          model: {
                            value: _vm.user_data.username,
                            callback: function($$v) {
                              _vm.$set(_vm.user_data, "username", $$v)
                            },
                            expression: "user_data.username"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.errors.has("username"),
                                expression: "errors.has('username')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [_vm._v(_vm._s(_vm.errors.first("username")))]
                        ),
                        _vm._v(" "),
                        _c("vs-input", {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: "required|alpha_spaces",
                              expression: "'required|alpha_spaces'"
                            }
                          ],
                          staticClass: "w-full mt-4",
                          attrs: { label: "Name", name: "name" },
                          model: {
                            value: _vm.user_data.name,
                            callback: function($$v) {
                              _vm.$set(_vm.user_data, "name", $$v)
                            },
                            expression: "user_data.name"
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: _vm.errors.has("name"),
                                expression: "errors.has('name')"
                              }
                            ],
                            staticClass: "text-danger text-sm"
                          },
                          [_vm._v(_vm._s(_vm.errors.first("name")))]
                        )
                      ],
                      1
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row" }, [
                _c(
                  "div",
                  { staticClass: "vx-col w-full" },
                  [
                    _c(
                      "div",
                      { staticClass: "flex items-end px-3" },
                      [
                        _c("feather-icon", {
                          staticClass: "mr-2",
                          attrs: { svgClasses: "w-6 h-6", icon: "LockIcon" }
                        }),
                        _vm._v(" "),
                        _c(
                          "span",
                          { staticClass: "font-medium text-lg leading-none" },
                          [_vm._v("Accesos")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("vs-divider")
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _c("treeselect", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.accessSelected.length > 0,
                    expression: "accessSelected.length > 0"
                  }
                ],
                attrs: {
                  multiple: true,
                  options: _vm.accessList,
                  flat: "true",
                  "sort-value-by": "INDEX",
                  placeholder: "Select your favourite(s)..."
                },
                model: {
                  value: _vm.accessSelected,
                  callback: function($$v) {
                    _vm.accessSelected = $$v
                  },
                  expression: "accessSelected"
                }
              }),
              _vm._v(" "),
              _c(
                "vs-alert",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.accessSelected.length == 0,
                      expression: "accessSelected.length == 0"
                    }
                  ],
                  attrs: { active: "true" }
                },
                [
                  _vm._v("\n            El usuario: "),
                  _c("strong", [_vm._v(_vm._s(_vm.user_data.username))]),
                  _vm._v(
                    " aún no\n            tiene accesos asociados.\n        "
                  )
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "vx-row" }, [
                _c("div", { staticClass: "vx-col w-full" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "mt-8 flex flex-wrap items-center justify-end"
                    },
                    [
                      _c(
                        "vs-button",
                        {
                          staticClass: "ml-auto mt-2",
                          attrs: { disabled: !_vm.validateForm },
                          on: { click: _vm.save_changes }
                        },
                        [_vm._v("Actualizar")]
                      ),
                      _vm._v(" "),
                      _c(
                        "vs-button",
                        {
                          staticClass: "ml-4 mt-2",
                          attrs: { type: "border", color: "warning" },
                          on: { click: _vm.reset_data }
                        },
                        [_vm._v("Reiniciar")]
                      )
                    ],
                    1
                  )
                ])
              ])
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/user/user-edit/UserEdit.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/views/user/user-edit/UserEdit.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserEdit_vue_vue_type_template_id_fcadc9bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserEdit.vue?vue&type=template&id=fcadc9bc& */ "./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=template&id=fcadc9bc&");
/* harmony import */ var _UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserEdit.vue?vue&type=script&lang=js& */ "./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserEdit_vue_vue_type_template_id_fcadc9bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserEdit_vue_vue_type_template_id_fcadc9bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/user/user-edit/UserEdit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEdit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=template&id=fcadc9bc&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=template&id=fcadc9bc& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_template_id_fcadc9bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserEdit.vue?vue&type=template&id=fcadc9bc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/user/user-edit/UserEdit.vue?vue&type=template&id=fcadc9bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_template_id_fcadc9bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserEdit_vue_vue_type_template_id_fcadc9bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);