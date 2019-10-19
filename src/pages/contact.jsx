/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import Layout from '@nehalist/gatsby-theme-nehalem/src/components/layout';
import SEO from '@nehalist/gatsby-theme-nehalem/src/components/seo';
import { Container } from '@nehalist/gatsby-theme-nehalem/src/components/common';
import {
  Card, Button, TextField, Modal,
} from '@material-ui/core';

import styles from '../styles/contact.module.scss';

const teamMembers = [
  {
    name: 'Andrew Mitchell',
    position: 'Lead Software Engineer',
    pictureURL: 'https://res.cloudinary.com/dpka4vhu6/image/upload/ar_1:1,c_crop,g_face,h_2500,w_2500,x_0,y_0/v1532992002/amwebdev/andrewPic2018.jpg',
  },
  {
    name: 'Marisa Peckham',
    position: 'Copywriter & Content Strategist',
    pictureURL: 'https://res.cloudinary.com/dpka4vhu6/image/upload/v1571518568/amwebdev/Marisa-pi.png',
  },
  {
    name: 'Mason Rhodes',
    position: 'Software Engineer',
    pictureURL: 'https://res.cloudinary.com/dpka4vhu6/image/upload/ar_1:1,c_thumb,g_face,h_600,w_600/v1571520639/amwebdev/Screenshot_2019-10-19_at_2.17.56_PM.jpg',
  },
];

const Contact = ({ location }) => {
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
          <div>
            <h2>
              Our Mission:
            </h2>
            <p>
              AM Web Development is dedicated to building and designing unique user
              experiences for its clients. If you have any questions about the blog
              or wish to hear about how our team could help you with your next
              project feel free to reach out.
            </p>
          </div>
          <div className={styles.columnsDiv}>
            <div className={styles.ourTeamDiv}>
              <h2>
                Our Team:
              </h2>
              <div className={styles.teamMembersRow}>
                {
                  teamMembers.map(({
                    pictureURL, name, position,
                  }) => (
                    <div>
                      <img src={pictureURL} alt={`${name}`} />
                      <strong>{name}</strong>
                      <strong>{position}</strong>
                    </div>
                  ))
                }
              </div>
            </div>
            <Card className={styles.card}>
              <form
                name="AM Web Development Contact"
                netlify
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
                  htmlFor="firstName"
                  margin="normal"
                  name="firstName"
                  onChange={(event) => handleFormChange(event, 'firstName')}
                  required
                />
                <TextField
                  id="last-name"
                  label="Last Name"
                  htmlFor="lastName"
                  margin="normal"
                  name="lastName"
                  onChange={(event) => handleFormChange(event, 'lastName')}
                  required
                />
                <TextField
                  id="business-email"
                  label="Business Email"
                  htmlFor="businessEmail"
                  margin="normal"
                  name="businessEmail"
                  onChange={(event) => handleFormChange(event, 'businessEmail')}
                  required
                />
                <TextField
                  id="phone-number"
                  label="Phone Number"
                  htmlFor="phoneNumber"
                  margin="normal"
                  name="phoneNumber"
                  onChange={(event) => handleFormChange(event, 'phoneNumber')}
                  required
                />
                <TextField
                  id="company-name"
                  label="Company Name"
                  htmlFor="companyName"
                  margin="normal"
                  name="companyName"
                  onChange={(event) => handleFormChange(event, 'companyName')}
                />
                <TextField
                  id="message"
                  label="Message"
                  htmlFor="message"
                  margin="normal"
                  name="message"
                  onChange={(event) => handleFormChange(event, 'message')}
                  multiline
                  required
                />
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
