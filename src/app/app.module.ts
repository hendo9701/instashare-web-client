import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {rootRouterConfig} from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {IconDefinition} from '@ant-design/icons-angular';
import {
  UserOutline,
  LockOutline,
  UploadOutline,
  DownloadOutline,
  FileTwoTone,
  MailOutline,
  LogoutOutline
} from '@ant-design/icons-angular/icons';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import {LoginComponent} from './app-project/components/login/login.component';
import {PageNotFoundComponent} from './app-project/components/page-not-found/page-not-found.component';
import {RegisterComponent} from './app-project/components/register/register.component';
import {FilesGridComponent} from './app-project/components/files-grid/files-grid.component';

const icons: IconDefinition[] = [
  UserOutline,
  LockOutline,
  UploadOutline,
  DownloadOutline,
  FileTwoTone,
  MailOutline,
  LogoutOutline
];

@NgModule({
  declarations: [
    AppComponent, LoginComponent, PageNotFoundComponent, RegisterComponent, FilesGridComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzCheckboxModule,
    NzResultModule,
    NzMenuModule,
    NzLayoutModule,
    NzTableModule,
    NzPaginationModule,
    NzUploadModule,
    NzIconModule.forChild(icons),
    RouterModule.forRoot(rootRouterConfig, {useHash: false, enableTracing: false}),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
