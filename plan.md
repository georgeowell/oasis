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

```javascript
const viewBase = require('views/html-base')
const viewMessage = require('views/html-message')
const modelPost = require('models/post')

router.get('/thread/:message', async (ctx) => {
  const { message } = ctx.params

  const messages = await modelPost.messagesFromThread()

  ctx.body = base(
    viewMessage.map(htmlMessage)
  )
})
```
