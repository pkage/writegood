Meteor.methods({
	suggest: function(text) {
		var wg = Meteor.npmRequire('write-good');
		return wg(text);
	}
});
