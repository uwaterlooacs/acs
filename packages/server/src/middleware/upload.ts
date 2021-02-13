import type { AuthenticatedRequest } from 'types/request';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req: AuthenticatedRequest, file, cb) {
    const name = `${req.user?._id}-${req.query.id}${path.extname(
      file.originalname,
    )}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

export default upload;
