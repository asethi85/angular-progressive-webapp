import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDraftComponent } from './pet-draft.component';

describe('PetDraftComponent', () => {
  let component: PetDraftComponent;
  let fixture: ComponentFixture<PetDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetDraftComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
