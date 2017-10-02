import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title() { return faker.lorem.words(3); },
  done: trait({
    completed: true
  }),
  todo: trait({
    completed: false
  })
});
