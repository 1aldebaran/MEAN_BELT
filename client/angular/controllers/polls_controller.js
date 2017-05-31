app.controller('PollsController', function(UserFactory, PollFactory, $cookies, $location, $routeParams, $moment){
	console.log('initializing PollsController...');

	var self = this
	self.errors = []
	self.messages = []
	self.newPoll = {}
  self.polls = []
	self.poll = {}
	self.user = $cookies.getObject('currentUser')

	self.index = function(){
		PollFactory.index(function(response){
			self.polls = response.data
		})
	}

	self.show = function(){
		PollFactory.show($routeParams.id, function(response){
			self.poll = response.data
		})
	}

	self.voteoption1 = function(poll_id){
		user_id = $cookies.getObject('currentUser')._id
		PollFactory.voteoption1(poll_id, user_id, function(){
			self.show()
		})
	}

  self.voteoption2 = function(poll_id){
		user_id = $cookies.getObject('currentUser')._id
		PollFactory.voteoption2(poll_id, user_id, function(){
			self.show()
		})
	}

  self.voteoption3 = function(poll_id){
		user_id = $cookies.getObject('currentUser')._id
		PollFactory.voteoption3(poll_id, user_id, function(){
			self.show()
		})
	}

  self.voteoption4 = function(poll_id){
		user_id = $cookies.getObject('currentUser')._id
		PollFactory.voteoption4(poll_id, user_id, function(){
			self.show()
		})
	}

	self.create = function(newPoll){
		self.errors = []
		newPoll._originator = $cookies.getObject('currentUser')._id
		PollFactory.create(newPoll, function(response){
      self.newPoll = {}
			if(response.data.errors){
				for(key in response.data.errors){
					self.errors.push(response.data.errors[key].message)
				}
			}
			else {
				$location.url('/dashboard')
			}
		})
	}

	self.destroyPoll = function(poll_id){
		PollFactory.destroy(poll_id, self.index)
	}

})
