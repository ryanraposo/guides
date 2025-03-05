## Stremio on Raspberry Pi 4B (Ubuntu 24.10)

<!-- TOC -->

- [Install Required Packages](#install-required-packages)
- [Clone and Build Stremio](#clone-and-build-stremio)
    - [Generate Makefile](#generate-makefile)
    - [Compile Stremio](#compile-stremio)
- [Post-Build Setup](#post-build-setup)
- [Ensure Streaming Server and Players are Installed](#ensure-streaming-server-and-players-are-installed)
- [Running Stremio](#running-stremio)
- [Troubleshooting](#troubleshooting)
    - [Missing Qt Modules](#missing-qt-modules)
    - [XCB Platform Plugin Error](#xcb-platform-plugin-error)
    - [SSH and X11 Forwarding](#ssh-and-x11-forwarding)
    - [Wayland Issues](#wayland-issues)
    - [Streaming Server Issues](#streaming-server-issues)
    - [Video Player Issues](#video-player-issues)

<!-- /TOC -->

### Install Required Packages

Before building Stremio, install the necessary dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git build-essential qt5-qmake qtbase5-dev qtdeclarative5-dev \
qtwebengine5-dev libqt5webchannel5-dev libmpv-dev libssl-dev librsvg2-bin nodejs libxcb-xinerama0 \
vlc mpv
```

### Clone and Build Stremio

#### Clone Repository

```bash
git clone --recurse-submodules https://github.com/Stremio/stremio-shell.git
cd stremio-shell
```

#### Generate Makefile

```bash
qmake
```

#### Compile Stremio

```bash
make -j4 -f release.makefile
```

This utilizes all four cores of the Raspberry Pi 4B for optimal compilation speed.

### Post-Build Setup

Once the build completes, perform the following steps:

```bash
mkdir -p build
wget "https://dl.strem.io/server/v4.20.8/desktop/server.js" -O build/server.js
chmod +x build/server.js
ln -sf $(which node) build/node
```

### Ensure Streaming Server and Players are Installed

1. **Check if `server.js` runs correctly**:

   ```bash
   node ~/stremio-shell/build/server.js
   ```

   If this fails, ensure `nodejs` is installed:

   ```bash
   sudo apt install -y nodejs
   ```

2. **Ensure video players are installed**:

   - **VLC**: Stremio can use VLC for playback.
   - **MPV**: A lightweight player that works well on Raspberry Pi.

   Install them manually if needed:

   ```bash
   sudo apt install -y vlc mpv
   ```

3. **Check if Stremio detects the players**:

   Open Stremio and go to `Settings > Player`. Ensure VLC or MPV is listed.

### Running Stremio

Launch Stremio with:

```bash
./build/stremio
```

### Troubleshooting

#### Missing Qt Modules

If you see errors regarding missing Qt modules:

```bash
sudo apt install qtwebengine5-dev libqt5webchannel5-dev
```

#### XCB Platform Plugin Error

If Stremio fails to start with:

```
qt.qpa.xcb: could not connect to display
qt.qpa.plugin: Could not load the Qt platform plugin "xcb" in "" even though it was found.
```

Try installing missing libraries:

```bash
sudo apt install libxcb-xinerama0
export DISPLAY=:0
```

If running remotely, enable X11 forwarding:

```bash
ssh -X [email]
```

#### SSH and X11 Forwarding

If launching over SSH without a display, ensure `X11Forwarding` is enabled:

```bash
ssh -X [email protected]
```

#### Wayland Issues

If using Wayland instead of X11, launch Stremio with:

```bash
./stremio -platform wayland
```

#### Streaming Server Issues

If you see an error stating **"Error while starting streaming server"**, make sure `server.js` exists:

```bash
ls -l ~/stremio-shell/build/server.js
```

If it's missing, re-download it:

```bash
wget "https://dl.strem.io/server/v4.20.8/desktop/server.js" -O ~/stremio-shell/build/server.js
chmod +x ~/stremio-shell/build/server.js
```

#### Video Player Issues

If video playback fails, try switching between **MPV** and **VLC** in Stremio’s settings. Ensure the correct player is installed:

```bash
sudo apt install -y vlc mpv
```

To test MPV separately:

```bash
mpv --no-config --hwdec=auto https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4
```

If MPV fails, check `vainfo` to confirm GPU acceleration:

```bash
vainfo
```

If VAAPI errors appear, install missing drivers:

```bash
sudo apt install mesa-va-drivers libva-drm2 libva-x11-2 libvulkan1
```

Then retry Stremio.

