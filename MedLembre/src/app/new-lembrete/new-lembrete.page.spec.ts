import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewLembretePage } from './new-lembrete.page';

describe('NewLembretePage', () => {
  let component: NewLembretePage;
  let fixture: ComponentFixture<NewLembretePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewLembretePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
