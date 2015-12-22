<?php

$name 	 = $_POST['project-name'];
$url     = $_POST['project-url'];
$content = $_POST['project-content'];

$data = array();
///NAME////////////////////////////////
if($name === ''){
	$data['name_text'] = 'Не заполнено имя';
	$data['name_status'] = false;
	$data['name_object'] = $name;
}else{
	$data['name_text'] = '';
	$data['name_status'] = true;
}
///URL////////////////////////////////
if(strlen($url)){
	$urltypes = array(".ru",".com",".ua",".kz",".by",".ge");
	$urltype = strrchr($url,".");
	$urltype = in_array($urltype, $urltypes);
}else{
	$urltype = false;
};
if($url === ''){
	$data['url_text'] = 'Не заполнен адрес проекта';
	$data['url_status'] = false;
	$data['url_object'] = $url;
}elseif(!$urltype){
	$data['url_text'] = 'Не корректная ссылка';
	$data['url_status'] = false;
	$data['url_object'] = $url;
}else{
	$data['url_text'] = '';
	$data['url_status'] = true;
};
///CONTENT////////////////////////////////
if($content === ''){
	$data['content_text'] = 'Заполните пожалуйста описание';
	$data['content_status'] = false;
	$data['content_object'] = $content;
}else{
	$data['content_text'] = '';
	$data['content_status'] = true;
}

header("Content-Type: application/json");
echo json_encode($data);
exit;
?>