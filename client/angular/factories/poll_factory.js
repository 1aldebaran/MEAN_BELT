app.factory('PollFactory', function($http, $cookies){
  var factory = {}

  factory.index = function(callback){
    console.log("got  here");
    $http.get('/polls').then(callback)
  }

  factory.show = function(poll, callback){
    $http.get('/polls/' + poll ).then(callback)
  }

  factory.create = function(newPoll, callback){
    $http.post('/polls', newPoll).then(callback)
  }

  factory.destroy = function(poll_id, callback){
    $http.delete('/polls/' + poll_id).then(callback)
  }

  factory.voteoption1 = function(poll_id, user_id, callback){
    $http.put('/polls/' + poll_id + '/vote1', { poll : poll_id, user : user_id }).then(callback)
  }

  factory.voteoption2 = function(poll_id, user_id, callback){
    $http.put('/polls/' + poll_id + '/vote2', { poll : poll_id, user : user_id }).then(callback)
  }

  factory.voteoption3 = function(poll_id, user_id, callback){
    $http.put('/polls/' + poll_id + '/vote3', { poll : poll_id, user : user_id }).then(callback)
  }

  factory.voteoption4 = function(poll_id, user_id, callback){
    $http.put('/polls/' + poll_id + '/vote4', { poll : poll_id, user : user_id }).then(callback)
  }

  return factory
})
