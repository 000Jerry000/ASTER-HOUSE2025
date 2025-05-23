<?php

error_reporting(E_ALL);

mb_language('ja');
mb_internal_encoding('UTF-8');

require 'config-1.php';


if( isset($_SERVER['HTTP_REFERER']) ){
	$referer = $_SERVER['HTTP_REFERER'];
}else{
	$referer = '';
}

if( $spam_check == 1 && !empty($domain_name) ){
	if( strpos($referer, $domain_name) === false){
		echo '<p>不正な操作が行われたようです。</p>';
		exit;
	}
}

$name_1 = '';
$name_2 = '';
$read_1 = '';
$read_2 = '';
$mail_address = '';
$mail_address_confirm = '';
$gender = '';
$postal = '';
$address_1 = '';
$address_2 = '';
$phone = '';
$day = '';
$product = '';
$kind_separated = '';
$mail_contents = '';

$javascript_action = false;
$javascript_comment = '送信前の入力チェックは動作しませんでした。';
$now_url = '';
$before_url = '';


if( !(empty($_POST['name_1'])) ){
	$name_1 = mb_convert_kana($_POST['name_1'], 'KVa');
}

if( !(empty($_POST['name_2'])) ){
	$name_2 = mb_convert_kana($_POST['name_2'], 'KVa');
}

if( !(empty($_POST['read_1'])) ){
	$read_1 = mb_convert_kana($_POST['read_1'], 'KVa');
}

if( !(empty($_POST['read_2'])) ){
	$read_2 = mb_convert_kana($_POST['read_2'], 'KVa');
}


if( !(empty($_POST['mail_address'])) ){
	$mail_address = $_POST['mail_address'];
}

if( !(empty($_POST['mail_address_confirm'])) ){
	$mail_address_confirm = $_POST['mail_address_confirm'];
}

if( !(empty($_POST['mail_address'])) && !(empty($_POST['mail_address_confirm'])) ){
	if( !($mail_address === $mail_address_confirm) ){
		echo '<p>メールアドレスが一致しませんでした。</p>';
		exit;
	}
	
	if( !(preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $mail_address)) ){
		echo '<p>正しくないメールアドレスです</p>。';
		exit;
	}
}

if( !(empty($_POST['phone'])) ){
	$phone = mb_convert_kana($_POST['phone'], 'a');
}

if( !(empty($_POST['mail_contents'])) ){
	$mail_contents = mb_convert_kana($_POST['mail_contents'], 'KVa');
}

if( !(empty($_POST['javascript_action'])) ){
	$javascript_action = true;
	$javascript_comment = '送信前の入力チェックは正常に動作しました。';
}

if( !(empty($_POST['now_url'])) ){
	$now_url = mb_convert_kana($_POST['now_url'], 'as');
}

if( !(empty($_POST['before_url'])) ){
	$before_url = mb_convert_kana($_POST['before_url'], 'as');
}



$remote_host = gethostbyaddr($_SERVER['REMOTE_ADDR']);

require 'config-2.php';

$send_subject = 'ホームページからお問い合わせがありました。';

if( $reply_mail == 1 ){
	$additional_headers = "From:".$mail_address;
}else{
	$additional_headers = "From:".$send_address;
}

$my_result = mb_send_mail($send_address, $send_subject, $send_body, $additional_headers);

if( $reply_mail == 1 ){
	$thanks_subject = 'お問い合わせありがとうございました。';
	$send_name = mb_encode_mimeheader($send_name, 'ISO-2022-JP');
	$thanks_additional_headers = "From:".$send_name." <".$send_address.">";
	
	
	$you_result = mb_send_mail($mail_address, $thanks_subject, $thanks_body, $thanks_additional_headers);
}


switch( $reply_mail ){
	case 0:
		if( $my_result ){
			header('Location: '.$thanks_page_url);
		}else{
			echo '<p>エラーが起きました。<br />ご迷惑をおかけして大変申し訳ありません。</p>';
			exit;
		}
		break;
	
	case 1:
		if( $my_result && $you_result ){
			header('Location: '.$thanks_page_url);
		}else{
			echo '<p>エラーが起きました。<br />ご迷惑をおかけして大変申し訳ありません。</p>';
			exit;
		}
	 break;
}


?>
