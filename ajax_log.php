<?
$file="log.txt";
$text=serialize($_POST); 
$fh = fopen($file, 'a');
    fwrite($fh, $text."\n");
    fwrite($fh, "yes\n");
    fwrite($fh, $_POST."\n");
    fclose($fh);
?>