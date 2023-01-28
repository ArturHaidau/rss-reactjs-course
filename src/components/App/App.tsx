import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Notification, NotificationType } from '../../types/notification';
import AboutUs from '../AboutUs';
import Header from '../Header';
import Home from '../Home';
import NotFound from '../NotFound';
import Notifications from '../Notifications';
import styles from './App.module.css';
import Form from '../Form';

type Props = Record<string, never>;
interface State {
  notifications: Notification[];
}

class App extends React.Component<Props, State> {
  state: State = {
    notifications: [],
  };

  constructor(props: Props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
  }

  showNotification(type: NotificationType, message: string) {
    this.setState((prev) => ({
      notifications: [...prev.notifications, { type, message, id: crypto.randomUUID() }],
    }));
  }

  hideNotification(notificationId: string) {
    const { notifications } = this.state;
    const index = notifications.findIndex((x) => x.id === notificationId);
    const newArray = [...notifications];
    newArray.splice(index, 1);
    this.setState(() => ({ notifications: newArray }));
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.contentContainer}>
          <Routes>
            <Route path="/" element={<Home showNotification={this.showNotification} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/form" element={<Form />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
          <Notifications
            notifications={this.state.notifications}
            handleClick={this.hideNotification}
          />
        </div>
      </div>
    );
  }
}

export default App;
