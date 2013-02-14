define(['knockout', 'jquery', 'kovalidation'], function(ko, $) {
   return {
       index: function()
       {
           require(['js/text!/users', 'js/users.list.viewmodel'], function(view, ViewModel) {
               $.ajax({
                   url: "/api/users/",
                   type: 'GET'
               }).done( function(users) {
                    $("#main-region").html(view);
                    var viewModel = new ViewModel(users);
                    ko.applyBindingsWithValidation(viewModel, document.getElementById("main-region"));
                });
                     
             });
               
               
             
       }
       
   }

});