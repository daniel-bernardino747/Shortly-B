--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    shortened_url text NOT NULL,
    original_url text NOT NULL,
    visited_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    id integer NOT NULL,
    token text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('0b785de3-0133-4809-b12a-307d6307a9c0', '38ec491ab5a1de41897e5acb47b55052e04dd1a3a60556c6385cf6ea5af7a32e', '2022-12-19 10:58:13.646493-03', '20221214193954_create_shortened_urls', NULL, NULL, '2022-12-19 10:58:13.604784-03', 1);
INSERT INTO public._prisma_migrations VALUES ('d782c9b2-2447-4520-a66e-92dce0424646', '5eba605f39134360039c8cfe1ac873d50d5db4032ec1031eaaaa4a0e518f87c7', '2022-12-19 10:58:13.68497-03', '20221214205622_create_user', NULL, NULL, '2022-12-19 10:58:13.651261-03', 1);
INSERT INTO public._prisma_migrations VALUES ('2ed87a2d-55bc-4f65-acfe-f45421a0a7fa', '0753f2c4835d4352edaed82e1cee4e440b625d36f29f15ed0a0b65a0fed3c435', '2022-12-19 10:58:13.710187-03', '20221215001313_', NULL, NULL, '2022-12-19 10:58:13.6896-03', 1);
INSERT INTO public._prisma_migrations VALUES ('cf7b6265-10c0-4fe9-9449-42ccbe72701c', 'b17a38016da02ed90f8bc4e48d9c11e551c97c69e88bc8894141359c708acda8', '2022-12-19 10:58:13.727339-03', '20221215001613_create_user_update', NULL, NULL, '2022-12-19 10:58:13.714882-03', 1);
INSERT INTO public._prisma_migrations VALUES ('bb9267cf-264d-4a3a-853a-16e2af302a40', 'a0ab2253e6da7d85cf49091789e4669eab9847b701458b151bf989ea4acf6098', '2022-12-19 10:58:13.746721-03', '20221215003626_removed_password_confirm', NULL, NULL, '2022-12-19 10:58:13.732205-03', 1);
INSERT INTO public._prisma_migrations VALUES ('4b109962-7668-4d83-8428-0bd7096d4113', 'f5d7abab555187feb4af75ec76abae9723552650d1c5075acf5c59ea2188d58a', '2022-12-19 10:58:13.790849-03', '20221216193058_create_session', NULL, NULL, '2022-12-19 10:58:13.751386-03', 1);
INSERT INTO public._prisma_migrations VALUES ('af084353-5793-42c7-8a8b-8d6e932ab476', 'c0f81e8ed523f4735bf2229107f8a516048940f270b82910e353595153430f55', '2022-12-19 10:58:13.889415-03', '20221217015133_', NULL, NULL, '2022-12-19 10:58:13.795594-03', 1);
INSERT INTO public._prisma_migrations VALUES ('2426c93c-df75-4c62-8328-af225682b142', '8fab841f55002a765022f96ded91d234eed7dc4c5966adda6d814838f699de0a', '2022-12-19 10:58:13.908109-03', '20221219130116_remove_session', NULL, NULL, '2022-12-19 10:58:13.893901-03', 1);
INSERT INTO public._prisma_migrations VALUES ('5e09d92b-5108-4d6e-bbf5-e231dd51cc73', 'd956eab725fd697049bd33b98c1ef6960757ed915bebaca62c2add75be934acf', '2022-12-19 10:58:13.926439-03', '20221219134500_add_token_in_user', NULL, NULL, '2022-12-19 10:58:13.9126-03', 1);
INSERT INTO public._prisma_migrations VALUES ('d2d52dfb-7601-410d-ab9f-47aa7db15031', '397add0ab37c12c09240a40626c729d9412e2ed0ec28c263d4257c8bf66768f0', '2022-12-19 10:58:13.943447-03', '20221219135157_optional_token_in_user', NULL, NULL, '2022-12-19 10:58:13.931881-03', 1);
INSERT INTO public._prisma_migrations VALUES ('92b56ff1-7cd2-47ae-b21f-424bbaf0a43c', 'bc1e386da41ca647fa4890b2b2c63d865d39768b1af5ce1777f52e24eaf3a395', '2022-12-19 16:40:39.065998-03', '20221219194039_set_default_visited_count', NULL, NULL, '2022-12-19 16:40:39.054263-03', 1);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (28, 9, 'zeoKg', 'https://tailwindcss.com/docs/reusing-styles', 11, '2022-12-21 14:35:45.096');
INSERT INTO public.urls VALUES (11, 3, 'HtG9g', 'https://www.youtube.com/shorts/VM1LJojGpe0', 0, '2022-12-21 14:06:30.961');
INSERT INTO public.urls VALUES (12, 3, 'uPgY1', 'https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url', 0, '2022-12-21 14:11:04.792');
INSERT INTO public.urls VALUES (13, 3, 'iMnLp', 'https://dev.to/daniel__bernardino', 0, '2022-12-21 14:11:17.904');
INSERT INTO public.urls VALUES (14, 3, 'pczQ7', 'https://www.descomplicandoamusica.com/wp-content/uploads/2014/08/notas-violao1-1024x259.png', 0, '2022-12-21 14:11:37.394');
INSERT INTO public.urls VALUES (15, 3, 'cWk4t', 'https://www.youtube.com/watch?v=RtvPsB41xZU', 0, '2022-12-21 14:11:54.472');
INSERT INTO public.urls VALUES (18, 7, 'Xe31P', 'https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url', 0, '2022-12-21 14:30:29.975');
INSERT INTO public.urls VALUES (19, 7, 'PNPuE', 'https://www.codenewbie.org/podcast', 0, '2022-12-21 14:30:57.678');
INSERT INTO public.urls VALUES (21, 7, 'tIUdu', 'https://rimas.woxikon.com.br/en/pain', 0, '2022-12-21 14:31:34.586');
INSERT INTO public.urls VALUES (23, 8, 'xkIAl', 'https://www.behance.net/', 0, '2022-12-21 14:32:42.986');
INSERT INTO public.urls VALUES (25, 8, 'xJZZz', 'https://pt.aliexpress.com/item/1005003821930082.html?cv=33804&dp=p12631911358495122094&utm_campaign=affiliate&utm_content=p12631911358495122094&utm_medium=referral&utm_source=zbanx&utm_term=33804&aff_fcid=407982e2dad14d2a87b95f27e98a1e57-1654261143134-09753-_vWtdFV&aff_fsk=_vWtdFV&aff_platform=api-new-link-generate&sk=_vWtdFV&aff_trace_key=407982e2dad14d2a87b95f27e98a1e57-1654261143134-09753-_vWtdFV&terminal_id=23f0a30aebc8458fa262d88591ccf86c&afSmartRedirect=y', 0, '2022-12-21 14:33:08.652');
INSERT INTO public.urls VALUES (26, 9, 'vSJKR', 'https://pt.aliexpress.com/item/1005003821930082.html?cv=33804&dp=p12631911358495122094&utm_campaign=affiliate&utm_content=p12631911358495122094&utm_medium=referral&utm_source=zbanx&utm_term=33804&aff_fcid=407982e2dad14d2a87b95f27e98a1e57-1654261143134-09753-_vWtdFV&aff_fsk=_vWtdFV&aff_platform=api-new-link-generate&sk=_vWtdFV&aff_trace_key=407982e2dad14d2a87b95f27e98a1e57-1654261143134-09753-_vWtdFV&terminal_id=23f0a30aebc8458fa262d88591ccf86c&afSmartRedirect=y', 0, '2022-12-21 14:34:13.587');
INSERT INTO public.urls VALUES (27, 9, 'aNzTY', 'https://onepieceex.net/episodios/online/534/', 0, '2022-12-21 14:34:30.86');
INSERT INTO public.urls VALUES (29, 10, 'yQRZY', 'https://tailwindcss.com/docs/reusing-styles', 0, '2022-12-21 14:36:21.777');
INSERT INTO public.urls VALUES (31, 10, 'FiM9M', 'https://www.niche.com/colleges/search/best-colleges-for-international-relations/', 0, '2022-12-21 14:36:58.128');
INSERT INTO public.urls VALUES (32, 10, 'T9v30', 'https://collegereadiness.collegeboard.org/sat/register/test-center-closings', 3, '2022-12-21 14:37:13.931');
INSERT INTO public.urls VALUES (2, 3, 'we8J3', 'https://www.google.com.br/', 5, '2022-12-20 00:51:44.766');
INSERT INTO public.urls VALUES (17, 7, '0O86G', 'https://www.youtube.com/watch?v=RtvPsB41xZU', 8, '2022-12-21 14:30:15.273');
INSERT INTO public.urls VALUES (20, 7, '14iqF', 'https://bognarjunior.wordpress.com/2015/05/18/consultas-avancadas-com-mongodb/', 3, '2022-12-21 14:31:19.604');
INSERT INTO public.urls VALUES (22, 8, 'W4Bcu', 'https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url', 1, '2022-12-21 14:32:23.306');
INSERT INTO public.urls VALUES (24, 8, 'jA4c2', 'https://app.rocketseat.com.br/discover/course/o-guia-estelar-de-programacao', 1, '2022-12-21 14:32:57.553');
INSERT INTO public.urls VALUES (30, 10, 'mWnGz', 'https://www.estudarfora.org.br/london-school-of-economics/', 15, '2022-12-21 14:36:37.037');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('Daniel Bernardino', '$2a$08$UZ2Pb484FBlXuNNJpQsGYe8DnhsylTynjOG7X85CURg5GDEBiuwiG', 'dn.danielbernardino@gmail.com', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzI4NDcsImV4cCI6MTY3MTYzNDY0Nywic3ViIjoiMyJ9.ZnqCx6bMgkMcqV0QiDMO0R4DR5ymxjOvK5Ajb38B-cg');
INSERT INTO public.users VALUES ('Alícia Porto', '$2a$08$785Y358ui2qFzKylKZE9be7GeYxtWsyrKIOpN9In8SbD2TkoXNOXG', 'alicia@gmail.com.br', 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzI5OTIsImV4cCI6MTY3MTYzNDc5Miwic3ViIjoiNyJ9.Tp_p2ohrT7pO_hIWi6SSrWTk52aOFo0jqu6zjt96z4w');
INSERT INTO public.users VALUES ('Fernando Carvalho', '$2a$08$ktlXaCmR9OdrkYHB8A6hcuFzJINTUFxbWHMt.jFVhgvZW9ZJRuSh2', 'fer.carvalho@gmail.com', 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzMxMjAsImV4cCI6MTY3MTYzNDkyMCwic3ViIjoiOCJ9.2GNdKSQo3z_iRhMA6wCurlDpO0tOn7Bb9uECFHqf8es');
INSERT INTO public.users VALUES ('Laura Moreira', '$2a$08$N.QbC/6YcsuWWo2wmYE.1efUnCAB9xUoNwOelKOFiH4a8mvAK.FIm', 'lauramoreira@usp.gov.br', 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzMyNDIsImV4cCI6MTY3MTYzNTA0Miwic3ViIjoiOSJ9.ifavWV6FhSaYuDwKTW-31wQWxeKQNvwbicY_CaCBiqY');
INSERT INTO public.users VALUES ('João Guilherme de Conceição', '$2a$08$NFPVQG3922mNG2lbaM6Jue5QyxkazuiF48E5DNqgKfcKYO.zkRlA6', 'joaoguilhermecc@usp.gov.br', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzMzNzAsImV4cCI6MTY3MTYzNTE3MCwic3ViIjoiMTAifQ.A3S-SDsqw4zya8eraMCoaRLojnPlWLirN5n5Tbtt0pQ');
INSERT INTO public.users VALUES ('Pessoa6', '$2a$08$Ag1wpn8eJhthtIuhUiaqU.FmDRZqziAG1R29eVDvGtDi2LjmtsmDe', 'test6@gmail.com', 11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzM5MzksImV4cCI6MTY3MTYzNTczOSwic3ViIjoiMTEifQ.EUfbosoxj3ZW9JruOgfXr4UuJd1VBouteO453gczRMI');
INSERT INTO public.users VALUES ('Pessoa7', '$2a$08$L0BVvto8CaAKLhd4FtSoWOaXOxgumjWLN9qrryHgtV5z3JJmTl/d2', 'test7@gmail.com', 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzM5NDUsImV4cCI6MTY3MTYzNTc0NSwic3ViIjoiMTIifQ.kYamvB7gjLFghMJgq3L-0RSbOmK9U-XHpdNFaUyhCM4');
INSERT INTO public.users VALUES ('Pessoa8', '$2a$08$op3g/vNF.ZMhjCS/21GTo.Bzwu.dHhtSCrEhVXWNvdZOXEVvNGgdK', 'test8@gmail.com', 13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzM5NTAsImV4cCI6MTY3MTYzNTc1MCwic3ViIjoiMTMifQ.b6NNHl0i5n3_i6fz6ZKcMg9MXNcL65PxpQYM2MP3sWE');
INSERT INTO public.users VALUES ('Pessoa9', '$2a$08$0qhZQ.wnU2XcmkQaZZg5vO8WlIlhFUD2sgSKXXs1DmxCB8jgXg58e', 'test9@gmail.com', 14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzM5NTQsImV4cCI6MTY3MTYzNTc1NCwic3ViIjoiMTQifQ.YsbUwk9ZnL0nRbStWNHzgPs4GW3EnBs2aBcgtGVbEs0');
INSERT INTO public.users VALUES ('Pessoa10', '$2a$08$iSgBg8LbcM1mcgXKKTc3I.LmyTDwlAT/KdHO6D.1AThYwrv6gBF26', 'test10@gmail.com', 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzM5NjAsImV4cCI6MTY3MTYzNTc2MCwic3ViIjoiMTUifQ.i5oHMSel-Kn6bgNFezYMyFjaJUY85pz0v5-mqxndWWA');
INSERT INTO public.users VALUES ('Pessoa11', '$2a$08$iD1e70NvuHSLADKZU2r96.PE6c8kbE0qafHTKASmbJuMITtS0oETa', 'test11@gmail.com', 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2MzM5NjQsImV4cCI6MTY3MTYzNTc2NCwic3ViIjoiMTYifQ.G6S5eLpI86Tmz6gq8sNc1JbxopttqCL8ZcFHQ4e4Qmg');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 32, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls_shortened_url_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX urls_shortened_url_key ON public.urls USING btree (shortened_url);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

