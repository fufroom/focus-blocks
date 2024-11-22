#!/bin/bash

# Set the output file name
OUTPUT_FILE="site-dump.txt"

# Generate project structure, ignoring .git and node_modules
echo "Project Structure:" > "$OUTPUT_FILE"
tree -a --gitignore -I ".git|node_modules" --noreport >> "$OUTPUT_FILE"

# Add file headers and concatenate the contents of all specified files
echo -e "\n\nFile Contents:" >> "$OUTPUT_FILE"

# Find all CSS, HTML, JS, JSON, and MD files, skipping .git and node_modules directories
FILES=$(find . -type f \( -name "*.css" -o -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) ! -path "./.git/*" ! -path "./node_modules/*")

# Loop through the files and append their content to the output file
for FILE in $FILES; do
    echo -e "\n\n--- $FILE ---\n" >> "$OUTPUT_FILE"
    cat "$FILE" >> "$OUTPUT_FILE"
done

echo "Site dump saved to $OUTPUT_FILE."
