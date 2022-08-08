import {Component, OnInit} from '@angular/core';
import {en_US, NzI18nService} from "ng-zorro-antd/i18n";
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {FileModel} from "../../models/fileModel";
import {FileService} from "../../services/file.service";
import {RenameFileModel} from "../../models/renameFileModel";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {NzButtonSize} from "ng-zorro-antd/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css'],
})
export class FilesGridComponent implements OnInit {
  data: Blob | null | undefined;
  current = 1;
  pageSize = 10;
  total = 1;
  editId: string | null = null;
  uploadUrl = `${environment.apiUrl}/v1/files`;
  headers: HttpHeaders = new HttpHeaders();
  loggedUserEmail = '';
  size: NzButtonSize = 'large'

  listOfColumn = [
    {
      title: 'File Name',
      compare: (a: FileModel, b: FileModel) => a.fileName.localeCompare(b.fileName),
      priority: false
    },
    {
      title: 'Size (Mb)',
      compare: (a: FileModel, b: FileModel) => a.size - b.size,
      priority: false
    },
    {
      title: 'Content Type',
      compare: (a: FileModel, b: FileModel) => a.mimeType.localeCompare(b.mimeType),
      priority: false
    },
    {
      title: 'Status',
      compare: (a: FileModel, b: FileModel) => a.fileStatus.localeCompare(b.fileStatus),
      priority: false
    }
  ];
  listOfData: FileModel[] = [];

  constructor(
    private i18n: NzI18nService,
    private fileService: FileService,
    private authService: AuthService,
    protected http: HttpClient,
    private router: Router) {
    this.i18n.setLocale(en_US);
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.loggedUserEmail = this.authService.getUser();
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.fileService.getCount().subscribe(count => {
      this.total = count;
      this.fileService.getFiles(this.pageSize, 0).subscribe(fileList => {
        this.listOfData = fileList;
      });
    });
  }

  truncateSize(size: number) {
    const sizeInMb = size/1048576;
    return Number(sizeInMb.toFixed(4));
  }

  onCurrentPageDataChange(): void {
    this.fileService.getFiles(this.pageSize, this.current - 1).subscribe(fileList => {
      this.listOfData = fileList;
    });
  }

  startEdit(fileName: string): void {
    this.editId = fileName;
  }

  stopEdit(data: FileModel): void {
    this.editId = null;
    this.fileService.updateFileName(data.id, new RenameFileModel(data.fileName)).subscribe(_ => {
    });
  }

  downloadFile(id: string, fileName: string): void {
    this.fileService
      .downloadLink(id)
      .subscribe(
        (resp) => {
          let blob: Blob = resp.body as Blob;
          let a = document.createElement('a');
          a.download=fileName;
          a.href = window.URL.createObjectURL(blob);
          a.click();
        });
  }

  defaultFileList: NzUploadFile[] = [];

  fileList1 = [...this.defaultFileList];

  handleUpload = (item: any) => {
    const formData = new FormData();
    formData.append(item.name, item.file as any);
    return this.http.post(this.uploadUrl, formData, {headers: this.headers}).subscribe(
      res => {
        item.onSuccess(item.file);
        this.fileService.getFiles(this.pageSize, 0).subscribe(fileList => {
          this.listOfData = fileList;
          console.log(res)
        });
      },
      (err) => {
        item.onError(err, item.file);
      });
  }

  logout() {
    this.authService.cleanToken();
    this.router.navigate(['/projects/login']);
  }
}
