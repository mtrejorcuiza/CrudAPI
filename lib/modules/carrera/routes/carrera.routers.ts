import { CarreraController } from "../controllers/carrera.controller";

export class CarreraRoutes {
    private carreraController: CarreraController = new CarreraController();

    public routes(app): void {
        app.route('/carrera')
        .get(this.carreraController.obtenerCarreras)
        .post(this.carreraController.crearCarrera);

        app.route('/carrera/:id')
        .put(this.carreraController.actualizarCarrera)
        .delete(this.carreraController.eliminarCarrera);        
    }
}