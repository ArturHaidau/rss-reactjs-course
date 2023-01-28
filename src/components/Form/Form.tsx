import classNames from 'classnames';
import React, { createRef, SyntheticEvent } from 'react';
import { Profile } from '../../types/profile';
import ProfileCards from '../Cards/ProfileCards';
import styles from './Form.module.css';

type Field = 'name' | 'birthday' | 'country' | 'isAdult' | 'maleSex' | 'avatarImage';
type ValidatedField = 'name' | 'birthday' | 'avatarImage';
type Errors = {
  [key in ValidatedField]: string | null;
};

interface State {
  profiles: Profile[];
  errors: Errors;
  triggered: boolean;
}

class Form extends React.Component {
  private static readonly DEFAULT_COUNTRY = 'Belarus';

  private readonly form = {
    name: createRef<HTMLInputElement>(),
    birthday: createRef<HTMLInputElement>(),
    country: createRef<HTMLSelectElement>(),
    isAdult: createRef<HTMLInputElement>(),
    maleSex: createRef<HTMLInputElement>(),
    avatarImage: createRef<HTMLInputElement>(),
  };
  state: State = {
    triggered: false,
    profiles: [],
    errors: {
      name: null,
      birthday: null,
      avatarImage: null,
    },
  };

  constructor(props: Record<string, never>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    await this.validate();
    if (this.isValid() && window.confirm('Do you want to submit your data?')) {
      this.addProfile({
        name: this.accessInput('name').value,
        birthday: this.accessInput('birthday').value,
        country: this.accessSelect('country').value,
        isAdult: this.accessInput('isAdult').checked,
        sex: this.accessInput('maleSex').checked ? 'Male' : 'Female',
        avatarImage: URL.createObjectURL(this.accessAvatarImage()),
      });
      this.resetForm();
    }
  }

  async onFieldChange(field: ValidatedField) {
    this.setTriggered();
    if (this.state.errors[field] && this.isFieldValid(field)) await this.setError(field, null);
  }

  render() {
    const { name, birthday, country, isAdult, maleSex, avatarImage } = this.form;
    const { profiles, errors, triggered } = this.state;
    return (
      <>
        <div className={styles.formContainer}>
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <div className={classNames([styles.field, styles.column])}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                ref={name}
                onChange={() => this.onFieldChange('name')}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={classNames([styles.field, styles.column])}>
              <label htmlFor="birthday">Birthday</label>
              <input
                id="birthday"
                type="date"
                name="birthday"
                ref={birthday}
                onChange={() => this.onFieldChange('birthday')}
              />
              {errors.birthday && <span className={styles.error}>{errors.birthday}</span>}
            </div>

            <div className={classNames([styles.field, styles.column])}>
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                defaultValue={Form.DEFAULT_COUNTRY}
                ref={country}
                onChange={() => this.setTriggered()}
              >
                <option value="Belarus">Belarus</option>
                <option value="Poland">Poland</option>
                <option value="USA">USA</option>
              </select>
            </div>

            <div className={classNames([styles.field, styles.row])}>
              <label htmlFor="isAdult">You are 18+</label>
              <input
                id="isAdult"
                type="checkbox"
                name="isAdult"
                ref={isAdult}
                onChange={() => this.setTriggered()}
              />
            </div>

            <div className={classNames([styles.field, styles.row])}>
              <input
                id="sex-male"
                type="radio"
                name="sex"
                value="Male"
                ref={maleSex}
                defaultChecked
              />
              <label htmlFor="sex-male">Male</label>
              <input
                id="sex-female"
                type="radio"
                name="sex"
                value="Female"
                onChange={() => this.setTriggered()}
              />
              <label htmlFor="sex-female">Female</label>
            </div>

            <div className={classNames([styles.field, styles.column])}>
              <label htmlFor="avatarImage">Avatar</label>
              <input
                id="avatarImage"
                type="file"
                name="avatarImage"
                ref={avatarImage}
                accept="image/png"
                onChange={() => this.onFieldChange('avatarImage')}
              />
              {errors.avatarImage && <span className={styles.error}>{errors.avatarImage}</span>}
            </div>

            <div className={styles.submitButton}>
              <input type="submit" value="Submit" disabled={!(triggered && this.isValid())} />
            </div>
          </form>
        </div>
        <div className={styles.cards}>
          <ProfileCards data={profiles} />
        </div>
      </>
    );
  }

  private addProfile(profile: Profile) {
    this.setState((prev: State) => ({
      ...prev,
      profiles: [...prev.profiles, profile],
    }));
  }

  private access(field: Field) {
    if (this.form[field].current) return this.form[field].current;
    else throw new Error(`Unable to access field = ${field} on the form`);
  }

  private accessInput(field: Field) {
    return this.access(field) as HTMLInputElement;
  }

  private accessAvatarImage() {
    const files = this.accessInput('avatarImage').files;
    if (files) return files[0];
    else throw new Error('No files found from the Avatar field');
  }

  private accessSelect(field: Field) {
    return this.access(field) as HTMLSelectElement;
  }

  private resetForm() {
    this.accessInput('name').value = '';
    this.accessInput('birthday').value = '';
    this.accessSelect('country').value = Form.DEFAULT_COUNTRY;
    this.accessInput('isAdult').checked = false;
    this.accessInput('maleSex').checked = true;
    this.accessInput('avatarImage').value = '';
  }

  private async setError(field: ValidatedField, errorMessage: string | null) {
    await this.setState((prev: State) => ({
      ...prev,
      errors: { ...prev.errors, [field]: errorMessage },
    }));
  }

  private setTriggered() {
    if (!this.state.triggered) this.setState((prev: State) => ({ ...prev, triggered: true }));
  }

  private static isEmpty(field: string) {
    return field.length === 0;
  }

  private isFieldValid(field: ValidatedField) {
    return !Form.isEmpty(this.accessInput(field).value);
  }

  private isAvatarImageValid() {
    return !!this.accessAvatarImage();
  }

  private async validate() {
    if (!this.isFieldValid('name')) await this.setError('name', 'The name should not be empty');
    if (!this.isFieldValid('birthday'))
      await this.setError('birthday', 'The birthday should not be empty');
    if (!this.isAvatarImageValid())
      await this.setError('avatarImage', 'The avatar source should not be empty');
  }

  private isValid() {
    return Object.values(this.state.errors).every((errorMessage) => !errorMessage);
  }
}

export default Form;
