import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';
import { Box, Button as MUIButton, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../../application.constants';
import useAuth from '../../hooks/useAuth';
import useBoards from '../../hooks/useBoards';
import useModals from '../../hooks/useModals';
import useScrollDirection from '../../hooks/useScrollDirection';
import { selectAuth } from '../../store/selectors';
import Menu from '../Menu';
import BoardModal from '../modals/BoardModal';
import styles from './styles';

interface ButtonProps {
  label: string;
  handleClick?: () => unknown;
  icon: JSX.Element;
}

const Button = ({ label, handleClick, icon }: ButtonProps) => (
  <MUIButton disableElevation variant="contained" onClick={handleClick} startIcon={icon}>
    <Typography sx={styles.buttonLabel}>{label}</Typography>
  </MUIButton>
);

type Modal = 'addBoard';

const Header = () => {
  const scrollDirection = useScrollDirection();
  const { t, i18n } = useTranslation();
  const { createBoard } = useBoards();
  const { isAuth } = useSelector(selectAuth);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { modals, hideModal, showModal } = useModals<Modal>({ addBoard: false });

  const Language = (
    <Menu<string>
      options={SUPPORTED_LANGUAGES}
      equal={(a, b) => a === b}
      text={(x) => x.toUpperCase()}
      handleClick={i18n.changeLanguage}
      selected={i18n.language}
      button={<Button label={i18n.language} icon={<LanguageIcon />} />}
    />
  );

  return (
    <>
      <Box component="header" sx={styles.header(scrollDirection)}>
        <Box component="nav" sx={styles.nav}>
          <Container disableGutters maxWidth="xl">
            <Grid container direction="row">
              <Grid container item lg={3} md={3} sm={3} xs={2} justifyContent="flex-start">
                <Button
                  label={t('common.home')}
                  handleClick={() => navigate('/')}
                  icon={<HomeIcon />}
                />
              </Grid>
              {isAuth ? (
                <>
                  <Grid container item lg={6} md={6} sm={6} xs={8} justifyContent="center">
                    <Button
                      label={t('common.boards')}
                      handleClick={() => navigate('/boards')}
                      icon={<DashboardIcon />}
                    />
                    <Button
                      label={t('common.profile')}
                      handleClick={() => navigate('/profile')}
                      icon={<Person2Icon />}
                    />
                    <Button
                      label={t('common.addBoard')}
                      handleClick={() => showModal('addBoard')}
                      icon={<AddIcon />}
                    />
                  </Grid>
                  <Grid container item lg={3} md={3} sm={3} xs={2} justifyContent="flex-end">
                    {Language}
                    <Button
                      label={t('common.signOut')}
                      handleClick={() => signOut()}
                      icon={<LogoutIcon />}
                    />
                  </Grid>
                </>
              ) : (
                <Grid container item lg={9} md={9} sm={9} xs={10} justifyContent="flex-end">
                  {Language}
                  <Button
                    label={t('common.signIn')}
                    handleClick={() => navigate('sign-in')}
                    icon={<LoginIcon />}
                  />
                  <Button
                    label={t('common.signUp')}
                    handleClick={() => navigate('sign-up')}
                    icon={<LogoutIcon />}
                  />
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
      <BoardModal
        open={modals.addBoard}
        hideModal={() => hideModal('addBoard')}
        action={(data) => createBoard(data)}
        title={t('common.addBoard')}
        boardPreview={{ id: '', description: '', title: '' }}
      />
    </>
  );
};

export default Header;
