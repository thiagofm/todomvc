import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
	lastId: 0,

	findAll() {
		return this.set('data', this.get('store').findAll('item'));
	},

	add(attrs) {
		var item = this.get('store').createRecord('item', attrs);
    return item.save();
	},

	delete(todo) {
    this.get('store').find('item', todo.id).then(function (item) {
      item.destroyRecord();
    });
	}
});
