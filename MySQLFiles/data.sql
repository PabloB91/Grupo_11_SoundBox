/* Script para poblar las tablas correspondientes a Usuarios */

INSERT INTO user_type
(user_type)
VALUES ('admin'),('common_user');

INSERT INTO country
(country)
VALUES 
('Antigua y Barbuda'),('Argentina'),('Bahamas'),('Barbados'),('Belice'),('Bolivia'),('Brasil'),('Canada'),('Chile'),('Colombia'),('Costa Rica'),('Cuba'),('Dominicana'),('El Salvador'),('Estados Unidos'),('Granada'),('Guatemala'),('Guyana'),('Haiti'),('Honduras'),('Jamaica'),('Mexico'),('Nicaragua'),('Panama'),('Paraguay'),('Peru'),('Republica Dominicana'),('San Cristobal y Nieves'),('Santa Lucia'),('Surinam'),('Trinidad y Tobago'),('Uruguay'),('Venezuela');
/* Antes de crear cualquier usuario, las tablas anteriores tienen que tener registros, ya que existen relaciones */
/* Si no, tira error de 'CONSTRAINTS'*/

INSERT INTO soundbox.user
(id, first_name, last_name, password, e_mail, image, registered_date, user_type_id, country_id)
VALUES
(1, 'Miguel Ángel', 'Vargas Navarro', '$2a$10$qOXjMZlLURip7CodLiLi/Oc1RY.hv4zIotSPZgv0lm5xwm3Ju6WSC' , 'mvargasnavarro19@gmail.com','user-1709673238622.png','2005-01-14', 1, 2),
(2, 'Francisco', 'Capitani', '$2a$10$jxgJNkVU4f9q2J3lvZhUtukmIta.MTgDiPzlrLvAlA0K490jS1esG', 'ftcapitani@gmail.com', "user-1709672974782.jpg", '2024-03-21', 1, 1),
(3, 'Alvaro', 'Ramirez Rojas', '$2a$10$DZFCIljx6ix.BaKCq5uCiuACFeJrCcfJMts15gR5xVhMyIWOwd0BG', 'alvarorr@gmail.com', 'user-1709672545109.jpg','2024-03-05', 2, 1),
(4, 'Melena ', 'Gomez Pereira', '$2a$10$wcMyhj31oIqjUBVpMfphOObChOAJGgdnva.l0d/9RwkviQBIdA7I2', 'muchopelo@gmail.com', 'user-1709672662977.jpg', '2024-03-05', 2, 2),
(5, 'Camila', 'Bautista Fosh', '$2a$10$Tgwp3HaDp.BlhT552Al3N.KvBUuXLXYpHJrChe96IgHmxR8E.et76', 'camilabf@gmail.com', 'user-1709672783164.jpg', '2024-03-05', 2, 2),
(6, 'Mateo', 'Armando Cazasa', '$2a$10$4gZTx3g67fhcPINv7bED6exD.JZg621lJgvZs5JD0RXdWqjrGXpFO', 'javierac@gmail.com', 'user-1709672844054.jpg',  '2024-03-05', 2, 1),
(7, 'Phonix', 'Alvares Capullo', '$2a$10$m0HHT0Oz8f4hrqlTMWRhs.2I65kimtZt1s/9lSqsrmkhfGzNb8ta6', 'mateoac@gmail.com', 'user-1709672974782.jpg',  '2024-03-05', 2, 2),
(8, 'Francisco', 'Espejo Castro', '$2a$10$wiVOwFOWyX.dlWrHnjttDurhNjXIfsWB3myCk8/Gq1.g9I4gweKhG', 'phonixec@gmail.com', 'user-1709673066028.jpg',  '2024-03-05', 2, 2);

--------------------> PRODUCTOS  <----------------------
INSERT INTO color  
(color_name)
VALUES ('Rojo'),('Amarillo'),('Azul'),('Negro');

INSERT INTO brand 
(brand_name)
VALUES ('Marshall'),('Zildjian'),('Gibson'),('Yamaha');

INSERT INTO category
(category)
VALUES ('Guitarra'),('Orquesta'),('Grabación'),('Efectos'),('Accesorios'),('Amplificación'), ('Segunda Mano'), ('Teclados & Pianos');

INSERT INTO state
(state)
VALUES ('Mas Vendido'),('Ultimo Visto'),('Recien Agregado');

INSERT INTO soundbox.product
(id, name, description, image, quantity, price, discount, brand_id, category_id, state_id)
VALUES
(1,'Guitarra clásica','hola','IMG_DEFAULT.svg',15,100,10, 4, 6, 3),
(2, 'Guitarr6a Electrica','hola', 'IMG_DEFAULT.svg', 8, 20,NULL, 2, 1, 3),
(3, 'Guitarr654a','hola', 'IMG_DEFAULT.svg', 100, 250,NULL, 3, 8, 3),
(4, 'Guitarra acústica7','hola', 'IMG_DEFAULT.svg', 87, 3000,15, 3, 3, 3),
(5, 'Guitarra renacen7979tista','hola', 'IMG_DEFAULT.svg', 14, 4000,80, 1, 2, 1),
(6, 'Guitarra clásic7864a','hola', 'IMG_DEFAULT.svg', 135, 5000,NULL, 3, 7, 1),
(7, 'Guitarra italia2562na','hola', 'IMG_DEFAULT.svg', 186, 5000,NULL, 3, 6, 2),
(8, 'Guitarra italia52na','hola', 'IMG_DEFAULT.svg', 12, 6000,NULL, 2, 7, 3),
(9, 'Guitarra clásic52a','hola', 'IMG_DEFAULT.svg', 151, 6500,15, 2, 8, 3),
(10, 'Guitarra electro47acústica','hola', 'IMG_DEFAULT.svg', 65, 7000,19, 4, 1, 2),
(11, 'Guitarra renace74ntista','hola', 'IMG_DEFAULT.svg', 32, 75000,35, 3, 1, 1),
(12, 'Guitarra elect574roacústica','hola', 'IMG_DEFAULT.svg', 76, 800,NULL, 4, 4, 1),
(13, 'Guitarra clásica47','hola', 'IMG_DEFAULT.svg', 153, 8500,NULL, 2, 6, 1),
(14, 'Guitarra flamen52ca','hola', 'IMG_DEFAULT.svg', 765, 9000,NULL, 2, 3, 1),
(15, 'Guitarra eléctr31ica','hola', 'IMG_DEFAULT.svg', 1, 50000,15, 1, 2, 3),
(16, 'Guitarra acúsdawtica','hola', 'IMG_DEFAULT.svg', 11, 100,25, 3, 7, 3),
(17, 'Guitarra MIdawDI','hola', 'IMG_DEFAULT.svg', 10, 10,NULL, 3, 5, 2),
(18, 'Guitarra cladwásica','hola', 'IMG_DEFAULT.svg', 2, 200,NULL, 4, 1, 3),
(19, 'Guitarra MIDadI','hola', 'IMG_DEFAULT.svg', 78, 2500,15, 3, 2, 2),
(20, 'Guitarra clásideca','hola', 'IMG_DEFAULT.svg', 0, 300,75, 1, 1, 2);

INSERT INTO product_color
(id, product_id, color_id)
VALUES (DEFAULT,1,1)