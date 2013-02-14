module.exports = function(db, type)
{
    var database = db;
    var collection_type = type;
    var self = this;
    
    var collection = function() {
        return database.collection(collection_type);
    }
    
    self.load = function(id, callback) {
        collection().findOne({_id: this.db.ObjectID.createFromHexString(id)}, callback);
    }
    
    self.save = function(doc, callback) {
         collection().collection(collection).save(doc, {save:true}, callback);
    }
    
    self.remove = function(id, callback) {
         collection().remove({_id: self.database.ObjectID.createFromHexString(id)},{safe:true}, callback);
    }
}