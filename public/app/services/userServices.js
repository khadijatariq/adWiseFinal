angular.module('userServices',[])

.factory('User', function($http) {
	userFactory = {};

	userFactory.create = function (regData) {
		return $http.post('/api/register', regData);
	};

	userFactory.passCheck = function (pass) {
		nums = ['0','1','2','3','4','5','6','7','8','9'];
		for (var i = 0; i < 10; i++) {
			if (pass.search(nums[i]) >= 0){
				return true;
			}
		}
		return false;
	};

	userFactory.readReport = function (file) {
		var reader = new FileReader();
		reader.onload = function (loadEvent) {
			var pdf = new Uint8Array(loadEvent.target.result);
			PDFJS.getDocument({data: pdf}).then(function(pdf) {
			    var pagesPromisesArray = new Array(pdf.pdfInfo.numPages+1).join('0').split('').map(function(value, index) {
			      return pdf.getPage(++index); 
			    });
    
			    Promise.all(pagesPromisesArray).then(function(pages){
			    	var pagesTextPromisesArray = pages.map(function(page) {
			        	return page.getTextContent();
			    	});
      				Promise.all(pagesTextPromisesArray).then(function(TextArray) {
      					TextArray.forEach(function(content) {
      						var strings = content.items.map(function (item) {
							    return item.str;
							});
							//add code to process here
      					});
      				});
      			});
			});
		};
		reader.readAsArrayBuffer(file);
		return ['hello'];
	};

	return userFactory;
});