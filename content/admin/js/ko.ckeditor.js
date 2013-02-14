define(['knockout', 'jquery', 'ckeditor'], function(ko, $)
{
    ko.bindingHandlers.htmlcontent = {
        init: function(element, valueAccessor) {
             var value = valueAccessor();
             $(element).html(ko.utils.unwrapObservable(value));
            
            
            $(element).ckeditor(function() {
                var editor = this;
                
                editor.on('change', function (ev) {
                  
                    value(editor.getData());
                
                });
            });
            
        }
    };
});
