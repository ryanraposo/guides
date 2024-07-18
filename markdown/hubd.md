```bash
#!/bin/bash

#  _    _ _    _  ____  _____    
# | |  | | |  | ||  _ \|  __ \ 
# | |__| | |  | || |_) | |  | |
# |  __  | |  | ||  _ <| |  | |
# | |  | | |__| || |_) | |__| /
# |_|  |_|\____/||____/|_____/                              

# Downloads a specific folder from a GitHub repository using the
# GitHub API. It fetches the list of files in the specified folder and 
# downloads each file individually to the specified destination directory.

# EXAMPLE: hubd https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes -p nodes -d .

# Function to print usage
usage() {
    echo -e "\n\033[1;34mUsage:\033[0m $0 <repo_url> -p <path_to_folder> -d <download_destination>"
    echo -e "\n\033[1;34mExample:\033[0m $0 github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes -p nodes -d ."
    exit 1
}

# Check if enough arguments are provided
if [ "$#" -lt 5 ]; then
    usage
fi

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -p) folder_path="$2"; shift ;;
        -d) download_dest="$2"; shift ;;
        *) repo_url="$1" ;;
    esac
    shift
done

# Validate arguments
if [ -z "$repo_url" ] || [ -z "$folder_path" ] || [ -z "$download_dest" ]; then
    usage
fi

# Extract repo owner and name from the URL
repo_owner=$(echo "$repo_url" | cut -d'/' -f4)
repo_name=$(echo "$repo_url" | cut -d'/' -f5)

# GitHub API URL for the folder contents
api_url="https://api.github.com/repos/$repo_owner/$repo_name/contents/$folder_path"

# Fetch the list of files in the folder
response=$(curl -s "$api_url")

# Print the response for debugging
echo -e "\n\033[1;34mAPI response:\033[0m $response"

# Check if the response is valid JSON
if echo "$response" | jq . >/dev/null 2>&1; then
    file_list=$(echo "$response" | jq -r '.[] | select(.type == "file") | .download_url')

    # Check if the destination directory exists, if not create it
    mkdir -p "$download_dest"

    # Download each file
    for file_url in $file_list; do
        file_name=$(basename "$file_url")
        curl -s -L "$file_url" -o "$download_dest/$file_name"
        echo -e "\033[1;32mDownloaded $file_name to $download_dest\033[0m"
    done

    echo -e "\033[1;32mAll files downloaded to $download_dest\033[0m"
else
    echo -e "\033[1;31mError: Unable to fetch data from $api_url\033[0m"
fi
```