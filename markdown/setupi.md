## setupi

> This guide assumes Raspberry Pi w/ Ubuntu (https://ubuntu.com/download/raspberry-pi)

```bash
#!/bin/bash

###############################################################################
#                          🚀 RASPBERRY PI JUMPSTART 🚀                         
###############################################################################
# This script configures an Ubuntu-based Raspberry Pi system for immediate use:
# 
# - Updates system packages and firmware.
# - Configures the hostname.
# - Creates or updates a user account with sudo privileges.
# - Sets up WiFi with a static IP configuration.
# - Enables SSH with password authentication and provides guidance for 
#   key-based authentication.
#
# Accessing a USB Drive on the Raspberry Pi:
#
# 1. Identify the USB drive (usually sda)
# lsblk
#
# 2. Create a mount point
# sudo mkdir -p /mnt/sda
#
# 3. Mount the USB drive
# sudo mount /dev/sda /mnt/sda
#
# 4. Access it
# cd /mnt/sda
#
# 📘 Full guide and more details:
# https://ryanraposo.github.io/guides/markdown/setupi.html
#
# 📂 To download this script directly and execute it:
# wget https://ryanraposo.github.io/assets/setupi -O setupi
# chmod +x setupi
# ./setupi
#
###############################################################################

# Prompt for hostname
read -p "Enter a hostname [default: pi]: " HOSTNAME
HOSTNAME=${HOSTNAME:-pi}

# Prompt for custom user credentials
read -p "Enter a username [default: ubuntu]: " NEW_USER
NEW_USER=${NEW_USER:-ubuntu}
read -s -p "Enter password for the user '$NEW_USER': " NEW_USER_PASSWORD
echo

# Prompt for WiFi details with defaults
read -p "Enter WiFi SSID [default: mywifi]: " WIFI_SSID
WIFI_SSID=${WIFI_SSID:-mywifi}

read -s -p "Enter WiFi Password [default: password123]: " WIFI_PASSWORD
WIFI_PASSWORD=${WIFI_PASSWORD:-password123}
echo

read -p "Enter desired static IP [default: 192.168.1.100]: " STATIC_IP
STATIC_IP=${STATIC_IP:-192.168.1.100}

read -p "Enter gateway IP [default: 192.168.1.1]: " GATEWAY_IP
GATEWAY_IP=${GATEWAY_IP:-192.168.1.1}

read -p "Enter DNS servers [default: 8.8.8.8,8.8.4.4]: " DNS_SERVERS
DNS_SERVERS=${DNS_SERVERS:-8.8.8.8,8.8.4.4}

# Set the hostname
echo "Setting hostname to '$HOSTNAME'..."
sudo hostnamectl set-hostname "$HOSTNAME"
echo "$STATIC_IP $HOSTNAME" | sudo tee -a /etc/hosts

# Update and upgrade system packages
echo "Updating and upgrading system packages..."
sudo apt update && sudo apt upgrade -y

# Install Raspberry Pi-specific firmware updater if not already installed
if ! command -v rpi-update &>/dev/null; then
    echo "Installing rpi-update (Raspberry Pi firmware updater)..."
    sudo apt install -y rpi-update
fi

# Update Raspberry Pi firmware
echo "Updating Raspberry Pi firmware..."
sudo rpi-update

# Create the new user
echo "Creating or updating user '$NEW_USER'..."
if id "$NEW_USER" &>/dev/null; then
    echo "User '$NEW_USER' already exists, updating password."
else
    sudo adduser --disabled-password --gecos "" "$NEW_USER"
fi
echo "$NEW_USER:$NEW_USER_PASSWORD" | sudo chpasswd

# Grant the new user sudo privileges
echo "Granting sudo privileges to '$NEW_USER'..."
sudo usermod -aG sudo "$NEW_USER"

# Install and activate NetworkManager
echo "Installing and enabling NetworkManager..."
sudo apt install --reinstall -y network-manager
sudo systemctl enable NetworkManager
sudo systemctl start NetworkManager
sudo sh -c 'echo -e "\n[keyfile]\nunmanaged-devices=none" >> /etc/NetworkManager/NetworkManager.conf'
sudo systemctl restart NetworkManager

# Configure WiFi 
echo "Configuring WiFi with nmcli..."
nmcli dev wifi connect "$WIFI_SSID" password "$WIFI_PASSWORD" ifname wlan0
nmcli con modify "$WIFI_SSID" ipv4.addresses "$STATIC_IP/24" ipv4.gateway "$GATEWAY_IP" ipv4.dns "$DNS_SERVERS" ipv4.method manual
nmcli con up "$WIFI_SSID"

# Enable SSH with password authentication
echo "Enabling SSH with password authentication..."
sudo systemctl enable ssh
sudo systemctl start ssh

# Ensure SSH password authentication is allowed
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication no/#PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Final output
echo "🎉 Configuration complete!"
echo "Hostname has been set to '$HOSTNAME'."
echo "User '$NEW_USER' has been created or updated, WiFi and SSH configuration are complete!"
echo
echo "👉 To set up SSH key authentication between this system and another workstation:"
echo "   1. On your workstation, generate an SSH key (if you don't already have one):"
echo "      ssh-keygen -t rsa -b 4096 -C \"your_email@example.com\""
echo
echo "   2. Copy your public key to this system:"
echo "      ssh-copy-id $NEW_USER@$STATIC_IP"
echo
echo "   3. Test the key-based login:"
echo "      ssh $NEW_USER@$STATIC_IP"
echo
```

Bonus:

```bash
#!/bin/bash

###############################################################################
#                             🎨 XFCE SETUP SCRIPT 🎨                           
###############################################################################
# This script configures an Ubuntu system with XFCE4, LightDM, and multimedia 
# codecs for a lightweight, fully-featured desktop environment.
#
# - Installs XFCE4 desktop environment and LightDM display manager.
# - Installs multimedia codecs (restricted extras and GStreamer plugins).
# - Configures LightDM to use XFCE as the default session.
#
# After running this script, a reboot is required to apply changes.
#
# 📘 Full guide and more details:
# https://ryanraposo.github.io/guides/markdown/setupi.html
#
# 📂 To download the 'pivid' script directly and execute it:
# wget https://ryanraposo.github.io/assets/pivid -O pivid
# chmod +x pivid
# ./pivid
#
###############################################################################

# Update system and install required packages
echo "🔄 Updating the system, installing XFCE4 desktop environment, video codecs..."
sudo apt update && sudo apt install -y \
    xfce4 lightdm ubuntu-restricted-extras vlc ffmpeg \
    gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly \
    libavcodec-extra libavutil-dev libavformat-dev libswscale-dev libavfilter-dev libavdevice-dev 

# Reconfigure LightDM to set it as the default display manager
echo "⚙️ Configuring LightDM as the default display manager..."
sudo dpkg-reconfigure lightdm

# Configure LightDM to use XFCE as the default session
echo "🖌️ Setting XFCE as the default session in LightDM..."
sudo bash -c 'cat <<EOF > /etc/lightdm/lightdm.conf
[Seat:*]
user-session=xfce
EOF'

# Final instructions
echo
echo "🎉 Installation complete! Please reboot your system to start using XFCE."
echo "🚀 To reboot now, run: sudo reboot"
echo
echo "💡 Once rebooted, log in and select the XFCE session if it's not already set."
echo "==========================================="
```