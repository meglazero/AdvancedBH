from bs4 import BeautifulSoup
import requests
import json

url = 'https://bit-heroes.fandom.com/wiki/Fusion'
response = requests.get(url, timeout=5)
content = BeautifulSoup(response.content, "html.parser")

# tweetArr = []
# for tweet in content.findAll('div', attrs={"class": "tweetcontainer"}):
#     tweetObject = {
#         "author": tweet.find('img', attrs={"class": "author"}).src,
#         "date": tweet.find('h5', attrs={"class": "dateTime"}).text,
#         "tweet": tweet.find('p', attrs={"class": "content"}).text,
#         "likes": tweet.find('p', attrs={"class": "likes"}).text,
#         "shares": tweet.find('p', attrs={"class": "shares"}).text
#     }
#     tweetArr.append(tweetObject)
# with open('twitterData.json', 'w') as outfile:
#     json.dump(tweetArr, outfile)

# srcArr = []
# fusion = content.findAll('td', attrs={'rowspan':'3'})
fusion = content.findAll('tr')
i=0
fusions = []
indFusion = []

for f in fusion:
    #checks for fusion via rowspan for images and is trigger for rest of logic
    row3 = f.find('td', attrs={'rowspan': '3'})
    print(' --- ')
    #if image block has been found, continue through the other 2 rows for fusion info
    if i > 0:
        # print(f.findAll('td')[0].text)
        indFusion.append(f.findAll('td')[0].text)
        j=2
        while j < len(f.findAll('td')):
            # print(f.findAll('td')[j].text)
            indFusion.append(f.findAll('td')[j].text)
            j+=1
        i-=1
    elif i == 0:
        if indFusion != []:
            fusions.append(indFusion)
            indFusion = []
        #if no image has been found, check if row has span of 3 and begin process of sorting fusion info
        if row3 != None:
            # print(row3.find('img', attrs={'class': ""})["src"])
            img = row3.find('img', attrs={'class': ""})["src"]
            if (img[len(img)-60:len(img)-59]) == 'p':
                if (img[len(img)-58:len(img)-57]) == 'g':
                    # print(img[:len(img)-57])
                    indFusion.append(img[:len(img)-57])
            elif (img[len(img)-37:len(img)-36]) == 'p':
                if (img[len(img)-35:len(img)-34]) == 'g':
                    # print(img[:len(img)-34])
                    indFusion.append(img[:len(img)-34])
            else:
                # print(img)
                indFusion.append(img)
            # indFusion.append(row3.find('img', attrs={'class': ""})["src"])
            # if(f.findall('td') != None):
            # print(f.findAll('td')[1].text)
            indFusion.append(f.findAll('td')[1].text)
            j=3
            while j < len(f.findAll('td')):
                # print(f.findAll('td')[j].text)
                indFusion.append(f.findAll('td')[j].text)
                j+=1
            i = 2
        # elif row3 == None:
            # print('no row3')
    # print('end of entry')
    # print(indFusion)
    # print(fusions)
    # print('------------')

with open('fusionSrc.json', 'w') as outfile:
    json.dump(fusions, outfile)



# fusion = content.findAll('tr')
# print(fusion)

# for f in fusion:
#     fusionObject = {}
#     fSrc = f.find('img', attrs={'class': ""})
#     if f.find('img', attrs={'class': ""}) != None:
#         setattr(fusionObject, "Source", f.find('img', attrs={'class': ""})["src"])
#     fusionObject = {
#         # "Source": str(f.find('img', attrs={'class': ""})["src"]),
#         # "Source": fSrc["src"],
#     }
#     srcArr.append(fusionObject)
#     if f.find('img', attrs={'class': ""}) != None:
#         srcArr.append(str(f.find('img', attrs={'class': ""})["src"]))
#     print(fusionObject)

# with open('fusionSrc.json', 'w') as outfile:
#     json.dump(srcArr, outfile)