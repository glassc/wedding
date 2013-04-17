define(['knockout', 'kocommand'], function(ko) {
    
    function ImageBrowserViewModel(images, callback)
    {
        var self = this;
        self.Images = ko.observableArray();
        self.Visible = ko.observable(true);
        self.selectedImage = ko.observable(-1);
        self.callback = callback;
        
        
        
        for(var i = 0; i < images.length; i++)
            self.Images.push({id: i, url: images[i], IsSelected: ko.observable(false)});
            
        self.Cancel = function()
        {
           self.callback(null);    
        };
        
        self.ShowFileChooser = function()
        {
             $('#image-browser-file-upload').click();
        };
        
        self.UploadImage = function(data, event)
        {
            var formData = new FormData();
            formData.append('image', event.target.files[0]);
            
            $.ajax({
                url: "/api/images",
                type: 'POST',
                data: formData,
                processData: false,  
                contentType: false
                }).done( function(result) {
                    
                    self.Images.push({id:  self.Images().length, url: result.url, IsSelected:  ko.observable(false)});
                });    
        };
        
     
        
        self.OKCommand = ko.command({
            execute: function() {
           
                self.callback( self.Images()[self.selectedImage()].url);

            },
            canExecute: function() {
             
                return self.selectedImage() !== -1;
            }
        });
        
        self.SelectImage = function(index) {
            self.selectedImage(index);
        };
        
        self.IsSelected = function(index) {
         
            return ko.computed(function() {
              
               return index == self.selectedImage();
            });
        };
        
        
        
    }
    
    return ImageBrowserViewModel;
    

});