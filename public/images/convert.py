from PIL import Image

def convertImage():
    img = Image.open('correctlogo.jpeg')
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    newData = []
    # threshold for white: RGB > 240
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save('correctlogo.png', "PNG")
    print("Successful")

convertImage()
