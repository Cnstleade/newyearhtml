(function($) {
	var ws = new WebSocket("wss://nh.cnstleader.com/websocket/u21");
	var ws2 = new WebSocket("wss://nh.cnstleader.com/websocket/gamescreen/1");
	// 建立 web socket 连接成功触发事件
	ws.onopen = function() {
		// 使用 send() 方法发送数据
		// ws.send("发送数据");
		console.log('发送数据')
	};
	ws2.onopen = function() {
		// 使用 send() 方法发送数据
		// ws.send("发送数据");
		console.log('发送数据2')
	};
	ws2.onmessage = function(evt) {
		console.log(evt + '++++++++++++++++++++++++++++++++++++++++++++++')
		let item = evt.data;
		if (item == "游戏胜利") {
			$('#restart').hide();
			$('#open').show();
			if (timer1) {
				window.clearInterval(timer1);
				timer1 = null
			};
			if (timer2) {
				window.clearInterval(timer2);
				timer2 = null
			};

		}
	};
	// 接收服务端数据时触发事件
	ws.onmessage = function(evt) {
		let item = JSON.parse(evt.data);
		let items = {
			img: item.avatarUrl, //图片 
			info: item.data, //文字 
			speed: 6, //延迟,单位秒,默认6 
			// bottom: 70, //距离底部高度,单位px,默认随机 
			color: item.color, //颜色,默认白色 
			old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
		}
		$('body').barrager(items);
	};

	// 断开 web socket 连接成功触发事件
	ws.onclose = function() {
		alert("连接已关闭...");
	};

	window.onbeforeunload = function(event) {
		ws.close();
		ws2.close();
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/clear",
			// data: "name=garfield&age=18",
			success: function(data) {
				$('.game').html(``)
			},
			error: function() {}
		});
	}

	$('#start').hide();
	$('#restart').hide();
	$('.good').hide();

	var timer1, timer2, timer3;
	var num = 65;
	$('#open').click(() => {
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/clear",
			// data: "name=garfield&age=18",
			success: function(data) {
				$('.game').html(``)
			},
			error: function() {}
		});		
		$('#open').hide();
		$('#start').show();
		if (timer1) {
			window.clearInterval(timer1);
			timer1 = null
		};
		if (timer2) {
			window.clearInterval(timer2);
			timer2 = null
		};
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/startcomein",
			success: (data) => {
				if (timer3) {
					window.clearInterval(timer3);
					timer3 = null;
					num = 65;
				};
				// 				timer1 = setInterval(() => {
				// 					$.ajax({
				// 						type: "GET",
				// 						url: "https://nh.cnstleader.com/game/result",
				// 						success: function(data) {
				// 							if (data.data) {
				// 								data.data.forEach((v, i) => {
				// 									$('#sucai').append(
				// 										`
				// 				                                                         <div class="yx" data-id="${i}">
				// 				                                                         </div>
				// 				                                                     `
				// 									)
				// 								})
				// 							} else {}
				// 						},
				// 						error: function() {}
				// 					})
				// 				}, 1000)


			},
			error: function() {}
		});
	})
	$('#start').click(() => {
		$('#start').hide();
		$('#restart').show();
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/userstart",
			success: (data) => {
				if (timer1) {
					window.clearInterval(timer1);
					timer1 = null
				};
				if (timer2) {
					window.clearInterval(timer2);
					timer2 = null
				};

				timer3 = setInterval(() => {
					num--;
					console.log(num);
					if (num == 0) {
						window.clearInterval(timer3);
						timer3 = null;
						num = 65;
						window.clearInterval(timer2);
						timer2 = null;
						$.ajax({
							type: "GET",
							url: "https://nh.cnstleader.com/game/result",
							success: (data4) => {
								$('.lis').html('');
								var str = '';
								var arrs = [];
								var arr = data4.data.slice(0, 6);
								arr.forEach((v, i) => {
									console.log(v, i)
									arrs.push(v.openId)
									switch (i) {
										case 0:
											str +=
												`
	   <p>
	   	<strong>一</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 1:
											str +=
												`
	   <p>
	   	<strong>二</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 2:
											str +=
												`
	   <p>
	   	<strong>三</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 3:
											str +=
												`
	   <p>
	   	<strong>四</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 4:
											str +=
												`
	   <p>
	   	<strong>五</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 5:
											str +=
												`
	   <p>
	   	<strong>六</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
									}
								})
								$('.lis').append(str);
								let datas = {
									results: arrs.join(',')
								}
								// $.ajax({
								//         url:'https://nh.cnstleader.com/game/gameresult',
								//         type:'POST',
								//         contentType: 'application/json; charset=UTF-8',
								//       
								//         dataType:'json',
								//         data:JSON.stringify(datas),
								//         success: function (response) {
								//             console.log(response);
								//         }
								//     })								
								$.ajax({
									type: 'POST',
									url: "https://nh.cnstleader.com/game/gameresult",
									contentType: "application/json",
									// data: JSON.stringify(datas),
									data: JSON.stringify(datas),
									success: (e) => {
										console.log(e)
									}
								})

							}
						})

						$('.good').show();
					}
				}, 1000)
				timer2 = setInterval(() => {
					$.ajax({
						type: "GET",
						url: "https://nh.cnstleader.com/game/result",
						success: (data2) => {
							$('.game').html(``)
							var data3 = data2.data;
							if (data3.length > 0) {
								data3.forEach((v, i) => {
									$('.game').append(
										`
					<div class="games">
						<h4>${v.name}${v.nowlocation}</h4>
						<img src="${v.photo}" alt="">
						<div></div>
					</div>
`
									)
								})
								$('.games').each((index, ele) => {
									console.log(index, ele)
									if (data3[index]) {
										// 										$(ele).animate({
										// 											height: data3[index]['nowlocation'] ? data3[index]['nowlocation'] + 90 + 'px' : '90px'
										// 										})

										$(ele).css("height", data3[index]['nowlocation'] ? data3[index]['nowlocation'] * 3 + 90 +
											'px' :
											'90px');
									}
								})
							} else {

							}

						},
						error: function() {}
					});
				}, 1000)
			},
			error: function() {}
		});
	})
	$('#restart').click(() => {
		$('#restart').hide();
		$('.good').hide();

		$('#open').show();
		if (timer1) {
			window.clearInterval(timer1);
			timer1 = null
		};
		if (timer2) {
			window.clearInterval(timer2);

			timer2 = null
		};
		if (timer3) {
			window.clearInterval(timer3);
			timer3 = null;
			num = 65;
		};
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/clear",
			// data: "name=garfield&age=18",
			success: function(data) {
				$('.game').html(``)
			},
			error: function() {}
		});
	})

})(jQuery)
