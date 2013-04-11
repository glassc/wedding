define(['knockout', 'jquery', '/admin/pages/pages.navigation.viewmodel.js'], function(ko,$, PagesViewModel) {

   
   return {
       edit: function(pageid)
       {
           require(['js/text!/pages/edit', '/admin/pages/pages.modify.viewmodel.js'], function(view, ViewModel) {
               
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
           require(['js/text!/pages/edit', '/admin/pages/pages.modify.viewmodel.js'], function(view, ViewModel, GalleryViewModel) {
               $("#main-region").html(view);
               var viewModel = new ViewModel( {links : {self: "/api/pages"}, content:[{type:"text", content:""}]});
               ko.applyBindings(viewModel, document.getElementById("main-region"));
               
           });
       },

       navigation: function(pages)
       {
            var viewModel = new PagesViewModel(pages);
            ko.applyBindings(viewModel, document.getElementById("navigation-region"));
       }
   }

});