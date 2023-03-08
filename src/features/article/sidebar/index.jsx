import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export function Sidebar() {
  const secteur_articles = [
    "TOUS",
    "ADMINISTRATIF-SECRETARIAT",
    "AERONAUTIQUE",
    "AGRICULTURE-AGROALIMENTAIRE",
    "ART ET ARTISANAT",
    "AUDIOVISUEL",
    "AUTOMOBILE-MOTO",
    "BANQUE-FINANCE-ASSURANCES",
    "CHIMIE-BIOLOGIE",
    "COMMERCE-VENTE",
    "COMMUNICATION",
    "COMPTABILITE-GESTION",
    "CREATION",
    "CULTURE",
    "DISTRIBUTEUR",
    "ENSEIGNEMENT-ORIENTATION",
    "ESTHETIQUE-BEAUTE",
    "HOTELLERIE-RESTAURATION",
    "HUMANITAIRE",
    "IMMOBILIER",
    "INDUSTRIE",
    "INFORMATIQUE-INTERNET-MULTIMEDIA",
    "JOURNALISME",
    "JUSTICE-DROIT",
    "LIVRE ET EDITION",
    "MODE",
    "MUSIQUE",
    "NATURE, ENVIRONNEMENT ET DEVELOPPEMENT DURABLE",
    "PSYCHOLOGUE",
    "PUBLICITE-MARKETING",
    "RESSOURCES HUMAINES",
    "SANTE ET PARAMEDICAL",
    "SECTEUR ANIMALIER",
    "SOCIAL",
    "SPORT",
    "TOURISME",
    "TRANSPORT ET LOGISTIQUE",
    "URBANISME-ARCHITECTURE-BTP",
    "VIGNE-VIN",
  ];

  return (
    <>
      <Sider className="sidebar" style={{ height: "90%", overflowY: "scroll" }}>
        <Menu>
          {secteur_articles.map((item) => (
            <Menu.Item key={item}>
              <NavLink to={"/articles-vue-client/" + item}>
                <span>{item}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
}

export default Sidebar;
