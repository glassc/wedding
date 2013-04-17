define(["knockout", "jquery", "alertify",  '/admin/images/image.browser.js', "kosortable",], function(ko, $, alertify, imagebrowser) {
    
    
    
    function ViewModel(images)
    {
        var self = this;
        
        self.template = "gallery-content-template";
        self.selected = ko.observable(false);
        self.images = ko.observableArray();
        self.type = "Gallery";
     
        if( images )
        {
            images.forEach(function(image) {
                self.images.push(new ImageViewModel(image));
            });
        }
        
        
        
        self.ShowFileChooser = function()
        {

            imagebrowser.show(function(image) {
                if( image === null) return;
                self.images.push(new ImageViewModel({url: image, caption: ""}));
            });
       
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
                    
                    AddImage(result.url);
                });    
        };
        
        function AddImage(image)
        {
            self.images.push(new ImageViewModel(image));
        }
        
        self.ToJSON = function()
        {
            var imageArr = [];
            
            self.images().forEach(function(image) {
               imageArr.push({url: image.image, caption: image.caption}); 
            });
            
            
            
            return {
                type: "gallery",
                images: imageArr
            };
          
            
            
        };
        
        self.ToggleSelected = function()
        {
             self.selected( !self.selected() );
        };
        
        self.Remove = function(image)
        {
            alertify.set({ labels: {ok     : "Yes",    cancel : "No"}, buttonReverse: true });
            alertify.confirm("Are you sure you would like to remove this image?", function(e)  {
                if( !e ) return;
                self.ToGalleryMode(image);
                self.images.remove(image);
                
            });
        };
        
      
       
    }
    
    function ImageViewModel(image)
    {
        var self = this;
        self.image = ko.observable(image.url);
        self.View = ko.observable("gallery-content-template-small");
        self.caption = ko.observable(image.caption);
 
        self.Hide = function()
        {
            self.View("gallery-content-template-small");
        };
        
        self.Edit = function()
        {
            self.View("gallery-content-template-edit");
            
        };
        
    }
    
    
    return ViewModel;
    
});