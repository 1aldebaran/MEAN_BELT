app.factory('UserFactory', function($http, $cookies){
  var factory = {}

  factory.state = function(){
    if($cookies.getObject('currentUser')){
      return true
    }
    else{
      return false
    }
  }

  factory.index = function(callback){
    $http.get('/users').then(callback)
  }

  factory.create = function(newUser, callback){
    $http.post('/users', newUser).then(callback)
  }

  factory.login = function(currentUser, callback){
    $http.post('/sessions', currentUser).then(callback)
  }

  factory.session = function(){
    if($cookies.getObject('currentUser')){
      return true
    }
    return false
  }

  factory.show = function(user_id, callback){
    $http.get('/users/' + user_id).then(callback)
  }

  factory.destroy = function(user_id, callback){
    $http.delete('/users/' + user_id).then(callback)
  }

  return factory
})
