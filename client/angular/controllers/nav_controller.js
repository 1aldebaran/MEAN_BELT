app.controller('NavController', function($scope, $rootScope, $cookies, $location, UserFactory){
  $scope.user = $cookies.getObject('currentUser') || null
  $scope.state = UserFactory.state()

  $scope.$on('updateState', function(event, args){
    $scope.state = args.value
  })

  $scope.logout = function(){
    $cookies.remove('currentUser')
    $scope.state = UserFactory.state()
    $location.url('/')
  }
})
