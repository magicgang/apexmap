<?php
header('Content-type: text/plain');

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.mozambiquehe.re/maprotation?version=2&auth=yAu1KcMj351O0aZZkjY1');
