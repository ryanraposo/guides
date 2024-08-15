## plasma6

> This guide assumes Ubuntu 24.04

```
     .--.  
    /    \   'why does 6 come after 5?'
   (👁️👄👁️)           
    \    /     'because kde plasma 6'
```

### Table of Contents
1. [Install Qt 6.7.2](#1-install-qt-672)
2. [Update PATH and Environment Variables](#2-update-path-and-environment-variables)
3. [Clone and Setup `kdesrc-build`](#3-clone-and-setup-kdesrc-build)
4. [Create the Installation Directory](#4-create-the-installation-directory)
5. [Configure `kdesrc-buildrc`](#5-configure-kdesrc-buildrc)
6. [Install Required Packages](#6-install-required-packages)
7. [Build KDE](#7-build-kde)
8. [Create a Startup Script](#8-create-a-startup-script)
9. [Add a Desktop Entry to SDDM](#9-add-a-desktop-entry-to-sddm)
10. [Start KDE 6](#10-start-kde-6)

### 1. Install Qt 6.7.2

1. **Remove Existing Qt Installation** (If Needed):
   - If you need to get rid of an old Qt installation, run:
     ```bash
     sudo rm -rf /opt/qt
     ```
   - **Heads up**: This command will zap everything in `/opt/qt`. Make sure that directory is ready to be erased!

2. **Install Qt**:
   - Grab Qt from the [Qt Online Installer](https://www.qt.io/download-qt-installer) and install it to `/opt/qt`.

   - **Custom Installation**:
     - **Qt 6.7.2**
     - **CMake 3.29.3**
     - **Ninja 1.12.0**

![QT Custom Installation](../assets/plasma6-qt-custom-installation.png)

### 2. Update PATH and Environment Variables
- Add this to your `~/.bashrc` (or `~/.zshrc`), swapping `<qt-version>` with your version:
  ```bash
  echo 'export QT6DIR=/opt/qt/<qt-version>/gcc_64' >> ~/.bashrc
  echo 'export QT_SELECT=default' >> ~/.bashrc
  echo 'export QTTOOLDIR=$QT6DIR/bin' >> ~/.bashrc
  echo 'export QTLIBDIR=$QT6DIR/lib' >> ~/.bashrc
  echo 'export PATH=$QTTOOLDIR:$PATH' >> ~/.bashrc
  echo 'export PKG_CONFIG_PATH=$QTLIBDIR/pkgconfig:$PKG_CONFIG_PATH' >> ~/.bashrc
  source ~/.bashrc
  ```

### 3. Clone and Setup `kdesrc-build`
- Clone the `kdesrc-build` repository:
  ```bash
  git clone https://invent.kde.org/sdk/kdesrc-build.git
  cd kdesrc-build
  chmod +x kdesrc-build
  ```

### 4. Create the Installation Directory
- Create the installation directory:
  ```bash
  sudo mkdir /opt/plasma6
  sudo chown -R $USER:$USER /opt/plasma6
  ```

### 5. Configure `kdesrc-buildrc`
- Overwrite the contents of `~/.config/kdesrc-buildrc`:
  ```bash
  cat << EOF > ~/.config/kdesrc-buildrc
  global
      branch-group kf6-qt6
      include-dependencies true
      source-dir ~/kde/src
      build-dir ~/kde/build
      install-dir /opt/plasma6
      log-dir ~/kde/log
      cmake-options -DCMAKE_BUILD_TYPE=RelWithDebInfo
      num-cores 12
      num-cores-low-mem 7
      stop-on-failure true
      directory-layout flat
      cmake-generator Ninja
      compile-commands-linking true
      compile-commands-export true
      generate-vscode-project-config false
  end global

  include \${module-definitions-dir}/kf6-qt6.ksb
  EOF
  ```

### 6. Install Required Packages
- Install necessary build dependencies:
  ```bash
  sudo apt install cmake extra-cmake-modules
  ```

### 7. Build KDE
- Run the build process:
  ```bash
  ./kdesrc-build
  ```

### 8. Create a Startup Script
- Create `/opt/plasma6/bin/start-kde6`:
  ```bash
  #!/usr/bin/env bash
  source $USER/.config/kde-env-master.sh

  if [[ -z "$DBUS_SESSION_BUS_ADDRESS" ]]; then
    exec dbus-run-session startplasma-wayland
  else
    exec startplasma-wayland
  fi
  ```
- Make it executable:
  ```bash
  chmod +x /opt/plasma6/bin/start-kde6
  ```

### 9. Add a Desktop Entry to SDDM
- Create a Wayland session entry:
  ```bash
  sudo touch /usr/share/wayland-sessions/plasmawayland6.desktop
  sudo chown $USER /usr/share/wayland-sessions/plasmawayland6.desktop
  ```
- Add this content:
  ```ini
  [Desktop Entry]
  Exec=/opt/plasma6/bin/start-kde6
  DesktopNames=KDE6
  Name=Plasma 6 (Wayland)
  Comment=Plasma 6 by KDE
  X-KDE-PluginInfo-Version=6.7.2
  ```

### 10. Start KDE 6
- Log out and select Plasma 6 from SDDM.



