<?php


//相手に自動返信メールを送るかどうか -- 送らない場合は0、送る場合は1にしてください。 --
//HTML側でメールアドレスの項目を必須にしている場合：0または1どちらでもよい。
//HTML側でメールアドレスの項目を任意にしている場合：必ず0にしてください。(この場合、自分のメールアドレスが差出人となり、自分にメールが来ます)
$reply_mail = 1;


// 送信データの取得＋簡易サニタイズ
$type = isset($_POST['inquiry']) ? trim($_POST['inquiry']) : '';
$name     = isset($_POST['name'])   ? trim($_POST['name'])   : '';
$furigana = isset($_POST['furigana']) ? trim($_POST['furigana']) : '';
$mail     = isset($_POST['mail_address_confirm'])     ? trim($_POST['mail_address_confirm'])     : '';
$address  = isset($_POST['address'])  ? trim($_POST['address'])  : '';
$phone    = isset($_POST['phone'])    ? trim($_POST['phone'])    : '';
$message  = isset($_POST['message'])  ? trim($_POST['message'])  : '';


$type_labels = [
    'general'      => '資料請求',
    'consultation' => '家づくり相談会のご予約',
    'other'        => 'その他、住まいに関するご相談',
];
// 実際にメールに出力するラベル
$type_label = isset($type_labels[$type])
    ? $type_labels[$type]
    : '未選択';


// リモートホスト名
$remote_host = gethostbyaddr($_SERVER['REMOTE_ADDR']);

// 必要に応じて JavaScript チェックやリファラも取得
$javascript_comment = $_POST['javascript_comment'] ?? '';
$now_url            = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$before_url         = $_SERVER['HTTP_REFERER'] ?? '';

//自分に届くメールの内容 -- EOMからEOM;までの間の文章を自分に合わせて変更してください。 --
$send_body = <<<EOM

アスターハウスLPからお問い合わせがありました。
お問い合わせの内容は以下の通りです。

--------------------------------------------------------------------------

お問い合わせの種類：{$type_label}
名前：{$name}
フリガナ：{$furigana}
メールアドレス：{$mail_address}
ご住所：{$address}
電話番号：{$phone}
お問い合わせの内容：
{$message}

--------------------------------------------------------------------------

送信者のIPアドレス：{$_SERVER['REMOTE_ADDR']}
送信者のホスト名：{$remote_host}
送信者のブラウザ：{$_SERVER['HTTP_USER_AGENT']}

送信前の入力チェック：{$javascript_comment}
メールフォームのURL：{$now_url}

EOM;




//相手に届く自動返信メールの内容 -- EOMからEOM;までの間の文章を自分に合わせて変更してください。 --
$thanks_body = <<<EOM

この度はお問い合わせをいただき、ありがとうございました。

折り返し担当者から返信が行きますので、しばらくお待ちください。

お問合せ内容は以下の通りです。

--------------------------------------------------------------------------

お問い合わせの種類：{$type_label}
名前：{$name}
フリガナ：{$furigana}
メールアドレス：{$mail_address_confirm}
ご住所：{$address}
電話番号：{$phone}
お問い合わせの内容：
{$message}

--------------------------------------------------------------------------
メールフォームのURL：{$now_url}


──────────────────────────────────────
アスターハウス
〒065-0013
札幌市東区北13条東16丁目1-1
TEL　011-214-0455
Mail：master-aster-estate.com
──────────────────────────────────────

EOM;


