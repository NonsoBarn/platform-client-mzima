import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TruncatePipe } from '../core/pipes';
import { DeleteDeploymentModalComponent } from './components/delete-deployment-modal/delete-deployment-modal.component';

import { DeploymentPageRoutingModule } from './deployment-routing.module';
import { SharedModule } from '@shared';

import { DeploymentPage } from './deployment.page';
import { LogoComponent } from './components/logo/logo.component';
import { DeploymentSearchBtnComponent } from './components/deployment-search-btn/deployment-search-btn.component';
import { DeploymentItemComponent } from './components/deployment-item/deployment-item.component';

const components = [
  LogoComponent,
  DeploymentSearchBtnComponent,
  DeploymentItemComponent,
  DeleteDeploymentModalComponent,
];

const pipes = [TruncatePipe];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeploymentPageRoutingModule,
    SharedModule,
    NgOptimizedImage,
  ],
  declarations: [DeploymentPage, ...components, ...pipes],
  exports: [DeploymentItemComponent],
})
export class DeploymentPageModule {}