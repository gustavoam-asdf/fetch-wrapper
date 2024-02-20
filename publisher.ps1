$dir_to_publish = './public'
$package = 'package.json'
$readme = 'README.md'
$types_dir = './types'
$lib_dir = './lib'
$dist_dir = './dist'

if (Test-Path $dir_to_publish) {
	Remove-Item $dir_to_publish -Recurse -Force
}

if (Test-Path $lib_dir) {
	Remove-Item $lib_dir -Recurse -Force
}

if (Test-Path $dist_dir) {
	Remove-Item $dist_dir -Recurse -Force
}

pnpm tsup

$env:NODE_ENV = 'production'

pnpm build

New-Item -ItemType Directory -Force -Path $dir_to_publish

Copy-Item -Path $package -Destination $dir_to_publish
Copy-Item -Path $readme -Destination $dir_to_publish
Copy-Item -Path $lib_dir/* -Destination $dir_to_publish -Recurse
Copy-Item -Path $types_dir/* -Destination $dir_to_publish -Recurse
Copy-Item -Path $types_dir/* -Destination $dir_to_publish/cjs -Recurse -Force
Copy-Item -Path $types_dir/* -Destination $dir_to_publish/mjs -Recurse -Force

Copy-Item -Path $dist_dir -Destination $dir_to_publish/dist -Recurse
Copy-Item -Path $types_dir/* -Destination $dir_to_publish/dist/cjs -Recurse -Force
Copy-Item -Path $types_dir/* -Destination $dir_to_publish/dist/mjs -Recurse -Force

Write-Host "Copied files to $dir_to_publish"

Set-Location $dir_to_publish

pnpm publish