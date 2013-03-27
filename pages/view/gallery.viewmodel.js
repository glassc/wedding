define(["knockout", "jquery", "kosortable"], function(ko, $) {
    
    
    
    function ViewModel(images)
    {
        var self = this;
        
        self.template = "gallery-content-template";
        self.selected = ko.observable(false);
        self.images = ko.observableArray();
        self.type = "Gallery";
        self.currentImage = null;
        
        
        if( images )
        {
            images.forEach(function(image) {
                self.images.push(new ImageViewModel(image));
            });
        }
        
        
        
        self.ShowFileChooser = function()
        {
            $('#file_upload').click();
        }
        
     
        
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
        }
        
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
            }
          
            
            
        }
        
        self.ToggleSelected = function()
        {
             self.selected( !self.selected() );
        }
        
        self.Remove = function(image)
        {
            
            self.images.remove(image);
        }
        
        self.Edit = function(image)
        {
            if( InEditMode() ) return;
            image.ToggleEditMode(true);
            self.currentImage = image;
        }
        
        self.GalleryMode = function(image)
        {
            image.ToggleEditMode(false);
            self.currentImage = null;
        }
        
        function InEditMode()
        {
            return self.currentImage !== null;
        }
       
    }
    
    function ImageViewModel(image)
    {
        var self = this;
        self.image = ko.observable(image.url);
        self.View = ko.observable("gallery-content-template-small");
        self.selected = ko.observable(false);
        self.caption = ko.observable(image.caption);
        
        self.ToggleSelected = function()
        {
             self.selected( !self.selected() );
        }
        
        self.ToggleEditMode = function(inEditMode)
        {
            self.View(inEditMode ? "gallery-content-template-edit" : "gallery-content-template-small")
        }
        
       
        
        
    }
    
    
    return ViewModel;
    
});