$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "C:\Program Files\nodejs\node.exe"
$port = 4174
$serverScript = Join-Path $siteRoot "Start-PCGen-Website.js"

$serverRunning = $false
$probe = [System.Net.Sockets.TcpClient]::new()
try {
  $probe.Connect("127.0.0.1", $port)
  $serverRunning = $true
} catch {
  $serverRunning = $false
} finally {
  $probe.Dispose()
}

if (-not $serverRunning) {
  Start-Process -FilePath $node `
    -ArgumentList "`"$serverScript`"" `
    -WorkingDirectory $siteRoot `
    -WindowStyle Hidden
}
