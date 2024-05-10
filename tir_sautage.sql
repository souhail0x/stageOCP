
INSERT INTO `commandes` (`id`, `date`, `Num_Commande`, `panneau`, `tranche`, `niveau`, `mode_tir`, `foration`, `nombre_trous`, `nombre_ranges`, `trous_range`, `maille_banquette`, `decappage`, `profondeur`, `zone_tir`, `mode_charge`, `dosage_prevu`, `schema_tir`, `espacement`, `created_at`, `updated_at`) VALUES
(1, '2024-05-10', '1', 'P2', 'TE7 nord', 'R/C6', 'Nonel', 'PV1', 120, 10, 12, 4, 'PH1', 7.00, 'LBRAYKIYIN', 'unique', '250', '17ms - 25ms - 42ms - 65ms', 4, '2024-05-10 09:41:25', '2024-05-10 09:41:25'),
(3, '2024-05-12', '2', 'P5', 'TE7 nord', 'Int3/4', 'Nonel', 'DK6', 150, 10, 150, 4, 'NGE', 8.00, 'LBRAHLA', 'unique', '195', '100ms - 25ms - 17ms', 4, '2024-05-10 09:51:14', '2024-05-10 09:51:14');

-- --------------------------------------------------------

INSERT INTO `couts` (`id`, `dateCommande`, `id_cout`, `ammonix`, `tovex`, `detos500ms`, `detos450ms`, `raccord17`, `raccord25`, `raccord42`, `raccord65`, `raccord100`, `lign`, `aei`, `etatCout`, `created_at`, `updated_at`) VALUES
(1, '2024-05-16', 1, 8000000, 100000000, 0, 0, 0, 0, 700000, 0, 0, 100000, 100, 'new Cout', '2024-05-10 18:08:43', '2024-05-10 18:08:43');

-- --------------------------------------------------------

INSERT INTO `etat_chantiers` (`id`, `date`, `machine`, `avance_foration`, `avance_decapage`, `created_at`, `updated_at`) VALUES
(7, '2024-04-28', '7500|1', 220, 180, '2024-04-28 19:18:03', '2024-04-28 19:18:03'),
(8, '2024-04-28', '7500|2', 170, 90, '2024-04-28 19:18:30', '2024-04-28 19:42:59'),
(9, '2024-04-28', 'PH1', 190, 70, '2024-04-28 19:19:06', '2024-04-28 20:10:08'),
(10, '2024-04-28', 'PH2', 300, 220, '2024-04-28 19:19:25', '2024-04-28 19:19:25'),
(11, '2024-04-28', 'ZD11', 90, 65, '2024-04-28 19:19:50', '2024-04-28 19:19:50'),
(12, '2024-04-28', 'GNE', 140, 124, '2024-04-28 19:20:07', '2024-04-28 19:20:07'),
(13, '2024-04-28', 'Procaneq', 400, 310, '2024-04-28 19:20:30', '2024-04-28 19:20:30'),
(14, '2024-04-28', 'TechnoZaim', 199, 190, '2024-04-28 19:20:53', '2024-04-28 19:20:53'),
(15, '2024-04-28', 'Transmine', 290, 210, '2024-04-28 19:21:13', '2024-04-28 19:21:13'),
(16, '2024-04-28', 'EE', 300, 250, '2024-04-28 19:21:30', '2024-04-28 19:21:30');

-- --------------------------------------------------------

INSERT INTO `resultat_commandes` (`id`, `created_at`, `updated_at`, `longeur`, `largeur`, `surface`, `volume`, `ammonix`, `dosage`, `tovex`, `m_f`, `ligneDeTir`, `aei`, `chargeInstantanee`, `repartition`, `r_prevu`, `profondeur`, `detonateur`, `r17`, `r25`, `r42`, `r65`, `r100`, `prix_aei`, `prix_detonateur`, `prix_raccord`, `prix_ammonix`, `prix_lingeTir`, `prix_tovex`, `observation`, `cmd_id`) VALUES
(1, '2024-05-10 09:41:25', '2024-05-10 09:41:25', 48.00, 40.00, 1920.00, 13440.00, 3375.00, 0.25, 75.00, 840.00, 500.00, 1.00, 28.12, 1.12, 746.67, 7.00, 122.00, 102.00, 12.00, 12.00, 12.00, 0.00, 8.00, 6087.80, 4816.20, 23625.00, 4000.00, 1383.75, NULL, 1),
(2, '2024-05-10 09:51:15', '2024-05-10 09:51:15', 600.00, 40.00, 24000.00, 192000.00, 37450.00, 1.95, 75.00, 1200.00, 500.00, 1.00, 249.67, 9.99, 10666.67, 8.00, 152.00, 0.00, 0.00, 0.00, 0.00, 0.00, 8.00, 7584.80, 0.00, 262150.00, 4000.00, 1383.75, NULL, 1);

-- --------------------------------------------------------

INSERT INTO `sautages` (`id`, `date`, `numero_execution`, `numero_commande`, `h_arrivee_camions`, `blf_artifices`, `effictif`, `blf_ammonix`, `bs_tovex_artifices`, `son`, `blf_tovex`, `type`, `frequence`, `heure_tir`, `bs_ammonix`, `vitesse`, `observation`, `created_at`, `updated_at`) VALUES
(1, '2024-05-11', 1, 1, '10:00', '41258963', '17', '74156316', '85264587', '41', '78544448', 'YARA', 15, '11:30', '45154616', 45, 'pas d\'observations', '2024-05-10 09:43:33', '2024-05-10 09:43:33'),
(2, '2024-05-13', 2, 2, '12:00', '7896512562', '85', '4546515465', '646513594', '26', '49865481', 'EGYPT', 45, '13/30', '45458547', 87, 'none', '2024-05-10 09:52:36', '2024-05-10 09:52:36');

-- --------------------------------------------------------

INSERT INTO `stock` (`id`, `date_commande`, `ammonix`, `tovex`, `detos_500ms`, `detos_450ms`, `raccord_17`, `raccord_25`, `raccord_42`, `raccord_65`, `raccord_100`, `lign`, `aei`, `etat_stock`, `created_at`, `updated_at`) VALUES
(2, '2024-05-11', 50000, 5000, 500, 50, 500, 55, 50, 5, 0, 50000, 50, 'new Stock', '2024-05-10 17:56:05', '2024-05-10 17:56:05');

-- --------------------------------------------------------

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `isAdmin`) VALUES
(1, 'user', NULL, NULL, '$2y$12$wIiVDDcEeeX4ia3wLiW7neKKPQoMo7cI8idZQut8vetSswfO67C6u', NULL, '2024-05-10 09:31:11', '2024-05-10 09:31:11', 0),
(2, 'admin', NULL, NULL, '$2y$12$f4UezzuwFECyoXuLur7.cOep0tHi/Ofd8dfxmNq6L4CCUjE588.RS', NULL, '2024-05-10 09:32:18', '2024-05-10 09:32:18', 1);
