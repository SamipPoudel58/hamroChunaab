import express from 'express';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('..uploading');
  try {
    const files = req.body.data;
    console.log(files.length);
    const urls = [];
    if (files) {
      const fileList = Array.from(files);
      for (const file of fileList) {
        const uploadResponse = await cloudinary.uploader.upload(file, {
          upload_preset: 'hamrovote',
        });
        urls.push({
          secure_url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
        });
      }
      console.log('..upload success');
      res.json(urls);
    } else {
      res.status(500).json({ msg: 'Image not found' });
    }
  } catch (err) {
    console.error('..uploading error', err);
    res.status(500).json({ msg: 'Image upload failed', err });
  }
});

export default router;
