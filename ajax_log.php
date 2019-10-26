<?
$file="log.txt";
$text=serialize($_POST); 
$fh = fopen($file, 'a');
    fwrite($fh, $text."\n");
    fclose($fh);
?>