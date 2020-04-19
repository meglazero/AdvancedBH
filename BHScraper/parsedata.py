import json
import requests
import shutil
import wget
import os
import os.path
from os import path

with open('fusionSrc.json') as json_data:
    jsonData = json.load(json_data)

try:
    if path.exists("fusiondump.txt"):
        os.remove("fusiondump.txt")
        f = open("fusiondump.txt","w+")
    else:
        f = open("fusiondump.txt","w+")
except:
    print("failed to open dump")

for i in jsonData:
    j = int((len(i)-1)/3)
    # print(i[1:j+1])
    # print(i[j+1:(j*2)+1])
    # print(i[(j*2)+1:(j*3)+1])
    # print('end of entry')
    # print('------------')
    # k = 0
    # l = 0
    # for c in i[5]:
    #     if c == ',':
    #         print(k, ',')
    #         k+=1
    #     if c == '%':
    #         print(l, '%')
    #         l+=1
    #     k+=1
    #     l+=1
    try:
        

        perc1 = ''
        bonus1 = ''
        perc2 = ''
        bonus2 = ''
        brain = ''
        if i[5].find("%") > 0:
            p = i[5].find("%")
            perc1 = i[5][:p+2]
            l = i[5][p+2:len(i[5])]
            if l.find(",") > 0:
                k = l.find(",")
                p = l.find("%")
                bonus1 = l[:k]
                m = l[k+2:len(l)]
                if m.find(",") > 0:
                    k = m.find(",")
                    p = m.find("%")
                    perc2 = m[:p+2]
                    bonus2 = m[p+2:k]
                    brain = m[k+1:len(m)]
                else:
                    if len(m) > 35:
                        brain = m
                    else:
                        p = m.find("%")
                        perc2 = m[:p+2]
                        bonus2 = m[p+2:len(m)]
            else:
                bonus1 = l
                # if m.find(",") > 0:
                #     else:
                #         perc2 = l[k+2:p+2]
                #     if m.find(",") > 0:
                #         k = m.find(",")
                #         p = m.find("%")
                #         bonus2 = m[:k]
                #         brain = m[k+2:len(m)]
                #     else:
                #         p = m.find("%")
                #         bonus2 = m[p+1:len(m)]
                # if len(l) > 35:
                #     brain = l[k+1:len(l)]
                # else:
                #     perc2 = l[k+2:p+2]
                #     if m.find(",") > 0:
                #         k = m.find(",")
                #         p = m.find("%")
                #         bonus2 = m[:k]
                #         brain = m[k+2:len(m)]
                #     else:
                #         p = m.find("%")
                #         bonus2 = m[p+1:len(m)]
        elif i[6].find("%") > 0:
            k = i[6].find("%")
            perc1 = i[6][:k+2]
            l = i[6][k+2:len(i[6])]
            if l.find(",") > 0:
                k = l.find(",")
                p = l.find("%")
                bonus1 = l[:k]
                m = l[k+2:len(l)]
                if m.find(",") > 0:
                    k = m.find(",")
                    p = m.find("%")
                    perc2 = m[:p+2]
                    bonus2 = m[p+2:k]
                    brain = m[k+1:len(m)]
                else:
                    if len(m) > 35:
                        brain = m
                    else:
                        p = m.find("%")
                        perc2 = m[:p+2]
                        bonus2 = m[p+2:len(m)]
            else:
                bonus1 = l
        elif i[7].find("%") > 0:
            k = i[7].find("%")
            perc1 = i[7][:k+2]
            l = i[7][k+2:len(i[7])]
            if l.find(",") > 0:
                k = l.find(",")
                p = l.find("%")
                bonus1 = l[:k]
                m = l[k+2:len(l)]
                if m.find(",") > 0:
                    k = m.find(",")
                    p = m.find("%")
                    perc2 = m[:p+2]
                    bonus2 = m[p+2:k]
                    brain = m[k+1:len(m)]
                else:
                    if len(m) > 35:
                        brain = m
                    else:
                        p = m.find("%")
                        perc2 = m[:p+2]
                        bonus2 = m[p+2:len(m)]
            else:
                bonus1 = l
        elif i[8].find("%") > 0:
            k = i[8].find("%")
            perc1 = i[8][:k+2]
            l = i[8][k+2:len(i[8])]
            if l.find(",") > 0:
                k = l.find(",")
                p = l.find("%")
                bonus1 = l[:k]
                m = l[k+2:len(l)]
                if m.find(",") > 0:
                    k = m.find(",")
                    p = m.find("%")
                    perc2 = m[:p+2]
                    bonus2 = m[p+2:k]
                    brain = m[k+1:len(m)]
                else:
                    if len(m) > 35:
                        brain = m
                    else:
                        p = m.find("%")
                        perc2 = m[:p+2]
                        bonus2 = m[p+2:len(m)]
            else:
                bonus1 = l
        elif i[9].find("%") > 0:
            k = i[9].find("%")
            perc1 = i[9][:k+2]
            l = i[9][k+2:len(i[9])]
            if l.find(",") > 0:
                k = l.find(",")
                p = l.find("%")
                bonus1 = l[:k]
                m = l[k+2:len(l)]
                if m.find(",") > 0:
                    k = m.find(",")
                    p = m.find("%")
                    perc2 = m[:p+2]
                    bonus2 = m[p+2:k]
                    brain = m[k+1:len(m)]
                else:
                    if len(m) > 35:
                        brain = m
                    else:
                        p = m.find("%")
                        perc2 = m[:p+2]
                        bonus2 = m[p+2:len(m)]
            else:
                bonus1 = l
    except:
        print("except")
    
    open = "{{\n"
    close = "}},\n"

    if j == 4:
        f.write(open.format())
        f.write("image: 'url(\"dist/imgs/" + i[1].lower() + ".png\")',\n")
        f.write("name: '" + i[1] + "',\n")
        f.write("perc1: '" + perc1 + "',\n")
        f.write("bonus1: '" + bonus1 + "',\n")
        f.write("perc2: '" + perc2 + "',\n")
        f.write("bonus2: '" + bonus2 + "',\n")
        f.write("brain: '" + brain + "',\n")
        f.write("fusedFams: '" + i[9] + "',\n")
        f.write("atk: '" + i[2] + "',\n")
        f.write("hp: '" + i[6] + "',\n")
        f.write("agi: '" + i[10] + "',\n")
        f.write("atk1: '" + i[3] + "',\n")
        f.write("tar1: '" + i[7] + "',\n")
        f.write("dam1: '" + i[11] + "',\n")
        f.write("atk2: '" + i[4] + "',\n")
        f.write("tar2: '" + i[8] + "',\n")
        f.write("dam2: '" + i[12] + "',\n")
        f.write("rarity: 'common',\n")
        f.write("source: '',\n")
        f.write("specSource: '',\n")
        f.write(close.format())
    if j==5:
        f.write(open.format())
        f.write("image: 'url(\"dist/imgs/" + i[1].lower() + ".png\")',\n")
        f.write("name: '" + i[1] + "',\n")
        f.write("perc1: '" + perc1 + "',\n")
        f.write("bonus1: '" + bonus1 + "',\n")
        f.write("perc2: '" + perc2 + "',\n")
        f.write("bonus2: '" + bonus2 + "',\n")
        f.write("brain: '" + brain + "',\n")
        f.write("fusedFams: '" + i[11] + "',\n")
        f.write("atk: '" + i[2] + "',\n")
        f.write("hp: '" + i[7] + "',\n")
        f.write("agi: '" + i[12] + "',\n")
        f.write("atk1: '" + i[3] + "',\n")
        f.write("tar1: '" + i[8] + "',\n")
        f.write("dam1: '" + i[13] + "',\n")
        f.write("atk2: '" + i[4] + "',\n")
        f.write("tar2: '" + i[9] + "',\n")
        f.write("dam2: '" + i[14] + "',\n")
        f.write("atk3: '" + i[5] + "',\n")
        f.write("tar3: '" + i[10] + "',\n")
        f.write("dam3: '" + i[15] + "',\n")
        f.write("rarity: 'rare',\n")
        f.write("source: '',\n")
        f.write("specSource: '',\n")
        f.write(close.format())
    if j==6:
        f.write(open.format())
        f.write("image: 'url(\"dist/imgs/" + i[1].lower() + ".png\")',\n")
        f.write("name: '" + i[1] + "',\n")
        f.write("perc1: '" + perc1 + "',\n")
        f.write("bonus1: '" + bonus1 + "',\n")
        f.write("perc2: '" + perc2 + "',\n")
        f.write("bonus2: '" + bonus2 + "',\n")
        f.write("brain: '" + brain + "',\n")
        f.write("fusedFams: '" + i[13] + "',\n")
        f.write("atk: '" + i[2] + "',\n")
        f.write("hp: '" + i[8] + "',\n")
        f.write("agi: '" + i[14] + "',\n")
        f.write("atk1: '" + i[3] + "',\n")
        f.write("tar1: '" + i[9] + "',\n")
        f.write("dam1: '" + i[15] + "',\n")
        f.write("atk2: '" + i[4] + "',\n")
        f.write("tar2: '" + i[10] + "',\n")
        f.write("dam2: '" + i[16] + "',\n")
        f.write("atk3: '" + i[5] + "',\n")
        f.write("tar3: '" + i[11] + "',\n")
        f.write("dam3: '" + i[17] + "',\n")
        f.write("atk4: '" + i[6] + "',\n")
        f.write("tar4: '" + i[12] + "',\n")
        f.write("dam4: '" + i[18] + "',\n")
        f.write("rarity: 'epic',\n")
        f.write("source: '',\n")
        f.write("specSource: '',\n")
        f.write(close.format())
    if j==7:
        f.write(open.format())
        f.write("image: 'url(\"dist/imgs/" + i[1].lower() + ".png\")',\n")
        f.write("name: '" + i[1] + "',\n")
        f.write("perc1: '" + perc1 + "',\n")
        f.write("bonus1: '" + bonus1 + "',\n")
        f.write("perc2: '" + perc2 + "',\n")
        f.write("bonus2: '" + bonus2 + "',\n")
        f.write("brain: '" + brain + "',\n")
        f.write("fusedFams: '" + i[15] + "',\n")
        f.write("atk: '" + i[2] + "',\n")
        f.write("hp: '" + i[9] + "',\n")
        f.write("agi: '" + i[16] + "',\n")
        f.write("atk1: '" + i[3] + "',\n")
        f.write("tar1: '" + i[10] + "',\n")
        f.write("dam1: '" + i[17] + "',\n")
        f.write("atk2: '" + i[4] + "',\n")
        f.write("tar2: '" + i[11] + "',\n")
        f.write("dam2: '" + i[18] + "',\n")
        f.write("atk3: '" + i[5] + "',\n")
        f.write("tar3: '" + i[12] + "',\n")
        f.write("dam3: '" + i[19] + "',\n")
        f.write("atk4: '" + i[6] + "',\n")
        f.write("tar4: '" + i[13] + "',\n")
        f.write("dam4: '" + i[20] + "',\n")
        f.write("atk5: '" + i[7] + "',\n")
        f.write("tar5: '" + i[14] + "',\n")
        f.write("dam5: '" + i[21] + "',\n")
        f.write("rarity: 'legendary',\n")
        f.write("source: '',\n")
        f.write("specSource: '',\n")
        f.write(close.format())
    if j==8:
        f.write(open.format())
        f.write("image: 'url(\"dist/imgs/" + i[1].lower() + ".png\")',\n")
        f.write("name: '" + i[1] + "',\n")
        f.write("perc1: '" + perc1 + "',\n")
        f.write("bonus1: '" + bonus1 + "',\n")
        f.write("perc2: '" + perc2 + "',\n")
        f.write("bonus2: '" + bonus2 + "',\n")
        f.write("brain: '" + brain + "',\n")
        f.write("fusedFams: '" + i[17] + "',\n")
        f.write("atk: '" + i[2] + "',\n")
        f.write("hp: '" + i[10] + "',\n")
        f.write("agi: '" + i[18] + "',\n")
        f.write("atk1: '" + i[3] + "',\n")
        f.write("tar1: '" + i[11] + "',\n")
        f.write("dam1: '" + i[19] + "',\n")
        f.write("atk2: '" + i[4] + "',\n")
        f.write("tar2: '" + i[12] + "',\n")
        f.write("dam2: '" + i[20] + "',\n")
        f.write("atk3: '" + i[5] + "',\n")
        f.write("tar3: '" + i[13] + "',\n")
        f.write("dam3: '" + i[21] + "',\n")
        f.write("atk4: '" + i[6] + "',\n")
        f.write("tar4: '" + i[14] + "',\n")
        f.write("dam4: '" + i[22] + "',\n")
        f.write("atk5: '" + i[7] + "',\n")
        f.write("tar5: '" + i[15] + "',\n")
        f.write("dam5: '" + i[23] + "',\n")
        f.write("atk6: '" + i[8] + "',\n")
        f.write("tar6: '" + i[16] + "',\n")
        f.write("dam6: '" + i[24] + "',\n")
        f.write("rarity: 'mythic',\n")
        f.write("source: '',\n")
        f.write("specSource: '',\n")
        f.write(close.format())

    # print('step')
f.close()
    #setup to download all the images off of the wiki page and rename
    # image_url = i[0]
    # imgName = i[1].lower()
    # try:
    #     local_image_filename = wget.download(image_url, out=imgName + '.png')
    # except:
    #     print(image_url + " " + imgName + " did not work")