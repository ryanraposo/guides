## Stremio on Raspberry Pi 4B (Ubuntu 24.10)  

> This guide assumes nothing.

### **Table of Contents**
1. [Install Required Packages](#install-required-packages)
2. [Clone and Build Stremio](#clone-and-build-stremio)  
   - [Clone Repository](#clone-repository)  
   - [Generate Makefile](#generate-makefile)  
   - [Compile Stremio](#compile-stremio)  
3. [Post-Build Setup](#post-build-setup)
4. [Ensure Streaming Server and Players are Installed](#ensure-streaming-server-and-players-are-installed)
5. [Running Stremio](#running-stremio)
6. [Troubleshooting](#troubleshooting)  
   - [XCB Platform Plugin Error](#xcb-platform-plugin-error)  
   - [Wayland Issues](#wayland-issues)  
   - [Streaming Server Issues](#streaming-server-issues)  
   - [Video Player Issues](#video-player-issues)  
7. [Installation and Startup Scripts](#installation-and-startup-scripts)  
   - [Install Script (`install_stremio.sh`)](#install-script-install_stremiosh)  
   - [Startup Script (`start_stremio.sh`)](#startup-script-start_stremiosh)  

---

### **Install Required Packages**
Before building Stremio, install the necessary dependencies:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git build-essential qt5-qmake qtbase5-dev qtdeclarative5-dev \
qtwebengine5-dev libqt5webchannel5-dev libmpv-dev libssl-dev librsvg2-bin nodejs libxcb-xinerama0 \
vlc mpv ubuntu-restricted-extras libxcb-xinerama0 qtwebengine5-dev libqt5webchannel5-dev
```

### **Clone and Build Stremio**
#### **Clone Repository**
```bash
git clone --recurse-submodules https://github.com/Stremio/stremio-shell.git
cd stremio-shell
```

#### **Generate Makefile**
```bash
qmake
```

#### **Compile Stremio**
```bash
make -j4 -f release.makefile
```
This utilizes all four cores of the Raspberry Pi 4B for optimal compilation speed.

### **Post-Build Setup**
Once the build completes, perform the following steps:
```bash
mkdir -p build
wget "https://dl.strem.io/server/v4.20.8/desktop/server.js" -O build/server.js
chmod +x build/server.js
ln -sf $(which node) build/node
```

### **Ensure Streaming Server and Players are Installed**
Check if `server.js` runs correctly:
```bash
node ~/stremio-shell/build/server.js
```
If this fails, ensure `nodejs` is installed:
```bash
sudo apt install -y nodejs
```

Ensure video players are installed:
- **VLC**: Stremio can use VLC for playback.
- **MPV**: A lightweight player that works well on Raspberry Pi.

Install them manually if needed:
```bash
sudo apt install -y vlc mpv
```
Check if Stremio detects the players:
Open **Stremio** and go to **Settings > Player**. Ensure VLC or MPV is listed.

### **Running Stremio**
If you want to skip manual installation, you can jump to the **Installation and Startup Scripts** section at the end.

Make it executable:
```bash
chmod +x stremio
```
Launch Stremio along with the streaming server:
```bash
node ~/stremio-shell/build/server.js &
./stremio
```

### **Troubleshooting**
#### **XCB Platform Plugin Error**
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

#### **Wayland Issues**
If using Wayland instead of X11, launch Stremio with:
```bash
./stremio -platform wayland
```

#### **Streaming Server Issues**
If you see an error stating **"Error while starting streaming server"**, make sure `server.js` exists:
```bash
ls -l ~/stremio-shell/build/server.js
```
If it's missing, re-download it:
```bash
wget "https://dl.strem.io/server/v4.20.8/desktop/server.js" -O ~/stremio-shell/build/server.js
chmod +x ~/stremio-shell/build/server.js
```

#### **Video Player Issues**
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

---

### **Installation and Startup Scripts**
If you prefer an automated installation and startup, use the following scripts.

#### **Install Script (`install_stremio.sh`)**
```bash
#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git build-essential qt5-qmake qtbase5-dev qtdeclarative5-dev \
qtwebengine5-dev libqt5webchannel5-dev libmpv-dev libssl-dev librsvg2-bin nodejs libxcb-xinerama0 \
vlc mpv ubuntu-restricted-extras libxcb-xinerama0 qtwebengine5-dev libqt5webchannel5-dev

git clone --recurse-submodules https://github.com/Stremio/stremio-shell.git
cd stremio-shell
qmake
make -j4 -f release.makefile
mkdir -p build
wget "https://dl.strem.io/server/v4.20.8/desktop/server.js" -O build/server.js
chmod +x build/server.js
ln -sf $(which node) build/node
echo 'Installation complete. Run ~/start_stremio.sh to start Stremio.'
```
Make it executable:
```bash
chmod +x ~/install_stremio.sh
```
Run it:
```bash
~/install_stremio.sh
```

#### **Startup Script (`start_stremio.sh`)**
```bash
#!/bin/bash
node ~/stremio-shell/build/server.js &
echo 'Stremio streaming server started...'
sleep 2
./stremio
echo 'Stremio launched successfully.'
```
Make it executable:
```bash
chmod +x ~/start_stremio.sh
```
Run it:
```bash
~/start_stremio.sh
```