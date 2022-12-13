const Model = require('./model');
module.exports = 
class Image extends Model{
    constructor()
    {
        super();
        this.Title = "";
        this.Description = "";
        this.Date =  0;
        this.UserId = "";
        this.GUID = "";
        this.Shared = "";


        this.addValidator('Title','string');
        this.addValidator('Description', 'string');
    }
}