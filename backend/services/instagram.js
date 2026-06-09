const axios = require('axios');

class InstagramService {
  constructor(accessToken, igUserId = null) {
    this.accessToken = accessToken;
    this.igUserId = igUserId;
  }

  async publishMedia(imageUrl, caption) {
    const mediaContainer = await axios.post(`https://graph.facebook.com/v17.0/${this.igUserId}/media`, null, {
      params: { image_url: imageUrl, caption, access_token: this.accessToken }
    });
    const creationId = mediaContainer.data.id;
    const publish = await axios.post(`https://graph.facebook.com/v17.0/${this.igUserId}/media_publish`, null, {
      params: { creation_id: creationId, access_token: this.accessToken }
    });
    return publish.data;
  }

  async sendDirectMessage(recipientId, text) { /* Instagram DM via Graph API */ }
}

module.exports = InstagramService;
