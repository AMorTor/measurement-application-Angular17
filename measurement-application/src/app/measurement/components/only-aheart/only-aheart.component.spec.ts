import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyAHeartComponent } from './only-aheart.component';

describe('OnlyAHeartComponent', () => {
  let component: OnlyAHeartComponent;
  let fixture: ComponentFixture<OnlyAHeartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnlyAHeartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlyAHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
