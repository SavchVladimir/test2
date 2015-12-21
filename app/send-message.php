<?php

$name 	 = $_POST['feedback-name'];
$email 	 = $_POST['feedback-email'];
$message = $_POST['feedback-message'];
$captcha = $_POST['g-recaptcha-response'];

$data = array();
///NAME////////////////////////////////
if($name === ''){
	$data['name_text'] = 'Не заполнено имя';
	$data['name_status'] = false;

}else{
	$data['name_text'] = '';
	$data['name_status'] = true;
	$data['name'] = $name;
};
///E-MAIL////////////////////////////////
if(strlen($email)){
	$emailtype = strstr($email, '@');;
}else{
	$emailtype = false;
};

if($email === ''){
	$data['email_text'] = 'Не указан адрес';
	$data['email_status'] = false;
}elseif(!$emailtype){
	$data['email_text'] = 'Не верный формат адреса';
	$data['email_status'] = false;
}else{
	$data['email_text'] = '';
	$data['email_status'] = true;
};
///MESSAGE////////////////////////////////
if($message === ''){
	$data['message_text'] = 'Заполните пожалуйста описание';
	$data['message_status'] = false;
}else{
	$data['message_text'] = '';
	$data['message_status'] = true;
};
// ///CAPTCHA////////////////////////////////
// if($captcha === '6LfmehMTAAAAACKJ3m6G6XZ6Pj3aomgOpowRoub4'){
// 	$data['captcha_text'] = '';
// 	$data['captcha_status'] = true;
// 	$data['captcha'] = $captcha.secret;
// }else{
// 	$data['captcha_text'] = 'Проверка не пройдена';
// 	$data['captcha_status'] = false;
// 	$data['captcha'] = $captcha;
// };

header("Content-Type: application/json");
echo json_encode($data);
exit;
?>