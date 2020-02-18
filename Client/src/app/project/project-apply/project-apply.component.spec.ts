import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectApplyComponent } from './project-apply.component';

describe('ProjectApplyComponent', () => {
  let component: ProjectApplyComponent;
  let fixture: ComponentFixture<ProjectApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
