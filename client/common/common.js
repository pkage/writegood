Meteor.startup(function() {
	var resize = function() {
		var header = $('.navbar').height();
		var wh = $(window).height();
		$('#contentbox').height(wh - header);
	}
	resize();
	$(window).resize(resize);
	Session.set('text', '');
	Session.set('selected', 'edit');
	Session.set('suggestions', []);
});

Template.switcher.helpers({
	'edit': function() {
		return ((Session.get('selected') == 'edit') ? "sidebar-selected" : "");
	},
	'review': function() {
		return ((Session.get('selected') == 'review') ? "sidebar-selected" : "");
	}
});

Template.switcher.events({
	'click #edit': function() {
		Session.set('selected', 'edit');
	},
	'click #review': function() {
		Session.set('selected', 'review');
	}
});
