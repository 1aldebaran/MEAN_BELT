console.log('Loading polls controller...');

var mongoose = require( 'mongoose' )

var User = mongoose.model('User')
var Poll = mongoose.model('Poll')

module.exports = {

  index: function(request, response){
    Poll.find({})
    .populate({
      path : '_originator',
      model : 'User'
    })
    .exec(function(error, polls){
      if(error){
        return response.json(error)
      }
      return response.json(polls)
    })
  },

  create: function(request, response){
    console.log(request.body);
    Poll.create(request.body, function(error, poll){
      if(error){
        return response.json(error)
      }
      User.findByIdAndUpdate(request.body._originator, { $push : { polls : poll._id }}, function(error, user){
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
        return response.json(poll)
      })
    })
  },

  show : function(request, response){
    Poll.findById(request.params.id)
    .populate(
      {
        path : '_originator',
        model : 'User',
      }
    )
    .exec(function(error, poll){
      if(error){
        return response.json(error)
      }
      return response.json(poll)
    })
  },

  destroy : function(request, response){
    Poll.findById(request.params.id, function(error, poll){
      console.log(poll);
      if(error){
        return response.json(error)
      }
      if (!poll){
        return response.json({
          'errors' : {
            'poll' : {
              'message' : '404 - Poll not found'
            }
          }
        })
      }
      console.log(poll);
      poll.remove(function(){
        if(error){
          return response.json(error)
        }
        return response.json(poll)
      })
    })
  },

  updateoption1vote : function(request, response){
    Poll.findById(request.body.poll, function(error, poll){
      if(error){
        return response.json(error)
      }
      if (!poll){
        return response.json({
          'errors' : {
            'poll' : {
              'message' : '404 - Poll not found'
            }
          }
        })
      }
      if(poll.option1vote.indexOf(request.body.user) > -1){
        Poll.findByIdAndUpdate( poll.id, { $pull : { option1vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
      else{
        Poll.findByIdAndUpdate( poll.id, { $push : {option1vote : request.body.user}}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
    })
  },

  updateoption2vote : function(request, response){
    Poll.findById(request.body.poll, function(error, poll){
      if(error){
        return response.json(error)
      }
      if (!poll){
        return response.json({
          'errors' : {
            'poll' : {
              'message' : '404 - Poll not found'
            }
          }
        })
      }
      if(poll.option2vote.indexOf(request.body.user) > -1){
        Poll.findByIdAndUpdate( poll.id, { $pull : { option2vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
      else{
        Poll.findByIdAndUpdate( poll.id, { $push : { option2vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
    })
  },

  updateoption3vote : function(request, response){
    Poll.findById(request.body.poll, function(error, poll){
      if(error){
        return response.json(error)
      }
      if (!poll){
        return response.json({
          'errors' : {
            'poll' : {
              'message' : '404 - Poll not found'
            }
          }
        })
      }
      if(poll.option3vote.indexOf(request.body.user) > -1){
        Poll.findByIdAndUpdate( poll.id, { $pull : { option3vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
      else{
        Poll.findByIdAndUpdate( poll.id, { $push : { option3vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
    })
  },

  updateoption4vote : function(request, response){
    Poll.findById(request.body.poll, function(error, poll){
      if(error){
        return response.json(error)
      }
      if (!poll){
        return response.json({
          'errors' : {
            'poll' : {
              'message' : '404 - Poll not found'
            }
          }
        })
      }
      if(poll.option4vote.indexOf(request.body.user) > -1){
        Poll.findByIdAndUpdate( poll.id, { $pull : { option4vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
      else{
        Poll.findByIdAndUpdate( poll.id, { $push : { option4vote : request.body.user }}, function(error, poll){
          if(error){
            return response.json(error)
          }
          return response.json(poll)
        })
      }
    })
  },
}
