import { CicloEscolarController } from "../controllers/cicloEscolar.controller";

export class CicloEscolarRoutes {
    private cicloEscolarController: CicloEscolarController = new CicloEscolarController();

    public routes(app): void {
        app.route('/cicloEscolar')
        .get(this.cicloEscolarController.obtenerCicloEscolar)
        .post(this.cicloEscolarController.crearCicloEscolar);

        app.route('/cicloEscolar/:id')
        .put(this.cicloEscolarController.actualizarCicloEscolar)
        .delete(this.cicloEscolarController.eliminarCicloEscolar);        
    }
}