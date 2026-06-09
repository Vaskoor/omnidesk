const axios = require('axios');

class TikTokService {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async publishVideo(videoUrl, caption) {
    const res = await axios.post('https://open-api.tiktok.com/share/video/upload/', {
      access_token: this.accessToken,
      video_url: videoUrl,
      text: caption
    });
    return res.data;
  }

  async getInbox() {
    const res = await axios.get('https://open-api.tiktok.com/message/inbox/', {
      params: { access_token: this.accessToken }
    });
    return res.data;
  }
}

module.exports = TikTokService;
