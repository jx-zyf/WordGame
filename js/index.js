function WordGame(){
	this.letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
	'R','S','T','U','V','W','X','Y','Z'];
	this.colors=['red','blue','orange','yellow','purple','green'];
	this.num=0;
	this.handle=null;
	this.minH=50;
	this.speed=1000;
	// 切换速度
	this.changeSpeed();
	this.isPause=false;
	// 开始游戏
	this.play();
}
WordGame.prototype={
	getId:function(id){
		return document.getElementById(id);
	},
	getTagName:function(tagName,father){
		father=father||document;
		return father.getElementsByTagName(tagName);
	},
	// 切换速度
	changeSpeed:function(){
		var sel=document.querySelector('.choose select');
		var _this=this;
		sel.addEventListener('change',function(){
			_this.speed=parseInt(this.value);
			_this.stop();
			_this.start();
		})
	},
	// 将类数组转化成数组
	changeArray:function(likeArray){
		return Array.prototype.slice.call(likeArray,0);
	},
	getLetter:function(){
		var i=Math.floor(Math.random()*this.letters.length);
		return this.letters[i];
	},
	showNewLetter:function(){
		//创建一个span
		var span=document.createElement('span');
		//让新的span显示一个随机字母
		span.innerText=this.getLetter();
		//设置水平随机位置
		span.style.borderColor=span.style.color=this.colors[Math.floor(Math.random()*this.colors.length)];
		span.style.left=Math.random()*(this.getId('con').offsetWidth-50)+'px';
		//将新的span加入con
		this.getId('con').appendChild(span);
	},
	fall:function(){
		var spans=this.getTagName('span',this.getId('con')),newTop;
		//判断本次下落有没有元素超出边界
		if(spans.length>0&&spans[0].offsetTop+this.minH>=this.getId('con').offsetHeight-2){
			this.getId('con').removeChild(spans[0]);
		}
		//找到当前所有的span,遍历所有的span，将top值自加自身高度
		for(var i=0;i<spans.length;i++){
			newTop=spans[i].offsetTop+this.minH;
			spans[i].style.top=newTop+'px';
		}
	},
	start:function(){
		//不断自动创建新的字母并显示
		var _this=this;
		this.isPause=false;
		this.handle=setInterval(function(){
			_this.fall();
			_this.showNewLetter();
		},this.speed)
	},
	stop:function(){
		this.isPause=true;
		clearInterval(this.handle);
	},
	play:function(){
		this.start();
		var _this=this;
		document.onkeyup=function(e){
			//如果有你点击的字母相关的span，并且不是暂停状态，则删除
			if(!_this.isPause){
				var spans=_this.getTagName('span');
				spans=_this.changeArray(spans);
				for(var i=0;i<spans.length;i++){
					if(spans[i].className!="fade"&&spans[i].innerText==_this.letters[e.keyCode-65]){
						//添加消失动画
						spans[i].className="fade";
						setTimeout(function(){
							_this.getId('con').removeChild(spans[i]);
						},700)
						_this.num++;
						_this.getTagName('input')[0].value=_this.num*50;
						break;
					}
				}
			}
			// 切换暂停和开始
			if(e.keyCode===32){
				_this.isPause=!_this.isPause;
				_this.isPause?_this.stop():_this.start();
			}
		};
	}
}