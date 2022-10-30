import {Reducer} from 'react';
import {TReservation} from '../../utils/constants';

export enum TRoomActions {
  GetReservationsLoadingAction,
  GetReservationsFailureAction,
  GetReservationsSuccessAction,
  SetReservationAction,
  AddReservationLoadingAction,
  AddReservationFailureAction,
  AddReservationSuccessAction,
}

export type TRoomReducerState = {
  loadingReservations: boolean;
  errorReservations: string | null;
  reservations: TReservation[] | null;
  date: Date;
  reservation: TReservation;
  addingReservation: boolean;
  errorAddingReservation: string | null;
};

export type TRoomReducerAction = {
  type: TRoomActions;
  payload: any;
};

export const roomReducerInitialState: TRoomReducerState = {
  loadingReservations: false,
  errorReservations: null,
  reservations: null,
  date: new Date(),
  reservation: {clientId: '', from: '', to: ''},
  addingReservation: false,
  errorAddingReservation: null,
};

export const roomReducer: Reducer<TRoomReducerState, TRoomReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case TRoomActions.GetReservationsLoadingAction:
      return {
        loadingReservations: true,
        errorReservations: null,
        reservations: null,
        date: action.payload.date,
        reservation: state.reservation,
        addingReservation: false,
        errorAddingReservation: null,
      };
    case TRoomActions.GetReservationsFailureAction:
      return {
        loadingReservations: false,
        errorReservations: action.payload.error,
        reservations: null,
        date: action.payload.date,
        reservation: state.reservation,
        addingReservation: false,
        errorAddingReservation: null,
      };
    case TRoomActions.GetReservationsSuccessAction:
      const reservations = action.payload.reservations as TReservation[];
      return {
        loadingReservations: false,
        errorReservations: null,
        reservations: reservations,
        date: action.payload.date,
        reservation: state.reservation,
        addingReservation: false,
        errorAddingReservation: null,
      };
    case TRoomActions.SetReservationAction:
      const reservation = action.payload.reservation as TReservation;
      return {
        ...state,
        reservation: reservation,
      };
    case TRoomActions.AddReservationLoadingAction:
      return {
        ...state,
        addingReservation: true,
        errorAddingReservation: null,
      };
    case TRoomActions.AddReservationFailureAction:
      return {
        ...state,
        addingReservation: false,
        errorAddingReservation: action.payload.error,
      };
    case TRoomActions.AddReservationSuccessAction:
      return {
        ...state,
        addingReservation: false,
      };
  }
};
