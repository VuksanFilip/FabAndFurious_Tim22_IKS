import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/service/driver/driver.service';
import { Document, DocumentRequest } from 'src/app/model/Document';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-driver-documents',
  templateUrl: './driver-documents.component.html',
  styleUrls: ['./driver-documents.component.css'],
})
export class DriverDocumentsComponent implements OnInit {
  documents: Array<Document> = [];

  taskArray: DocumentsContent[] = [];

  addDocumentForm = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
  });

  fillTable(task: DocumentsContent) {
    this.taskArray.push(task);
  }

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverService.getDriverDocuments(5).subscribe((documents2) => {
      this.documents = documents2;
      this.generateSmartTable();
    });
  }

  generateSmartTable() {
    for (let i = 0; i < this.documents.length; i += 1) {
      this.fillTable({
        column1: this.documents[i],
        column2: this.documents[i + 1],
      });
    }
  }

  deleteDocument(): void {
    this.driverService.deleteDriverDocument('1').subscribe((documents2) => {
      this.documents = documents2;
      this.generateSmartTable();
    });
  }

  addDocument(): void {
    const adddocument: DocumentRequest = {
      name: this.addDocumentForm.value.name!,
      documentImage: this.addDocumentForm.value.image!,
    };

    this.driverService
      .addDriverDocument(5, adddocument)
      .subscribe((documents2) => {
        this.documents = documents2;
        this.generateSmartTable();
      });
    document.location.reload();
  }

  show(): void {
    const form = document.getElementById('form');
    if (form != null) {
      if (form.style.display === 'none') {
        form.style.display = 'block';
      } else {
        form.style.display = 'none';
      }
    }
  }
}

export interface DocumentsContent {
  column1: Document;
  column2: Document;
}
