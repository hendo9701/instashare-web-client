export class FileModel {
  id: string = '';
  fileName: string = '';
  owner: string = '';
  size: number = 0;
  mimeType: string = '';
  fileStatus: string = '';

  constructor(
    id: string,
    fileName: string,
    owner: string,
    size: number,
    mimeType: string,
    fileStatus: string
  ) {
    this.id = id;
    this.fileName = fileName;
    this.owner = owner;
    this.size = size;
    this.mimeType = mimeType;
    this.fileStatus = fileStatus;
  }
}
