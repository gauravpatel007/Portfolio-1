Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap ("app\public\assets\hero_center.png")
Write-Host "Width = " $bmp.Width "Height = " $bmp.Height
$collarX = [int]($bmp.Width * 0.55)
$collarY = [int]($bmp.Height * 0.54)
$p = $bmp.GetPixel($collarX, $collarY)
Write-Host "Sample pixel at ($collarX, $collarY): R=$($p.R) G=$($p.G) B=$($p.B) A=$($p.A)"
$bmp.Dispose()
