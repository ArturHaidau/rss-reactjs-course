import { Box, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RS_SCHOOL_LINK } from '../../application.constants';
import rsSchoolLogo from '../../assets/logos/rs-school-js.svg';
import styles from './styles';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box component="footer" sx={styles.footer}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            container
            lg={4}
            md={4}
            sm={4}
            xs={12}
            justifyContent="center"
            alignContent="center"
          >
            <Link href={RS_SCHOOL_LINK} target="_blank">
              <Box sx={styles.imageContainer}>
                <Box component="img" src={rsSchoolLogo} sx={styles.image} />
              </Box>
            </Link>
          </Grid>
          <Grid
            item
            container
            lg={4}
            md={4}
            sm={4}
            xs={12}
            justifyContent="center"
            alignContent="center"
          >
            <Typography>{t('common.developedBy')}</Typography>
          </Grid>
          <Grid
            item
            container
            lg={4}
            md={4}
            sm={4}
            xs={12}
            justifyContent="center"
            alignContent="center"
          >
            <Typography>© 2022</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
