import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellLoaderComponent } from './cell-loader.component';

describe('CellLoaderComponent', () => {
  let component: CellLoaderComponent;
  let fixture: ComponentFixture<CellLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CellLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
