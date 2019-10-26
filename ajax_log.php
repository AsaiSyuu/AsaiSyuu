<?
$file="/root/sanbaolog.txt";
$text=serialize($_POST); 
echo $_POST;
$fh = fopen($file, 'a+');
    fwrite($fh, $text."\n");
    fwrite($fh, "yes\n");
    fwrite($fh, $_POST."\n");
fclose($fh);
?>