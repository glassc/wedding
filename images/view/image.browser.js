define(['js/text!/images/browser', 'knockout', 'jquery', '/admin/images/image.browser.viewmodel.js'], function(view, ko, $, ViewModel) {
    
    return { 
        show: function(callback) {
            
            
            $.ajax({
                url: "/api/images",
                type: 'GET',
        
            }).done( function(images) {
                   
                $("#main-region").append(view);    
                var imagebrowser = $('#imagebrowser');
                
                
                var viewModel = new ViewModel(images, function(selection_result) {
                    
                    imagebrowser.on('hidden', function () {
                        imagebrowser.remove(); 
                        callback(selection_result);
                    });
                    
                    imagebrowser.modal("hide");
                });
                
                
                
                ko.applyBindings(viewModel, document.getElementById("imagebrowser"));
                $('#imagebrowser').modal({backdrop: "static"});
            }); 
        }
    };
});