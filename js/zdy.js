var tikuList = [];
var currenTimu = {};
var score = 0;
//是否还能继续选择
var isChoose = false;
//设置答题数量
var num = 10;
var result = [];
var currentIndex = 0;

function doLog(somedata) {
    $.ajax({
        url: "ajax_log.php",
        //data, an url-like string for easy access serverside
        data : somedata,
        cache: false,
        async: true,
        type: 'post',
        timeout : 5000
	});
	// // Create our XMLHttpRequest object
    // var hr = new XMLHttpRequest();
    // // Create some variables we need to send to our PHP file
    // var url = "ajax_log.php";
    // // var fn = document.getElementById("first_name").value;
    // // var ln = document.getElementById("last_name").value;
    // // var vars = "firstname="+fn+"&lastname="+ln;
    // hr.open("POST", url, true);
    // // Set content type header information for sending url encoded variables in the request
    // hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // // Access the onreadystatechange event for the XMLHttpRequest object
    // hr.onreadystatechange = function() {
	//     if(hr.readyState == 4 && hr.status == 200) {
	// 		console.log("save success");
	// 		console.log(hr.responseText);
	//     }
    // }
    // // Send the data to PHP now... and wait for response to update the status div
    // hr.send(somedata); // Actually execute the request
}

//ajax获取题目内容
$.get("./dati.json",function(res){
	//用了jquery相当于res = JSON.parse(res.responseText)
	//自动获取响应数据以字符串形式返回，不用自己多写这一句
	//把获取到的所有数据放入数组中
	tikuList = Object.entries(res)
})

//点击开始答题按钮切换页面
$(".startBtn").click(function(e){
	$(".gaming").addClass("active")
	$(".startGame").removeClass("active")
	//每次点击随机出个题目并显示在页面上
	randomRender()
})

function randomRender(){
	//获取题库数组中，随机出的整数(pasetInt)索引值		parseInt方法       返回由字符串转换得到的整数。
	$(".next").removeClass("active")
	var randomIndex = parseInt(Math.random()*tikuList.length);
	//每次拿出一个题目放到一个对象里，并把这个题目从数组中删除
	//这个题目对象是一个数组，所以写个0获取当前对象
	var currentEntry = tikuList.splice(randomIndex,1)[0];
	currentIndex = currentEntry[0];
	currentTimu = currentEntry[1];
	console.log(currentEntry);
	//获取页面标签题目，并把对象字符串中的quiz（题目）设置显示在页面上
	$(".timu").html(currentTimu.quiz)
	//每次执行清空一次
	$(".options").html("");
	$(".comment").html("");
	//遍历题目对象字符串中的选择options内容           	   内容        索引
	currentTimu.options.forEach(function(item,index){
		//$(".options").append(`&lt;div data-index="${index}"&gt;${index+1}.${item}&lt;/div&gt;`)
		$(".options").append(`<div data-index="${index}">${index+1}.${item}</div>`)
	})
	
		
}

//选项的点击事件
$(".options").click(function(e){
	if(!isChoose){
		//把索引值转成数字		parseInt方法       返回由字符串转换得到的整数。
		var index = parseInt(e.target.dataset.index);
		//console.log(index+1);
		//题目中的index是0开始,answer是1开始,所以要加一
		//若答案与点击按钮的索引一致
		if(currentTimu.answer==(index+1)){
			score += 10;
			//把获取的索引添加正确的背景颜色
			$("[data-index="+index+"]").addClass("correct")
			$(".comment").html(currentTimu.commenttrue);
		}else{
			var corectindex = currentTimu.answer-1;
			//若点击的索引不对,把正确的背景颜色和错误的背景颜色都显示出来
			$("[data-index="+corectindex+"]").addClass("correct")
			$("[data-index="+index+"]").addClass("error")
			$(".comment").html(currentTimu.commentfalse);
		}
		
		isChoose = true;
		//每点击一次,答题的数量减1
		num --;
		index_ = index+1;
		result.push(currentIndex);
		result.push(index_);
		//console.log(result);
		//延迟一秒进行切换
		// setTimeout(function(){
		// 	//答题数量结束了,切换到结束页面,否则切换到下一题
		// 	if(num==0){
		// 		$(".endGame").addClass("active")
		// 		//获取得分标签,把上面累计的得分设置显示到页面上
		// 		$(".score").html(score);
		// 	}else{
		// 		isChoose = false;
		// 		randomRender()
		// 	}
		// },1000)
	}	
})

$(".next").click(function(){
	//答题数量结束了,切换到结束页面,否则切换到下一题
	if(isChoose) {
		if(num==0){
			$(".endGame").addClass("active")
			//获取得分标签,把上面累计的得分设置显示到页面上
			$(".score").html(score);
			// var today = new Date();
			// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			// var dateTime = date+' '+time;
			console.log(result);
			//localStorage.setItem(dateTime, result);
			doLog(result.toString());
			// var dictstring = JSON.stringify(dateTime + result);
			// var fs = require('fs'); 
			// fs.writeFile("thing.json", dictstring);  
			// var data = new Blob([result],{type:"text/plain;charset=UTF-8"});
			// var downloadUrl = window.URL.createObjectURL(data);
			// var anchor = document.createElement("a");
			// anchor.href = downloadUrl;
			// anchor.download = "result.txt";
			// anchor.click();
			// window.URL.revokeObjectURL(data);

		}else{
			isChoose = false;
			randomRender()
		}
	}
})
//点击重新答题按钮后,重新刷新页面进行重新答题
$(".reStart").click(function(){
	//location.reload()	DOM方法	刷新页面
	location.reload()
})