# coding: utf-8
from PIL import Image, ImageFont
from io import BytesIO
from handright import Template, handwrite
import base64
text = """《看不见的客人》构建了一出不断反转的精妙故事,将谎言的双刃性用到了极致.表面上,整个进程是案情的不断重复推演,其实重点在于女律师与企业家之间的争锋相对,彼此间的智斗.这些铺垫的细节和情绪的渲染,小心翼翼地将案中案里隐藏的反转排列得当,也暗示了影片惊为天人的结局,可以说是影片剧本与导演技法相得益彰的根本
影片中所有人都是正常人,只在偶发的不正常中,被挤压、不断变形,又在变形中产生新的挤压、裂变——这样的过程,除了让人享受神经紧攥,也感受被自己心中同类质黑暗"吓到"的真实感，产生后怕绵延的况味.
故事在男人和律师的不断虚与委蛇中,层层剥茧,呈现出一个又一个版本.观者也随着讲述的反转,对故事的理解不断进入下一层.
"""
def transform(file,text,flag,font_size,line_spacing,left_margin,top_margin,right_margin,bottom_margin):
    im = Image.open(BytesIO(file))
    if flag:
        im=im.transpose(Image.TRANSPOSE)
    template = Template(
        background=im,
        font_size=font_size,
        font=ImageFont.truetype("image/font/陈静的字.ttf"),
        line_spacing=line_spacing,
        fill=1,  # 字体“颜色”
        left_margin=left_margin,
        top_margin=top_margin,
        right_margin=right_margin,
        bottom_margin=bottom_margin,
        word_spacing=1,
        line_spacing_sigma=3,  # 行间距随机扰动
        font_size_sigma=2,  # 字体大小随机扰动
        word_spacing_sigma=5,  # 字间距随机扰动
        end_chars="，。",  # 防止特定字符因排版算法的自动换行而出现在行首
        perturb_x_sigma=2,  # 笔画横向偏移随机扰动
        perturb_y_sigma=2,  # 笔画纵向偏移随机扰动
        perturb_theta_sigma=0.05,  # 笔画旋转偏移随机扰动
    )
    images = handwrite(text, template)
    image=[]
    for i, im in enumerate(images):
        assert isinstance(im, Image.Image)
        # im.show()

        im.save('image/test/{}.jpg'.format(i))

    # im.save("path/to/my/output/{}.webp".format(i))