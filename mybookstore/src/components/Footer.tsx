import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <div className="pt-3">
      <footer>
        <Container>
          <Row>
            <Col className="text-center pyt-3">
              <p>Banavoo.in &copy; {currentYear}</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
