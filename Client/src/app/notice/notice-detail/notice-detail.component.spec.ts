import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeDetailComponent } from './notice-detail.component';

describe('NoticeDetailComponent', () => {
  let component: NoticeDetailComponent;
  let fixture: ComponentFixture<NoticeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
