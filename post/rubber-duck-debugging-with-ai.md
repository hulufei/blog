---
title: Rubber Duck Debugging with AI
---

When I was in the midst of coding my [little rust program](/post/faulty-double-clicking),
I encountered a perplexing compiler error: `expected a closure that implements
the Fn trait, but this closure only implements FnMut.` I can understand the
root cause of the error, but I didn't know how to overcome it.

In my quest for a solution, I turned to an AI, [Google Bard](https://bard.google.com),
which I found both intriguing and impressive. The following conversation captures
the essence of my experience:

(Please note: For brevity, I'll use `...` to omit overly lengthy or unhelpful responses.)

Me:
 
> You are a rust expert, please answer my rust-related questions
 
Bard:
 
> I understand. I am a Rust expert, and I will try my best to answer your
> Rust-related questions in a comprehensive and informative way. (...disclaimer) 
 
Me:

> Here is the code:
```
  use std::time::SystemTime;
  use rdev::{grab, Button, Event, EventType};

  fn main() {
     let mut prev_click_time: SystemTime = SystemTime::now();
     let mut curr_click_time: SystemTime = SystemTime::now();

     let callback = |event: Event| -> Option<Event> {
         if let EventType::ButtonPress(Button::Left) = event.event_type {
             // println!("Left click {:?}", event);
             prev_click_time = curr_click_time;
             curr_click_time = event.time;
             if let Ok(duration) = curr_click_time.duration_since(prev_click_time) {
                 println!("Duration {:?}", duration);
                 if duration.as_millis() < 500 {
                     println!("Double click");
                 }
             }
             // None // CapsLock is now effectively disabled
             Some(event)
         } else {
             Some(event)
         }
     };

     if let Err(error) = grab(callback) {
         println!("Error: {:?}", error)
     }
  }
```
Bard:
 
> ...(provides a line-by-line explanation of the code, which isn't helpful for the specific issue.)
 
Me:
 
> What's the problem with above code?
 
Bard:
 
> ...(offers improvement suggestions but overlooks the compiler error.)
 
Me:
 
> I got an error: expected a closure that implements the Fn trait, but this closure only implements FnMut. How can I fix this?
 
Bard:
 
> ...(advises against mutating variables in the callback function, missing the root issue.)
 
Me:
 
> But I do need to capture click time between clicks, how to do that?

Bard:

>To capture the click time between clicks, you can use a mutable variable to store the time of the previous click. Then, when a new click event is received, you can calculate the duration between the current click and the previous click.

>Here is an example of how to capture the click time between clicks:
> 
>...(still not addressing the core issue.)

Me:

>The problem is the callback passed to `grab` only implemented `Fn` trait, so I can't mutate variable inside the callback function.

Bard:

>You are correct. The callback passed to grab must implement the Fn trait, which prohibits mutating variables in the environment.
>
>However, there are a few ways to work around this problem. One way is to use a thread-safe data structure to store the click time between clicks. For example, you could use a Mutex or a RwLock to protect the variable.
>
>Another way to work around the problem is to use a message queue to communicate between the callback function and the main thread. The callback function could send a message to the main thread with the click time, and the main thread could then update the variable.
>
>Here is an example of how to use a message queue to work around the problem:
> 
> ...(thread is not what I want, but I got Mutex.)

Me:

>Use `Mutex` or a `RwLock` please.

Bard:

>Sure. Here is an example of how to use a `Mutex` to store the click time between clicks:
>
>...(finally help me figure it out.)

AI is particularly useful in this kind of scenario when we don't know how to
ask the right question. That's when we need a rubber duck!
