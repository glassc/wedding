define(['knockout', 'amplify', 'flash','confirmation.dialog','amplify','kosortable','kocommand', 'bootstrap'], function(ko, amplify, flash, dialog, amplify) {
    function ViewModel(pages)
    {
        var self = this;
        self.pages = ko.observableArray();



        pages.forEach(function(page){
           self.pages.push(new PageLinkViewModel(page, self));
        });


        self.save = function(args)
        {
            var order = [];
            for(var i = 0; i < self.pages().length; i++)
            {

                order.push(self.pages()[i].id);

            }

            $.ajax({
                url: "/api/pages/order",
                type: 'POST',
                dataType: 'json',
                data: {
                    pages : order
                }
            }).done( function() {


            });
        }

        self.remove = function(page)
        {
            self.pages.remove(page)

        }

        amplify.subscribe("PageSavedEvent", function(savedPage) {
            var page = _.find(self.pages(), function(page){
                return page.id == savedPage.id;
            });



            if(typeof(page) === 'undefined' ) {
                self.pages.push(new PageLinkViewModel(savedPage, self));
            } else
                page.title(savedPage.title);
         });
    }

    function PageLinkViewModel(page, root)
    {
        var self = this;

        self.url = "#/pages/" + page.id;
        self.title = ko.observable(page.title);
        self.id = page.id;
        self.isSelected =  ko.observable(false);
        self.links = page.links;
        self.root = root;


        self.select = function()
        {

            self.isSelected(true);
        }

        self.unselect = function()
        {
            self.isSelected(false);
        }

        self.remove = ko.command({
            execute: function() {

                dialog.show("Are you sure you would like to remove " +  self.title() + "?", function(result){
                   if( !result ) return;
                   $.ajax({
                         url: self.links.self,
                         type: 'DELETE',
                         dataType: 'json',
                         data: {}
                     }).done( function() {
                         flash(self.title() + " has been removed successfully");
                         self.root.remove(self);
                         amplify.publish( "PageRemovedEvent",self.id );
                     });
                });
            },
            canExecute: function() {
                return true;
            }
        })
    }

    return ViewModel;
});