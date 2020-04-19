from bs4 import BeautifulSoup
import requests
import json

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

url = 'https://bit-heroes.fandom.com/wiki/Fusion'
response = requests.get(url, timeout=5)
content = BeautifulSoup(response.content, "html.parser")

srcArr = []
fusion = content.findAll('td', attrs={'rowspan':'3'})

for f in fusion:
    srcArr.append(f.find('img', attrs={'class': ""})["src"])

with open('fusionSrc.json', 'w') as outfile:
    json.dump(srcArr, outfile)

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

# Seems like the sticking point is when I search for all instances of TRs and
# then begin sifting through the data, some of the TRs have no images, so when
# attempting to find an image it'll go through the list and find that the very
# first one has no image, and bugs out there or just doesn't work entirely

# looking for rowspan 3 solved that issue by all of those having images, so I
# don't know if I'll have to do multiple sorting to get it to where everything
# is handled properly and is still added to the same object somehow to organize
# all the data into one grouping for downloading images and storing names