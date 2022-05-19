USE `tooliv_db`;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES ('124849d0-203d-405c-b222-3bf4005befdd','2022-05-19 17:12:43.878000',NULL,'test@naver.com','김싸피','김싸피','$2a$10$FFlBMtF2zpxEMnnLPPlb1ekOoWvOs9Lzvbf17eAV9NREAf0Rx0IVi',NULL,'S03',NULL,'U02'),('f6b03f42-3337-4d91-8844-671f8b2e44a9','2022-05-18 17:18:52.000000',NULL,'admin@tooliv.io','admin','admin','$2a$10$kLKZzlyeiXL7u4cQp1L6NOBgVY0TdQFSrdZV7bRJH2pTHnkXw0sPG',NULL,'S01',NULL,'U01');

--
-- Dumping data for table `workspace`
--

INSERT INTO `workspace` VALUES ('2606010e-cad6-4b0b-8a51-665f9aefd6e3','2022-05-18 17:45:29.040000',NULL,'1122','7f1412f2-b93d-4da1-b4cd-d8207d2bbb39.PNG','2022-05-18 18:21:25.196000');

--
-- Dumping data for table `workspace_members`
--

INSERT INTO `workspace_members` VALUES ('5a9bdd5a-a70e-4bc8-ad55-482f40f15d7e','2022-05-18 17:45:29.040000',NULL,'M01','f6b03f42-3337-4d91-8844-671f8b2e44a9','2606010e-cad6-4b0b-8a51-665f9aefd6e3'),('965a0e30-56d0-4204-9089-d4f959d68580','2022-05-19 17:15:30.933000',NULL,'M02','124849d0-203d-405c-b222-3bf4005befdd','2606010e-cad6-4b0b-8a51-665f9aefd6e3');

--
-- Dumping data for table `channel`
--

INSERT INTO `channel` VALUES ('00cbd432-8bdf-4f09-a66e-93e09816fdc4','C02','2022-05-19 17:19:10.521000',NULL,'공개 화상 채널',0,NULL,NULL,'2606010e-cad6-4b0b-8a51-665f9aefd6e3'),('0432aa78-8162-4f6f-a709-c131c9bc8400','C01','2022-05-18 17:45:29.040000',NULL,'공지사항',0,NULL,NULL,'2606010e-cad6-4b0b-8a51-665f9aefd6e3'),('d0fa7333-75a4-4a37-a2b8-fa4ba270d198','C01','2022-05-19 17:17:05.751000',NULL,'공개 채팅 채널',0,NULL,NULL,'2606010e-cad6-4b0b-8a51-665f9aefd6e3'),('f8c4afc6-9643-4eba-9418-3960e997315c','C02','2022-05-19 17:18:28.465000',NULL,'비공개 화상 채널',1,NULL,NULL,'2606010e-cad6-4b0b-8a51-665f9aefd6e3'),('fc58779c-9cbb-4623-ab4b-476ab0bfa719','C01','2022-05-19 17:18:13.646000',NULL,'비공개 채팅 채널',1,NULL,NULL,'2606010e-cad6-4b0b-8a51-665f9aefd6e3');

--
-- Dumping data for table `channel_members`
--

INSERT INTO `channel_members` VALUES ('2dcabb5d-6794-4b4f-9d67-f46b32f3d234','M03','2022-05-19 17:18:28.465000','2022-05-19 17:20:57.241000',NULL,'f8c4afc6-9643-4eba-9418-3960e997315c','f6b03f42-3337-4d91-8844-671f8b2e44a9'),('30201df8-027b-451b-9357-34b58fd86e37','M03','2022-05-19 17:19:10.521000',NULL,NULL,'00cbd432-8bdf-4f09-a66e-93e09816fdc4','f6b03f42-3337-4d91-8844-671f8b2e44a9'),('4e474b52-d99b-44ba-bf4d-886489386636','M03','2022-05-19 17:18:13.646000',NULL,NULL,'fc58779c-9cbb-4623-ab4b-476ab0bfa719','f6b03f42-3337-4d91-8844-671f8b2e44a9'),('528d6480-1ce1-43b9-b6f4-228bea621d04','M04','2022-05-19 17:19:48.490000',NULL,NULL,'f8c4afc6-9643-4eba-9418-3960e997315c','124849d0-203d-405c-b222-3bf4005befdd'),('6c4544fb-d23d-45bb-99ce-1a8b9808ee06','M04','2022-05-19 17:20:03.790000',NULL,NULL,'d0fa7333-75a4-4a37-a2b8-fa4ba270d198','124849d0-203d-405c-b222-3bf4005befdd'),('76c2fe0a-ef6d-434d-9881-8db3c6471143','M03','2022-05-19 17:17:05.751000',NULL,NULL,'d0fa7333-75a4-4a37-a2b8-fa4ba270d198','f6b03f42-3337-4d91-8844-671f8b2e44a9'),('7b4fe527-5b84-4111-917c-c59409091ebf','M03','2022-05-18 17:45:29.040000',NULL,NULL,'0432aa78-8162-4f6f-a709-c131c9bc8400','f6b03f42-3337-4d91-8844-671f8b2e44a9'),('e392136c-7b8b-4fea-978f-efd40b9f4425','M04','2022-05-19 17:15:30.957000',NULL,NULL,'0432aa78-8162-4f6f-a709-c131c9bc8400','124849d0-203d-405c-b222-3bf4005befdd');

--
-- Dumping data for table `direct_chat_room`
--

INSERT INTO `direct_chat_room` VALUES ('95053330-8b82-45bb-bfe9-91c5b55ebe7a','2022-05-19 17:21:11.785000',NULL,NULL,NULL,'f6b03f42-3337-4d91-8844-671f8b2e44a9','124849d0-203d-405c-b222-3bf4005befdd');

--
-- Dumping data for table `direct_chat_room_members`
--

INSERT INTO `direct_chat_room_members` VALUES ('820bd39b-82cb-45e2-a4c6-7a408e52b759','2022-05-19 17:21:11.785000','2022-05-19 17:21:25.166000',NULL,'95053330-8b82-45bb-bfe9-91c5b55ebe7a','f6b03f42-3337-4d91-8844-671f8b2e44a9'),('f73e8bae-0cba-44ab-94a6-318b3cc6328b','2022-05-19 17:21:11.785000',NULL,NULL,'95053330-8b82-45bb-bfe9-91c5b55ebe7a','124849d0-203d-405c-b222-3bf4005befdd');

--
-- Dumping data for table `chat_file`
--

INSERT INTO `chat_file` VALUES ('5b59e171-3d6d-4ab5-8602-011d9e250227','990d3b55-b115-4e5e-a310-8ee35f63916b.png');
