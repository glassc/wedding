define(['knockout','jquery','bootstrap'], function(ko, $){
    function ViewModel()
    {
        var self = this;
        this.message = ko.observable("hi");
        self.callback = null;

        this.Ok = function()
        {

            $('#confirmation-dialog').modal('hide');
            self.callback(true);
        }

        this.cancel = function()
        {
            self.callback(false);
        }

        this.show = function(message, callback)
        {

            self.message(message);
            self.callback = callback;
            $('#confirmation-dialog').modal('show');

        }
    }

    var vm = new ViewModel();
    ko.applyBindings(vm, document.getElementById("confirmation-dialog"));

    return {
        show: function(message, callback) {

           vm.show(message, callback);
        }
    }

});
