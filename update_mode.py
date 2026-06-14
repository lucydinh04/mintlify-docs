import os
import re

directories_to_scan = [
    'ahamazing-guide',
    'handbook',
    'policies',
    'benefits',
    'office-guide',
    'ai-hub',
    'help-center'
]

base_dir = '/Users/dvmnhi/Handbook/V2'

added_wide = []
skipped_other_mode = []

for d in directories_to_scan:
    dir_path = os.path.join(base_dir, d)
    if not os.path.isdir(dir_path):
        continue
    
    for root, _, files in os.walk(dir_path):
        for f in files:
            if f.endswith('.mdx'):
                file_path = os.path.join(root, f)
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Check for frontmatter
                match = re.match(r'^---\n(.*?)\n---(.*)', content, re.DOTALL)
                if match:
                    frontmatter = match.group(1)
                    body = match.group(2)
                    
                    if re.search(r'^mode:\s*["\']?(?!wide)[\w]+["\']?', frontmatter, re.MULTILINE):
                        # Has a mode other than wide
                        skipped_other_mode.append(file_path)
                    elif not re.search(r'^mode:\s*["\']?wide["\']?', frontmatter, re.MULTILINE):
                        # Needs wide mode
                        new_frontmatter = frontmatter + '\nmode: "wide"'
                        new_content = f'---\n{new_frontmatter}\n---{body}'
                        
                        with open(file_path, 'w', encoding='utf-8') as file:
                            file.write(new_content)
                        added_wide.append(file_path)
                else:
                    # No frontmatter
                    new_content = f'---\nmode: "wide"\n---\n{content}'
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    added_wide.append(file_path)

print("ADDED WIDE:")
for p in added_wide:
    print(p)

print("SKIPPED OTHER MODE:")
for p in skipped_other_mode:
    print(p)
