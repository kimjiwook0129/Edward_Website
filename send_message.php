<?php
    $toKwang = "kysg0511@gmail.com";
    $toHui = "iamhuiseongkim@gmail.com";
    $toWook = "kimjiwook0129@gmail.com";
    $name = $_GET['sender_name'];
    $subject = "지욱이 위문편지 From: ".$name;
    $context = $_GET['msg'];
    $txt = "보낸 사람: ".$name."\n"."내용:\n".$context;
    $headers = "From: kimjiwook0129@gmail.com"."\r\n"."CC: kimjiwook0129@gmail.com";
    if(mail($toHui,$subject,$txt,$headers)){
        mail($toKwang,$subject,$txt,$headers);
        echo 'Your message has been sent successfully.<br>';
        echo '메세지를 성공적으로 보냈습니다.';
    } else {
        echo '<h4>Message not sent due to an unknown reason. </h4>';
        $link_address = 'https://www.instagram.com/kimjiwook129';
        echo '<h4>PLEASE SEND MESSAGE VIA DM TO --> '."<a href='$link_address'>Jiwook's Instagram</a></h4><br>";
        echo '<h4>알 수 없는 이유로 편지를 보낼 수 없습니다. </h4>';
        echo '<h4>편지를 인스타 디엠으로 보내주세요! --> '."<a href='$link_address'>지욱이 인스타</a></h4>";
    }

?>