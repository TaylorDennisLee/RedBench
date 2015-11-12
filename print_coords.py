#!/usr/bin/env python
# -*- coding: utf-8 -*-




import csv




if __name__ == '__main__':
    reader = csv.reader(open('Coords/LineList.txt'))
    reader.next()
    for i in reader:
    	print '[' + str(float(i[0])) + ','  + str(float(i[1])) + ',' + str(float(i[2])) + ',' + str(float(i[3])) + '],'
    # for index, i in enumerate(reader):
    #     new_i = [float(j) for j in i]
    #     print str(new_i) + ','
