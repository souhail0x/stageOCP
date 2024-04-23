
INSERT INTO `commandes` (`date`, `Num_Commande`, `panneau`, `tranche`, `niveau`, `mode_tir`, `maille_E`, `maille_B`, `Métrage foré`, `nombre_trous`, `nombre_ranges`, `trous_range`, `profondeur`, `longueur`, `surface`, `volume`, `dosage_prévu`, `dosage_réalisé`, `zone_tir`, `mode_charge`, `machine_Foration`, `machine_Decappage`, `schema_tir`, `created_at`, `updated_at`) VALUES
('2024-04-01', '1', 'P5', 'TE7', 'int1/2', 'nonel', 4, 4, 836.00, 220, 13, 16, 3.00, 100, 5789, 22000, '290', '250', 'lebrikiyine', 'unique', 'cadex', 'PH2', '17ms,42ms', NULL, NULL),
('2024-04-02', '2', 'P5', 'TE7 nord', 'sortie', 'nonel', 7, 5, 1710.00, 180, 6, 30, 9.00, 120, 8552, 81250, '290', '240', 'lebrikiyine', 'unique', 'PV1', 'ZD11', '17ms,42ms,25ms', NULL, NULL),
('2024-04-03', '3', 'P8', 'TF', 'int3/5', 'nonel', 5, 5, 2052.00, 228, 13, 17, 9.00, 100, 8714, 78431, '290', '255', 'lebrikiyine', 'unique', 'cadex', 'société', '17ms,42ms', NULL, NULL),
('2024-04-04', '4', 'P6', 'TJ5', 'RC2', 'nonel', 6, 5, 1755.00, 450, 11, 40, 3.00, 300, 17230, 67200, '280', '250', 'lebrahla', 'unique', 'DKS', 'procane', '17ms,42ms,25ms', NULL, NULL);

INSERT INTO `couts` (`dateCommande`, `Num_Cout`, `cout_ammonix`, `cout_aei`, `cout_detos_500ms`, `cout_raccord_17`, `cout_raccord_25`, `cout_raccord_42`, `cout_raccord_65`, `cout_raccord_100`, `cout_detonateur_450`, `cout_detonateur_500`, `cout_tovex`, `ligne_tir`, `etat_stock`, `created_at`, `updated_at`) VALUES
('2024-01-01', '1', 1349600, 0, 0, 131991, 5130, 14309, 0, 0, 81536, 181236, 52121, 0, '', NULL, NULL),
('2024-02-01', '2', 2180325, 0, 0, 156631, 5584, 21044, 0, 0, 0, 357882, 69187, 0, '', NULL, NULL),
('2024-03-01', '3', 2215150, 0, 0, 186191, 4013, 30083, 0, 0, 0, 465367, 88560, 0, '', NULL, NULL);

INSERT INTO `sautages` (`date`, `numero_execution`, `numero_commande`, `BLF_Ammonix`, `BLF_Tovex`, `BLF_Artifices_Ligne`, `heure_arrivée_camions`, `heure_tir`, `effictif`, `bs_tovex_artifices`, `son`, `type`, `frequence`, `bs_ammonix`, `vitesse`, `observation`, `created_at`, `updated_at`) VALUES
('2024-04-01', 1, 1, '240302094', '240302095', '7h45', '10h00', '', '', '', '', '', 240302095, '', 0, NULL, NULL, NULL),
('2024-04-02', 2, 2, '240302112', '240302113', '7h30', '11h00', '', '', '', '', '', 240302113, '', 0, NULL, NULL, NULL),
('2024-04-03', 3, 3, '240302113', '240302116', '8h30', '10h00', '', '', '', '', '', 240302116, '', 0, NULL, NULL, NULL),
('2024-04-04', 4, 4, '240302188', '240302115', '7h30', '11h00', '', '', '', '', '', 240302115, '', 0, NULL, NULL, NULL);

INSERT INTO `stock` (`date_commande`, `Num_Stock`, `ammonix`, `aei`, `detos_500ms`, `raccord_17`, `raccord_25`, `raccord_42`, `raccord_65`, `raccord_100`, `detonateur_450`, `detonateur_500`, `tovex`, `ligne_tir`, `etat_stock`, `created_at`, `updated_at`) VALUES
('2024-01-01', '1', 192800, 0, 0, 3782, 147, 410, 0, 0, 1634, 3632, 2825, 0, '', NULL, NULL),
('2024-02-01', '2', 311475, 0, 0, 4488, 160, 603, 0, 0, 0, 7172, 3750, 0, '', NULL, NULL),
('2024-03-01', '3', 316450, 0, 0, 5335, 115, 862, 0, 0, 0, 9326, 4800, 0, '', NULL, NULL);

