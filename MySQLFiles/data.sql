/* Script para poblar las tablas correspondientes a Usuarios */

INSERT INTO user_type
(user_type)
VALUES ('admin'),('common_user')

INSERT INTO country
(country)
VALUES ('Argentina'), ('Colombia')

/* Antes de crear cualquier usuario, las tablas anteriores tienen que tener registros, ya que existen relaciones */
/* Si no, tira error de 'CONSTRAINTS'*/

INSERT INTO soundbox.`user`
(id, first_name, last_name, password, e_mail, image, registered_date, user_type_id, country_id)
VALUES
(1, 'Usuario', 'Administrador', 'monito123!', 'mail@mail.com', NULL ,NOW(), 1, 1), 
(2, 'José', 'López', 'monito123!', 'jose@mail.com', NULL ,NOW(), 2, 1),
(3, 'Juan', 'Pérez', 'monito123!', 'juan@mail.com', NULL, NOW(), 2, 1),
(4, 'María', 'González', 'monito123!', 'maria@mail.com', NULL, NOW(), 2, 2),
(5, 'Laura', 'Benegas', 'monito123!', 'laura@mail.com', NULL,  NOW(), 2, 2),
(6, 'Federico', 'Agustin', 'monito123!', 'federico@mail.com', NULL,  NOW(), 2, 1),
(7, 'Francisco', 'José', 'monito123!', 'francisco@mail.com', NULL,  NOW(), 2, 2),
(8, 'Pablo', 'Gutierrez', 'monito123!', 'pablo@mail.com', NULL,  NOW(), 2, 2),
(9, 'Bautista', 'Juan', 'monito123!', 'bautista@mail.com', NULL,  NOW(), 2, 1),
(10, 'Jimenez', 'Benegas', 'monito123!', 'jimenez@mail.com', NULL,  NOW(), 2, 1),
(11, 'Micaela', 'Castro', 'monito123!', 'micaela@mail.com', NULL,  NOW(), 2, 2),
(12, 'Valentina', 'Castro', 'monito123!', 'valentina@mail.com', NULL,  NOW(), 2, 2),
(13, 'Miguel', 'Torrez', 'monito123!', 'miguel@mail.com', NULL,  NOW(), 2, 1),
(14, 'Lautaro', 'Espejo', 'monito123!', 'lautaro@mail.com', NULL,  NOW(), 2, 1),
(15, 'Thiago', 'Riuz', 'monito123!', 'thiago@mail.com', NULL,  NOW(), 2, 2)

--------------------> PRODUCTOS  <----------------------
INSERT INTO color  
(color_name)
VALUES ('Rojo'),('Amarillo'),('Azul'),('Negro')

INSERT INTO brand 
(brand_name)
VALUES ('Marshall'),('Zildjian'),('Gibson'),('Yamaha')

INSERT INTO category
(category)
VALUES ('Guitarra'),('Orquesta'),('Aerófonos'),('Cardófonos'),('flauta')

INSERT INTO state
(state)
VALUES ('Mas Vendido'),('Ultimo Visto'),('Recien Agregado')

INSERT INTO soundbox.product
(id, name, description, image, quantity, price, discount, color_id, brand_id, category_id, state_id)
VALUES
(1,'Guitarra clásica','hola','soundbox.jpg',15,150000,10, 1, 4, 2, 3),
(2, 'Guitarr6a Electrica','hola', 'soundbox.jpg', 8, 200000,NULL, 3, 2, 1, 3),
(3, 'Guitarr654a','hola', 'soundbox.jpg', 100, 250000,NULL, 4, 3, 2, 3),
(4, 'Guitarra acústica7','hola', 'soundbox.jpg', 87, 300000,15, 2, 3, 1, 3),
(5, 'Guitarra renacen7979tista','hola', 'soundbox.jpg', 14, 450000,80, 1, 1, 1, 1),
(6, 'Guitarra clásic7864a','hola', 'soundbox.jpg', 135, 500000,NULL, 4, 3, 2, 1),
(7, 'Guitarra italia2562na','hola', 'soundbox.jpg', 186, 550000,NULL, 1, 3, 2, 2),
(8, 'Guitarra italia52na','hola', 'soundbox.jpg', 12, 600000,NULL, 1, 2, 2, 3),
(9, 'Guitarra clásic52a','hola', 'soundbox.jpg', 151, 650000,15, 3, 2, 2, 3),
(10, 'Guitarra electro47acústica','hola', 'soundbox.jpg', 65, 700000,19, 3, 4, 1, 2),
(11, 'Guitarra renace74ntista','hola', 'soundbox.jpg', 32, 750000,35, 2, 3, 1, 1),
(12, 'Guitarra elect574roacústica','hola', 'soundbox.jpg', 76, 800000,NULL, 2, 4, 1, 1),
(13, 'Guitarra clásica47','hola', 'soundbox.jpg', 153, 850000,NULL, 1, 2, 4, 1),
(14, 'Guitarra flamen52ca','hola', 'soundbox.jpg', 765, 900000,NULL, 4, 2, 5, 1),
(15, 'Guitarra eléctr31ica','hola', 'soundbox.jpg', 1, 950000,15, 2, 1, 2, 3),
(16, 'Guitarra acúsdawtica','hola', 'soundbox.jpg', 11, 1000000,25, 1, 3, 5, 3),
(17, 'Guitarra MIdawDI','hola', 'soundbox.jpg', 10, 1500000,NULL, 3, 3, 5, 2),
(18, 'Guitarra cladwásica','hola', 'soundbox.jpg', 2, 2000000,NULL, 1, 4, 1, 3),
(19, 'Guitarra MIDadI','hola', 'soundbox.jpg', 78, 2500000,15, 2, 3, 2, 2),
(20, 'Guitarra clásideca','hola', 'soundbox.jpg', 0, 3000000,75, 1, 1, 1, 2)