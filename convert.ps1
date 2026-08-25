Add-Type -AssemblyName System.Drawing
$src = "C:\Users\MD RAMJAN ALI\.gemini\antigravity-ide\brain\95ca0ecf-4322-4a29-bc59-52d4aeccb3cb\sleep_tracker_icon_1787483397173.png"
$img = [System.Drawing.Image]::FromFile($src)
$img.Save("E:\Programming capture\Apps development\Sleep Tracker\assets\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("E:\Programming capture\Apps development\Sleep Tracker\assets\splash-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("E:\Programming capture\Apps development\Sleep Tracker\assets\adaptive-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("E:\Programming capture\Apps development\Sleep Tracker\assets\android-icon-foreground.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("E:\Programming capture\Apps development\Sleep Tracker\assets\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Host "TRUE PNG CONVERTED SUCCESSFULLY"
