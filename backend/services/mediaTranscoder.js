const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs').promises;

class MediaTranscoder {
  async resizeImage(inputPath, outputPath, width = 1080) {
    await sharp(inputPath).resize(width).toFile(outputPath);
    return outputPath;
  }

  async convertVideoForTikTok(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions(['-c:v libx264', '-preset fast', '-crf 23', '-c:a aac'])
        .size('1080x1920')
        .aspect('9:16')
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  async transcodeToPlatformFormat(platform, filePath) {
    const ext = path.extname(filePath);
    const outputDir = path.join(__dirname, '../../temp');
    await fs.mkdir(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, `transcoded_${Date.now()}${ext}`);
    if (['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
      return this.resizeImage(filePath, outputPath);
    } else if (platform === 'tiktok') {
      return this.convertVideoForTikTok(filePath, outputPath);
    }
    return filePath;
  }
}

module.exports = new MediaTranscoder();
