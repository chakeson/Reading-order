from imp import load_source
import imp
from turtle import clear
import requests, random
from time import sleep
import pickle
from bs4 import BeautifulSoup

LOAD_URL_DATA = 1

if LOAD_URL_DATA:
    url = "https://wh40k.lexicanum.com/wiki/Horus_Heresy_Series#Horus_Heresy_Characters_Novels"

    web_resutlt = requests.get(url)
    with open("request_data.txt", "w", encoding="utf-8") as f:
        f.write(web_resutlt.text)
    html_doc = BeautifulSoup(web_resutlt.text, "html.parser")
    print("Loaded page from source")
else:
    web_resutlt = open("request_data.txt", "r", encoding="utf-8")
    # web_resutlt.read()
    html_doc = BeautifulSoup(web_resutlt, "html.parser")
    print("Loaded page from save")


html_doc.prettify()
# print(html_doc)
gallery_box_Links = html_doc.find_all("div", class_="gallerytext")

link_list = []

# temp=[]
for link in gallery_box_Links:
    temp = link.find_all("a")
    link_list.append("https://wh40k.lexicanum.com" + temp[0]["href"])
print("Extracted links")

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
    try:
        title_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        title = title_doc.find_all("b")[1].string
        title = title.strip("\n")
    except:
        title = ""

    # Find the author
    try:
        author_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        author = author_doc.find(text="Author").parent.parent
        author = author.findNext("td")
        author = author.find("a")
        author = author.string
        author = author.strip("\n")
    except:
        author = ""

    # Find pages
    try:
        pages_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        pages = pages_doc.find(text="Pages")
        pages = pages.parent.parent
        pages = pages.findNext("td")
        pages = pages.decode_contents()
        pages = pages.strip("\n")
    except:
        pages = ""

    # Find length if it excists.
    try:
        length_doc = html_doc.find_all("div", class_="mw-parser-output")[1]
        length_book = length_doc.find(text="Length")
        length_book = length_book.parent.parent
        length_book = length_book.findNext("td")
        length_book = length_book.string
        length_book = length_book.strip("\n")
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
        link_black_library = link_black_library.strip("\n")
    except:
        link_black_library = ""

    i = i + 1

    book_class_instance = book_data(
        title, author, pages, length_book, link_black_library, i
    )

    data_answer.append(book_class_instance)
    print("Scrapped site:"+str(i))    

    # Wait time between requests
    wait_time = random.randint(10, 60)
    print("Waiting to next book scrape " + str(wait_time))
    sleep(wait_time)


print("Finished gathering data.")

# Write out data
# title, author, pages, length_book, link_black_library, nr
new_file = open("output.txt", "w", encoding="utf-8")
for book in data_answer:
    new_file.write("{\n")
    new_file.write("\tx: 1\n")
    new_file.write("\ty: 1\n")
    new_file.write("\tid:"+' "'+str(book.nr)+'",'+"\n")
    new_file.write("\ttitle::"+' "'+str(book.title)+'",'+"\n")
    new_file.write("\tauthor:"+' "'+str(book.author)+'",'+"\n")
    new_file.write("\tbook:"+' "",'+"\n")
    new_file.write("\tfaction:"+' [""],'+"\n")
    new_file.write("\tpages:"+'"'+str(book.pages)+'",'+"\n")
    new_file.write("\taudio:"+'"'+str(book.length_book)+'",'+"\n")
    new_file.write("\trating:"+' "",'+"\n")
    new_file.write("\tlink:"+'"'+str(book.link_black_library)+'",'+"\n")

    new_file.write("},\n")

new_file.close()

print("\nFinished writing output.txt\n")

print("Saving memory object of class")
with open("data_answer.obj", "wb") as save_file:
    pickle.dump(data_answer ,save_file)

print("Saved object")
print("Closing script")