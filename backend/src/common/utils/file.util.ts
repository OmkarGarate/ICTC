import * as fs from 'fs';
import * as path from 'path';

export const deleteFiles = (files: any) => {
  try {
    const allFiles = [
      ...(files?.heroImage || []),
      ...(files?.centerImage || []),
      ...(files?.gallery || []),
    ];

    allFiles.forEach((file) => {
      const filePath = path.join(process.cwd(), 'uploads', file.filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  } catch (err) {
    console.error('File delete error:', err);
  }
};