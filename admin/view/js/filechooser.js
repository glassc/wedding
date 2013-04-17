define(["knockout", "jquery", "alertify"], function(ko, $, alertify) {
    return {
        Show: function()
        {
             alertify.set({ labels: {ok     : "OK",    cancel : "Cancel"}, buttonReverse: true });
             alertify.confirm("<div style = \"color: red;border: 1px solid red; width: 700px; height: 500px;\">asdasd</div>", function(result) {});
        }
    }

});