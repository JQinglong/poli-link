#!/bin/sh

# LC_ALL=C sed -i -e 's/\(○\)\(.* \)/\n\1\n\n\2\n\n/g' ./text.txt
# LC_ALL=C sed -i -e 's/\(（)\)\(.* \)/\n\1\n\n\2\n\n/g' ./text.txt
# LC_ALL=C sed -i -e 's/\(＜\)\(.* \)/\n\1\n\n\2\n\n/g' ./text.txt

LC_ALL=C sed -i -z 's/\n\n/★/g' ./text.txt
# LC_ALL=C sed -i -z 's/\n//g' ./text.txt
# LC_ALL=C sed -i -z 's/★/\n/g' ./text.txt

# LC_ALL=C sed -i -e "s/^/,'/g" ./text.txt
# LC_ALL=C sed -i -e "s/$/'/g" ./text.txt


# LC_ALL=C sed -i -e 's///g' text.txt
# LC_ALL=C sed -i -e 's///g' text.txt
# LC_ALL=C sed -i -e 's///g' text.txt
