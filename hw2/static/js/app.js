function main() {
	var xRotate=0;
	var drawer = new Canvas({
		canvasId: 'mcanvas',
		vShader: 'vertexShader2d',
		fShader: 'fragmentShader2d'
	});
	var triangle1=new Triangle({
		points:[300,100,0,
				0,100,0,
				100,200,0],
		colors:"#ffaa7f"
	});
	var triangle2=new Triangle({
		points:[300,100,0,
				0,100,0,
				100,200,0],
		colors:"#ffaa00"
	});
	var rectangle1=new Quadrilateral({
		points:[
			0,0,0,
			100,0,0,
			0,100,0,
			100,100,0
		],
		colors:"#55aa7f"
	})
	var rectangle1=new Quadrilateral({
		points:[
			0,0,0,
			100,0,0,
			0,100,0,
			100,100,0
		],
		colors:"#55aa7f"
	})
	var rectangle2=new Quadrilateral({
		points:[
			0,0,0,
			100,0,0,
			0,0,100,
			100,0,100
		],
		colors:"#55aa00"
	});
	var rectangle3=new Quadrilateral({
		points:[
			100,0,0,
			100,0,100,
			100,100,0,
			100,100,100
		],
		colors:"#00aa7f"
	});
	var rectangle4=new Quadrilateral({
		points:[
			0,100,100,
			0,100,0,
			100,100,100,
			100,100,0
		],
		colors:"#00ff00"
	});
	var rectangle5=new Quadrilateral({
		points:[
			0,0,0,
			0,100,0,
			0,100,100,
			0,0,100
		],
		colors:"#00ff7f"
	});
	var entity=new Entity();
	entity.addComponent(rectangle1);
	entity.addComponent(rectangle2);
	entity.addComponent(rectangle3);
	entity.addComponent(rectangle4);
	drawer.addEntity(entity);
	drawer.setData();
	
	//设置ui
	var sidebar=document.getElementById('sidebar');
	var xSetter=createUi(sidebar,{id:'x',min:0,max:400,responseFunction:(value)=>{drawer.translation[0]=value}});
	var ySetter=createUi(sidebar,{id:'y',min:0,max:400,responseFunction:(value)=>{drawer.translation[1]=value}});
	var zSetter=createUi(sidebar,{id:'z',min:0,max:400,responseFunction:(value)=>{drawer.translation[2]=value}});
	var xRotationSetter=createUi(sidebar,{id:'xRotation',min:0,max:360,responseFunction:(value)=>{drawer.rotation[0]=angle2Radians(value)}});
	var yRotationSetter=createUi(sidebar,{id:'yRotation',min:0,max:360,responseFunction:(value)=>{drawer.rotation[1]=angle2Radians(value)}});
	var zRotationSetter=createUi(sidebar,{id:'zRotation',min:0,max:360,responseFunction:(value)=>{drawer.rotation[2]=angle2Radians(value)}});
	var xScalerSetter=createUi(sidebar,{id:'scalerX',min:1,max:100,responseFunction:(value)=>{drawer.scale[0]=(value-0.9)/100}});
	var yScalerSetter=createUi(sidebar,{id:'scalerY',min:1,max:100,responseFunction:(value)=>{drawer.scale[1]=(value-0.9)/100}});
	var zScalerSetter=createUi(sidebar,{id:'scalerZ',min:1,max:100,responseFunction:(value)=>{drawer.scale[2]=(value-0.9)/100}});
	//使用右侧菜单的值初始化世界坐标系
	drawer.translation=[xSetter.value,ySetter.value,zSetter.value];
	drawer.rotation=[angle2Radians(xRotationSetter.value),angle2Radians(yRotationSetter.value),angle2Radians(zRotationSetter.value)];
	drawer.scale=[(xScalerSetter.value-0.9)/100,(yScalerSetter.value-0.9)/100,(zScalerSetter.value-0.9)/100];
	
	
	function test(){
		setInterval(()=>{
			drawer.render();
		},5)
	}
	test()
	
}

/*
思路:
初始化阶段:Canvas类根据每一个shape中的值setGeometry,setColors,将所有的数据整合一次性传给
内存。然后,为每一个shape分配一个offset和stride
在渲染时,逐层获得转置矩阵做乘积,由shape传给着色器程序

*/
