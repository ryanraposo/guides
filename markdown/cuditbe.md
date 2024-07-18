# cuditbe

Verifies Nvidia drivers, CUDA, and cuDNN reliably in linux.

## Script

```bash
#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Nvidia driver version
if command_exists nvidia-smi; then
    DRIVER_VERSION=$(nvidia-smi --query-gpu=driver_version --format=csv,noheader)
else
    DRIVER_VERSION="NOT FOUND"
fi

# Check CUDA version
if command_exists nvcc; then
    CUDA_VERSION=$(nvcc --version | grep release | awk '{print $6}' | cut -d',' -f1)
else
    CUDA_VERSION="NOT FOUND"
fi

# Check cuDNN version
CUDNN_VERSION="NOT FOUND"
CUDNN_INFO=$(sudo grep -Rw --include 'cudnn*.h' '#define\s\+CUDNN_\(MAJOR\|MINOR\|PATCHLEVEL\)' /usr 2>/dev/null)

if [ -n "$CUDNN_INFO" ]; then
    CUDNN_MAJOR=$(echo "$CUDNN_INFO" | grep '#define CUDNN_MAJOR' | awk '{print $3}' | head -1)
    CUDNN_MINOR=$(echo "$CUDNN_INFO" | grep '#define CUDNN_MINOR' | awk '{print $3}' | head -1)
    CUDNN_PATCHLEVEL=$(echo "$CUDNN_INFO" | grep '#define CUDNN_PATCHLEVEL' | awk '{print $3}' | head -1)
    if [ -n "$CUDNN_MAJOR" ] && [ -n "$CUDNN_MINOR" ] && [ -n "$CUDNN_PATCHLEVEL" ]; then
        CUDNN_VERSION="${CUDNN_MAJOR}.${CUDNN_MINOR}.${CUDNN_PATCHLEVEL}"
    fi
fi

# Display the results with dashes for readability
echo "Nvidia Driver Version ---- $DRIVER_VERSION"
echo "CUDA Version ------------- $CUDA_VERSION"
echo "cuDNN Version ------------ $CUDNN_VERSION"
```