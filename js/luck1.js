//var xinm = ["于磊","万千","张文任","姜涛","薛纪克","付月磊","晁娜","陈宏波",]
 //
 //var phone = ["153****2811","183****962","183****6962","182****1546","137****1884","135****679","139****8582","153****2811"]
 $('.good').hide();
 var xinm = [];
 var phone = [];
 var id = [];
 $.ajax({
 	url: "https://nh.cnstleader.com/prize/noprize",
 	success: (data) => {

 		xinm = data.map(v => v.name)
 		phone = data.map(v => {
 			return v.phone.substring(0, 3) + '****' + v.phone.substring(7)
 		})
 		console.log(phone);
 		id = data.map(v => v.openId)
 		pcount = xinm.length - 1; //参加人数
 	}
 });
 // $.get("https://wxamtest.tunnel.qydev.com/prize/noprize",function(data,status){
 //    console.log(data);
 // });
 var codetxt = $('.code');

 var runing = true;
 var td = 1; //，共6个名额
 var num = 0;
 var t;
 var pcount;

 function start() {
 	if (td <= 0) {
 		return;
 	}
 	if (runing) {
 		runing = false;
 		$('#btntxt').removeClass('start').addClass('stop');
 		$('#btntxt').html('停止');
 		startNum();
 	} else {
 		runing = true;
 		$('#btntxt').removeClass('stop').addClass('start');
 		$('#btntxt').html('开始');
 		stop();
 		zd(); //
 	}
 }

 function startNum() {

 	num = Math.floor(Math.random() * pcount);
 	codetxt.html(xinm[num] + phone[num]);
 	t = setTimeout(startNum, 0);
 }
 //停止跳动
 function stop() {
 	pcount = xinm.length - 1;
 	clearInterval(t);
 	t = 0;
 }

 //打印列表
 function zd() {
 	//打印中奖者名单
 	if (td <= 0) {
 		alert("抽奖结束");
 	} else {
 		let data = {
 			openIds: id[num],
 			prize: "一等奖"
 		}
 		$.ajax({
 			type: 'POST',
 			url: "https://nh.cnstleader.com/prize/prize",
 			contentType: "application/json",

 			data: JSON.stringify(data),
 			success: (data) => {
 				//
 				// xinm =   data.map(v=>v.name)
 				// phone = data.map(v=>v.phone)
 				// pcount = xinm.length-1;//参加人数
 			}
 		});
 		$('.lis').prepend("<p>" + ' ' + xinm[num] + "</p>" + "<p>" + phone[num] + "</p>");

 		//将已中奖者从数组中"删除",防止二次中奖
 		xinm.splice($.inArray(xinm[num], xinm), 1);
 		id.splice($.inArray(id[num], id), 1);
 		phone.splice($.inArray(phone[num], phone), 1);
 	}
 	td = td - 1;
 	if (td <= 0) {
 		$('#btntxt').html('恭喜');
 	}
 $('.good').show()

 }


 		let datas = {
 			openIds:'sss'
 		}
 		$.ajax({
 			type: 'POST',
 			url: "https://nh.cnstleader.com/game/init",
 			contentType: "application/json",

 			data: JSON.stringify(datas),
 			success: (data) => {
 				//
 				// xinm =   data.map(v=>v.name)
 				// phone = data.map(v=>v.phone)
 				// pcount = xinm.length-1;//参加人数
 			}
 		});