import re

file_name = "./text.txt"

with open(file_name, encoding="utf-8") as f:
    data_lines = f.read()

    # 文字列置換
    # data_lines = data_lines.replace("グーグルマップ", "Google マップ ")

    data_lines = re.sub(r'^\d*\n', r"", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r'〇', r'○', data_lines, flags=re.MULTILINE) #2種類の〇
    data_lines = re.sub(r'(○)(.* )', r"\n\1\n\n\2\n\n", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'(（)(.* )', r"\n\1\n\n\2\n\n", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'(＜)(.* )', r"\n\1\n\n\2\n\n", data_lines, flags=re.MULTILINE)


    data_lines = re.sub(r'\n\n', r"★", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'\n', r"", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'★', r"\n", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r'^', r",'", data_lines, flags=re.MULTILINE)
    data_lines = re.sub(r'$', r"'", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r",'○'", r", ''\n, '05e7fe5b690f4a3ca8de126153c03b0b', 'd806fbaedd5d4f78ac7afcd7ea7e40bb'),\n (REPLACE(uuid(), '-', ''),'〇'", data_lines, flags=re.MULTILINE)

    data_lines = re.sub(r"^, ''", r"INSERT INTO `polilink_api_meetingspeech` (`id`, `order`,\n `speaker`,\n `speech`,\n `description`, `council_id`, `council_meeting_id`)\n VALUES", data_lines)



# 同じファイル名で保存
with open(file_name, mode="w", encoding="utf-8") as f:
    f.write(data_lines)
