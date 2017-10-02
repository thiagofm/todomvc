export default function() {
  this.resource('items');

  // Same equivalent of:
  // this.get('/items');
  // this.get('/items/:id');
  // this.post('/items');
  // this.put('/items/:id');
  // this.patch('/items/:id');
  // this.del('/items/:id');
}
