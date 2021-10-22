"use strict"
//16进制转数字
function hexString2Num(hexString){
	return parseInt('0x'+hexString);
}
//16进制转RGB颜色
function hex2RGB256(hexString){
	var r=hexString2Num(hexString[1]+hexString[2]);
	var g=hexString2Num(hexString[3]+hexString[4]);
	var b=hexString2Num(hexString[5]+hexString[6]);
	return [r,g,b];
}
//连接两个数组并返回,不建议使用
function _concat(a,b){//合并两个数组
	return [...a,...b];
	}

//连接两个数组并赋值给第一个数组,不建议使用
function concat(a,b){//合并两个数组并加载在第一个数组中
	a.push.apply(a,b);
}

//将数组以相同的形式倍增[1,2,3],4=>[1,2,3,1,2,3,1,2,3,1,2,3]
function arrayExpand(a,num){
	var rst=[];
	for(let i=0;i<num;++i){
		for(let j=0;j<a.length;++j){
			rst.push(a[j]);
		}
	}
	return rst;
}
//角度转弧度
function angle2Radians(angle){
	return 2*Math.PI*angle/360;
}
//一次得到正弦和余弦
function getSinCos(thetaInRadians){
	return [Math.sin(thetaInRadians),
			Math.cos(thetaInRadians)];
}
//drawer.preTransformMatrix
