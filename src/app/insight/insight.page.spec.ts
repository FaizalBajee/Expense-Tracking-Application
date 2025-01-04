import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightPage } from './insight.page';

describe('InsightPage', () => {
  let component: InsightPage;
  let fixture: ComponentFixture<InsightPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
