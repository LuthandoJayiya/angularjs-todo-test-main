// // AngularJS Todo Application
// angular.module('todoApp', [])
// .controller('TodoController', ['$scope', function($scope) {
    
//     // Initialize the todos array
//     $scope.todos = [];
    
//     // Initialize the new todo input
//     $scope.newTodo = '';
    
//     // Function to add a new todo
//     $scope.addTodo = function() {
//         // TODO - Implement functionality to add a new todo
//     };
    
//     // Function to remove a todo by index
//     $scope.removeTodo = function(index) {
//         // TODO - Implement functionality to remove a todo by index
//     };
    
//     // Function to get the count of completed todos
//     $scope.getCompletedCount = function() {
//         return $scope.todos.filter(function(todo) {
//             return todo.completed;
//         }).length;
//     };
    
//     // Function to get the count of remaining (incomplete) todos
//     $scope.getRemainingCount = function() {
//         return $scope.todos.filter(function(todo) {
//             return !todo.completed;
//         }).length;
//     };
    
//     // Function to toggle all todos completion status
//     $scope.toggleAll = function() {
//         var allCompleted = $scope.todos.every(function(todo) {
//             return todo.completed;
//         });
        
//         $scope.todos.forEach(function(todo) {
//             todo.completed = !allCompleted;
//         });
//     };
    
//     // Function to clear all completed todos
//     $scope.clearCompleted = function() {
//         $scope.todos = $scope.todos.filter(function(todo) {
//             return !todo.completed;
//         });
//     };
// }]);
// AngularJS Todo Application
// Ensure you have Angular 1.x loaded in your HTML, e.g.:
// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>

angular.module('todoApp', [])
.controller('TodoController', ['$scope', '$http', function($scope, $http) {

    // --- Configuration ---
    var API_BASE_URL = 'http://localhost:5000/api'; // <--- IMPORTANT: Replace with your actual backend API base URL
    var TODO_API_URL = API_BASE_URL + '/todos';
    var AUTH_API_URL = API_BASE_URL + '/auth'; // Assuming your AuthController is at /api/auth

    // --- JWT Token Management ---
    // In a real application, you'd get this from a login service
    // and store it securely (e.g., localStorage, sessionStorage).
    // For demonstration, we'll use a variable.
    // Make sure to replace this with a token you get from your /auth/login endpoint.
    $scope.jwtToken = null; // Store the JWT here

    // --- Initialize the todos array ---
    $scope.todos = [];

    // --- Initialize the new todo input ---
    $scope.newTodo = {
        title: '',
        // description: '', // Add description field for new todo
        // isCompleted: false
    };

    // --- Loading State ---
    $scope.isLoading = false;
    $scope.errorMessage = '';

    // --- Helper to set Authorization header ---
    function getAuthHeaders() {
        if (!$scope.jwtToken) {
            console.error("JWT Token is not available. Please log in.");
            // In a real app, you might redirect to a login page here.
            return {};
        }
        return {
            'Authorization': 'Bearer ' + $scope.jwtToken
        };
    }

    // --- Authentication Placeholder ---
    // In a real app, this would be a separate login controller/service.
    // This is just to demonstrate how you'd get and set the token.
    $scope.login = function(username, password) {
        $scope.isLoading = true;
        $scope.errorMessage = '';

        $http.post(AUTH_API_URL + '/login', { username: username, password: password })
            .then(function(response) {
                $scope.jwtToken = response.data.token;
                console.log('Login successful! Token received:', $scope.jwtToken);
                alert('Logged in successfully as ' + response.data.username);
                $scope.fetchTodos(); // Fetch todos after successful login
            })
            .catch(function(error) {
                console.error('Login failed:', error);
                $scope.errorMessage = error.data || 'Login failed. Please check credentials.';
                alert('Login Failed: ' + $scope.errorMessage);
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    };

    // --- CRUD Operations ---

    // Function to fetch all todos from the backend
    $scope.fetchTodos = function() {
        if (!$scope.jwtToken) {
            $scope.errorMessage = "Please log in to view todos.";
            console.warn("Attempted to fetch todos without a token.");
            return;
        }

        $scope.isLoading = true;
        $scope.errorMessage = '';

        $http.get(TODO_API_URL, { headers: getAuthHeaders() })
            .then(function(response) {
                $scope.todos = response.data;
                console.log('Todos fetched successfully:', $scope.todos);
            })
            .catch(function(error) {
                console.error('Failed to fetch todos:', error);
                $scope.errorMessage = error.data || 'Failed to load todos.';
                if (error.status === 401) {
                    $scope.errorMessage = 'Unauthorized. Please log in again.';
                }
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    };

    // Function to add a new todo
    $scope.addTodo = function() {
        if (!$scope.newTodo.title || $scope.newTodo.title.trim() === '') {
            alert('Todo title cannot be empty.');
            return;
        }
        if (!$scope.jwtToken) {
            alert("Please log in to add a todo.");
            return;
        }

        $scope.isLoading = true;
        $scope.errorMessage = '';

        $http.post(TODO_API_URL, $scope.newTodo, { headers: getAuthHeaders() })
            .then(function(response) {
                $scope.todos.push(response.data); // Add the newly created todo from the backend response
                $scope.newTodo = { title: '', description: '', isCompleted: false }; // Clear input
                console.log('Todo added successfully:', response.data);
            })
            .catch(function(error) {
                console.error('Failed to add todo:', error);
                $scope.errorMessage = error.data || 'Failed to add todo.';
                if (error.status === 401) {
                    $scope.errorMessage = 'Unauthorized. Please log in again.';
                }
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    };

    // Function to remove a todo by its ID (from the backend)
    $scope.removeTodo = function(todoId) {
        if (!$scope.jwtToken) {
            alert("Please log in to remove a todo.");
            return;
        }

        $scope.isLoading = true;
        $scope.errorMessage = '';

        $http.delete(TODO_API_URL + '/' + todoId, { headers: getAuthHeaders() })
            .then(function() {
                $scope.todos = $scope.todos.filter(function(todo) {
                    return todo.id !== todoId; // Filter out the deleted todo
                });
                console.log('Todo removed successfully:', todoId);
            })
            .catch(function(error) {
                console.error('Failed to remove todo:', error);
                $scope.errorMessage = error.data || 'Failed to remove todo.';
                if (error.status === 401) {
                    $scope.errorMessage = 'Unauthorized. Please log in again.';
                } else if (error.status === 404) {
                    $scope.errorMessage = 'Todo not found.';
                }
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    };

    // Function to update a todo's completion status (and other fields)
    $scope.updateTodo = function(todo) {
        if (!$scope.jwtToken) {
            alert("Please log in to update todos.");
            return;
        }

        $scope.isLoading = true;
        $scope.errorMessage = '';

        // Send the entire todo object (or just the fields that changed)
        // Ensure the ID is part of the URL, and the body matches TodoDto
        $http.put(TODO_API_URL + '/' + todo.id, {
            title: todo.title,
            description: todo.description,
            isCompleted: todo.isCompleted
        }, { headers: getAuthHeaders() })
        .then(function() {
            console.log('Todo updated successfully:', todo.id, 'IsCompleted:', todo.isCompleted);
        })
        .catch(function(error) {
            console.error('Failed to update todo:', error);
            $scope.errorMessage = error.data || 'Failed to update todo.';
            if (error.status === 401) {
                $scope.errorMessage = 'Unauthorized. Please log in again.';
            } else if (error.status === 404) {
                $scope.errorMessage = 'Todo not found.';
            }
            // Optionally revert the state if the update fails
            // For now, we'll let it stay as is.
        })
        .finally(function() {
            $scope.isLoading = false;
        });
    };


    // --- Frontend-only Logic (updated to call backend updates) ---

    // Function to get the count of completed todos
    $scope.getCompletedCount = function() {
        return $scope.todos.filter(function(todo) {
            return todo.isCompleted; // Use 'isCompleted' to match backend model
        }).length;
    };

    // Function to get the count of remaining (incomplete) todos
    $scope.getRemainingCount = function() {
        return $scope.todos.filter(function(todo) {
            return !todo.isCompleted; // Use 'isCompleted'
        }).length;
    };

    // Function to toggle all todos completion status
    $scope.toggleAll = function() {
        if (!$scope.jwtToken) {
            alert("Please log in to update todos.");
            return;
        }

        var allCompleted = $scope.todos.every(function(todo) {
            return todo.isCompleted;
        });

        // Loop through all todos and update them on the backend
        $scope.todos.forEach(function(todo) {
            todo.isCompleted = !allCompleted; // Optimistically update frontend
            $scope.updateTodo(todo); // Send update to backend for each todo
        });
    };

    // Function to clear all completed todos
    $scope.clearCompleted = function() {
        if (!$scope.jwtToken) {
            alert("Please log in to clear todos.");
            return;
        }

        var completedTodos = $scope.todos.filter(function(todo) {
            return todo.isCompleted;
        });

        // Iterate and delete each completed todo from the backend
        var deletePromises = completedTodos.map(function(todo) {
            return $http.delete(TODO_API_URL + '/' + todo.id, { headers: getAuthHeaders() });
        });

        // Wait for all delete operations to complete
        $scope.isLoading = true;
        $scope.errorMessage = '';
        Promise.all(deletePromises)
            .then(function() {
                // After successful deletions, refetch or filter local array
                $scope.todos = $scope.todos.filter(function(todo) {
                    return !todo.isCompleted;
                });
                console.log('Cleared completed todos.');
            })
            .catch(function(error) {
                console.error('Failed to clear completed todos:', error);
                $scope.errorMessage = error.data || 'Failed to clear completed todos.';
            })
            .finally(function() {
                $scope.isLoading = false;
            });
    };

    // --- Initial Load ---
    // You might want to call login here, or after a user clicks a login button.
    // For testing, you could uncomment a line like:
    // $scope.login('testuser', 'Test@123'); // <--- REMEMBER TO REMOVE/CHANGE THIS FOR PRODUCTION
    // Or, better yet, prompt the user for credentials.

    // Example of how you'd call fetchTodos initially after a real login
    // For now, we'll rely on the manual login call in your frontend.

}]);
