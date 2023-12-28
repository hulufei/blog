---
title: Curl Requests with CSRF Guard
date: 2023-12-28
tags:
  - til
---

We should activate the curl's cookie engine to make it works for requests with CSRF token.

There are two related options:

- `-c, --cookie-jar <filename>` Specify to which file you want curl to write all cookies after a completed operation.
- `-b, --cookie <data>` Pass the data to the HTTP server in the Cookie header.
  If no '=' symbol is used in the argument, it is instead treated as a filename to read previously stored cookie from.

> Users very often want to both read cookies from a file and write updated cookies back to a file, so  using
> both -b, --cookie and -c, --cookie-jar in the same command line is common.
> &mdash; <cite>man curl</cite>

A typical workflow will be like this:

First, simulate the user first arriving at the page with a GET request. E.g.

```
curl -v -c cookies.txt -b cookies.txt host.com/page/login.html
```

Then, simulate filling in the form fields and sending them as a POST. E.g.

```
curl -v -c cookies.txt -b cookies.txt -d "username=john&password=123&csrf_token=extract_from_hidden_input" host.com/login
```

From here, we should login successfully, all the following requests with cookies.txt should be authenticated properly.
