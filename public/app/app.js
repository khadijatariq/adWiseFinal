angular.module('adWise', ['appRoutes','userControllers','userServices','mainControllers','authServices'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});