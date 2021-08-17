import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LogsTicketsModel } from 'src/app/Interfaces/IlogsTickets';
import { TicketRequesModel } from 'src/app/Interfaces/ITickets';
import { LogsTicketsService } from 'src/app/Services/LogsTickets/logs-tickets.service';
import { TicketsService } from 'src/app/Services/Tickets/tickets.service';

@Component({
  selector: 'app-tickets-module',
  templateUrl: './tickets-module.component.html',
  styleUrls: ['./tickets-module.component.css']
})
export class TicketsModuleComponent implements OnInit {

  FormSolution: FormGroup;
  FormDetailsSolutions = new FormControl('');

  //variables dinamicas
  ListaCurrentTickets: TicketRequesModel[];
  ListaLogsTickets: LogsTicketsModel[];
  TicketSeleccionado: TicketRequesModel;

  //variables de formulario
  Getclient: string;
  Getticket: number;
  Getdetails: string;
  GetId: string;
  GetEmailNotifyTo: string;

  //States para html
  SetAlert: boolean;
  SetCurrentTicketTrue: boolean;
  SetHistoryTickets: boolean;

  constructor(private TicketsServiceAPI: TicketsService, private LogsTicketsAPI: LogsTicketsService, private FormSolutionBuilder: FormBuilder) {

    this.FormSolution = this.FormSolutionBuilder.group({
      FormDetailsSolutions: ['', Validators.required]
    })

  }

  GetTicketsAll() {

    this.TicketsServiceAPI.GetCurrentTickets().subscribe((result: any) => {

      this.ListaCurrentTickets = result;
      this.SetHistoryTickets = false;
      this.SetCurrentTicketTrue = true;
    }, (error: HttpErrorResponse) => {

      alert(JSON.stringify(error.error))

    })
  }
  getTicketCompleted() {

    this.LogsTicketsAPI.GetTicketsCompleted().subscribe((result: any) => {

      this.ListaLogsTickets = result;
      this.SetCurrentTicketTrue = false;
      this.SetHistoryTickets = true;

    }, (error: HttpErrorResponse) => {

      alert("OCURRIO UN PROBLEMA AL CARGAR EL HISTORIAL DE TICKETS: " + "\n" + JSON.stringify(error.error))
    })


  }

  SetTicketToForm(emailToNotifitication: string, name: string, ticketNumber: number, detailsPhrase: string, idTicket: string) {

    console.log(this.GetEmailNotifyTo);

    this.Getclient = name;
    this.Getticket = ticketNumber;
    this.Getdetails = detailsPhrase;
    this.GetId = idTicket;
    this.GetEmailNotifyTo = emailToNotifitication;

  }

  GetSelectedTicket(ticket: any) {

    const comprobacion = confirm("ESTAS SEGURO DE COMPLETAR EL TICKET: " + this.Getticket);
    console.log(this.GetEmailNotifyTo);


    if (comprobacion) {

      const Ticket: LogsTicketsModel = {
        _id: this.GetId,
        ticketNumber: this.Getticket,
        name: this.Getclient,
        typeRequest: ticket.typeRequest,
        details: this.Getdetails,
        solutionDetails: this.FormSolution.get('FormDetailsSolutions').value,
        emailToNotifitication: this.GetEmailNotifyTo
      }


      //aca inicia el servicio para mandar al log:
      this.LogsTicketsAPI.PostLogUser(Ticket).subscribe((result: any) => {

        alert("SE COMPLETO EL TICKET: " + Ticket.ticketNumber);

        this.GetTicketsAll();

      }, (error: HttpErrorResponse) => {

        this.SetAlert = true;

      })



    } else {
      alert("OCURRIO UN DESCONOCIDO EN LA APLICACION O LA INFORMACION NO PUEDE SER PROCESADA")
    }

  }

  DeleteSelectedTicket(IdTicket: string) {

    const Confirmation = confirm("DO YOU WANT TO DELETE THE TICKET: ");

    if (Confirmation) {

      const DeleteTicketModel: TicketRequesModel = {
        _id: IdTicket,
        Details: "",
        Email: "",
        LastName: "",
        Name: "",
        Phone: 0,
        TicketNumber: 0,
        TypeRequest: ""
      }
      this.TicketsServiceAPI.DeleteTicket(DeleteTicketModel._id).subscribe(() => {

        alert("Se elimino el ticket: " + IdTicket);

      }, (error: HttpErrorResponse) => {

        this.GetTicketsAll();
      })

    } else if (!Confirmation) {
      alert("TICKET NOT DELETED!")
    }




  }

  displayedColumns: string[] = ['ticketNumber', 'RequestType', 'name', 'lastName', 'phone', 'details', 'dispatchDelete'];


  ngOnInit() {
    this.SetCurrentTicketTrue = true;
    this.SetHistoryTickets = false;
    this.GetTicketsAll();
    // const RealTicketsLoader = interval(60000);

    // RealTicketsLoader.subscribe((countRequest) => {


    //   this.GetTicketsAll();

    // })



  }

}
