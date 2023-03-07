import {
    Col,
    Row,
} from "antd";
import { Helmet } from "react-helmet-async";
import "./../styles/style.scss";
import SuccessDialog from "../../../components/success";
import "moment/locale/fr";
import {NavLink} from "react-router-dom";


export function SuccesspaidPage(){

    return (<>
        <Helmet>
            <title>Success Page</title>
            <meta name="description" content="CAP221" />
        </Helmet>
        <div className="register-page">
            <SuccessDialog
                message="Votre demande d'inscription a bien été enregistrée"
                //status={isSuccess}
                // handleCancel={() => setIsSuccess(false)}
            />
            <Row>
                <Col lg={8}>
                    <div className="blc-left">
                        <div>
                            <img
                                src="assets/img/cap221-logo.png"
                                className="logo"
                                alt="cap221"
                            />
                            <p>
                                Vous êtes 3.765.923 de jeunes garçons et filles hors main
                                d’œuvre potentielle et inactifs. Aidez nous à vous recenser et
                                à vous orienter. <br />
                                <br />
                                <span style={{ color: "green" }}>Jàng Ligeey Tekki</span> est
                                une plateforme d’orientation professionnelle pour découvrir et
                                te former aux métiers d’aujourd’hui et de demain.
                                <br /> <br />
                                <span style={{ color: "#f5d200" }}>
                    Jàng Ligeey Tekki
                  </span>{" "}
                                est un moteur de recherche pour booster ta carrière en
                                développant des compétences très recherchées sur le marché de
                                l’emploi.
                                <br /> <br />
                                <span style={{ color: "red" }}> Jàng Ligeey Tekki</span>{" "}
                                t’offre plus de 750 Métiers pour ton indépendance et ton
                                épanouissement en découvrant le métier de tes rêves.
                                <br /> <br />
                                <span>
                    <em>Notre objectif : Un métier pour tous !</em>
                  </span>
                            </p>
                        </div>
                    </div>
                </Col>
                <Col lg={16}>
                    <div className="blc-right " >
                        <div className="form-content">
                            <Col lg={12}  offset={6}>
                                <h1>PAIEMENT ÉFFECTUÉ & COMPTE ENREGISTRE</h1>
                                    <NavLink to={"/login"}>
                                        connectez-vous!
                                    </NavLink>
                            </Col>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </>);
}
