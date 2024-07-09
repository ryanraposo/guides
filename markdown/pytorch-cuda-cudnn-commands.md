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

### minitorch.sh

```bash
#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./minitorch.sh <pytorch_version>"
    exit 1
fi

PYTORCH_VERSION=$1
ENV_NAME="torch_$PYTORCH_VERSION"

echo "Creating Miniconda environment for PyTorch $PYTORCH_VERSION..."

if [[ "$PYTORCH_VERSION" == "2.1.0" ]]; then
    conda create -n $ENV_NAME python=3.10 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-12-2 libcudnn8=8.9.0.131-1+cuda12.2 libcudnn8-dev=8.9.0.131-1+cuda12.2
    pip install torch==2.1.0+cu122 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "2.0.1" ]]; then
    conda create -n $ENV_NAME python=3.9 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-8 libcudnn8=8.7.0.84-1+cuda11.8 libcudnn8-dev=8.7.0.84-1+cuda11.8
    pip install torch==2.0.1+cu118 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "2.0.0" ]]; then
    conda create -n $ENV_NAME python=3.9 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-8 libcudnn8=8.7.0.84-1+cuda11.8 libcudnn8-dev=8.7.0.84-1+cuda11.8
    pip install torch==2.0.0+cu118 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.13.1" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-7 libcudnn8=8.5.0.96-1+cuda11.7 libcudnn8-dev=8.5.0.96-1+cuda11.7
    pip install torch==1.13.1+cu117 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.13.0" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-7 libcudnn8=8.5.0.96-1+cuda11.7 libcudnn8-dev=8.5.0.96-1+cuda11.7
    pip install torch==1.13.0+cu117 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.12.1" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-6 libcudnn8=8.4.0.27-1+cuda11.6 libcudnn8-dev=8.4.0.27-1+cuda11.6
    pip install torch==1.12.1+cu116 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.12.0" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-6 libcudnn8=8.4.0.27-1+cuda11.6 libcudnn8-dev=8.4.0.27-1+cuda11.6
    pip install torch==1.12.0+cu116 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.11.0" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-5 libcudnn8=8.2.0.53-1+cuda11.5 libcudnn8-dev=8.2.0.53-1+cuda11.5
    pip install torch==1.11.0+cu115 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.10.1" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-3 libcudnn8=8.2.0.53-1+cuda11.3 libcudnn8-dev=8.2.0.53-1+cuda11.3
    pip install torch==1.10.1+cu113 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.10.0" ]]; then
    conda create -n $ENV_NAME python=3.8 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-3 libcudnn8=8.2.0.53-1+cuda11.3 libcudnn8-dev=8.2.0.53-1+cuda11.3
    pip install torch==1.10.0+cu113 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.9.1" ]]; then
    conda create -n $ENV_NAME python=3.7 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-1 libcudnn8=8.1.0.77-1+cuda11.1 libcudnn8-dev=8.1.0.77-1+cuda11.1
    pip install torch==1.9.1+cu111 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.9.0" ]]; then
    conda create -n $ENV_NAME python=3.7 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-1 libcudnn8=8.1.0.77-1+cuda11.1 libcudnn8-dev=8.1.0.77-1+cuda11.1
    pip install torch==1.9.0+cu111 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.8.1" ]]; then
    conda create -n $ENV_NAME python=3.7 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-1 libcudnn8=8.0.5.39-1+cuda11.1 libcudnn8-dev=8.0.5.39-1+cuda11.1
    pip install torch==1.8.1+cu111 -f https://download.pytorch.org/whl/torch_stable.html
elif [[ "$PYTORCH_VERSION" == "1.8.0" ]]; then
    conda create -n $ENV_NAME python=3.7 -y
    conda activate $ENV_NAME
    sudo apt-get install cuda-11-1 libcudnn8=8.0.5.39-1+cuda11.1 libcudnn8-dev=8.0.5.39-1+cuda11.1
    pip install torch==1.8.0+cu111 -f https://download.pytorch.org/whl/torch_stable.html
else
    echo "Unsupported PyTorch version: $PYTORCH_VERSION"
    exit 1
fi

echo "Miniconda environment $ENV_NAME with PyTorch $PYTORCH_VERSION has been created successfully."
```

## Sources

- [NVIDIA CUDA Toolkit Documentation](https://docs.nvidia.com/cuda/)
- [PyTorch Installation Guide](https://pytorch.org/get-started/locally/)
- [cuDNN Installation Guide](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html)
