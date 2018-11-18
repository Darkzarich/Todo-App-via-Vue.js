Vue.component('todo-item', {
	props: ['title'],
	template: '<li>{{title}} <button v-on:click="$emit(\'remove\'); $parent.updateTodos();" class="btn btn-danger btn-sm float-right">Delete</button></li>'
})

var app = new Vue({
  el: '#app',
  data: {
    todos: [
	    /*
	    todos structure: 
	    { 
	    	title: 'Clear room',
	    	id: 0
	    }
	    */ 
    ],
    newTodoText: '', 
    nextTodoId: 3 
  },
  methods: { 
  	addNewTodo: function() {
  		if (this.newTodoText.trim()) { 
			this.todos.push ({
				title: this.newTodoText,
				id: this.nextTodoId++
			})
			this.updateTodos();
		}
	  	this.newTodoText = '' 
    },
    updateTodos: function() {
    	axios.post("api.php?action=save", {
  			todos: this.todos
  		})
  		.then(response => {
  		})
  		.catch(e => {console.log(e)})
    }
  },
  created () {
  	axios.get("api.php?action=get")
  	.then(response => {
  		if (response.data) {
  			this.todos = response.data
  		}
  	})
  }
})