import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Taco } from 'src/app/interfaces/taco';
import { TacoService } from 'src/app/services/taco.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public taco: Taco = new Taco();
  public index!: number;
  public editing: {state: boolean} = {state: false};
  public tacos!: Taco[];

  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    public tacoService: TacoService,
    public toastService: ToastService,
    public store: Store
  ) {
    this.tacoService.getTacos();
    this.store.subscribe((data: any) => {
      this.tacos = data.tacos;
    });
  }

  ngOnInit(): void {
  }

  setEditing() {
    this.editing = {state: false};
  }

  selectTaco(index: number) {
    this.index = index;
    this.taco = this.tacos[index];
    this.drawer.open().then(()=>{
    }, reason => {
      this.toastService.create(reason, '#cc0000');
      console.log('Unable to open drawer: '+reason);
    });
  }

  closeViewer(message?:string, color:string = '#0099cc') {
    this.drawer.close().then(() => {
      this.index = NaN;
      this.taco = new Taco();
      if(message) {this.toastService.create(message, color); }
      this.editing.state = false;
    }, reason => {
      this.toastService.create(reason, '#cc0000');
      console.log('Unable to close drawer: '+reason);
    });
  }

  updateTaco(taco: Taco) {
    this.tacoService.updateTaco(this.index, taco);
    this.closeViewer(`${taco.name} created/updated.`, '#00c851');
  }

  deleteTaco() {
    this.tacoService.deleteTaco(this.index);
    this.closeViewer(`Taco deleted.`, '#00c851');
  }

  startTaco() {
    this.index = this.tacos.length;
    this.taco = new Taco();
    this.editing.state = true;
    this.drawer.open().then(() => {
    }, reason => {
      this.toastService.create(reason, '#cc0000');
      console.log('Unable to open drawer: '+reason);
    });
  }

}
