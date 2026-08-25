Add-Type -AssemblyName System.Drawing

$assetsDir = "E:\Programming capture\Apps development\Sleep Tracker\assets"
$files = Get-ChildItem -Path $assetsDir -Filter "*.png"

foreach ($file in $files) {
    try {
        $tempPath = [System.IO.Path]::Combine($assetsDir, "temp_" + $file.Name)
        $imgPath = $file.FullName
        
        $img = [System.Drawing.Image]::FromFile($imgPath)
        $bitmap = new-object System.Drawing.Bitmap($img)
        $img.Dispose()

        $bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $bitmap.Dispose()

        Remove-Item -Force $imgPath
        Move-Item -Force $tempPath $imgPath
        Write-Host "Converted to True PNG: $($file.Name)"
    } catch {
        Write-Host "Failed to convert: $($file.Name) - $_"
    }
}

Write-Host "ALL ASSET IMAGES CONVERTED TO TRUE PNG SUCCESSFULLY"
