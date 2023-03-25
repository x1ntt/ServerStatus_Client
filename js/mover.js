function Mover() {
	// 标记是拖曳还是点击
	var oDiv = document.getElementById('back-button');
	var mainDiv = document.getElementById('main-div');
	var disX, disY, moveX, L, T;

	let beforeX, beforeY; // 鼠标点击的坐标
	var is_clicked = false;
	
	var mousemove_fun = function(eve){
		L = eve.clientX - disX;
		T = eve.clientY - disY;
		moveX = L + 'px';
		moveY = T + 'px';
		mainDiv.style.left = moveX;
		mainDiv.style.top = moveY;
	}

	oDiv.addEventListener('click', function(e){
		if (is_clicked){
			is_clicked = false;
			oDiv.style.borderColor="black";
			document.body.removeEventListener("mousemove", mousemove_fun);
		}else{
			is_clicked = true;
			oDiv.style.borderColor="red";
			
			disX = e.clientX - mainDiv.offsetLeft;
			disY = e.clientY - mainDiv.offsetTop;
			
			document.body.addEventListener("mousemove", mousemove_fun); 
		}
	});
}