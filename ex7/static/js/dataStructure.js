//简易的数据结构,实现并不完善
//线性结构
class elementList{
	constructor(){
		this.values=new Array();
		this.length=0;
	}
	push(elem){
		this.values.push(elem);
		++this.length;
	}
	get(i){
		return this.values[i];
	}
	getId(i){
		return this.values[i].id;
	}
	set(i,value){
		this.values[i]=value;
	}
	removeAll(){
		for(let index=0;index<this.length;index++){
			this.removeByIndex(index);
		}
		this.length=0;
	}
	removeByIndex(index){
		if(index!=-1){
			var elem=this.get(index);
			this.values.splice(index,1);
			this.length-=1;
			return elem;			
		}else{
			return null;
		}
	}
	remove(id){
		var index=this.searchById(id);
		return this.removeByIndex(index);
	}
	searchById(id){//获得索引值
		for(let i=0;i<this.values.length;++i){
			if(this.values[i].id==id){
				return i;
			}
		}
		return -1;
	}
	selectById(id){//获得对象
		for(let i=0;i<this.values.length;++i){
			if(this.values[i].id==id){
				return this.values[i];
			}
		}
		return null;
	}
	getValues(){
		return this.values;
	}
}
//不重复元素的线性结构(实现方式非集合,便于迭代,按索引取值.更好的方式是使用迭代器)
class elementSet extends elementList{
	constructor() {
	    super();
	}
	//要求elem有id项
	push(elem){
		if(this.searchById(elem.id)==-1){
			this.values.push(elem);
			++this.length;
		}
	}
}
class elementListFixLength extends elementList{
	constructor(size) {
	    super();
		this.values=new Array(size);
		this.length=size;
		for(let i=0;i<this.length;++i){
			this.values[i]=0;
		}
	}
	set(i,value){
		this.values[i]=value;
	}
	push(arg){
		console.log('ERROR:ElementListFixLength cannot be pushed.')
	}
	removeByIndex(arg){
		console.log('ERROR:Cannot remove Element from ElementListFixLength.')
	}
	remove(arg){
		console.log('ERROR:Cannot remove Element from ElementListFixLength.')
	}
	removeAll(arg){
		console.log('ERROR:Cannot remove Element from ElementListFixLength.')
	}
	
}