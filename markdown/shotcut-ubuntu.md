---
layout: default
title: Shotcut (Ubuntu)
---

# Shotcut (Ubuntu)

## Installing Shotcut on Ubuntu 24.04
1. **Using AppImage:**
   - Download the Shotcut AppImage from the [official website](https://shotcut.org/download/).
   - Make the AppImage executable:
     ```sh
     chmod +x Shotcut-version.AppImage
     ```
   - Run the AppImage:
     ```sh
     ./Shotcut-version.AppImage
     ```

2. **Using Snap:**
   - Install Shotcut via Snap:
     ```sh
     sudo snap install shotcut --classic
     ```

## Transferring Videos from iPhone to Ubuntu
1. **Using USB Cable:**
   - Connect your iPhone to your ThinkPad using a USB cable.
   - Open the Files application and navigate to your iPhone under 'Devices'.
   - Copy the videos to your local storage.

2. **Using AirDrop Alternatives:**
   - Install `KDE Connect` on your ThinkPad and the KDE Connect app on your iPhone.
   - Use KDE Connect to wirelessly transfer files between your iPhone and Ubuntu system.

3. **Using iCloud:**
   - Access your iCloud Drive via a web browser and download your videos to your local storage.

## Optimizing Shotcut Performance
1. **Update Graphics Drivers:**
   - Ensure your graphics drivers are up-to-date. For NVIDIA cards, you can use the following commands:
     ```sh
     sudo ubuntu-drivers autoinstall
     sudo reboot
     ```

2. **Enable GPU Processing:**
   - Open Shotcut and go to `Settings` > `GPU Effects` and enable GPU processing.

3. **Configure Proxy Editing:**
   - Enable proxy editing to handle high-resolution video more smoothly:
     - Go to `Settings` > `Proxy` > `Use Proxy`
     - Configure proxy resolution and format under `Settings` > `Proxy` > `Proxy Resolution` and `Proxy Format`.

## Editing Workflow in Shotcut
1. **Import Videos:**
   - Open Shotcut and click on `Open File` to import your videos.

2. **Organize Clips:**
   - Drag your video files to the timeline and organize them as needed.

3. **Editing Tools:**
   - Use the timeline to trim, cut, and arrange clips.
   - Apply filters and effects from the `Filters` tab.
   - Add transitions by overlapping clips on the timeline.

4. **Audio Editing:**
   - Use audio filters and adjustments to enhance your video's sound quality.

5. **Exporting:**
   - Once editing is complete, click on `Export` and choose your desired format and settings.
   - Use presets for common platforms like YouTube, Vimeo, or custom export settings for specific needs.

## Additional Tips
- **Save Regularly:** Save your project frequently to avoid losing progress.
- **Utilize Keyboard Shortcuts:** Familiarize yourself with Shotcut's keyboard shortcuts to speed up your editing process.
- **Learn from Tutorials:** Explore Shotcut tutorials available on their [official website](https://shotcut.org/tutorials/) or YouTube for more advanced techniques and tips.