window.$vars = {
  type : "text",
}
$(document).ready(function(){
  console.log("Document is ready...");

  showPassword = function(name){
    var tags = (document.querySelectorAll('.form-control.input-sm.passwordfield'))
    for (var tag in tags) {
      if (tags[tag].name === name) {
        tags[tag].type = "text"
        break
      }
    }
  }

  hidePassword = function(name){
    var tags = (document.querySelectorAll('.form-control.input-sm.passwordfield'))
    for (var tag in tags) {
      if (tags[tag].name === name) {
        tags[tag].type = "password"
        break
      }
    }
  }
  
  showGlyph = function(name){
    var glyphs = (document.querySelectorAll('.glyphicon.glyphicon-eye-open'))
    for (var glyph in glyphs) {
      if (glyphs[glyph].attributes.name.nodeValue === name) {
        glyphs[glyph].style.display = "inline";
        break
      }
    }
  }
  hideGlyph =  function(name){
    var glyphs = (document.querySelectorAll('.glyphicon.glyphicon-eye-open'))
    for (var glyph in glyphs) {
      if (glyphs[glyph].attributes.name.nodeValue === name) {
        glyphs[glyph].style.display = "none";
        break
      }
    }
  }
})
