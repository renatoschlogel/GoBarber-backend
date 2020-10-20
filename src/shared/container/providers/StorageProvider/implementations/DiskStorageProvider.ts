import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    if (!(await this.isExistFile(filePath))) {
      await fs.promises.unlink(filePath);
    }
  }

  private async isExistFile(file: string): Promise<boolean> {
    try {
      await fs.promises.stat(file);
      return true;
    } catch (error) {
      return false;
    }
  }
}
