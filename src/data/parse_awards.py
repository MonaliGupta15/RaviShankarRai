import re
import json

with open(r'C:\Users\Minali\Downloads\RaviShankarRai-8\RaviShankarRai-8\awards.php', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# split by awards_card
cards = re.split(r'<div[^>]*awards_card', html)[1:]
awards = []

for i, card in enumerate(cards):
    year_match = re.search(r'data-year="([^"]*)"', card)
    if not year_match:
        year_match = re.search(r'class="year-badge">([^<]*)<', card)
    year = year_match.group(1).strip() if year_match else ''
    
    img_match = re.search(r'src="img/awards/([^"]*)"', card)
    img = img_match.group(1).strip() if img_match else ''
    
    alt_match = re.search(r'alt="([^"]*)"', card)
    alt = alt_match.group(1).strip() if alt_match else ''
    
    by_match = re.search(r'<small>(?:Award by\s*)?([^<]*)</small>', card)
    by = by_match.group(1).strip() if by_match else ''
    if by.lower().startswith('award by'):
        by = by[8:].strip()
    
    title_match = re.search(r'<h5[^>]*class="card-title"[^>]*>(.*?)</h5>', card, re.DOTALL)
    title = re.sub(r'<[^>]+>', '', title_match.group(1)).strip() if title_match else ''
    
    text_match = re.search(r'<p[^>]*class="card-text"[^>]*>(.*?)</p>', card, re.DOTALL)
    text = re.sub(r'<[^>]+>', '', text_match.group(1)).strip() if text_match else ''
    
    awards.append({
        'id': f'award-{i+1:02d}',
        'year': year,
        'image': img,
        'alt': alt,
        'awardBy': by,
        'title': title,
        'description': text
    })

print(f'Extracted {len(awards)} awards')
with open(r'e:\MyWebpage\Ravi_Shankar_Rai_FE\src\data\awards.json', 'w', encoding='utf-8') as out:
    json.dump(awards, out, indent=2, ensure_ascii=False)
