import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilesGridRoutes} from './files-grid-routing.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {FilesGridComponent} from './files-grid.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CommonModule} from "@angular/common";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { NzUploadModule } from 'ng-zorro-antd/upload';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [FilesGridComponent],
  imports: [
    NzTableModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule.forChild(FilesGridRoutes),
    CommonModule,
    NzPaginationModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    NzInputModule,
    NzCheckboxModule
  ]
})
export class FilesGridModule {
}
