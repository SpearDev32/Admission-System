CREATE TABLE admission_data
(
    applicant_id bigint NOT NULL,
    admission_level character varying(255) COLLATE pg_catalog."default" NOT NULL,
    applicant_type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_school_name text COLLATE pg_catalog."default" NOT NULL,
    last_school_address text COLLATE pg_catalog."default" NOT NULL,
    last_year_attended character varying(255) COLLATE pg_catalog."default",
    last_year_level character varying(255) COLLATE pg_catalog."default",
    gwa character varying(255) COLLATE pg_catalog."default",
    program_or_strand character varying(255) COLLATE pg_catalog."default",
    applied_year_level character varying(255) COLLATE pg_catalog."default",
    lrn character varying(255) COLLATE pg_catalog."default",
    campus character varying(255) COLLATE pg_catalog."default",
    preferred_course_1 character varying(255) COLLATE pg_catalog."default" NOT NULL,
    preferred_course_2 character varying(255) COLLATE pg_catalog."default",
    preferred_course_3 character varying(255) COLLATE pg_catalog."default",
    is_confirmed boolean DEFAULT false,
    CONSTRAINT admission_data_pkey PRIMARY KEY (applicant_id),
    CONSTRAINT admission_data_applicant_id_fkey FOREIGN KEY (applicant_id)
        REFERENCES public.applicants (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

CREATE TABLE applicants
(
    id bigint NOT NULL DEFAULT nextval('applicants_id_seq'::regclass),
    control_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT applicants_pkey PRIMARY KEY (id),
    CONSTRAINT applicants_control_number_key UNIQUE (control_number)
)

CREATE TABLE family_background
(
    applicant_id bigint NOT NULL,
    father_last_name character varying(255) COLLATE pg_catalog."default",
    father_first_name character varying(255) COLLATE pg_catalog."default",
    father_middle_name character varying(255) COLLATE pg_catalog."default",
    father_mobile character varying(255) COLLATE pg_catalog."default",
    father_occupation character varying(255) COLLATE pg_catalog."default",
    father_income character varying(255) COLLATE pg_catalog."default",
    mother_last_name character varying(255) COLLATE pg_catalog."default",
    mother_first_name character varying(255) COLLATE pg_catalog."default",
    mother_middle_name character varying(255) COLLATE pg_catalog."default",
    mother_mobile character varying(255) COLLATE pg_catalog."default",
    mother_occupation character varying(255) COLLATE pg_catalog."default",
    mother_income character varying(255) COLLATE pg_catalog."default",
    guardian_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    guardian_mobile character varying(255) COLLATE pg_catalog."default" NOT NULL,
    guardian_relationship character varying(255) COLLATE pg_catalog."default" NOT NULL,
    guardian_relationship_other character varying(255) COLLATE pg_catalog."default",
    emergency_contact_name character varying(255) COLLATE pg_catalog."default",
    emergency_relationship character varying(255) COLLATE pg_catalog."default",
    emergency_mobile character varying(255) COLLATE pg_catalog."default",
    father_name character varying(255) COLLATE pg_catalog."default",
    mother_name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT family_background_pkey PRIMARY KEY (applicant_id),
    CONSTRAINT family_background_applicant_id_fkey FOREIGN KEY (applicant_id)
        REFERENCES public.applicants (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

CREATE TABLE personal_data
(
    applicant_id bigint NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying(255) COLLATE pg_catalog."default",
    name_extension character varying(255) COLLATE pg_catalog."default",
    date_of_birth date NOT NULL,
    sex character varying(255) COLLATE pg_catalog."default" NOT NULL,
    height character varying(255) COLLATE pg_catalog."default",
    weight character varying(255) COLLATE pg_catalog."default",
    religion character varying(255) COLLATE pg_catalog."default",
    religion_other character varying(255) COLLATE pg_catalog."default",
    civil_status character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birth_place text COLLATE pg_catalog."default" NOT NULL,
    home_country character varying(255) COLLATE pg_catalog."default" NOT NULL,
    home_region character varying(255) COLLATE pg_catalog."default" NOT NULL,
    home_province character varying(255) COLLATE pg_catalog."default" NOT NULL,
    home_municipality character varying(255) COLLATE pg_catalog."default" NOT NULL,
    home_barangay character varying(255) COLLATE pg_catalog."default" NOT NULL,
    home_street text COLLATE pg_catalog."default",
    use_home_as_present boolean DEFAULT false,
    present_country character varying(255) COLLATE pg_catalog."default",
    present_region character varying(255) COLLATE pg_catalog."default",
    present_province character varying(255) COLLATE pg_catalog."default",
    present_municipality character varying(255) COLLATE pg_catalog."default",
    present_barangay character varying(255) COLLATE pg_catalog."default",
    present_street text COLLATE pg_catalog."default",
    is_gida boolean DEFAULT false,
    mobile_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email_address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    nationality character varying(255) COLLATE pg_catalog."default" NOT NULL,
    has_dual_citizenship boolean DEFAULT false,
    second_nationality character varying(255) COLLATE pg_catalog."default",
    member_of_ip boolean DEFAULT false,
    ip_group_name character varying(255) COLLATE pg_catalog."default",
    is_pwd boolean DEFAULT false,
    is_working_student boolean DEFAULT false,
    CONSTRAINT personal_data_pkey PRIMARY KEY (applicant_id),
    CONSTRAINT personal_data_applicant_id_fkey FOREIGN KEY (applicant_id)
        REFERENCES public.applicants (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
