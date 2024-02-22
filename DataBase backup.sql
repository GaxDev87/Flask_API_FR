PGDMP  	    #                |            postgres    16.0    16.0 A    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4855                        2615    57374    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    6            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    6                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    139358    Courses    TABLE       CREATE TABLE public."Courses" (
    "course_Id" integer NOT NULL,
    "course_Name" character varying(100) NOT NULL,
    "department_Name" character varying(100) NOT NULL,
    "course_Picture" character varying(300),
    "course_Description" character varying(1500)
);
    DROP TABLE public."Courses";
       public         heap    postgres    false    6            �            1259    139357    Courses_course_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Courses_course_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Courses_course_Id_seq";
       public          postgres    false    6    219            �           0    0    Courses_course_Id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Courses_course_Id_seq" OWNED BY public."Courses"."course_Id";
          public          postgres    false    218            �            1259    164157 	   Documents    TABLE       CREATE TABLE public."Documents" (
    "document_Id" integer NOT NULL,
    "course_Id" integer NOT NULL,
    "document_Module" character varying(100),
    "document_Name" character varying(100) NOT NULL,
    "document_Url" character varying(800) NOT NULL
);
    DROP TABLE public."Documents";
       public         heap    postgres    false    6            �            1259    164156    Documents_document_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Documents_document_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Documents_document_Id_seq";
       public          postgres    false    221    6            �           0    0    Documents_document_Id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Documents_document_Id_seq" OWNED BY public."Documents"."document_Id";
          public          postgres    false    220            �            1259    172167    Survey    TABLE     	  CREATE TABLE public."Survey" (
    "survey_Id" integer NOT NULL,
    "user_Id" integer NOT NULL,
    "course_Id" integer NOT NULL,
    "course_Name" character varying(100) NOT NULL,
    "course_Rank" integer NOT NULL,
    "course_Comment" character varying(800)
);
    DROP TABLE public."Survey";
       public         heap    postgres    false    6            �            1259    172166    Survey_survey_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Survey_survey_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Survey_survey_Id_seq";
       public          postgres    false    6    225            �           0    0    Survey_survey_Id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Survey_survey_Id_seq" OWNED BY public."Survey"."survey_Id";
          public          postgres    false    224            �            1259    180318    User_courses    TABLE     �  CREATE TABLE public."User_courses" (
    "user_course_Id" integer NOT NULL,
    "user_Id" integer NOT NULL,
    "course_Id" integer NOT NULL,
    "course_Name" character varying(100) NOT NULL,
    "department_Name" character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    "is_course_Completed" boolean,
    "course_comp_Date" timestamp without time zone DEFAULT now()
);
 "   DROP TABLE public."User_courses";
       public         heap    postgres    false    6            �            1259    180317    User_courses_user_course_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_courses_user_course_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."User_courses_user_course_Id_seq";
       public          postgres    false    227    6            �           0    0    User_courses_user_course_Id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public."User_courses_user_course_Id_seq" OWNED BY public."User_courses"."user_course_Id";
          public          postgres    false    226            �            1259    114782    Users    TABLE     y  CREATE TABLE public."Users" (
    "user_Id" integer NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100) NOT NULL,
    "group_Type" character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    "user_Type" character varying(100),
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);
    DROP TABLE public."Users";
       public         heap    postgres    false    6            �            1259    114781    Users_user_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_user_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Users_user_Id_seq";
       public          postgres    false    6    217                        0    0    Users_user_Id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Users_user_Id_seq" OWNED BY public."Users"."user_Id";
          public          postgres    false    216            �            1259    164172    Videos    TABLE     �   CREATE TABLE public."Videos" (
    "video_Id" integer NOT NULL,
    "course_Id" integer NOT NULL,
    "video_Module" character varying(100),
    "video_Name" character varying(100) NOT NULL,
    "video_Url" character varying(800) NOT NULL
);
    DROP TABLE public."Videos";
       public         heap    postgres    false    6            �            1259    164171    Videos_video_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."Videos_video_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Videos_video_Id_seq";
       public          postgres    false    223    6                       0    0    Videos_video_Id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Videos_video_Id_seq" OWNED BY public."Videos"."video_Id";
          public          postgres    false    222            6           2604    139361    Courses course_Id    DEFAULT     |   ALTER TABLE ONLY public."Courses" ALTER COLUMN "course_Id" SET DEFAULT nextval('public."Courses_course_Id_seq"'::regclass);
 D   ALTER TABLE public."Courses" ALTER COLUMN "course_Id" DROP DEFAULT;
       public          postgres    false    218    219    219            7           2604    164160    Documents document_Id    DEFAULT     �   ALTER TABLE ONLY public."Documents" ALTER COLUMN "document_Id" SET DEFAULT nextval('public."Documents_document_Id_seq"'::regclass);
 H   ALTER TABLE public."Documents" ALTER COLUMN "document_Id" DROP DEFAULT;
       public          postgres    false    220    221    221            9           2604    172170    Survey survey_Id    DEFAULT     z   ALTER TABLE ONLY public."Survey" ALTER COLUMN "survey_Id" SET DEFAULT nextval('public."Survey_survey_Id_seq"'::regclass);
 C   ALTER TABLE public."Survey" ALTER COLUMN "survey_Id" DROP DEFAULT;
       public          postgres    false    225    224    225            :           2604    180321    User_courses user_course_Id    DEFAULT     �   ALTER TABLE ONLY public."User_courses" ALTER COLUMN "user_course_Id" SET DEFAULT nextval('public."User_courses_user_course_Id_seq"'::regclass);
 N   ALTER TABLE public."User_courses" ALTER COLUMN "user_course_Id" DROP DEFAULT;
       public          postgres    false    227    226    227            4           2604    114785    Users user_Id    DEFAULT     t   ALTER TABLE ONLY public."Users" ALTER COLUMN "user_Id" SET DEFAULT nextval('public."Users_user_Id_seq"'::regclass);
 @   ALTER TABLE public."Users" ALTER COLUMN "user_Id" DROP DEFAULT;
       public          postgres    false    217    216    217            8           2604    164175    Videos video_Id    DEFAULT     x   ALTER TABLE ONLY public."Videos" ALTER COLUMN "video_Id" SET DEFAULT nextval('public."Videos_video_Id_seq"'::regclass);
 B   ALTER TABLE public."Videos" ALTER COLUMN "video_Id" DROP DEFAULT;
       public          postgres    false    223    222    223            �          0    139358    Courses 
   TABLE DATA           z   COPY public."Courses" ("course_Id", "course_Name", "department_Name", "course_Picture", "course_Description") FROM stdin;
    public          postgres    false    219   �M       �          0    164157 	   Documents 
   TABLE DATA           u   COPY public."Documents" ("document_Id", "course_Id", "document_Module", "document_Name", "document_Url") FROM stdin;
    public          postgres    false    221   jT       �          0    172167    Survey 
   TABLE DATA           w   COPY public."Survey" ("survey_Id", "user_Id", "course_Id", "course_Name", "course_Rank", "course_Comment") FROM stdin;
    public          postgres    false    225   �Y       �          0    180318    User_courses 
   TABLE DATA           �   COPY public."User_courses" ("user_course_Id", "user_Id", "course_Id", "course_Name", "department_Name", created_at, "is_course_Completed", "course_comp_Date") FROM stdin;
    public          postgres    false    227   �Y       �          0    114782    Users 
   TABLE DATA           }   COPY public."Users" ("user_Id", "firstName", "lastName", "group_Type", email, "user_Type", password, created_at) FROM stdin;
    public          postgres    false    217   �Z       �          0    164172    Videos 
   TABLE DATA           f   COPY public."Videos" ("video_Id", "course_Id", "video_Module", "video_Name", "video_Url") FROM stdin;
    public          postgres    false    223   �_                  0    0    Courses_course_Id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Courses_course_Id_seq"', 10, true);
          public          postgres    false    218                       0    0    Documents_document_Id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Documents_document_Id_seq"', 20, true);
          public          postgres    false    220                       0    0    Survey_survey_Id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Survey_survey_Id_seq"', 3, true);
          public          postgres    false    224                       0    0    User_courses_user_course_Id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."User_courses_user_course_Id_seq"', 15, true);
          public          postgres    false    226                       0    0    Users_user_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Users_user_Id_seq"', 21, true);
          public          postgres    false    216                       0    0    Videos_video_Id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Videos_video_Id_seq"', 21, true);
          public          postgres    false    222            C           2606    139365    Courses Courses_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY ("course_Id");
 B   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT "Courses_pkey";
       public            postgres    false    219            F           2606    164164    Documents Documents_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_pkey" PRIMARY KEY ("document_Id");
 F   ALTER TABLE ONLY public."Documents" DROP CONSTRAINT "Documents_pkey";
       public            postgres    false    221            L           2606    172174    Survey Survey_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Survey"
    ADD CONSTRAINT "Survey_pkey" PRIMARY KEY ("survey_Id");
 @   ALTER TABLE ONLY public."Survey" DROP CONSTRAINT "Survey_pkey";
       public            postgres    false    225            O           2606    180325    User_courses User_courses_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."User_courses"
    ADD CONSTRAINT "User_courses_pkey" PRIMARY KEY ("user_course_Id");
 L   ALTER TABLE ONLY public."User_courses" DROP CONSTRAINT "User_courses_pkey";
       public            postgres    false    227            >           2606    114792    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            postgres    false    217            @           2606    114790    Users Users_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("user_Id");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    217            I           2606    164179    Videos Videos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Videos"
    ADD CONSTRAINT "Videos_pkey" PRIMARY KEY ("video_Id");
 @   ALTER TABLE ONLY public."Videos" DROP CONSTRAINT "Videos_pkey";
       public            postgres    false    223            D           1259    139366    ix_Courses_course_Id    INDEX     S   CREATE INDEX "ix_Courses_course_Id" ON public."Courses" USING btree ("course_Id");
 *   DROP INDEX public."ix_Courses_course_Id";
       public            postgres    false    219            G           1259    164170    ix_Documents_document_Id    INDEX     [   CREATE INDEX "ix_Documents_document_Id" ON public."Documents" USING btree ("document_Id");
 .   DROP INDEX public."ix_Documents_document_Id";
       public            postgres    false    221            M           1259    172185    ix_Survey_survey_Id    INDEX     Q   CREATE INDEX "ix_Survey_survey_Id" ON public."Survey" USING btree ("survey_Id");
 )   DROP INDEX public."ix_Survey_survey_Id";
       public            postgres    false    225            P           1259    180336    ix_User_courses_user_course_Id    INDEX     g   CREATE INDEX "ix_User_courses_user_course_Id" ON public."User_courses" USING btree ("user_course_Id");
 4   DROP INDEX public."ix_User_courses_user_course_Id";
       public            postgres    false    227            A           1259    114793    ix_Users_user_Id    INDEX     K   CREATE INDEX "ix_Users_user_Id" ON public."Users" USING btree ("user_Id");
 &   DROP INDEX public."ix_Users_user_Id";
       public            postgres    false    217            J           1259    164185    ix_Videos_video_Id    INDEX     O   CREATE INDEX "ix_Videos_video_Id" ON public."Videos" USING btree ("video_Id");
 (   DROP INDEX public."ix_Videos_video_Id";
       public            postgres    false    223            Q           2606    164165 "   Documents Documents_course_Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_course_Id_fkey" FOREIGN KEY ("course_Id") REFERENCES public."Courses"("course_Id");
 P   ALTER TABLE ONLY public."Documents" DROP CONSTRAINT "Documents_course_Id_fkey";
       public          postgres    false    219    4675    221            S           2606    172180    Survey Survey_course_Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Survey"
    ADD CONSTRAINT "Survey_course_Id_fkey" FOREIGN KEY ("course_Id") REFERENCES public."Courses"("course_Id");
 J   ALTER TABLE ONLY public."Survey" DROP CONSTRAINT "Survey_course_Id_fkey";
       public          postgres    false    225    219    4675            T           2606    172175    Survey Survey_user_Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Survey"
    ADD CONSTRAINT "Survey_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES public."Users"("user_Id");
 H   ALTER TABLE ONLY public."Survey" DROP CONSTRAINT "Survey_user_Id_fkey";
       public          postgres    false    225    4672    217            U           2606    180331 (   User_courses User_courses_course_Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_courses"
    ADD CONSTRAINT "User_courses_course_Id_fkey" FOREIGN KEY ("course_Id") REFERENCES public."Courses"("course_Id");
 V   ALTER TABLE ONLY public."User_courses" DROP CONSTRAINT "User_courses_course_Id_fkey";
       public          postgres    false    219    227    4675            V           2606    180326 &   User_courses User_courses_user_Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_courses"
    ADD CONSTRAINT "User_courses_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES public."Users"("user_Id");
 T   ALTER TABLE ONLY public."User_courses" DROP CONSTRAINT "User_courses_user_Id_fkey";
       public          postgres    false    227    4672    217            R           2606    164180    Videos Videos_course_Id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Videos"
    ADD CONSTRAINT "Videos_course_Id_fkey" FOREIGN KEY ("course_Id") REFERENCES public."Courses"("course_Id");
 J   ALTER TABLE ONLY public."Videos" DROP CONSTRAINT "Videos_course_Id_fkey";
       public          postgres    false    219    4675    223            �   l  x�uV�r�8<K_�cR%���(�ޜĕ�6���x�W�@rD�& �U�&��V>A?�= �W�m�3=�=��.�SyM�KߙѪ�Z�[�=<<��,�}�����K�]7���_^צ��J%3�~)LI���M�^K�"ke�HwR�$$�hd���Bmj~Ul��2B�lg�WO�%ۨ�Em�h�Y�SF�Q���� ���%k�8�DF/U�m�FT��4�Uzi%^Y_tX���V�%'�5u���Q)��n"�j�Z-U!9B'-I��wt�*�b�tN��5g��Wa���IW^�v��(em�+c&�W���V����#���?7���_{E-�X%�K�em:��|[Y�l>�ϳ�ExrI�$����F��%�U��YεBפCBx� �����O��	`��PGh̰1"�ZӅܹ�N��WC%�
e�JY����\�1�Z�$-�D�@���@�'�TEP����0�z|6�,}ݍ��4�/�M�`��r�6�V�ɵT��VҭTal��yg�־R����sM6mu5z��`��qj��<pf�=�������=��8��DHG�b�J��Z��K����H "|V��.W"*�uF8<�t��;��td�?���a>��#2b	P������ȮU{��@B��Xz3^�^�ͼ����um�b��̝��f��J�M�F�|Z��J.u��knX@��?�[%�CB�> T��Gxh��Qa{������>nwQ��I���{;*\}H��.�39�����%5�����`�0�δ}���E�\cR��^\���'�B��TKN�S]Hu��Y�h[j:����1eK�q�3AN�)��n�1��D��D�҄x�(��| �:j�;�{�`����!�cm�"�F`LD�-=���kJ��GB_�~���x @?��L�04���膻�4�9���L��4���7�fӗ�.B2�'�d6���{��,Pl���|�I�l�	jO��g8Ȱ�5rc�>ǒ;f�[Z�Ѳ��+�<�����m��A�������K'�ۯx� �(R�>�ˁ��J#<� M��ѭC%��A�X��;��n2�\�t:@2�d�����E�N%��U�� g�	�A	�%�ıW�5��|:��� [GB5n�H.�h��#Ulf�R0�R-�?
�_I`�أ�K<8�K��|��@6���d5�OX([��vII��D�`軬�;�/\����0.ab�;v�!9>i,e1�o�7���W��.�\�la�9Bd?T���4�����=b�����Arng�P�ש
3���w�_@��f8�#b�#Lx�g��UQ�_��P;_��Q�	�8j����/��PjA�=�x7�X�.R�dzG�U�z½%��
W�*���	L�c����<p����t%x\��Q[��%O)���P��I������������3��t<���]ߜ�Cr)"��(u`0��8?�&��Er~�x���g����^-f�-�T�<������I}8�uǖ�$���u� ��De�J<Î1�D����pb���vC�{�R��zxQod���pK��&W���-V����ܶ�.�4��z}D��������H=|gC=�i8�����x<���3      �   B  x����΢F �ky
_��D��&M�A>�PL�0�(0:0��S���b�v�M�|���I"�o��7�q=�|�5�o �a�p�g�(�0�_~+{Y]_��oo�V)F���B.���o�/�ߪ78�/̊�FEX�]�d7�Z��[aa�f7]M��H�1����kS�����=�z=&���~�LE����)\�U�t5T����	L	�����C��G�5��*l��[��(+�NC^Z˅��<ْa�"SnT;�Q'V�c`3#���&1D��3�;��;��Kv�#�r��U�ר}o3,�h�J�l���R0��`������g�؏L��XE{�g��z�R}[������1�7j�!��#m/�,*l�U�I�Ǥ�IIG��F/������/ﳶ�f���3�3�@�z����f�^<�t������I���~_��q3���a��緶Ì)hDA�%� %���^	,iأ��&�Z�A0��e�%	�"!��5[�p�څ8խS�w��5�Jڗ���: 舟>� �D��qx��"3��[x�8�P�d5/�B��v�T/`埴�4�NE���Mx'�s��3����a��5���P�-���"��ДV��n��P�mm;i:�YS����8Z^\��a�9�^�Qm0�.�(�Y��՗���5�+�2{؄uܕ����`��<{&QM�g�a���V0
_�KWq.�H�j{r2����dΤd�_'�J�cy��}<�<�(cfT6���F��(�*�NYj
�}%^Vka4U�H��qg��a����4�+.��'����7�{=��S�eZ��cx
�3�$XIt�k
b����WϾ�<�ov�^J�,,7��qy�d��j�;��\�0ܨ���� �d.�8z����mq�݄l����ֿ����m�ǔ<F�C��]dtIך�q�0��Y��B���u�kA����%Z��J�UO<ˆ8����d�D6����K�zZ���t�t�]�liI=�֧�Qb�ب�����t��T��ϟ4-A	b���?n�����~�Z�24/	]z3�f��\�#�tvWr�x]�Ѧ���p���
���f���ԯ�����j���`&����#'-.�j�/��<{�5M�:��IZ�3O��JW��eWL��k�[���i�
����њR�j%́:�
���a�Oa��S�hQ�p��V��At~������뙾��mp���f$�U�6��T2Yw�bM�q��O��m�IٮI�3(�"�M�F�*����E���*&Se����U�{B%�G�xOS�gh�' ҫEwtB�o�w�O��o�Ez      �      x������ � �      �     x����j�@�g�)���N��o��ХC�.I���b����=8�̟�����п�a�|���c>¦�[]����q��$R�=1��ᨓY��g<��Oc_O{u*��lg�6����c��k�&��̉{�us��塁��<l'U�k���cm�c�s���˦&�.�]�qΑ��O��KO-qH"N,x�l��XB�-1�6-��T�g�\��,�d�<�P�
Wls�l�m�?e!&�&�Zj��C�_?�x      �   �  x���Kw�J���W8��ƪ��ר	>QAQQ��x)Z��ʯ�h������q��j�}vA���m�PN�i�E)�� ����{��6��4�4V�I�=#��g�Bח09����{�Z*	p�6��"���jy�f�tz��C � �@���
���R� |8-�/�4Ȃ�����$?��q�Dy�Q?�~���|	���9;b�J����ֵ�w	��W���a;�v3� ����B�
"�!��H��eis��L�~@�#�o�x!~��J��|Xk�X&�m�;�����ʋ��M�lR����-T@T"�ЍG��۰�4/hk^�G���VC�7�F=0-�b|�^���F��l�jAa���G���)���"Y����W0��GJ�t%���i�Ҝ�c��vx���o��z(��B��oU��Es��yj;�7[��<����y���S����x� �� !�D�FwΣ��޵{������F���r_oB�I1�&����}}��n�ZU����9�L���K�_FG?lEE�J$^��LȕΠy�p/Ys��}������=�4T��S�l�Y�Щ��i����nW{��v{%H�ώ�pke8U��Giv�W@C�����{)��.�����w��o�6��J�	���Aޣ���`Zn~�C�r}/�5�t��0�,���	6��*�y�`�}b�n�)7�YD[M0dtO��X�7~�QF�)�7#ejٺ�2�L*�@A8x;�
�K�_���m��+2#{9���U1� 	�����n��xE�<�<���=�'0�s�G̺�Ć͔/+CQR��Q���d��!8Meۙg<���'��$���pסo�ϵ��GM������iz?x��7>��]�|nǫ�s\������3k���N=�����U��ŋD�k�f�ЂH@��D,��|"��,{8o�Zg�M�snܵL��X���k���C�|�PG� gA�\7X�������-g@��۔/Ш,��Ol�`}P���D�L�]�l*���?U~�*i�$��HP�͈��ӌ�~e�}u�EybFn˰����gڔ��7���h��X�����V�_X3s�v�����j�B�� �����u�5k���&5�>�bz�|+R���a��kl��¥� ���4�MŖ;�TN�]'���[��(*��$��EYF@���?==���l      �   �  x�ݗ뮢X�?�S��ao�t& "A@��5'p�\܀���'�g�G��T�T%3��ēN:�������|Ѭ�ĵ�o��p����o�p�0�%�G����m(ȏ�8����!Fm�x�]Feq������//�pZǸl�Ou`T�i�|�������K���Q� <ۦ̃&�wg��2�_&�s�FZ*�W���,^���ʳ2.��{>2�=�P�?�/I���#v��@Fy9T�"8�G���C,I�~J�;3Ɣ�ni߃^&e�Յ��E,�S���Vbe{���z�ݑQ�/�y޾��CuuLQܢz(�[��}��wH34��}�"oL�9��k�W�Z3��,�H�F��NY�;��:�j��)2B����9�%H���8־�j����Dt�.c��н
 (�� �AxD�s�Q:�f^mm�y	��M��$i$	b�<S�yBMv[�II�넉e@�8��i<
��v4��FM��z���ކA�F���8��R�ik4v�v��ۆ�%}RX�n!�]IS=9�s�Ї^��e&�G��3z�N� ����ʢ���9b6�
o��!�ȥ�꺹K\K���P���N���1)ˮ؋!�9����m��"	[Tu'�뿢�w|8Ֆ� ���4 ](�`�����16�ϊ���$���
��r��T1;ȫ=8;���f<�bB�%i���6z��R�Hm���@mIѐ�h����Z	��i���>g��۲��½q��B��X47���*ӳ�% 9��y�W�* ���-ʷ�k�CT�Dڕ�?D��d?:ker�=5[X��`�$F�]K�&���T�.;�yN��;���D���	 {%��16���I�צ���2%�4���vQ�̌��2�;�s2�Fnmo��>�Zn����m������:�����U�d�N�9����r�����[L���]7IOyYX���~$A���/�I���9���o���tM��I��I�����q��e������H�ES�2���SO�_4N��$pE�2��̟Q!�_nJ1u����ɳO�)..�ʽ*��_o�Sj��M����MC �Wb��1m~VQ>	�u��4�wF�3��.3e��F��*ݥ��]�9y�Sf�@�Vu��``~�m��a���a^Tb�ʮ��_�߻�;͒,��N���`�ݫ}��-;":�̿��4�}�T�;:�=����f��C俭�����!;uU����V"��͑���㢎�}����-Ϊٷg��	&��Q���q|�,(��]�|�Iͭ�����Fl�6/w�,�Huz�V��<_ �q�0d���Ŷ�rC�Hv|��	������V�b��I���`y�'/�@]��\'�i8sLߒ��j���k�>����;�I3jS֞�+K��o��M\K��r�GbqJ�,<�Q{��ee��>' ס��:{������@v8��G��7���0τ@��P?	��*0��\C.��Q;�|�/��6|eE⟟��7�3l�     