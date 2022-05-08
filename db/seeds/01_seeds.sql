INSERT INTO users (username, name, email, password)
VALUES ('rdu0', 'Ralf Du Plantier', 'rdu0@fotki.com', 'password'),
('ayurenin1', 'Alfonse Yurenin', 'ayurenin1@t.co', 'password'),
('asirrell2', 'Ardenia Sirrell', 'asirrell2@e-recht24.de', 'password');

INSERT INTO categories (name) VALUES ('tutorial'), ('js'), ('diy');

INSERT INTO resources (id, url, title, description, category_id, user_id, created_at)
VALUES (1, 'http://howstuffworks.com/cursus/vestibulum/proin/eu.html', 'Evolution', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 1, 1, '2018-02-12T08:00:00.000Z'),
(2, 'https://wisc.edu/fusce.jpg', 'Slow Southern Steel', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 2, 2, '2018-02-12T08:00:00.000Z'),
(3, 'http://apache.org/sed.xml', 'Harlem Nights', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 3, 3, '2018-02-12T08:00:00.000Z');

INSERT INTO comments (description, user_id, resource_id)
VALUES ('Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, 1),
('In congue. Etiam justo. Etiam pretium iaculis justo.', 2, 2),
('Phasellus in felis. Donec semper sapien a libero. Nam dui.', 3, 3);

INSERT INTO likes (resource_id, user_id) VALUES (1, 2), (3, 1), (2, 3);

INSERT INTO rates (resource_id, user_id) VALUES (3, 2), (1, 3), (2, 1);
