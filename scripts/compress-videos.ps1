# Compress all 3 videos to KB range, no audio
# Run from repo root: .\scripts\compress-videos.ps1

$v = Join-Path $PSScriptRoot "..\public\assets\videos"
$videos = @("acogas-video-1", "acogas-video-2", "phone-like-video")

foreach ($name in $videos) {
  $in = "$v\$name.mp4"
  $out = "$v\$name-temp.mp4"
  if (-not (Test-Path $in)) { Write-Host "Skip $name (not found)"; continue }
  Write-Host "Processing $name.mp4..."
  ffmpeg -y -i $in -an -c:v libx264 -preset slow -b:v 850k -maxrate 950k -bufsize 400k -movflags +faststart $out 2>&1 | Out-Null
  if (Test-Path $out) {
    Move-Item -Force $out $in
    $kb = [math]::Round((Get-Item $in).Length / 1KB, 1)
    Write-Host "  -> $kb KB, no audio"
  }
}
Write-Host "Done."
