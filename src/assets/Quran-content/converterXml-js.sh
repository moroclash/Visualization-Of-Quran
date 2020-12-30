#!/bin/bash
for filename in ./*.js; do
    #echo $filename    #<?xml version='1.0' encoding='utf8'?>
    newname=`echo "$filename" | sed "s/.*\///" | sed "s/.js//"`
    mv $filename $newname.js

    isInFile=$(grep -c "xml" $newname.js)
    if [ $isInFile -eq 1 ]; then
	#string not contained in file
	echo "file allredy repaired"
    else
	#string is in file at least once
	#a=$(tail -n +2 $newname.js)
	a=$(sed 's/data =//g' $newname.js)
	echo -e "let data = $a \n export default data" > $newname.js
        echo "repair files done"
    fi
done
