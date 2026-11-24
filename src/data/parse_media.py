import re
import json

with open(r'C:\Users\Minali\Downloads\RaviShankarRai-8\RaviShankarRai-8\media-coverage.php', 'r', encoding='utf-8', errors='ignore') as f:
    media_html = f.read()

posts = []
year_sections = re.split(r'In the Year\s*(\d{4})', media_html)

for idx in range(1, len(year_sections), 2):
    y = year_sections[idx]
    section_html = year_sections[idx+1]
    
    blog_posts = re.split(r'class="blog-post', section_html)[1:]
    for bp in blog_posts:
        img_m = re.search(r'src="img/([^"]*)"', bp)
        img = img_m.group(1).strip() if img_m else ''
        
        title_m = re.search(r'<h4[^>]*class="post-title"[^>]*>.*?<a[^>]*>(.*?)</a>', bp, re.DOTALL)
        title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else ''
        
        text_m = re.search(r'<div class="dlab-post-text">\s*<p>(.*?)</p>', bp, re.DOTALL)
        text = re.sub(r'<[^>]+>', '', text_m.group(1)).strip() if text_m else ''
        
        if title:
            posts.append({
                'year': y,
                'image': img,
                'title': title,
                'description': text
            })

print(f'Extracted {len(posts)} media coverage posts')
with open(r'e:\MyWebpage\Ravi_Shankar_Rai_FE\src\data\media_coverage.json', 'w', encoding='utf-8') as out:
    json.dump(posts, out, indent=2, ensure_ascii=False)
