var formApp = angular.module("formApp", ["ngMessages", "ui.bootstrap"]);

formApp.controller("UserFormController", function ($scope, $http) {
	//User data that will be submitted
	$scope.data = {
		userName: "",
		email: "",
		occupation: "",
		birthDate: null
	};

	//Indicates the state of the datepicker widget
	$scope.datePickerOpened = false;

	//List of available occupations
	$scope.occupations = [
		"Junior Software Developer",
		"Senior Software Developer",
		"Integration Engineer",
		"Software Architect",
		"Test Engineer",
		"Support Agent",
		"Sales Agent"
	];

	$scope.responseMsg = "";

	//Sets the datepicker widget's state to opened
	$scope.openDatePicker = function ($event) {
		$scope.datePickerOpened = true;
	};

	//Submits the form, sends the user data to the server and resets the form
	$scope.submitForm = function (isValid) {
		if (isValid) {
			$http.post("/api/userdata", $scope.formData)
				.success(function (response) {
					$scope.responseMsg = response;
					$scope.reset();
				})
				.error(function (response) {
					$scope.responseMsg = response;
				});
		}
	};

	//Resets the form
	$scope.reset = function() {
		$scope.formData = angular.copy($scope.data);
		if ($scope.userForm) {
			$scope.userForm.$setPristine(true);
			$scope.userForm.$setUntouched();
		}
	};

	$scope.reset();
});

//Custom validation directive to determine if the user is older than 18
formApp.directive("validateAge", function() {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, element, attr, ctrl) {
			ctrl.$validators.isAdult = function (modelValue, viewValue) {
				if (viewValue) {
					var birthDate = new Date(viewValue),
						now = new Date();
					var bDateYear = birthDate.getFullYear(),
						bDateMonth = birthDate.getMonth(),
						bDateDay = birthDate.getDate();
					var tmpDate = new Date(bDateYear + 18, bDateMonth, bDateDay);
					return tmpDate <= now;
				}
				return true;
			};
		}
	};
});
