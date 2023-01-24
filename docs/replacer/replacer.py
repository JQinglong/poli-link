import re

file_name = "./text.txt"

with open(file_name, encoding="utf-8") as f:
    data_lines = f.read()

    # 文字列置換
    # data_lines = data_lines.replace("グーグルマップ", "Google マップ ")

    data_lines = re.sub(r'^\d*\n', r"", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r'〇', r'●', data_lines, flags=re.MULTILINE) #2種類の〇
    data_lines = re.sub(r'○', r'●', data_lines, flags=re.MULTILINE) #2種類の〇
    data_lines = re.sub(r'(●)(.*)', r"\n\1\n\n\2\n\n", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'(（)(.*)', r"\n\1\n\n\2\n\n", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'(＜)(.*)', r"\n\1\n\n\2\n\n", data_lines, flags=re.MULTILINE)


    data_lines = re.sub(r'\n\n', r"★", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'\n', r"", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'★', r"\n", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r'^', r",'", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'$', r"'", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r",'●'", r", ''\n, 'cda312daf6ad475b87b7a4ee6bc267a0', '34b2d78d6de947a4a400f15571be4d9d'),\n (REPLACE(uuid(), '-', ''),'●'", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r"^, ''", r"INSERT INTO `polilink_api_meetingspeech` (`id`, `order`,\n `speaker`,\n `speech`,\n `description`, `council_id`, `council_meeting_id`)\n VALUES", data_lines)



# 同じファイル名で保存
with open(file_name, mode="w", encoding="utf-8") as f:
    f.write(data_lines)
