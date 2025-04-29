import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  email: string;
  name: string;
  message: string;
  ip: string;
}

export const YelpRecentLoginEmail = ({
  name,
  email,
  message,
  ip,
}: EmailTemplateProps) => {
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date().getTime());

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Form Contact</Preview>
        <Container>
          <Section style={logo}>
            <Img src={`${process.env.NEXT_PUBLIC_BASE_URL}/email/logo.webp`} alt="Squizyiinxx logo" />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/email/imageMail.webp`}
                alt="header illustration"
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi Joel,
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Someone Just Reached Out via Your Portfolio.
                </Heading>

                <Text style={paragraph}>
                  <strong>Time: </strong>
                  {formattedDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Name: </b>
                  {name}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Approximate geographic location based on IP address:
                  {ip}
                </Text>

                <Text style={paragraph}>{message}</Text>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            {new Date().getFullYear()} | Squizyiinxx Inc., Jl. Pandeglang,
            Serang, Banten, Indonesia | https://squizyiinxx.vercel.app/
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default YelpRecentLoginEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const paragraph = {
  fontSize: 16,
  lineHight: 25,
  color: "#525f7f",
  textAlign: "justify" as const,
};

const logo = {
  padding: "30px 20px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

