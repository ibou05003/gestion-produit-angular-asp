import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  produits: any=[];

  modalTitle="";
  Id=0;
  Libelle="";
  Description="";
  PU=0;
  Quantitee=0;
  DatePeremtion="";

  constructor(private produitService: ProduitService,private auth: AuthService) {
    
  }
  isLogin =this.auth.isAuthenticated()

  ngOnInit(): void {
    if (this.isLogin) {
      this.refreshList();

    } else {
      this.auth.logout()
    }
    this.refreshList();
  }

  refreshList(){
    this.produitService.getEmployees().subscribe(
      res=>{
        console.log(res);
        this.produits=res;
        console.log(this.produits);
      },
      err=>{
        console.log(err);
      }
    )
  }

  addClick(){
    this.modalTitle="Ajout Employee";
    this.Id=0;
    this.Libelle="";
    this.Description="";
    this.PU=0;
    this.Quantitee=0;
    this.DatePeremtion="";
  }

  editClick(produit:any){
    this.modalTitle="Modification Employee";
    this.Id=produit.Id;
    this.Libelle=produit.Libelle;
    this.Description=produit.Description;
    this.PU=produit.PU;
    this.Quantitee=produit.Quantitee;
    this.DatePeremtion=produit.DatePeremtion;
  }

  createClick(){
    var produit={
      Libelle:this.Libelle,
      Description:this.Description,
      PU:this.PU,
      Quantitee:this.Quantitee,
      DatePeremtion:this.DatePeremtion
    };

    this.produitService.create(produit).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateClick(){
    var produit={
      Id:this.Id,
      Libelle:this.Libelle,
      Description:this.Description,
      PU:this.PU,
      Quantitee:this.Quantitee,
      DatePeremtion:this.DatePeremtion
    };

    this.produitService.update(produit,produit.Id).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  delete(id:any){
    if (confirm('Etes-vous sur de vouloir supprimer?')) {
      this.produitService.delete(id).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
    }
    
  }
  clickPdf(){
    
    this.produitService.loadPdf().subscribe(
      res=>{
        console.log(res)
        window.open(res, '_blank', 'fullscreen=yes'); 
        return false
          },
      err=>{
        console.log(err);
      }
    )
  }
}
