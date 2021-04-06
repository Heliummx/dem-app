import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosTiendaComponent } from './productos-tienda.component';

describe('ProductosTiendaComponent', () => {
  let component: ProductosTiendaComponent;
  let fixture: ComponentFixture<ProductosTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
