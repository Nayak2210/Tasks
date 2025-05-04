import requests
from bs4 import BeautifulSoup
import pandas as pd
from tabulate import tabulate  # Import tabulate for table printing

base_url = "https://books.toscrape.com/catalogue/page-{}.html"
book_data = []

for page in range(1, 6):  # Scrape first 5 pages
    url = base_url.format(page)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    books = soup.find_all('article', class_='product_pod')

    for book in books:
        title = book.h3.a['title']
        price = book.find('p', class_='price_color').text.strip()
        rating = book.p['class'][1]  # star-rating One/Two/Three...

        book_data.append({
            'Title': title,
            'Price': price,
            'Rating': rating
        })

# Save to CSV
df = pd.DataFrame(book_data)
# Save to CSV with utf-8 encoding to handle special characters properly
df.to_csv('books.csv', index=False, encoding='utf-8')


# Print the table in the terminal
print("\nBooks Data (Table Format):\n")
print(tabulate(book_data, headers="keys", tablefmt="pretty"))

print("\n✅ Scraping complete. Data saved in books.csv")
df.to_csv('test.csv', index=False)
