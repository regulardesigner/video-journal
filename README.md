# video-journal project

Video-journal is a web application for recording short videos. It's just like a personal diary but in video. 

## How does Video Journal work?

Open the application and record your first videos. The videos are stored directly in your browser and remain totally private because they are not transmitted to any server. The videos are entirely saved into your device.

You can use Video-Journal on your phone or your computer.

## FAQ

1️⃣ Do I need to register to use Video-Journal? 
_No, at the moment you do not need to register to use Video-Journal._

2️⃣ Can I view the videos recorded on my computer on my phone?
_No, since the videos are saved in your browser's memory you will not be able to find them on your phone._

3️⃣ How do I delete a video on Video-Journal?
_Use the "Delete" button just below the video. (Important, there is no message to warn you when you hit the deleted button. Deleted videos are permanently deleted)._

4️⃣ How many videos can I save into my device?
_I don't know it's depends of the memory allowed by your browser_

For more information about the browser storage limits.
- [Browser storage limits and eviction criteria][browser_eviction].
- [Storage for the web][storage_web].

⚠️ Important: Video-Journal doesn't work on Safari.

## information about the project.

The project use [VueJS][vuejs_url] (2) and the Javascript API [IndexedDB][indexedDB_url] to store the videos.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

[vuejs_url]: https://vuejs.org/
[indexedDB_url]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[browser_eviction]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[storage_web]: https://web.dev/storage-for-the-web/
