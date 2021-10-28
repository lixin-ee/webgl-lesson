function main() {
	var xRotate = 0;
	var drawer = new Canvas({
		canvasId: 'mcanvas',
		vShader: 'vertexShader2d',
		fShader: 'fragmentShader2d'
	});
	
	var tranEntity = new Entity();
	tranEntity.addComponent(new Quadrilateral({
		points: [
			0, 0, 0,
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		],
		colors: "#55aa7f"
	}))


	var arrow = new Entity();
	arrow.addComponent(new Triangle({
		points: [
			50, 200, 0,
			200, 200, 0,
			125, 350, 0,
		],
		colors: "#ff0000"
	}));

	arrow.addComponent(new Quadrilateral({
		points: [
			100, 100, 0,
			100, 200, 0,
			150, 100, 0,
			150, 200, 0
		],
		colors: "#000000"
	}));

	arrow.addComponent(responseSpaceBlock({x:125,y:350,z:0,width:300+10,colors:["#ff0000","#ff0000","#ff0000","#ff0000","#ff0000","#ff0000"]}))
	drawer.addEntity(arrow);
	drawer.addEntity(tranEntity);
	

	drawer.addEntity(dog);
	
	var ground=new Entity();
	ground.addComponent(responseSpaceBlock({x:-5005,y:1550,z:-5000,width:30000,colors:["#aaaa00","#ffaa00","#ffff00","#55aa00","#aaff7f","#5500ff"]}))
	drawer.addEntity(ground);

	//drawer.addEntity(tt);

	//方法1:取点器，可以使用但比较麻烦
	//drawer.addEntity(entity);

	//方法2堆格子

	


	//设置ui
	var sidebar = document.getElementById('sidebar');
	var xSetter = createUi(sidebar, {
		id: 'x',
		min: 0,
		max: 400,
		responseFunction: (value) => {
			drawer.translation[0] = value
		}
	});
	var ySetter = createUi(sidebar, {
		id: 'y',
		min: 0,
		max: 400,
		responseFunction: (value) => {
			drawer.translation[1] = value
		}
	});
	var zSetter = createUi(sidebar, {
		id: 'z',
		min: 0,
		max: 400,
		responseFunction: (value) => {
			drawer.translation[2] = value
		}
	});
	var xScalerSetter = createUi(sidebar, {
		id: 'scalerX',
		min: 8,
		max: 8,
		responseFunction: (value) => {
			drawer.scale[0] = (value - 0.9) / 100
		}
	});
	var yScalerSetter = createUi(sidebar, {
		id: 'scalerY',
		min: 8,
		max: 8,
		responseFunction: (value) => {
			drawer.scale[1] = (value - 0.9) / 100
		}
	});
	var zScalerSetter = createUi(sidebar, {
		id: 'scalerZ',
		min: 8,
		max: 8,
		responseFunction: (value) => {
			drawer.scale[2] = (value - 0.9) / 100
		}
	});
	var xRotationSetter = createUi(sidebar, {
		id: 'xRotation',
		min: 0,
		max: 360,
		responseFunction: (value) => {
			drawer.rotation[0] = angle2Radians(value)
		}
	});
	var yRotationSetter = createUi(sidebar, {
		id: 'yRotation',
		min: 0,
		max: 360,
		responseFunction: (value) => {
			drawer.rotation[1] = angle2Radians(value)
		}
	});
	var zRotationSetter = createUi(sidebar, {
		id: 'zRotation',
		min: 0,
		max: 360,
		responseFunction: (value) => {
			drawer.rotation[2] = angle2Radians(value)
		}
	});

	//使用右侧菜单的值初始化世界坐标系
	drawer.translation = [xSetter.value, ySetter.value, zSetter.value];
	drawer.rotation = [angle2Radians(xRotationSetter.value), angle2Radians(yRotationSetter.value), angle2Radians(
		zRotationSetter.value)];
	drawer.scale = [(xScalerSetter.value - 0.9) / 100, (yScalerSetter.value - 0.9) / 100, (zScalerSetter.value - 0.9) /
		100
	];

	//绑定虚拟跟踪球,

	function mousemove(vector, theta) {
		drawer.preTransformMatrix = glMatrix._rotateAnyVectorWithFixedPoint(-vector[0], vector[1], vector[2], theta, 0,
			0, 0);
		//console.log(drawer.preTransformMatrix);
	}

	function mouseup(vector, theta) {
		//此处调换顺序是为了使转置操作正确，不过为什么需要转置还没搞清楚
		drawer.transformMatrix = glMatrix.multiply(drawer.preTransformMatrix, drawer.transformMatrix);
		drawer.preTransformMatrix = glMatrix._one();
	}
	var controlBallContainer = document.getElementById('toolBar');
	var controlBall = {
		x: 0,
		y: 0,
		container: controlBallContainer,
		mouseup: mouseup,
		mousemove: mousemove
	};
	bindBallTrackerUi(controlBall);


	var pressed = false;
	var head = arrow.compoments.get(1).points;
	var headR = glMatrix.multiply(glMatrix.T([head[6], head[7], head[8], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), drawer
		.matrix);

	var p = arrow.compoments.get(0).points;
	var tran = glMatrix.T([p[6], p[7], p[8], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	var newp = glMatrix.multiply(tran, glMatrix.T(arrow.matrix));
	var curpoints = []
	var curPointNum = 0;


	var step = 200;
	//绑定不能放里面，否则多次绑定
	window.addEventListener('keydown', (event) => {
		if (true) {
			//console.log(headR[0],headR[1*4+0],headR[2*4+0]);
			var newpoint = [newp[0], newp[4], newp[8]];
			newpoint = pointerChanger(100, curpoints, newpoint);
			document.getElementById('getPosition').innerHTML = newpoint[0] + ',' + newpoint[1] + ',' + newpoint[
				2]
			if (event.keyCode == 65) { //A,左
				arrow.translation[0] -= step;
			};

			if (event.keyCode == 68) { //D右
				arrow.translation[0] += step;
			}

			if (event.keyCode == 87) { //W上
				arrow.translation[1] -= step;
			}

			if (event.keyCode == 83) { //S下
				arrow.translation[1] += step;
			}

			if (event.keyCode == 38) { //up前
				arrow.translation[2] += step;
			}

			if (event.keyCode == 40) { //down后
				arrow.translation[2] -= step;
			}
			if (event.keyCode == 81) { //Q绕y轴旋转
				arrow.rotation[1] += 0.1;
			}
			if (event.keyCode == 69) { //E后
				arrow.rotation[1] -= 0.1;
			}
			if (event.keyCode == 32) { //space,记录点的数据
				curPointNum++;
				document.getElementById('cur-point-num').innerText = '' + curPointNum % 3 + ',' + curPointNum;

				curpoints.push(newpoint[0], newpoint[1], newpoint[2]);
				//event.keyCode == 13 
				if (curPointNum != 0 && (curPointNum % 3 == 0)) { //enter
					var p = document.createElement('p');
					var color = document.getElementById('colorPicker').value;
					p.innerText = responseSpaceP({
						x: newpoint[0],
						y: newpoint[1],
						z: newpoint[2],
						width: step,
						color: color
					})
					document.getElementById('sidebar1').appendChild(p);
					//console.log(curpoints)
					drawer.addEntity(responseSpaceBlock({
						x: newpoint[0],
						y: newpoint[1],
						z: newpoint[2],
						width: step,
						colors: [color, color, color, color, color, color]
					}));
				}
			}
			if (event.keyCode == 100) { //space,记录点的数据
				curPointNum++;
				document.getElementById('cur-point-num').innerText = '' + curPointNum % 3 + ',' + curPointNum;

				curpoints.push(newpoint[0], newpoint[1], newpoint[2]);
				//event.keyCode == 13 
				if (curPointNum != 0 && (curPointNum % 3 == 0)) { //enter

					//console.log(curpoints)
					for (let i = 0; i < 10; ++i) {
						var p = document.createElement('p');
						var color = document.getElementById('colorPicker').value;
						p.innerText = responseSpaceP({
							x: newpoint[0],
							y: newpoint[1],
							z: newpoint[2] + i * step,
							width: step,
							color: color
						})
						document.getElementById('sidebar1').appendChild(p);
						drawer.addEntity(responseSpaceBlock({
							x: newpoint[0],
							y: newpoint[1],
							z: newpoint[2] + i * step,
							width: step,
							colors: [color, color, color, color, color, color]
						}));
					}
				}
			}
			if (event.keyCode == 101) { //space,记录点的数据
				curPointNum++;
				document.getElementById('cur-point-num').innerText = '' + curPointNum % 3 + ',' + curPointNum;

				curpoints.push(newpoint[0], newpoint[1], newpoint[2]);
				//event.keyCode == 13 
				if (curPointNum != 0 && (curPointNum % 3 == 0)) { //enter

					//console.log(curpoints)
					for (let i = 0; i < 5; ++i) {
						var p = document.createElement('p');
						var color = document.getElementById('colorPicker').value;
						p.innerText = responseSpaceP({
							x: newpoint[0],
							y: newpoint[1] + i * step,
							z: newpoint[2],
							width: step,
							color: color
						})
						document.getElementById('sidebar1').appendChild(p);
						drawer.addEntity(responseSpaceBlock({
							x: newpoint[0],
							y: newpoint[1] + i * step,
							z: newpoint[2],
							width: step,
							colors: [color, color, color, color, color, color]
						}));
					}
				}
			}

			if (event.keyCode == 97) { //1,世界坐标系旋转y轴
				drawer.rotation[1] += 0.5;
			}
			if (event.keyCode == 99) { //3,世界坐标系旋转y轴
				drawer.rotation[1] -= 0.5;
			}
			if(event.keyCode==74){//左转J
				dog.turnDirection(0.1);
			}
			if(event.keyCode==76){//右转L
				dog.turnDirection(-0.1);
			}
			if(event.keyCode==73){//前进I
				dog.moveforward(200);
			}
			if(event.keyCode==75){//后退K
				dog.movebackward(200);
			}
			if(event.keyCode==85){//翻转U
				dog.turnside(Math.PI)
			}
			
			if(event.keyCode==79){//后翻滚o
				var iterations = 0;
				var maxIteration=10
				var interval = setInterval(foo, 10);
				function foo() {
					iterations++;
					dog.turnside(Math.PI*2/maxIteration);
					if (iterations >= maxIteration)
						clearInterval(interval);
				}
			}
			if(event.keyCode==80){//前翻滚p
				var iterations = 0;
				var maxIteration=10
				var interval = setInterval(foo, 10);
				function foo() {
					iterations++;
					dog.turnside(-Math.PI*2/maxIteration);
					
					if (iterations >= maxIteration)
						clearInterval(interval);
				}
			}
			/*
			注明:平移变换可交换
			*/
		   //注意，这里使用的是webgl原本的坐标系(因为要相对于屏幕变换，要将drawer本身坐标系变换到默认-1，1坐标系)
		   //注意,webgl始终是z轴朝向的正视投影,所以z方向变化看不到
		   var screenR=[0,0,0];
			if(event.keyCode==82){//前移	R
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._translate(0,0,0.2))
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==89){//后移Y

				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._translate(0,0,-0.2))
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==84){//上移T
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._translate(0,-0.2,0))
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==71){//下移G
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._translate(0,0.2,0))
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==70){//左移F
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._translate(0.2,0,0))
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==72){//右移H
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._translate(-0.2,0,0))
				
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			
			if(event.keyCode==86){//绕X转V
				screenR[0]+=0.1;
				//console.log(drawer.matrix)
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._xRotate(screenR[0]))
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==66){//绕Y转B
				screenR[1]+=0.1;	
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._yRotate(screenR[1]))
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			if(event.keyCode==78){//绕Z转N
				screenR[2]+=0.1;
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix.inverse(drawer.matrix));
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,glMatrix._zRotate(screenR[2]))
				dog.objectMatrix=glMatrix.multiply(dog.objectMatrix,drawer.matrix);
			}
			
			
			newp = glMatrix.multiply(tran, glMatrix.T(arrow.matrix));

		}
	})

	function test() {
		setInterval(() => {

			drawer.setData();
			drawer.render();
			//head=arrow.compoments.get(1).points;
			headR = glMatrix.multiply(glMatrix.T([head[6], head[7], head[8], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0
			]), drawer.matrix);
			if (pressed) {
				//console.log(arrow)
			}
		}, 5)
	}
	test()

}

/*
思路:
初始化阶段:Canvas类根据每一个shape中的值setGeometry,setColors,将所有的数据整合一次性传给
内存。然后,为每一个shape分配一个offset和stride
在渲染时,逐层获得转置矩阵做乘积,由shape传给着色器程序

*/
