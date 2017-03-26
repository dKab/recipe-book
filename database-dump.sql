--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: recipe-book; Type: SCHEMA; Schema: -; Owner: recipe-book-admin
--

CREATE SCHEMA "recipe-book";


ALTER SCHEMA "recipe-book" OWNER TO "recipe-book-admin";

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = "recipe-book", pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Comments; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Comments" (
    id integer NOT NULL,
    author integer NOT NULL,
    recipe_id integer NOT NULL,
    comment text NOT NULL
);


ALTER TABLE "Comments" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Comments"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Comments" IS 'Contains users comments to recipies';


--
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Comments_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Comments_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Comments_id_seq" OWNED BY "Comments".id;


--
-- Name: Favorite_Recipes; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Favorite_Recipes" (
    recipe_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE "Favorite_Recipes" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Favorite_Recipes"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Favorite_Recipes" IS 'Links users to their favorite recipes';


--
-- Name: Ingredient_Categories; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Ingredient_Categories" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE "Ingredient_Categories" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Ingredient_Categories"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Ingredient_Categories" IS 'Containts ingredient categories names';


--
-- Name: Ingredient_Categories_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Ingredient_Categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ingredient_Categories_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Ingredient_Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Ingredient_Categories_id_seq" OWNED BY "Ingredient_Categories".id;


--
-- Name: Ingredients; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Ingredients" (
    id integer NOT NULL,
    ndb_number integer,
    name character varying NOT NULL,
    category_id integer
);


ALTER TABLE "Ingredients" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Ingredients"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Ingredients" IS 'Containts igredients that can be used in recipes';


--
-- Name: Ingredients_Nutrients; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Ingredients_Nutrients" (
    ingredient_id integer NOT NULL,
    nutrient_id integer NOT NULL,
    value_to_100_gram numeric NOT NULL
);


ALTER TABLE "Ingredients_Nutrients" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Ingredients_Nutrients"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Ingredients_Nutrients" IS 'Containts nutrition info for ingredients';


--
-- Name: Ingredients_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Ingredients_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Ingredients_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Ingredients_id_seq" OWNED BY "Ingredients".id;


--
-- Name: Nutrient_Categories; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Nutrient_Categories" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE "Nutrient_Categories" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Nutrient_Categories"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Nutrient_Categories" IS 'Containts nutrient categories names';


--
-- Name: Nutrient_Categories_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Nutrient_Categories_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Nutrient_Categories_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Nutrient_Categories_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Nutrient_Categories_id_seq" OWNED BY "Nutrient_Categories".id;


--
-- Name: Nutrients; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Nutrients" (
    id integer NOT NULL,
    name character varying NOT NULL,
    units character varying NOT NULL,
    category_id integer
);


ALTER TABLE "Nutrients" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Nutrients"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Nutrients" IS 'Containts nutrients list';


--
-- Name: Nutrients_Norm; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Nutrients_Norm" (
    id integer NOT NULL,
    nutrient_id integer NOT NULL,
    units character varying NOT NULL,
    man_min numeric,
    man_norm numeric,
    man_max numeric,
    woman_min numeric,
    woman_norm numeric,
    woman_max numeric
);


ALTER TABLE "Nutrients_Norm" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Nutrients_Norm"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Nutrients_Norm" IS 'Containts standard norms for nutrients per day';


--
-- Name: Nutrients_Norm_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Nutrients_Norm_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Nutrients_Norm_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Nutrients_Norm_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Nutrients_Norm_id_seq" OWNED BY "Nutrients_Norm".id;


--
-- Name: Nutrients_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Nutrients_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Nutrients_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Nutrients_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Nutrients_id_seq" OWNED BY "Nutrients".id;


--
-- Name: Recipes; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Recipes" (
    id integer NOT NULL,
    name character varying,
    description character varying,
    portions integer DEFAULT 1 NOT NULL,
    cooking_time integer,
    difficulty integer,
    rating integer,
    owner_id integer NOT NULL,
    is_private boolean DEFAULT false NOT NULL
);


ALTER TABLE "Recipes" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Recipes"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Recipes" IS 'Contains recipies added by users';


--
-- Name: Recipes_Ingredients; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Recipes_Ingredients" (
    recipe_id integer NOT NULL,
    ingedient_id integer NOT NULL
);


ALTER TABLE "Recipes_Ingredients" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Recipes_Ingredients"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Recipes_Ingredients" IS 'Links ingredients of recipes';


--
-- Name: Recipes_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Recipes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Recipes_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Recipes_id_seq" OWNED BY "Recipes".id;


--
-- Name: Resipes_Tags; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Resipes_Tags" (
    tag_id integer NOT NULL,
    recipe_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE "Resipes_Tags" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Resipes_Tags"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Resipes_Tags" IS 'Containts users tags for recipes';


--
-- Name: Tags; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Tags" (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE "Tags" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Tags"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Tags" IS 'Containts tags for recipes';


--
-- Name: Tags_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Tags_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Tags_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Tags_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Tags_id_seq" OWNED BY "Tags".id;


--
-- Name: Users; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    gender integer,
    birthdate date,
    name character varying(256)
);


ALTER TABLE "Users" OWNER TO "recipe-book-admin";

--
-- Name: TABLE "Users"; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON TABLE "Users" IS 'Contains users info';


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO "recipe-book-admin";

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: oauth; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE oauth (
    provider integer,
    provider_internal_id character varying(256),
    user_id integer NOT NULL,
    provider_access_token character varying(256),
    provider_access_secret character varying(256),
    id integer NOT NULL
);


ALTER TABLE oauth OWNER TO "recipe-book-admin";

--
-- Name: COLUMN oauth.provider_access_token; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON COLUMN oauth.provider_access_token IS 'This token is needed to permorm action from behalf of authorised user. It should be updated every time we login the user as providers regenerate it every time.';


--
-- Name: COLUMN oauth.provider_access_secret; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON COLUMN oauth.provider_access_secret IS 'This secret is needed to permorm actions from behalf of  user. Secret is required for some actions. This field should be update every tim we log user in as well as provider_access_token';


--
-- Name: COLUMN oauth.id; Type: COMMENT; Schema: recipe-book; Owner: recipe-book-admin
--

COMMENT ON COLUMN oauth.id IS 'primary key';


--
-- Name: oauth_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE oauth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE oauth_id_seq OWNER TO "recipe-book-admin";

--
-- Name: oauth_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE oauth_id_seq OWNED BY oauth.id;


--
-- Name: oauth_providers; Type: TABLE; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE TABLE oauth_providers (
    id integer NOT NULL,
    name character varying(64)
);


ALTER TABLE oauth_providers OWNER TO "recipe-book-admin";

--
-- Name: oauth_providers_id_seq; Type: SEQUENCE; Schema: recipe-book; Owner: recipe-book-admin
--

CREATE SEQUENCE oauth_providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE oauth_providers_id_seq OWNER TO "recipe-book-admin";

--
-- Name: oauth_providers_id_seq; Type: SEQUENCE OWNED BY; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER SEQUENCE oauth_providers_id_seq OWNED BY oauth_providers.id;


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Comments" ALTER COLUMN id SET DEFAULT nextval('"Comments_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Ingredient_Categories" ALTER COLUMN id SET DEFAULT nextval('"Ingredient_Categories_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Ingredients" ALTER COLUMN id SET DEFAULT nextval('"Ingredients_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Nutrient_Categories" ALTER COLUMN id SET DEFAULT nextval('"Nutrient_Categories_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Nutrients" ALTER COLUMN id SET DEFAULT nextval('"Nutrients_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Nutrients_Norm" ALTER COLUMN id SET DEFAULT nextval('"Nutrients_Norm_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Recipes" ALTER COLUMN id SET DEFAULT nextval('"Recipes_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Tags" ALTER COLUMN id SET DEFAULT nextval('"Tags_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY oauth ALTER COLUMN id SET DEFAULT nextval('oauth_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY oauth_providers ALTER COLUMN id SET DEFAULT nextval('oauth_providers_id_seq'::regclass);


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Comments" (id, author, recipe_id, comment) FROM stdin;
\.


--
-- Name: Comments_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Comments_id_seq"', 1, false);


--
-- Data for Name: Favorite_Recipes; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Favorite_Recipes" (recipe_id, user_id) FROM stdin;
\.


--
-- Data for Name: Ingredient_Categories; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Ingredient_Categories" (id, name) FROM stdin;
\.


--
-- Name: Ingredient_Categories_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Ingredient_Categories_id_seq"', 1, false);


--
-- Data for Name: Ingredients; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Ingredients" (id, ndb_number, name, category_id) FROM stdin;
\.


--
-- Data for Name: Ingredients_Nutrients; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Ingredients_Nutrients" (ingredient_id, nutrient_id, value_to_100_gram) FROM stdin;
\.


--
-- Name: Ingredients_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Ingredients_id_seq"', 1, false);


--
-- Data for Name: Nutrient_Categories; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Nutrient_Categories" (id, name) FROM stdin;
\.


--
-- Name: Nutrient_Categories_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Nutrient_Categories_id_seq"', 1, false);


--
-- Data for Name: Nutrients; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Nutrients" (id, name, units, category_id) FROM stdin;
\.


--
-- Data for Name: Nutrients_Norm; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Nutrients_Norm" (id, nutrient_id, units, man_min, man_norm, man_max, woman_min, woman_norm, woman_max) FROM stdin;
\.


--
-- Name: Nutrients_Norm_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Nutrients_Norm_id_seq"', 1, false);


--
-- Name: Nutrients_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Nutrients_id_seq"', 1, false);


--
-- Data for Name: Recipes; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Recipes" (id, name, description, portions, cooking_time, difficulty, rating, owner_id, is_private) FROM stdin;
3	recipe 1	this is a decription	2	20	1	\N	1	f
\.


--
-- Data for Name: Recipes_Ingredients; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Recipes_Ingredients" (recipe_id, ingedient_id) FROM stdin;
\.


--
-- Name: Recipes_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Recipes_id_seq"', 3, true);


--
-- Data for Name: Resipes_Tags; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Resipes_Tags" (tag_id, recipe_id, user_id) FROM stdin;
\.


--
-- Data for Name: Tags; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Tags" (id, name) FROM stdin;
\.


--
-- Name: Tags_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Tags_id_seq"', 1, false);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY "Users" (id, gender, birthdate, name) FROM stdin;
1	1	\N	\N
2	\N	\N	\N
3	\N	\N	\N
4	\N	\N	gfdsgdsfg
5	\N	\N	dkabardinov
7	\N	\N	Dima
8	\N	\N	Dmitrii
9	\N	\N	Dmitrii1
10	\N	\N	Dmitrii1
11	\N	\N	Dmitrii2
12	\N	\N	dkabardinov
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('"Users_id_seq"', 12, true);


--
-- Data for Name: oauth; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY oauth (provider, provider_internal_id, user_id, provider_access_token, provider_access_secret, id) FROM stdin;
\N	\N	7	\N	\N	1
1	dsffgdsgfdgfhdg	8	sagfsgfsgd	fgdgdgdfgdgd	2
1	dsffgdsgfdgfhdg	9	sagfsgfsgd	fgdgdgdfgdgd	3
1	dsffgdsgfdgfhdg	10	sagfsgfsgd	fgdgdgdfgdgd	4
1	dsffgdsgfdgfhdg	11	sagfsgfsgd	fgdgdgdfgdgd	5
1	2886070185	12	2886070185-7b7paXy63qnKsHn1SP8Q8NG9eMzBAmXeQdcTSgp	Ce7ENxiLe909n9QT5BNPpxBOmDcOuypfn70FpJksdDS2V	6
\.


--
-- Name: oauth_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('oauth_id_seq', 6, true);


--
-- Data for Name: oauth_providers; Type: TABLE DATA; Schema: recipe-book; Owner: recipe-book-admin
--

COPY oauth_providers (id, name) FROM stdin;
1	twitter
\.


--
-- Name: oauth_providers_id_seq; Type: SEQUENCE SET; Schema: recipe-book; Owner: recipe-book-admin
--

SELECT pg_catalog.setval('oauth_providers_id_seq', 1, true);


--
-- Name: Comments_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: Favorite_Recipes_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Favorite_Recipes"
    ADD CONSTRAINT "Favorite_Recipes_pkey" PRIMARY KEY (recipe_id, user_id);


--
-- Name: Ingredient_Categories_name_key; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Ingredient_Categories"
    ADD CONSTRAINT "Ingredient_Categories_name_key" UNIQUE (name);


--
-- Name: Ingredient_Categories_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Ingredient_Categories"
    ADD CONSTRAINT "Ingredient_Categories_pkey" PRIMARY KEY (id);


--
-- Name: Ingredients_Nutrients_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Ingredients_Nutrients"
    ADD CONSTRAINT "Ingredients_Nutrients_pkey" PRIMARY KEY (ingredient_id, nutrient_id);


--
-- Name: Ingredients_name_key; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Ingredients"
    ADD CONSTRAINT "Ingredients_name_key" UNIQUE (name);


--
-- Name: Ingredients_ndb_number_key; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Ingredients"
    ADD CONSTRAINT "Ingredients_ndb_number_key" UNIQUE (ndb_number);


--
-- Name: Ingredients_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Ingredients"
    ADD CONSTRAINT "Ingredients_pkey" PRIMARY KEY (id);


--
-- Name: Nutrient_Categories_name_key; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Nutrient_Categories"
    ADD CONSTRAINT "Nutrient_Categories_name_key" UNIQUE (name);


--
-- Name: Nutrient_Categories_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Nutrient_Categories"
    ADD CONSTRAINT "Nutrient_Categories_pkey" PRIMARY KEY (id);


--
-- Name: Nutrients_Norm_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Nutrients_Norm"
    ADD CONSTRAINT "Nutrients_Norm_pkey" PRIMARY KEY (id);


--
-- Name: Nutrients_name_key; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Nutrients"
    ADD CONSTRAINT "Nutrients_name_key" UNIQUE (name);


--
-- Name: Nutrients_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Nutrients"
    ADD CONSTRAINT "Nutrients_pkey" PRIMARY KEY (id);


--
-- Name: Recipes_Ingredients_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Recipes_Ingredients"
    ADD CONSTRAINT "Recipes_Ingredients_pkey" PRIMARY KEY (recipe_id, ingedient_id);


--
-- Name: Recipes_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Recipes"
    ADD CONSTRAINT "Recipes_pkey" PRIMARY KEY (id);


--
-- Name: Resipes_Tags_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Resipes_Tags"
    ADD CONSTRAINT "Resipes_Tags_pkey" PRIMARY KEY (tag_id, recipe_id);


--
-- Name: Tags_name_key; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Tags"
    ADD CONSTRAINT "Tags_name_key" UNIQUE (name);


--
-- Name: Tags_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY (id);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: id; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY oauth
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- Name: oauth_providers_pkey; Type: CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

ALTER TABLE ONLY oauth_providers
    ADD CONSTRAINT oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: Comments_author; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Comments_author" ON "Comments" USING hash (author);


--
-- Name: Comments_recipe_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Comments_recipe_id" ON "Comments" USING hash (recipe_id);


--
-- Name: Favorite_Recipes_recipe_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Favorite_Recipes_recipe_id" ON "Favorite_Recipes" USING hash (recipe_id);


--
-- Name: Favorite_Recipes_user_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Favorite_Recipes_user_id" ON "Favorite_Recipes" USING hash (user_id);


--
-- Name: Ingredients_Nutrients_ingredient_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Ingredients_Nutrients_ingredient_id" ON "Ingredients_Nutrients" USING hash (ingredient_id);


--
-- Name: Ingredients_category_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Ingredients_category_id" ON "Ingredients" USING hash (category_id);


--
-- Name: Nutrients_Norm_nutrient_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Nutrients_Norm_nutrient_id" ON "Nutrients_Norm" USING hash (nutrient_id);


--
-- Name: Nutrients_category_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Nutrients_category_id" ON "Nutrients" USING hash (category_id);


--
-- Name: Recipes_Ingredients_ingedient_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Recipes_Ingredients_ingedient_id" ON "Recipes_Ingredients" USING hash (ingedient_id);


--
-- Name: Recipes_Ingredients_recipe_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Recipes_Ingredients_recipe_id" ON "Recipes_Ingredients" USING hash (recipe_id);


--
-- Name: Recipes_owner_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Recipes_owner_id" ON "Recipes" USING hash (owner_id);


--
-- Name: Resipes_Tags_recipe_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Resipes_Tags_recipe_id" ON "Resipes_Tags" USING hash (recipe_id);


--
-- Name: Resipes_Tags_tag_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Resipes_Tags_tag_id" ON "Resipes_Tags" USING hash (tag_id);


--
-- Name: Resipes_Tags_user_id; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "Resipes_Tags_user_id" ON "Resipes_Tags" USING hash (user_id);


--
-- Name: èìÿ; Type: INDEX; Schema: recipe-book; Owner: recipe-book-admin; Tablespace: 
--

CREATE INDEX "èìÿ" ON "Ingredients_Nutrients" USING hash (nutrient_id);


--
-- Name: Comments_author_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Comments"
    ADD CONSTRAINT "Comments_author_fkey" FOREIGN KEY (author) REFERENCES "Users"(id);


--
-- Name: Comments_recipe_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Comments"
    ADD CONSTRAINT "Comments_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES "Recipes"(id);


--
-- Name: Favorite_Recipes_recipe_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Favorite_Recipes"
    ADD CONSTRAINT "Favorite_Recipes_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES "Recipes"(id);


--
-- Name: Favorite_Recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Favorite_Recipes"
    ADD CONSTRAINT "Favorite_Recipes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "Users"(id);


--
-- Name: Ingredients_Nutrients_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Ingredients_Nutrients"
    ADD CONSTRAINT "Ingredients_Nutrients_ingredient_id_fkey" FOREIGN KEY (ingredient_id) REFERENCES "Ingredients"(id);


--
-- Name: Ingredients_Nutrients_nutrient_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Ingredients_Nutrients"
    ADD CONSTRAINT "Ingredients_Nutrients_nutrient_id_fkey" FOREIGN KEY (nutrient_id) REFERENCES "Nutrients"(id);


--
-- Name: Ingredients_category_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Ingredients"
    ADD CONSTRAINT "Ingredients_category_id_fkey" FOREIGN KEY (category_id) REFERENCES "Ingredient_Categories"(id);


--
-- Name: Nutrients_Norm_nutrient_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Nutrients_Norm"
    ADD CONSTRAINT "Nutrients_Norm_nutrient_id_fkey" FOREIGN KEY (nutrient_id) REFERENCES "Nutrients"(id);


--
-- Name: Nutrients_category_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Nutrients"
    ADD CONSTRAINT "Nutrients_category_id_fkey" FOREIGN KEY (category_id) REFERENCES "Nutrient_Categories"(id);


--
-- Name: Provider; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY oauth
    ADD CONSTRAINT "Provider" FOREIGN KEY (provider) REFERENCES oauth_providers(id);


--
-- Name: Recipes_Ingredients_ingedient_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Recipes_Ingredients"
    ADD CONSTRAINT "Recipes_Ingredients_ingedient_id_fkey" FOREIGN KEY (ingedient_id) REFERENCES "Ingredients"(id);


--
-- Name: Recipes_Ingredients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Recipes_Ingredients"
    ADD CONSTRAINT "Recipes_Ingredients_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES "Recipes"(id);


--
-- Name: Recipes_owner_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Recipes"
    ADD CONSTRAINT "Recipes_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES "Users"(id);


--
-- Name: Resipes_Tags_recipe_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Resipes_Tags"
    ADD CONSTRAINT "Resipes_Tags_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES "Recipes"(id);


--
-- Name: Resipes_Tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Resipes_Tags"
    ADD CONSTRAINT "Resipes_Tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES "Tags"(id);


--
-- Name: Resipes_Tags_user_id_fkey; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY "Resipes_Tags"
    ADD CONSTRAINT "Resipes_Tags_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "Users"(id);


--
-- Name: user_id; Type: FK CONSTRAINT; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER TABLE ONLY oauth
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES "Users"(id);


--
-- Name: recipe-book; Type: ACL; Schema: -; Owner: recipe-book-admin
--

REVOKE ALL ON SCHEMA "recipe-book" FROM PUBLIC;
REVOKE ALL ON SCHEMA "recipe-book" FROM "recipe-book-admin";
GRANT ALL ON SCHEMA "recipe-book" TO "recipe-book-admin";
GRANT USAGE ON SCHEMA "recipe-book" TO "recipe-book-web-user";


--
-- Name: Comments; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Comments" FROM PUBLIC;
REVOKE ALL ON TABLE "Comments" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Comments" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Comments" TO "recipe-book-web-user";


--
-- Name: Comments_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Comments_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Comments_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Comments_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Comments_id_seq" TO "recipe-book-web-user";


--
-- Name: Favorite_Recipes; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Favorite_Recipes" FROM PUBLIC;
REVOKE ALL ON TABLE "Favorite_Recipes" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Favorite_Recipes" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Favorite_Recipes" TO "recipe-book-web-user";


--
-- Name: Ingredient_Categories; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Ingredient_Categories" FROM PUBLIC;
REVOKE ALL ON TABLE "Ingredient_Categories" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Ingredient_Categories" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Ingredient_Categories" TO "recipe-book-web-user";


--
-- Name: Ingredient_Categories_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Ingredient_Categories_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Ingredient_Categories_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Ingredient_Categories_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Ingredient_Categories_id_seq" TO "recipe-book-web-user";


--
-- Name: Ingredients; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Ingredients" FROM PUBLIC;
REVOKE ALL ON TABLE "Ingredients" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Ingredients" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Ingredients" TO "recipe-book-web-user";


--
-- Name: Ingredients_Nutrients; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Ingredients_Nutrients" FROM PUBLIC;
REVOKE ALL ON TABLE "Ingredients_Nutrients" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Ingredients_Nutrients" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Ingredients_Nutrients" TO "recipe-book-web-user";


--
-- Name: Ingredients_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Ingredients_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Ingredients_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Ingredients_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Ingredients_id_seq" TO "recipe-book-web-user";


--
-- Name: Nutrient_Categories; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Nutrient_Categories" FROM PUBLIC;
REVOKE ALL ON TABLE "Nutrient_Categories" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Nutrient_Categories" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Nutrient_Categories" TO "recipe-book-web-user";


--
-- Name: Nutrient_Categories_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Nutrient_Categories_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Nutrient_Categories_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Nutrient_Categories_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Nutrient_Categories_id_seq" TO "recipe-book-web-user";


--
-- Name: Nutrients; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Nutrients" FROM PUBLIC;
REVOKE ALL ON TABLE "Nutrients" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Nutrients" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Nutrients" TO "recipe-book-web-user";


--
-- Name: Nutrients_Norm; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Nutrients_Norm" FROM PUBLIC;
REVOKE ALL ON TABLE "Nutrients_Norm" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Nutrients_Norm" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Nutrients_Norm" TO "recipe-book-web-user";


--
-- Name: Nutrients_Norm_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Nutrients_Norm_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Nutrients_Norm_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Nutrients_Norm_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Nutrients_Norm_id_seq" TO "recipe-book-web-user";


--
-- Name: Nutrients_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Nutrients_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Nutrients_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Nutrients_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Nutrients_id_seq" TO "recipe-book-web-user";


--
-- Name: Recipes; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Recipes" FROM PUBLIC;
REVOKE ALL ON TABLE "Recipes" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Recipes" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Recipes" TO "recipe-book-web-user";


--
-- Name: Recipes_Ingredients; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Recipes_Ingredients" FROM PUBLIC;
REVOKE ALL ON TABLE "Recipes_Ingredients" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Recipes_Ingredients" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Recipes_Ingredients" TO "recipe-book-web-user";


--
-- Name: Recipes_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Recipes_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Recipes_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Recipes_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Recipes_id_seq" TO "recipe-book-web-user";


--
-- Name: Resipes_Tags; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Resipes_Tags" FROM PUBLIC;
REVOKE ALL ON TABLE "Resipes_Tags" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Resipes_Tags" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Resipes_Tags" TO "recipe-book-web-user";


--
-- Name: Tags; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Tags" FROM PUBLIC;
REVOKE ALL ON TABLE "Tags" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Tags" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Tags" TO "recipe-book-web-user";


--
-- Name: Tags_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Tags_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Tags_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Tags_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Tags_id_seq" TO "recipe-book-web-user";


--
-- Name: Users; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE "Users" FROM PUBLIC;
REVOKE ALL ON TABLE "Users" FROM "recipe-book-admin";
GRANT ALL ON TABLE "Users" TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "Users" TO "recipe-book-web-user";


--
-- Name: Users_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE "Users_id_seq" FROM PUBLIC;
REVOKE ALL ON SEQUENCE "Users_id_seq" FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE "Users_id_seq" TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE "Users_id_seq" TO "recipe-book-web-user";


--
-- Name: oauth; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE oauth FROM PUBLIC;
REVOKE ALL ON TABLE oauth FROM "recipe-book-admin";
GRANT ALL ON TABLE oauth TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE oauth TO "recipe-book-web-user";


--
-- Name: oauth_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE oauth_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE oauth_id_seq FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE oauth_id_seq TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE oauth_id_seq TO "recipe-book-web-user";


--
-- Name: oauth_providers; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON TABLE oauth_providers FROM PUBLIC;
REVOKE ALL ON TABLE oauth_providers FROM "recipe-book-admin";
GRANT ALL ON TABLE oauth_providers TO "recipe-book-admin";
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE oauth_providers TO "recipe-book-web-user";


--
-- Name: oauth_providers_id_seq; Type: ACL; Schema: recipe-book; Owner: recipe-book-admin
--

REVOKE ALL ON SEQUENCE oauth_providers_id_seq FROM PUBLIC;
REVOKE ALL ON SEQUENCE oauth_providers_id_seq FROM "recipe-book-admin";
GRANT ALL ON SEQUENCE oauth_providers_id_seq TO "recipe-book-admin";
GRANT SELECT,USAGE ON SEQUENCE oauth_providers_id_seq TO "recipe-book-web-user";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" REVOKE ALL ON SEQUENCES  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" REVOKE ALL ON SEQUENCES  FROM "recipe-book-admin";
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" GRANT SELECT,USAGE ON SEQUENCES  TO "recipe-book-web-user";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: recipe-book-admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" REVOKE ALL ON FUNCTIONS  FROM "recipe-book-admin";
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" GRANT ALL ON FUNCTIONS  TO "recipe-book-admin";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" REVOKE ALL ON FUNCTIONS  FROM "recipe-book-admin";
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" GRANT ALL ON FUNCTIONS  TO "recipe-book-web-user";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: recipe-book; Owner: recipe-book-admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" REVOKE ALL ON TABLES  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" REVOKE ALL ON TABLES  FROM "recipe-book-admin";
ALTER DEFAULT PRIVILEGES FOR ROLE "recipe-book-admin" IN SCHEMA "recipe-book" GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO "recipe-book-web-user";


--
-- PostgreSQL database dump complete
--

