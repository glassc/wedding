var assert = require("assert");
var loadr = require("../../loadr");

function ko()
{
}

ko.observable = function(initialValue)
{
    var value = initialValue;

    function observable() {
        if (arguments.length > 0) {
            value = arguments[0];    
            return this;
        }  else {
            return value;
        }
    }    
}

ko.observableArray = function(initialValues)
{
    
}

var ViewModel = loadr("../users/view/users_list_viewmodel");

describe("List Users View Model", function() {
    
    
});