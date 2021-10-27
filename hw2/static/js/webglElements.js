/*
维护一个列表，列表内存储诸多图形对象,统一绘图
*/
//图元类
/*
Entity是指在一定情况下，能够采用相同变换的元素(可为Shape，也可为Entity)集合
Shape可以由诸多个Shape构成,但Shape意味着在任何情况下，Shape内的元素采用相同的变换
*/
class Shape{
	constructor(arg) {
		/*
		args:
		points->四列的数组;
		*/
		this.points=arg.points;
		this.colors=hex2RGB256(arg.colors);
		//console.log(arg.points);
		this.vertexNum=arg.points.length/3;
		this.expandVertex();
		
		this.offset=0;
		
		this.count=0;//调试
	}
	transform(arg){
		
	}
	expandColor(){
		return arrayExpand(this.colors,this.vertexNum);
	}
	expandVertex(){
		return this.points
	}
	getGeometryData(offset){
		this.offset=offset;
		return this.expandVertex();
	}
	getColorData(){
		return this.expandColor();
	}
	
	draw(arg){
		//console.log(arg.matrix)
		arg.gl.uniformMatrix4fv(arg.matrixLocation,false,arg.matrix);
		
		if(this.count==0){
			this.count++;
		}
		arg.gl.drawArrays(arg.gl.TRIANGLES,this.offset,this.vertexNum);
	}
}
class Triangle extends Shape{
	constructor(arg) {
	    super(arg);
	}
	expandVertex(){
		this.vertexNum=3;
		return new Array(this.points[0],this.points[1],this.points[2],
				this.points[3],this.points[4],this.points[5],
				this.points[6],this.points[7],this.points[8])
	}
}
class Quadrilateral extends Shape{
	constructor(arg) {
	    super(arg);
	}
	expandVertex(){
		this.vertexNum=6;
		return new Array(this.points[0],this.points[1],this.points[2],
				this.points[3],this.points[4],this.points[5],
				this.points[6],this.points[7],this.points[8],
				this.points[3],this.points[4],this.points[5],
				this.points[6],this.points[7],this.points[8],
				this.points[9],this.points[10],this.points[11]);
	}
}
class Monochromatic extends Shape{//单色的形状
	constructor(arg) {
		super(arg);
	}

}
class MonoTetrahedron extends Shape{//单色的四面体
	constructor(arg){}
}
class Entity{
	constructor(arg) {
	    this.compoments=new elementList();
		
		this.translation = [0, 0, 0];
		this.rotation = [0,0,0];
		this.scale = [1, 1, 1];
		this.matrix=glMatrix._one();

		this.objectMatrix=glMatrix._one();//物体坐标系
		
		this.refreshMatrix();
		
		this.offset=0;
	}
	refreshObjectMatrix(){
		
	}
	refreshMatrix(){
		this.matrix=glMatrix._one();
		this.matrix = glMatrix.translate(this.matrix , this.translation[0], this.translation[1], this.translation[2]);
		this.matrix = glMatrix.xRotate(this.matrix , this.rotation[0]);
		this.matrix = glMatrix.yRotate(this.matrix , this.rotation[1]);
		this.matrix = glMatrix.zRotate(this.matrix , this.rotation[2]);
		this.matrix = glMatrix.scale(this.matrix , this.scale[0], this.scale[1], this.scale[2]);
		this.matrix=  glMatrix.multiply(this.matrix ,glMatrix.inverse( this.objectMatrix));
		//console.log(this.matrix);
	}
	addComponent(elem){
		this.compoments.push(elem);
	}
	getTransformMatrix(){
		var matrix=glMatrix._one();
		matrix = glMatrix.translate(matrix, this.translation[0], this.translation[1], this.translation[2]);
		matrix = glMatrix.xRotate(matrix, this.rotation[0]);
		matrix = glMatrix.yRotate(matrix, this.rotation[1]);
		matrix = glMatrix.zRotate(matrix, this.rotation[2]);
		matrix = glMatrix.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);
		return matrix;
	}
	getGeometryData(offset){
		
		var geometryData=[];
		for(let i=0;i<this.compoments.length;++i){
			//console.log(offset,geometryData.length);
			concat(geometryData,this.compoments.get(i).getGeometryData(offset+geometryData.length/3));
		}
		
		return geometryData;
	}
	getColorData(){
		var colorData=[];
		for(let i=0;i<this.compoments.length;++i){
			concat(colorData,this.compoments.get(i).getColorData());
		}
		
		//console.log(colorData);
		return colorData;
	}
	transform(arg) {
		
	}
	draw(arg){
		for(let i=0;i<this.compoments.length;++i){
			this.refreshMatrix();
			//console.log(this.matrix);
			//console.log(arg.matrix)
			this.compoments.get(i).draw({
				gl:arg.gl,
				matrixLocation:arg.matrixLocation,
				matrix:glMatrix.multiply(arg.matrix,this.matrix),
			});
		}
	}
}
var error=0;
class Canvas{
	constructor(arg) {
		this.entities=new elementList();
		
	    var canvas=getElement(arg.canvasId);
		
		//抗锯齿
		canvas.width = canvas.clientWidth * window.devicePixelRatio;
		canvas.height = canvas.clientHeight * window.devicePixelRatio;
		
		this.gl=getGL(canvas);
		this.programObject=getProgram(this.gl,arg.vShader,arg.fShader);
		
		this.positionLocation=this.gl.getAttribLocation(this.programObject,"a_position");
		this.colorLocation=this.gl.getAttribLocation(this.programObject,"inColor");
		this.matrixLocation=this.gl.getUniformLocation(this.programObject,"u_matrix");
		
		this.positionBuffer=this.gl.createBuffer();
		this.colorBuffer=this.gl.createBuffer();
		
		this.vertexNum=0;
		
		this.translation = [0, 0, 0];
		this.rotation = [angle2Radians(40), angle2Radians(25), angle2Radians(325)];
		this.scale = [1, 1, 1];
		this.color = [Math.random(), Math.random(), Math.random(), 1];
		
		this.transformMatrix=glMatrix._one();
		this.preTransformMatrix=glMatrix._one();
		
		this.matrix=glMatrix._one();
		
	}
	setData(arg){
		//分配给对象一个offset
		//从对象获取坐标点
		var geometryData=[];
		var colorData=[];
		for(let i=0;i<this.entities.length;++i){
			var offset=geometryData.length/3;
			concat(geometryData,this.entities.get(i).getGeometryData(offset));
			concat(colorData,this.entities.get(i).getColorData());
		}
		//console.log(geometryData);
		if(geometryData.length!=colorData.length&&error==0){
			console.log(geometryData);
			console.log(colorData);
			console.log('ERROR:color 数组和geometry数组长度不相等.')
			error=1;
		}
		this.vertexNum=geometryData.length/3;
		this.passDataToMemoryGeometry({data:geometryData});
		//分配给对象一个offset
		//从对象获取颜色点
		this.passDataToMemoryColor({data:colorData});
	}
	passDataToMemory(arg){
		this.gl.bindBuffer(arg.bufferType,arg.buffer);
		this.gl.bufferData(arg.bufferType,arg.dataProcessed,arg.drawType);
	}
	passDataToMemoryGeometry(arg){
		this.passDataToMemory({
			bufferType:this.gl.ARRAY_BUFFER,
			buffer:this.positionBuffer,
			dataProcessed:new Float32Array(arg.data),
			drawType:this.gl.STATIC_DRAW
		}
		);
	}
	passDataToMemoryColor(arg){
		this.passDataToMemory({
			bufferType:this.gl.ARRAY_BUFFER,
			buffer:this.colorBuffer,
			dataProcessed:new Uint8Array(arg.data),
			drawType:this.gl.STATIC_DRAW
		}
		);
	}
	loadDataFromMemory(arg){
		this.gl.enableVertexAttribArray(arg.location);
		this.gl.bindBuffer(arg.bufferType,arg.buffer);
		this.gl.vertexAttribPointer(
					arg.location,
					arg.unitDataLength,
					arg.dataType,
					arg.normalize,
					arg.stride,
					arg.offset
		);
	}
	loadDataFromMemoryGeometry(arg){
		this.loadDataFromMemory({
			location:this.positionLocation,
			bufferType:this.gl.ARRAY_BUFFER,
			buffer:this.positionBuffer,
			unitDataLength:3,
			dataType:this.gl.FLOAT,
			normalize:false,
			stride:0,
			offset:0
			}
		);
	}
	loadDataFromMemoryColor(arg){
		this.loadDataFromMemory({
			location:this.colorLocation,
			bufferType:this.gl.ARRAY_BUFFER,
			buffer:this.colorBuffer,
			unitDataLength:3,
			dataType:this.gl.UNSIGNED_BYTE,
			normalize:true,
			stride:0,
			offset:0
		})
	}
	transform(arg){
		
	}
	addEntity(elem){
		this.entities.push(elem);
	}
	setEntity(i,elem){
		this.entities.set(i,elem);
	}
	render(){
		this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		//正面可显示
		/*
		
		this.gl.enable(this.gl.CULL_FACE);
		
		*/
		this.gl.enable(this.gl.DEPTH_TEST);
		
		this.gl.useProgram(this.programObject);
		this.loadDataFromMemoryGeometry(0);
		this.loadDataFromMemoryColor(0);
		
		//copy:...
		var left = 0;
		var right = this.gl.canvas.clientWidth*2;
		var bottom = this.gl.canvas.clientHeight*2;
		var top = 0;
		var near = 800;
		var far = -800;
		this.matrix=glMatrix._orthographic(left, right, bottom, top, near, far);
		
		this.matrix = glMatrix.translate(this.matrix , this.translation[0], this.translation[1], this.translation[2]);
		this.matrix = glMatrix.xRotate(this.matrix , this.rotation[0]);
		this.matrix = glMatrix.yRotate(this.matrix , this.rotation[1]);
		this.matrix = glMatrix.zRotate(this.matrix , this.rotation[2]);
		this.matrix = glMatrix.scale(this.matrix , this.scale[0], this.scale[1], this.scale[2]);
		
		
		//此处没有理解为什么需要转置
		
		this.matrix=glMatrix.multiply(this.matrix ,this.preTransformMatrix);
		this.matrix=glMatrix.multiply(this.matrix ,this.transformMatrix);
		
		
		this.draw();

	}
	draw(){
		var arg={
			matrix:this.matrix,
			matrixLocation:this.matrixLocation,
			gl:this.gl
		};
		for(let i=0;i<this.entities.length;++i){
			this.entities.get(i).draw(arg);
		}
	}
}
function responseSpaceP(arg) {
		return '\{' + 'x:' + arg.x + ',y:' + arg.y + ",z:" + arg.z + ",width:" + arg.width + ',color:"' + arg.color +
			'"\},';
	}

	function responseSpaceBlock(arg) {
		var x = 0,
			y = 0,
			z = 0,
			color = 0,
			width = 0;
		[x, y, z, colors, width] = [arg.x, arg.y, arg.z, arg.colors, arg.width];
		var entity = new Entity();
		entity.addComponent(new Shape({ //后
			points: [
				x + 0, y + 0, z + 0,
				x + 0, y + width, z + 0,
				x + 0, y + width, z + width,
				x + 0, y + 0, z + 0,
				x + 0, y + width, z + width,
				x + 0, y + 0, z + width
			],
			colors: colors[0]
		}))
		entity.addComponent(new Shape({ //前
			points: [
				x + width, y + 0, z + 0,
				x + width, y + width, z + 0,
				x + width, y + width, z + width,

				x + width, y + 0, z + 0,
				x + width, y + 0, z + width,
				x + width, y + width, z + width,

			],
			colors: colors[1]
		}))
		entity.addComponent(new Shape({ //左
			points: [
				x + 0, y + 0, z + 0,
				x + width, y + 0, z + 0,
				x + width, y + 0, z + width,
				x + 0, y + 0, z + 0,
				x + width, y + 0, z + width,
				x + 0, y + 0, z + width
			],
			colors: colors[2]
		}))
		entity.addComponent(new Shape({ //右
			points: [
				x + 0, y + width, z + width,
				x + width, y + width, z + width,
				x + width, y + width, z + 0,
				x + width, y + width, z + 0,
				x + 0, y + width, z + width,
				x + 0, y + width, z + 0
			],
			colors: colors[3]
		}))
		entity.addComponent(new Shape({ //上
			points: [
				x + 0, y + 0, z + width,
				x + 0, y + width, z + width,
				x + width, y + width, z + width,
				x + 0, y + 0, z + width,
				x + width, y + width, z + width,
				x + width, y + 0, z + width
			],
			colors: colors[4]
		}))
		entity.addComponent(new Shape({ //下
			points: [
				x + 0, y + 0, z + 0,
				x + 0, y + width, z + 0,
				x + width, y + width, z + 0,
				x + 0, y + 0, z + 0,
				x + width, y + width, z + 0,
				x + width, y + 0, z + 0
			],
			colors: colors[5]
		}))
		return entity;
	}

	function responseSpaceCurPosition(arg) {
		return new Shape({
			points: arg.curpoints,
			colors: arg.color
		});
	}

	function responseSpacePPosition(arg) {
		return 'new Shape({\n' +
			'points:[' + curPos2Str() +
			'],colors:' + '"' + arg.color + '"' +
			'})'
	}


	function pointerChanger(theta, curpoints, point) {
		for (let i = 0; i < curpoints.length / 3; ++i) {
			if (Math.sqrt((curpoints[i * 3 + 0] - point[0]) * (curpoints[i * 3 + 0] - point[0]) +
					(curpoints[i * 3 + 1] - point[1]) * (curpoints[i * 3 + 1] - point[1]) +
					(curpoints[i * 3 + 2] - point[2]) * (curpoints[i * 3 + 2] - point[2])) < theta) {
				return [curpoints[i * 3 + 0], curpoints[i * 3 + 1], curpoints[i * 3 + 2]]
			}
		}
		return point;
	}
	
	function generateEntityFromBlockData(data) {
		var tran = new Entity();
		for (let i = 0; i < data.length; ++i) {
	
			data[i].colors = [data[i].color, data[i].color, data[i].color, data[i].color, data[i].color, data[i].color]
			//console.log(data[i]);
			tran.addComponent(responseSpaceBlock(data[i]));
		}
		return tran;
	}
	function curPos2Str() {
		var str = ''
		console.log(curpoints);
		for (let i = 0; i < curpoints.length - 1; ++i) {
			str += curpoints[i] + ',';
			if (i % 3 == 2) {
				str += '\n';
			}
		}
		str += curpoints[curpoints.length - 1];
		return str;
	}
