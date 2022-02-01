from imp import load_source
from turtle import clear
import requests, random
from time import sleep
from bs4 import BeautifulSoup

LOAD_URL_DATA = 0

if LOAD_URL_DATA:
    url = "https://wh40k.lexicanum.com/wiki/Horus_Heresy_Series#Horus_Heresy_Characters_Novels"

    web_resutlt = requests.get(url)
    with open("request_data.txt", "w", encoding="utf-8") as f:
        f.write(web_resutlt.text)
    html_doc = BeautifulSoup(web_resutlt.text, "html.parser")
else:
    web_resutlt = open("request_data.txt", "r", encoding="utf-8")
    # web_resutlt.read()
    html_doc = BeautifulSoup(web_resutlt, "html.parser")


html_doc.prettify()
# print(html_doc)
gallery_box_Links = html_doc.find_all("div", class_="gallerytext")

link_list = []

# temp=[]
for link in gallery_box_Links:
    temp = link.find_all("a")
    link_list.append("https://wh40k.lexicanum.com" + temp[0]["href"])

try:
    del link, temp, gallery_box_Links, html_doc, web_resutlt, LOAD_URL_DATA
except:
    pass


# Process all links to get data.
# Class to store data about the wine
class book_data:
    def __init__(self, title, author, pages, length_book, link_black_library, nr):
        self.title = title
        self.author = author
        self.pages = pages
        self.length_book = length_book
        self.link_black_library = link_black_library
        self.nr = nr


data_answer = []

i = 0
for link in link_list:
    web_resutlt = requests.get(link)
    html_doc = BeautifulSoup(web_resutlt.text, "html.parser")

    # Find title
    title_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
    title = title_doc.find_all("b")[1].string

    # Find the author
    author_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
    author = author_doc.find(text="Author").parent.parent
    author = author.findNext("td")
    author = author.find("a")
    author = author.string

    # Find pages
    try:
        pages_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        pages = pages_doc.find(text="Pages")
        pages = pages.parent.parent
        pages = pages.findNext("td")
        pages = pages.decode_contents()
    except:
        pages = ""

    # Find length if it excists.
    try:
        length_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        length_book = length_doc.find(text="Length")
        length_book = length_book.parent.parent
        length_book = length_book.findNext("td")
        length_book = length_book.string
    except:
        length_book = ""

    # Find black libary link
    try:
        link_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        link_black_library = link_doc.find_all(text="Sources")[1]
        link_black_library = link_black_library.parent.parent
        link_black_library = link_black_library.findNext("ul")
        link_black_library = link_black_library.find("li")
        link_black_library = link_black_library.find("a", class_="external text")
        link_black_library = link_black_library["href"]
    except:
        link_black_library = ""

    i = i + 1

    book_class_instance = book_data(
        title, author, pages, length_book, link_black_library, i
    )

    data_answer.append(book_class_instance)

    # Wait time between requests
    wait_time = random.randint(10, 100)
    sleep(wait_time)


print("Finished gathering data.")

# Write out data
# title, author, pages, length_book, link_black_library, nr
new_file = open("output.txt", "w", encoding="utf-8")
for book in data_answer:
    new_file.write(book.nr)
    new_file.write(book.title)
    new_file.write(book.author)
    new_file.write(book.pages)
    new_file.write(book.length_book)
    new_file.write(book.link_black_library)
    new_file.write("\n")
    new_file.write("\n")


new_file.close()

"Finished"