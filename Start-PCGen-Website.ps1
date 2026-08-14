$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "C:\Program Files\nodejs\node.exe"
$port = 4173
$url = "http://127.0.0.1:$port/index.html"

$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $listener) {
  Start-Process -FilePath $node `
    -ArgumentList "`"$siteRoot\Start-PCGen-Website.js`"" `
    -WorkingDirectory $siteRoot `
    -WindowStyle Hidden
}
