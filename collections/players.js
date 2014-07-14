Players = new Meteor.Collection("players");

var PlayerSchema = new SimpleSchema({
  name: {
    type: String
  },
  score: {
    type: Number,
    custom: function(){
      if(!this.userId){
        return 'needsLogin'
      }
    }
  }
});

Players.attachSchema(PlayerSchema);

SimpleSchema.messages({
  needsLogin: "You need to login to do this"
});

Players.simpleSchema().namedContext().addInvalidKeys([{name: 'score', type: 'needsLogin'}]);

Players.allow({
  update: function(userId, doc, fields, modifier){
    if(!!userId) return true;
  }
})