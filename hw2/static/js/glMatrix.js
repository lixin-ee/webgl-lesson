var epsilon=0.00001;//防除以0
//出于取相机维度的需求,我们将二维矩阵取为以列为优先的一维数组
class glMatrix{
	/*
	这个类当中的函数都是静态函数
	以_开头的函数的返回值是一个16元素的数组
	除了multiply以外的函数的第一个参数总是一个数组，返回给定的矩阵与这个方法所生成的矩阵的乘积
	*/
	//copy: https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-orthographic.html
	static _orthographic(left, right, bottom, top, near, far) {
	    return [
	      2 / (right - left), 0, 0, 0,
	      0, 2 / (top - bottom), 0, 0,
	      0, 0, 2 / (near - far), 0,
	 
	      (left + right) / (left - right),
	      (bottom + top) / (bottom - top),
	      (near + far) / (near - far),
	      1,
	    ];}
	static _projection(width, height, depth) {
		return [
		   2 / width, 0, 0, 0,
		   0, -2 / height, 0, 0,
		   0, 0, 2 / depth, 0,
		  -1, 1, 0, 1,
		];
	}
	
	static _one(){
		return [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1
		];
	}
	static _translate(dx,dy,dz){
		return [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			dx,dy,dz,1
		];
	}
	static _xRotate(thetaInRadians){
		var [s,c]=getSinCos(thetaInRadians);
		return this._xRotateBySinCos(s,c);
	}	
	static _yRotate(thetaInRadians){
		var [s,c]=getSinCos(thetaInRadians);
		return this._yRotateBySinCos(s,c);
	}
	static _zRotate(thetaInRadians){
		var [s,c]=getSinCos(thetaInRadians);
		return this._zRotateBySinCos(s,c);
	}
	static _scale(sx,sy,sz) {
	    return [
	      sx, 0,  0,  0,
	      0, sy,  0,  0,
	      0,  0, sz,  0,
	      0,  0,  0,  1,
	    ];
	}
	
	//copy: https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-orthographic.html
	static multiply(a, b) {
	    var a00 = a[0 * 4 + 0];
	    var a01 = a[0 * 4 + 1];
	    var a02 = a[0 * 4 + 2];
	    var a03 = a[0 * 4 + 3];
	    var a10 = a[1 * 4 + 0];
	    var a11 = a[1 * 4 + 1];
	    var a12 = a[1 * 4 + 2];
	    var a13 = a[1 * 4 + 3];
	    var a20 = a[2 * 4 + 0];
	    var a21 = a[2 * 4 + 1];
	    var a22 = a[2 * 4 + 2];
	    var a23 = a[2 * 4 + 3];
	    var a30 = a[3 * 4 + 0];
	    var a31 = a[3 * 4 + 1];
	    var a32 = a[3 * 4 + 2];
	    var a33 = a[3 * 4 + 3];
	    var b00 = b[0 * 4 + 0];
	    var b01 = b[0 * 4 + 1];
	    var b02 = b[0 * 4 + 2];
	    var b03 = b[0 * 4 + 3];
	    var b10 = b[1 * 4 + 0];
	    var b11 = b[1 * 4 + 1];
	    var b12 = b[1 * 4 + 2];
	    var b13 = b[1 * 4 + 3];
	    var b20 = b[2 * 4 + 0];
	    var b21 = b[2 * 4 + 1];
	    var b22 = b[2 * 4 + 2];
	    var b23 = b[2 * 4 + 3];
	    var b30 = b[3 * 4 + 0];
	    var b31 = b[3 * 4 + 1];
	    var b32 = b[3 * 4 + 2];
	    var b33 = b[3 * 4 + 3];
	    return [
	      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
	      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
	      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
	      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
	      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
	      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
	      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
	      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
	      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
	      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
	      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
	      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
	      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
	      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
	      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
	      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
	    ];
	  }


	static translate(matrix,dx,dy,dz){return this.multiply(matrix,this._translate(dx,dy,dz));}
	static xRotate(matrix,thetaInRadians){return this.multiply(matrix,this._xRotate(thetaInRadians));}
	static yRotate(matrix,thetaInRadians){return this.multiply(matrix,this._yRotate(thetaInRadians));}
	static zRotate(matrix,thetaInRadians){return this.multiply(matrix,this._zRotate(thetaInRadians));}
	static scale(matrix,sx,sy,sz){return this.multiply(matrix,this._scale(sx,sy,sz));}
	
	static T(matrix){
		return [
			matrix[0*4+0],matrix[1*4+0],matrix[2*4+0],matrix[3*4+0],
			matrix[0*4+1],matrix[1*4+1],matrix[2*4+1],matrix[3*4+1],
			matrix[0*4+2],matrix[1*4+2],matrix[2*4+2],matrix[3*4+2],
			matrix[0*4+3],matrix[1*4+3],matrix[2*4+3],matrix[3*4+3]
		]
	}
	
	static _inverseXRotate(thetaInRadians){
		return this._xRotate(-thetaInRadians);
	}
	
	static _inverseYRotate(thetaInRadians){
		return this._yRotate(-thetaInRadians);
	}
	
	static _inverseZRotate(thetaInRadians){
		return this._zRotate(-thetaInRadians);
	}
	static _inverseTranslate(dx,dy,dz){
		return this._translate(-dx,-dy,-dz);
	}
	static _xRotateBySinCos(sin,cos){
		return [
			1, 0, 0, 0,
			0, cos, sin, 0,
			0,-sin, cos, 0,
			0, 0, 0, 1
		];
	}
	static _yRotateBySinCos(sin,cos){
		return [
			cos, 0, -sin, 0,
			0, 1,  0, 0,
			sin, 0,  cos, 0,
			0, 0,  0, 1
		];
	}
	static _zRotateBySinCos(sin,cos){
		return [
			 cos, sin, 0, 0,
			-sin, cos, 0, 0,
			 0, 0, 1, 0,
			 0, 0, 0, 1
		];
	}
	static _rotateAnyUtilRxthetaX(ax,ay,az){//向量在3个方向的投影
		return this._xRotateBySinCos(ay/Math.sqrt(ay*ay+az*az),az/Math.sqrt(ay*ay+az*az));
	}
	static _rotateAnyUtilRythetaY(ax,ay,az){
		return this._yRotateBySinCos(-ax,Math.sqrt(ay*ay+az*az));//第二次旋转为顺时针，角度取反,正弦取反
	}
	static _inverseRotateAnyUtilRxthetaX(ax,ay,az){
		return this._xRotateBySinCos(-ay/Math.sqrt(ay*ay+az*az),az/Math.sqrt(ay*ay+az*az));
	}
	static _inverseRotateAnyUtilRythetaY(ax,ay,az){
		return this._yRotateBySinCos(ax,Math.sqrt(ay*ay+az*az));//第二次旋转为顺时针，角度取反,正弦取反
	}
	
	//任意旋转轴算法
	static _rotateAnyUtilVector(ax,ay,az,theta){//d..旋转轴向量,要求为已经单位化过的
		ay+=epsilon;
		az+=epsilon;
		var rst=this._rotateAnyUtilRxthetaX(ax,ay,az)
		rst=this.multiply(rst,this._rotateAnyUtilRythetaY(ax,ay,az));
		rst=this.multiply(rst,this._zRotate(theta));
		rst=this.multiply(rst,this._inverseRotateAnyUtilRythetaY(ax,ay,az));
		rst=this.multiply(rst,this._inverseRotateAnyUtilRxthetaX(ax,ay,az));
		return rst;
	}
	
	//含不动点的任意旋转轴算法
	static _rotateAnyUtilVectorWithFixedPoint(ax,ay,az,theta,mx,my,mz){
		var rst=this._inverseTranslate(mx,my,mz);
		
		rst=this.multiply(rst, this._rotateAnyUtilVector(ax,ay,az,theta));
		
		rst=this.multiply(rst,this._translate(mx,my,mz));

		return rst;
	}
	
	static _rotateAnyVectorWithFixedPoint(dx,dy,dz,theta,mx,my,mz){
		var norm=this.vectorNorm([dx,dy,dz]);
		var ax=dx/norm;
		var ay=dy/norm;
		var az=dz/norm;
		return this._rotateAnyUtilVectorWithFixedPoint(ax,ay,az,theta,mx,my,mz);
	}
	//向量叉乘,待改
	static _crossMultiplyVector(a,b){
		return [
			a[1]*b[2]-a[2]*b[1],
			a[2]*b[0]-a[0]*b[2],
			a[0]*b[1]-a[1]*b[0]];
	}
	
	static vectorNorm(a){
		var rst=0;
		for(let i=0;i<a.length;++i){
			rst+=a[i]*a[i];
		}
		return Math.sqrt(rst);
	}
}