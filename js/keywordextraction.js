

var keyword_extractor = require("keyword-extractor");


var sentence = Input.items;

//Extract the keywords 
var extraction_result = keyword_extractor.extract(sentence,{
                                                            language:"english",
                                                            remove_digits: true,
                                                            return_changed_case:true,
                                                            remove_duplicates: false

                                                       });

// testing
//console.log(extraction_result);
//document.getElementById("demo").innerHTML = extraction_result;
ReactDOM.render(
		 
		document.getElementById('search')
);