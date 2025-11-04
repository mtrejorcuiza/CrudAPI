import { UsuarioController } from "../controllers/usuario.controller";

export class UsuarioRoutes {
    private usuarioController: UsuarioController = new UsuarioController();

    public routes(app): void {
        app.route('/usuario')
        .get(this.usuarioController.obtenerUsuarios)
        .post(this.usuarioController.crearUsuario);

        app.route('/usuario/:id')
        .put(this.usuarioController.actualizarUsuario)
        .delete(this.usuarioController.eliminarUsuario);

        app.route('/password/change/:id')
        .put(this.usuarioController.cambiarPassword);

        app.route('/password/reset/:id')
        .put(this.usuarioController.reestablecerPassword);

        app.route('/login')
        .get(this.usuarioController.login);
    }
}