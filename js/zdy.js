var tikuList = [];
var currenTimu = {};
var score = 0;
//是否还能继续选择
var isChoose = false;
//设置答题数量
var num = 10;

//ajax获取题目内容
$.get("dati.json",function(res){
	//用了jquery相当于res = JSON.parse(res.responseText)
	//自动获取响应数据以字符串形式返回，不用自己多写这一句
	console.log(res)
	//把获取到的所有数据放入数组中
	tikuList = res
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
	var randomIndex = parseInt(Math.random()*tikuList.length);
	//每次拿出一个题目放到一个对象里，并把这个题目从数组中删除
	//这个题目对象是一个数组，所以写个0获取当前对象
	currentTimu = tikuList.splice(randomIndex,1)[0];
	console.log(currentTimu);
	//获取页面标签题目，并把对象字符串中的quiz（题目）设置显示在页面上
	$(".timu").html(currentTimu.quiz)
	//每次执行清空一次
	$(".options").html("");
	//遍历题目对象字符串中的选择options内容           	   内容        索引
	currentTimu.options.forEach(function(item,index){
		$(".options").append(`&lt;div data-index="${index}"&gt;${index+1}.${item}&lt;/div&gt;`)
	})
	
		
}

//选项的点击事件
$(".options").click(function(e){
	if(!isChoose){
		//把索引值转成数字		parseInt方法       返回由字符串转换得到的整数。
		var index = parseInt(e.target.dataset.index);
		console.log(index+1);
		//题目中的index是0开始,answer是1开始,所以要加一
		//若答案与点击按钮的索引一致
		if(currentTimu.answer==(index+1)){
			score += 10;
			//把获取的索引添加正确的背景颜色
			$("[data-index="+index+"]").addClass("correct")
		}else{
			var corectindex = currentTimu.answer-1;
			//若点击的索引不对,把正确的背景颜色和错误的背景颜色都显示出来
			$("[data-index="+corectindex+"]").addClass("correct")
			$("[data-index="+index+"]").addClass("error")
		}
		
		isChoose = true;
		
		//每点击一次,答题的数量减1
		num --;
		
		
		//延迟一秒进行切换
		setTimeout(function(){
			//答题数量结束了,切换到结束页面,否则切换到下一题
			if(num==0){
				$(".endGame").addClass("active")
				//获取得分标签,把上面累计的得分设置显示到页面上
				$(".score").html(score);
			}else{
				isChoose = false;
				randomRender()
			}
		},1000)
	}
	
})

//点击重新答题按钮后,重新刷新页面进行重新答题
$(".reStart").click(function(){
	//location.reload()	DOM方法	刷新页面
	location.reload()
})