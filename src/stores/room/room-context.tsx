import React, {createContext, useReducer, ReactNode, Dispatch} from 'react';
import {
  roomReducer,
  roomReducerInitialState,
  TRoomReducerAction,
  TRoomReducerState,
} from './room-reducer';

type TValues = {
  roomState: TRoomReducerState;
  roomDispatch: Dispatch<TRoomReducerAction>;
};

const initialValues: TValues = {
  roomState: roomReducerInitialState,
  roomDispatch: () => {},
};

export const RoomContext = createContext<TValues>(initialValues);

const RoomContextProvider = ({children}: {children: ReactNode}) => {
  const [roomState, roomDispatch] = useReducer(
    roomReducer,
    roomReducerInitialState,
  );

  const values: TValues = {
    roomState,
    roomDispatch,
  };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
};

export default RoomContextProvider;
