$(document).ready(function(){

	var App = Backbone.Router.extend({
			routes:{
				'': 					'home',
				'search/:query':  		'search'
			},

			home: function(){
				$('.page').hide();
				$('h1').html('IMDB API');
				$('#home').show();
				$('h4').show();
			},

			search: function(query){
				$('h1').html('Results');
				$('h4').hide();
				$('#form').show();
				$('#search').show();
				$.get( 'http://www.omdbapi.com/?', {s: query}, function(movies){
					
					var array = [];
					 // var watch = [];


					for(var i = 0; i< movies.Search.length; i++){
						//console.log(movies.Search[i]);
		
						var  $movie = $('<div> '+movies.Search[i].Title+'</div>')				
						array.push($movie);					
					}		
					//adds click event
					for(var i = 0; i <array.length; i++){
						array[i].click(function(e){	

							$(this).css('opacity', '.5');
							// watch.push($(this))
							 // $('.watchlist').append(watch);
						
							 				
					});
					}
						
					$('.results').html(array);
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