/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import Layout from '@nehalist/gatsby-theme-nehalem/src/components/layout';
import SEO from '@nehalist/gatsby-theme-nehalem/src/components/seo';
import { Container } from '@nehalist/gatsby-theme-nehalem/src/components/common';
import Img from 'gatsby-image';
import {
  Card, Button, TextField, Modal, Typography,
} from '@material-ui/core';

import { graphql, useStaticQuery } from 'gatsby';
import styles from '../styles/contact.module.scss';

const Contact = ({ location }) => {
  const logo = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: {eq: "imageAssets"}, name: {eq: "aMitch"}) {
        childImageSharp {
          fixed(width: 55, height: 55) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const [formData, updateFormData] = useState({});
  const [formModel, updateFormModal] = useState(false);
  const [modalMessage, updateFormModalMessage] = useState('');

  const handleFormChange = (event, key) => {
    const newValue = event.target.value;
    const newFormObject = JSON.parse(JSON.stringify(formData));
    newFormObject[key] = newValue;
    updateFormData(newFormObject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // eslint-disable-next-line no-undef
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formData,
      }),
    })
      .then(() => {
        form.reset();
        updateFormModalMessage(
          'Thank you for reaching out to us, we will reach out to you at the email you provided soon.',
        );
        updateFormModal(true);
      })
      .catch(() => {
        form.reset();
        updateFormModalMessage(
          'There was an unexpected error, please try again shortly.',
        );
        updateFormModal(true);
      });
  };

  return (
    <Layout bigHeader>
      <SEO
        location={location}
        title="Contact"
      />
      <Container>
        <div className={styles.container}>
          <div className={styles.columnsDiv}>
            <div className={styles.ourTeamDiv}>
              <div>
                <Img fixed={logo.file.childImageSharp.fixed} alt="Andrew Mitchell Avatar" />
                <strong>Andrew Mitchell</strong>
                <strong>Software Engineer</strong>
              </div>
              <Typography>
                I&apos;m Andrew Mitchell, a Software Engineer - GraphQL Enthusiast -
                Typescript Evangelist - Coding Addict.
                This site acts a my portfolio for side projects as well a
                place I make blog posts to reaffirm my own
                knowledge and engage with the greater community of Software Engineers
              </Typography>
              <Typography>
                If you have any questions about the blog feel free to reach out.
              </Typography>
            </div>
            <Card className={styles.card}>
              <form
                name="AM Web Development Contact"
                netlify
                netlify-honeypot
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
              >
                <h3>
                  Contact Form
                </h3>
                <TextField
                  id="first-name"
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  onChange={(event) => handleFormChange(event, 'firstName')}
                  required
                />
                <TextField
                  id="last-name"
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  onChange={(event) => handleFormChange(event, 'lastName')}
                  required
                />
                <TextField
                  id="business-email"
                  label="Business Email"
                  margin="normal"
                  name="businessEmail"
                  onChange={(event) => handleFormChange(event, 'businessEmail')}
                  required
                />
                <TextField
                  id="phone-number"
                  label="Phone Number"
                  margin="normal"
                  name="phoneNumber"
                  onChange={(event) => handleFormChange(event, 'phoneNumber')}
                  required
                />
                <TextField
                  id="company-name"
                  label="Company Name"
                  margin="normal"
                  name="companyName"
                  onChange={(event) => handleFormChange(event, 'companyName')}
                />
                <TextField
                  id="message"
                  label="Message"
                  margin="normal"
                  name="message"
                  onChange={(event) => handleFormChange(event, 'message')}
                  multiline
                  required
                />
                <p style={{ display: 'none' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    Don’t fill this out if you&apos;re human:
                    {' '}
                    <input name="bot-field" />
                  </label>
                </p>
                <Button variant="outlined" type="submit">Submit</Button>
              </form>
              <Modal
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={formModel}
                onClose={() => updateFormModal(false)}
              >
                <Card className={styles.modalCard}>
                  <h3>{modalMessage}</h3>
                  <Button onClick={() => updateFormModal(false)}>Close</Button>
                </Card>
              </Modal>
            </Card>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Contact;
