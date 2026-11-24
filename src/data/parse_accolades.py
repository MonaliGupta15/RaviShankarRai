import re
import json

with open(r'C:\Users\Minali\Downloads\RaviShankarRai-8\RaviShankarRai-8\accolades.php', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

items = []
cards = re.split(r'<li[^>]*card-container', html)[1:]

for c in cards:
    img_m = re.search(r'src="img/([^"]*)"', c)
    img = img_m.group(1).strip() if img_m else ''
    
    title_m = re.search(r'<h3[^>]*class="port-title"[^>]*>.*?<a[^>]*>(.*?)</a>', c, re.DOTALL)
    title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else ''
    
    # check category
    cat = 'Accolade'
    if 'brewing' in c:
        cat = 'Awards'
    elif 'beer-keg' in c:
        cat = 'Achievements'
        
    if title:
        items.append({
            'category': cat,
            'image': img,
            'title': title
        })

print(f'Extracted {len(items)} accolades')
with open(r'e:\MyWebpage\Ravi_Shankar_Rai_FE\src\data\accolades.json', 'w', encoding='utf-8') as out:
    json.dump(items, out, indent=2, ensure_ascii=False)
