


file_output = open("output.txt","w", encoding = 'utf-8')

i=36
while i < 200:
    i += 1
    file_output.write("\t{\n")
    file_output.write("\t\tid:"+str(i)+",\n")
    file_output.write('\t\ttype:"primary",\n')
    file_output.write("\t\tstart:1,\n")
    file_output.write("\t\tend:1,\n")
    file_output.write("\t},\n")

file_output.close()