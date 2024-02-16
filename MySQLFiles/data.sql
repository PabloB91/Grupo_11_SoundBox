/* Script para poblar las tablas correspondientes a Usuarios */


insert into `user_type`
(user_type)
values ('admin'),('common_user')

insert into country
(country)
values ('Argentina'), ('Colombia')

/* Antes de crear cualquier usuario, las tablas anteriores tienen que tener registros, ya que existen relaciones */
/* Si no, tira error de 'CONSTRAINTS'*/
INSERT INTO soundbox.`user`
(id, first_name, last_name, password, e_mail, image, registered_date, user_type_id, country_id)
values
(1, 'Usuario', 'Administrador', 'monito123!', 'mail@mail.com', NULL ,NOW(), 1, 1), 
(2, 'José', 'López', 'monito123!', 'jose@mail.com', NULL ,NOW(), 2, 1),
(3, 'Juan', 'Pérez', 'monito123!', 'juan@mail.com', null, NOW(), 2, 1),
(4, 'María', 'González', 'monito123!', 'maria@mail.com', null, NOW(), 2, 2),
(5, 'Laura', 'Benegas', 'monito123!', 'laura@mail.com', null,  NOW(), 2, 2)

