$directories = @(
    "public",
    "src\assets",
    "src\components\common",
    "src\components\dashboard",
    "src\components\leaderboard",
    "src\components\profile",
    "src\components\quiz",
    "src\components\admin",
    "src\contexts",
    "src\hooks",
    "src\layouts",
    "src\pages",
    "src\services\api",
    "src\services\firebase",
    "src\store",
    "src\styles",
    "src\utils"
)

foreach ($dir in $directories) {
    $path = Join-Path -Path $PSScriptRoot -ChildPath $dir
    if (-not (Test-Path -Path $path)) {
        New-Item -Path $path -ItemType Directory -Force
        Write-Host "Created directory: $dir"
    } else {
        Write-Host "Directory already exists: $dir"
    }
}

Write-Host "Project structure setup complete!"
