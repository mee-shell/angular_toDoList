// Config

const todo = angular.module('todo', [])

// Controller

todo.controller('list', ['$scope', '$http', function($scope, $http) {

	// ### tasks ###

	// get task

	const get_tasks = function(task) {
		$http({
			method: 'GET',
			url: '/api/tasks'
		}).then(function(res) {
      res.data.forEach(function(message) {
				console.log('task',task)
			})
			$scope.tasks = res.data
		},
    function(err) {
			console.log('err', err)
		})
  } ;

get_tasks(); 

	// create task

	$scope.create_task = function(e) {
		if (e.keyCode == 13) {
			$http({
				method: 'POST',
				url: '/api/tasks',
				data: {
					name: $scope.new_task,
				}
			}).then(function(res) {
				get_tasks($scope.tasks)
			}, function(err) {
				console.log('err', err)
			})
			$scope.new_task = ''
		}
	}

// finish task: post to db


	// delete task

	$scope.delete_task = function(selected_task) {
		$http({
			method: 'DELETE',
			url: '/api/tasks/' + selected_task._id
		}).then(function(res) {
			get_tasks($scope.selected_task)
		}, function(err) {
			console.log('err', err)
		})
	}

}])
