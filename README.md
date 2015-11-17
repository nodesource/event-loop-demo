### Event Loop Demo

Run over and download N|Solid at
[downloads.nodesource.com/](https://downloads.nodesource.com/) then read
up on how to make the most of it with
[this excellent blog post](https://nodesource.com/blog/getting-started-with-nsolid-at-the-command-line)
by Patrick Mueller.

Start the server by running:
```
$ nsolid src/server.js
```

The included benchmark will nail the server. To change the number of
simultaneous connections edit the `CONNECTIONS` variable at the top of the
file. Run with:

```
$ nsolid benchmark/full.js
```

This example includes data about modules and their authors from npm. The server
is a very simple REST-ish service that can give you some limited information.
Such as, the flattened recursive dependencies for a given modules.

After starting the server try the following example:
```
$ curl 'http://localhost:8007/module/fulldeps/express'
```
You should see all the dependencies that will be installed by installing
express.
