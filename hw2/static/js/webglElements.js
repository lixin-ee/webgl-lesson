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
		this.vertexNum=arg.points.length/3;
		this.expandVertex();
	}
	transform(arg){
		
	}
	expandColor(){
		return arrayExpand(this.colors,this.vertexNum);
	}
	expandVertex(){
		
	}
	getGeometryData(){
		return this.expandVertex();
	}
	getColorData(){
		return this.expandColor();
	}
}
class Triangle extends Shape{
	constructor(arg) {
	    super(arg);
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
		
		this.translation=new elementListFixLength(3);
		this.rotation=new elementListFixLength(3);
		this.scale=new elementListFixLength(3);
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
	getGeometryData(){
		
		var geometryData=[];
		for(let i=0;i<this.compoments.length;++i){
			concat(geometryData,this.compoments.get(i).getGeometryData());
		}
		
		return geometryData;
	}
	getColorData(){
		var colorData=[];
		for(let i=0;i<this.compoments.length;++i){
			concat(colorData,this.compoments.get(i).getColorData());
		}
		return colorData;
	}
	transform(arg) {
		
	}
}
class Canvas{
	constructor(arg) {
		this.entities=new elementList();
		
	    var canvas=getElement(arg.canvasId);
		
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
		
	}
	setData(arg){
		//分配给对象一个offset
		//从对象获取坐标点
		var geometryData=[];
		var colorData=[];
		for(let i=0;i<this.entities.length;++i){
			concat(geometryData,this.entities.get(i).getGeometryData());
			concat(colorData,this.entities.get(i).getColorData());
		}
		if(geometryData.length!=colorData.length){
			console.log(geometryData);
			console.log(colorData);
			console.log('ERROR:color 数组和geometry数组长度不相等.')
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
		var right = this.gl.canvas.clientWidth;
		var bottom = this.gl.canvas.clientHeight;
		var top = 0;
		var near = 400;
		var far = -400;
		var matrix=glMatrix._orthographic(left, right, bottom, top, near, far);
		
		matrix = glMatrix.translate(matrix, this.translation[0], this.translation[1], this.translation[2]);
		matrix = glMatrix.xRotate(matrix, this.rotation[0]);
		matrix = glMatrix.yRotate(matrix, this.rotation[1]);
		matrix = glMatrix.zRotate(matrix, this.rotation[2]);
		matrix = glMatrix.scale(matrix, this.scale[0], this.scale[1], this.scale[2]);
		
		matrix=glMatrix.multiply(matrix,this.transformMatrix);
		matrix=glMatrix.multiply(matrix,this.preTransformMatrix);
		
		this.gl.uniformMatrix4fv(this.matrixLocation,false,matrix);
		this.gl.drawArrays(this.gl.TRIANGLES,0,this.vertexNum);
	}
}