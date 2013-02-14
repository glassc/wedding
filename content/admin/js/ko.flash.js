define(["knockout", "jquery"], function(ko, $)
{
    ko.bindingHandlers.flash = {
        init: function(element, valueAccessor) {
            $(element).hide();
        },
        update: function(element, valueAccessor) {
            var value = valueAccessor();
            var message = ko.utils.unwrapObservable(value);
            if(  typeof(message) == 'undefined' || message == "") return;
            $(element).html(ko.utils.unwrapObservable(value));
            $(element).fadeIn(2000).delay(3000).fadeOut(2000);
            value("");
        }
    };
});

