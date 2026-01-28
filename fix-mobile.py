import re

# Read the file
with open(r'c:\Users\simra\OneDrive\Desktop\V-SPAA\css\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and remove the old @media (max-width: 992px) block and everything after it until the floating buttons section
# We'll keep everything before line 955 and then add our new mobile CSS

lines = content.split('\n')
# Keep lines 0-954 (index 0-953)
new_content_lines = lines[:954]

# Add the optimized mobile CSS
with open(r'c:\Users\simra\OneDrive\Desktop\V-SPAA\css\mobile-optimized.css', 'r', encoding='utf-8') as f:
    mobile_css = f.read()

new_content = '\n'.join(new_content_lines) + '\n' + mobile_css

# Write back
with open(r'c:\Users\simra\OneDrive\Desktop\V-SPAA\css\style.css', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Mobile CSS optimized successfully!")
