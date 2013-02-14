define(['knockout', 'jquery', 'flash', 'amplify','js/gallery.viewmodel','kovalidation', 'ko.ckeditor', 'kocommand', 'kosortable'], function(ko, $, flash, amplify, GalleryViewModel)
{

    function ContentViewModel(content)
    {
        var self = this;
        self.content = ko.observable(content);
        self.template = "html-content-template";
        self.selected = ko.observable(false);
        self.type = "Text";

        self.ToJSON = function()
        {
            return {
                type: "text",
                content: self.content()
            }
        }
        
        self.ToggleSelected = function()
        {
             self.selected( !self.selected() );
        }
        
        self.Remove = function()
        {
            
        }
        
        
    }


    function ViewModel(page)
    {
        var self = this;

        self.title = ko.observable(page.title).extend({ required: true });
        self.slug = ko.observable(page.slug).extend({ required: true });
        
        self.content = ko.observableArray();
        self.links = page.links;
        
        page.content.forEach(function(content) {
            self.content.push(Create(content));
        })
        
        function Create(content)
        {
            if (content.type == "text")
                return new ContentViewModel(content.content);
            else {
                return new GalleryViewModel(content.images);
            }
        }
        
        self.AddHtmlContent = function()
        {
            self.content.push(new ContentViewModel());
        }
        
        self.AddGalleryContent = function()
        {
            self.content.push(new GalleryViewModel());
        }
        
        self.Remove = function(content)
        {
            self.content.remove(content);
        }
        

        self.isNew = typeof(page.id) == 'undefined';

        self.getContent = function()
        {
            var result = [];
            
            self.content().forEach(function(content) {
               result.push(content.ToJSON()); 
            });
            
            return result;
        }

        self.isValid = function()
        {
            return ko.validation.group(self, {deep: true}).length === 0;
        }

        self.save = ko.command({
            execute: function() {
           
                $.ajax({
                    url: self.links.self,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "title": self.title, "slug" : self.slug, "content" : self.getContent()
                    }
                }).done( function(result) {
                    result.isNew = self.isNew;
                    flash(self.title() + " was saved successfully");
                    amplify.publish( "PageSavedEvent",result );
                });

            },
            canExecute: function() {
                return self.isValid();
            }
        })
    }

    return ViewModel;
})