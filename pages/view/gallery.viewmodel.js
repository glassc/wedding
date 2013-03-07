define(["knockout", "jquery", "kosortable"], function(ko, $) {
    
    
    
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
        
        function AddImage(url)
        {
            self.images.push(new ImageViewModel(url));
        }
        
        self.ToJSON = function()
        {
            var urls = [];
            
            self.images().forEach(function(image) {
               urls.push(image.image); 
            });
            
            
            
            return {
                type: "gallery",
                images: urls
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
    }
    
    function ImageViewModel(url)
    {
        var self = this;
        self.image = ko.observable(url);
        
        self.selected = ko.observable(false);
        
        self.ToggleSelected = function()
        {
             self.selected( !self.selected() );
        }
    }
    
    
    return ViewModel;
    
});