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
	
	svg.appendChild(containerBall);
	svg.appendChild(controlBall);
	ui.container.appendChild(svg);
	
	var dragging=false;
	var boundingClientRect=svg.getBoundingClientRect();
	var movelength=0;
	controlBall.addEventListener('mousedown',()=>{
		if(!dragging){
			dragging=true;
			window.addEventListener('mousemove',(event)=>{
				if(dragging){
					//console.log(boundingClientRect);
					ui.x=2*(event.clientX-boundingClientRect.left)/boundingClientRect.width-1;
					ui.y=2*(event.clientY-boundingClientRect.top)/boundingClientRect.height-1;
					movelength=Math.sqrt(ui.x*ui.x+ui.y*ui.y);
					if(movelength>1){
						controlBall.setAttribute('cx',ui.x/movelength);
						controlBall.setAttribute('cy',ui.y/movelength);
					}else{
						controlBall.setAttribute('cx',ui.x);
						controlBall.setAttribute('cy',ui.y);
					}
				}
			})
			window.addEventListener('mouseup',(event)=>{
				if(dragging){
					dragging=false;
					controlBall.setAttribute('cx',0);
					controlBall.setAttribute('cy',0);
				}
			})
		}
	})
}
