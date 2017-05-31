console.log('Loading users controller...');
var mongoose = require( 'mongoose' )

var User = mongoose.model('User')

module.exports = {

  index : function(request, response){
    User.find({})
    .populate(
      {
        path : 'polls',
        model : 'Poll'
      }
    )
    .exec(function(error, users){
      if(error){
        return response.json(error)
      }
      return response.json(users)
    })
  },

  create: function(request, response){
    User.create(request.body, function(error, user){
      if(error){
        return response.json(error)
      }
      return response.json(user)
    })
  },

  login: function(request, response){
    User.findOne({email:request.body.email}, function(error, user){
      if(error){
        return response.json(error)
      }
      if(user && user.authenticate(request.body.password)){
        if(error){
            return response.json(error)
        }
        return response.json(user)
      }
      return response.json({
        'errors' : {
          'user' : {
            'message' : 'Invalid Credentials'
          }
        }
      })
    })
  },

  show : function(request, reaponse){
    User.findById(request.params.id, function(error, user){
      if(error){
        return response.json(error)
      }
      if (!user){
        return response.json({
          'errors' : {
            'user' : {
              'message' : '404 - User not found'
            }
          }
        })
      }
      return response.json(user)
    })
  },

  update : function(request, response){
    User.findByIdAndUpdate(request.params.id, { $set : request.body }, { new : true }, function(error, user){
      if(error){
        return response.json(error)
      }
      if (!user){
        return response.json({
          'errors' : {
            'user' : {
              'message' : '404 - User not found'
            }
          }
        })
      }
      return response.json(user)
    })
  },

  destroy : function(request, response){
    User.findById(request.params.id, function(error, user){
      if(error){
        return response.json(error)
      }
      if (!user){
        return response.json({
          'errors' : {
            'user' : {
              'message' : '404 - User not found'
            }
          }
        })
      }
      user.remove(function(){
        if(error){
          return response.json(error)
        }
        return response.json(user)
      })
    })
  }
}
