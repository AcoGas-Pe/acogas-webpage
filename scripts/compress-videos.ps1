# Compress hero/public MP4s for web: H.264, no audio, faststart, moderate bitrate.
# Run from repo root: .\scripts\compress-videos.ps1

$v = Join-Path $PSScriptRoot "..\public\assets\videos"

$jobs = @(
  @{ Name = "acogas-video-1"; VideoFilter = $null; Bitrate = "850k"; Maxrate = "1100k"; Bufsize = "450k" }
  @{ Name = "acogas-video-2"; VideoFilter = "scale=-2:720"; Bitrate = "900k"; Maxrate = "1200k"; Bufsize = "450k" }
  @{ Name = "phone-like-video"; VideoFilter = "scale=-2:720"; Bitrate = "900k"; Maxrate = "1200k"; Bufsize = "450k" }
)

foreach ($job in $jobs) {
  $name = $job.Name
  $in = "$v\$name.mp4"
  $out = "$v\$name-temp.mp4"
  if (-not (Test-Path $in)) { Write-Host "Skip $name (not found)"; continue }

  $vf = $job.VideoFilter
  $vfArgs = if ($vf) { @("-vf", $vf) } else { @() }

  Write-Host "Processing $name.mp4..."
  & ffmpeg -y -i $in -an @vfArgs -c:v libx264 -preset slow `
    -b:v $job.Bitrate -maxrate $job.Maxrate -bufsize $job.Bufsize `
    -movflags +faststart $out 2>&1 | Out-Null

  if (Test-Path $out) {
    Move-Item -Force $out $in
    $kb = [math]::Round((Get-Item $in).Length / 1KB, 1)
    Write-Host "  -> $kb KB, no audio"
  }
}
Write-Host "Done."
