// categories.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
});

const sql = `
CREATE DATABASE IF NOT EXISTS vanel_db;

USE vanel_db;

-- 🛑 Drop the table to ensure the new schema and massive data structure are applied
DROP TABLE IF EXISTS categories; 

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  image_url VARCHAR(255),
  parent_id INT NULL,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- --- LEVEL 1 (Main Categories: IDs 1-10) ---
INSERT INTO categories (id, name, description, image_url, parent_id) VALUES
(1, 'Faucets & Mixers', 'Taps, Showers, and Mixing Valves', 'https://cdn-icons-png.flaticon.com/512/3034/3034293.png', NULL),
(2, 'Sanitary Ware', 'Toilets, Sinks, and Bidets', 'https://cdn-icons-png.flaticon.com/512/757/757049.png', NULL),
(3, 'Bathroom Accessories', 'Towel Racks, Soap Dispensers, and holders', 'https://cdn-icons-png.flaticon.com/512/787/787884.png', NULL),
(4, 'Bathtubs & Showers', 'Enclosures, Tubs, and Trays', 'https://cdn-icons-png.flaticon.com/512/3218/3218228.png', NULL),
(5, 'Bathroom Furniture', 'Vanities, Cabinets, and Storage Units', 'https://cdn-icons-png.flaticon.com/512/2887/2887968.png', NULL),
(6, 'Tiles & Flooring', 'Waterproof flooring and wall tiles', 'https://cdn-icons-png.flaticon.com/512/3762/3762366.png', NULL),
(7, 'Home Spa & Wellness', 'Steam rooms, Saunas, and Jets', 'https://cdn-icons-png.flaticon.com/512/846/846876.png', NULL),
(8, 'Lighting Solutions', 'Water-resistant fixtures and vanity lights', 'https://cdn-icons-png.flaticon.com/512/8243/8243673.png', NULL),
(9, 'Plumbing & Hardware', 'Pipes, Connectors, and Mounting Brackets', 'https://cdn-icons-png.flaticon.com/512/3133/3133649.png', NULL),
(10, 'Hand & Skin Care', 'Soaps, lotions, and dispensers', 'https://cdn-icons-png.flaticon.com/512/3449/3449580.png', NULL);


-- --- LEVEL 2 (10 records under ID 1 - Faucets & Mixers) ---
INSERT INTO categories (id, name, description, image_url, parent_id) VALUES
(11, 'Basin Faucets', NULL, NULL, 1),
(12, 'Shower Mixers', NULL, NULL, 1),
(13, 'Kitchen Faucets', NULL, NULL, 1),
(14, 'Diverters', NULL, NULL, 1),
(15, 'Spouts', NULL, NULL, 1),
(16, 'Hand Showers', NULL, NULL, 1),
(17, 'Overhead Showers', NULL, NULL, 1),
(18, 'Bath Spouts', NULL, NULL, 1),
(19, 'Sensor Faucets', NULL, NULL, 1),
(20, 'Foot Valves', NULL, NULL, 1);

-- --- LEVEL 3 (10 records under ID 11 - Basin Faucets) ---
INSERT INTO categories (id, name, description, image_url, parent_id) VALUES
(21, 'Single Lever', NULL, NULL, 11),
(22, 'Wall Mounted', NULL, NULL, 11),
(23, 'Pillar Taps', NULL, NULL, 11),
(24, 'Tall Body', NULL, NULL, 11),
(25, 'Short Body', NULL, NULL, 11),
(26, 'Concealed', NULL, NULL, 11),
(27, 'Exposed', NULL, NULL, 11),
(28, 'Ceramic Disc', NULL, NULL, 11),
(29, 'Quarter Turn', NULL, NULL, 11),
(30, 'Full Turn', NULL, NULL, 11);

-- --- LEVEL 4 (10 records under ID 21 - Single Lever) ---
INSERT INTO categories (id, name, description, image_url, parent_id) VALUES
(31, 'Chrome Finish', NULL, NULL, 21),
(32, 'Matt Black Finish', NULL, NULL, 21),
(33, 'Antique Brass Finish', NULL, NULL, 21),
(34, 'Rose Gold Finish', NULL, NULL, 21),
(35, 'Stainless Steel', NULL, NULL, 21),
(36, 'Zinc Alloy', NULL, NULL, 21),
(37, 'Brass Body', NULL, NULL, 21),
(38, 'ABS Aerator', NULL, NULL, 21),
(39, '5-Year Warranty', NULL, NULL, 21),
(40, '7-Year Warranty', NULL, NULL, 21);

-- --- LEVEL 5 (10 records under ID 31 - Chrome Finish) ---
INSERT INTO categories (id, name, description, image_url, parent_id) VALUES
(41, 'Product A101', 'High-end basin faucet model', NULL, 31),
(42, 'Product B202', 'Budget friendly option', NULL, 31),
(43, 'Product C303', 'Designer series', NULL, 31),
(44, 'Product D404', 'Commercial use', NULL, 31),
(45, 'Product E505', 'Eco-friendly model', NULL, 31),
(46, 'Product F606', 'Small size', NULL, 31),
(47, 'Product G707', 'Large size', NULL, 31),
(48, 'Product H808', 'Square design', NULL, 31),
(49, 'Product I909', 'Round design', NULL, 31),
(50, 'Product J010', 'Sensor model part', NULL, 31);


-- --- LEVEL 2 for Sanitary Ware (ID 2, children IDs 51-60) ---
INSERT INTO categories (id, name, description, image_url, parent_id) VALUES
(51, 'Toilets', 'All types of WCs and flushing systems', NULL, 2), 
(52, 'Wash Basins', NULL, NULL, 2), (53, 'Cisterns', NULL, NULL, 2), (54, 'Bidets', NULL, NULL, 2),
(55, 'Urinals', NULL, NULL, 2), (56, 'Toilet Seats', NULL, NULL, 2), (57, 'Flush Valves', NULL, NULL, 2), (58, 'Squatting Pans', NULL, NULL, 2),
(59, 'Concealed Systems', NULL, NULL, 2), (60, 'P-Trap Models', NULL, NULL, 2);

-- --- LEVEL 3 (FIX: 10 records under ID 51 - Toilets) ---
INSERT INTO categories (id, name, description, parent_id) VALUES
(141, 'EWC - Floor Mounted', 'Standard floor standing models', 51), 
(142, 'EWC - Wall Hung', 'Space-saving wall mounted models', 51), 
(143, 'One Piece Toilet', 'Integrated tank and bowl design', 51), 
(144, 'Two Piece Toilet', 'Separate tank and bowl design', 51),
(145, 'Rimless Design', 'Hygienic easy-to-clean bowl', 51), 
(146, 'Siphonic Action', 'Powerful flushing mechanism', 51), 
(147, 'Dual Flush Mechanism', 'Water-saving flush options', 51), 
(148, 'Soft-Close Seat', 'Quiet closing lid and seat', 51),
(149, 'Smart Toilet', 'Integrated bidet and dryer functions', 51), 
(150, 'Hand Shower Attachment', 'Accessories for WC', 51);


-- --- Minimal data for other Level 1 categories to ensure 10 items wide (Level 2 IDs 61 through 140) ---
INSERT INTO categories (id, name, parent_id) VALUES
(61, 'Towel Racks', 3), (62, 'Soap Dispensers', 3), (63, 'Toilet Brush Holders', 3), (64, 'Grab Bars', 3),
(65, 'Mirrors', 3), (66, 'Robe Hooks', 3), (67, 'Shelves & Baskets', 3), (68, 'Tumbler Holders', 3),
(69, 'Paper Holders', 3), (70, 'Floor Drains', 3),
(71, 'Bathtubs', 4), (72, 'Shower Enclosures', 4), (73, 'Shower Trays', 4), (74, 'Massage Jets', 4),
(75, 'Steam Generators', 4), (76, 'Shower Panels', 4), (77, 'Shower Columns', 4), (78, 'Tub Spouts', 4),
(79, 'Handheld Shower Sets', 4), (80, 'Diverter Sets', 4),
(81, 'Vanity Units', 5), (82, 'Storage Cabinets', 5), (83, 'Mirrored Cabinets', 5), (84, 'Tall Boys', 5),
(85, 'Shelving Units', 5), (86, 'Modular Furniture', 5), (87, 'Solid Wood', 5), (88, 'Waterproof PVC', 5),
(89, 'Wall Hung', 5), (90, 'Floor Standing', 5),
(91, 'Wall Tiles', 6), (92, 'Floor Tiles', 6), (93, 'Mosaic Tiles', 6), (94, 'Anti-slip Tiles', 6), (95, 'Grout', 6), (96, 'Tile Adhesives', 6), (97, 'Ceramic', 6), (98, 'Porcelain', 6), (99, 'Stone Look', 6), (100, 'Wood Look', 6),
(101, 'Sauna Heaters', 7), (102, 'Steam Nozzles', 7), (103, 'Aromatherapy Oils', 7), (104, 'Thermostats', 7), (105, 'Jet Pumps', 7), (106, 'LED Chromotherapy', 7), (107, 'Whirlpool Kits', 7), (108, 'Air Blowers', 7), (109, 'Heating Elements', 7), (110, 'Control Panels', 7),
(111, 'Ceiling Lights', 8), (112, 'Vanity Bar Lights', 8), (113, 'Mirror Lights', 8), (114, 'Recessed Spotlights', 8), (115, 'IP Rated Fixtures', 8), (116, 'LED Strips', 8), (117, 'Chandeliers', 8), (118, 'Pendant Lights', 8), (119, 'Wall Sconces', 8), (120, 'Motion Sensors', 8),
(121, 'Pipes & Fittings', 9), (122, 'Waste Couplings', 9), (123, 'Trap Seals', 9), (124, 'PTFE Tape', 9), (125, 'Flexible Hoses', 9), (126, 'Angle Valves', 9), (127, 'Drain Openers', 9), (128, 'Sealants', 9), (129, 'Gaskets', 9), (130, 'Mounting Brackets', 9),
(131, 'Hand Soap', 10), (132, 'Body Wash', 10), (133, 'Lotions', 10), (134, 'Manual Dispensers', 10), (135, 'Automatic Dispensers', 10), (136, 'Refills', 10), (137, 'Bar Soap Dishes', 10), (138, 'Sanitizers', 10), (139, 'Shampoo Holders', 10), (140, 'Conditioners', 10);
`;

// Run SQL
connection.query(sql, (err) => {
  if (err) {
    console.error('Error executing SQL:', err);
    connection.end();
    return;
  }
  console.log('Database and tables created/updated successfully with 5-Level, 10-Item hierarchy!');
  connection.end();
});