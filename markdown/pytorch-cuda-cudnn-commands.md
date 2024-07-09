# PyTorch, CUDA, cuDNN, Commands!

```
"table nice, minitorch.sh nicer. ubuntu ok."
  /
🧌
```

## Table of Contents

- [Uninstall](#uninstall)
- [Install](#install)
- [minitorch.sh](#minitorchsh)
- [Sources](#sources)

## Uninstall

```shell
sudo apt-get remove --purge '^cuda.*' 'libcudnn*'
sudo apt-get autoremove
sudo apt-get autoclean
```

## Install

|PyTorch|CUDA|cuDNN|Commands|Python|
|---|---|---|---|---|
|2.1.0|12.2|8.9.0|`sudo apt-get install cuda-12-2 libcudnn8=8.9.0.131-1+cuda12.2 libcudnn8-dev=8.9.0.131-1+cuda12.2 && pip install torch==2.1.0+cu122 -f https://download.pytorch.org/whl/torch_stable.html`|3.10|
|2.0.1|11.8|8.7.0|`sudo apt-get install cuda-11-8 libcudnn8=8.7.0.84-1+cuda11.8 libcudnn8-dev=8.7.0.84-1+cuda11.8 && pip install torch==2.0.1+cu118 -f https://download.pytorch.org/whl/torch_stable.html`|3.9|
|2.0.0|11.8|8.7.0|`sudo apt-get install cuda-11-8 libcudnn8=8.7.0.84-1+cuda11.8 libcudnn8-dev=8.7.0.84-1+cuda11.8 && pip install torch==2.0.0+cu118 -f https://download.pytorch.org/whl/torch_stable.html`|3.9|
|1.13.1|11.7|8.5.0|`sudo apt-get install cuda-11-7 libcudnn8=8.5.0.96-1+cuda11.7 libcudnn8-dev=8.5.0.96-1+cuda11.7 && pip install torch==1.13.1+cu117 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.13.0|11.7|8.5.0|`sudo apt-get install cuda-11-7 libcudnn8=8.5.0.96-1+cuda11.7 libcudnn8-dev=8.5.0.96-1+cuda11.7 && pip install torch==1.13.0+cu117 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.12.1|11.6|8.4.0|`sudo apt-get install cuda-11-6 libcudnn8=8.4.0.27-1+cuda11.6 libcudnn8-dev=8.4.0.27-1+cuda11.6 && pip install torch==1.12.1+cu116 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.12.0|11.6|8.4.0|`sudo apt-get install cuda-11-6 libcudnn8=8.4.0.27-1+cuda11.6 libcudnn8-dev=8.4.0.27-1+cuda11.6 && pip install torch==1.12.0+cu116 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.11.0|11.5|8.2.0|`sudo apt-get install cuda-11-5 libcudnn8=8.2.0.53-1+cuda11.5 libcudnn8-dev=8.2.0.53-1+cuda11.5 && pip install torch==1.11.0+cu115 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.10.1|11.3|8.2.0|`sudo apt-get install cuda-11-3 libcudnn8=8.2.0.53-1+cuda11.3 libcudnn8-dev=8.2.0.53-1+cuda11.3 && pip install torch==1.10.1+cu113 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.10.0|11.3|8.2.0|`sudo apt-get install cuda-11-3 libcudnn8=8.2.0.53-1+cuda11.3 libcudnn8-dev=8.2.0.53-1+cuda11.3 && pip install torch==1.10.0+cu113 -f https://download.pytorch.org/whl/torch_stable.html`|3.8|
|1.9.1|11.1|8.1.0|`sudo apt-get install cuda-11-1 libcudnn8=8.1.0.77-1+cuda11.1 libcudnn8-dev=8.1.0.77-1+cuda11.1 && pip install torch==1.9.1+cu111 -f https://download.pytorch.org/whl/torch_stable.html`|3.7|
|1.9.0|11.1|8.1.0|`sudo apt-get install cuda-11-1 libcudnn8=8.1.0.77-1+cuda11.1 libcudnn8-dev=8.1.0.77-1+cuda11.1 && pip install torch==1.9.0+cu111 -f https://download.pytorch.org/whl/torch_stable.html`|3.7|
|1.8.1|11.1|8.0.5|`sudo apt-get install cuda-11-1 libcudnn8=8.0.5.39-1+cuda11.1 libcudnn8-dev=8.0.5.39-1+cuda11.1 && pip install torch==1.8.1+cu111 -f https://download.pytorch.org/whl/torch_stable.html`|3.7|
|1.8.0|11.1|8.0.5|`sudo apt-get install cuda-11-1 libcudnn8=8.0.5.39-1+cuda11.1 libcudnn8-dev=8.0.5.39-1+cuda11.1 && pip install torch==1.8.0+cu111 -f https://download.pytorch.org/whl/torch_stable.html`|3.7|

## minitorch.sh

```bash
#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./minitorch.sh <pytorch_version>"
    exit 1
fi

PYTORCH_VERSION=$1
ENV_NAME="torch_$PYTORCH_VERSION"

echo "Creating Miniconda environment for PyTorch $PYTORCH_VERSION..."

eval "$(~/miniconda3/bin/conda shell.bash hook)"

declare -A versions=(
    ["2.1.2"]="3.10 12.2 8.9.0 2.1.2+cu121"
    ["2.1.0"]="3.10 12.2 8.9.0 2.1.0+cu121"
    ["2.0.1"]="3.9 11.8 8.7.0 2.0.1+cu118"
    ["2.0.0"]="3.9 11.8 8.7.0 2.0.0+cu118"
    ["1.13.1"]="3.8 11.7 8.5.0 1.13.1+cu117"
    ["1.13.0"]="3.8 11.7 8.5.0 1.13.0+cu117"
    ["1.12.1"]="3.8 11.6 8.4.0 1.12.1+cu116"
    ["1.12.0"]="3.8 11.6 8.4.0 1.12.0+cu116"
    ["1.11.0"]="3.8 11.5 8.2.0 1.11.0+cu115"
    ["1.10.1"]="3.8 11.3 8.2.0 1.10.1+cu113"
    ["1.10.0"]="3.8 11.3 8.2.0 1.10.0+cu113"
    ["1.9.1"]="3.7 11.1 8.1.0 1.9.1+cu111"
    ["1.9.0"]="3.7 11.1 8.1.0 1.9.0+cu111"
    ["1.8.1"]="3.7 11.1 8.0.5 1.8.1+cu111"
    ["1.8.0"]="3.7 11.1 8.0.5 1.8.0+cu111"
)

if [[ -z "${versions[$PYTORCH_VERSION]}" ]]; then
    echo "Unsupported PyTorch version: $PYTORCH_VERSION"
    exit 1
fi

read -r python_version cuda_version cudnn_version torch_version <<< "${versions[$PYTORCH_VERSION]}"

check_cuda_cudnn_availability() {
    local cuda_version=$1
    local cudnn_version=$2

    # Check CUDA availability
    wget --spider --quiet https://developer.download.nvidia.com/compute/cuda/${cuda_version}/local_installers/cuda_${cuda_version}_linux.run
    if [ $? -ne 0 ]; then
        echo "CUDA version ${cuda_version} is not available."
        return 1
    fi

    # Check cuDNN availability
    wget --spider --quiet https://developer.download.nvidia.com/compute/redist/cudnn/v${cudnn_version}/cudnn-linux-x86_64-${cudnn_version}.tgz
    if [ $? -ne 0 ]; then
        echo "cuDNN version ${cudnn_version} is not available."
        return 1
    fi

    return 0
}

confirm_installation() {
    echo "The required versions of CUDA and cuDNN are available. Do you want to proceed with the installation? (yes/no)"
    read answer
    if [ "$answer" != "${answer#[Yy]}" ]; then
        return 0
    else
        echo "Installation aborted."
        exit 1
    fi
}

create_env_and_install() {
    local python_version=$1
    local cuda_version=$2
    local cudnn_version=$3
    local torch_version=$4

    conda create -n $ENV_NAME python=$python_version -y
    conda activate $ENV_NAME
    
    # Download and install CUDA
    wget https://developer.download.nvidia.com/compute/cuda/${cuda_version}/local_installers/cuda_${cuda_version}_linux.run
    sudo sh cuda_${cuda_version}_linux.run --silent --toolkit
    
    # Download and install cuDNN
    wget https://developer.download.nvidia.com/compute/redist/cudnn/v${cudnn_version}/cudnn-linux-x86_64-${cudnn_version}.tgz
    tar -xzvf cudnn-linux-x86_64-${cudnn_version}.tgz
    sudo cp -P cuda/include/cudnn*.h /usr/local/cuda/include
    sudo cp -P cuda/lib64/libcudnn* /usr/local/cuda/lib64
    sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*
    
    # Set environment variables
    export PATH=/usr/local/cuda/bin${PATH:+:${PATH}}
    export LD_LIBRARY_PATH=/usr/local/cuda/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}

    pip install torch==$torch_version -f https://download.pytorch.org/whl/torch_stable.html
}

check_cuda_cudnn_availability $cuda_version $cudnn_version && confirm_installation
create_env_and_install $python_version $cuda_version $cudnn_version $torch_version

echo "Miniconda environment $ENV_NAME with PyTorch $PYTORCH_VERSION has been created successfully."
```

## Sources

- [NVIDIA CUDA Toolkit Documentation](https://docs.nvidia.com/cuda/)
- [PyTorch Installation Guide](https://pytorch.org/get-started/locally/)
- [cuDNN Installation Guide](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html)
