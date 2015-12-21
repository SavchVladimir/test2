var myModule = (function(){
	
	//инициализация текущего модуля
	var init = function(){
			_setUpListners();
		};

	//прослушивание событий
	function _setUpListners(){
			$('#add-new-item').on('click',_showModal);
			$('#upload').on('change',_loadImg);
		};

	function _loadImg(e){
			// var filePath = e.target.value.split('\\'),
   //          	fileName = filePath[filePath.length-1];
   //      	$('#project-img').val(fileName);
   console.log(this);
   			name = _getName(this.value);
   			$('#upload')
			.val(name)
			.trigger('hideTooltip') // отключение тултипа
			.removeClass('has-error'); // убираем класс с ошибкой
			
		};

	var _getName = function(str){
		    return str.replace(/\\/g, '/').replace(/.*\//, '');
		};
	//работа с модальным окном
	function _showModal(ev){
			ev.preventDefault(); //отменяем действие по дефолту
			
			var divPopup = $('#new-project-popup'),
				form = divPopup.find('.form');

			divPopup.bPopup({
				onClose: function(){
					//при закрытии удаляем все qtip
					$('.qtip').remove();
				}
			});
			//ждем нажание на добавление проекта
			$('#add-new-project').on('submit',_addProject); 
		};

	//добавление проекта
	function _addProject(ev){
			ev.preventDefault();
			var form = $(this),
				url = 'add-project.php',
				resultAjaxForm = _ajaxForm(form,url);
				
			resultAjaxForm.done(function(ans){
				console.log(ans);
				if(!ans.name_status){
					_createQtip($('#project-name'), false, ans.name_text);
				};
				if(!ans.img_status){
					_createQtip($('#upload'), false, ans.img_text);
				};
				if(!ans.url_status){
					_createQtip($('#project-url'), false, ans.url_text);
				};
				if(!ans.content_status){
					_createQtip($('#project-content'), false, ans.content_text);
				};
			})
		};

	//возврат результата запроса
	function _ajaxForm(form, url){
		data = form.serialize();
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

	//element - инпут к которому привязывается тултип
	//position - true - справа, false - слева
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

