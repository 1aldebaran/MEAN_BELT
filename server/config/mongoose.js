console.log('Loading mongoose connector...')

var mongoose = require( 'mongoose' )
var fs = require('fs')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/MEAN_BELT')
  .then(
    function(){
      console.log('Connected to database')
      console.log(Object.size(mongoose.connection.collections) + " collections registered");
    },
    function(){
      console.log('failed to connect to database')
    }
)

var models_path = __dirname + '/../models'
fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') != -1){
    console.log('Loading ' + file + ' ...' )
    require(models_path + '/' + file)
  }
})


Object.size = function(object){
  var size = 0, key;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      size ++
    }
  }
  return size
}
