<h1 align="center">
  <img alt="Whatsapp music bot" title="Whatsapp music bot" src=".github/wpp.png" width="200px" />
</h1>

<h3 align="center">
  WhatsApp Music Bot
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mlg404/whatsapp-music-bot.svg">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/mlg404/whatsapp-music-bot.svg">
   
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/mlg404/whatsapp-music-bot.svg">
  <a href="https://github.com/mlg404/whatsapp-music-bot/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mlg404/whatsapp-music-bot.svg">
  </a>
  
  <a href="https://github.com/mlg404/whatsapp-music-bot/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/mlg404/whatsapp-music-bot.svg">
  </a>
  
  <img alt="GitHub" src="https://img.shields.io/github/license/mlg404/whatsapp-music-bot.svg"> 
</p>

<h1 align="center" style="color:#ff0000">NOT WORKING</h1>
<p align="center">Github removed YTDL (a dependency to download youtube videos)</p>

<p align="center">
  <a href="#rocket-info">Info</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to">How to</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#mag_right-functionalities">Functionalities</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#busts_in_silhouette-contribute">Contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<p align="center" style="display: flex; align-items: center; justify-content:center;">
  <img alt="Web Gif" src=".github/cached.gif" width="250px">
  <img alt="Web Gif" src=".github/download.gif" width="250px">
  <img alt="Web Gif" src=".github/longest.gif" width="250px">
  <img alt="Web Gif" src=".github/groups.gif" width="250px">
  <img alt="Web Gif" src=".github/progress.gif" width="250px">
</p>

## :rocket: Info

Your whatsapp becomes a bot. You can send music's to your friend's just sending `!play SONG_NAME`

## :computer: Technologies

This project was developed following this technologies:

- [FFMPEG](https://ffmpeg.org/)
- [Nodemon](https://nodemon.io/)
- [Node.js](https://nodejs.org/en/)
- [VS Code][vc] 
- [YouTube Search](https://www.npmjs.com/package/yt-search)
- [QrCode Terminal](https://www.npmjs.com/package/qrcode-terminal)
- [Whatsapp WEB js](https://pedroslopez.me/whatsapp-web.js/)
- [YouTube Downloader](https://www.npmjs.com/package/yt-dl-playlist)



## :information_source: How To

To clone this application you will need [Git](https://git-scm.com) + [Node.js v12.15.0][nodejs] or higher + [Yarn v1.22.4][yarn] or higher installed in your computer. Run in terminal:

```bash
# Clone this repo
$ git clone https://github.com/mlg404/whatsapp-music-bot.git whatsapp-music-bot

# Access this repo
$ cd whatsapp-music-bot

# Install dependencies with yarn
$ yarn install 
# or via npm
$ npm install 

# Run the application with yarn (or npm run dev)
$ yarn dev
```

You need to configure your `ffmpeg Path` (line 65 in index.js). Remeber to previously download and instal ffmpeg (for convertions).

After run the script, you need to scan the QrCode in your terminal with your whatsapp! (Same proccess to join whatsapp web)

## :mag_right: Functionalities

See the current features!
- Search a song directly from youtube;
- Song's searched are downloaded for optimize next searches;
- Send song's in private or group's;
- Your friend's can send the command too;
- You can enable the "Download progress";
- Prevent download videos with mora than 15 minutes

## :busts_in_silhouette: Contribute

- Fork this repository;
- Create one branch with your feature: `git checkout -b my-feature`;
- Commit your alterations: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`.

Open a pull request with your branch. After yout pull request merge, you should delete your branch.

## :memo: License
This project is under MIT license. See [LICENSE](https://github.com/mlg404/whatsapp-music-bot/blob/master/LICENSE) for more information.

---

Made with 💙 by Victor Eyer :wave: [Get in touch!](https://www.linkedin.com/in/victoreyer/)

[nodejs]: https://nodejs.org/
[yarn]: https://classic.yarnpkg.com/lang/en/
[vc]: https://code.visualstudio.com/
