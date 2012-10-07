/*
 * tipJS - Javascript MVC Framework ver.1.20
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model({
	name:"todoMVC.app",

	init: function() {
		this.ENTER_KEY = 13;
		this.todos = this.loadModel("utils").store('todos-jquery');
		this.cacheElements();
		this.bindEvents();
		this.render();
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
	bindEvents: function() {
		var list = this.$todoList;
		this.$newTodo.on( 'keyup', this.create );
		this.$toggleAll.on( 'change', this.toggleAll );
		this.$footer.on( 'click', '#clear-completed', this.destroyCompleted );
		list.on( 'change', '.toggle', this.toggle );
		list.on( 'dblclick', 'label', this.edit );
		list.on( 'keypress', '.edit', this.blurOnEnter );
		list.on( 'blur', '.edit', this.update );
		list.on( 'click', '.destroy', this.destroy );
	},
	render: function() {
		this.$todoList.html( this.todoTemplate( this.todos ) );
		this.$main.toggle( !!this.todos.length );
		this.$toggleAll.prop( 'checked', !this.activeTodoCount() );
		this.renderFooter();
		this.loadModel("utils").store( 'todos-jquery', this.todos );
	},
	renderFooter: function() {
		var todoCount = this.todos.length,
			activeTodoCount = this.activeTodoCount(),
			footer = {
				activeTodoCount: activeTodoCount,
				activeTodoWord: this.loadModel("utils").pluralize( activeTodoCount, 'item' ),
				completedTodos: todoCount - activeTodoCount
			};

		this.$footer.toggle( !!todoCount );
		this.$footer.html( this.footerTemplate( footer ) );
	},
	toggleAll: function() {
		var _app = tipJS.loadModel("todoMVC.app", true);
		var isChecked = $( this ).prop('checked');
		$.each( _app.todos, function( i, val ) {
			val.completed = isChecked;
		});
		_app.render();
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
	destroyCompleted: function() {
		var _app = tipJS.loadModel("todoMVC.app", true);
		var todos = _app.todos,
			l = todos.length;
		while ( l-- ) {
			if ( todos[l].completed ) {
				todos.splice( l, 1 );
			}
		}
		_app.render();
	},
	// Accepts an element from inside the ".item" div and
	// returns the corresponding todo in the todos array
	getTodo: function( elem, callback ) {
		var _app = tipJS.loadModel("todoMVC.app", true);
		var id = $( elem ).closest('li').data('id');
		$.each( this.todos, function( i, val ) {
			if ( val.id === id ) {
				callback.apply( _app, arguments );
				return false;
			}
		});
	},
	create: function(e) {
		var _app = tipJS.loadModel("todoMVC.app", true);
		var _utils = tipJS.loadModel("todoMVC.utils");
		var $input = $(this),
			val = $.trim( $input.val() );
		if ( e.which !== _app.ENTER_KEY || !val ) {
			return;
		}
		_app.todos.push({
			id: _utils.uuid(),
			title: val,
			completed: false
		});
		$input.val('');
		_app.render();
	},
	toggle: function() {
		var _app = tipJS.loadModel("todoMVC.app", true);
		_app.getTodo( this, function( i, val ) {
			val.completed = !val.completed;
		});
		_app.render();
	},
	edit: function() {
		$(this).closest('li').addClass('editing').find('.edit').focus();
	},
	blurOnEnter: function( e ) {
		var _app = tipJS.loadModel("todoMVC.app", true);
		if ( e.keyCode === _app.ENTER_KEY ) {
			e.target.blur();
		}
	},
	update: function() {
		var _app = tipJS.loadModel("todoMVC.app", true);
		var val = $.trim( $(this).removeClass('editing').val() );
		_app.getTodo( this, function( i ) {
			if ( val ) {
				this.todos[ i ].title = val;
			} else {
				this.todos.splice( i, 1 );
			}
			this.render();
		});
	},
	destroy: function() {
		var _app = tipJS.loadModel("todoMVC.app", true);
		_app.getTodo( this, function( i ) {
			this.todos.splice( i, 1 );
			this.render();
		});
	}
});
