import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "",
  lastName: "",
  name: ``,
  role: "",
  avatar: "",
  email: "",
  location: "Asia/Jakarta",
  languages: [],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to my Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: ``,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Portfolio`,
  description: `Portfolio website showcasing my work`,
  headline: <>Building projects with code</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "",
  },
  subline: (
    <>
    Manage your profile and projects via the dashboard.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About`,
  description: `Learn more about me`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Welcome to my portfolio. Use the dashboard to update this introduction.
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false,
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false,
    title: "Technical skills",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blog",
  description: `Read my latest posts`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Projects`,
  description: `Design and dev projects`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery`,
  description: `Photo collection`,
  images: [],
};

const dashboard = {
  path: "/dashboard",
  label: "Dashboard",
  title: "Dashboard",
  description: "Manage portfolio content",
};

export { person, social, newsletter, home, about, blog, work, gallery, dashboard };
