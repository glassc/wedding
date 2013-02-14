define(['knockout', 'jquery', 'kovalidation'], function(ko, $) {
   return {
       edit: function(pageid)
       {
           require(['js/text!/pages/edit', 'js/pages.modify.viewmodel'], function(view, ViewModel, GalleryViewModel) {
               $.ajax({
                   url: "/api/pages/" + pageid,
                   type: 'GET'
               }).done( function(page) {
                       $("#main-region").html(view);
                       var viewModel = new ViewModel(page);
                       ko.applyBindings(viewModel, document.getElementById("main-region"));
                     
               });
           });



       },

       new: function()
       {
           require(['js/text!/pages/edit', 'js/pages.modify.viewmodel'], function(view, ViewModel, GalleryViewModel) {
               $("#main-region").html(view);
               var viewModel = new ViewModel( {links : {self: "/api/pages"}, content:[""]});
               ko.applyBindings(viewModel, document.getElementById("main-region"));
               
           });
       },

       navigation: function()
       {

           $.ajax({
               url: "/api/pages/",
               type: 'GET'
           }).done( function(pages) {
                   require(['js/pages.navigation.viewmodel'], function(ViewModel) {

                       var viewModel = new ViewModel(pages);
                       ko.applyBindings(viewModel, document.getElementById("navigation-region"));
                       $("#page-navigation").show();
                   });
               });
       }
   }

});