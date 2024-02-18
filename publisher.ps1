$dir_to_publish = './public'
$package = 'package.json'
$lib_dir = './lib'
$dist_dir = './dist'

if (Test-Path $dir_to_publish) {
	Remove-Item $dir_to_publish -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $dir_to_publish

Copy-Item -Path $package -Destination $dir_to_publish
Copy-Item -Path $lib_dir/* -Destination $dir_to_publish -Recurse
Copy-Item -Path $dist_dir -Destination $dir_to_publish/dist -Recurse

Write-Host "Copied files to $dir_to_publish"

Set-Location $dir_to_publish

pnpm publish