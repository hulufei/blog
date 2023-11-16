---
title: Exploring Buffer, Window and Tab Page in Vim
---

Buffer, window and tab page are three fundamental concepts in Vim, I've been
tinkering with them to support always-open help files or personal notes in a
new tab. It has helped me navigate through the sometimes messy APIs.

## Concepts

`:h windows` gives a clear introduction to buffers, windows and tab pages.

    Summary:
       A buffer is the in-memory text of a file.
       A window is a viewport on a buffer.
       A tab page is a collection of windows.

In essence, a tab page represents the current view of your Vim, potentially
containing multiple windows(split, floated). Each window acts as a viewport on
a buffer, and the same buffer may be displayed in different windows. Each
buffer, window and tab page has an ID and a number. The ID remains unique and
consistent within a Vim session, while the number may change with openings or
closings.

## APIs

I'll focus on Neovim. All APIs start with `nvim_` are under `vim.api`, while
others are under `vim.fn`.

We can retrieve all buffers, windows and tab pages with these three APIs:

- `nvim_list_bufs()`
- `nvim_list_wins()`
- `nvim_list_tabpages()`

Typically, we start with the buffer, `bufname([{buf}])` retrieves the buffer
name. The optional `{buf}` argument, if omitted, refers to the current buffer.
It can also be a number or string(see `:h bufname` for details).

Another function `getbufinfo([{buf}])` can return more verbose informations, e.g., windows:

    windows		List of |window-ID|s that display this buffer

Two more useful buffer functions:

- `nvim_buf_get_name({buffer})` retrieves the full file name for the buffer.
- `nvim_buf_get_option({buffer})` retrieves a buffer option value(e.g., `filetype`).

Most of the time, `0` denotes the current buffer, window or tab page. For
example, `nvim_tabpage_list_wins(0)` lists windows for the current tab page.

Two useful window functions:

- `nvim_win_get_buf({window})` retrieves the current buffer in a window, with `0` representing the current window
- `win_gotoid({ID})` goes to window with ID. This may also change the current tab page.

This should serve as a concise guide to buffer, window and tab page APIs. For More related APIs:

- `:h nvim_buf_`
- `:h nvim_win_`
- `:h nvim_tabpage_`
- `:h win_`
- `:h bufnr`
- `:h tabpagenr`
