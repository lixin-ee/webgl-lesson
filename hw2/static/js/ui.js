var epsilon=0.001;
function svgPostion(svg,event){
	var point = svg.createSVGPoint();
	point.x =event.pageX; 
	point.y =event.pageY;
	point=point.matrixTransform(svg.getScreenCTM().inverse());
	return [point.x,point.y]
}
function createUi(container,ui){
	var block=document.createElement('div');
	block.setAttribute('class','setter');
	var label=document.createElement('label');
	label.setAttribute('class','form-label');
	label.setAttribute('for',ui.id);
	
	var input=document.createElement('input');
	input.setAttribute('id',ui.id);
	input.setAttribute('type','range');
	input.setAttribute('min',ui.min);
	input.setAttribute('max',ui.max);
	input.setAttribute('class','form-range');
	input.setAttribute('value',(ui.min+ui.max)/2);
	
	
	label.innerText=ui.id+':'+input.value;
	
	function uiChange(){
		label.innerText=ui.id+':'+input.value;
		if(ui.responseFunction){
			ui.responseFunction(input.value);	
		}
	}
	input.addEventListener('change',uiChange)
	input.addEventListener("input",uiChange)
	
	block.appendChild(label);
	block.appendChild(input);
	container.appendChild(block);
	
	//ui.responseFunction(input.value);
	return input;
}

function bindBallTrackerUi(ui){
	/*
	<svg id="virtualTrackBallContainer" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" version="1.1" class="virtualTrackBallContainer">
		  <circle id="virtualTrackBall" cx="0" cy="0" r="1" fill="#c7c8c8" stroke="#000000" stroke-width="0"/>
		  <circle id="virtualBallTracker" cx="0" cy="0" r="0.3" fill="#a4a5a5" stroke="#000000" stroke-width="0"/>
	</svg>
	*/
	var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
	svg.setAttribute('viewBox','-1 -1 2 2');
	svg.setAttribute('class','virtualTrackBallContainer');
	svg.setAttribute('width',ui.container.offsetWidth);
	svg.setAttribute('height',ui.container.offsetHeight);
	
	var transformer=document.createElementNS('http://www.w3.org/2000/svg','g');
	transformer.setAttribute('transform','')
	
	var containerBall=document.createElementNS('http://www.w3.org/2000/svg','circle');
	containerBall.setAttribute('cx',0);
	containerBall.setAttribute('cy',0);
	containerBall.setAttribute('r',1);
	
	
	//此处应该继续做一层封装，用css控制组件的表现
	containerBall.setAttribute('fill',"#c7c8c8");
	
	var controlBall=document.createElementNS('http://www.w3.org/2000/svg','circle');
	controlBall.setAttribute('cx',0);
	controlBall.setAttribute('cy',0);
	controlBall.setAttribute('r',0.3);
	controlBall.setAttribute('fill','#a4a5a5');
	
	transformer.appendChild(containerBall);
	transformer.appendChild(controlBall);
	svg.appendChild(transformer);
	svg.appendChild(transformer);
	ui.container.appendChild(svg);
	
	var dragging=false;
	var x=0,y=0;

	var boundingClientRect=svg.getBoundingClientRect();
	var movelength=0;
	
	controlBall.addEventListener('mousedown',()=>{
		if(!dragging){
			dragging=true;
			controlBall.setAttribute('fill',"#717171");
			window.addEventListener('mousemove',(event)=>{
				if(dragging){
					[x,y]=svgPostion(svg,event);
					movelength=Math.sqrt(x*x+y*y);
					x-=0//0.5;
					if(movelength>1){
						//此处增加一个小的epsilon是因为由于浮点数精度问题有的时候会让x*x+y*y略大于1,导致闪烁
						x/=(movelength+epsilon);
						y/=(movelength+epsilon);
					}
					var z=Math.sqrt(1-x*x-y*y);
				
					controlBall.setAttribute('cx',x);
					controlBall.setAttribute('cy',y);
	
					ui.vector=glMatrix._crossMultiplyVector([0,0,1],[x,-y,z]);
					
					/*此处待改,为了完成效果，此处的原理还不对*/
					ui.vector[0] *= -1;
					ui.vector[1] *= -1;
					ui.vector[2] *= -1;
					
					ui.theta=Math.asin(glMatrix.vectorNorm(ui.vector));
					ui.mousemove(ui.vector,ui.theta);
				}
			})
			window.addEventListener('mouseup',(event)=>{
				if(dragging){
					dragging=false;
					controlBall.setAttribute('fill','#a4a5a5');
					controlBall.setAttribute('cx',0);
					controlBall.setAttribute('cy',0);
					ui.mouseup(ui.vector,ui.theta);
				}
			})
		}
	})
}
var isclose=false;
var toolbar=document.getElementById('toolButton');
toolbar.addEventListener('mousedown',()=>{
	isclose=isclose^1;
	if(isclose){
		document.getElementById('toolBar').setAttribute('class','toolBar-hidden');
	}else{
		document.getElementById('toolBar').setAttribute('class','toolBar');
	}
});