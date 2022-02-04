import pickle

class book_data:
    def __init__(self, title, author, pages, length_book, link_black_library, nr):
        self.title = title
        self.author = author
        self.pages = pages
        self.length_book = length_book
        self.link_black_library = link_black_library
        self.nr = nr


with open(r"data_answer.obj", "rb") as input_file:
   data_answer = pickle.load(input_file)



new_file = open("output_from_obj.tsx", "w", encoding="utf-8")
new_file.write("const horusHeresyDataBooks = [\n")
for book in data_answer:
    new_file.write("{\n")
    new_file.write("\tx: 1,\n")
    new_file.write("\ty: 1,\n")
    new_file.write("\tid:"+' '+str(book.nr)+','+"\n")
    new_file.write("\ttitle:"+' "'+str(book.title)+'",'+"\n")
    new_file.write("\tauthor:"+' "'+str(book.author)+'",'+"\n")
    
    if book.nr < 55:
        new_file.write("\tbook:"+'"Book '+str(book.nr)+'",'+"\n")
    elif book.nr < 63:
        new_file.write("\tbook:"+'"Siege of Terra",'+"\n")
    elif book.nr < 80:
        new_file.write("\tbook:"+'"The Primarchs",'+"\n")
    elif book.nr < 89:
        new_file.write("\tbook:"+'"Short Stories",'+"\n")
    elif book.nr < 96:
        new_file.write("\tbook:"+'"Audio Dramas",'+"\n")
    elif book.nr < 99:
        new_file.write("\tbook:"+'"Horus Heresy Characters Novels",'+"\n")
    elif book.nr < 123:
        new_file.write("\tbook:"+'"Official Novellas",'+"\n")
    elif book.nr < 134:
        new_file.write("\tbook:"+'"Collections",'+"\n")
    elif book.nr < 230:
        new_file.write("\tbook:"+'"Short stories",'+"\n")
    elif book.nr < 233:
        new_file.write("\tbook:"+'"Omnibus Editions",'+"\n")
    elif book.nr < 281:
        new_file.write("\tbook:"+'"Audio Dramas",'+"\n")
    else:
        new_file.write("\tbook:"+' "",'+"\n")
    
    
    new_file.write("\tfaction:"+' [""],'+"\n")
    
    
    if  book.nr == 109:
        new_file.write("\tpages:"+'"'+str(99)+'",'+"\n")
    else:
        new_file.write("\tpages:"+'"'+str(book.pages)+'",'+"\n")

    audio = book.length_book.replace(" hours", "h")
    audio = audio.replace(" minutes", "m")

    new_file.write("\taudio:"+'"'+str(audio)+'",'+"\n")
    new_file.write("\trating:"+' "%",'+"\n")
    new_file.write("\tlink:"+'"'+str(book.link_black_library)+'"'+"\n")

    new_file.write("},\n")

new_file.write("];")

new_file.close()