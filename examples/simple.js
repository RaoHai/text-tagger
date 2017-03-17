webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(179);


/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-text-tagger/assets/index.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTextTagger = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-text-tagger\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _rcTextTagger2 = _interopRequireDefault(_rcTextTagger);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(33);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var exampleText = '\u771F\u8AAA\u5C0D\u6728\uFF01\u4F5C\u5F9E\u6545\u8D70\u3002\u96C4\u96E2\u5B89\u5730\u4E8C\uFF1B\u7684\u8F2A\u9577\u5E2B\u958B\u800C\u4E2D\u5C0F\u540D\u4F4D\u6162\u6D3B\u5171\u5275\uFF0C\u83EF\u9032\u4F86\u3001\u7ACB\u5E2B\u6211\u4EE5\u4E3B\uFF1F\u81FA\u606F\u670D\u662F\u6240\u91CD\u6C23\u5317\u4E8C\u672C\u7D19\u4EE3\u982D\u554F\u4EE3\u70BA\u52A0\u529B\u597D\u3002\u5B50\u5929\u614B\u7570\u3001\u4EA4\u7684\u770B\uFF1F\u884C\u5E73\u9053\uFF01\u7D93\u8F49\u88DD\u4F86\u5929\u5B78\u89BA\u5C08\u9752\u671F\u5C0D\u7D05\u8AAA\u662F\u548C\u5EE3\u6CB3\u756B\u4E0D\u9019\u7684\u773E\u77E5\u6A23\u662F\u7701\u7D93\u6BDB\u5E2B\u7372\uFF01\u6BDB\u9593\u689D\u540C\u660E\u5BB6\u2026\u2026\u6B65\u4F86\u65BD\u81FA\u5F8C\u7279\u8A55\u756B\u8CB7\u67E5\u5B83\u9752\u3002';
	var ranges = [[1, 5, 'norb'], [14, 16, 'verb'], [19, 22, 'wrong']];
	
	function onChange(editorState) {
	  console.log((0, _rcTextTagger.getData)(editorState));
	}
	
	_reactDom2.default.render(_react2.default.createElement(_rcTextTagger2.default, {
	  value: (0, _rcTextTagger.createFromText)(exampleText, ranges),
	  onSelectionChange: function onSelectionChange(text) {
	    return console.log('onSelectionChange', text);
	  },
	  suggestions: ['aaa', 'bbb', 'ccc'],
	  onChange: onChange,
	  tag: function tag(props) {
	    return _react2.default.createElement(
	      'span',
	      null,
	      props.children
	    );
	  }
	}), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map