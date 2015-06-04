$(document).ready(function(){

	var rowString = $('.movie-info').html();
	var buildRow = _.template(rowString);

	var App = Backbone.Router.extend({
			routes:{
				'': 					'home',
				'search/:query':  		'search',
			},

			home: function(){
				$('.page').hide();
				$('h1').html('IMDB API');
				$('#home').show();
				$('h4').show();
			},

			search: function(query){
				// $('h1').html('Results');
					$('#form').show();
					$('#search').show();
					$.get( 'http://www.omdbapi.com/?', {s: query}, function(moviesData){
			
						 var movies = moviesData.Search
						 $('.results').html('');
						 //add search results
						for(var i = 0; i< movies.length; i++){						
							var movie =  movies[i];						
							var addMovies = buildRow(movie);
							$('.results').append(addMovies);								
						}	
						//add title to watchlist
						$('.temp').each(function(){
							$(this).click(function(e){
								// console.log($('.watchlist').has('div').html())
								$(this).parent().css('opacity', '.8');
								var title = $(this).parent().find('.title').text()
								var year = $(this).parent().find('.year').text()
								$string = $('<div>'+ title +" "+ year +'</div>')
								//console.log($('.watchlist').text());	
								$('.watchlist').append($string.fadeIn('slow'));
							});
						});	
						//remove title from watchlist
						$('.watchlist').each(function(){
							$(this).click(function(e){
								 $(e.target).fadeOut('fast', function(){
								 	$(this).remove();
								 });
								
							})
						})			
					}
					,'json');
				}

			
	});

		var myRouter = new App();
		Backbone.history.start();

		$('#form').submit(function(e){
			e.preventDefault();
			// console.log($('#input').val()); 
			query = $('#input').val();
			myRouter.navigate('search/'+ query, {trigger: true});
		});
		
	
		

});