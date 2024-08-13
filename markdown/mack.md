```bash
#!/bin/bash

interface="eth0"  # Replace with your network interface name

generate_random_mac() {
    hexchars="0123456789ABCDEF"
    end=$(for i in {1..6}; do echo -n ${hexchars:$(( $RANDOM % 16 )):1}; done | sed -e 's/\(..\)/:\1/g')
    echo "02$end"
}

while true; do
    # Take the connection down
    sudo ifconfig $interface down

    # Generate a random MAC address
    random_mac=$(generate_random_mac)

    # Assign the random MAC address
    sudo ifconfig $interface hw ether $random_mac

    # Bring the connection up
    sudo ifconfig $interface up

    # Wait for 2 seconds
    sleep 2

    # Test the connection by pinging google.com
    if ping -c 1 google.com &> /dev/null; then
        echo "Connection successful!"
        break
    else
        echo "Connection failed, retrying..."
    fi
done
```
