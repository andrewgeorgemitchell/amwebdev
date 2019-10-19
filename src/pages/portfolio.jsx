/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Layout from '@nehalist/gatsby-theme-nehalem/src/components/layout';
import SEO from '@nehalist/gatsby-theme-nehalem/src/components/seo';
import { Container } from '@nehalist/gatsby-theme-nehalem/src/components/common';
import {
  Card, CardHeader, Avatar, CardContent, CardActions, Button, Chip,
} from '@material-ui/core';

import portfolioSites from '../content/portfolio';
import styles from '../styles/portfolio.module.scss';

const Portfolio = ({ location }) => (
  <Layout bigHeader={false}>
    <SEO
      location={location}
      title="Portfolio"
    />
    <Container>
      <div>
        <div className={styles.cardsFlexContainer}>
          {
            portfolioSites.map(({
              title,
              subHeader,
              avatarSrc,
              screenshot,
              description,
              skills,
              url,
            }) => (
              <Card
                className={styles.card}
                key={title}
              >
                <CardHeader
                  avatar={(
                    <Avatar
                      alt={`${title} Logo`}
                      src={avatarSrc}
                    />
                  )}
                  title={title}
                  subheader={subHeader}
                />
                <div
                  className={styles.imageDiv}
                >
                  <img
                    className={styles.screenshotImage}
                    width="325"
                    src={screenshot}
                    alt={`${title} Landing Page Screenshot`}
                  />
                </div>
                <CardContent>
                  <p
                    className={styles.descriptionText}
                  >
                    {description}
                  </p>
                  <strong>Technologies Used:</strong>
                  <div className={styles.chipsDiv}>
                    {
                      skills.map((skill) => (
                        <Chip
                          key={`${title}-${skill}`}
                          label={skill}
                        />
                      ))
                    }
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    href={url}
                    target="_blank"
                  >
                    Visit Site
                  </Button>
                </CardActions>
              </Card>
            ))
          }
        </div>
      </div>
    </Container>
  </Layout>
);

export default Portfolio;
