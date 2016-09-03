var module = ons.bootstrap('my-app', ['onsen']);

module.controller('Ctrl', function($scope,$http){
	
        $scope.alert = function() {
		    ons.notification.alert({message: 'An error has occurred!'});
		  }
		  $scope.alerts = function(str) {
		    ons.notification.alert({message: str});
		  }
		$scope.exam_answer_alert = function() {
		    ons.notification.alert({message: 'Select your answer!'});
		  }
		  

		$scope.prompt_rev = function() {
		    ons.notification.prompt({
		      message: "Input Passcode",
		      callback: function(str) {
		      	if(str != ""){

		      		$("#overlay").show();
		   //    		$http({
				 //  		method: 'POST',
				 //  		url: 'http://localhost/COCWebApp/index.php/sections_con/get_by_col',
				 //  		crossDomain: true,
				 //  		data: $.param({'section' : localStorage.getItem('section') }),
					//     headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'}
					// }).
					//   success(function(data) {
					//   	console.log(data);
					    // if(str == ""){
					    // 	$scope.alerts("Passcode not yet provided");
					    // 	$("#overlay").hide();
					    // }else 
					    // if(data[0].passcode == str){
					    // 	$scope.alerts("Passcode Accepted");
		      	// 			$scope.get_exams();
		      	// 			$("#overlay").hide();
					    // }
					    if(str == "coccrim"){
					    	$scope.alerts("Passcode Accepted");
		      				$("#overlay").hide();
		      				myNavigator.pushPage('category-list.html');
					    }else{
					    	$scope.alerts("Passcode Incorrect");
					    	$("#overlay").hide();
					    }
					    
					  // });
		      	}else{
		      		$scope.alerts("Input Passcode");
		      	}
		      }
		    });
		  }

		$scope.prompt_passcode = function() {
		    ons.notification.prompt({
		      message: "Input Passcode",
		      callback: function(str) {
		   //    	if(str != ""){

		   //    		$("#overlay").show();
		   //    		$http({
				 //  		method: 'POST',
				 //  		url: 'http://localhost/COCWebApp/index.php/sections_con/get_by_col',
				 //  		crossDomain: true,
				 //  		data: $.param({'section' : localStorage.getItem('section') }),
					//     headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'}
					// }).
					//   success(function(data) {
					//   	console.log(data);
					//     if(data[0].passcode == ""){
					//     	$scope.alerts("Passcode not yet provided");
					//     	$("#overlay").hide();
					//     }else if(data[0].passcode == str){
					    	$scope.alerts("Passcode Accepted");
		      				$scope.get_exams();
		      				$("#overlay").hide();
					  //   }else{
					  //   	$scope.alerts("Passcode Incorrect");
					  //   	$("#overlay").hide();
					  //   }
					    
					  // });
		     //  	}else{
		     //  		$scope.alerts("Input Passcode");
		     //  	}
		      }
		    });
		  }

		  	$scope.back = function(){
		  		var pages = myNavigator.getPages();
		        pages[pages.length-1].destroy();
		        pages[pages.length-1].destroy();
		        myNavigator.popPage({ animation: "fade" });
		  	}


		  	$scope.rev_category = function(cat){
		  		$("#overlay").show();
		        myNavigator.pushPage('chap_cat'+cat+'.html');
		        setTimeout(function(){
		        	$("#overlay").hide();
		        },800);
		  	}
		  	$scope.chapter = function(cat,num){
		  		$("#overlay").show();
		        myNavigator.pushPage(cat+'-'+num+'.html');
		        setTimeout(function(){
		        	$("#overlay").hide();
		        },800);
		  	}
		  
		  $scope.confirm_exit_exam = function() {
		    ons.notification.confirm({
		      message: 'Are you sure you want to stop the Exam?',
  			  buttonLabels: ['Yes', 'No'],
		      callback: function(idx) {
		        switch(idx) {
		          case 0:
		          	myNavigator.replacePage('home.html', { animation: "fade" });
		          	var pages = myNavigator.getPages();
		          	pages[pages.length-4].destroy();
		          	myNavigator.popPage({ animation: "fade" });
		            break;
		          case 1:
		            ons.notification.alert({
		              message: 'You pressed "No".'
		            });
		        }
		      }
		    });
		  }

		  $scope.confirm_logout = function() {
		  	$("#overlay").show();
		    ons.notification.confirm({
		      message: 'Are you sure you want to Logout?',
  			  buttonLabels: ['Yes', 'No'],
		      callback: function(idx) {
		        switch(idx) {
		          case 0:
		          	ons.notification.alert({
		              message: 'You are logged out.'
		            });
		          	localStorage.clear();
			        $( ".ol-btns" ).hide();
					$( "#login-btn" ).show();
					$( "#logout-btn" ).hide();
		          	// var pages = myNavigator.getPages();
		          	// pages[pages.length-1].destroy();
		          	// myNavigator.popPage({ animation: 'slide' });
		          	$("#overlay").hide();
		            break;
		        }
		      }
		    });
		  }
		  var time_toggle;
		  $scope.timer = function(){

		  	var h = localStorage.getItem('h');
		    var m = localStorage.getItem('m');
		    var s = localStorage.getItem('s');
		    var t = '0 hours 0 minutes 0 seconds';
		    $("#time").text(t);
			count();

			function count(){
				$("#time").text(t);
				if( h == 0 && m == 0 && s == 0 ){
					$scope.submit_exam(1);
					return;
				}else if( h == 0 && m == 0 && s != 0 ){
					t =  s + " seconds" ;
					s--;
				}else if( h == 0 && m != 0 ){
					if( s > -1 ){
						t = m + " minutes " + s + " seconds" ;
						s--;
						if(s == -1){
							s = 59;
							m--;
						}
					}
				}else if( h != 0  ){
					if( m > -1 ){
						if( s > -1){
							t = h + " hours " + m + " minutes " + s + " seconds" ;
							s--;
							if( s == -1 ){
								s = 59;
								m--;
								if( m == -1 ){
									m = 59;
									h--;
								}
							}
						}
					}
				}	
				time_toggle = setTimeout( count,1000 );
			}
		  }


		// ARRAYS
		$scope.exams = [];
		$scope.items = [];
		$scope.examination = [];
		$scope.def_exam_items = [];
		$scope.evaluation = [];



			$scope.get_exams = function(){
				var ins = localStorage.getItem('ins_id');
				$("#overlay").show();
				$http({
				  		method: 'POST',
				  		url: 'http://localhost/COCWebApp/index.php/exams_con/get_by_ins_id',
				  		crossDomain: true,
				  		data: $.param({'instructor_id' : ins}),

					    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'}
					}).
					  success(function(data) {
					    $scope.exams = data;
					    myNavigator.pushPage('exam-list.html');
					    $("#overlay").hide();
					  });
			}

			$scope.confirm_exam = function(id,name,items,timer,stat){
				$("#overlay").show();
				if(stat == 'Open'){
					localStorage.setItem( 'exam_no',id );
					var it = items;
					var no_items = "";
					for(a in it){
						if(it[a] == '/'){
							break;
						}else{
							no_items+=it[a];
						}
					}
					localStorage.setItem( 'items',no_items );
					console.log(localStorage.getItem('items'));
					myNavigator.pushPage('exam-desc.html');

					setTimeout(function(){
						$( "#exam_name" ).text(name);
						$( "#exam_items" ).text(items);
						$( "#exam_timer" ).text(timer);   	          			
						                		
					},250);

					// var tim = timer.replace(/[]/g, '');
					// console.log(tim);
					var tim = timer;
					var h;
					var m;
					var s;
					var temp = "";

					for(a in tim){
							if(tim[a] == ' '){

							}else if( tim[a] == 'h' || tim[a] == 'm' || tim[a] == 's'){
								if( tim[a] == 'h' ){
									h = temp;
									temp = "";
								}
								if( tim[a] == 'm' ){
									m = temp;
									temp = "";
								}
								if( tim[a] == 's' ){
									s = temp;
									temp = "";
								}
							}else{
								temp += tim[a];
							}
						localStorage.setItem('h',h);
						localStorage.setItem('m',m);
						localStorage.setItem('s',s);
					}

					localStorage.setItem('time',timer);
					$("#overlay").hide();	
				}else{
					$scope.alerts("Exam not yet Activated");
					$("#overlay").hide();
				}
			}

			var rand;

			$scope.get_items = function(){
				$("#overlay").show();
				$scope.examination = [];
				$scope.def_exam_items = [];
				$.ajax({
			                type: "POST",
			                url: "http://localhost/COCWebApp/index.php/exam_content_con/get_items",
			                data: {exam_no:localStorage.getItem('exam_no')} ,
			                dataType: ' JSON ',
			                crossDomain: true,
			                headers: {
			                    "Access-Control-Allow-Origin": "*",
			                },
			                success:function(response){

			                	myNavigator.pushPage('exam.html');
			                	$scope.timer();
			                	$scope.items = response;
			                	if( $scope.items.length > 1){
				                	var item = $scope.items[Math.floor(Math.random() * ($scope.items.length))];
				                	rand = $scope.items.indexOf(item);
				                	$scope.items.splice(rand,1);
				                	var temp = item.exam_timer;			                	
				                	setTimeout(function(){
				                			
					                		$( "#item #question" ).text(item.exam_question);
					                		$( "#item #answer1" ).text(item.exam_answer1);
					                		$( "#item #answer2" ).text(item.exam_answer2);
					                		$( "#item #answer3" ).text(item.exam_answer3);
					                		$( "#item #answer4" ).text(item.exam_answer4);
					                		$( "#item #item-id" ).val(item.id);
					                		// $( "#time" ).text(localStorage.getItem('time'));
				                	},200);	
			                	}else{
									var item = $scope.items[Math.floor(Math.random() * ($scope.items.length))];
									rand = $scope.items.indexOf(item);
								    $scope.items.splice(rand,1);
									setTimeout(function(){
								        
								        $( "#item #question" ).text(item.exam_question);
									    $( "#item #answer1" ).text(item.exam_answer1);
									    $( "#item #answer2" ).text(item.exam_answer2);
									    $( "#item #answer3" ).text(item.exam_answer3);
									    $( "#item #answer4" ).text(item.exam_answer4);
									    $( "#item #item-id" ).val(item.id);        			
									    $( ".submit-btn" ).show();
									    $( ".next-btn" ).hide();
								    },200);
								}
								$("#overlay").hide();		                	
			                },
			                error:function (e){
			                    alert("Error! ");
			                    $("#overlay").hide();
			                },
			        });
				
			}	

			$scope.next_item = function(){
				var ans = $( "#item input[name=answer]:checked" ).val();
				var no_items;
				var correct;
				var incorrect;
				$("#overlay").show();
				if(ans != 0){

					var item_no = $( "#item-id" ).val();
					var item_data =  [item_no, ans];

					$scope.examination.push(item_data);
					

					myNavigator.replacePage('exam.html', { animation: 'slide' });
					if( $scope.items.length > 1){
						var item = $scope.items[Math.floor(Math.random() * ($scope.items.length))];
						rand = $scope.items.indexOf(item);
					    $scope.items.splice(rand,1);   	
					    setTimeout(function(){
					                			
						    $( "#item #question" ).text(item.exam_question);
						    $( "#item #answer1" ).text(item.exam_answer1);
						    $( "#item #answer2" ).text(item.exam_answer2);
						    $( "#item #answer3" ).text(item.exam_answer3);
						    $( "#item #answer4" ).text(item.exam_answer4);
						    $( "#item #item-id" ).val(item.id);
					    },200);
					    $("#overlay").hide();
					}else{
						var item = $scope.items[Math.floor(Math.random() * ($scope.items.length))];
						rand = $scope.items.indexOf(item);
					    $scope.items.splice(rand,1);
						setTimeout(function(){
					        
					        $( "#item #question" ).text(item.exam_question);
						    $( "#item #answer1" ).text(item.exam_answer1);
						    $( "#item #answer2" ).text(item.exam_answer2);
						    $( "#item #answer3" ).text(item.exam_answer3);
						    $( "#item #answer4" ).text(item.exam_answer4);
						    $( "#item #item-id" ).val(item.id);        			
						    $( ".submit-btn" ).show();
						    $( ".next-btn" ).hide();
					    },200);
					    $("#overlay").hide();
					}
				}else{
					$scope.exam_answer_alert();
					$("#overlay").hide();
				}

				

			}
				
						
			$scope.submit_exam = function(){
					
					var ans = $( "#item input[name=answer]:checked" ).val();
					$("#overlay").show();
					
						clearTimeout(time_toggle);
						var item_no = $( "#item-id" ).val();
						var ctr = 0;
						no_items = localStorage.getItem('items');
						correct = 0;
						incorrect = 0;
						var item_data = [ item_no,ans ];
						var max_progress_id;

						$scope.examination.push(item_data);
						// ////////////////////////
						$http({
							method: 'POST',
							url: 'http://localhost/COCWebApp/index.php/results_con/get_result',
							crossDomain: true,
							data: $.param({ 'student_id' : localStorage.getItem('id') }),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						}).
						  success(function(data) {
						   	if( data == 0 ){
						   		$http({
									method: 'POST',
									url: 'http://localhost/COCWebApp/index.php/results_con/add',
									crossDomain: true,
									data: $.param({ 'student_id' : localStorage.getItem('id') }),
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).
									success(function(data) {
									}).
														error(function(data) {
															$http(this);
														});
						   	}
						  });	
						  // ///////////////////////

						$http({
					 		method: 'POST',
					 		url: 'http://localhost/COCWebApp/index.php/progress_con/add',
					 		crossDomain: true,
					 		data: $.param({ 'student_no' : localStorage.getItem('id'),'exam_no' : localStorage.getItem('exam_no')}),
							    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							}).
							  success(function(data) {

							  	$http({
									method: 'POST',
									url: 'http://localhost/COCWebApp/index.php/progress_con/get_max_id',
									crossDomain: true,
									data: $.param({ 'cols' : 'id' }),
									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
								}).
									success(function(data) {
										max_progress_id	= data[0].id;
										console.log(max_progress_id); 
										$.ajax({
								                type: "POST",
								                url: "http://localhost/COCWebApp/index.php/exam_content_con/get_items",
								                data: {exam_no:localStorage.getItem('exam_no')} ,
								                dataType: ' JSON ',
								                crossDomain: true,
								                headers: {
								                    "Access-Control-Allow-Origin": "*",
								                },
								                success:function(response){
						                			$scope.def_exam_items = response;
						                			console.log($scope.def_exam_items);
						                			for( var x = 0; x < $scope.examination.length; x++ ){
														for( d in $scope.def_exam_items ){
															if( $scope.examination[x][0] == $scope.def_exam_items[d].id ){
																if( $scope.examination[x][1] == $scope.def_exam_items[d].exam_correct_answer ){
																	// $scope.evaluation.push([ $scope.examination[x]['item_no'],$scope.def_exam_items[a][0].exam_no,$scope.def_exam_items[a][0].exam_question,$scope.def_exam_items[a][0].exam_answer1,$scope.def_exam_items[a][0].exam_answer2,$scope.def_exam_items[a][0].exam_answer3,$scope.def_exam_items[a][0].exam_answer4,$scope.def_exam_items[a][0].exam_correct_answer,"correct" ]);
																	var array = {'progress_no':max_progress_id, 'exam_content_no':$scope.def_exam_items[d].id, 'ans':$scope.examination[x][1], 'evaluation':'correct'};
																	console.log(array);
																	correct++;
																	$http({
																	 	method: 'POST',
																	 	url: 'http://localhost/COCWebApp/index.php/progress_items_con/add',
																	 	crossDomain: true,
																	 	data: $.param(array),
																		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																	}).
																	success(function(data) {
																		console.log("Progress added");
																	}).
																	error(function(data) {
																		$http(this);
																	});
																}else{
																	var array = {'progress_no':max_progress_id, 'exam_content_no':$scope.def_exam_items[d].id, 'ans':$scope.examination[x][1], 'evaluation':'incorrect'};
																	incorrect++;
																	$http({
																	 	method: 'POST',
																	 	url: 'http://localhost/COCWebApp/index.php/progress_items_con/add',
																	 	crossDomain: true,
																	 	data: $.param(array),
																		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																	}).
																	success(function(data) {
																		console.log("Progress added");
																	}).
																	error(function(data) {
																		$http(this);
																	});
																}

																

															}
														}
														// no_items++;
														console.log(x);
														if( x == ( $scope.examination.length-1 ) ){
															

															var rating = correct + "/" + no_items;
															var grade = Math.round( ( ( correct / no_items ) * 100 ) ); 
															var evaluation;

															
															if( grade >= 50 ){
																evaluation = "Passed";
															}else{
																evaluation = "Failed";
															}
															console.log(max_progress_id + " " + no_items + " " + correct + " " + incorrect + " " + rating + " " + grade + " " + evaluation);
															
															$http({
																 	method: 'POST',
																 	url: 'http://localhost/COCWebApp/index.php/progress_con/update/' + max_progress_id,
																 	crossDomain: true,
																 	data: $.param({ 'rating':rating , 'grade':grade+"%" , 'evaluation':evaluation }),
																	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																}).
																success(function(data) {
																	console.log(data);
																	myNavigator.pushPage('evaluation.html');

																	setTimeout(function(){
																		$( "#items" ).text(no_items + "/" + no_items);
																		$( "#rating" ).text(rating);
																		$( "#grade" ).text(grade+"%");
																		$( "#evaluation" ).text(evaluation);
																	},100);

																	$http({
																		 	method: 'POST',
																		 	url: 'http://localhost/COCWebApp/index.php/progress_con/get_progress_exams',
																		 	crossDomain: true,
																		 	data: $.param({ 'student_no':localStorage.getItem('id') }),
																			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																		}).
																		success(function(data) {
																		   	var sgrade = 0;
																		   	var sexams_ctr = 0;
																		   	var seval;
																		   	var arr = [];
																		   	for(a in data){
																		   		$http({
																			  		method: 'POST',
																			  		url: 'http://localhost/COCWebApp/index.php/progress_con/get_exams',
																			  		data: $.param({'student_no' : localStorage.getItem('id'), 'exam_no': data[a].exam_no }),
																				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																				}).
																				  success(function(datas) {
																				  	var temp_data;
																				  	var temp_id = datas[0].id;
																				  	for( b in datas ){
																				  		if( parseInt(datas[b].id,10) >= temp_id ){
																				  			temp_data = datas[b];
																				  			temp_id = datas[b].id;
																				  		}
																				  		if( b == (datas.length-1) ){

																				  			if( parseInt(datas[b].id,10) >= temp_id ){
																				  				temp_data = datas[b];
																					  			temp_id = datas[b].id;
																					  			arr.push(temp_data);
																					  			console.log(arr);
																						   		sexams_ctr++;
																						   		sgrade += parseInt( datas[b].grade.split('%')[0] );
																						   		console.log(sexams_ctr + " " + sgrade);
																					   			if( parseInt(sgrade/sexams_ctr) > 50 ){
																									seval = "Passed";
																								}else{
																									seval = "Failed";
																								} 

																								$http({
																									method: 'POST',
																									url: 'http://localhost/COCWebApp/index.php/results_con/update_results/' +'student_id/'+ localStorage.getItem('id'),
																									crossDomain: true,
																									data: $.param({ 'student_grade':parseInt(sgrade/sexams_ctr)+"%" , 'student_evaluation':seval }),
																									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																								}).
																									success(function(data) {
																										$("#overlay").hide();	
																									}).
																									error(function(data) {
																										$http(this);
																									});
																				  			}else{
																				  				arr.push(temp_data);
																				  				console.log(arr);
																						   		sexams_ctr++;
																						   		sgrade += parseInt( datas[b].grade.split('%')[0] );
																						   		console.log(sexams_ctr + " " + sgrade);
																						   		console.log("aaaaaaaa");
																					   			if( parseInt(sgrade/sexams_ctr) > 50 ){
																									seval = "Passed";
																								}else{
																									seval = "Failed";
																								} 

																								$http({
																									method: 'POST',
																									url: 'http://localhost/COCWebApp/index.php/results_con/update_results/' +'student_id/'+ localStorage.getItem('id'),
																									crossDomain: true,
																									data: $.param({ 'student_grade':parseInt(sgrade/sexams_ctr)+"%" , 'student_evaluation':seval }),
																									headers: {'Content-Type': 'application/x-www-form-urlencoded'}
																								}).
																									success(function(data) {
																										$("#overlay").hide();
																									}).
																									error(function(data) {
																										$http(this);
																									});
																				  			}
																				  		}
																				  	}

																				  }).
																					error(function(data) {
																						$http(this);
																					});
																		   	}
																		}).
																		error(function(data) {
																			$http(this);
																		});	

																}).
																error(function(data) {
																	$http(this);
																});
														}
													}
								                },
								                error:function (e){
								                    alert("Error! ");
								                },
								        }); 		
									}).
														error(function(data) {
															$http(this);
														});
							  }).
														error(function(data) {
															$http(this);
														});
							  // /////////////
							  	
										

							  
								
								

					// }else{
					// 	$scope.exam_answer_alert();
					// 	$("#overlay").hide();
					// }
			}

			$scope.progress = [];
			$scope.lat_progress = [];
			$scope.progress_items = [];

			$scope.get_progress = function(){
				$("#overlay").show();
				var id = localStorage.getItem('id');
				$scope.progress = [];
				$http({
				  		method: 'POST',
				  		url: 'http://localhost/COCWebApp/index.php/progress_con/get_progress',
				  		crossDomain: true,
				  		data: $.param({'student_no' : id}),
					    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'}
					}).
					  success(function(data) {
					    $scope.progress = data;
					    myNavigator.pushPage('results-list.html');
					    // $("#overlay").hide();
					  });
			}

			$scope.get_lat_progress = function(){
				$("#overlay").show();
				var id = localStorage.getItem('id');
				$scope.lat_progress = [];
				$http({
				  		method: 'POST',
				  		url: 'http://localhost/COCWebApp/index.php/progress_con/get_progress_exams',
				  		crossDomain: true,
				  		data: $.param({'student_no' : id}),
					    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'}
					}).
					  success(function(data) {
					  	
					  	for( a in data ){
					   		$http({
						  		method: 'POST',
						  		url: 'http://localhost/COCWebApp/index.php/progress_con/get_exams',
						  		data: $.param({'student_no' : id, 'exam_no': data[a].exam_no }),
							    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
							}).
							  success(function(datas) {
							  	
							  	var temp_data;
							  	var temp_id = datas[0].id;
							  	for( b in datas ){
							  		if( parseInt(datas[b].id,10) >= temp_id ){
							  			temp_data = datas[b];
							  			temp_id = datas[b].id;
							  		}
							  		if( b == (datas.length-1) ){

							  			if( parseInt(datas[b].id,10) >= temp_id ){
							  				temp_data = datas[b];
								  			temp_id = datas[b].id;
								  			$scope.lat_progress.push(temp_data);
								  			console.log($scope.lat_progress);
								  	// 		grade += parseInt( datas[b].grade.split('%')[0] );
											// exams_ctr++;
											  				  								
											// $( "#stdn-id-num" ).text(idnum);
											// $( "#stdn-name" ).text(name);
											// $( "#stdn-sec" ).text(sec);
											// $( "#tot-grade" ).text( parseInt(grade/exams_ctr) + "%");
											// if( parseInt(grade/exams_ctr) >= 50 ){
											// 	$( "#overall-evaluation" ).html( '<span>Passed</span> <i class="glyphicon glyphicon-ok-sign" style="color:#449D44;"></i>');
											// }else{
											// 	$( "#overall-evaluation" ).html( '<span>Failed</span> <i class="glyphicon glyphicon-remove-sign" style="color:#A30F0F;"></i>');
											// }
							  			}else{
							  				$scope.lat_progress.push(temp_data);
							  				console.log($scope.lat_progress);
							  		// 		grade += parseInt( datas[b].grade.split('%')[0] );
											// exams_ctr++;
											// $( "#stdn-id-num" ).text(idnum);
											// $( "#stdn-name" ).text(name);
											// $( "#stdn-sec" ).text(sec);
											// $( "#tot-grade" ).text( parseInt(grade/exams_ctr) + "%");
											// if( parseInt(grade/exams_ctr) >= 50 ){
											// 	$( "#overall-evaluation" ).html( '<span>Passed</span> <i class="glyphicon glyphicon-ok-sign" style="color:#449D44;"></i>');
											// }else{
											// 	$( "#overall-evaluation" ).html( '<span>Failed</span> <i class="glyphicon glyphicon-remove-sign" style="color:#A30F0F;"></i>');
											// }
							  			}
							  			 
							  		}
							  		
							  	}

							  });
							if(a == (data.length-1) ){
							  	$("#overlay").hide();
							}
					   	}
					  });
			}

			$scope.get_progress_items = function(prog_no,rating,grade,eval){
				$("#overlay").show();
				$.ajax({
			                type: "POST",
			                url: "http://localhost/COCWebApp/index.php/progress_items_con/get_progress_items",
			                data: {progress_no:prog_no} ,
			                dataType: ' JSON ',
			                crossDomain: true,
			                headers: {
			                    "Access-Control-Allow-Origin": "*",
			                },
			                success:function(response){
			                	$scope.progress_items = response;
	                			myNavigator.pushPage('result.html');

	                			setTimeout(function(){
					                			
								    $( "#score" ).text(rating);
								    $( "#grade" ).text(grade);
								    $( "#eval" ).text(eval);
							    },250);
							    $("#overlay").hide();
			                },
			                error:function (e){
			                    alert("Error! ");
			                    $("#overlay").hide();
			                },
			        });
				
			}
			
      });


var session = {

	initialize: function() {

        if(localStorage.getItem('con_status') == "wifi"){
            // alert("You have internet connection");
            var user_status = localStorage.getItem('logged_in');
	        console.log(user_status);
	        if( user_status == 'true' ){
	        	$( ".ol-btns" ).show();
	        	$( "#logout-btn" ).show();
				$( "#login-btn" ).hide();
	        }else{
	        	localStorage.clear();
	        	$( ".ol-btns" ).hide();
	        	$( "#logout-btn" ).hide();
				$( "#login-btn" ).show();
	        }
        }else{
        	localStorage.clear();
        	$( ".ol-btns" ).hide();
	        $( "#logout-btn" ).hide();
			$( "#login-btn" ).show();
            // alert("Please check internet connection");
            // navigator.app.exitApp();
        }
    },

}


// LOGIN

function login(){

    // if(localStorage.getItem('con_status') == "wifi"){
  //   	var id_num = $( "#id_num" ).val();
		// var pass = $( "#pass" ).val();
		// $("#overlay").show();
		// $.ajax({
	 //                type: "POST",
	 //                url: "http://localhost/COCWebApp/index.php/students_con/get_student",
	 //                headers: {
	 //                    'Access-Control-Allow-Origin' : '*'
	 //                },
	 //                data: {id_num:id_num,pass:pass} ,
	 //                dataType: ' JSON ',
	 //                crossDomain: true,
	                
	 //                success:function(response){
	 //                	if(response != 0){
	 //                		for(a in response){
	 //                			localStorage.setItem('id',response[a].id);
	 //                			localStorage.setItem('id_num',response[a].id_num);
	 //                			localStorage.setItem('name',response[a].name);
	 //                			localStorage.setItem('section',response[a].section);
	 //                			localStorage.setItem('pass',response[a].pass);
	 //                			localStorage.setItem('ins_id',response[a].instructor_id);
	 //                			localStorage.setItem('logged_in',true);
	                			var pages = myNavigator.getPages();
					          	myNavigator.popPage({ animation: 'fade' });
					          	$( ".ol-btns" ).show();
					          	$( "#login-btn" ).hide();
					          	$( "#logout-btn" ).show();
	                			// alert(localStorage.getItem('id') + localStorage.getItem('id_num') + localStorage.getItem('name') + localStorage.getItem('section') + localStorage.getItem('pass') + localStorage.getItem('ins_id'));
	        //         			$("#overlay").hide();
	        //         		}
	        //         	}else{
	        //         		alert("Error ! No Student Found");
	        //         		$("#overlay").hide();
	        //         	}
	        //         },
	        //         error:function (e){
	        //             alert("Error! " + e.message );
	        //             $("#overlay").hide();
	        //         },
	        // });
    // }else{
    // 	alert("Please Check Internet Connection");
    // }
}

$("body").delegate( "#ng-1-btn" , "click" ,function(){
	$("#ng-1").show();
	$("#ng-2").hide();
	$("#ng-2-btn").show();
	$("#ng-1-btn").hide();
});


$("body").delegate( "#ng-2-btn" , "click" ,function(){
	$("#ng-2").show();
	$("#ng-1").hide();
	$("#ng-1-btn").show();
	$("#ng-2-btn").hide();
});