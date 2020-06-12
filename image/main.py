from fastapi import FastAPI, File,Form,Response
from .wright import transform
import os
import random
from .tx_server import upload
import re
app = FastAPI()

imagelist=[]
re_dict={'，':',','“':'"','”':'"','。':'.'}
@app.post("/files/")

async def create_file(
        *,flag:bool,
        file: bytes = File(...),
        world:str=Form(...),
        font_size:int=Form(...),
        line_spacing:int=Form(...),
        left_margin:int=Form(...),
        top_margin:int=Form(...),
        right_margin:int=Form(...),
        bottom_margin:int=Form(...)
):
    str_1 = re.findall(
        '[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]',
        world)
    for i in set(str_1):
        world = re.sub(i, re_dict[i], world)
    transform(file,world,flag,font_size,line_spacing,left_margin,top_margin,right_margin,bottom_margin)#处理后返回多个个图片保存在test文件夹
    print(os.listdir('image/test'))
    imagelist=[]
    for i in os.listdir('image/test'):
        image_name=str(random.randint(1,100000))+i
        upload('image/test/'+str(i),image_name)
        imagelist.append('https://mini-program-1258708612.cos.ap-chengdu.myqcloud.com/'+image_name)
        os.remove('image/test/'+str(i))
    # print(type(imagelist[0]),len(imagelist))
    return imagelist

