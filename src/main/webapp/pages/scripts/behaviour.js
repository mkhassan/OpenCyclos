/*
   Behaviour v1.1 by Ben Nolan, June 2005. Based largely on the work
   of Simon Willison (see comments by Simon below).

   Description:
   	
   	Uses css selectors to apply javascript behaviours to enable
   	unobtrusive javascript in html documents.
   	
   Usage:   
   
	var myrules = {
		'b.someclass' : function(element){
			element.onclick = function(){
				alert(this.innerHTML);
			}
		},
		'#someid u' : function(element){
			element.onmouseover = function(){
				this.innerHTML = "BLAH!";
			}
		}
	};
	
	Behaviour.register(myrules);
	
	// Call Behaviour.apply() to re-apply the rules (if you
	// update the dom, etc).

   License:
   
   	This file is entirely BSD licensed.
   	
   More information:
   	
   	http://ripcord.co.nz/behaviour/
   
*/   
//Flag to determine if the behaviour was already applied on the page
var behaviourApplied = false;

var Behaviour = {
	list : new Array,
	
	register : function(sheet){
		Behaviour.list.push(sheet);
	},
	
	start : function(){
		Behaviour.addLoadEvent(function(){
			Behaviour.apply();
		});
	},
	
	apply : function(){
		for (var h=0;sheet=Behaviour.list[h];h++){
			for (var selector in sheet){
				list = document.getElementsBySelector(selector);
				
				if (!list){
					continue;
				}

				for (i=0;element=list[i];i++){
					sheet[selector](element);
				}
			}
		}
		behaviourApplied = true;
	},
	
	addLoadEvent : function(func){
		Event.observe(self, "load", function() {
			if (!behaviourApplied) {
				func();
			}
		});
	}
}

Behaviour.start();

if (!document.getElementsBySelector) {
    document.getElementsBySelector = $$;
}