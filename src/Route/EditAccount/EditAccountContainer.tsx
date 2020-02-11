/* eslint-disable camelcase */
import axios from 'axios';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { toast } from 'react-toastify';
import EditAccountPresenter from './EditAccountPresenter';
import { EDIT_PROFILE } from './EditAccountQueries';
import {
  editProfileVariables,
  editProfile,
  userProfile
} from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';

interface IState {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  email: string;
  uploading: boolean;
}

class EditAccountContainer extends React.Component<IState, any> {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      profilePhoto: '',
      email: '',
      uploading: false
    };
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    });
  };

  public updateState = (data: userProfile) => {
    if (data.GetMyProfile) {
      const {
        GetMyProfile: { user }
      } = data;

      if (user) {
        const { email, firstName, lastName, profilePhoto } = user;
        this.setState({
          firstName,
          lastName,
          email,
          profilePhoto
        });
      }
    }
  };

  public onFileChange = async (event) => {
    const {
      target: { files }
    } = event;

    if (files) {
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('api_key', '839574337755914');
      formData.append('upload_preset', 'cloudinary');
      formData.append('timestamp', String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        'https://api.cloudinary.com/v1_1/cloudinary/image/upload',
        formData
      );

      if (secure_url) {
        this.setState({
          uploading: false,
          profilePhoto: secure_url
        });
      }
    }
  };

  public render() {
    const { email, firstName, lastName, profilePhoto, uploading } = this.state;
    return (
      <Query<userProfile>
        query={USER_PROFILE}
        onCompleted={(data) => this.updateState(data)}
        fetchPolicy="cache-and-network"
      >
        {() => (
          <Mutation<editProfile, editProfileVariables>
            mutation={EDIT_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            variables={{ email, firstName, lastName, profilePhoto }}
            onCompleted={(data) => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success('프로필 수정 성공!');
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
            }}
          >
            {(editProfileMutation, { loading }) => (
              <EditAccountPresenter
                onChange={this.onInputChange}
                isLoading={loading}
                email={email}
                firstName={firstName}
                lastName={lastName}
                profilePhoto={profilePhoto}
                submitFn={editProfileMutation}
                uploading={uploading}
                fileChange={this.onFileChange}
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default EditAccountContainer;
