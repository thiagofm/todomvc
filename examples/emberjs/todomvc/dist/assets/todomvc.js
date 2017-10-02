"use strict";



define('todomvc/app', ['exports', 'ember', 'todomvc/resolver', 'ember-load-initializers', 'todomvc/config/environment'], function (exports, _ember, _todomvcResolver, _emberLoadInitializers, _todomvcConfigEnvironment) {

	var App = undefined;

	_ember['default'].MODEL_FACTORY_INJECTIONS = true;

	App = _ember['default'].Application.extend({
		modulePrefix: _todomvcConfigEnvironment['default'].modulePrefix,
		podModulePrefix: _todomvcConfigEnvironment['default'].podModulePrefix,
		Resolver: _todomvcResolver['default']
	});

	(0, _emberLoadInitializers['default'])(App, _todomvcConfigEnvironment['default'].modulePrefix);

	exports['default'] = App;
});
define('todomvc/components/todo-item', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		repo: _ember['default'].inject.service(),
		tagName: 'li',
		editing: false,
		classNameBindings: ['todo.completed', 'editing'],

		actions: {
			startEditing: function startEditing() {
				this.get('onStartEdit')();
				this.set('editing', true);
				_ember['default'].run.scheduleOnce('afterRender', this, 'focusInput');
			},

			doneEditing: function doneEditing(todoTitle) {
				if (!this.get('editing')) {
					return;
				}
				if (_ember['default'].isBlank(todoTitle)) {
					this.send('removeTodo');
				} else {
					this.set('todo.title', todoTitle.trim());
					this.set('editing', false);
					this.get('onEndEdit')();
				}
			},

			handleKeydown: function handleKeydown(e) {
				if (e.keyCode === 13) {
					e.target.blur();
				} else if (e.keyCode === 27) {
					this.set('editing', false);
				}
			},

			toggleCompleted: function toggleCompleted(e) {
				var todo = this.get('todo');
				todo.completed = e.target.checked;
				todo.save();
			},

			removeTodo: function removeTodo() {
				this.get('repo')['delete'](this.get('todo'));
			}
		},

		focusInput: function focusInput() {
			this.element.querySelector('input.edit').focus();
		}
	});
});
define('todomvc/components/todo-list', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		repo: _ember['default'].inject.service(),
		tagName: 'section',
		elementId: 'main',
		canToggle: true,
		allCompleted: _ember['default'].computed('todos.@each.completed', function () {
			return this.get('todos').isEvery('completed');
		}),

		actions: {
			enableToggle: function enableToggle() {
				this.set('canToggle', true);
			},

			disableToggle: function disableToggle() {
				this.set('canToggle', false);
			},

			toggleAll: function toggleAll() {
				var allCompleted = this.get('allCompleted');
				this.get('todos').forEach(function (todo) {
					return _ember['default'].set(todo, 'completed', !allCompleted);
				});
				this.get('repo').persist();
			}
		}
	});
});
define('todomvc/controllers/active', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		todos: _ember['default'].computed.filterBy('model', 'completed', false)
	});
});
define('todomvc/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		repo: _ember['default'].inject.service(),
		remaining: _ember['default'].computed.filterBy('model', 'completed', false),
		completed: _ember['default'].computed.filterBy('model', 'completed'),
		actions: {
			createTodo: function createTodo(e) {
				if (e.keyCode === 13 && !_ember['default'].isBlank(e.target.value)) {
					this.get('repo').add({ title: e.target.value.trim(), completed: false });
					e.target.value = '';
				}
			},

			clearCompleted: function clearCompleted() {
				this.get('model').removeObjects(this.get('completed'));
				this.get('repo').persist();
			}
		}
	});
});
define('todomvc/controllers/completed', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		todos: _ember['default'].computed.filterBy('model', 'completed', true)
	});
});
define('todomvc/helpers/app-version', ['exports', 'ember', 'todomvc/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _todomvcConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _todomvcConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('todomvc/helpers/gt', ['exports', 'ember'], function (exports, _ember) {
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports.gt = gt;

	function gt(_ref /*, hash*/) {
		var _ref2 = _slicedToArray(_ref, 2);

		var n1 = _ref2[0];
		var n2 = _ref2[1];

		return n1 > n2;
	}

	exports['default'] = _ember['default'].Helper.helper(gt);
});
define('todomvc/helpers/pluralize', ['exports', 'ember', 'ember-inflector'], function (exports, _ember, _emberInflector) {
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports.pluralizeHelper = pluralizeHelper;

	function pluralizeHelper(_ref /*, hash*/) {
		var _ref2 = _slicedToArray(_ref, 2);

		var singular = _ref2[0];
		var count = _ref2[1];

		return count === 1 ? singular : (0, _emberInflector.pluralize)(singular);
	}

	exports['default'] = _ember['default'].Helper.helper(pluralizeHelper);
});
define('todomvc/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('todomvc/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'todomvc/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _todomvcConfigEnvironment) {
  var _config$APP = _todomvcConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('todomvc/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('todomvc/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('todomvc/initializers/ember-cli-mirage', ['exports', 'ember', 'ember-cli-mirage/utils/read-modules', 'todomvc/config/environment', 'todomvc/mirage/config', 'ember-cli-mirage/server', 'lodash/assign'], function (exports, _ember, _emberCliMirageUtilsReadModules, _todomvcConfigEnvironment, _todomvcMirageConfig, _emberCliMirageServer, _lodashAssign) {
  exports.startMirage = startMirage;
  var getWithDefault = _ember['default'].getWithDefault;
  exports['default'] = {
    name: 'ember-cli-mirage',
    initialize: function initialize(application) {
      if (arguments.length > 1) {
        // Ember < 2.1
        var container = arguments[0],
            application = arguments[1];
      }

      if (_shouldUseMirage(_todomvcConfigEnvironment['default'].environment, _todomvcConfigEnvironment['default']['ember-cli-mirage'])) {
        startMirage(_todomvcConfigEnvironment['default']);
      }
    }
  };

  function startMirage() {
    var env = arguments.length <= 0 || arguments[0] === undefined ? _todomvcConfigEnvironment['default'] : arguments[0];

    var environment = env.environment;
    var discoverEmberDataModels = getWithDefault(env['ember-cli-mirage'] || {}, 'discoverEmberDataModels', true);
    var modules = (0, _emberCliMirageUtilsReadModules['default'])(env.modulePrefix);
    var options = (0, _lodashAssign['default'])(modules, { environment: environment, baseConfig: _todomvcMirageConfig['default'], testConfig: _todomvcMirageConfig.testConfig, discoverEmberDataModels: discoverEmberDataModels });

    return new _emberCliMirageServer['default'](options);
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }
    var userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    var defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    var usingInDev = env === 'development' && !addonConfig.usingProxy;
    var usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
define('todomvc/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('todomvc/initializers/ember-faker', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize() /* container, application */{
    // application.inject('route', 'foo', 'service:foo');
  }

  ;

  exports['default'] = {
    name: 'ember-faker',
    initialize: initialize
  };
});
define('todomvc/initializers/export-application-global', ['exports', 'ember', 'todomvc/config/environment'], function (exports, _ember, _todomvcConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_todomvcConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _todomvcConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_todomvcConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('todomvc/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('todomvc/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('todomvc/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("todomvc/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _emberDataInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInstanceInitializersInitializeStoreService["default"]
  };
});
define('todomvc/mirage/config', ['exports'], function (exports) {
  exports['default'] = function () {
    this.resource('items');

    // Same equivalent of:
    // this.get('/items');
    // this.get('/items/:id');
    // this.post('/items');
    // this.put('/items/:id');
    // this.patch('/items/:id');
    // this.del('/items/:id');
  };
});
define('todomvc/mirage/factories/item', ['exports', 'ember-cli-mirage', 'faker'], function (exports, _emberCliMirage, _faker) {
  exports['default'] = _emberCliMirage.Factory.extend({
    title: function title() {
      return _faker['default'].lorem.words(3);
    },
    done: (0, _emberCliMirage.trait)({
      completed: true
    }),
    todo: (0, _emberCliMirage.trait)({
      completed: false
    })
  });
});
define('todomvc/mirage/models/item', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.Model.extend({});
});
define('todomvc/mirage/scenarios/default', ['exports'], function (exports) {
  exports['default'] = function (server) {
    server.createList('item', 2, 'done');
    server.createList('item', 2, 'todo');
    /*
      Seed your development database using your factories.
      This data will not be loaded in your tests.
    */

    // server.createList('post', 10);
  };
});
define('todomvc/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  exports['default'] = _emberCliMirage.JSONAPISerializer.extend({});
});
define('todomvc/models/item', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    completed: _emberData['default'].attr('boolean')
  });
});
define('todomvc/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('todomvc/router', ['exports', 'ember', 'todomvc/config/environment'], function (exports, _ember, _todomvcConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _todomvcConfigEnvironment['default'].locationType,
		rootURL: _todomvcConfigEnvironment['default'].rootURL
	});

	Router.map(function () {
		this.route('active');
		this.route('completed');
	});

	exports['default'] = Router;
});
define('todomvc/routes/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		repo: _ember['default'].inject.service(),
		model: function model() {
			return this.get('repo').findAll();
		}
	});
});
define('todomvc/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('todomvc/services/repo', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Service.extend({
		store: _ember['default'].inject.service(),
		lastId: 0,

		findAll: function findAll() {
			return this.set('data', this.get('store').findAll('item'));
		},

		add: function add(attrs) {
			var item = this.get('store').createRecord('item', attrs);
			return item.save();
		},

		'delete': function _delete(todo) {
			this.get('store').find('item', todo.id).then(function (item) {
				item.destroyRecord();
			});
		}
	});
});
define("todomvc/templates/active", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8O3lZSvu", "block": "{\"statements\":[[\"append\",[\"helper\",[\"todo-list\"],null,[[\"todos\"],[[\"get\",[\"todos\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/active.hbs" } });
});
define("todomvc/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QNmHycYw", "block": "{\"statements\":[[\"open-element\",\"section\",[]],[\"static-attr\",\"id\",\"todoapp\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"header\",[]],[\"static-attr\",\"id\",\"header\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"todos\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"id\",\"new-todo\"],[\"dynamic-attr\",\"onkeydown\",[\"helper\",[\"action\"],[[\"get\",[null]],\"createTodo\"],null],null],[\"static-attr\",\"placeholder\",\"What needs to be done?\"],[\"static-attr\",\"autofocus\",\"\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"gt\"],[[\"get\",[\"model\",\"length\"]],0],null]],null,4],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"footer\",[]],[\"static-attr\",\"id\",\"info\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Double-click to edit a todo\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    Created by\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://github.com/cibernox\"],[\"flush-element\"],[\"text\",\"Miguel Camba\"],[\"close-element\"],[\"text\",\",\\n    \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://github.com/addyosmani\"],[\"flush-element\"],[\"text\",\"Addy Osmani\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Part of \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://todomvc.com\"],[\"flush-element\"],[\"text\",\"TodoMVC\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"id\",\"clear-completed\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"clearCompleted\"],null],null],[\"flush-element\"],[\"text\",\"Clear completed\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Completed\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Active\"]],\"locals\":[]},{\"statements\":[[\"text\",\"All\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"footer\",[]],[\"static-attr\",\"id\",\"footer\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"id\",\"todo-count\"],[\"flush-element\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"remaining\",\"length\"]],false],[\"close-element\"],[\"text\",\" \"],[\"append\",[\"helper\",[\"pluralize\"],[\"item\",[\"get\",[\"remaining\",\"length\"]]],null],false],[\"text\",\" left\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"id\",\"filters\"],[\"flush-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"index\"],[[\"activeClass\"],[\"selected\"]],3],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"active\"],[[\"activeClass\"],[\"selected\"]],2],[\"close-element\"],[\"text\",\"\\n          \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"completed\"],[[\"activeClass\"],[\"selected\"]],1],[\"close-element\"],[\"text\",\"\\n        \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"completed\",\"length\"]]],null,0],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/application.hbs" } });
});
define("todomvc/templates/completed", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7qyGvTPX", "block": "{\"statements\":[[\"append\",[\"helper\",[\"todo-list\"],null,[[\"todos\"],[[\"get\",[\"todos\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/completed.hbs" } });
});
define("todomvc/templates/components/todo-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "uhc3ID/K", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"view\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"class\",\"toggle\"],[\"dynamic-attr\",\"checked\",[\"unknown\",[\"todo\",\"completed\"]],null],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleCompleted\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"ondblclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"startEditing\"],null],null],[\"flush-element\"],[\"append\",[\"unknown\",[\"todo\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"removeTodo\"],null],null],[\"static-attr\",\"class\",\"destroy\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"text\"],[\"static-attr\",\"class\",\"edit\"],[\"dynamic-attr\",\"value\",[\"unknown\",[\"todo\",\"title\"]],null],[\"dynamic-attr\",\"onblur\",[\"helper\",[\"action\"],[[\"get\",[null]],\"doneEditing\"],[[\"value\"],[\"target.value\"]]],null],[\"dynamic-attr\",\"onkeydown\",[\"helper\",[\"action\"],[[\"get\",[null]],\"handleKeydown\"],null],null],[\"static-attr\",\"autofocus\",\"\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/components/todo-item.hbs" } });
});
define("todomvc/templates/components/todo-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "+yC2joV7", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"todos\",\"length\"]]],null,2]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      \"],[\"append\",[\"helper\",[\"todo-item\"],null,[[\"todo\",\"onStartEdit\",\"onEndEdit\"],[[\"get\",[\"todo\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"disableToggle\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"enableToggle\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"todo\"]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"checkbox\"],[\"static-attr\",\"id\",\"toggle-all\"],[\"dynamic-attr\",\"checked\",[\"unknown\",[\"allCompleted\"]],null],[\"dynamic-attr\",\"onchange\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleAll\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"canToggle\"]]],null,1],[\"text\",\"  \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"id\",\"todo-list\"],[\"static-attr\",\"class\",\"todo-list\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"todos\"]]],null,0],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/components/todo-list.hbs" } });
});
define("todomvc/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "StDDpEzJ", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"model\",\"length\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"todo-list\"],null,[[\"todos\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/index.hbs" } });
});
define('todomvc/tests/mirage/mirage/config.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/config.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass jshint.');
  });
});
define('todomvc/tests/mirage/mirage/factories/item.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/factories/item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/item.js should pass jshint.');
  });
});
define('todomvc/tests/mirage/mirage/models/item.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/models/item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/item.js should pass jshint.');
  });
});
define('todomvc/tests/mirage/mirage/scenarios/default.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/scenarios/default.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.');
  });
});
define('todomvc/tests/mirage/mirage/serializers/application.jshint.lint-test', ['exports'], function (exports) {
  QUnit.module('JSHint | mirage/serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass jshint.');
  });
});


define('todomvc/config/environment', ['ember'], function(Ember) {
  var prefix = 'todomvc';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("todomvc/app")["default"].create({"name":"todomvc","version":"0.0.0+"});
}
//# sourceMappingURL=todomvc.map
