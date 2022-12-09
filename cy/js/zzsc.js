function myEvent(obj, ev, fu){
	obj.attachEvent ? obj.attachEvent('on' + ev, fu) : obj.addEventListener(ev, fu, false);
}
window.onload = function(){
	var oBox = document.getElementById('ztbox');//整个容器
	var oLeft = document.getElementById('left');//左侧按钮
	var oRight = document.getElementById('right');//右侧按钮
	var oConter = document.getElementById('conter');//hiden容器
	var oUl = oConter.getElementsByTagName('ul')[0];//ul
	var oLi = oConter.getElementsByTagName('li');//li
	var oScroll = document.getElementById('scroll');//滚动条
	var oSpan = oScroll.getElementsByTagName('span')[0];//滚动条上的滑块
	var i = 0;
	
	
	
	oUl.style.width =oLi.length*300 +'px';//设置容器宽度
	//var iWidth = oScroll.offsetWidth/(oUl.offsetWidth / oConter.offsetWidth - 1)
	var iWidth=1200;//每次偏移距离
	/*oLeft.onmouseover = oRight.onmouseover = function(){
		this.className = 'hover';
		//点击左侧按钮
		oLeft.onclick = function(){
			var butscroll = oSpan.offsetLeft - iWidth;
			oscroll(butscroll);
		};
		//点击右侧按钮
		oRight.onclick = function(){
			var butscroll = oSpan.offsetLeft + iWidth;
			
			oscroll(butscroll);
		};
	};*/
	
	   //点击左侧按钮
		oLeft.onclick = function(){
			//var butscroll = oSpan.offsetLeft - iWidth;
			var butscroll =-oUl.offsetLeft-iWidth;//移动位移	
	
			oscroll(butscroll);
		};
		//点击右侧按钮
		oRight.onclick = function(){
			//var butscroll = oSpan.offsetLeft + iWidth;//移动位移	
			var butscroll =-oUl.offsetLeft+ iWidth;//移动位移	
			oscroll(butscroll);
		};
	//点击滚动条
	oScroll.onclick = function(e){
		var oEvent = e || event;
		var butscroll = oEvent.clientX - oBox.offsetLeft - 0 - oSpan.offsetWidth / 2;
		oscroll(butscroll);
	};
	oSpan.onclick = function(e){
		var oEvent = e || event;
		oEvent.cancelBubble=true;
	}
	oLeft.onmouseout = oRight.onmouseout = function(){
		this.className = '';
	};
	//拖拽滚动条
	var iX = 0;
	oSpan.onmousedown = function(e){
		var oEvent = e || event;
		iX = oEvent.clientX - oSpan.offsetLeft;
		document.onmousemove = function(e){
			var oEvent = e || event;
			var l = oEvent.clientX - iX;
			td(l);
			return false;
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
	//滚轮事件
	function fuScroll(e){
		var oEvent = e || event;
		var l = oSpan.offsetLeft;
		oEvent.wheelDelta ? (oEvent.wheelDelta > 0 ? l-=iWidth : l+=iWidth) : (oEvent.detail ? l+=iWidth : l-=iWidth);
		oscroll(l)
		if(oEvent.PreventDefault){
			oEvent.PreventDefault();
		}
	}
	myEvent(oConter, 'mousewheel', fuScroll);
	myEvent(oConter, 'DOMMouseScroll', fuScroll);
	//滚动事件
	function oscroll(l){
		var j=(l)/36*12;
		if(l < 0){
			l = 0;
			j=0;
		}else if(l >=oLi.length*300){
			l =l-1200;
			j=1200-48;
		}
		if(l+1200>=oLi.length*300)
		    j=1200-48;
		var scrol = l / (oScroll.offsetWidth - oSpan.offsetWidth);
		//sMove(oSpan, 'left', Math.ceil(l));
		sMove(oSpan, 'left',j);
		sMove(oUl, 'left', '-'+l);
	}
	
	

	function td(l){
		if(l < 0){
			l = 0;
		}else if(l > oScroll.offsetWidth - oSpan.offsetWidth){
			l = oScroll.offsetWidth - oSpan.offsetWidth;
		}
		var scrol = l / (oScroll.offsetWidth - oSpan.offsetWidth);
		oSpan.style.left = l+'px';
		oUl.style.left = '-'+(oUl.offsetWidth - (oConter.offsetWidth + 0)) * scrol +'px';
	}
};
//运动框架
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
function sMove(obj, attr, iT, onEnd){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		dMove(obj, attr, iT, onEnd);
	},30);
}
function dMove(obj, attr, iT, onEnd){
	var iCur = 0;
	attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, attr)*100)) : iCur = parseInt(getStyle(obj, attr));
	var iS = (iT - iCur) / 5;
	iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);
	if(iCur == iT){
		clearInterval(obj.timer);
		if(onEnd){
			onEnd();
		}
	}else{
		if(attr == 'opacity'){
			obj.style.ficter = 'alpha(opacity:'+(iCur + iS)+')';
			obj.style.opacity = (iCur + iS) / 100;
		}else{
			obj.style[attr] = iCur + iS +'px';
		}
	}
}



function getStyle1(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	}
	else {
		return getComputedStyle(obj, false)[name];
	}
}

function move(obj, attr, iTarget) {
	clearInterval(obj.timer)
	obj.timer = setInterval(function () {
		var cur = 0;
		if (attr == 'opacity') {
			cur = Math.round(parseFloat(getStyle1(obj, attr)) * 100);
		}
		else {
			cur = parseInt(getStyle1(obj, attr));
		}
		var speed = (iTarget - cur) / 5;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (iTarget == cur) {
			clearInterval(obj.timer);
		}
		else if (attr == 'opacity') {
			obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
			obj.style.opacity = (cur + speed) / 100;
		}
		else {
			obj.style[attr] = cur + speed + 'px';
		}
	}, 30);
}  


