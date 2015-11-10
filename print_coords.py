#!/usr/bin/env python
# -*- coding: utf-8 -*-




import csv




if __name__ == '__main__':
    reader = csv.reader(open('Coords/DogBoneOutline.txt'),delimiter='\t')
    for i in reader:
        print i