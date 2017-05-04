angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($location, $timeout, User) {
	
	var app = this;

	app.regStu = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			if (app.regData.password.length > 5) {
				if (User.passCheck(app.regData.password)){
					if (app.regData.fileinfo.type == 'application/pdf'){
						app.regData.state = "student";
						app.regData.pastCourses = [];
				      	app.regData.presentCourses = [];
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
				      					var data = [];
				      					TextArray.forEach(function(content) {
				      						var strings = content.items.map(function (item) {
											    return item.str;
											});
											data = data.concat(strings);
				      					});
				      					var idx1 = data.indexOf("University Core Courses");
				      					var idx2 = data.indexOf("University Distribution SBASSE");
				      					var idx3 = data.indexOf("SBASSE Core Courses");
				      					var idx4 = data.indexOf("CS SSE - Elective Course (In Group)");
				      					var idx5 = data.indexOf("CS Major Core Courses");
				      					var idx6 = data.indexOf("CS Major ElectiveCourses");
				      					var idx7 = data.indexOf("CS - Free Electives");
				      					var x;
				      					idx1 = data.indexOf("Type", idx1);
				      					if (idx1 < idx2) {
				      						while (data[idx1+7] == "EN") {
				      							x = data.slice(idx1+1,idx1+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("University Core");
				      							app.regData.pastCourses.push(x);
				      							idx1 = idx1 + 7;
				      						}
				      						while (data[idx1+6] == "IP") {
				      							x = data.slice(idx1+1,idx1+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("University Core");
				      							app.regData.presentCourses.push(x);
				      							idx1 = idx1 + 6;
				      						}
				      					}
				      					idx2 = data.indexOf("Type", idx2);
				      					if (idx2 < idx3) {
				      						while (data[idx2+7] == "EN") {
				      							x = data.slice(idx2+1,idx2+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("Out Group");
				      							app.regData.pastCourses.push(x);
				      							idx2 = idx2 + 7;
				      						}
				      						while (data[idx2+6] == "IP") {
				      							x = data.slice(idx2+1,idx2+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("Out Group");
				      							app.regData.presentCourses.push(x);
				      							idx2 = idx2 + 6;
				      						}
				      					}
				      					idx3 = data.indexOf("Type", idx3);
				      					if (idx3 < idx4) {
				      						while (data[idx3+7] == "EN") {
				      							x = data.slice(idx3+1,idx3+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("SSE Core");
				      							app.regData.pastCourses.push(x);
				      							idx3 = idx3 + 7;
				      						}
				      						while (data[idx3+6] == "IP") {
				      							x = data.slice(idx3+1,idx3+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("SSE Core");
				      							app.regData.presentCourses.push(x);
				      							idx3 = idx3 + 6;
				      						}
				      					}
				      					idx1 = data.indexOf("Units Requirement");
				      					idx4 = data.indexOf("Type", idx4);
				      					if (idx4 < idx1) {
				      						while (data[idx4+7] == "EN") {
				      							x = data.slice(idx4+1,idx4+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("SSE Elective");
				      							app.regData.pastCourses.push(x);
				      							idx4 = idx4 + 7;
				      						}
				      						while (data[idx4+6] == "IP") {
				      							x = data.slice(idx4+1,idx4+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("SSE Elective");
				      							app.regData.presentCourses.push(x);
				      							idx4 = idx4 + 6;
				      						}
				      					}
				      					idx5 = data.indexOf("Type", idx5);
				      					if (idx5 < idx6) {
				      						while (data[idx5+7] == "EN") {
				      							x = data.slice(idx5+1,idx5+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("Major Core");
				      							app.regData.pastCourses.push(x);
				      							idx5 = idx5 + 7;
				      						}
				      						while (data[idx5+6] == "IP") {
				      							x = data.slice(idx5+1,idx5+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("Major Core");
				      							app.regData.presentCourses.push(x);
				      							idx5 = idx5 + 6;
				      						}
				      					}
				      					idx6 = data.indexOf("Type", idx6);
				      					if (idx6 < idx7) {
				      						while (data[idx6+7] == "EN") {
				      							x = data.slice(idx6+1,idx6+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("Major Elective");
				      							app.regData.pastCourses.push(x);
				      							idx6 = idx6 + 7;
				      						}
				      						while (data[idx6+6] == "IP") {
				      							x = data.slice(idx6+1,idx6+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("Major Elective");
				      							app.regData.presentCourses.push(x);
				      							idx6 = idx6 + 6;
				      						}
				      					}
				      					idx1 = data.indexOf("Course History");
				      					idx7 = data.indexOf("Type", idx7);
				      					if (idx7 < idx1) {
				      						while (data[idx7+7] == "EN") {
				      							x = data.slice(idx7+1,idx7+7);
				      							x[5] = parseFloat(x[5]);
				      							x.push("Free Elective");
				      							app.regData.pastCourses.push(x);
				      							idx7 = idx7 + 7;
				      						}
				      						while (data[idx7+6] == "IP") {
				      							x = data.slice(idx7+1,idx7+6);
				      							x[4] = parseFloat(x[4]);
				      							x.push("Free Elective");
				      							app.regData.presentCourses.push(x);
				      							idx7 = idx7 + 6;
				      						}
				      					}
				      					app.regData.cgpa = User.getGpa(app.regData.pastCourses);
				      					app.regData.scgpa = User.getScgpa(app.regData.pastCourses);
				      					User.create(app.regData).then(function(data1) {
											if (data1.data.success) {
												app.successMsg = data1.data.message + " Redirecting...";
												$timeout(function() {
													$location.path("/");
												}, 1000);
											} else {
												app.errorMsg = data1.data.message;
											}
										});
				      				});
				      			});
							});
						};
						reader.readAsArrayBuffer(app.regData.fileinfo);
					} else {
						app.errorMsg = "File uploaded must be a PDF."
					}
				} else {
					app.errorMsg = "Password must contain at least 1 numeric character."
				}
			} else {
				app.errorMsg = "Password must contain at least 6 characters."
			}
		} else {
			app.errorMsg = "These passwords do not match. Try again?";
		}
	};

	app.regIns = function(regData) {
		app.errorMsg = false;
		if (app.regData.passcheck === app.regData.password){
			if (app.regData.password.length > 5) {
				if (User.passCheck(app.regData.password)){
					app.regData.state = "instructor";
					User.create(app.regData).then(function(data) {
						if (data.data.success) {
							app.successMsg = data.data.message + " Redirecting...";
							$timeout(function() {
								$location.path("/");
							}, 1000);
						} else {
							app.errorMsg = data.data.message;
						}
					});
				} else {
						app.errorMsg = "Password must contain at least 1 numeric character."
					}
			} else {
				app.errorMsg = "Password must contain at least 6 characters."
			}
		} else {
			app.errorMsg = "These passwords do not match. Try again?";
		}
	};
})

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    }
}]);