import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Text, createStyles, AppShell } from "@mantine/core";
import { Link, Route, Routes } from "react-router-dom";
import Persons from "./persons";
import Agents from "./agents";
import AppraiserCompanies from "./appraiserCompanies";
import InsuredCompanies from "./insuranceCompanies";
import Appraisers from "./appraisers";
import Sdp from "./sdp";
import InsuredEvent from "./insuredEvents";
import "./index.css";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    },

    title: {
      textTransform: "uppercase",
      letterSpacing: -0.25,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colors[theme.primaryColor][
            theme.colorScheme === "dark" ? 4 : 7
          ],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === "dark" ? 4 : 7
            ],
        },
      },
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },
  };
});

const tabs = {
  superadmin: [
    { link: "/persons", label: "INSURED PERSONS", element: <Persons /> },
    { link: "/agents", label: "AGENTS", element: <Agents /> },
    {
      link: "/appraiser-company",
      label: "APPRAISER COMPANIES",
      element: <AppraiserCompanies />,
    },
    { link: "/appraisers", label: "APPRAISERS", element: <Appraisers /> },
    { link: "/sdp", label: "SDP", element: <Sdp /> },
    { link: "/events", label: "INSURED EVENTS", element: <InsuredEvent /> },
    {
      link: "/insurance-company",
      label: "INSURANCE COMPANIES",
      element: <InsuredCompanies />,
    },
  ],
  insurance_company: [
    {
      link: "/insurance-company",
      label: "INSURANCE COMPANIES",
      element: <InsuredCompanies />,
    },
  ],
  appraisal_company: [
    {
      link: "/appraiser-company",
      label: "APPRAISER COMPANIES",
      element: <AppraiserCompanies />,
    },
  ],
};

export default function AdminPanel() {
  const user = useSelector(({ user }) => user);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("INSURED PERSONS");
  const links = tabs[user?.role].map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </Link>
  ));

  const RootRoutes = tabs[user?.role].map((item, i) => (
    <Route key={i} path={item?.link} element={item?.element} />
  ));

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          height={"100vh"}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}
        >
          <Navbar.Section>
            <Text
              weight={600}
              size="sm"
              className={classes.title}
              color="dimmed"
              mb="xs"
              style={{ marginBottom: "-10px", padding: " 0 10px" }}
            >
              InsureX Admin Panel
            </Text>
          </Navbar.Section>
          <Navbar.Section mt="xl">{links}</Navbar.Section>
        </Navbar>
      }
    >
      <Routes>{RootRoutes}</Routes>
    </AppShell>
  );
}