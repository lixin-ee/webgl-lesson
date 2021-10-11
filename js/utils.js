function globalmove() {
    var box = document.getElementById("gb");
    return box.checked;
}
function getProgram(webgl, VSHADER = "vertex-shader-2d", FSHADER = "fragment-shader-2d") {
    let vertexShaderObject = webgl.createShader(webgl.VERTEX_SHADER);
    let fragmentShaderObject = webgl.createShader(webgl.FRAGMENT_SHADER);
    webgl.shaderSource(vertexShaderObject, scriptToString("vertex-shader-2d"));
    webgl.shaderSource(fragmentShaderObject, scriptToString("fragment-shader-2d"));
    webgl.compileShader(vertexShaderObject);
    webgl.compileShader(fragmentShaderObject);
    //编译异常处理
    if (!webgl.getShaderParameter(vertexShaderObject, webgl.COMPILE_STATUS)) {
        console.log(webgl.getShaderInfoLog(vertexShaderObject));
        alert("ERROR_1:编译顶点着色器程序失败,看控制台得更多信息");
        return;
    }
    if (!webgl.getShaderParameter(fragmentShaderObject, webgl.COMPILE_STATUS)) {
        console.log(webgl.getShaderInfoLog(fragmentShaderObject));
        alert("ERROR_2:编译片元着色器程序失败,看控制台得更多信息");
        return;
    }
    let programObject = webgl.createProgram();
    //调用着色器程序
    webgl.attachShader(programObject, vertexShaderObject);
    webgl.attachShader(programObject, fragmentShaderObject);
    return programObject;
}

function useProgram(programObject) {
    //链接
    linkProgram(programObject);

    //使用程序
    webgl.useProgram(programObject);
    return programObject;
}

function clearColor(r, g, b, a) {
    webgl.clearColor(r, g, b, a);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
}

function linkProgram(webgl, programObject) {
    webgl.linkProgram(programObject);
    if (!webgl.getProgramParameter(programObject, webgl.LINK_STATUS)) {
        console.log(webgl.getProgramInfoLog(programObject));
        alert("ERROR_3:程序链接失败");
        return;
    }
    return programObject;
}

//判断点是否在三角形内部
function distance(x1, y1, x2, y2) {

    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function haron(x1, y1, x2, y2, x3, y3) {
    let a = distance(x1, y1, x2, y2);
    let b = distance(x1, y1, x3, y3);
    let c = distance(x3, y3, x2, y2);
    let p = (a + b + c) / 2;

    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}
/*
inTriangle:
用于判断物体是否被选中，由于物体为2d且都为三角形构成，
所以采用鼠标落点是否在三角形内部判断物体是否被选中。
判断点A是否在三角形内部:
三角形每两个点与A做三角形计算面积，和为X
若X>三角形面积之和则点在三角形外部，否则在内部。

*/
function floatBigger(a, b, f) { //return a-f>b or not with 
    return a > b + f;
}

function inTriangle(x1, y1, x2, y2, x3, y3, x, y) { //x1,x2,x3代表三角形三个顶点，x为待判断的点
    let s = haron(x1, y1, x2, y2, x3, y3); //三角形面积
    let s1 = haron(x1, y1, x2, y2, x, y);
    let s2 = haron(x1, y1, x, y, x2, y3);
    let s3 = haron(x, y, x2, y2, x2, y3);

    return !(floatBigger(s1 + s2 + s3, s, EPS));
}



function inside(mode) {
    function insideByTriangle(x, y, data) { //data的列数为2
        for (let i = 0; i < data.length; ++i) {
            if (data[i] > 1 || data[i] < -1) {
                console.log(data[i]);
            }
        }

        for (let i = 0; i < data.length; i = i + 9) {
            console.log(data[i], data[i + 1])
            if (inTriangle(data[i], data[i + 1],
                    data[i + 3], data[i + 4],
                    data[i + 6], data[i + 7],
                    x, y)) {
                console.log(data[i], data[i + 1], data[i + 3], data[i + 4], data[i + 6], data[i + 7])
                return true;
            }
        }
        return false;
    }

    function insideByColor(canvas, x, y) {
        /*var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
        gl.readPixels(x, y, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        console.log(pixels); // Uint8Array
        return true;*/
        var ctx = canvas.getContext('2d');
        var ad = ctx.getImageData(x, y, 1, 1).data;
        console.log(ad);
        return true;
    }
    if (mode == 0) { //三角形内点
        return insideByTriangle;
    } else { //颜色
        return insideByColor;
    }
}
function addParadict(data, pre_data) {
    let i = 0;
    let dataCount = 0;
    while (i < data.length) {

        if (dataCount == 2) { //不能够使用取余的方法，要排除下标为0的情况
            pre_data.push(1);
            dataCount = 0;

        } else {
            pre_data.push(data[i] / 5);
            ++i;
            ++dataCount;
        }
    }
    pre_data.push(1);
}
function setGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(data),
        gl.STATIC_DRAW);
}

function setColors(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(colorData),
        gl.STATIC_DRAW);
}

function inpoly(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0],
        y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function toone(){
    for(let i=0;i<5;++i){
		dt[i][0]=0;
		dt[i][1]=0;
	}
}

function getPoint(d, i) {
    return [d[2 * i], d[2 * i + 1]];
}
var pre_data = new Array();


function getElementOfMatrix(m, cols, i, j) {
    return m[cols * i + j];
}

function setElementOfMatrix(m, cols, i, j, value) {
    m[cols * i + j] = value;
    return m;
}

function multiplyMatrix(a1, b1, rolsA) {


    let colsA = a1.length / rolsA;
    let rolsB = colsA;
    let colsB = b1.length / rolsB;
    var rst = new Array(rolsA * colsB);
    for (let i = 0; i < rolsA; ++i) {
        for (let j = 0; j < colsB; ++j) {
            setElementOfMatrix(rst, colsB, i, j, 0);
            for (let k = 0; k < colsA; ++k) {
                setElementOfMatrix(rst, colsB, i, j,
                    getElementOfMatrix(rst, colsB, i, j) +
                    getElementOfMatrix(a1, colsA, i, k) *
                    getElementOfMatrix(b1, colsB, k, j))
            }
        }
    }

    return rst;
}

function T(a1, colsA) {
    var rolsA = a1.length / colsA;
    var rst = new Array(a1.length);
    for (let i = 0; i < colsA; ++i) {
        for (let j = 0; j < rolsA; ++j) {
            setElementOfMatrix(rst, rolsA, i, j, //转置行列数互换
                getElementOfMatrix(a1, colsA, j, i));
        }
    }
    return rst;
}

function scriptToString(scriptID) {
    var script = document.getElementById(scriptID);
    if (script == null) {
        return "";
    } else {
        return script.textContent || script.innerText;
    }
}
