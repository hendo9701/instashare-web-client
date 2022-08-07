import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutes } from './app-project.routing';

import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  UserOutline,
  LockOutline,
  UploadOutline,
  DownloadOutline,
  FileTwoTone,
  MailOutline,
  LogoutOutline
} from '@ant-design/icons-angular/icons';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { RegisterComponent } from './components/register/register.component';
import {NzMenuModule} from "ng-zorro-antd/menu";

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
  declarations: [LoginComponent, PageNotFoundComponent, RegisterComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    HttpClientModule,
    NzCheckboxModule,
    NzResultModule,
    NzIconModule.forChild(icons),
    RouterModule.forChild(ProjectRoutes),
    NzMenuModule,
  ]
})
export class AppProjectModule { }
