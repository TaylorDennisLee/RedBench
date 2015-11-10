#!/usr/bin/env python
# -*- coding: utf-8 -*-




import csv




if __name__ == '__main__':
    reader = csv.reader(open('Coords/DogBoneOutline.txt'),delimiter='\t')

    for index, i in enumerate(reader):
        new_i = [float(j) for j in i]
        print str(new_i) + ','