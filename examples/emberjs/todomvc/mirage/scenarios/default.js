export default function(server) {
  server.createList('item', 2, 'done');
  server.createList('item', 2, 'todo');
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
}
