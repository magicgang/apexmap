<?php
header('Content-type: text/plain');

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.mozambiquehe.re/maprotation?version=2&auth=yAu1KcMj351O0aZZkjY1');

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}
curl_close ($ch);

print_r($result);
