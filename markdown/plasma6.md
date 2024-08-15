## plasma6

> This guide assumes Ubuntu 24.04

```
     .--.  
    /    \   'why does 6 come after 5?'
   (👁️👄👁️)           
    \    /     'because kde plasma 6'
```

### Table of Contents
1. [Install Required Packages](#1-install-required-packages)
2. [Install Qt 6.7.2](#2-install-qt-672)
3. [Update PATH and Environment Variables](#3-update-path-and-environment-variables)
4. [Clone and Setup `kdesrc-build`](#4-clone-and-setup-kdesrc-build)
5. [Create the Installation Directory](#5-create-the-installation-directory)
6. [Configure `kdesrc-buildrc`](#6-configure-kdesrc-buildrc)
7. [Build KDE](#7-build-kde)
8. [Create a Startup Script](#8-create-a-startup-script)
9. [Add a Desktop Entry to SDDM](#9-add-a-desktop-entry-to-sddm)
10. [Start KDE 6](#10-start-kde-6)

### 1. Install Required Packages

- Install necessary build dependencies:
  ```bash
  sudo apt update
  sudo apt install cmake extra-cmake-modules git build-essential libsecret-1-dev qtkeychain-qt6-dev libqt6keychain1
  ```

### 2. Install Qt 6.7.2

1. **Remove Existing Qt Installation** (If Needed):
   - If you need to remove an old Qt installation, run:
     ```bash
     sudo rm -rf /opt/qt
     ```
   - **Heads up**: This command will delete everything in `/opt/qt`. Make sure that directory is ready to be erased!

2. **Install Qt**:
   - Download Qt using the [Qt Online Installer](https://www.qt.io/download-qt-installer) and install it to `/opt/qt`.

   - **Custom Installation**:
     - **Qt 6.7.2**
     - **CMake 3.29.3**
     - **Ninja 1.12.0**

![QT Custom Installation](../assets/plasma6-qt-custom-installation.png)

### 3. Update PATH and Environment Variables
- Add this to your `~/.bashrc` (or `~/.zshrc`), replacing `<qt-version>` with your version:
  ```bash
  echo 'export QT6DIR=/opt/qt/<qt-version>/gcc_64' >> ~/.bashrc
  echo 'export QT_SELECT=default' >> ~/.bashrc
  echo 'export QTTOOLDIR=$QT6DIR/bin' >> ~/.bashrc
  echo 'export QTLIBDIR=$QT6DIR/lib' >> ~/.bashrc
  echo 'export PATH=$QTTOOLDIR:$PATH' >> ~/.bashrc
  echo 'export PKG_CONFIG_PATH=$QTLIBDIR/pkgconfig:$PKG_CONFIG_PATH' >> ~/.bashrc
  source ~/.bashrc
  ```

### 4. Clone and Setup `kdesrc-build`
- Clone the `kdesrc-build` repository into your home directory:
  ```bash
  git clone https://invent.kde.org/sdk/kdesrc-build.git ~/kdesrc-build
  cd ~/kdesrc-build
  chmod +x kdesrc-build
  ```

### 5. Create the Installation Directory
- Create the installation directory:
  ```bash
  sudo mkdir /opt/plasma6
  sudo chown -R $USER:$USER /opt/plasma6
  ```

### 6. Configure `kdesrc-buildrc`
- Create or overwrite the contents of `~/kdesrc-build/kdesrc-buildrc`:
  ```bash
  cat << EOF > ~/kdesrc-build/kdesrc-buildrc
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

  module plasma-desktop
      cmake-options -DBUILD_WITH_QT6=ON
  end module

  module kwin
      cmake-options -DBUILD_WITH_QT6=ON
  end module

  module plasma-workspace
      cmake-options -DBUILD_WITH_QT6=ON
  end module

  module plasma-integration
      cmake-options -DBUILD_WITH_QT6=ON
  end module

  module libksysguard
      cmake-options -DBUILD_WITH_QT6=ON
  end module

  module breeze
      cmake-options -DBUILD_WITH_QT6=ON
  end module
  
  EOF
  ```

### 7. Build KDE
- Run the build process, specifying the location of the `kdesrc-buildrc` file:
  ```bash
  ./kdesrc-build --rc-file=~/kdesrc-build/kdesrc-buildrc
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
