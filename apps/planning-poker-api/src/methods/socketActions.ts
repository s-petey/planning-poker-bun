import { RoomSocketModel } from '../shared';
import { kebabStyle } from './kebabStyle';
import type { Display, Room } from './roomStore';
import { getRoomMap } from './roomStore';

// TODO: maybe add an "auth ctx" for a room && display? hiding those routes?

export function registerRoom({
  label,
  name,
  showVotes,
}: Omit<Room, 'id'>): RoomSocketModel {
  const id = kebabStyle(name);
  const roomMap = getRoomMap();

  roomMap.set(id, {
    displays: [],
    id,
    label,
    showVotes,
    name,
    ttl: Date.now(),
  });

  const newRoom = roomMap.get(id);

  if (typeof newRoom === 'undefined')
    throw new Error('newRoom not found -- updateRoom');

  return newRoom;
}

export function getAllRooms(): RoomSocketModel[] {
  const roomMap = getRoomMap();
  return Array.from(roomMap.values());
}

export function getRoomById(roomId: string): RoomSocketModel {
  const roomMap = getRoomMap();
  const maybeRoom = roomMap.get(roomId);

  if (typeof maybeRoom === 'undefined')
    throw new Error(`room not found -- getRoomById(${roomId})`);

  const displays = Array.from(maybeRoom.displays.values());
  return { ...maybeRoom, displays };
}

export function updateRoom(
  roomId: string,
  newRoom: Partial<Room>
): RoomSocketModel {
  const roomMap = getRoomMap();
  const oldRoom = roomMap.get(roomId);

  if (typeof oldRoom === 'undefined')
    throw new Error('room not found -- updateRoom');

  const combinedRoom = {
    ...oldRoom,
    ...newRoom,
  };

  roomMap.set(combinedRoom.id, combinedRoom);

  const updatedRoom = roomMap.get(roomId);

  if (typeof updatedRoom === 'undefined')
    throw new Error('updatedRoom not found -- updateRoom');

  return updatedRoom;
}

export function resetRoomCards(roomId: string): RoomSocketModel {
  const roomMap = getRoomMap();
  const maybeRoom = roomMap.get(roomId);

  if (typeof maybeRoom === 'undefined')
    throw new Error('room not found -- resetRoomCards');

  const newDisplays = [...maybeRoom.displays].map((display) => ({
    ...display,
    cardValue: 0,
  }));

  roomMap.set(roomId, { ...maybeRoom, displays: newDisplays });

  const updatedRoom = roomMap.get(maybeRoom.id);

  if (typeof updatedRoom === 'undefined')
    throw new Error('room not found -- resetRoomCards2');

  return updatedRoom;
}

export function addOrUpdateDisplay(
  roomId: string,
  display: Display
): RoomSocketModel {
  const roomMap = getRoomMap();
  const oldRoom = roomMap.get(roomId);

  if (typeof oldRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay');

  const newDisplays = [...oldRoom.displays];

  const foundDisplayIndex = newDisplays.findIndex(
    (newDisplays) => display.name === newDisplays.name
  );

  if (foundDisplayIndex < 0) {
    newDisplays.push(display);
  } else {
    newDisplays.splice(foundDisplayIndex, 1, display);
  }

  roomMap.set(oldRoom.id, { ...oldRoom, displays: newDisplays });

  const updatedRoom = roomMap.get(oldRoom.id);

  if (typeof updatedRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay2');

  return updatedRoom;
}

export function updateDisplayCardValue(
  roomId: string,
  displayToUpdate: Pick<Display, 'name' | 'cardValue'>
): RoomSocketModel {
  const roomMap = getRoomMap();
  const oldRoom = roomMap.get(roomId);

  if (typeof oldRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay');

  const newDisplays = [...oldRoom.displays];

  const foundDisplayIndex = newDisplays.findIndex(
    (newDisplays) => displayToUpdate.name === newDisplays.name
  );

  if (foundDisplayIndex < 0)
    throw new Error('existing display not found -- updateDisplayCardValue');

  const foundDisplay = newDisplays[foundDisplayIndex];

  newDisplays.splice(foundDisplayIndex, 1, {
    ...foundDisplay,
    cardValue: displayToUpdate.cardValue,
  });

  roomMap.set(oldRoom.id, { ...oldRoom, displays: newDisplays });

  const updatedRoom = roomMap.get(oldRoom.id);

  if (typeof updatedRoom === 'undefined')
    throw new Error('room not found -- addOrUpdateDisplay2');

  return updatedRoom;
}
