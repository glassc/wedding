define(["knockout", "exports", "ko.flash"], function(ko, exports)
{
    function ViewModel()
    {
        this.message = ko.observable();
    }

    var vm = new ViewModel();
    ko.applyBindings(vm, document.getElementById("flash-region"));

    return function(message)
    {
        vm.message(message);
    }



});