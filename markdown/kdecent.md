## kdecent

> this guide assumes KDE Neon (User Edition) 

```basj
kde-gnome-crybaby `# ` \
yaokuake         `#     \\ \\` \
krunner      `#      \\ ` \
systemsitting `#\        \\.--. 'i miss my old desktop'\\` \
ark                `#\   /       \\        \\ ` \
whenview         `#\    \\(👁️👄👁️) 'it just doesn’t feel right' \\` \
ksysguard       `#\     \\     /  \\             \\` \
--ignore-complaints=gnome `#\\   |   'give me kde back' \\` \
konsole (me) `#     \\  /\   \\`
```

### Script

```bash
#!/bin/bash

# akay here we go jeescraz 𝠼

# Setup log file
LOG_FILE=~/kde_neon_setup.log
exec > >(tee -a $LOG_FILE) 2>&1
echo "Starting KDE Neon setup..."

# Basic Update
echo "Updating package lists..."
sudo pkcon refresh

# Firefox
echo "Installing Firefox..."
sudo pkcon install -y firefox

# Git and Credential Setup
echo "Installing Git and setting up credentials..."
sudo pkcon install -y git
git config --global credential.helper store

# VS Code
echo "Installing VS Code..."
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo pkcon refresh
sudo pkcon install -y code

# Miniconda
echo "Installing Miniconda..."
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3
rm Miniconda3-latest-Linux-x86_64.sh
eval "$($HOME/miniconda3/bin/conda shell.bash hook)"
conda init
source ~/.bashrc

# Node.js and NVM
echo "Installing Node.js and NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install node
nvm use node

# Google Drive (Streaming Access)
echo "Setting up Google Drive access at ~/gdrive..."
sudo pkcon install -y google-drive-ocamlfuse
mkdir ~/gdrive
google-drive-ocamlfuse ~/gdrive

# Obsidian
echo "Installing Obsidian..."
wget https://github.com/obsidianmd/obsidian-releases/releases/download/v1.0.3/Obsidian-1.0.3.AppImage -O ~/Obsidian.AppImage
chmod +x ~/Obsidian.AppImage
sudo mv ~/Obsidian.AppImage /usr/local/bin/obsidian

# Discord
echo "Installing Discord..."
wget -O discord.deb "https://discordapp.com/api/download?platform=linux&format=deb"
sudo dpkg -i discord.deb
sudo apt-get install -f -y

# OBS
echo "Installing OBS..."
sudo pkcon install -y obs-studio

# Flashprint
echo "Installing Flashprint..."
wget https://cdn.flashforge.com/download/software/flashprint/FlashPrint-x86_64.AppImage -O ~/FlashPrint.AppImage
chmod +x ~/FlashPrint.AppImage
sudo mv ~/FlashPrint.AppImage /usr/local/bin/flashprint

# Blender
echo "Installing Blender..."
sudo pkcon install -y blender

# Kdenlive
echo "Installing Kdenlive..."
sudo pkcon install -y kdenlive

# Remmina
echo "Installing Remmina..."
sudo pkcon install -y remmina

# Spotify
echo "Installing Spotify..."
curl -sS https://download.spotify.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
sudo pkcon refresh
sudo pkcon install -y spotify-client

# VLC
echo "Installing VLC..."
sudo pkcon install -y vlc

# Yakuake
echo "Installing Yakuake..."
sudo pkcon install -y yakuake

# KMail (Optional: Kontact)
echo "Installing KMail..."
sudo pkcon install -y kmail

# Webcam support
echo "Installing webcam support packages..."
sudo pkcon install -y cheese guvcview v4l-utils

# Nvidia Drivers
echo "Installing Nvidia Drivers..."
sudo pkcon install -y nvidia-driver-530
echo "Nvidia drivers installed. A reboot is required to continue. Reboot now? (y/n)"
read REBOOT_CHOICE
if [ "$REBOOT_CHOICE" == "y" ]; then
    echo "Rebooting now..."
    sudo reboot
else
    echo "Please reboot manually to apply Nvidia drivers before continuing."
    exit 1
fi

# Resume CUDA and cuDNN installation after reboot
echo "Installing CUDA and cuDNN..."
sudo pkcon install -y nvidia-cuda-toolkit libcudnn8

# Create ~/bin directory and add to path
echo "Creating ~/bin directory and adding to PATH..."
mkdir -p ~/bin
echo "export PATH=\$HOME/bin:\$PATH" >> ~/.bashrc
source ~/.bashrc

# Backup setup (timelined)
echo "Setting up backup workflow with rsync and crontab..."
sudo pkcon install -y rsync
(crontab -l 2>/dev/null; echo "0 2 * * * rsync -a --delete ~/important_files /path/to/backup/folder") | crontab -

# Installing Development and Build Tools
echo "Installing development tools and libraries..."
sudo pkcon install -y build-essential gcc g++ cmake git pkg-config libssl-dev \
zlib1g-dev libbz2-dev libffi-dev curl wget libtool autoconf automake \
python3-dev docker.io

# Installing FFmpeg and multimedia tools
echo "Installing FFmpeg and multimedia tools..."
sudo pkcon install -y ffmpeg imagemagick vlc inkscape

# Additional utilities
echo "Installing common Linux utilities..."
sudo pkcon install -y vim htop ncdu net-tools gimp

# Finish up
echo "Setup complete. Please reboot for all changes to take effect!"
```