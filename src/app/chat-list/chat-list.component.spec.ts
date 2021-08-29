import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListComponent } from './chat-list.component';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let component: ChatListComponent;
    let fixture: ComponentFixture<ChatListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ChatListComponent]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ChatListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should navigate to sign-in page if not connected to backend-service', () => {

      // act
      //component.ngOnInit()
    });
  });
});




