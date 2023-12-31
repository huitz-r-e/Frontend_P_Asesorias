import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructores-desactivados',
  templateUrl: './instructores-desactivados.component.html',
  styleUrls: ['./instructores-desactivados.component.css']
})
export class InstructoresDesactivadosComponent {


  ngOnInit(): void {

    this.getInstructores()
  }


  constructor(private userS: UserService, private rou: Router) {
  }
  pageSize = 4; // Cantidad de Instructores por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortusers();
  }

  // Función para ordenar los Instructores según el criterio seleccionado
  sortusers() {
    this.expertsArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.name.localeCompare(b.name); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'edad') {
        return a.edad - b.edad; // Ordenar por edad (de menor a mayor)
      } else if (this.sortBy === 'genero') {
        return a.sexo.localeCompare(b.genero); // Ordenar por género (orden alfabético)
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los Instructores para la página actual
  getusersForCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.expertsArr.slice(startIndex, endIndex);
  }

  // Cambiar la página actual
  setPage(page: number) {
    this.currentPage = page;
  }

  // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.getInstructores.length / this.pageSize);
  }

  // Obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  expertsArr: any[] = [];

  getInstructores() {
    const route = "expertsdesactivados"
    const users = this.userS.getExpertosDesac(route).subscribe((res: any) => {
      // console.log(res.users);
      this.expertsArr = res.users;
      console.log(this.expertsArr);


    })
  }


  activar(id: number,) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Deseas activar experto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.userS.activarExpert(id).subscribe(
          (res: any) => {
            // Mostrar los datos en la consola
            console.log('Datos de estudiante:', res);
            this.expertsArr = this.expertsArr.filter((item) => item.id !== id);
            swalWithBootstrapButtons.fire(
              '¡Activación exitosa!',
              'El experto ha sido activado',
              'success'
            )
          },
          (error) => {
            console.error('Error al desactivar:', error);
          }
        );

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {

      }
    })
  }

  activarTodo() {
    this.userS.activarAllExperts().subscribe(
      () => {
        console.log('Se activaron todos los experts');
        this.goodNot();
        this.rou.navigate(['/homeadmin/Activo']);
      },
      (error) => {
        console.error('Error al activar los experts:', error);
      }
    );
  }

  confirmarAlert() {
    Swal.fire({
      title: '¿Estás seguro de activar todos los expertos?',
      text: "No podrás revertis esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.activarTodo(); // Pasa el id como argumento a la función borrarAsesoria()
      }
    });
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualización éxitosa!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
