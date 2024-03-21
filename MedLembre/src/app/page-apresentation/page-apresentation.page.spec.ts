import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageApresentationPage } from './page-apresentation.page';

describe('PageApresentationPage', () => {
  let component: PageApresentationPage;
  let fixture: ComponentFixture<PageApresentationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PageApresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
