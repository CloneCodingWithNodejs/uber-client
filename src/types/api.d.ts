/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlace
// ====================================================

export interface addPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface addPlace {
  AddPlace: addPlace_AddPlace;
}

export interface addPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editProfile
// ====================================================

export interface editProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface editProfile {
  UpdateMyProfile: editProfile_UpdateMyProfile;
}

export interface editProfileVariables {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignUp
// ====================================================

export interface emailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignUp {
  EmailSignUp: emailSignUp_EmailSignUp;
}

export interface emailSignUpVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reportLocation
// ====================================================

export interface reportLocation_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
}

export interface reportLocation {
  ReportMovement: reportLocation_ReportMovement;
}

export interface reportLocationVariables {
  lat: number;
  lng: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDrivers
// ====================================================

export interface getDrivers_GetNearByDrivers_drivers {
  __typename: "User";
  id: number;
  lastLat: number | null;
  lastLng: number | null;
}

export interface getDrivers_GetNearByDrivers {
  __typename: "GetNearByDriversResponse";
  ok: boolean;
  drivers: (getDrivers_GetNearByDrivers_drivers | null)[] | null;
}

export interface getDrivers {
  GetNearByDrivers: getDrivers_GetNearByDrivers;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestRide
// ====================================================

export interface requestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface requestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  error: string | null;
  ride: requestRide_RequestRide_ride | null;
}

export interface requestRide {
  RequestRide: requestRide_RequestRide;
}

export interface requestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRides
// ====================================================

export interface getRides_GetNearbyRide_ride_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRides_GetNearbyRide_ride {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: getRides_GetNearbyRide_ride_passenger;
}

export interface getRides_GetNearbyRide {
  __typename: "GetNearbyRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRides_GetNearbyRide_ride | null;
}

export interface getRides {
  GetNearbyRide: getRides_GetNearbyRide;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptRide
// ====================================================

export interface acceptRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface acceptRide {
  UpdateRideStatus: acceptRide_UpdateRideStatus;
}

export interface acceptRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: nearbyRides
// ====================================================

export interface nearbyRides_NearbyRideSubscription_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface nearbyRides_NearbyRideSubscription {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: nearbyRides_NearbyRideSubscription_passenger;
}

export interface nearbyRides {
  NearbyRideSubscription: nearbyRides_NearbyRideSubscription;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleDriving
// ====================================================

export interface toggleDriving_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface toggleDriving {
  ToggleDrivingMode: toggleDriving_ToggleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerification
// ====================================================

export interface startPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface startPhoneVerification {
  StartPhoneVerification: startPhoneVerification_StartPhoneVerification;
}

export interface startPhoneVerificationVariables {
  PhoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editplace
// ====================================================

export interface editplace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface editplace {
  EditPlace: editplace_EditPlace;
}

export interface editplaceVariables {
  placeId: number;
  isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRide
// ====================================================

export interface getRide_GetRide_ride_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  duration: string;
  distance: string;
  passenger: getRide_GetRide_ride_passenger;
  chatId: number | null;
  driver: getRide_GetRide_ride_driver;
}

export interface getRide_GetRide {
  __typename: "GetRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRide_GetRide_ride | null;
}

export interface getRide {
  GetRide: getRide_GetRide;
}

export interface getRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: rideUpdates
// ====================================================

export interface rideUpdates_RideStatusSubscription_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  duration: string;
  distance: string;
  passenger: rideUpdates_RideStatusSubscription_passenger;
  chatId: number | null;
  driver: rideUpdates_RideStatusSubscription_driver;
}

export interface rideUpdates {
  RideStatusSubscription: rideUpdates_RideStatusSubscription;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRide
// ====================================================

export interface updateRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface updateRide {
  UpdateRideStatus: updateRide_UpdateRideStatus;
}

export interface updateRideVariables {
  rideId: number;
  status: StatusOption;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUp
// ====================================================

export interface signUp_SignUp {
  __typename: "SignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface signUp {
  SignUp: signUp_SignUp;
}

export interface signUpVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
  fbId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FaceBookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignIn
// ====================================================

export interface emailSignIn_EmailSignIn {
  __typename: "EmailSignInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignIn {
  EmailSignIn: emailSignIn_EmailSignIn;
}

export interface emailSignInVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: completeEmailVerification
// ====================================================

export interface completeEmailVerification_CompleteEmailVerification {
  __typename: "CompleteEmailVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface completeEmailVerification {
  CompleteEmailVerification: completeEmailVerification_CompleteEmailVerification;
}

export interface completeEmailVerificationVariables {
  key: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface verifyPhone {
  CompletePhoneVerification: verifyPhone_CompletePhoneVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  age: number | null;
  fullName: string | null;
  isDriving: boolean;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaces
// ====================================================

export interface getPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}

export interface getPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (getPlaces_GetMyPlaces_places | null)[] | null;
}

export interface getPlaces {
  GetMyPlaces: getPlaces_GetMyPlaces;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOption {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  ONROUTE = "ONROUTE",
  REQUESTING = "REQUESTING",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
