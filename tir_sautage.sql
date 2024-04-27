
--
-- Dumping data for table `commandes`
--

INSERT INTO `commandes` (`id`, `date`, `Num_Commande`, `panneau`, `tranche`, `niveau`, `mode_tir`, `foration`, `nombre_trous`, `nombre_ranges`, `trous_range`, `maille_banquette`, `decappage`, `profondeur`, `zone_tir`, `mode_charge`, `dosage_prevu`, `schema_tir`, `espacement`, `created_at`, `updated_at`) VALUES
(1, '2024-04-01', '1', 'P5', 'TE7', 'int1/2', 'nonel', 'cadex', 220, 13, 16, 4, 'PH2', 3.00, 'lebrikiyine', 'unique', '290', '17ms,42ms', 4, NULL, NULL),
(2, '2024-04-02', '2', 'P5', 'TE7 nord', 'sortie', 'nonel', 'PV1', 180, 6, 30, 5, 'ZD11', 9.00, 'lebrikiyine', 'unique', '290', '17ms,42ms,25ms', 7, NULL, NULL),
(3, '2024-04-03', '3', 'P8', 'TF', 'int3/5', 'nonel', 'cadex', 228, 13, 17, 5, 'société', 9.00, 'lebrikiyine', 'unique', '290', '17ms,42ms', 5, NULL, NULL),
(4, '2024-04-04', '4', 'P6', 'TJ5', 'RC2', 'nonel', 'DKS', 450, 11, 40, 5, 'procane', 3.00, 'lebrahla', 'unique', '280', '17ms,42ms,25ms', 6, NULL, NULL);

-- --------------------------------------------------------
--
-- Dumping data for table `couts`
--

INSERT INTO `couts` (`id`, `dateCommande`, `id_cout`, `ammonix`, `tovex`, `detos500ms`, `detos450ms`, `raccord17`, `raccord25`, `raccord42`, `raccord65`, `raccord100`, `lign`, `aei`, `etatCout`, `created_at`, `updated_at`) VALUES
(1, '2024-01-01', 1, 1349600, 52121, 181236, 81536, 131991, 5130, 14309, 0, 0, 13125, 176, '', NULL, NULL),
(2, '2024-02-01', 2, 2180325, 69187, 357882, 0, 156631, 5584, 21044, 0, 0, 15625, 208, '', NULL, NULL),
(3, '2024-03-01', 3, 2215150, 88560, 465367, 0, 186191, 4013, 30083, 0, 0, 15625, 200, '', NULL, NULL);

-- --------------------------------------------------------

--
-- Dumping data for table `etat_chantiers`
--

INSERT INTO `etat_chantiers` (`id`, `date`, `machine`, `avance_foration`, `avance_decapage`, `created_at`, `updated_at`) VALUES
(1, '2024-04-28', '7500|1', 120, 100, '2024-04-27 13:34:44', '2024-04-27 13:34:44'),
(2, '2024-04-13', 'Procaneq', 90, 45, '2024-04-27 13:35:01', '2024-04-27 13:35:01'),
(3, '2024-04-03', 'PH1', 300, 220, '2024-04-27 13:35:24', '2024-04-27 13:35:24'),
(4, '2024-04-23', 'GNE', 360, 140, '2024-04-27 13:36:02', '2024-04-27 13:36:02');

-- --------------------------------------------------------
--
-- Dumping data for table `sautages`
--

INSERT INTO `sautages` (`id`, `date`, `numero_execution`, `numero_commande`, `h_arrivee_camions`, `blf_artifices`, `effictif`, `blf_ammonix`, `bs_tovex_artifices`, `son`, `blf_tovex`, `type`, `frequence`, `heure_tir`, `bs_ammonix`, `vitesse`, `observation`, `created_at`, `updated_at`) VALUES
(1, '2024-04-01', 1, 1, '10h00', '7h45', '', '240302094', '', '', '240302095', '', 240302095, '', '', 0, NULL, NULL, NULL),
(2, '2024-04-02', 2, 2, '11h00', '7h30', '', '240302112', '', '', '240302113', '', 240302113, '', '', 0, NULL, NULL, NULL),
(3, '2024-04-03', 3, 3, '10h00', '8h30', '', '240302113', '', '', '240302116', '', 240302116, '', '', 0, NULL, NULL, NULL),
(4, '2024-04-04', 4, 4, '11h00', '7h30', '', '240302188', '', '', '240302115', '', 240302115, '', '', 0, NULL, NULL, NULL);

-- --------------------------------------------------------
--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `date_commande`, `ammonix`, `tovex`, `detos_500ms`, `detos_450ms`, `raccord_17`, `raccord_25`, `raccord_42`, `raccord_65`, `raccord_100`, `lign`, `aei`, `etat_stock`, `created_at`, `updated_at`) VALUES
(1, '2024-01-01', 192800, 2825, 3632, 1634, 3782, 147, 410, 0, 0, 10500, 22, '', NULL, NULL),
(2, '2024-02-01', 311475, 3750, 7172, 0, 4488, 160, 603, 0, 0, 12500, 26, '', NULL, NULL),
(3, '2024-03-01', 316450, 4800, 9326, 0, 5335, 115, 862, 0, 0, 12500, 25, '', NULL, NULL);

-- --------------------------------------------------------
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `isAdmin`) VALUES
(1, 'admin', NULL, NULL, '$2y$12$Hioq.66QLDvL2nP9hA/CSeMK2mgtqQpkJf9M1S/WUWAUPxQZyTJhW', NULL, '2024-04-27 13:45:14', '2024-04-27 13:45:14', 1),
(2, 'user', NULL, NULL, '$2y$12$/LJIqca9h39QUpqQcwSU6eQHqQDkp/6azQfaioWoBnb.mFicRSCxm', NULL, '2024-04-27 13:45:42', '2024-04-27 13:45:42', 0);
