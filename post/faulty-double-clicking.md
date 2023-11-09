---
title: Solve the Infamous Logitech Double Click Problem in Less than 30 Lines of Rust Code
---

I recently experienced a double-clicking problem with my Logitech mouse.
Although happened occasionally, it's annoying. I decided not to troubleshoot
the root cause of the problem. I wanted to find a software solution.

The solution is straightforward. We can detect the time between clicks, if the
time between clicks is less than 150 milliseconds, we can say it's a faulty
double click, and we can discard the second click.

The challenge is to intercept the global mouse event stream. Surprisingly, I
stumbled upon a Rust crate called [rdev](https://github.com/Narsil/rdev) that
was a perfect solution for my problem.

The rest of the program is simple, the final Rust program is less than 30 lines long.
It has worked perfectly for me. Here is the snippet([repo](https://github.com/hulufei/faulty-click-hole)):

```rust
use rdev::{grab, Button, Event, EventType};
use std::{sync::Mutex, time::SystemTime};

fn main() {
    let prev_click_time = Mutex::new(SystemTime::now());

    let callback = move |event: Event| -> Option<Event> {
        if let EventType::ButtonPress(Button::Left) = event.event_type {
            let curr_click_time = event.time;
            let mut prev_click_time = prev_click_time.lock().unwrap();

            if let Ok(duration) = curr_click_time.duration_since(*prev_click_time) {
                println!("Duration {:?}", duration);
                *prev_click_time = curr_click_time;
                if duration.as_millis() < 150 {
                    println!("Ignore Faulty Click");
                    return None;
                }
            }
        }
        Some(event)
    };

    if let Err(error) = grab(callback) {
        println!("Error: {:?}", error)
    }
}
```

Final notes: The `Mutex` part may seem complex and unnecessary for such a simple program.
I will share how I used [Google Bard](https://bard.google.com) to help me write this program in [another post](/post/rubber-duck-debugging-with-ai).
