/*
 * tipJS - Javascript MVC Framework ver.1.20
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model({
	name:"todoMVC.globalTodos",

	init: function() {
		this.ENTER_KEY = 13;
		this.todos = this.loadModel("utils").store('todos-jquery');
		this.cacheElements();
	},
	cacheElements: function() {
		this.todoTemplate = Handlebars.compile( $('#todo-template').html() );
		this.footerTemplate = Handlebars.compile( $('#footer-template').html() );
		this.$todoApp = $('#todoapp');
		this.$newTodo = $('#new-todo');
		this.$toggleAll = $('#toggle-all');
		this.$main = $('#main');
		this.$todoList = $('#todo-list');
		this.$footer = this.$todoApp.find('#footer');
		this.$count = $('#todo-count');
		this.$clearBtn = $('#clear-completed');
	},
	activeTodoCount: function() {
		var count = 0;
		$.each( this.todos, function( i, val ) {
			if ( !val.completed ) {
				count++;
			}
		});
		return count;
	},
	// Accepts an element from inside the ".item" div and
	// returns the corresponding todo in the todos array
	getTodo: function( elem, callback ) {
		var id = $( elem ).closest('li').data('id');
		$.each( this.todos, function( i, val ) {
			if ( val.id === id ) {
				callback.apply( this, arguments );
				return false;
			}
		});
	}
});
