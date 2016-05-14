(function(){

var Movie = Backbone.Model.extend({
	defaults: {
		title: '',
		premiere: '',
		feedback: ''
	}
});


var Movie1 = new Movie({title: 'IronMan 3', premiere: '12 Sept 2015', feedback: 'Positive'});

var Movie2 = new Movie({title: 'Harry Potter 7 Part 1', premiere: '22 Nov 2015', feedback: 'Medium'});

var Movie3 = new Movie({title: 'Un ninja en NY', premiere: '17 Jan 2002', feedback: 'Negative'});

var MoviesCollection = Backbone.Collection.extend({
	model: Movie
});

var MoviesView = Backbone.View.extend({
	el: '#movies-body',

	render: function(){
		this.collection.each(function(movie){
			  MovView = new MovieView({
				model: movie
			});
			this.$el.append(MovView.render().el);
		}, this);
		return this;
	}

});


var MovieView = Backbone.View.extend({
	tagName: 'tr',

	template: _.template($('#movies-template').html()),

	initialize: function(){
		this.render();
	},
	events: {
		'click .edit' : 'editMovie',
		'click .delete' : 'deleteMovie'
	},

	deleteMovie: function(){
		this.$el.remove();
	},

	editMovie: function(){
		var nTitle = prompt("Please, write the new title: ", this.model.get('title'));
		this.model.set('title', nTitle);
		var nPremiere = prompt("Please, write the new premiere: ", this.model.get('premiere'));
		this.model.set('premiere', nPremiere);
		var nFeedback = prompt("Please, write the new feedback: ", this.model.get('feedback'));
		this.model.set('feedback', nFeedback);
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

});

var Movies = new MoviesCollection;
Movies.add(Movie1);
Movies.add(Movie2);
Movies.add(Movie3);


var mov = new MoviesView({ collection: Movies });
mov.render();

})();
