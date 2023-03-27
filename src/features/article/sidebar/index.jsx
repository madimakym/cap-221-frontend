import React from "react";
import { NavLink } from "react-router-dom";

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
      <div className="menu">
        <ul>
          {secteur_articles.map((item) => (
            <NavLink to={"/articles-vue-client/" + item}>
              <span>{item}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
