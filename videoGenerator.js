const fs = require('fs');
const csv = require('csvtojson');
const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

// Set the path to the CSV file
const csvFilePath = './Untitled spreadsheet - Sheet1.csv';

const videos = [
  './pexels-ushindi-namegabe-16757506 (360p).mp4',
  './pexels-cottonbro-9694804 (540p).mp4',
  './pexels_videos_2795385 (720p).mp4',
  './video (540p) (1).mp4',
  './video (540p).mp4'
];

// Read and parse the CSV file
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    generateVideos(jsonObj);
  })
  .catch((err) => {
    console.error('Error reading CSV file:', err);
  });

function generateVideos(data) {
  data.forEach((row, index) => {
    const inputVideoPath = getVideoPath(index);
    const outputVideoPath = `output_${index + 1}.mp4`;
    const videoFilters = getVideoFilters(row);

    ffmpeg()
      .setFfmpegPath(ffmpegPath)
      .input(inputVideoPath)
      .videoFilters(videoFilters)
      .output(outputVideoPath)
      .on('end', () => {
        console.log(`Video created: ${outputVideoPath}`);
      })
      .on('error', (err) => {
        console.error(`Error creating video: ${err.message}`);
      })
      .run();
  });
}

function getVideoPath(index) {
  const videoIndex = index % videos.length;
  return videos[videoIndex];
}

function getVideoFilters(row) {
  const filters = [
    {
      filter: 'drawtext',
      options: {
        boxborderw: 10,
        box: 1,
        boxcolor: 'red',
        fontcolor: '#ffffff',
        fontsize: 17,
        text: row.field1,
        x: '(w-tw)/2',
        y: '(h/2-th-105)'
      }
    },
    {
      filter: 'drawtext',
      options: {
        fontcolor: 'green',
        fontsize: 30,
        text: row.field2,
        x: '(w-tw)/2',
        y: '(h/2-th-45)'
      }
    },
    {
      filter: 'drawtext',
      options: {
        fontcolor: 'yellow',
        fontsize: 30,
        text: row.field3,
        x: '(w-tw)/2',
        y: '(h/2-th-0)'
      }
    },
    {
      filter: 'drawtext',
      options: {
        fontcolor: 'red',
        fontsize: 30,
        text: row.field4,
        x: '(w-tw)/2',
        y: '(h/2+20)'
      }
    },
    {
      filter: 'drawtext',
      options: {
        fontcolor: 'blue',
        fontsize: 30,
        text: row.field5,
        x: '(w-tw)/2',
        y: '(h/2+55)'
      }
    },
    {
      filter: 'drawtext',
      options: {
        fontcolor: 'violet',
        fontsize: 30,
        text: row.field6,
        x: '(w-tw)/2',
        y: '(h/2+95)'
      }
    }
  ];

  return filters;
}
