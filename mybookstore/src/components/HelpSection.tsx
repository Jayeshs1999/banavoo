import { useState } from "react";
import { Accordion, Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function HelpSection() {
  const navigate = useNavigate();
  const [faqs] = useState([
    {
      question: "How does customization work?",
      answer:
        "You share your idea, we refine it, and then we create and deliver it to you!",
    },
    {
      question: "What types of products can I customize?",
      answer:
        "We accept all kinds of customizations – from small crafts to large projects!",
    },
    {
      question: "How long does delivery take?",
      answer:
        "It depends on the complexity, but we aim to deliver within 7-14 days.",
    },
    {
      question: "Do you accept bulk orders?",
      answer:
        "Yes, we handle bulk orders with special discounts. Contact us for details!",
    },
  ]);

  return (
    <Container
      style={{
        maxWidth: "800px",
        marginTop: "40px",
        padding: "20px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #f3e7e9, #e3eeff)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Help & Support
      </h2>

      <Accordion defaultActiveKey="0">
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Card className="mt-4 p-3 text-center" style={{ border: "none" }}>
        <h5>Still have questions?</h5>
        <p>Contact our support team!</p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="primary" href="mailto:jayeshsevatkar55@gmail.com">
            Email Support
          </Button>
          <Button variant="success" href="tel:+918888585093">
            Call Support
          </Button>
        </div>
      </Card>

      <div className="text-center mt-4">
        <Button
          variant="warning"
          size="lg"
          onClick={() => navigate("/placed-order")}
        >
          Track My Order
        </Button>
      </div>
    </Container>
  );
}
