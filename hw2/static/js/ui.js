function createUi(container,ui){
	var block=document.createElement('div');
	block.setAttribute('class','setter');
	var label=document.createElement('label');
	label.setAttribute('class','form-label');
	label.setAttribute('for',ui.id);
	
	var input=document.createElement('input');
	input.setAttribute('id',ui.id);
	input.setAttribute('type','range');
	input.setAttribute('min',ui.min);
	input.setAttribute('max',ui.max);
	input.setAttribute('class','form-range');
	input.setAttribute('value',(ui.min+ui.max)/2);
	
	
	label.innerText=ui.id+':'+input.value;
	
	function uiChange(){
		label.innerText=ui.id+':'+input.value;
		if(ui.responseFunction){
			ui.responseFunction(input.value);	
		}
	}
	input.addEventListener('change',uiChange)
	input.addEventListener("input",uiChange)
	
	block.appendChild(label);
	block.appendChild(input);
	container.appendChild(block);
	
	//ui.responseFunction(input.value);
	return input;
}

