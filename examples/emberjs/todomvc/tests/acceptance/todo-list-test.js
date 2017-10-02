import { test } from 'qunit';
import moduleForAcceptance from 'todomvc/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | todo list', {
  beforeEach: () => {
    window.localStorage.clear();
  }
});


test('add items to the todo list', function(assert) {
  visit('/#');

  fillIn("input#new-todo", "Create a presentation");
  keyEvent('input#new-todo', 'keydown', 13);

  fillIn("input#new-todo", "Add some memes");
  keyEvent('input#new-todo', 'keydown', 13);

  andThen(function() {
    assert.equal(find("ul#todo-list li:first").text().trim(), "Create a presentation");
    assert.equal(find("ul#todo-list li:last").text().trim(), "Add some memes");
  });
});

test('mark some items as done', function(assert) {
  visit('/#');

  fillIn("input#new-todo", "Create a presentation");
  keyEvent('input#new-todo', 'keydown', 13);

  click("ul#todo-list li:first input.toggle");

  andThen(function() {
    assert.equal(find("span#todo-count").text().trim(), "0 items left");
  });
});
