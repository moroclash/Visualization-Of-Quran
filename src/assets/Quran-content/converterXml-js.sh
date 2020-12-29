#!/bin/bash
for filename in ./*.xml; do
    #echo $filename    #<?xml version='1.0' encoding='utf8'?>
    newname=`echo "$filename" | sed "s/.*\///" | sed "s/.xml//"`
    mv $filename $newname.js

    isInFile=$(grep -c "xml" $newname.js)
    if [ $isInFile -eq 0 ]; then
	#string not contained in file
	echo "file allredy repaired"
    else
	#string is in file at least once
	a=$(tail -n +2 $newname.js)
	echo "data = '$a'" > $newname.js 
        echo "repair files done"
    fi
done
