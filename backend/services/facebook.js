const axios = require('axios');

class FacebookService {
  constructor(accessToken, pageId = null) {
    this.accessToken = accessToken;
    this.pageId = pageId;
  }

  async getUserProfile() {
    const res = await axios.get(`https://graph.facebook.com/me?access_token=${this.accessToken}`);
    return res.data;
  }

  async sendMessage(recipientId, message) {
    const response = await axios.post(`https://graph.facebook.com/v17.0/me/messages`, {
      recipient: { id: recipientId },
      message: { text: message }
    }, { params: { access_token: this.accessToken } });
    return response.data;
  }

  async fetchConversations() {
    const res = await axios.get(`https://graph.facebook.com/v17.0/me/conversations`, {
      params: { access_token: this.accessToken, fields: 'participants,updated_time' }
    });
    return res.data;
  }

  async publishPost(content, mediaUrl = null) {
    let params = { access_token: this.accessToken, message: content };
    if (mediaUrl) params.url = mediaUrl;
    const endpoint = this.pageId ? `/${this.pageId}/feed` : '/me/feed';
    const res = await axios.post(`https://graph.facebook.com/v17.0${endpoint}`, null, { params });
    return res.data;
  }
}

module.exports = FacebookService;
