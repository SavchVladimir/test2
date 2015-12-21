var myModule = (function(){
	
	//инициализация текущего модуля
	var init = function(){
			_setUpListners();
		};

	//прослушивание событий
	function _setUpListners(){
			$('#send-message').on('submit',_checkForm);
			$('#button-clear').on('click',_clearForm);
		};

	//проверка формы
	function _checkForm(ev){
		
		ev.preventDefault();
		var form = $(this),
			url = 'send-message.php',
			resultAjaxForm = _ajaxForm(form,url),
			valide = true;
				
			resultAjaxForm.done(function(ans){
				console.log(ans);
				if(!ans.name_status){
					_createQtip($('#feedback-name'), false, ans.name_text);
					valide = false;
				};
				if(!ans.email_status){
					_createQtip($('#feedback-email'), true, ans.email_text);
					valide = false;
				};
				if(!ans.message_status){
					_createQtip($('#feedback-message'), false, ans.message_text);
					valide = false;
				};
				if(!ans.captcha_status){
					_createQtip($('#g-recaptcha-response'), true, ans.captcha_text);
					valide = false;
				};
			})


		return valide
	};

	function _clearForm(ev){
		ev.preventDefault();
		$('#feedback-name').val('');
		$('#feedback-email').val('');
		$('#feedback-message').val('');
		$('#feedback-captcha').val('');
		$('.qtip').remove();
	}

	function _ajaxForm(form, url){
		data = form.serialize();
		console.log(data);
		//запрос
		var result = $.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				data: data
			})
			.fail(function(ans){
				console.log('Проблемы в php');
				form.find('error-mes').text('На серевере произошла ошибка').show();
			});

		return result;
		};

	function _createQtip(element, position, message){

		if(position){
			position = {
				my: 'left center',
				at: 'right center'
			}
		}else{
			position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			}	
		};
		//инициализация
		element.qtip({
			content: {
				text: message
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style:{
				classes: 'qtip-mystyle qtip-rounded qtip-red',
				tip: {
					height: 10,
					width: 16
				}
			}
		}).trigger('show');
		};

	return{
		init:init
	};

})();

myModule.init();
