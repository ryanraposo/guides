---
layout: default
title: For Dad
---

# For Dad

> This guide assumes dad.

## Checklist

- [ ] [Backup important folders & files](#1-backup-your-pc)
- [ ] [Retrieve your Windows license key](#b-license-key)
- [ ] [Deregister the Windows license key](#b-license-key)
- [ ] [Create a Windows 10 installation USB drive](#2-create-bootable-windows-10-usb)
- [ ] [Install the SSD (SN850X) in the M.2 slot](#3-install-new-ssd-sn850x-in-adams-pc)
- [ ] [Configure BIOS (AHCI mode)](#4-configure-bios)
- [ ] [Configure BIOS (USB -> SSD boot order)](#4-configure-bios)
- [ ] [Boot from the Windows 10 USB drive and install Windows](#5-install-windows-10)
- [ ] [Activate Windows using the saved license key](#5-install-windows-10)
- [ ] [Upgrade to Windows 11](#6-upgrade-to-windows-11)

---
## 1. Backup Your PC

### a) Important Files
- Copy your important files to a USB drive.

### b) License Key
- Press `Win` key, type “cmd”, right-click on Command Prompt, and select "Run as administrator".
- Get Windows 10 Product Key:
```bash
wmic path softwarelicensingservice get OA3xOriginalProductKey
```
- Uninstall Windows 10 Product Key:
```bash
slmgr /upk
```
- Remove Windows 10 Product Key from the Registry
```bash
slmgr /cpky
```

## 2. Create bootable Windows 10 USB

### a) Download the Tool
- Go to the [Windows 10 download page](https://www.microsoft.com/software-download/windows10) and download the Media Creation Tool.

### b) Create the USB Drive
- Use a different USB drive than the one used for backup.
- Run the tool and follow the prompts to create a Windows 10 installation USB drive.

## 3. Install new SSD (SN850X) in Adam’s PC

### a) Remove Existing Drives and Install the SSD
- Disconnect and remove any existing drives that need to be replaced or removed.
- Insert the SN850X SSD into the M.2 slot and secure it with the provided screw.
- The M.2 slots are behind sinks:

![m2](https://i.ibb.co/GM8S2Tv/M2.jpg)

## 4. Configure BIOS

- Enter BIOS by pressing `Del` or `F2` at startup.
- Navigate to the Boot section and ensure the M.2 SSD is recognized.
- Enable AHCI mode for better SSD performance:
    - Go to Advanced > SATA Configuration > Set SATA Mode Selection to AHCI.
- Set the boot order to USB -> SSD -> Whatever else
- Save changes and exit BIOS.

## 5. Install Windows 10

### a) Install Windows
- Follow the on-screen instructions to install Windows 10 from the bootable USB drive.
- Make sure you're installing on the new SSD drive (SN850X).
- Use the key you saved earlier to activate Windows.

## 6. Upgrade to Windows 11

### a) Check for Updates
- Go to "Settings" > "Update & Security" > "Windows Update".

### b) Upgrade
- Follow the prompts to upgrade to Windows 11 if available.
