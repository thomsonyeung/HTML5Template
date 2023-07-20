/*
	Function Name: cf_whichTransitionEvent
	Parameter: Null
	Return: Browser specified event name transition end
	Usage: var transitionEnd = cf_whichTransitionEvent();
	Date: 2012-03-15
	Remark: $().off(transitionEnd).on(transitionEnd,onStarted)				
*/

function cf_whichTransitionEvent(){ 
	var t; 
	var el = document.createElement('fakeelement'); 
	var transitions = { 
		'transition':'transitionEnd', 
		'OTransition':'oTransitionEnd', 
		'MSTransition':'msTransitionEnd', 
		'MozTransition':'transitionend', 
		'WebkitTransition':'webkitTransitionEnd' 
	}  
	for(t in transitions){ 
		if( el.style[t] !== undefined ){ 
			return transitions[t]; 
		} 
	} 
}

/*
	Function Name: cf_styleSupport
	Parameter: prop (Standard DOM CSS property Name) e.g. transitionProperty
	Return: Browser specified DOM CSS property Name  e.g. WebkitTransitionProperty
	Usage: var styleSupport  = cf_styleSupport("transitionProperty")
	Date: 2012-03-15
	Remark: Pure css property => -webkit-transition-property
		    DOM css propperty => WebkitTransitionProperty
			
			$().css("WebkitTransitionProperty", 'opactiy')
*/

function cf_styleSupport(prop) {
	var vendorProp, supportedProp,	
	// �Nprop�Ѽƪ��Ĥ@�Ӧr���j�g, �Ӵ��ռt�Ӫ��S�w�ݩʦW��
	capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
	prefixes = ["Moz", "Webkit", "O", "ms"],
	div = document.createElement("div");
	
	if (prop in div.style) {	
		// �o���s�����䴩�зǪ�CSS�ݩʦW��
		supportedProp = prop;
	} else {	
		// ���լO�_�䴩�t�Ӫ��S�w�ݩʦW��
	for (var i = 0; i < prefixes.length; i++) {
		vendorProp = prefixes[i] + capProp;
		if (vendorProp in div.style) {
			supportedProp = vendorProp;
			break;
			}
		}
	}
	
	// �bIE���קK�O����|��
	div = null;			
	// �b$.support���[�J�o���ݩ�, ������L�a��i�H�s��
	$.support[prop] = supportedProp;
			
	return supportedProp;
}

var cf_animateCSSProp = function(event) {
	var defaults = {
		cssProp: {opacity: 0.8},
		aniSpeed: 500,
		aniEffect: "swing"
    }; 
	
	var o = $.extend(defaults, event.data);
	$(this).animate(o.cssProp, o.aniSpeed, o.aniEffect);		
	//$(this).animate(event.data.cssProp, event.data.aniSpeed, event.data.aniEffect);		
}

var cf_checkBrowser = function() {
	var browserType;
	if($.browser.webkit) {
		browserType='webkit';
    }
	else if($.browser.safari) {
		browserType='safari';
	}
	else if($.browser.opera) {
		browserType='opera';
	}
	else if($.browser.msie) {
		browserType='msie';
	}
	else if($.browser.mozilla) {
		browserType='mozilla';
	}
	return browserType;
}