Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Gaurav Patel\.gemini\antigravity-ide\brain\8ebfeabf-38c0-46a3-a0de-d7aefc52c51b\gaurav_hero_center_crisp_collar_1792927615503.jpg"
$destPath = "app\public\assets\hero_center.png"

$orig = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = [int]$orig.Width
$h = [int]$orig.Height

$bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($orig, 0, 0, $w, $h)
$g.Dispose()
$orig.Dispose()

# In hero_center portrait, the background is solid pure white (> 245 in R,G,B)
# The person's suit is dark navy/black, hair is dark, face is skin tones (R > B + 20).
# The shirt collar is white, but inside the suit (X is between 30% and 70%, Y is below 45%).
# Transparent threshold from boundary:
$transparent = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)

# Make background transparent by checking if pixel is white background:
# Background is outside the silhouette.
# For each row from top down, find left and right bounds of person:
for ($y = 0; $y -lt $h; $y++) {
    # Scan from left to right
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            $bmp.SetPixel($x, $y, $transparent)
        } else {
            break
        }
    }
    # Scan from right to left
    for ($x = $w - 1; $x -ge 0; $x--) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            $bmp.SetPixel($x, $y, $transparent)
        } else {
            break
        }
    }
}

$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "SUCCESS: Transparent hero_center.png created!"
