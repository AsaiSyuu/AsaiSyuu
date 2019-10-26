<?
$file="/root/log.txt";
$text=serialize($_POST); 
echo $_POST;
$fh = fopen($file, 'a');
    fwrite($fh, $text."\n");
fclose($fh);
?>