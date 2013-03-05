require.config({

    deps: ["/admin/js/main.js"],
    baseUrl: "/admin",
    paths: {
        jquery: 'http://code.jquery.com/jquery-1.8.3.min',
        jqueryui: 'http://code.jquery.com/ui/1.9.2/jquery-ui',
        'jquery.ui.sortable' : 'http://code.jquery.com/ui/1.9.2/jquery-ui',
        knockout: 'http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1',
        bootstrap: 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.0/js/bootstrap.min',
        kovalidation: 'js/knockout.validation',
        kosortable: 'js/knockout-sortable.min',
        kocommand: 'js/ko.command',
        "ko.ckeditor": 'js/ko.ckeditor',
        sammy: 'http://cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.4/sammy.min',
        amplify: 'http://cdnjs.cloudflare.com/ajax/libs/amplifyjs/1.1.0/amplify.min',
        ckeditor : 'js/ckeditor/adaptors/jquery',
        "ckeditor.core" : "js/ckeditor/ckeditor",
         domready: 'js/domready',
        "alertify" : "components/alertify/alertify.min"
    },

    shim: {
        bootstrap : {
            deps: ["jquery"],
            exports: "$.fn.popover"
        },
        kovalidation : {
            deps: ["knockout"]
        },
        kosortable : {
            deps: ["knockout","jquery.ui.sortable"]
        },
        "ckeditor.core" : {
            
            exports: "CKEDITOR"
        },
        ckeditor: {
             deps: ["jquery","ckeditor.core"]  
        },

        sammy: {
            deps: ["jquery"],
            exports: "Sammy"
        },
        amplify: {
            deps: ["jquery"],
            exports: "amplify"
        }

    }
});