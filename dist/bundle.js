require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scheme = __webpack_require__(3);

var _scheme2 = _interopRequireDefault(_scheme);

var _express = __webpack_require__(18);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(19);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlTools = __webpack_require__(17);

var _apolloServerExpress = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3000;
var app = (0, _express2.default)();

var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _scheme2.default,
  resolvers: _scheme.allResolvers
});
// bodyParser is needed just for POST.
app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: executableSchema, rootValue: _scheme.allResolvers }));
app.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
app.listen(PORT, function () {
  return console.log('Apollo-express server listening on port ' + PORT);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allResolvers = undefined;

var _graphql = __webpack_require__(4);

var _fs = __webpack_require__(5);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allTypes = '';
var allResolvers = {};
var rootQuery = 'type Query{';
var mutationQuery = 'type Mutation{';
_fs2.default.readdirSync('./server').filter(function (item) {
  return _fs2.default.statSync('./server/' + item).isDirectory();
}).map(function (dir) {
  try {
    var customQueryType = __webpack_require__(6)("./" + dir + '/customQueryType.js');
    var customQueryTypes = Object.keys(customQueryType);
    customQueryTypes.forEach(function (customKey) {
      rootQuery = rootQuery + customQueryType[customKey];
    });
  } catch (e) {
    rootQuery = rootQuery + dir + (':' + dir + '\n');
  }

  try {
    var mutations = __webpack_require__(8)("./" + dir + '/mutations.js');
    var mutationTypes = Object.keys(mutations);
    mutationTypes.forEach(function (mutKey) {
      mutationQuery = mutationQuery + '\n' + mutations[mutKey];
    });
  } catch (e) {}
  try {
    var types = __webpack_require__(10)("./" + dir + '/types.js');
    var typesKeys = Object.keys(types);
    typesKeys.forEach(function (typeKey) {
      allTypes = allTypes + '\n' + types[typeKey];
    });
  } catch (e) {}
  try {
    var resolvers = __webpack_require__(14)("./" + dir + '/resolvers.js');
    var resolverKeys = Object.keys(resolvers);
    resolverKeys.forEach(function (resolverKey) {
      Object.assign(allResolvers, resolvers[resolverKey]);
    });
  } catch (e) {}
});
rootQuery = rootQuery + '}';
mutationQuery = mutationQuery + '}';

// Construct a schema, using GraphQL schema language
var schema = '\n  ' + rootQuery + '\n  ' + allTypes + '\n  ' + mutationQuery + '\n';

exports.default = [schema];
exports.allResolvers = allResolvers;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./User/customQueryType.js": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var OverWriteRootQueryType = "\n  User(id: Int!): User\n";

exports.OverWriteRootQueryType = OverWriteRootQueryType;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./User/mutations.js": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserMutations = "\n  createUser(input: newUser): User\n";
exports.UserMutations = UserMutations;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Cat/types.js": 11,
	"./House/types.js": 12,
	"./User/types.js": 13
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cat = "\n  type Cat {\n    color: String!\n    name: String!\n  }\n";
exports.Cat = Cat;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var House = "\n  type House{\n    color:String!\n    number: Int!\n  }\n";
exports.House = House;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var User = "\n  type User {\n    first_name: String!\n    last_name: String!\n    houses:[House!]\n    cats:[Cat!]\n  }\n";
var UserInput = "\n  input newUser {\n    first_name: String!\n    last_name: String!\n  }\n";

exports.User = User;
exports.UserInput = UserInput;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Cat/resolvers.js": 15,
	"./User/resolvers.js": 16
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 14;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CatResolver = {
  Cat: {
    color: function color() {
      console.log(arguments);
      return 'Black';
    },
    name: function name() {
      return 'Mitzie';
    }
  }
};
exports.CatResolver = CatResolver;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var UserResolver = {
  Query: {
    User: function User(obj, args, context, info) {
      return { first_name: "lala" };
    }
  },
  User: {
    first_name: function first_name(user) {
      return user.first_name;
    },
    last_name: function last_name(user) {
      return user.last_name;
    },
    houses: function houses(obj, args) {
      console.log(obj, args);
      return [];
    },
    cats: function cats(obj, args) {
      console.log(obj, args);
      return [];
    }
  },
  Mutation: {
    createUser: function createUser(root, _ref, context) {
      var input = _ref.input;

      return input;
    }
  }
};
exports.UserResolver = UserResolver;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map