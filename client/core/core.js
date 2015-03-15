Template.core.helpers({
	'selected': function() {
		return Session.get('selected');
	}
});

Template.edit.rendered = function() {
	$('.textinput').focus();
	$('.textinput').val(Session.get('text'));
	$('.scrollable').mCustomScrollbar({theme: 'minimal-dark'});
	$('textarea').mCustomScrollbar({theme: 'minimal-dark'});
}

Template.edit.events({
	'keypress .textinput, change .textinput': function() {
		Session.set('text', $('.textinput').val());
	}
});

Template.review.rendered = function() {
	console.log('getting suggestions...');
	Session.set("waiting", true);
	Meteor.call('suggest', Session.get('text'), function(err, ret) {
		if (err == undefined) {
			console.log('retrieved suggestions');
			Session.set('suggestions', ret);
			Session.set('waiting', false);
		}
	});
	Meteor.setTimeout(function() {
		$('#reviewcontainer').mCustomScrollbar({theme: 'minimal-dark'});
	}, 100);
}

Template.review.helpers({
	'suggestion': function() {
		return Session.get('suggestions');
	},
	'precontext': function() {
		var text = Session.get('text');
		text = text.substring(0, this.index);
		text = text.substr(text.lastIndexOf('.') + 1);
		text = text.trim();
		text += " ";
		return text;
	},
	'context': function() {
		var text = Session.get('text');
		text = text.substr(this.index, this.offset);
		return text;
	},
	'postcontext': function() {
		var text = Session.get('text');
		text = text.substring(this.index + this.offset, text.length);
		text = text.substring(text, text.indexOf('.') + 1);
		return text;
	},
	'hasSuggestions': function() {
		return (Session.get('suggestions').length != 0);
	},
	'waitingForSuggestions': function() {
		return Session.get('waiting');
	}
});
