"use strict";
var test = 0;
var EPS = 0.00001;
var matrix = null;
var now_data = [];
var pos = [];
var index = -1;
var dt = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
];
var dragging = false;

//颜色
var RGB = [
    [0, 0, 0],
    [100 / 255, 200 / 255, 20 / 255],
    [200 / 255, 100 / 255, 10 / 255],
    [49 / 255, 229 / 255, 33 / 255],
    [100 / 255, 20 / 255, 30 / 255],
    [35 / 255, 200 / 255, 150 / 255],
    [25 / 255, 150 / 255, 100 / 255],
    [250 / 255, 10 / 255, 100 / 255]
]
var colorData = [
    //tail
    RGB[1][0], RGB[1][1], RGB[1][2], 1,
    RGB[1][0], RGB[1][1], RGB[1][2], 1,
    RGB[1][0], RGB[1][1], RGB[1][2], 1,
    //body
    RGB[2][0], RGB[2][1], RGB[2][2], 1,
    RGB[2][0], RGB[2][1], RGB[2][2], 1,
    RGB[2][0], RGB[2][1], RGB[2][2], 1,
    RGB[2][0], RGB[2][1], RGB[2][2], 1,
    RGB[2][0], RGB[2][1], RGB[2][2], 1,
    RGB[2][0], RGB[2][1], RGB[2][2], 1,
    //head
    RGB[3][0], RGB[3][1], RGB[3][2], 1,
    RGB[3][0], RGB[3][1], RGB[3][2], 1,
    RGB[3][0], RGB[3][1], RGB[3][2], 1,
    RGB[4][0], RGB[4][1], RGB[4][2], 1,
    RGB[4][0], RGB[4][1], RGB[4][2], 1,
    RGB[4][0], RGB[4][1], RGB[4][2], 1,
    RGB[4][0], RGB[4][1], RGB[4][2], 1,
    RGB[4][0], RGB[4][1], RGB[4][2], 1,
    RGB[4][0], RGB[4][1], RGB[4][2], 1,
    RGB[5][0], RGB[5][1], RGB[5][2], 1,
    RGB[5][0], RGB[5][1], RGB[5][2], 1,
    RGB[5][0], RGB[5][1], RGB[5][2], 1,
    RGB[5][0], RGB[5][1], RGB[5][2], 1,
    RGB[5][0], RGB[5][1], RGB[5][2], 1,
    RGB[5][0], RGB[5][1], RGB[5][2], 1,
    RGB[6][0], RGB[6][1], RGB[6][2], 1,
    RGB[6][0], RGB[6][1], RGB[6][2], 1,
    RGB[6][0], RGB[6][1], RGB[6][2], 1,
    //left
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    //right 
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,
    RGB[7][0], RGB[7][1], RGB[7][2], 1,

]
var data = [
    //tail
    0, 5,
    10, 5,
    10, 10,
    //body
    10, 5,
    10, 15,
    40, 15,
    10, 5,
    40, 5,
    40, 15,
    //head
    40, 3,
    37, 0,
    40, 0,
    40, 0,
    40, 15,
    48, 15,
    40, 0,
    48, 0,
    48, 15,
    44, 3,
    44, 5,
    46, 5,
    44, 3,
    46, 3,
    46, 5,
    44, 12,
    48, 12,
    48, 14,
    //left
    10, 15,
    10, 20,
    15, 15,
    15, 15,
    10, 15,
    15, 20,
    //right
    35, 15,
    35, 20,
    40, 15,
    35, 15,
    40, 15,
    40, 20,
]



//addParadict(data, pre_data);



function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    //获取canvas,gl
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    /*
    1.找到变换矩阵
    2.记录变换矩阵
    3.做预先变换，然后用haron算法。ok
    */
    /*
    鼠标按下与canvas元素绑定，鼠标移动和鼠标抬起与主窗口绑定:
    html元素访问频率较慢，移动鼠标会卡。
    */
    canvas.addEventListener('mousedown',
        (e) => {
            pos[0] = e.clientX;
            pos[1] = e.clientY;

            //console.log(pos, [getPoint(now_data, 3), getPoint(now_data, 4), getPoint(now_data, 5), getPoint(now_data, 7)]);
            //console.log(inpoly(pos, [getPoint(now_data, 3), getPoint(now_data, 4), getPoint(now_data, 5), getPoint(now_data, 7)]));
            if (inpoly(pos, [getPoint(now_data, 0), getPoint(now_data, 1), getPoint(now_data, 2)])) {
                index = 0;
            }
            if (inpoly(pos, [getPoint(now_data, 3), getPoint(now_data, 4), getPoint(now_data, 5), getPoint(now_data, 7)])) {
                index = 1;
            }
            if (inpoly(pos, [getPoint(now_data, 9), getPoint(now_data, 10), getPoint(now_data, 11), getPoint(now_data, 13), getPoint(now_data, 14), getPoint(now_data, 16)])) {
                index = 2;
            }
            if (inpoly(pos, [getPoint(now_data, 27), getPoint(now_data, 28), getPoint(now_data, 29)]) || inpoly(pos, [getPoint(now_data, 30), getPoint(now_data, 31), getPoint(now_data, 32)])) {
                index = 3;
            }
            if (inpoly(pos, [getPoint(now_data, 33), getPoint(now_data, 34), getPoint(now_data, 35)]) || inpoly(pos, [getPoint(now_data, 36), getPoint(now_data, 37), getPoint(now_data, 38)])) {
                index = 4;
            }
            if (index >= 0) {
                dragging = true;
            }
            //console.log('mousedown');
            window.addEventListener('mousemove', (e) => {
                if (dragging) {
                    if (globalmove()) {
                        translation[0] += e.clientX - pos[0];
                        translation[1] += e.clientY - pos[1];
                    } else {
                        dt[index][0] += e.clientX - pos[0];
                        dt[index][1] += e.clientY - pos[1];
                        //console.log(dt[index],pos);
                    }
                    pos[0] = e.clientX;
                    pos[1] = e.clientY;
                }
            })
            window.addEventListener('mouseup', (e) => {
                if (dragging) {
                    index = -1;
                    dragging = false;
                }
            })
        }
    )
    if (!gl) {
        return;
    }

    // setup GLSL program
    /*
    生成程序的代码：
    可以使用webglUtils.createProgramFromScripts中的函数，但此处将过程实现了。
    生成程序的一般过程:
    1.得到字符串形式的着色器程序(在HTML中写script标签，用函数将标签内容提取成字符串)
    2.创建着色器程序在JS中的对象,与1步得到的着色器程序绑定
    3.编译着色器程序
    4.创建应用程序
    5.将应用程序与着色器程序绑定
    6.对应用程序做链接
    [*]在3和6步应该做异常处理
    */
    /*
		使用应用程序进行绘图
		可以使用gl.getAttribLocation+gl[1-4]fv来做
		或者:
		0.注册程序接口bindAttribLocation()
		1.createBuffer()创建缓冲区指针
		2.将缓冲区指针与特定缓冲区绑定如ARRAY_BUFFER,bindBuffer()
		3.分配内存bufferData(),可以将顶点数据与颜色数据放在一起，通过偏差来确定具体项
		4.使用vertexAttribLocation将内容取到顶点缓冲区
		5.drawArrays(webgl.TRIANGLES,...,...)
		
		6.在顶点着色器中定义varing关键字的变量与片元着色器对接。在顶点着色器程序中的main下向
		varing开头的变量传递值
		[*]将1-6封装成绘图函数，使用drawScene按时钟调用。使得对于位置的改变程序能够实时应对。
    */
    var program = linkProgram(gl, getProgram(gl, "vertex-shader-2d", "fragment-shader-2d"))


    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getAttribLocation(program, "a_color");
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");


    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);


    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    setColors(gl);

    var translation = [400, 300];
    var angleInRadians = 0;
    var scale = [5, 5];

    fresh();


    webglLessonsUI.setupSlider("#x", {
        value: translation[0],
        slide: updatePosition(0),
        max: gl.canvas.clientWidth
    });
    webglLessonsUI.setupSlider("#y", {
        value: translation[1],
        slide: updatePosition(1),
        max: gl.canvas.clientHeight
    });
    webglLessonsUI.setupSlider("#angle", {
        slide: updateAngle,
        max: 360
    });
    webglLessonsUI.setupSlider("#scaleX", {
        value: scale[0],
        slide: updateScale(0),
        min: -10,
        max: 10,
        step: 0.01,
        precision: 2
    });
    webglLessonsUI.setupSlider("#scaleY", {
        value: scale[1],
        slide: updateScale(1),
        min: -10,
        max: 10,
        step: 0.01,
        precision: 2
    });

    function updatePosition(index) {
        return function (event, ui) {
            translation[index] = ui.value;
        };
    }

    function updateAngle(event, ui) {
        var angleInDegrees = 360 - ui.value;
        angleInRadians = angleInDegrees * Math.PI / 180;
    }

    function updateScale(index) {
        return function (event, ui) {
            scale[index] = ui.value;
        };
    }

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);


        gl.enableVertexAttribArray(colorLocation);


        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);


        var size = 4;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(
            colorLocation, size, type, normalize, stride, offset);
        var matrix = m3.translation(-25, -8);
        matrix = m3.scale(matrix, scale[0], scale[1]);
        matrix = m3.rotate(matrix, angleInRadians);
        matrix = m3.translate(matrix, translation[0], translation[1]);
        drawTail(matrix);
        drawBody(matrix);
        drawHead(matrix);
        drawLeft(matrix);
        drawRight(matrix);

    }
    var onjump = false;
    document.onkeydown = function (event) {
        var e = event || window.e;
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case 37:
                translation[0] = translation[0] - 8;
                break;
            case 38:
                if (!onjump) {
                    jump()
                }
                break;
            case 39:
                translation[0] = translation[0] + 8;
                break;
        }
    }
    var angleInDegrees = 0;

    function jump() {
        onjump = true;
        var v0 = 50;
        var t = 0;
        var tint = setInterval(() => {
            t++;
            translation[1] = translation[1] - (v0 - 5 * (t * t - (t - 1) * (t - 1)));
            angleInDegrees = angleInDegrees + 36;
            angleInRadians = angleInDegrees * Math.PI / 180;
            if (t == 5) {
                clearInterval(tint);
                down()
            }
        }, 50)
    }

    function down() {
        var t = 0;
        var tint = setInterval(() => {
            t++;
            translation[1] = translation[1] + (5 * (t * t - (t - 1) * (t - 1)));
            angleInDegrees = angleInDegrees + 36;
            angleInRadians = angleInDegrees * Math.PI / 180;
            if (t == 5) {
                clearInterval(tint);
                onjump = false;
                angleInDegrees = 0;
            }
        }, 50)
    }

    function drawHead(matrix) {
        var newmatrix = m3.translate(matrix, dt[2][0], dt[2][1]);
        for (let i = 9; i < 27; i++) {
            let tm = m3.multiply([data[2 * i], data[2 * i + 1], 1, 0, 0, 0, 0, 0, 0], newmatrix)
            now_data[2 * i] = tm[0];
            now_data[2 * i + 1] = tm[1];
        }
        newmatrix = m3.project(newmatrix, gl.canvas.clientWidth, gl.canvas.clientHeight);
        gl.uniformMatrix3fv(matrixLocation, false, newmatrix);
        var primitiveType = gl.TRIANGLES;
        var offset = 9;
        var count = 18;
        gl.drawArrays(primitiveType, offset, count);
    }

    function drawLeft(matrix) {
        var newmatrix = m3.translate(matrix, dt[3][0], dt[3][1]);
        for (let i = 27; i < 33; i++) {
            let tm = m3.multiply([data[2 * i], data[2 * i + 1], 1, 0, 0, 0, 0, 0, 0], newmatrix)
            now_data[2 * i] = tm[0];
            now_data[2 * i + 1] = tm[1];
        }
        newmatrix = m3.project(newmatrix, gl.canvas.clientWidth, gl.canvas.clientHeight)
        gl.uniformMatrix3fv(matrixLocation, false, newmatrix);
        var primitiveType = gl.TRIANGLES;
        var offset = 27;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    function drawRight(matrix) {
        var newmatrix = m3.translate(matrix, dt[4][0], dt[4][1])
        for (let i = 33; i < 39; i++) {
            let tm = m3.multiply([data[2 * i], data[2 * i + 1], 1, 0, 0, 0, 0, 0, 0], newmatrix)
            now_data[2 * i] = tm[0];
            now_data[2 * i + 1] = tm[1];
        }
        newmatrix = m3.project(newmatrix, gl.canvas.clientWidth, gl.canvas.clientHeight);
        gl.uniformMatrix3fv(matrixLocation, false, newmatrix);
        var primitiveType = gl.TRIANGLES;
        var offset = 33;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }
    var taildegree = 0;
    var tailradian = 0;
    var tailcount = 0;

    function drawTail(matrix) {
        if (tailcount < 5) {
            taildegree = taildegree - 10;
            tailcount++;
            tailradian = taildegree * Math.PI / 180;
        } else {
            taildegree = taildegree + 10;
            tailcount++;
            tailradian = taildegree * Math.PI / 180;
            if (tailcount == 10) {
                tailcount = 0;
                taildegree = 0;
                tailradian = 0;
            }
        }
        var newmatrix = m3.translation(-10, -5);
        newmatrix = m3.rotate(newmatrix, tailradian);
        newmatrix = m3.translate(newmatrix, 10, 5);
        newmatrix = m3.multiply(newmatrix, matrix);
        newmatrix = m3.translate(newmatrix, dt[0][0], dt[0][1]);
        for (let i = 0; i < 3; i++) {
            let tm = m3.multiply([data[2 * i], data[2 * i + 1], 1, 0, 0, 0, 0, 0, 0], newmatrix)
            now_data[2 * i] = tm[0];
            now_data[2 * i + 1] = tm[1];
        }
        newmatrix = m3.project(newmatrix, gl.canvas.clientWidth, gl.canvas.clientHeight);
        gl.uniformMatrix3fv(matrixLocation, false, newmatrix);

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays(primitiveType, offset, count);
    }

    function drawBody(matrix) {
        var newmatrix = m3.translate(matrix, dt[1][0], dt[1][1])
        for (let i = 3; i < 9; i++) {
            let tm = m3.multiply([data[2 * i], data[2 * i + 1], 1, 0, 0, 0, 0, 0, 0], newmatrix)
            now_data[2 * i] = tm[0];
            now_data[2 * i + 1] = tm[1];
        }
        newmatrix = m3.project(newmatrix, gl.canvas.clientWidth, gl.canvas.clientHeight);

        gl.uniformMatrix3fv(matrixLocation, false, newmatrix);
        var primitiveType = gl.TRIANGLES;
        var offset = 3;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    function allEqual(a, b) {
        for (let i = 0; i < 5; ++i) {
            if ((a[i][0] != b[i][0]) || (a[i][1] != b[i][1])) {
                return false;
            }
        }
        return true;
    }

    function fresh() {
        setInterval(() => {
            drawScene();
            //console.log(allEqual(dt,[[0,0],[0,0],[0,0],[0,0],[0,0]]))
        }, 50);
    }
}




main();