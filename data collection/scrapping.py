#Get data from page
import re, urllib.request

url = ""

page = urllib.request.urlopen(url)
#print(page.read())
page = page.read()
page = page.decode("utf-8")  # Website contains ÅÄÖ so we need to ensure proper handling and use UTF-8 decoding since the temp comes in as a datastream of 0&1
#page = page.split("\n")

regex_pattern_book_nr = re.compile(r"<th scope=\"row\">\d*\\n</th>")
regex_pattern_title = re.compile(r"<b><a href=\"/wiki/[a-zA-Z\s_()]*\" title=\"[a-zA-Z\s_()]*\">[a-zA-Z\s]*</a>|<b><a href=\"/wiki/[a-zA-Z\s_()]*\" class=\"mw-redirect\" title=\"[a-zA-Z\s_()]*\">[a-zA-Z\s]*</a>")
regex_pattern_author = re.compile(r"<td><a href=\".*\" title=\".*\">.*</a></td>")

book_nr = regex_pattern_book_nr.findall(page)
title = regex_pattern_title.findall(page)
author = regex_pattern_author.findall(page)

print("")
