console.log('Loading routes ...')

var users = require('../controllers/users.js')
var polls = require('../controllers/polls.js')

module.exports = function(app){
  app.get('/users', users.index),
  app.post('/users', users.create),
  app.post('/sessions', users.login),
  app.get('/polls', polls.index),
  app.post('/polls', polls.create),


  app.put('/polls/:id/vote1', polls.updateoption1vote),
  app.put('/polls/:id/vote2', polls.updateoption2vote),
  app.put('/polls/:id/vote3', polls.updateoption3vote),
  app.put('/polls/:id/vote4', polls.updateoption4vote),


  app.get('/users/:id', users.show),
  app.delete('/users/:id', users.destroy),
  app.get('/polls/:id', polls.show),
  app.delete('/polls/:id', polls.destroy)
}
