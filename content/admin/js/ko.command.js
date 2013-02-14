define(['knockout'], function(ko)
{
    ko.command = function(options)
    {
        var self = ko.observable();

        self.execute = function() {
            if( !self.canExecute()) return;
            options.execute();
        };



        self.canExecute = ko.computed(function () {
            return options.canExecute();
        });


        return self;
    }

    ko.bindingHandlers.command = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var command = valueAccessor();

            $(element).click(function() {
                if (command.canExecute())
                {
                    command.execute();
                }
            });
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var command = valueAccessor();
            element.disabled = !command.canExecute();
        }
    }
});