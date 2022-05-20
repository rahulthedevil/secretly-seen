#!/bin/bash

build() {
    appName=$(jq .appName public/kyubiSettings.json)
    appName="${appName%\"}"
    appName="${appName#\"}"
    appVersion=$(jq .version public/manifest.json)
    appVersion="${appVersion%\"}"
    appVersion="${appVersion#\"}"
    echo "Building your awesome ${appName} V${appVersion} extension"

    rm -rf src/images
    mkdir -p src/images
    cp -r public/images* src

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    node scripts/build.js

    mkdir -p dist
    cp -r build/* dist

    mv dist/index.html dist/popup.html

    rm -f dist/kyubiSettings.json
    rm -f dist/manifest.backup.json
    rm -f dist/manifest.copy.json

}

build