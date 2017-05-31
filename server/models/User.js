var mongoose = require( 'mongoose' )
var bcrypt = require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator')
var self = this

var Poll =  mongoose.model('Poll')

var UserSchema = new mongoose.Schema({
  first_name : {
    type : String,
    required: [true, 'First name cannot be blank!'],
    maxlength: [120, 'First name cannot exceed 120 characters!'],
  },

  last_name : {
    type : String,
    required: [true, 'Last name cannot be blank!'],
    maxlength: [120, 'Last name cannot exceed 120 characters!'],
  },

  email : {
    type : String,
    required : [true, 'Email cannot be blank!'],
    validate : {
      validator : function(email){
        return /\S*\@\S+/g.test(email)
      },
      message : 'You must provide a valid email!'
    },
    unique : true,
  },

  password : {
    type : String,
    required : [true, 'Password cannot be blank!'],
  },

  polls : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Topic'
    }
  ],

}, { timestamps : true })

UserSchema.pre('remove', function(callback){
  Poll.remove({ _originator : this._id}, function(){
    callback()
  })
})


UserSchema.methods.hashPassword = function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
UserSchema.methods.authenticate = function(password){
  return bcrypt.compareSync(password, this.password)
}
UserSchema.methods.capfirst = function(v){
  return v.charAt(0).toUpperCase() + v.slice(1);
}

UserSchema.pre('save', function(callback){
  this.first_name = this.first_name.trim()
  this.last_name = this.last_name.trim()
  this.first_name = this.capfirst(this.first_name)
  this.last_name = this.capfirst(this.last_name)
  this.email = this.email.toLowerCase()
  this.hashPassword(this.password)
  callback()
})

UserSchema.plugin(uniqueValidator, { message : 'Email already registered.'})
mongoose.model('User', UserSchema)
