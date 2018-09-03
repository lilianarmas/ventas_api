CREATE TABLE clientes
(
  id_cliente serial NOT NULL, -- Identificador único del cliente
  nombre character varying(200), -- Nombre del cliente
  CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente)
);
COMMENT ON TABLE clientes IS 'Clientes de la empresa';
COMMENT ON COLUMN clientes.id_cliente IS 'Identificador único del cliente';
COMMENT ON COLUMN clientes.nombre IS 'Nombre del cliente';

CREATE TABLE productos
(
  id_producto serial NOT NULL, -- Identificador único del producto
  descripcion character varying(300) NOT NULL, -- Descripción del producto
  precio double precision NOT NULL, -- Precio del producto
  existencia bigint, -- Cantidad actual en existencia del producto
  CONSTRAINT productos_pkey PRIMARY KEY (id_producto)
);
COMMENT ON TABLE productos  IS 'Productos que vende la empresa';
COMMENT ON COLUMN productos.id_producto IS 'Identificador único del producto';
COMMENT ON COLUMN productos.descripcion IS 'Descripción del producto';
COMMENT ON COLUMN productos.precio IS 'Precio del producto';
COMMENT ON COLUMN productos.existencia IS 'Cantidad actual en existencia del producto';

CREATE TABLE entradas
(
  id_entrada serial NOT NULL, -- Identificador único de la entrada
  id_producto integer, -- Identificador único del producto del que se ha realizado la entrada
  cantidad integer, -- Cantidad del producto que se está ingresando
  fecha date DEFAULT now(), -- Fecha de realización de la entrada
  CONSTRAINT entradas_inventario_pkey PRIMARY KEY (id_entrada),
  CONSTRAINT entradas_id_producto_fkey FOREIGN KEY (id_producto)
      REFERENCES productos (id_producto) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE entradas IS 'Entrada de productos en el inventario de la empresa';
COMMENT ON COLUMN entradas.id_entrada IS 'Identificador único de la entrada';
COMMENT ON COLUMN entradas.id_producto IS 'Identificador único del producto del que se ha realizado la entrada';
COMMENT ON COLUMN entradas.cantidad IS 'Cantidad del producto que se está ingresando';
COMMENT ON COLUMN entradas.fecha IS 'Fecha de realización de la entrada';

CREATE TABLE ventas
(
  id_venta serial NOT NULL, -- Identificador único de la venta
  id_cliente integer NOT NULL, -- Identificador único del cliente al que se le realizó la venta
  fecha date NOT NULL DEFAULT now(), -- Fecha de la venta
  total_general double precision NOT NULL, -- Total general de la venta
  CONSTRAINT ventas_pkey PRIMARY KEY (id_venta),
  CONSTRAINT ventas_id_cliente_fkey FOREIGN KEY (id_cliente)
      REFERENCES clientes (id_cliente) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE ventas IS 'Ventas realizadas a los clientes';
COMMENT ON COLUMN ventas.id_venta IS 'Identificador único de la venta';
COMMENT ON COLUMN ventas.id_cliente IS 'Identificador único del cliente al que se le realizó la venta';
COMMENT ON COLUMN ventas.fecha IS 'Fecha de la venta';
COMMENT ON COLUMN ventas.total_general IS 'Total general de la venta';

CREATE TABLE ventas_detalle
(
  id_venta integer NOT NULL, -- Identificador único de la venta
  id_producto integer NOT NULL, -- Identificador único del producto que se ha vendido
  renglon integer NOT NULL, -- Número de renglon de la venta
  cantidad smallint NOT NULL, -- Cantidad del producto que se ha vendido
  precio double precision NOT NULL, -- Precio al que se vendio el producto
  total double precision NOT NULL, -- Total de monto por la venta de la cantidad especificada del producto
  CONSTRAINT ventas_detalle_pkey PRIMARY KEY (id_venta, id_producto),
  CONSTRAINT ventas_detalle_id_producto_fkey FOREIGN KEY (id_producto)
      REFERENCES productos (id_producto) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT ventas_detalle_id_venta_fkey FOREIGN KEY (id_venta)
      REFERENCES ventas (id_venta) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
COMMENT ON TABLE ventas_detalle IS 'Detalle de las ventas realizadas a los clientes';
COMMENT ON COLUMN ventas_detalle.id_venta IS 'Identificador único de la venta';
COMMENT ON COLUMN ventas_detalle.id_producto IS 'Identificador único del producto que se ha vendido';
COMMENT ON COLUMN ventas_detalle.renglon IS 'Número de renglon de la venta';
COMMENT ON COLUMN ventas_detalle.cantidad IS 'Cantidad del producto que se ha vendido';
COMMENT ON COLUMN ventas_detalle.precio IS 'Precio al que se vendio el producto';
COMMENT ON COLUMN ventas_detalle.total IS 'Total de monto por la venta de la cantidad especificada del producto';