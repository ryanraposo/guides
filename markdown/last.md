## last

> This guide assumes ~/bin

### Add to ~/.bashrc

```bash
# >>> cl >>> 
log_last_command() {
    local last_command=$(fc -ln -1 | sed -E 's/^[ \t]+//')  # Removes all leading spaces and tabs

    # Check if the last command is 'cl' or contains 'cl'
    if [[ "$last_command" != "cl" && "$last_command" != cl* ]]; then
        echo " > $last_command" > ~/.last
        eval "$last_command" &> ~/.last_output

        if [ -f ~/.last_output ]; then
            cat ~/.last_output >> ~/.last
            rm ~/.last_output
        fi
    fi
}

# Set a trap on DEBUG to log the last command after it runs
trap 'log_last_command' DEBUG   
# <<< cl <<<
```

### Create the `cl` script

```markdown
echo -e '#!/bin/bash\ncat ~/.last | xclip -selection clipboard' > ~/bin/cl && chmod +x ~/bin/cl
```

### Et voilà

```bash
ryan  ~  16:03 ✨ 
> cat /sys/power/mem_sleep
[s2idle] deep
ryan  ~  16:13 ✨ 
> cl

# CLIPBOARD
> cat /sys/power/mem_sleep
[s2idle] deep
```
