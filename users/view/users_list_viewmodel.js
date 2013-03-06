define(["knockout", "jquery", "alertify", "kocommand", "kovalidation"], function(ko, $, alertify) {
    function ListUsersViewModel(users)
    {
        var self = this;
              
        self.users = ko.observableArray();
        
        self.newUserEmailAddress = ko.observable("").extend({ email: true, required: true });
         
 
        self.remove = function(user)
        {
            self.users.remove(user);
        }
        
        users.forEach(function(user) {
           self.users.push(new UserViewModel(self, user)); 
        });
        
        self.isValid = function()
        {
            
            return ko.validation.group(self, {deep: false}).length === 0 && self.newUserEmailAddress() != "";
        }
        
        self.AddNewUserCommand = ko.command({
             
            execute: function() {
                $.ajax({
                    url: "/api/users",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "email": self.newUserEmailAddress()
                    }
                }).done( function(result) {
                    self.users.push(new UserViewModel(self, result));
                    self.newUserEmailAddress("");
                    alertify.success(result.email + " was saved successfully");
                }).fail(function(status, result) {
                      self.newUserEmailAddress("");
                });
        
            },
            canExecute: function() {
                return self.isValid();
            }
        });
        
        
    }
    
    
    function UserViewModel(root, user)
    {
        var self = this;
        
        self.email = ko.observable(user.email);
        self.selected = ko.observable(false);
        self.root = root;
        self.links = user.links;
        
           
        self.ToggleSelected = function()
        {
             self.selected( !self.selected() );
        }
        
        self.Remove = function()
        {
              alertify.set({ labels: {ok     : "Yes",    cancel : "No"}, buttonReverse: true });
              alertify.confirm("Are you sure you would like to remove " +  self.email() + "?", function(result) { 
                    if( !result ) return;
                    $.ajax({
                         url: self.links.self,
                         type: 'DELETE',
                         dataType: 'json',
                         data: {}
                     }).done( function() {
                         alertify.success(self.email() + " has been removed successfully");
                         self.root.remove(self);
                     });
            });
        }
        
    }
    
    
    return ListUsersViewModel;
    
});