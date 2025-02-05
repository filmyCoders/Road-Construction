import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedView1Component } from './detailed-view1.component';

describe('DetailedView1Component', () => {
  let component: DetailedView1Component;
  let fixture: ComponentFixture<DetailedView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedView1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
