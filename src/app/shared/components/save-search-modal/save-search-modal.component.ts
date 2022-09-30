import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleResult } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmModalService, RolesService } from '@services';
import { Savedsearch } from 'src/app/core/interfaces/savedsearches-response.interface';

export interface SaveSearchModalData {
  search?: Savedsearch;
}

@Component({
  selector: 'app-save-search-modal',
  templateUrl: './save-search-modal.component.html',
  styleUrls: ['./save-search-modal.component.scss'],
})
export class SaveSearchModalComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    category_visibility: ['everyone'],
    visible_to: [['admin']],
    featured: [false],
    defaultViewingMode: ['map'],
  });
  public roles: RoleResult[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<SaveSearchModalComponent>,
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private confirmModalService: ConfirmModalService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.rolesService.get().subscribe({
      next: (response) => {
        this.roles = response.results;

        if (this.data?.search) {
          this.form.patchValue({
            name: this.data.search.name,
            description: this.data.search.description,
            category_visibility:
              this.data.search.role?.length === this.roles.length ? 'everyone' : 'specific',
            visible_to: this.data.search.role,
            featured: this.data.search.featured,
            defaultViewingMode: this.data.search.view,
          });
        }
      },
    });
  }

  public cancel(): void {
    this.matDialogRef.close('cancel');
  }

  public formSubmit(): void {
    this.matDialogRef.close(this.form.value);
  }

  public async deleteSavedfilter(): Promise<void> {
    const confirmed = await this.confirmModalService.open({
      title: 'Are you sure you want to delete this saved filter?',
      description: `<p>${this.translate.instant('notify.default.proceed_warning')}</p>`,
    });

    if (!confirmed) return;

    this.matDialogRef.close('delete');
  }
}