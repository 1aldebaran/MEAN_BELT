app.controller('UsersController', function(UserFactory, $scope, $cookies, $location){
  console.log('Initializing UsersController...')
  $cookies.json = true
  var self = this
  self.users = []
  self.errors = []
  self.messages = []
  self.user = $cookies.getObject('currentUser')

  self.index = function(){
    UserFactory.index(function(response){
      self.users = response.data
    })
  },

  self.create = function(newUser){
    self.messages = []
    self.errors = []
    if (newUser.password === newUser.pass) {
      UserFactory.create(newUser, function(response){
        self.newUser = {}
        if (response.data.errors){
          for (key in response.data.errors){
            self.errors.push(response.data.errors[key].message)
          }
        }
        else{
          self.messages.push('Welcome to the board' + self.newUser.first_name)
          $cookies.putObject('currentUser', response.data)
          $scope.$root.$broadcast('updateState', {
            value: true
          })
          self.messages.push('Welcome to the board' + $cookies.getObject('currentUser').first_name)
          $location.url('/dashboard')
        }
      })
    }
    else {
      self.errors.push('Password does not match confirmation')
    }
  }

  self.login = function(currentUser){
    self.errors = []
    self.messages = []
    UserFactory.login(currentUser, function(response){
      if (response.data.errors){
        for (key in response.data.errors){
          self.errors.push(response.data.errors[key].message)
        }
      }
      else{

        self.currentUser = {}
        $cookies.putObject('currentUser', response.data)
        $scope.$root.$broadcast('updateState', {
          value: true
        })
        self.messages.push('Welcome back' + $cookies.getObject('currentUser').first_name)
        $location.url('/dashboard')
      }
    })
  }

  self.session = function(){
    self.messages = []
    var state = UserFactory.session()
    if(!state){
      self.messages.push('LOGIN FOR ACCESS!')
      $location.url('/')
    }
  }

  self.show = function(user_id){
    UserFactory.show($routeParams.id, function(response){
      $location.url('/profile/' + $routeParams.id)
    })
  }

  self.destroy = function(user_id){
    UserFactory.destroy(user_id, self.index())
  }
})
