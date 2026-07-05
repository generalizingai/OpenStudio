# OpenStudio one-command installer (Windows / PowerShell).
#
#   irm https://raw.githubusercontent.com/generalizingai/OpenStudio/main/install.ps1 | iex
#
# Clones OpenStudio, installs dependencies, builds the workspace packages,
# then starts the app and opens it in your browser.

$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/generalizingai/OpenStudio.git"
$AppDir  = if ($env:OPENSTUDIO_DIR) { $env:OPENSTUDIO_DIR } else { Join-Path $HOME "OpenStudio" }
$DefaultPort = 3000

function Say($m) { Write-Host "> $m" -ForegroundColor Green }
function Die($m) { Write-Host "x $m" -ForegroundColor Red; exit 1 }

Write-Host "`nOPENSTUDIO one-command installer" -ForegroundColor Green
Write-Host "--------------------------------------`n" -ForegroundColor DarkGray

# ----- prerequisites -----
if (-not (Get-Command git  -ErrorAction SilentlyContinue)) { Die "git is required - install from https://git-scm.com/downloads" }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Die "Node.js 18+ is required - install from https://nodejs.org/" }
if (-not (Get-Command npm  -ErrorAction SilentlyContinue)) { Die "npm is required (it ships with Node.js)." }

$NodeMajor = (node -p "process.versions.node.split('.')[0]")
if ([int]$NodeMajor -lt 18) { Die "Node.js 18+ required (found $(node -v)). Update at https://nodejs.org/" }
Say "Node $(node -v) / npm v$(npm -v)"

# ----- clone or update -----
if (Test-Path (Join-Path $AppDir ".git")) {
  Say "Updating existing install at $AppDir"
  git -C $AppDir pull --ff-only
} else {
  Say "Cloning OpenStudio into $AppDir"
  git clone --depth 1 $RepoUrl $AppDir
}
Set-Location $AppDir

# ----- install + build -----
Say "Installing dependencies and building packages (this can take a few minutes)..."
npm run setup
if ($LASTEXITCODE -ne 0) { Die "Setup failed." }

# ----- launch -----
Say "Starting OpenStudio..."
$log = New-TemporaryFile
$dev = Start-Process -FilePath "npm" -ArgumentList "run","dev" -NoNewWindow -PassThru -RedirectStandardOutput $log

$url = $null
for ($i = 0; $i -lt 120; $i++) {
  if ($dev.HasExited) { Get-Content $log; Die "The dev server exited unexpectedly." }
  $m = Select-String -Path $log -Pattern "http://localhost:\d+" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($m) { $url = $m.Matches[0].Value; break }
  Start-Sleep -Seconds 1
}
if (-not $url) { $url = "http://localhost:$DefaultPort" }

Write-Host ""
Say "OpenStudio is running at $url"
Say "Opening your browser..."
Start-Process $url
Write-Host "`nEnter your MuAPI key (https://muapi.ai/access-keys) on first use." -ForegroundColor DarkGray
Write-Host "Press Ctrl+C to stop the server.`n" -ForegroundColor DarkGray

Wait-Process -Id $dev.Id
