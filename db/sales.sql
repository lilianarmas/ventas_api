CREATE TABLE clients
(
    client_id serial NOT NULL, -- Identificador único del cliente
    name character varying(200), -- Nombre del cliente
    CONSTRAINT clients_pkey PRIMARY KEY (client_id)
);
COMMENT ON TABLE clients IS 'Clientes de la empresa';
COMMENT ON COLUMN clients.client_id IS 'Identificador único del cliente';
COMMENT ON COLUMN clients.name IS 'Nombre del cliente';

CREATE TABLE products
(
    product_id serial NOT NULL, -- Identificador único del producto
    description character varying(300) NOT NULL, -- Descripción del producto
    price double precision NOT NULL, -- Precio del producto
    quantity bigint, -- Cantidad actual en existencia del producto
    CONSTRAINT products_pkey PRIMARY KEY (product_id)
);
COMMENT ON TABLE products  IS 'Productos que vende la empresa';
COMMENT ON COLUMN products.product_id IS 'Identificador único del producto';
COMMENT ON COLUMN products.description IS 'Descripción del producto';
COMMENT ON COLUMN products.price IS 'Precio del producto';
COMMENT ON COLUMN products.quantity IS 'Cantidad actual en existencia del producto';

CREATE TABLE entries
(
    entry_id serial NOT NULL, -- Identificador único de la entrada
    product_id integer, -- Identificador único del producto del que se ha realizado la entrada
    quantity integer, -- Cantidad del producto que se está ingresando
    date date DEFAULT now(), -- Fecha de realización de la entrada
    CONSTRAINT entries_pkey PRIMARY KEY (entry_id),
    CONSTRAINT entries_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES products (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE entries IS 'Entrada de productos en el inventario de la empresa';
COMMENT ON COLUMN entries.entry_id IS 'Identificador único de la entrada';
COMMENT ON COLUMN entries.product_id IS 'Identificador único del producto del que se ha realizado la entrada';
COMMENT ON COLUMN entries.quantity IS 'Cantidad del producto que se está ingresando';
COMMENT ON COLUMN entries.date IS 'Fecha de realización de la entrada';

CREATE TABLE sales
(
    sale_id serial NOT NULL, -- Identificador único de la venta
    client_id integer NOT NULL, -- Identificador único del cliente al que se le realizó la venta
    date date NOT NULL DEFAULT now(), -- Fecha de la venta
    total double precision NOT NULL, -- Total general de la venta
    CONSTRAINT sales_pkey PRIMARY KEY (sale_id),
    CONSTRAINT sales_client_id_fkey FOREIGN KEY (client_id)
            REFERENCES clients (client_id) MATCH SIMPLE
            ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE sales IS 'Ventas realizadas a los clientes';
COMMENT ON COLUMN sales.sale_id IS 'Identificador único de la venta';
COMMENT ON COLUMN sales.client_id IS 'Identificador único del cliente al que se le realizó la venta';
COMMENT ON COLUMN sales.date IS 'Fecha de la venta';
COMMENT ON COLUMN sales.total IS 'Total general de la venta';

CREATE TABLE sales_detail
(
    sale_id integer NOT NULL, -- Identificador único de la venta
    product_id integer NOT NULL, -- Identificador único del producto que se ha vendido
    item integer NOT NULL, -- Número de renglon de la venta
    quantity smallint NOT NULL, -- Cantidad del producto que se ha vendido
    price double precision NOT NULL, -- Precio al que se vendio el producto
    total double precision NOT NULL, -- Total de monto por la venta de la cantidad especificada del producto
    CONSTRAINT sales_detail_pkey PRIMARY KEY (sale_id, product_id),
    CONSTRAINT sales_detail_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES products (product_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT sales_detail_sale_id_fkey FOREIGN KEY (sale_id)
        REFERENCES sales (sale_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE sales_detail IS 'Detalle de las ventas realizadas a los clientes';
COMMENT ON COLUMN sales_detail.sale_id IS 'Identificador único de la venta';
COMMENT ON COLUMN sales_detail.product_id IS 'Identificador único del producto que se ha vendido';
COMMENT ON COLUMN sales_detail.item IS 'Número de renglon de la venta';
COMMENT ON COLUMN sales_detail.quantity IS 'Cantidad del producto que se ha vendido';
COMMENT ON COLUMN sales_detail.price IS 'Precio al que se vendio el producto';
COMMENT ON COLUMN sales_detail.total IS 'Total de monto por la venta de la cantidad especificada del producto';
