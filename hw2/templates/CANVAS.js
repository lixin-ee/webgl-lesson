var canvas=getElement('mcanvas');
var gl=getGL(canvas);

function main(){
	console.log('ok');
	//console.log(scriptToString('vertexShader'));
	var programObject=getProgram(gl,'vertexShader','fragmentShader');
	startProgram(gl,programObject);
	//TODO:
	endProgram(gl);
}