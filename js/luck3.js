	$('.good').hide()
var xinm =[];
var phone =[];
var id = [];
$.ajax({
    url: "https://nh.cnstleader.com/prize/noprize",
    success:  (data) =>{

        xinm =   data.map(v=>v.name)
        phone = data.map(v=>{ return v.phone.substring(0,3) + '****'+v.phone.substring(7) })
        console.log(phone);
        id = data.map(v=>v.openId)
        pcount = xinm.length-1;//参加人数
    }
});
var codetxt = $('.codes');
var pcount ;//参加人数
var runing = true;
var td = 5;//，共6个名额
var num = 0;
var t,c1,c2,c3,c4,c5;
var ids =[];
function  start() {
    if(td <= 0){
        return;
    }
    if(runing){
        runing = false;
        $('#btntxt').removeClass('start').addClass('stop');
        $('#btntxt').html('停止');
        startNum();
    }else{
        runing = true;
        $('#btntxt').removeClass('stop').addClass('start');
        $('#btntxt').html('开始');
        stop();
        zd(1);//
        startNum();
        stop();
        zd(2);//
        startNum();
        stop();
        zd(3);//
        startNum();
        stop();
        zd(4);//
        startNum();
        stop();
        zd(5);//
        $('.c1').html(c1);
        $('.c2').html(c2);
        $('.c3').html(c3);
        $('.c4').html(c4);
        $('.c5').html(c5);
    }
}

function startNum() {
    num = Math.floor(Math.random() * pcount);
    codetxt.html(xinm[num]+phone[num]);
    t = setTimeout(startNum, 0);
}
//停止跳动
function stop() {
    pcount = xinm.length-1;
    clearInterval(t);
    t = 0;
}

//打印列表
function zd(i) {
    //打印中奖者名单
    if(td <= 0){
        alert("抽奖结束");
    }else{
        switch (i){
            case 1:
                c5 = xinm[num]+phone[num];
                break;
            case 2:
                c4 = xinm[num]+phone[num];
                break;
            case 3:
                c3 = xinm[num]+phone[num];
                break;
            case 4:
                c2 = xinm[num]+phone[num];
                break;
            case 5:
                c1 = xinm[num]+phone[num];
                break;
        }
        ids.push(id[num]);
        console.log(ids);
        if(i==5){
            $.ajax({
                type: 'POST',
                url: "https://nh.cnstleader.com/prize/prize",
                contentType: "application/json",
                data:JSON.stringify({openIds:ids.join(","),prize:"幸运奖"}),
                success:  (data) =>{
                    //
                    // xinm =   data.map(v=>v.name)
                    // phone = data.map(v=>v.phone)
                    // pcount = xinm.length-1;//参加人数
                }
            });
        }
        $('.lis').prepend("<p class='pp'>"+' '+xinm[num]+"</p>"+"<p class='pp'>"+phone[num]+"</p>");
        //将已中奖者从数组中"删除",防止二次中奖
        xinm.splice($.inArray(xinm[num], xinm), 1);
        phone.splice($.inArray(phone[num], phone), 1);
        id.splice($.inArray(id[num], id), 1);
    }
    td = td - 1;
    if(td <= 0){
        $('#btntxt').html('恭喜');
    }
	$('.good').show()

}