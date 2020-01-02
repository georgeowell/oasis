# Refactor Plan

As discussed in a few issues, Oasis is currently being refactored to fix an
architectural bug where heavy and often-used files were placed as very deep
leaves in the dependency graph, which is a pain point. I've removed one layer
of abstraction, "pages", by moving them into the controller, but I think that
something like this would work better:

- controller.js
  - assets
    - style.css
  - views
    - blob-image.js
    - blob-raw.js
    - html-message.js
    - html-message.js
    - html-profile.js
    - html-template.js
  - models
    - ssb-consumer.js
    - ssb-provider.js

I'm imagining controller code that looks something like this:

```javascript
const viewBase = require("views/html-base");
const viewMessage = require("views/html-message");
const modelPost = require("models/post");

router.get("/thread/:message", async ctx => {
  const { message } = ctx.params;

  const messages = await modelPost.messagesFromThread();

  ctx.body = base(viewMessage.map(htmlMessage));
});
```

Please ping me (@christianbundy) if you have opinions on how to best refactor
this code, but I wanted to leave a note in here just in case others were
exploring my tree and wanted to see what's going on. :)
