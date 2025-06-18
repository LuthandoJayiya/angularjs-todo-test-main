// AngularJS Todo Application
angular.module('todoApp', [])
.controller('TodoController', ['$scope', function($scope) {
    
    // Initialize the todos array
    $scope.todos = [];
    
    // Initialize the new todo input
    $scope.newTodo = '';
    
    // Function to add a new todo
    $scope.addTodo = function() {
        // TODO - Implement functionality to add a new todo
    };
    
    // Function to remove a todo by index
    $scope.removeTodo = function(index) {
        // TODO - Implement functionality to remove a todo by index
    };
    
    // Function to get the count of completed todos
    $scope.getCompletedCount = function() {
        return $scope.todos.filter(function(todo) {
            return todo.completed;
        }).length;
    };
    
    // Function to get the count of remaining (incomplete) todos
    $scope.getRemainingCount = function() {
        return $scope.todos.filter(function(todo) {
            return !todo.completed;
        }).length;
    };
    
    // Function to toggle all todos completion status
    $scope.toggleAll = function() {
        var allCompleted = $scope.todos.every(function(todo) {
            return todo.completed;
        });
        
        $scope.todos.forEach(function(todo) {
            todo.completed = !allCompleted;
        });
    };
    
    // Function to clear all completed todos
    $scope.clearCompleted = function() {
        $scope.todos = $scope.todos.filter(function(todo) {
            return !todo.completed;
        });
    };
}]);
