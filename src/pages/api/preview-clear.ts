export default function handler(req, res) {
  res.clearPreviewDate();
  res.status(200).json({ message: 'cookies cleared successfully' });
}
