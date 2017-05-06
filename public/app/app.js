angular.module('adWise', ['appRoutes','userControllers','userServices','mainControllers','authServices','stuServices'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});