---
title: Using Curl Requests with CSRF Guard
date: 2023-12-28
tags:
  - til
---

To ensure that curl works for requests involving CSRF tokens, activating the curl's cookie engine is necessary.

There are two related options to consider:

- `-c, --cookie-jar <filename>` Specify to which file you want curl to write all cookies after a completed operation.
- `-b, --cookie <data>` Pass the data to the HTTP server in the Cookie header.
  If no '=' symbol is used in the argument, it is instead treated as a filename to read previously stored cookie from.

> Users very often want to both read cookies from a file and write updated cookies back to a file, so  using
> both -b, --cookie and -c, --cookie-jar in the same command line is common.
>
> — <cite>man curl</cite>

So, a typical workflow might like this:

Firstly, simulating the user's initial arrival at the page with a GET request. E.g.

```
curl -v -c cookies.txt -b cookies.txt host.com/page/login.html
```

Subsequently, simulating filling in the form fields and sending them as a POST request. E.g.

```
curl -v -c cookies.txt -b cookies.txt -d "username=john&password=123&csrf_token=extract_from_hidden_input" host.com/login
```

Following this process should result in a successful login. All subsequent requests utilizing `cookies.txt` should be
authenticated properly.
