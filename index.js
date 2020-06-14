const fs = require('fs');
const path = require('path');
const yts = require('yt-search');
const qrcode = require('qrcode-terminal');
const DownloadYTFile = require('yt-dl-playlist');
const { Client, MessageMedia } = require('whatsapp-web.js');

const downloadStatus = {};
const downloadedMusics = [];
const client = new Client();
const downloadPath = path.resolve(__dirname, 'downloads');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', async () => {
    console.log('Conectado com sucesso!');
    await fs.readdir(path.resolve(__dirname, 'downloads'), (err, itens) => {
      itens.map(item => downloadedMusics.push(item));
    });
    downloadStatus.baixando = false;
    
});

client.on('message_create', async message => {
  if(message.body.startsWith('!musicas') && message.fromMe){
    console.log(downloadedMusics);
  }

  if(message.body.startsWith('!info') && message.fromMe){
    console.log(message);
    client.sendMessage(message.to, 'kkkkk')
  }
  if(message.body.startsWith('!play')){
    const opts = {
      query: message.body.split('!play')[1],
      pageStart: 1,
      pageEnd: 3, 
    }

    const { videos } = await yts(opts);

    if (videos.length == 0) {
      return message.reply("Não encontrado, tente novamente");   
    }

    const { videoId, title, duration } = videos[0];

    if (downloadedMusics.includes(`${videoId}.mp3`)){
      media =  MessageMedia.fromFilePath(path.resolve(__dirname, 'downloads', `${videoId}.mp3`));
      return message.reply(media);   
    } else if (duration.seconds >= 900) {
      return message.reply("Músicas com mais de *15 minutos* não são permitidas!");
    }
    if (downloadStatus.baixando == true) {
      return message.reply("Algúem em algum lugar do meu zipzopt já está baixando uma música no momento. Aguarde! (ou me pague um servidor pro bot)");
    }

    downloadStatus.baixando = true;
    message.reply("*INICIANDO DOWNLOAD:* _Esta ação pode demorar um pouco!_");

    const downloader = new DownloadYTFile({ 
      outputPath: downloadPath,
      ffmpegPath: '/usr/bin/ffmpeg',
      maxParallelDownload: 1,
    });


    /* UNCOMMENT TO SHOW DOWNLOAD PROGRESS */
    // downloader.on('progress', (fileInfo) => {
    //   //console.log(fileInfo.progress)
    //   const totalTime = fileInfo.ref.duration;
    //   const atualTime = fileInfo.progress.timemark;
    //   const atualSeconds = Number(atualTime.split(":")[1]*60) + Number(atualTime.split(":")[2]);
    //   client.sendMessage(message.to, `Downloading: ${(atualSeconds*100/totalTime).toFixed(0)}%`)
    // })

    const download = await downloader.download(videoId, `${videoId}.mp3`);
    if (!download){
      return message.reply("Erro, tente novamente.");
    }

    downloadStatus.baixando = false;

    media =  MessageMedia.fromFilePath(path.resolve(__dirname, 'downloads', `${videoId}.mp3`));
    return message.reply(media);
  }
});

client.initialize();