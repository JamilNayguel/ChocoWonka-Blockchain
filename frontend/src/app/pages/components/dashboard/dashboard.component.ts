import { Component, OnInit, HostListener  } from '@angular/core';
import { ListProductHomeService } from '../../shared/services/list-product-home.service';
import { Product } from 'src/app/interfaces/list-products.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = []; // Lista de productos
  cart: { product: Product; quantity: number; total: number }[] = []; // Carrito
  isSticky: boolean = false;
  showModal: boolean = false; // Controla la visibilidad del modal
  totalGeneral: number = 0; // Total general del carrito

 
  constructor(private listProductService: ListProductHomeService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }
  
  // Método para obtener productos del servicio
  getProducts() {
    this.listProductService.getProducts(1, 10).subscribe({
      next: (response) => {
        // Transformar los productos para agregar la URL correcta de la imagen
        this.products = response.products.map((product: Product) => ({
          ...product,
          path: this.listProductService.getImageUrlGender(product.path) // Generar URL de la imagen
        }));
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset;
    this.isSticky = offset > 600;
  }



  // Agregar producto al carrito
  addToCart(product: Product) {
    const existingItem = this.cart.find((item) => item.product.id === product.id);
  
    if (existingItem) {
      existingItem.quantity++;
      existingItem.total = existingItem.quantity * product.price;
    } else {
      this.cart.push({ product, quantity: 1, total: product.price });
    }
  
    // Actualiza el total general
    this.updateTotalGeneral();
  }

  // Mostrar u ocultar el modal
  toggleModal() {
    this.showModal = !this.showModal;
  }

  // Método para quitar un producto del carrito
  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  
    // Actualiza el total general
    this.updateTotalGeneral();
  }
  
  updateItemTotal(item: { product: Product; quantity: number; total: number }) {
    // Si la cantidad es válida, actualiza el total del producto
    if (item.quantity > 0) {
      item.total = item.quantity * item.product.price;
    } else {
      item.quantity = 1; // Asegúrate de que la cantidad mínima sea 1
      item.total = item.product.price;
    }
  
    // Actualiza el total general del carrito
    this.updateTotalGeneral();
  }
  
  // Actualizar el total general del carrito
  updateTotalGeneral() {
    this.totalGeneral = this.cart.reduce((acc, item) => acc + item.total, 0);
  }

  // Redirigir a la transacción
  proceedToTransaction() {
    const transactionData = {
      items: this.cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total_price: this.totalGeneral,
    };
  
    // Redirigir y enviar datos al componente de transacción
    this.router.navigate(['transaccion'], { state: { data: transactionData } });
  }

}
