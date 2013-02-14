require(['knockout', 'sammy', 'amplify', 'domready!','kovalidation','flash','kocommand'], function(ko, sammy, amplify) {
    
    ko.validation.init({insertMessages: false, errorClass: 'error', decorateElement: true});

    sammy("#main-region", function() {

        var self = this;

        this.get("#/", function()
        {
            document.getElementById("main-region").innerHTML = "";
        });

        this.get('#/pages/new', function(context) {

            require(['js/pages'], function(pages) {
                pages.new();
            });

            amplify.subscribe("PageSavedEvent", function(page)
            {

                context.redirect("#/pages/" + page.id);
            });
        });

        this.get('#/pages/:page', function(context) {
            var page = this.params['page'];
            require(['js/pages'], function(pages) {
                pages.edit(page);
            });



           amplify.subscribe("PageRemovedEvent", function(pageid)
            {
                if( pageid != page) return;
                context.redirect("#/");
            });

        });
        
        this.get('#/users', function(context) {
              require(['js/users'], function(users) {
              
                users.index();
                
            });
        });


    }).run("#/");

    require(['js/pages'], function(pages) {
        pages.navigation();
    });
});