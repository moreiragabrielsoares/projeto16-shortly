--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

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
-- Name: urls; Type: TABLE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE TABLE "public"."urls" (
    "id" integer NOT NULL,
    "url" "text" NOT NULL,
    "shortUrl" "text" NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE public.urls OWNER TO mzubeszccwsgvs;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE SEQUENCE "public"."urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO mzubeszccwsgvs;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mzubeszccwsgvs
--

ALTER SEQUENCE "public"."urls_id_seq" OWNED BY "public"."urls"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE public.users OWNER TO mzubeszccwsgvs;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE SEQUENCE "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO mzubeszccwsgvs;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mzubeszccwsgvs
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE TABLE "public"."users_sessions" (
    "id" integer NOT NULL,
    "userId" integer NOT NULL,
    "token" "text" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO mzubeszccwsgvs;

--
-- Name: users_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE SEQUENCE "public"."users_sessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_sessions_id_seq OWNER TO mzubeszccwsgvs;

--
-- Name: users_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mzubeszccwsgvs
--

ALTER SEQUENCE "public"."users_sessions_id_seq" OWNED BY "public"."users_sessions"."id";


--
-- Name: users_urls; Type: TABLE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE TABLE "public"."users_urls" (
    "id" integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL
);


ALTER TABLE public.users_urls OWNER TO mzubeszccwsgvs;

--
-- Name: users_urls_id_seq; Type: SEQUENCE; Schema: public; Owner: mzubeszccwsgvs
--

CREATE SEQUENCE "public"."users_urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_urls_id_seq OWNER TO mzubeszccwsgvs;

--
-- Name: users_urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mzubeszccwsgvs
--

ALTER SEQUENCE "public"."users_urls_id_seq" OWNED BY "public"."users_urls"."id";


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."urls_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Name: users_sessions id; Type: DEFAULT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_sessions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_sessions_id_seq"'::"regclass");


--
-- Name: users_urls id; Type: DEFAULT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_urls_id_seq"'::"regclass");


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: mzubeszccwsgvs
--

COPY "public"."urls" ("id", "url", "shortUrl", "visitCount", "createdAt") FROM stdin;
1	https://umlinkqualquer1.com	wMpZWdPCYO	7	2022-08-05 18:40:35.527537+00
2	https://umlinkqualquer2.com	ij5wO3uaDq	3	2022-08-05 18:40:51.177171+00
3	https://umlinkqualquer3.com	onRkpKQVY1	1	2022-08-05 18:41:02.782685+00
4	https://umlinkqualquer4.com	gkXTHrJkrR	15	2022-08-05 18:41:28.585997+00
5	https://umlinkqualquer5.com	cpR_QoZG4i	9	2022-08-05 18:41:40.531955+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mzubeszccwsgvs
--

COPY "public"."users" ("id", "name", "email", "password", "createdAt") FROM stdin;
1	Joana	joana@driven.com.br	$2b$10$pwhw4HA.SL8lu.2B3PeJR.F8y50nVWtRdaO2gOkCYiuDR6GN8PaKu	2022-08-05 18:36:00.230483+00
2	João	joao@driven.com.br	$2b$10$ssm8zYzxYWr.fnkqiKRDKOHohH2qIY1W1N3fD1Js.lsthSVV/taq6	2022-08-05 18:36:23.510362+00
3	Maria	maria@driven.com.br	$2b$10$ygRTU0i20g2h0.Q/TXEfDOgxyVwdzUAIoPk7Dmj3RYQPdBUs0gXey	2022-08-05 18:36:42.317743+00
4	Jorge	jorge@driven.com.br	$2b$10$b5Y1FiXvEYAMX1wrM6JT..BkZKk9RX/581qPiDG/VKmDTgrq.n.3e	2022-08-05 18:37:03.310814+00
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: mzubeszccwsgvs
--

COPY "public"."users_sessions" ("id", "userId", "token", "createdAt") FROM stdin;
1	4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY1OTcyNDY0OCwiZXhwIjoxNjU5ODExMDQ4fQ.FPVERQo8pSo6gENNJrYmHGlkwdYBKCejF9Ln9CLQIaE	2022-08-05 18:37:28.742753+00
2	3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY1OTcyNDY3NywiZXhwIjoxNjU5ODExMDc3fQ.QGDfrIPSwlZdY-SryDY6TrqKkj_VGno1AkrRVqaJr4w	2022-08-05 18:37:57.93453+00
3	2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1OTcyNDcwNSwiZXhwIjoxNjU5ODExMTA1fQ.h5QzFIUxOP_IX_f8Sw4DPmWON3aLdmymyycWX-U-qRA	2022-08-05 18:38:25.611336+00
\.


--
-- Data for Name: users_urls; Type: TABLE DATA; Schema: public; Owner: mzubeszccwsgvs
--

COPY "public"."users_urls" ("id", "userId", "urlId") FROM stdin;
1	4	1
2	4	2
3	4	3
4	3	4
5	3	5
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mzubeszccwsgvs
--

SELECT pg_catalog.setval('"public"."urls_id_seq"', 33, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mzubeszccwsgvs
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 36, true);


--
-- Name: users_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mzubeszccwsgvs
--

SELECT pg_catalog.setval('"public"."users_sessions_id_seq"', 35, true);


--
-- Name: users_urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mzubeszccwsgvs
--

SELECT pg_catalog.setval('"public"."users_urls_id_seq"', 33, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_sessions"
    ADD CONSTRAINT "users_sessions_pkey" PRIMARY KEY ("id");


--
-- Name: users_sessions users_sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_sessions"
    ADD CONSTRAINT "users_sessions_token_key" UNIQUE ("token");


--
-- Name: users_urls users_urls_pkey; Type: CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_urls"
    ADD CONSTRAINT "users_urls_pkey" PRIMARY KEY ("id");


--
-- Name: users_sessions users_sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_sessions"
    ADD CONSTRAINT "users_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id");


--
-- Name: users_urls users_urls_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_urls"
    ADD CONSTRAINT "users_urls_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "public"."urls"("id");


--
-- Name: users_urls users_urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mzubeszccwsgvs
--

ALTER TABLE ONLY "public"."users_urls"
    ADD CONSTRAINT "users_urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--

