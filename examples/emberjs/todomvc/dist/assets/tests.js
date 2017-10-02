'use strict';

define('todomvc/tests/acceptance/todo-list-test', ['exports', 'qunit', 'todomvc/tests/helpers/module-for-acceptance'], function (exports, _qunit, _todomvcTestsHelpersModuleForAcceptance) {

  (0, _todomvcTestsHelpersModuleForAcceptance['default'])('Acceptance | todo list', {
    beforeEach: function beforeEach() {
      window.localStorage.clear();
    }
  });

  (0, _qunit.test)('add items to the todo list', function (assert) {
    visit('/#');

    fillIn("input#new-todo", "Create a presentation");
    keyEvent('input#new-todo', 'keydown', 13);

    fillIn("input#new-todo", "Add some memes");
    keyEvent('input#new-todo', 'keydown', 13);

    andThen(function () {
      assert.equal(find("ul#todo-list li:first").text().trim(), "Create a presentation");
      assert.equal(find("ul#todo-list li:last").text().trim(), "Add some memes");
    });
  });

  (0, _qunit.test)('mark some items as done', function (assert) {
    visit('/#');

    fillIn("input#new-todo", "Create a presentation");
    keyEvent('input#new-todo', 'keydown', 13);

    click("ul#todo-list li:first input.toggle");

    andThen(function () {
      assert.equal(find("span#todo-count").text().trim(), "0 items left");
    });
  });
});
define('todomvc/tests/acceptance/todo-list-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | acceptance/todo-list-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/todo-list-test.js should pass jshint.');
  });
});
define('todomvc/tests/app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('todomvc/tests/components/todo-item.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | components/todo-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/todo-item.js should pass jshint.');
  });
});
define('todomvc/tests/components/todo-list.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | components/todo-list.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/todo-list.js should pass jshint.');
  });
});
define('todomvc/tests/controllers/active.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/active.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/active.js should pass jshint.');
  });
});
define('todomvc/tests/controllers/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('todomvc/tests/controllers/completed.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | controllers/completed.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/completed.js should pass jshint.');
  });
});
define('todomvc/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
    if (window.server) {
      window.server.shutdown();
    }
  }
});
define('todomvc/tests/helpers/destroy-app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('todomvc/tests/helpers/gt.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/gt.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/gt.js should pass jshint.');
  });
});
define('todomvc/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'todomvc/tests/helpers/start-app', 'todomvc/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _todomvcTestsHelpersStartApp, _todomvcTestsHelpersDestroyApp) {
	var Promise = _ember['default'].RSVP.Promise;

	exports['default'] = function (name) {
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		(0, _qunit.module)(name, {
			beforeEach: function beforeEach() {
				this.application = (0, _todomvcTestsHelpersStartApp['default'])();

				if (options.beforeEach) {
					options.beforeEach.apply(this, arguments);
				}
			},

			afterEach: function afterEach() {
				var _this = this;

				var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
				return Promise.resolve(afterEach).then(function () {
					return (0, _todomvcTestsHelpersDestroyApp['default'])(_this.application);
				});
			}
		});
	};
});
define('todomvc/tests/helpers/module-for-acceptance.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('todomvc/tests/helpers/pluralize.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/pluralize.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/pluralize.js should pass jshint.');
  });
});
define('todomvc/tests/helpers/resolver', ['exports', 'todomvc/resolver', 'todomvc/config/environment'], function (exports, _todomvcResolver, _todomvcConfigEnvironment) {

	var resolver = _todomvcResolver['default'].create();

	resolver.namespace = {
		modulePrefix: _todomvcConfigEnvironment['default'].modulePrefix,
		podModulePrefix: _todomvcConfigEnvironment['default'].podModulePrefix
	};

	exports['default'] = resolver;
});
define('todomvc/tests/helpers/resolver.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('todomvc/tests/helpers/start-app', ['exports', 'ember', 'todomvc/app', 'todomvc/config/environment'], function (exports, _ember, _todomvcApp, _todomvcConfigEnvironment) {
	exports['default'] = startApp;

	function startApp(attrs) {
		var application = undefined;

		// use defaults, but you can override
		var attributes = _ember['default'].assign({}, _todomvcConfigEnvironment['default'].APP, attrs);

		_ember['default'].run(function () {
			application = _todomvcApp['default'].create(attributes);
			application.setupForTesting();
			application.injectTestHelpers();
		});

		return application;
	}
});
define('todomvc/tests/helpers/start-app.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('todomvc/tests/models/item.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | models/item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/item.js should pass jshint.');
  });
});
define('todomvc/tests/resolver.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('todomvc/tests/router.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('todomvc/tests/routes/application.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('todomvc/tests/services/repo.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | services/repo.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/repo.js should pass jshint.');
  });
});
define('todomvc/tests/test-helper', ['exports', 'todomvc/tests/helpers/resolver', 'ember-qunit'], function (exports, _todomvcTestsHelpersResolver, _emberQunit) {

	(0, _emberQunit.setResolver)(_todomvcTestsHelpersResolver['default']);
});
define('todomvc/tests/test-helper.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('todomvc/tests/unit/models/item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('item', 'Unit | Model | item', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('todomvc/tests/unit/models/item-test.jshint.lint-test', [], function () {
  'use strict';

  QUnit.module('JSHint | unit/models/item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/item-test.js should pass jshint.');
  });
});
require('todomvc/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
