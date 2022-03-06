# Clips Video Sharing Apllication
## _Using Angular & Firebase_

Clips ia a video sharing application created by angular v13 & firbase,

## Features

- login & register using firestore database
- store files (video & image) in firestorage
- Each user can upload and share videos.
- Video & image processing using ffmpeg library (wab assembly).
- Multi language translating (english & fransh) using ng-translate library

## Installation

Clips requires [Node.js](https://nodejs.org/) v16.13.0+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd clips
npm i
ng serve --open
```

For .env file

```sh
NG_APP_API_KEY= Your_API_KEY
NG_APP_AUTH_DOMAIN= Your_AUTH_DOMAIN
NG_APP_PROJECT_ID= Your_PROJECT_ID
NG_APP_STORAGE_BUCKET= Your_STORAGE_BUCKET
NG_APP_MESSAGING_SENDER_ID= Your_MESSAGING_SENDER_ID
NG_APP_APP_ID= Your_APP_APP_ID
```

## Libraries

Clips Video Sharing is currently created with the following libraries.
Instructions on how to use them in your own application are linked below.

| Plugin | NPM | Version |
| ------ | ------ | ------ |
| firebase | [https://www.npmjs.com/package/@angular/fire][NGFire] | ^9.4.0
| ngx-mask | [https://www.npmjs.com/package/ngx-mask][NGMASK] | ^13.1.1
| video.js | [https://www.npmjs.com/package/video.js][VIDEOJS] | ^7.17.0
| @ngx-env | [https://www.npmjs.com/package/@ngx-env/core][NGXENV] | ^2.0.2
| ffmpeg | [https://www.npmjs.com/package/ffmpeg][FFMPEG] | ^0.10.1
| angular-notifier | [https://www.npmjs.com/package/angular-notifier][NGNOTIFIER] | ^11.0.0
| @ngx-translate | [https://www.npmjs.com/package/@ngx-translate/core][NGTRANSLATE] | ^14.0.0

> Note:  you cand find more in `package.json` file.

[⬆ back to top](#clips-video-sharing-apllication)

## Screenshots
##### Home Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/012.png "main")
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/113.png "home page")
[⬆ back to top](#clips-video-sharing-apllication)

##### Manage Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/211.png "manage page")
[⬆ back to top](#clips-video-sharing-apllication)

##### Upload Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/311.png "upload page")
[⬆ back to top](#clips-video-sharing-apllication)

##### Video Processing
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/411.png "video processing")
[⬆ back to top](#clips-video-sharing-apllication)

##### image Processing
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/511.png "image processing")
[⬆ back to top](#clips-video-sharing-apllication)

##### Video Viwe Page
![alt text](https://i55.servimg.com/u/f55/13/79/70/03/611.png "video viwe page")
[⬆ back to top](#clips-video-sharing-apllication)

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[dill]: <https://github.com/joemccann/dillinger>
[git-repo-url]: <https://github.com/joemccann/dillinger.git>
[john gruber]: <http://daringfireball.net>
[df1]: <http://daringfireball.net/projects/markdown/>
[markdown-it]: <https://github.com/markdown-it/markdown-it>
[Ace Editor]: <http://ace.ajax.org>
[node.js]: <http://nodejs.org>
[Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
[jQuery]: <http://jquery.com>
[@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[Gulp]: <http://gulpjs.com>

[NGFire]: <https://www.npmjs.com/package/@angular/fire>
[NGMASK]: <https://www.npmjs.com/package/ngx-mask>
[VIDEOJS]: <https://www.npmjs.com/package/video.js>
[NGXENV]: <https://www.npmjs.com/package/@ngx-env/core>
[FFMPEG]: <https://www.npmjs.com/package/ffmpeg>
[NGNOTIFIER]: <https://www.npmjs.com/package/angular-notifier>
[NGTRANSLATE]: <https://www.npmjs.com/package/@ngx-translate/core>
