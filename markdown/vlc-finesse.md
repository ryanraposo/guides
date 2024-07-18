## VLC Finesse

Auto enable VLC extensions in the View menu.

## Install xdotool

```bash
sudo apt install xdotool
```

### Locate the VLC binary:

```bash
which vlc
```

This will give you the path to the VLC binary, typically something like /usr/bin/vlc.

### Rename the original VLC binary:

```bash
sudo mv /usr/bin/vlc /usr/bin/vlc-original
```

### Create a wrapper script to replace the VLC binary:

```bash
sudo nano /usr/bin/vlc
```

### Add the following lines to the script:

```bash
#!/bin/bash
/usr/bin/vlc-original "$@" &
sleep 2  # Adjust the sleep duration if VLC takes longer to start
xdotool key Alt+i
xdotool key Up
# Add another `xdotool key Up` depending on the extension's position in the View menu
xdotool key Return 
```

### Save the script and make it executable:

```bash
sudo chmod +x /usr/bin/vlc
```