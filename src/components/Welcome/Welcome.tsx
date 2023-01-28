import { HomeRepairServiceSharp } from '@mui/icons-material';
import { Avatar, Box, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import mainLogo from '../../assets/logos/main.png';
import { capabilitiesKeys, technologies } from './data';
import styles from './styles';

const Welcome = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl">
      <Box component="section" sx={styles.section}>
        <Grid container>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <Box component="img" src={mainLogo} sx={styles.image} />
          </Grid>
          <Grid item lg={9} md={6} sm={12} xs={12}>
            <Box sx={styles.column}>
              <Typography variant="h3">{t('home.title')}</Typography>
              <Typography variant="h5">{t('home.presentation')}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box component="section" sx={styles.section}>
        <Container disableGutters>
          <Grid container spacing={2} justifyContent="center">
            {capabilitiesKeys.map((x, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
                <Box component="section" sx={styles.card}>
                  <Avatar sx={styles.avatar}>
                    <HomeRepairServiceSharp sx={styles.repairIcon} />
                  </Avatar>
                  <Typography fontWeight="bold">{t(x)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box component="section" sx={styles.section}>
        <Box sx={styles.column}>
          <Typography variant="h4" align="center" fontWeight="bold" sx={styles.paragraph}>
            {t('home.developedWith')}
          </Typography>
          <Container disableGutters>
            <Grid container spacing={2}>
              {technologies.map(({ label, link, logo }, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Link href={link} target="_blank" underline="none">
                    <Box sx={styles.card}>
                      <Box sx={styles.techImageContainer}>
                        <Box component="img" src={logo} sx={styles.image} />
                      </Box>
                      <Typography variant="h5">{label}</Typography>
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box component="section" sx={styles.section}>
        <Typography variant="h5" sx={styles.paragraph}>
          {t('home.rsSchool')}
        </Typography>
      </Box>
    </Container>
  );
};

export default Welcome;
