var mongoose = require('mongoose')
var self = this

var PollSchema = new mongoose.Schema({
  question : {
    type : String,
    required : [true, 'Please what is the question?'],
    minlength : [8, 'Please your question should have at least 8 characters']
  },

  option1 : {
    type : String,
    required : [true, 'Option 1 was left blank, please fill all four options.'],
    minlength : [3, 'Options question should have at least 3 characters']
  },

  option2 : {
    type : String,
    required : [true, 'Option 2 was left blank, please fill all four options.'],
    minlength : [3, 'Options question should have at least 3 characters']
  },

  option3 : {
    type : String,
    required : [true, 'Option 3 was left blank, please fill all four options.'],
    minlength : [3, 'Options question should have at least 3 characters']
  },

  option4 : {
    type : String,
    required : [true, 'Option 4 was left blank, please fill all four options.'],
    minlength : [3, 'Options question should have at least 3 characters']
  },

  _originator : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },

  option1vote : [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'User',
    }
  ],

  option2vote : [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'User',
    }
  ],

  option3vote : [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'User',
    }
  ],

  option4vote : [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'User',
    }
  ],

}, { timestamps : true })


mongoose.model('Poll', PollSchema)
