import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendasDistribuidorComponent } from './tiendas-distribuidor.component';

describe('TiendasDistribuidorComponent', () => {
  let component: TiendasDistribuidorComponent;
  let fixture: ComponentFixture<TiendasDistribuidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendasDistribuidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendasDistribuidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
