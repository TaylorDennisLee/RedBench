#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import csv
import sys
import json
import socket
import time



from tornado import gen
import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

from jinja2 import Environment, FileSystemLoader, TemplateNotFound


def get_coords(filename):
    out_list = []
    reader = csv.reader(open(filename))
    reader.next()
    for line in reader:
        print line
        out_list.append(line)
    return out_list

class TemplateRendering:
    """
    A simple class to hold methods for rendering templates.
    """
    def render_template(self, template_name, **kwargs):
        template_dirs = []
        if self.settings.get('template_path', ''):
            template_dirs.append(
                self.settings["template_path"]
            )

        env = Environment(loader=FileSystemLoader(template_dirs))

        try:
            template = env.get_template(template_name)
        except TemplateNotFound:
            raise TemplateNotFound(template_name)
        content = template.render(kwargs)
        return content



## From Jinja Docs
# class BaseHandler(tornado.web.RequestHandler):
    # """
    # RequestHandler already has a `render()` method. I'm writing another
    # method `render2()` and keeping the API almost same.
    # """
    # def render2(self, template_name, **kwargs):
    #     """
    #     This is for making some extra context variables available to
    #     the template
    #     """
    #     kwargs.update({
    #         'settings': self.settings,
    #         'STATIC_URL': self.settings.get('static_url_prefix', '/static/'),
    #         'request': self.request,
    #     })
    #     content = self.render_template(template_name, **kwargs)
    #     self.write(content)



class RootHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("orbit.html")

class BaseHandler(tornado.web.RequestHandler):

    def get(self):
        this_list = []
        reader = csv.reader(open('static/data/LineList.txt'))
        reader.next()
        for i in reader:
            print [float(j) for j in i]
            this_list.append([float(j) for j in i])
        self.render("base.html",csv_out = str(this_list), main_script='base.js')


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            (r"/", BaseHandler),
            # (r"/home", HomeHandler),
            # (r"/entry", EntryHandler),
            # (r"/trial", TrialHandler),
            # (r"/login", LoginHandler),
            # (r"/logout", LogoutHandler)
        ]


        settings = {
            'template_path': os.path.join(os.path.dirname(__file__), "templates") ,
            'static_path' : os.path.join(os.path.dirname(__file__), "static"),
            'cookie_secret':'__MY_NOT_SECRET_VALUE__',
            'login_url': r"/login",
            # 'xsrf_cookies': True,
            'autoreload':True,
            'compiled_template_cache':False,
            'debug':True
        }
        tornado.web.Application.__init__(self, handlers, **settings)


def main():
    port = 8888
    app  = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(port)
    myIP = socket.gethostbyname(socket.gethostname())
    print '\033[92m*** RedBench Server started at %s:%s***' % (myIP, port) + '\033[0m'
    tornado.ioloop.IOLoop.instance().start()
 
 
if __name__ == "__main__":
    main()