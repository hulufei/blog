---
title: Tinkering with Buffer, Window and TabPage in Vim
---

Buffer, window and tab page are three basic concepts in Vim, I was tinkering with them to
support always open help files or personal notes in a new tab. I kind of clean a clear
path around the mess APIs.

## Concepts

`:h windows` gives a clear introduction to buffer, window and tab page.

>Summary:
   A buffer is the in-memory text of a file.
   A window is a viewport on a buffer.
   A tab page is a collection of windows.

So, a tab page is basically the current view of your Vim, it may contains
multiple windows(split, floated), each window is a viewport on a buffer. Same
buffer may display in different windows. Each buffer, window and tab has a id
and number, the id is unique and will not change within a Vim session, whereas
the number may change with opening or closing.

## APIs

I'll focus on Neovim. All the APIs start with `nvim_` are under `vim.api`, and others under
`vim.fn`.

We can get all buffers, windows and tab pages with these three APIs:

- `nvim_list_bufs`
- `nvim_list_wins`
- `nvim_list_tabpages`

Normally, we may tend to start with buffer, `bufname([{buf}])` get the buffer
name, the optional `{buf}` argument can be omitted then the current buffer is
used, it can also be a number or string. `getbufinfo([{buf}])` can return more
verbose informations such as windows:

    windows		List of |window-ID|s that display this buffer

Two more useful buffer functions:

- `nvim_buf_get_name({buffer})` gets the full file name for the buffer.
- `nvim_buf_get_option({buffer})` gets a buffer option value(e.g. `filetype`)

Most of time, `0` stands for current buffer, window or tab page. For example, `nvim_tabpage_list_wins(0)`
list windows for current tab page.

Two useful window functions:

- `nvim_win_get_buf({window})` gets the current buffer in a window, as usual, `0` for current window
- `win_gotoid({ID})` focus to window with ID. This may also change the current tab page.

Hopefully, this can be a brief guide to buffer, window and tab page APIs. More related
APIs can be found with:

- `:h nvim_buf_`
- `:h nvim_win_`
- `:h nvim_tabpage_`
- `:h win_`
- `:h tabpagenr`
- `:h bufnr`
