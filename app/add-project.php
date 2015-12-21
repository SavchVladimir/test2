<?php

$name 	 = $_POST['project-name'];
$img 	 = $_POST['upload'];

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
// ///IMG////////////////////////////////
if(strlen($img)){
	 $imgtypes = array(".png",".jpeg",".jpg");
	 $imgtype = strrchr($img,".");
	 $imgtype = in_array($imgtype, $imgtypes);
}else{
	$imgtype = false;
};

if($img === ''){
	$data['img_text'] = 'Не выбрано изображение';
	$data['img_status'] = false;
	$data['img_object'] = $img;
}elseif(!$imgtype){
	$data['img_text'] = 'Не верный формат изображения';
	$data['img_status'] = false;
	$data['img_object'] = $img;
}else{
	$data['img_text'] = '';
	$data['img_status'] = true;
};
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