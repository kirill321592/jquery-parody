

function $(some){
	var elements;

	if(some instanceof HTMLElement){
		elements = [some];
	}
	else{
		elements = document.querySelectorAll(some);
	}

	return new OurJquery(elements);
}

function OurJquery(elems){
	this.elems = elems;

	this.on = function(eventname, callback){
		for(var i = 0; i < this.elems.length; i++){
	        this.elems[i].addEventListener(eventname, callback);
	    }

	    return this;
	}

	this.addClass = function(className){
		for(var i = 0; i < this.elems.length; i++){
	        this.elems[i].classList.add(className);
	    }

	    return this;
	}

	this.removeClass = function(className){
		for(var i = 0; i < this.elems.length; i++){
	        this.elems[i].classList.remove(className);
	    }

	    return this;
	}

	
	this.html = function(content){
		if(content === undefined){
			return (this.elems[0] === undefined) ? '' : this.elems[0].innerHTML;
		}
		else{
			for(var i = 0; i < this.elems.length; i++){
		        this.elems[i].innerHTML = content;
		    }

		    return this;
		}
	}


	this.attr = function(name, value){
		if(value === undefined){
			return (this.elems[0] === undefined) ? 
							'' : 
							this.elems[0].getAttribute(name);
		}
		else{
			for(var i = 0; i < this.elems.length; i++){
		        this.elems[i].setAttribute(name, value)
		    }

		    return this;
		}
	}


	this.prop = function(name, value){
		if(value === undefined){
			return (this.elems[0] === undefined) ? 
							'' : 
							this.elems[0][name];
		}
		else{
			for(var i = 0; i < this.elems.length; i++){
		        this.elems[i][name] = value;
		    }

		    return this;
		}
	}

	
    this.css = function(param1, param2){
    	if(typeof param1 === "object"){
    		for(var key in param1){
	        	for(var i = 0; i < this.elems.length; i++){
			        this.elems[i].style[key] = param1[key];
			    }
	        }
    	}
    	else if(typeof param2 === "undefined"){
    		return (this.elems[0] === undefined) ? 
							'' : 
							this.elems[0].style[param1];
    	} 
    	else{
    		for(var i = 0; i < this.elems.length; i++){
		        this.elems[i].style[param1] = param2;
		    }
    	}

        return this;
    }



    this.fadeOut = function(time, callback){
    	var func = callback || function(){};

        for(var i = 0; i < this.elems.length; i++){
	        fade(this.elems[i], time, 50, func);
	    }

	    return this;
    }

    function fade(elem, t, f, callback){
		// кадров в секунду (по умолчанию 50)
		var fps = f || 50; 
		// время работы анимации (по умолчанию 500мс)
		var time = t || 500; 
		// сколько всего покажем кадров
		var steps = time / (1000 / fps);   
		// текущее значение opacity - изначально 0
		var op = 1;
		// изменение прозрачности за 1 кадр
		var d0 = op / steps;

		// устанавливаем интервал (1000 / fps) 
		// например, 50fps -> 1000 / 50 = 20мс  
		var timer = setInterval(function(){
			// уменьшаем текущее значение opacity
			op -= d0;
			// устанавливаем opacity элементу DOM
			elem.style.opacity = op;
			// уменьшаем количество оставшихся шагов анимации
			steps--;

			// если анимация окончена
			if(steps <= 0){
				// убираем интервал выполнения
				clearInterval(timer);
				// и убираем элемент из потока документа
				elem.style.display = 'none';
				// 
				callback.call(elem);
			}
		}, (1000 / fps));
	}
}