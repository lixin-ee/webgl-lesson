/*
ERROR_0:变量加载错误
ERROR_1:着色器程序编译错误
*/
//ERROR_0_0
function getElement(elemId){
	var elem=document.getElementById(elemId);
	if(!elem){
		console.log("ERROR_0_0:加载元素失败,请检查元素id拼写。");
		return null;
	}
	return elem;
}
//ERROR_0_1
function getGL(canvas){
	var gl=canvas.getContext('webgl');
	if(!gl){
		console.log('ERROR_0_1:加载canvas的webgl上下文失败,建议重启HBuilderX');
		//alert('ERROR_0:加载webgl上下文失败');
		return null;
	}
	return gl;
}
function scriptToString(id){
	return getElement(id).innerText;
}

//当报错时不会退出去
function checkCompileResult(gl,shaderObject,consoleScript){
	if (!gl.getShaderParameter(shaderObject, gl.COMPILE_STATUS)) {
	    console.log(consoleScript+'\n'+gl.getShaderInfoLog(shaderObject));
	    return false;
	}
	return true;
}
function checkLinkResult(gl,programObject,consoleScript){
	if (!gl.getProgramParameter(programObject, gl.LINK_STATUS)) {
	    console.log(consoleScript+'\n'+gl.getProgramInfoLog(programObject));
	    return false;
	}
	return true;
}
//ERROR_1_0,ERROR_1_1,ERROR_2_1
function getProgram(gl,vShader,fShader) {
    let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShaderObject, scriptToString(vShader));
    gl.shaderSource(fragmentShaderObject, scriptToString(fShader));
    gl.compileShader(vertexShaderObject);
    gl.compileShader(fragmentShaderObject);
	
    //编译异常处理
    if(!checkCompileResult(gl,vertexShaderObject,"ERROR_1_0:编译顶点着色器程序失败,看控制台得更多信息")) return ;
    if(!checkCompileResult(gl,fragmentShaderObject,"ERROR_1_1:编译片元着色器程序失败,看控制台得更多信息")) return;
    let programObject = gl.createProgram();
    //调用着色器程序
    gl.attachShader(programObject, vertexShaderObject);
    gl.attachShader(programObject, fragmentShaderObject);
	
	//链接程序
	gl.linkProgram(programObject);
	if(!checkLinkResult(gl,programObject,"ERROR_2_0:链接失败"))return ;
    return programObject;
}
