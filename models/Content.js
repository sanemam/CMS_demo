import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  contentType: {
    type: String,
    enum: ['image', 'video', 'post'],
    required: true,
    default: 'image',
  },
  // For images
  image: {
    type: String, // url from local upload or Cloudinary
  },
  // For videos and social media posts
  externalUrl: {
    type: String, // URL from YouTube, Facebook, Instagram, etc.
  },
  // Metadata for social media
  platform: {
    type: String,
    enum: ['youtube', 'facebook', 'instagram', 'twitter', 'tiktok', 'none'],
    default: 'none',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
