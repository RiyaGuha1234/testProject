import {Directive, HostBinding, HostListener,Output ,EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Output() private fileDropped: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('class.fileOver') fileOver: boolean;
  constructor() { }
  //dragOver Listener
  @HostListener('dragOver', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Drag Over');
  }
  //dargLeave Listener
  @HostListener('dragLeave', ['$event']) public  onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Drag Leave');
  }
  //drop Listener
  @HostListener('drop', ['$event']) public  onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if(files.length > 0 ){
      // tslint:disable-next-line:no-unused-expression
      this.fileDropped.emit;
    }
  }
}
